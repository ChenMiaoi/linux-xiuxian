/**
 * extract-playgrounds.ts
 * 扫描所有 markdown 文件，提取 c:playground 代码块
 * 输出: .tmp/playgrounds.json（清单）+ .tmp/src/<chapter>/<block>/prog.c（源码）
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, relative, extname } from 'node:path'

const ROOT = join(import.meta.dirname, '..')
const DOCS = join(ROOT, 'docs')
const OUT = join(ROOT, '.tmp')

interface Block {
  id: number
  chapterId: string
  title: string
  srcPath: string   // prog.c 的绝对路径
}

let counter = 0
const blocks: Block[] = []

function walk(dir: string) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full)
    } else if (extname(entry.name) === '.md') {
      extract(full)
    }
  }
}

function extract(file: string) {
  const content = readFileSync(file, 'utf-8')
  const rel = relative(DOCS, file).replace(/\\/g, '/')
  const chapterId = rel.replace(/\.md$/, '').replace(/\//g, '_')

  // 匹配 ```c:playground... 代码块
  const regex = /```c:playground(?::([^\n]*))?[\r\n]([\s\S]*?)```/g
  let match
  while ((match = regex.exec(content)) !== null) {
    const id = ++counter
    const title = match[1]?.trim() || ''
    const code = match[2]

    const blockDir = join(OUT, 'src', chapterId, `block${id}`)
    mkdirSync(blockDir, { recursive: true })
    writeFileSync(join(blockDir, 'prog.c'), code, 'utf-8')

    blocks.push({ id, chapterId, title, srcPath: join(blockDir, 'prog.c') })
  }
}

walk(DOCS)

// 写清单
const manifest = join(OUT, 'playgrounds.json')
writeFileSync(manifest, JSON.stringify(blocks, null, 2), 'utf-8')

console.log(`Extracted ${blocks.length} playground blocks to ${OUT}/src/`)
console.log(`Manifest: ${manifest}`)
