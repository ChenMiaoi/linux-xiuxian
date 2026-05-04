import crypto from 'node:crypto'
import path from 'node:path'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import YAML from 'yaml'

const imageName = process.env.IMAGE_NAME || 'linux-xiuxian:latest'
const containerName = process.env.CONTAINER_NAME || 'linux-xiuxian'
const volumeName = process.env.VOLUME_NAME || 'linux-xiuxian-data'
const hostPort = process.env.HOST_PORT || '8080'
const containerPort = process.env.CONTAINER_PORT || '8080'
const configFile = process.env.DEPLOY_CONFIG_FILE || '.deploy.yaml'

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: options.silent ? 'ignore' : 'inherit',
    shell: false,
  })

  if (result.status !== 0 && !options.allowFail) {
    process.exit(result.status || 1)
  }
}

function ensureDeployConfig() {
  if (existsSync(configFile)) return

  const cookieSecret = crypto.randomBytes(32).toString('base64url')
  writeFileSync(configFile, YAML.stringify({
    node_env: 'production',
    host: '0.0.0.0',
    port: Number(containerPort),
    database_path: '/data/app.db',
    site_base: '/',
    cookie: {
      secret: cookieSecret,
      secure: false,
    },
    trust_proxy: false,
    rate_limit: {
      max: 120,
      window: '1 minute',
    },
    admin_usernames: [],
    app_origin: '',
    github: {
      client_id: '',
      client_secret: '',
      callback_url: '',
    },
  }))
}

function readDeployConfig() {
  return YAML.parse(readFileSync(configFile, 'utf8')) || {}
}

function printDeployConfigHint() {
  const config = readDeployConfig()
  const secure = config.cookie?.secure === true
  const proxy = config.trust_proxy === true

  if (!secure || !proxy) {
    console.log(`\n提示: 如果服务器前面有 HTTPS 反代，请把 ${configFile} 里的 cookie.secure 和 trust_proxy 改成 true 后重新部署。`)
  }
}

function dockerMountPath(filePath) {
  const resolved = path.resolve(filePath)
  return process.platform === 'win32' ? resolved.replace(/\\/g, '/') : resolved
}

ensureDeployConfig()

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
  '-v', `${dockerMountPath(configFile)}:/app/.deploy.yaml:ro`,
  '-e', 'CONFIG_FILE=/app/.deploy.yaml',
  imageName,
])

console.log('\n[4/4] 部署完成')
console.log(`访问地址: http://服务器IP:${hostPort}/`)
console.log(`查看日志: docker logs -f ${containerName}`)
printDeployConfigHint()
