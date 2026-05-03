import './config.js'
import crypto from 'node:crypto'
import { db, publicUser } from './db.js'
import { getCurrentUser, requireUser } from './auth.js'

const GITHUB_STATE_COOKIE = 'xiuxian_github_state'

function githubConfig(request) {
  const clientId = process.env.GITHUB_CLIENT_ID
  const clientSecret = process.env.GITHUB_CLIENT_SECRET
  const siteBase = process.env.SITE_BASE || '/linux-xiuxian/'
  const origin = process.env.APP_ORIGIN || `${request.protocol}://${request.hostname}`
  const callbackUrl = process.env.GITHUB_CALLBACK_URL || `${origin}/api/github/callback`
  const successUrl = `${siteBase.replace(/\/$/, '')}/?github=linked`
  const failureUrl = `${siteBase.replace(/\/$/, '')}/?github=failed`

  return { clientId, clientSecret, callbackUrl, successUrl, failureUrl }
}

function stateCookieOptions() {
  return {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.COOKIE_SECURE === 'true',
    maxAge: 10 * 60,
  }
}

async function exchangeCodeForToken({ clientId, clientSecret, callbackUrl, code }) {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: callbackUrl,
    }),
  })

  const data = await response.json()
  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || data.error || 'GitHub 授权失败')
  }
  return data.access_token
}

async function fetchGitHubUser(accessToken) {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${accessToken}`,
      'User-Agent': 'linux-xiuxian',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  const data = await response.json()
  if (!response.ok || !data.id || !data.login) {
    throw new Error(data.message || '无法读取 GitHub 用户信息')
  }
  return data
}

export function registerGitHubRoutes(app) {
  app.get('/api/github/status', async (request) => ({ user: getCurrentUser(request) }))

  app.get('/api/github/login', async (request, reply) => {
    const user = requireUser(request, reply)
    if (!user) return

    const config = githubConfig(request)
    if (!config.clientId || !config.clientSecret) {
      return reply.code(503).send({ error: 'GITHUB_NOT_CONFIGURED', message: 'GitHub OAuth 尚未配置' })
    }

    const state = crypto.randomBytes(24).toString('base64url')
    const url = new URL('https://github.com/login/oauth/authorize')
    url.searchParams.set('client_id', config.clientId)
    url.searchParams.set('redirect_uri', config.callbackUrl)
    url.searchParams.set('scope', 'read:user')
    url.searchParams.set('state', state)

    reply.setCookie(GITHUB_STATE_COOKIE, state, stateCookieOptions())
    return reply.redirect(url.toString())
  })

  app.get('/api/github/callback', async (request, reply) => {
    const user = getCurrentUser(request)
    const config = githubConfig(request)
    const expectedState = request.cookies?.[GITHUB_STATE_COOKIE]
    const receivedState = request.query?.state
    const code = request.query?.code

    reply.clearCookie(GITHUB_STATE_COOKIE, { path: '/' })

    if (!user || !expectedState || expectedState !== receivedState || !code) {
      return reply.redirect(config.failureUrl)
    }

    try {
      const accessToken = await exchangeCodeForToken({
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        callbackUrl: config.callbackUrl,
        code,
      })
      const githubUser = await fetchGitHubUser(accessToken)
      const githubId = String(githubUser.id)
      const linked = db.prepare('SELECT id FROM users WHERE github_id = ? AND id != ?').get(githubId, user.id)
      if (linked) return reply.redirect(`${config.failureUrl}=already_linked`)

      db.prepare(`
        UPDATE users
        SET github_id = ?,
            github_login = ?,
            github_avatar_url = ?,
            github_connected_at = CURRENT_TIMESTAMP,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(githubId, githubUser.login, githubUser.avatar_url || null, user.id)

      return reply.redirect(config.successUrl)
    } catch (error) {
      request.log.warn({ err: error }, 'GitHub OAuth callback failed')
      return reply.redirect(config.failureUrl)
    }
  })

  app.post('/api/github/unlink', async (request, reply) => {
    const user = requireUser(request, reply)
    if (!user) return

    db.prepare(`
      UPDATE users
      SET github_id = NULL,
          github_login = NULL,
          github_avatar_url = NULL,
          github_connected_at = NULL,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(user.id)

    const row = db.prepare('SELECT * FROM users WHERE id = ?').get(user.id)
    return { user: publicUser(row) }
  })
}
