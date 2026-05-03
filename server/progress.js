import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { z } from 'zod'
import { requireUser } from './auth.js'
import { awardChapterUnlockPoints, db, publicUser } from './db.js'
import { normalizePagePath } from './page-path.js'

const chapterUnlockSchema = z.object({
  pagePath: z.string().trim().min(1).max(300),
})

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function chapterMarkdownPath(pagePath) {
  const normalized = normalizePagePath(pagePath)
  if (!/^\/(?:en\/)?novel\/[^/]+\/ch[\w-]+$/.test(normalized)) return null

  const relativePath = normalized.replace(/^\//, '').replaceAll('/', path.sep)
  const markdownPath = path.join(rootDir, 'docs', `${relativePath}.md`)
  if (!markdownPath.startsWith(path.join(rootDir, 'docs'))) return null
  return fs.existsSync(markdownPath) ? { normalized, markdownPath } : null
}

export function registerProgressRoutes(app) {
  app.post('/api/progress/chapter-unlock', async (request, reply) => {
    const user = requireUser(request, reply)
    if (!user) return

    const parsed = chapterUnlockSchema.safeParse(request.body)
    if (!parsed.success) {
      return reply.code(400).send({ error: 'BAD_REQUEST', message: '章节路径不正确' })
    }

    const chapter = chapterMarkdownPath(parsed.data.pagePath)
    if (!chapter) {
      return reply.code(400).send({ error: 'BAD_REQUEST', message: '章节不存在' })
    }

    const pointAward = awardChapterUnlockPoints(user.id, chapter.normalized)
    const freshUser = publicUser(db.prepare('SELECT * FROM users WHERE id = ?').get(user.id))
    return { ok: true, pointAward, user: freshUser }
  })
}
