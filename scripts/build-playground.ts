/**
 * build-playground.ts
 * 构建 playground: 提取代码 → Docker 编译 → 输出到 public/assets/src/
 *
 * 用法: npx tsx scripts/build-playground.ts
 */
import { execSync } from 'node:child_process'
import { readFileSync, mkdirSync, existsSync, cpSync } from 'node:fs'
import { join, resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const TMP = join(ROOT, '.tmp')
const DOCS = join(ROOT, 'docs')
const ASSETS = join(DOCS, 'public/assets/src')
const DOCKERFILE = join(ROOT, 'scripts/Dockerfile.playground')

const ENV = { ...process.env, MSYS_NO_PATHCONV: '1' }

function run(cmd: string) {
  console.log(`  > ${cmd}`)
  execSync(cmd, { cwd: ROOT, stdio: 'inherit', timeout: 600000, env: ENV })
}

function runCapture(cmd: string): string {
  return execSync(cmd, { cwd: ROOT, encoding: 'utf-8', timeout: 600000, maxBuffer: 10 * 1024 * 1024, env: ENV }).trim()
}

async function main() {
  const startTime = Date.now()

  // 1. 提取代码块
  console.log('\n[1/4] 提取 playground 代码块...')
  run('npx tsx scripts/extract-playgrounds.ts')

  // 2. 检查是否有代码块
  const manifestPath = join(TMP, 'playgrounds.json')
  if (!existsSync(manifestPath)) {
    console.log('没有找到 playground 代码块，跳过。')
    return
  }
  const blocks: any[] = JSON.parse(readFileSync(manifestPath, 'utf-8'))
  console.log(`  找到 ${blocks.length} 个代码块\n`)

  if (blocks.length === 0) return

  // 3. 构建 Docker 镜像
  console.log('[2/4] 构建 Docker 镜像...')
  run(`docker build -t xiuxian-playground -f "${DOCKERFILE}" scripts/`)

  // 4. 运行 Docker 编译
  console.log('\n[3/4] Docker 批量编译...')
  const srcDir = join(TMP, 'src')
  const outDir = join(TMP, 'out')

  // 检测系统，决定挂载路径格式
  const isWin = process.platform === 'win32'
  const srcMount = isWin ? srcDir.replace(/\\/g, '/') : srcDir
  const outMount = isWin ? outDir.replace(/\\/g, '/') : outDir

  run(`docker run --rm -v "${srcMount}:/src" -v "${outMount}:/out" xiuxian-playground`)

  // 5. 复制结果到 public/assets/src/
  console.log('\n[4/4] 复制输出到 public/assets/src/...')
  mkdirSync(ASSETS, { recursive: true })
  cpSync(outDir, ASSETS, { recursive: true })

  // 统计
  let wasmCount = 0
  for (const b of blocks) {
    if (existsSync(join(ASSETS, b.chapterId, `block${b.id}`, 'prog.wasm'))) {
      wasmCount++
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
  console.log(`\n完成! ${blocks.length} 个代码块, ${wasmCount} 个 WASM, 耗时 ${elapsed}s`)
}

main().catch(e => {
  console.error('构建失败:', e)
  process.exit(1)
})
