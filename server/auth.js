import './config.js'
import crypto from 'node:crypto'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { addPoints, awardPoints, db, publicUser } from './db.js'
import { POINT_RULES } from './rank.js'

export const SESSION_COOKIE = 'xiuxian_session'
const SESSION_DAYS = Number(process.env.SESSION_DAYS || 30)

const usernameSchema = z
  .string()
  .trim()
  .min(3)
  .max(24)
  .regex(/^[a-zA-Z0-9_-]+$/)
  .refine((value) => ![
    'admin',
    'administrator',
    'api',
    'auth',
    'github',
    'root',
    'system',
    'null',
    'undefined',
  ].includes(value.toLowerCase()))

export const registerSchema = z.object({
  username: usernameSchema,
  password: z.string().min(8).max(128),
  displayName: z.string().trim().min(1).max(32).regex(/^[^\u0000-\u001f\u007f]+$/).optional(),
})

export const loginSchema = z.object({
  username: z.string().trim().min(1).max(24),
  password: z.string().min(1).max(128),
})

export function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex')
}

export function sessionCookieOptions() {
  return {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.COOKIE_SECURE === 'true',
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  }
}

export function createSession(userId) {
  const token = crypto.randomBytes(32).toString('base64url')
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000).toISOString()
  db.prepare('INSERT INTO sessions (user_id, token_hash, expires_at) VALUES (?, ?, ?)')
    .run(userId, hashToken(token), expiresAt)
  return token
}

export function getCurrentUser(request) {
  const token = request.cookies?.[SESSION_COOKIE]
  if (!token) return null

  const row = db.prepare(`
    SELECT users.*
    FROM sessions
    JOIN users ON users.id = sessions.user_id
    WHERE sessions.token_hash = ? AND sessions.expires_at > CURRENT_TIMESTAMP
  `).get(hashToken(token))

  if (row?.status === 'banned') return null
  return publicUser(row)
}

export function requireUser(request, reply) {
  const user = getCurrentUser(request)
  if (!user) {
    reply.code(401).send({ error: 'UNAUTHORIZED', message: '请先登录' })
    return null
  }
  return user
}

export function bootstrapAdminUsers() {
  const usernames = (process.env.ADMIN_USERNAMES || '')
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean)

  for (const username of usernames) {
    db.prepare(`
      UPDATE users
      SET role = 'admin', updated_at = CURRENT_TIMESTAMP
      WHERE lower(username) = lower(?)
    `).run(username)
  }
}

export function requireAdmin(request, reply) {
  const user = requireUser(request, reply)
  if (!user) return null
  if (user.role !== 'admin') {
    reply.code(403).send({ error: 'FORBIDDEN', message: '需要管理员权限' })
    return null
  }
  return user
}

export function registerAuthRoutes(app) {
  app.post('/api/auth/register', {
    config: {
      rateLimit: {
        max: 5,
        timeWindow: '10 minutes',
      },
    },
  }, async (request, reply) => {
    const parsed = registerSchema.safeParse(request.body)
    if (!parsed.success) {
      return reply.code(400).send({ error: 'BAD_REQUEST', message: '用户名、显示名或密码格式不正确' })
    }

    const username = parsed.data.username
    const existing = db.prepare('SELECT id FROM users WHERE lower(username) = lower(?)').get(username)
    if (existing) {
      return reply.code(409).send({ error: 'USERNAME_EXISTS', message: '该道号已被占用' })
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 10)
    let result
    try {
      result = db.prepare(`
        INSERT INTO users (username, password_hash, display_name, cultivation_points)
        VALUES (?, ?, ?, 0)
      `).run(username, passwordHash, parsed.data.displayName || username)
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return reply.code(409).send({ error: 'USERNAME_EXISTS', message: '该道号已被占用' })
      }
      throw error
    }
    awardPoints(result.lastInsertRowid, {
      source: 'register',
      points: POINT_RULES.register.points,
      refType: 'user',
      refId: result.lastInsertRowid,
    })
    bootstrapAdminUsers()

    const token = createSession(result.lastInsertRowid)
    const user = publicUser(db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid))
    reply.setCookie(SESSION_COOKIE, token, sessionCookieOptions())
    return { user }
  })

  app.post('/api/auth/login', {
    config: {
      rateLimit: {
        max: 20,
        timeWindow: '10 minutes',
      },
    },
  }, async (request, reply) => {
    const parsed = loginSchema.safeParse(request.body)
    if (!parsed.success) {
      return reply.code(400).send({ error: 'BAD_REQUEST', message: '请输入道号和口令' })
    }

    const row = db.prepare('SELECT * FROM users WHERE lower(username) = lower(?)').get(parsed.data.username)
    if (row?.status === 'banned') {
      return reply.code(403).send({ error: 'USER_BANNED', message: '该账号已被封禁' })
    }
    const ok = row ? await bcrypt.compare(parsed.data.password, row.password_hash) : false
    if (!ok) {
      return reply.code(401).send({ error: 'BAD_CREDENTIALS', message: '道号或口令不正确' })
    }

    bootstrapAdminUsers()
    const freshRow = db.prepare('SELECT * FROM users WHERE id = ?').get(row.id)
    const token = createSession(row.id)
    reply.setCookie(SESSION_COOKIE, token, sessionCookieOptions())
    return { user: publicUser(freshRow) }
  })

  app.post('/api/auth/logout', async (request, reply) => {
    const token = request.cookies?.[SESSION_COOKIE]
    if (token) db.prepare('DELETE FROM sessions WHERE token_hash = ?').run(hashToken(token))
    reply
      .clearCookie(SESSION_COOKIE, { path: '/' })
      .setCookie(SESSION_COOKIE, '', {
        ...sessionCookieOptions(),
        expires: new Date(0),
        maxAge: 0,
      })
    return { ok: true }
  })

  app.get('/api/auth/me', async (request) => ({ user: getCurrentUser(request) }))

  app.post('/api/auth/seed-points', async (request, reply) => {
    if (process.env.NODE_ENV === 'production') return reply.code(404).send({ error: 'NOT_FOUND' })
    const user = requireUser(request, reply)
    if (!user) return
    addPoints(user.id, 100)
    return { user: getCurrentUser(request) }
  })
}
