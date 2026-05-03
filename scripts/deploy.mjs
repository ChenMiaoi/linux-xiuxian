import crypto from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const imageName = process.env.IMAGE_NAME || 'linux-xiuxian:latest'
const containerName = process.env.CONTAINER_NAME || 'linux-xiuxian'
const volumeName = process.env.VOLUME_NAME || 'linux-xiuxian-data'
const hostPort = process.env.HOST_PORT || '3000'
const containerPort = process.env.CONTAINER_PORT || '3000'
const envFile = process.env.DEPLOY_ENV_FILE || '.deploy.env'

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: options.silent ? 'ignore' : 'inherit',
    shell: false,
  })

  if (result.status !== 0 && !options.allowFail) {
    process.exit(result.status || 1)
  }
}

function ensureDeployEnv() {
  if (existsSync(envFile)) return

  const cookieSecret = crypto.randomBytes(32).toString('base64url')
  writeFileSync(envFile, [
    'NODE_ENV=production',
    'HOST=0.0.0.0',
    `PORT=${containerPort}`,
    'DATABASE_PATH=/data/app.db',
    'SITE_BASE=/linux-xiuxian/',
    `COOKIE_SECRET=${cookieSecret}`,
    'COOKIE_SECURE=false',
    'TRUST_PROXY=false',
    'RATE_LIMIT_MAX=120',
    'RATE_LIMIT_WINDOW=1 minute',
    '',
  ].join('\n'))
}

function printDeployEnvHint() {
  const content = readFileSync(envFile, 'utf8')
  const secure = /^COOKIE_SECURE=true$/m.test(content)
  const proxy = /^TRUST_PROXY=true$/m.test(content)

  if (!secure || !proxy) {
    console.log(`\n提示: 如果服务器前面有 HTTPS 反代，请把 ${envFile} 改成 COOKIE_SECURE=true 和 TRUST_PROXY=true 后重新部署。`)
  }
}

ensureDeployEnv()

console.log(`\n[1/4] 构建镜像 ${imageName}`)
run('docker', ['build', '-t', imageName, '.'])

console.log(`\n[2/4] 停止旧容器 ${containerName}`)
run('docker', ['rm', '-f', containerName], { allowFail: true, silent: true })

console.log(`\n[3/4] 启动新容器 ${containerName}`)
run('docker', [
  'run',
  '-d',
  '--name', containerName,
  '--restart', 'unless-stopped',
  '-p', `${hostPort}:${containerPort}`,
  '-v', `${volumeName}:/data`,
  '--env-file', envFile,
  imageName,
])

console.log('\n[4/4] 部署完成')
console.log(`访问地址: http://服务器IP:${hostPort}/linux-xiuxian/`)
console.log(`查看日志: docker logs -f ${containerName}`)
printDeployEnvHint()
