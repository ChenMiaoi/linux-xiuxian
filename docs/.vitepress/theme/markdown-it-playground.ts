import type MarkdownIt from 'markdown-it'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, join } from 'node:path'

const ROOT = resolve(import.meta.dirname, '../../..')
const OUT_DIR = join(ROOT, '.tmp/out')
const MANIFEST = join(ROOT, '.tmp/playgrounds.json')

// 按 chapterId 分组，每组内部按序号索引
// blockIndex["novel_vol1-chaos_ch01"][0] = { id, chapterId, ... }
let blockIndex: Record<string, { id: number; chapterId: string }[]> = {}

if (existsSync(MANIFEST)) {
  const all: { id: number; chapterId: string }[] = JSON.parse(readFileSync(MANIFEST, 'utf-8'))
  for (const b of all) {
    if (!blockIndex[b.chapterId]) blockIndex[b.chapterId] = []
    blockIndex[b.chapterId].push(b)
  }
}

function escape(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function readOut(chapterId: string, blockId: number, file: string): string {
  const p = join(OUT_DIR, chapterId, `block${blockId}`, file)
  if (!existsSync(p)) return ''
  return readFileSync(p, 'utf-8')
}

export default function playgroundPlugin(md: MarkdownIt): void {
  const chapterCounters: Record<string, number> = {}

  const defaultFence = md.renderer.rules.fence!

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const info = token.info.trim()

    if (!info.startsWith('c:playground')) {
      return defaultFence(tokens, idx, options, env, self)
    }

    const title = info.slice('c:playground'.length).replace(/^:/, '').trim()

    // Shiki 用 c 高亮
    const originalInfo = token.info
    token.info = 'c'
    let html = defaultFence(tokens, idx, options, env, self)
    token.info = originalInfo
    html = html.replace(/language-c(?=\s|")/g, `language-${info}`)

    // 章节 ID + 章内序号
    const pagePath = (env as any)?.relativePath || 'unknown'
    const chapterId = pagePath.replace(/\.md$/, '').replace(/\//g, '_')
    if (!chapterCounters[chapterId]) chapterCounters[chapterId] = 0
    const localIdx = chapterCounters[chapterId]++

    // 从 manifest 中找到对应的 block ID
    const blocks = blockIndex[chapterId]
    const block = blocks?.[localIdx]
    const blockId = block?.id

    if (!blockId) {
      // 没有预编译数据，直接返回原始代码块
      return html
    }

    // 读取预编译结果
    const output = readOut(chapterId, blockId, 'output.txt')
    let asm = readOut(chapterId, blockId, 'prog.s')
    const hasWasm = existsSync(join(OUT_DIR, chapterId, `block${blockId}`, 'prog.wasm'))

    // 清理汇编
    if (asm) {
      asm = asm.split('\n').filter(l => {
        const t = l.trim()
        if (!t) return false
        if (t.startsWith('.file') || t.startsWith('.ident')) return false
        if (t.startsWith('.section\t.note')) return false
        if (t.startsWith('.section\t.gnu')) return false
        return true
      }).join('\n').trim()
    }

    // 拼接 HTML
    let extra = `<div class="playground-output">`
    extra += `<div class="playground-output-label">运行结果</div>`
    extra += `<pre class="playground-output-pre"><code>${escape(output || '(无输出)')}</code></pre>`
    extra += `</div>`

    if (asm) {
      extra += `<details class="playground-asm">`
      extra += `<summary class="playground-asm-label">汇编 (x86-64 Intel)</summary>`
      extra += `<pre class="playground-asm-pre"><code>${escape(asm)}</code></pre>`
      extra += `</details>`
    }

    if (hasWasm) {
      const wasmDir = `assets/src/${chapterId}/block${blockId}`
      extra += `<div class="playground-actions">`
      extra += `<button class="playground-run" data-wasm="${wasmDir}">交互运行</button>`
      extra += `<div class="playground-run-output" style="display:none"></div>`
      extra += `</div>`
    }

    html = html.replace(/<\/div>\s*$/, extra + '</div>')

    return html
  }
}
