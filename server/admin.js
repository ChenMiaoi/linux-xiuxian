import { db, publicUser } from './db.js'
import { requireAdmin } from './auth.js'
import { softDeleteCommentTree } from './comment-store.js'
import { RANK_LEVELS, rankForPoints } from './rank.js'
import { ensureHighRiskWarning } from './mailbox.js'

function adminCommentRow(row) {
  return {
    id: row.id,
    pagePath: row.page_path,
    parentId: row.parent_id,
    content: row.content,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    likeCount: row.like_count || 0,
    author: {
      id: row.user_id,
      username: row.username,
      displayName: row.display_name,
      cultivationPoints: row.cultivation_points,
    },
  }
}

function adminUserRow(row) {
  const user = publicUser(row)
  const riskReasons = []
  let riskScore = 0

  if (!user.github) {
    riskScore += 10
    riskReasons.push('未绑定 GitHub')
  }
  if (row.comment_count >= 20) {
    riskScore += 20
    riskReasons.push('评论数量较高')
  }
  if (row.deleted_comment_count >= 3) {
    riskScore += 35
    riskReasons.push('多条评论被删除')
  }
  if (row.deleted_comment_count >= 8) {
    riskScore += 35
    riskReasons.push('删除评论数量过高')
  }
  if (row.recent_comment_count >= 10) {
    riskScore += 35
    riskReasons.push('24 小时内发言密集')
  }
  if (row.moderation_event_count >= 2) {
    riskScore += 25
    riskReasons.push('多次被管理员处理')
  }
  if (row.admin_privilege_attempt_count >= 1) {
    riskScore = 100
    riskReasons.push('尝试访问管理员权限接口')
  }

  const finalScore = Math.min(100, riskScore)
  if (finalScore >= 90) {
    ensureHighRiskWarning({ userId: user.id, reasons: riskReasons })
  }
  return {
    ...user,
    commentCount: row.comment_count || 0,
    deletedCommentCount: row.deleted_comment_count || 0,
    recentCommentCount: row.recent_comment_count || 0,
    moderationEventCount: row.moderation_event_count || 0,
    adminPrivilegeAttemptCount: row.admin_privilege_attempt_count || 0,
    riskScore: finalScore,
    riskLevel: finalScore >= 90 ? '高风险' : finalScore >= 60 ? '可疑' : finalScore >= 30 ? '关注' : '正常',
    riskReasons,
  }
}

function rankRange(rankName) {
  if (!rankName || rankName === 'all') return null
  const index = RANK_LEVELS.findIndex((rank) => rank.name === rankName)
  if (index < 0) return null
  return {
    min: RANK_LEVELS[index].minPoints,
    max: RANK_LEVELS[index + 1]?.minPoints ?? null,
  }
}

export function registerAdminRoutes(app) {
  app.get('/api/admin/summary', async (request, reply) => {
    const admin = requireAdmin(request, reply)
    if (!admin) return

    return {
      users: db.prepare('SELECT COUNT(*) AS count FROM users').get().count,
      comments: db.prepare("SELECT COUNT(*) AS count FROM comments WHERE status = 'active'").get().count,
      deletedComments: db.prepare("SELECT COUNT(*) AS count FROM comments WHERE status = 'deleted'").get().count,
    }
  })

  app.get('/api/admin/users', async (request, reply) => {
    const admin = requireAdmin(request, reply)
    if (!admin) return

    const status = typeof request.query?.status === 'string' ? request.query.status : 'all'
    const rank = typeof request.query?.rank === 'string' ? request.query.rank : 'all'
    const range = rankRange(rank)
    const conditions = []
    const params = []

    if (status !== 'all') {
      conditions.push('users.status = ?')
      params.push(status)
    }
    if (range) {
      conditions.push('users.cultivation_points >= ?')
      params.push(range.min)
      if (range.max != null) {
        conditions.push('users.cultivation_points < ?')
        params.push(range.max)
      }
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
    const rows = db.prepare(`
      SELECT
        users.*,
        COUNT(DISTINCT comments.id) AS comment_count,
        COUNT(DISTINCT CASE WHEN comments.status = 'deleted' THEN comments.id END) AS deleted_comment_count,
        COUNT(DISTINCT CASE WHEN comments.created_at >= datetime('now', '-1 day') THEN comments.id END) AS recent_comment_count,
        COUNT(DISTINCT user_moderation_events.id) AS moderation_event_count,
        COUNT(DISTINCT CASE WHEN user_moderation_events.action = 'admin_privilege_attempt' THEN user_moderation_events.id END) AS admin_privilege_attempt_count
      FROM users
      LEFT JOIN comments ON comments.user_id = users.id
      LEFT JOIN user_moderation_events ON user_moderation_events.user_id = users.id
      ${where}
      GROUP BY users.id
      ORDER BY created_at DESC
      LIMIT 100
    `).all(...params)

    return { users: rows.map(adminUserRow), ranks: RANK_LEVELS.map((item) => item.name) }
  })

  app.post('/api/admin/users/:id/moderate', async (request, reply) => {
    const admin = requireAdmin(request, reply)
    if (!admin) return

    const id = Number(request.params.id)
    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({ error: 'BAD_REQUEST', message: '用户 ID 不正确' })
    }
    if (id === admin.id) {
      return reply.code(400).send({ error: 'BAD_REQUEST', message: '不能操作当前管理员账号' })
    }

    const action = request.body?.action
    const note = typeof request.body?.note === 'string' ? request.body.note.slice(0, 200) : ''

    if (action === 'ban') {
      db.prepare(`
        UPDATE users
        SET status = 'banned', muted_until = NULL, moderation_note = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(note, id)
      db.prepare('DELETE FROM sessions WHERE user_id = ?').run(id)
      recordModerationEvent(id, admin.id, action, note)
    } else if (action === 'mute') {
      const hours = Number(request.body?.hours || 24)
      const safeHours = Number.isFinite(hours) ? Math.min(Math.max(hours, 1), 720) : 24
      db.prepare(`
        UPDATE users
        SET status = 'muted',
            muted_until = datetime('now', ?),
            moderation_note = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(`+${safeHours} hours`, note, id)
      recordModerationEvent(id, admin.id, action, note)
    } else if (action === 'restore') {
      db.prepare(`
        UPDATE users
        SET status = 'active', muted_until = NULL, moderation_note = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(note, id)
      recordModerationEvent(id, admin.id, action, note)
    } else {
      return reply.code(400).send({ error: 'BAD_REQUEST', message: '未知管理动作' })
    }

    const row = db.prepare(`
      SELECT
        users.*,
        COUNT(DISTINCT comments.id) AS comment_count,
        COUNT(DISTINCT CASE WHEN comments.status = 'deleted' THEN comments.id END) AS deleted_comment_count,
        COUNT(DISTINCT CASE WHEN comments.created_at >= datetime('now', '-1 day') THEN comments.id END) AS recent_comment_count,
        COUNT(DISTINCT user_moderation_events.id) AS moderation_event_count,
        COUNT(DISTINCT CASE WHEN user_moderation_events.action = 'admin_privilege_attempt' THEN user_moderation_events.id END) AS admin_privilege_attempt_count
      FROM users
      LEFT JOIN comments ON comments.user_id = users.id
      LEFT JOIN user_moderation_events ON user_moderation_events.user_id = users.id
      WHERE users.id = ?
      GROUP BY users.id
    `).get(id)

    return { user: adminUserRow(row) }
  })

  app.get('/api/admin/comments', async (request, reply) => {
    const admin = requireAdmin(request, reply)
    if (!admin) return

    const rows = db.prepare(`
      SELECT
        comments.*,
        users.username,
        users.display_name,
        users.cultivation_points,
        COUNT(comment_likes.user_id) AS like_count
      FROM comments
      JOIN users ON users.id = comments.user_id
      LEFT JOIN comment_likes ON comment_likes.comment_id = comments.id
      WHERE comments.status = 'active'
      GROUP BY comments.id
      ORDER BY comments.created_at DESC
      LIMIT 100
    `).all()

    return { comments: rows.map(adminCommentRow) }
  })

  app.post('/api/admin/comments/:id/delete', async (request, reply) => {
    const admin = requireAdmin(request, reply)
    if (!admin) return

    const id = Number(request.params.id)
    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({ error: 'BAD_REQUEST', message: '评论 ID 不正确' })
    }

    const result = softDeleteCommentTree(id)

    return { ok: true, deletedCount: result.changes }
  })
}

function recordModerationEvent(userId, adminUserId, action, reason) {
  db.prepare(`
    INSERT INTO user_moderation_events (user_id, admin_user_id, action, reason)
    VALUES (?, ?, ?, ?)
  `).run(userId, adminUserId, action, reason || '')
}
