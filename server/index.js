import Fastify from 'fastify'
import cookie from '@fastify/cookie'
import rateLimit from '@fastify/rate-limit'
import staticPlugin from '@fastify/static'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getCurrentUser, registerAuthRoutes } from './auth.js'
import { db, publicUser } from './db.js'
import { registerCommentRoutes } from './comments.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distRoot = path.join(rootDir, 'docs/.vitepress/dist')
const siteBase = process.env.SITE_BASE || '/linux-xiuxian/'
const port = Number(process.env.PORT || 3000)
const host = process.env.HOST || '0.0.0.0'

const app = Fastify({
  logger: process.env.NODE_ENV !== 'test',
  trustProxy: process.env.TRUST_PROXY === 'true',
})

await app.register(cookie, {
  secret: process.env.COOKIE_SECRET || 'local-dev-cookie-secret-change-me',
})

await app.register(rateLimit, {
  max: Number(process.env.RATE_LIMIT_MAX || 120),
  timeWindow: process.env.RATE_LIMIT_WINDOW || '1 minute',
})

app.get('/api/health', async () => ({ ok: true }))

registerAuthRoutes(app)
registerCommentRoutes(app)

app.get('/api/rank/me', async (request) => {
  return { user: getCurrentUser(request) }
})

app.get('/api/rank/leaderboard', async () => {
  const rows = db.prepare(`
    SELECT * FROM users
    ORDER BY cultivation_points DESC, created_at ASC
    LIMIT 50
  `).all()
  return { users: rows.map(publicUser) }
})

if (fs.existsSync(distRoot)) {
  await app.register(staticPlugin, {
    root: distRoot,
    prefix: siteBase,
    decorateReply: false,
  })

  app.get('/', async (_request, reply) => reply.redirect(siteBase))

  app.setNotFoundHandler(async (request, reply) => {
    if (request.method !== 'GET' || request.url.startsWith('/api/')) {
      return reply.code(404).send({ error: 'NOT_FOUND' })
    }
    return reply.type('text/html').send(fs.createReadStream(path.join(distRoot, 'index.html')))
  })
} else {
  app.log.warn({ distRoot }, 'VitePress dist directory not found; API-only mode')
}

process.on('SIGTERM', () => {
  db.close()
  process.exit(0)
})

await app.listen({ port, host })
