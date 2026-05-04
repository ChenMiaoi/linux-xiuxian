import crypto from 'node:crypto'
import http from 'node:http'
import { spawnSync } from 'node:child_process'

const host = process.env.WEBHOOK_HOST || '127.0.0.1'
const port = Number(process.env.WEBHOOK_PORT || 9000)
const webhookPath = process.env.WEBHOOK_PATH || '/github-webhook'
const secret = process.env.WEBHOOK_SECRET
const repoDir = process.env.REPO_DIR || '/opt/linux-xiuxian'
const branch = process.env.DEPLOY_BRANCH || 'main'
const expectedRepo = process.env.GITHUB_REPOSITORY || ''
const healthcheckUrl = process.env.HEALTHCHECK_URL || 'http://127.0.0.1:8080/api/health'

let deploying = false
let pending = false

function log(message, meta = {}) {
  const suffix = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : ''
  console.log(`[${new Date().toISOString()}] ${message}${suffix}`)
}

function fail(response, statusCode, message) {
  response.writeHead(statusCode, { 'content-type': 'application/json' })
  response.end(JSON.stringify({ ok: false, error: message }))
}

function ok(response, statusCode, message) {
  response.writeHead(statusCode, { 'content-type': 'application/json' })
  response.end(JSON.stringify({ ok: true, status: message }))
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0

    request.on('data', (chunk) => {
      size += chunk.length
      if (size > 1024 * 1024) {
        request.destroy()
        reject(new Error('Request body too large'))
        return
      }
      chunks.push(chunk)
    })

    request.on('end', () => resolve(Buffer.concat(chunks)))
    request.on('error', reject)
  })
}

function verifySignature(body, signature) {
  if (!secret || !signature?.startsWith('sha256=')) return false

  const expected = `sha256=${crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex')}`

  if (signature.length !== expected.length) return false

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
}

function run(command, args) {
  log(`run: ${command} ${args.join(' ')}`)
  const result = spawnSync(command, args, {
    cwd: repoDir,
    stdio: 'inherit',
    shell: false,
  })

  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} exited with ${result.status}`)
  }
}

function deployOnce(reason) {
  deploying = true
  log('deployment started', reason)

  try {
    run('git', ['fetch', 'origin', branch])
    run('git', ['reset', '--hard', `origin/${branch}`])
    run('git', ['submodule', 'update', '--init', '--recursive'])
    run('npm', ['ci'])
    run('npm', ['run', 'deploy'])

    if (healthcheckUrl) {
      run('curl', ['-fsS', healthcheckUrl])
    }

    log('deployment completed')
  } catch (error) {
    log('deployment failed', { error: error.message })
  } finally {
    deploying = false
    if (pending) {
      pending = false
      setImmediate(() => deployOnce({ queued: true }))
    }
  }
}

function queueDeploy(reason) {
  if (deploying) {
    pending = true
    log('deployment already running; queued latest push', reason)
    return
  }

  setImmediate(() => deployOnce(reason))
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`)

  if (request.method === 'GET' && url.pathname === '/health') {
    ok(response, 200, 'healthy')
    return
  }

  if (request.method !== 'POST' || url.pathname !== webhookPath) {
    fail(response, 404, 'Not found')
    return
  }

  if (!secret) {
    fail(response, 500, 'WEBHOOK_SECRET is not configured')
    return
  }

  let body
  try {
    body = await readBody(request)
  } catch (error) {
    fail(response, 413, error.message)
    return
  }

  if (!verifySignature(body, request.headers['x-hub-signature-256'])) {
    fail(response, 401, 'Invalid signature')
    return
  }

  if (request.headers['x-github-event'] !== 'push') {
    ok(response, 202, 'ignored non-push event')
    return
  }

  let payload
  try {
    payload = JSON.parse(body.toString('utf8'))
  } catch {
    fail(response, 400, 'Invalid JSON')
    return
  }

  if (payload.ref !== `refs/heads/${branch}`) {
    ok(response, 202, 'ignored branch')
    return
  }

  if (expectedRepo && payload.repository?.full_name !== expectedRepo) {
    fail(response, 403, 'Unexpected repository')
    return
  }

  queueDeploy({
    ref: payload.ref,
    after: payload.after,
    repository: payload.repository?.full_name,
  })
  ok(response, 202, 'deployment queued')
})

server.listen(port, host, () => {
  log('webhook deploy service listening', { host, port, webhookPath, repoDir, branch })
})
