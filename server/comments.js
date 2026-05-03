import { z } from 'zod'
import { awardCommentPoints, db } from './db.js'
import { getCurrentUser, requireUser } from './auth.js'
import { normalizePagePath, pagePathAliases } from './page-path.js'
import { softDeleteCommentTree } from './comment-store.js'

const pagePathSchema = z.string().trim().min(1).max(300).startsWith('/')
const commentSchema = z.object({
  pagePath: pagePathSchema,
  parentId: z.number().int().positive().nullable().optional(),
  content: z.string().trim().min(1).max(1000),
})

function commentRow(row) {
  return {
    id: row.id,
    pagePath: row.page_path,
    parentId: row.parent_id,
    content: row.content,
    likeCount: row.like_count || 0,
    likedByMe: Boolean(row.liked_by_me),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    author: {
      id: row.user_id,
      username: row.username,
      displayName: row.display_name,
      cultivationPoints: row.cultivation_points,
    },
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
        users.cultivation_points,
        COUNT(comment_likes.user_id) AS like_count,
        MAX(CASE WHEN comment_likes.user_id = ? THEN 1 ELSE 0 END) AS liked_by_me
      FROM comments
      JOIN users ON users.id = comments.user_id
      LEFT JOIN comment_likes ON comment_likes.comment_id = comments.id
      WHERE comments.page_path IN (${placeholders}) AND comments.status = 'active'
      GROUP BY comments.id
      ORDER BY comments.created_at ASC, comments.id ASC
      LIMIT 100
    `).all(currentUser?.id || 0, ...aliases)

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
        users.cultivation_points,
        0 AS like_count,
        0 AS liked_by_me
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
