import { z } from 'zod'
import { awardCommentPoints, db, publicUser } from './db.js'
import { getCurrentUser, requireUser } from './auth.js'
import { normalizePagePath, pagePathAliases } from './page-path.js'
import { softDeleteCommentTree } from './comment-store.js'

const pagePathSchema = z.string().trim().min(1).max(300).startsWith('/')
const commentSchema = z.object({
  pagePath: pagePathSchema,
  parentId: z.number().int().positive().nullable().optional(),
  content: z.string().trim().min(1).max(1000),
})
const reportReasons = new Set(['spam', 'abuse', 'illegal', 'spoiler', 'offtopic', 'other'])
const reportSchema = z.object({
  reason: z.string().trim().refine((value) => reportReasons.has(value)),
  details: z.string().trim().max(300).optional(),
})

function commentRow(row) {
  const author = publicUser({
    id: row.user_id,
    username: row.username,
    display_name: row.display_name,
    role: row.role || 'user',
    status: row.user_status || 'active',
    muted_until: row.muted_until,
    moderation_note: row.moderation_note,
    cultivation_points: row.cultivation_points,
    github_id: row.github_id,
    github_login: row.github_login,
    github_avatar_url: row.github_avatar_url,
    github_connected_at: row.github_connected_at,
    created_at: row.user_created_at,
  })

  return {
    id: row.id,
    pagePath: row.page_path,
    parentId: row.parent_id,
    content: row.content,
    likeCount: row.like_count || 0,
    likedByMe: Boolean(row.liked_by_me),
    reportCount: row.report_count || 0,
    reportedByMe: Boolean(row.reported_by_me),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    author,
  }
}

export function registerCommentRoutes(app) {
  app.get('/api/comments', async (request, reply) => {
    const parsed = pagePathSchema.safeParse(request.query?.pagePath)
    if (!parsed.success) {
      return reply.code(400).send({ error: 'BAD_REQUEST', message: '缺少页面路径' })
    }

    const currentUser = getCurrentUser(request)
    const aliases = pagePathAliases(parsed.data)
    const placeholders = aliases.map(() => '?').join(', ')
    const rows = db.prepare(`
      SELECT
        comments.*,
        users.username,
        users.display_name,
        users.role,
        users.status AS user_status,
        users.muted_until,
        users.moderation_note,
        users.cultivation_points,
        users.github_id,
        users.github_login,
        users.github_avatar_url,
        users.github_connected_at,
        users.created_at AS user_created_at,
        COUNT(DISTINCT comment_likes.user_id) AS like_count,
        MAX(CASE WHEN comment_likes.user_id = ? THEN 1 ELSE 0 END) AS liked_by_me,
        COUNT(DISTINCT CASE WHEN comment_reports.status = 'open' THEN comment_reports.id END) AS report_count,
        MAX(CASE WHEN comment_reports.reporter_user_id = ? THEN 1 ELSE 0 END) AS reported_by_me
      FROM comments
      JOIN users ON users.id = comments.user_id
      LEFT JOIN comment_likes ON comment_likes.comment_id = comments.id
      LEFT JOIN comment_reports ON comment_reports.comment_id = comments.id
      WHERE comments.page_path IN (${placeholders}) AND comments.status = 'active'
      GROUP BY comments.id
      ORDER BY comments.created_at ASC, comments.id ASC
      LIMIT 100
    `).all(currentUser?.id || 0, currentUser?.id || 0, ...aliases)

    return { comments: rows.map(commentRow) }
  })

  app.post('/api/comments', async (request, reply) => {
    const user = requireUser(request, reply)
    if (!user) return
    if (user.status === 'muted' || (user.mutedUntil && new Date(user.mutedUntil) > new Date())) {
      return reply.code(403).send({ error: 'USER_MUTED', message: '该账号暂时不能发言' })
    }

    const parsed = commentSchema.safeParse(request.body)
    if (!parsed.success) {
      return reply.code(400).send({ error: 'BAD_REQUEST', message: '评论内容不符合要求' })
    }

    const pagePath = normalizePagePath(parsed.data.pagePath)
    const result = db.prepare(`
      INSERT INTO comments (page_path, user_id, parent_id, content)
      VALUES (?, ?, ?, ?)
    `).run(pagePath, user.id, parsed.data.parentId || null, parsed.data.content)

    const pointAward = awardCommentPoints(user.id, result.lastInsertRowid)

    const row = db.prepare(`
      SELECT
        comments.*,
        users.username,
        users.display_name,
        users.role,
        users.status AS user_status,
        users.muted_until,
        users.moderation_note,
        users.cultivation_points,
        users.github_id,
        users.github_login,
        users.github_avatar_url,
        users.github_connected_at,
        users.created_at AS user_created_at,
        0 AS like_count,
        0 AS liked_by_me,
        0 AS report_count,
        0 AS reported_by_me
      FROM comments
      JOIN users ON users.id = comments.user_id
      WHERE comments.id = ?
    `).get(result.lastInsertRowid)

    return reply.code(201).send({ comment: commentRow(row), pointAward })
  })

  app.post('/api/comments/:id/like', async (request, reply) => {
    const user = requireUser(request, reply)
    if (!user) return

    const id = Number(request.params.id)
    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({ error: 'BAD_REQUEST', message: '评论 ID 不正确' })
    }

    const comment = db.prepare('SELECT id FROM comments WHERE id = ? AND status = ?').get(id, 'active')
    if (!comment) return reply.code(404).send({ error: 'NOT_FOUND', message: '评论不存在' })

    db.prepare('INSERT OR IGNORE INTO comment_likes (comment_id, user_id) VALUES (?, ?)').run(id, user.id)
    const likeCount = db.prepare('SELECT COUNT(*) AS count FROM comment_likes WHERE comment_id = ?').get(id).count
    return { likedByMe: true, likeCount }
  })

  app.delete('/api/comments/:id/like', async (request, reply) => {
    const user = requireUser(request, reply)
    if (!user) return

    const id = Number(request.params.id)
    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({ error: 'BAD_REQUEST', message: '评论 ID 不正确' })
    }

    db.prepare('DELETE FROM comment_likes WHERE comment_id = ? AND user_id = ?').run(id, user.id)
    const likeCount = db.prepare('SELECT COUNT(*) AS count FROM comment_likes WHERE comment_id = ?').get(id).count
    return { likedByMe: false, likeCount }
  })

  app.post('/api/comments/:id/unlike', async (request, reply) => {
    const user = requireUser(request, reply)
    if (!user) return

    const id = Number(request.params.id)
    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({ error: 'BAD_REQUEST', message: '评论 ID 不正确' })
    }

    db.prepare('DELETE FROM comment_likes WHERE comment_id = ? AND user_id = ?').run(id, user.id)
    const likeCount = db.prepare('SELECT COUNT(*) AS count FROM comment_likes WHERE comment_id = ?').get(id).count
    return { likedByMe: false, likeCount }
  })

  app.post('/api/comments/:id/report', async (request, reply) => {
    const user = requireUser(request, reply)
    if (!user) return
    if (user.status === 'muted' || (user.mutedUntil && new Date(user.mutedUntil) > new Date())) {
      return reply.code(403).send({ error: 'USER_MUTED', message: '该账号暂时不能举报' })
    }

    const id = Number(request.params.id)
    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({ error: 'BAD_REQUEST', message: '评论 ID 不正确' })
    }

    const parsed = reportSchema.safeParse(request.body || {})
    if (!parsed.success) {
      return reply.code(400).send({ error: 'BAD_REQUEST', message: '请选择有效举报理由' })
    }

    const comment = db.prepare('SELECT id, user_id FROM comments WHERE id = ? AND status = ?').get(id, 'active')
    if (!comment) return reply.code(404).send({ error: 'NOT_FOUND', message: '评论不存在' })
    if (comment.user_id === user.id) {
      return reply.code(400).send({ error: 'BAD_REQUEST', message: '不能举报自己的评论' })
    }

    const recentReportStats = db.prepare(`
      SELECT
        COUNT(*) AS total_count,
        SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) AS rejected_count
      FROM comment_reports
      WHERE reporter_user_id = ?
        AND created_at >= datetime('now', '-1 day')
    `).get(user.id)
    if ((recentReportStats?.total_count || 0) >= 20 || (recentReportStats?.rejected_count || 0) >= 5) {
      return reply.code(403).send({ error: 'REPORT_LIMITED', message: '举报过于频繁，请稍后再试' })
    }

    const result = db.prepare(`
      INSERT OR IGNORE INTO comment_reports (comment_id, reporter_user_id, reason, details)
      VALUES (?, ?, ?, ?)
    `).run(id, user.id, parsed.data.reason, parsed.data.details || '')
    if (result.changes === 0) {
      return reply.code(409).send({ error: 'DUPLICATE_REPORT', message: '你已举报过这条评论' })
    }

    const reportCount = db.prepare(`
      SELECT COUNT(*) AS count
      FROM comment_reports
      WHERE comment_id = ? AND status = 'open'
    `).get(id).count

    return reply.code(201).send({ reportedByMe: true, reportCount })
  })

  app.post('/api/comments/:id/delete', async (request, reply) => deleteComment(request, reply))

  app.delete('/api/comments/:id', deleteComment)
}

async function deleteComment(request, reply) {
    const user = requireUser(request, reply)
    if (!user) return

    const id = Number(request.params.id)
    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({ error: 'BAD_REQUEST', message: '评论 ID 不正确' })
    }

    const comment = db.prepare('SELECT * FROM comments WHERE id = ? AND status = ?').get(id, 'active')
    if (!comment) return reply.code(404).send({ error: 'NOT_FOUND', message: '评论不存在' })
    if (comment.user_id !== user.id && user.role !== 'admin') {
      return reply.code(403).send({ error: 'FORBIDDEN', message: '无权删除该评论' })
    }

    const result = softDeleteCommentTree(id)

    return { ok: true, deletedCount: result.changes }
}
