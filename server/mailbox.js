import { z } from 'zod'
import { db } from './db.js'
import { requireAdmin, requireUser } from './auth.js'

const appealSchema = z.object({
  subject: z.string().trim().min(1).max(80),
  body: z.string().trim().min(1).max(1000),
})

const replySchema = z.object({
  body: z.string().trim().min(1).max(1000),
})

export function createSystemMessage({ userId, subject, body, kind = 'system', senderUserId = null, status = 'open' }) {
  return db.prepare(`
    INSERT INTO system_messages (user_id, sender_user_id, kind, subject, body, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(userId, senderUserId, kind, subject, body, status)
}

export function ensureHighRiskWarning({ userId, reasons }) {
  const subject = '系统警告：账号行为风险较高'
  const existing = db.prepare(`
    SELECT id
    FROM system_messages
    WHERE user_id = ?
      AND kind = 'risk_warning'
      AND subject = ?
      AND created_at >= datetime('now', '-1 day')
    LIMIT 1
  `).get(userId, subject)

  if (existing) return

  createSystemMessage({
    userId,
    kind: 'risk_warning',
    subject,
    body: `系统检测到你的账号存在较高风险：${reasons.join('、')}。请停止刷屏、重复发言、越权访问或其他异常行为。如有误判，可在信箱中向管理员申诉。`,
  })
}

function messageRow(row) {
  return {
    id: row.id,
    userId: row.user_id,
    senderUserId: row.sender_user_id,
    kind: row.kind,
    subject: row.subject,
    body: row.body,
    status: row.status,
    readAt: row.read_at,
    createdAt: row.created_at,
    user: row.username ? {
      username: row.username,
      displayName: row.display_name,
    } : null,
  }
}

export function registerMailboxRoutes(app) {
  app.get('/api/mailbox/messages', async (request, reply) => {
    const user = requireUser(request, reply)
    if (!user) return

    const rows = db.prepare(`
      SELECT system_messages.*, users.username, users.display_name
      FROM system_messages
      JOIN users ON users.id = system_messages.user_id
      WHERE system_messages.user_id = ?
      ORDER BY system_messages.created_at DESC
      LIMIT 100
    `).all(user.id)

    return { messages: rows.map(messageRow) }
  })

  app.post('/api/mailbox/messages/:id/read', async (request, reply) => {
    const user = requireUser(request, reply)
    if (!user) return

    const id = Number(request.params.id)
    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({ error: 'BAD_REQUEST', message: '消息 ID 不正确' })
    }

    db.prepare(`
      UPDATE system_messages
      SET read_at = COALESCE(read_at, CURRENT_TIMESTAMP)
      WHERE id = ? AND user_id = ?
    `).run(id, user.id)

    return { ok: true }
  })

  app.post('/api/mailbox/appeals', async (request, reply) => {
    const user = requireUser(request, reply)
    if (!user) return

    const parsed = appealSchema.safeParse(request.body)
    if (!parsed.success) {
      return reply.code(400).send({ error: 'BAD_REQUEST', message: '申诉内容不符合要求' })
    }

    const result = createSystemMessage({
      userId: user.id,
      senderUserId: user.id,
      kind: 'appeal',
      subject: parsed.data.subject,
      body: parsed.data.body,
      status: 'open',
    })

    return { ok: true, id: result.lastInsertRowid }
  })

  app.get('/api/admin/mailbox/messages', async (request, reply) => {
    const admin = requireAdmin(request, reply)
    if (!admin) return

    const rows = db.prepare(`
      SELECT system_messages.*, users.username, users.display_name
      FROM system_messages
      JOIN users ON users.id = system_messages.user_id
      WHERE system_messages.kind IN ('appeal', 'risk_warning')
      ORDER BY system_messages.created_at DESC
      LIMIT 100
    `).all()

    return { messages: rows.map(messageRow) }
  })

  app.post('/api/admin/mailbox/messages/:id/close', async (request, reply) => {
    const admin = requireAdmin(request, reply)
    if (!admin) return

    const id = Number(request.params.id)
    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({ error: 'BAD_REQUEST', message: '消息 ID 不正确' })
    }

    const result = db.prepare(`
      UPDATE system_messages
      SET status = 'closed'
      WHERE id = ? AND kind IN ('appeal', 'risk_warning')
    `).run(id)

    if (result.changes === 0) return reply.code(404).send({ error: 'NOT_FOUND', message: '消息不存在' })
    return { ok: true }
  })

  app.post('/api/admin/mailbox/messages/:id/reply', async (request, reply) => {
    const admin = requireAdmin(request, reply)
    if (!admin) return

    const id = Number(request.params.id)
    const parsed = replySchema.safeParse(request.body)
    if (!Number.isInteger(id) || id <= 0 || !parsed.success) {
      return reply.code(400).send({ error: 'BAD_REQUEST', message: '回复内容不符合要求' })
    }

    const original = db.prepare('SELECT * FROM system_messages WHERE id = ?').get(id)
    if (!original) return reply.code(404).send({ error: 'NOT_FOUND', message: '消息不存在' })
    if (original.kind !== 'appeal') {
      return reply.code(400).send({ error: 'BAD_REQUEST', message: '只有用户申诉需要回复' })
    }

    createSystemMessage({
      userId: original.user_id,
      senderUserId: admin.id,
      kind: 'admin_reply',
      subject: `管理员回复：${original.subject}`,
      body: parsed.data.body,
      status: 'closed',
    })
    db.prepare("UPDATE system_messages SET status = 'closed' WHERE id = ?").run(id)

    return { ok: true }
  })
}
