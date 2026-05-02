import type MarkdownIt from 'markdown-it'
import { readFileSync, existsSync, statSync } from 'node:fs'
import { resolve, join } from 'node:path'

const ROOT = resolve(import.meta.dirname, '../../..')
const OUT_DIR = join(ROOT, '.tmp/out')
const MANIFEST = join(ROOT, '.tmp/playgrounds.json')

// 按 chapterId 分组，每组内部按序号索引
// blockIndex["novel_vol1-chaos_ch01"][0] = { id, chapterId, ... }
let blockIndex: Record<string, { id: number; chapterId: string }[]> = {}
let manifestMtime = 0

function loadBlockIndex(): Record<string, { id: number; chapterId: string }[]> {
  if (!existsSync(MANIFEST)) {
    blockIndex = {}
    manifestMtime = 0
    return blockIndex
  }

  const mtime = statSync(MANIFEST).mtimeMs
  if (mtime === manifestMtime) return blockIndex

  const nextIndex: Record<string, { id: number; chapterId: string }[]> = {}
  const all: { id: number; chapterId: string }[] = JSON.parse(readFileSync(MANIFEST, 'utf-8'))
  for (const b of all) {
    if (!nextIndex[b.chapterId]) nextIndex[b.chapterId] = []
    nextIndex[b.chapterId].push(b)
  }

  blockIndex = nextIndex
  manifestMtime = mtime
  return blockIndex
}

function escape(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function stripMarkers(source: string): string {
  return source
    .replace(/^[ \t]*\/\*\s*xiuxian-hide-start\s*\*\/[ \t]*\r?\n/gm, '')
    .replace(/^[ \t]*\/\*\s*xiuxian-hide-end\s*\*\/[ \t]*\r?\n/gm, '')
    .replace(/[ \t]*\/\*\s*xiuxian-hide-line\s*\*\//g, '')
    .trim()
}

function normalizeIndent(lines: string[]): string {
  const trimmedEdges = [...lines]
  while (trimmedEdges.length && !trimmedEdges[0].trim()) trimmedEdges.shift()
  while (trimmedEdges.length && !trimmedEdges[trimmedEdges.length - 1].trim()) trimmedEdges.pop()

  const indents = trimmedEdges
    .filter(line => line.trim())
    .map(line => line.match(/^[ \t]*/)?.[0].replace(/\t/g, '    ').length || 0)
  const minIndent = indents.length ? Math.min(...indents) : 0

  return trimmedEdges
    .map(line => line.slice(Math.min(minIndent, line.match(/^[ \t]*/)?.[0].length || 0)))
    .join('\n')
    .trim()
}

function visibleCode(source: string): string {
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  const visible: string[] = []
  let hidden = false

  for (const line of lines) {
    if (/xiuxian-hide-start/.test(line)) {
      hidden = true
      continue
    }

    if (/xiuxian-hide-end/.test(line)) {
      hidden = false
      continue
    }

    if (/xiuxian-hide-line/.test(line)) {
      continue
    }

    if (hidden) {
      continue
    }

    visible.push(line)
  }

  return normalizeIndent(visible)
}

function renderCodeFence(md: MarkdownIt, code: string, env: unknown): string {
  if (!code.trim()) return ''
  return md.render(`\`\`\`c\n${code.trim()}\n\`\`\``, env)
}

function renderDisplayCode(md: MarkdownIt, source: string, env: unknown): string {
  const visible = visibleCode(source)
  const full = stripMarkers(source)
  const hasHidden = visible !== full
  const visibleHtml = renderCodeFence(md, visible, env)
  const fullHtml = hasHidden ? renderCodeFence(md, full, env) : ''

  if (!hasHidden) return visibleHtml

  return [
    '<div class="playground-code-toggle-row">',
    '<button class="playground-code-toggle" type="button" aria-pressed="false">显示完整代码</button>',
    '</div>',
    `<div class="playground-code-view playground-code-key">${visibleHtml}</div>`,
    `<div class="playground-code-view playground-code-full" hidden>${fullHtml}</div>`,
  ].join('')
}

function readOut(chapterId: string, blockId: number, file: string): string {
  const p = join(OUT_DIR, chapterId, `block${blockId}`, file)
  if (!existsSync(p)) return ''
  return readFileSync(p, 'utf-8')
}

export default function playgroundPlugin(md: MarkdownIt): void {
  const defaultFence = md.renderer.rules.fence!

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const info = token.info.trim()

    if (!info.startsWith('c:playground')) {
      return defaultFence(tokens, idx, options, env, self)
    }

    const title = info.slice('c:playground'.length).replace(/^:/, '').trim()

    let html = renderDisplayCode(md, token.content, env)
    html = `<div class="language-${info} vp-adaptive-theme">${html}</div>`

    // 章节 ID + 章内序号
    const pagePath = (env as any)?.relativePath || 'unknown'
    const chapterId = pagePath.replace(/\.md$/, '').replace(/\//g, '_')
    const chapterCounters = ((env as any).__playgroundCounters ||= {}) as Record<string, number>
    if (!chapterCounters[chapterId]) chapterCounters[chapterId] = 0
    const localIdx = chapterCounters[chapterId]++

    // 从 manifest 中找到对应的 block ID
    const blocks = loadBlockIndex()[chapterId]
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

    // 拼接 HTML：参考 Rust 文档的 Run 入口，但本项目使用构建期产物在页面内运行。
    let extra = `<div class="playground-panel">`

    if (hasWasm) {
      const wasmDir = `playground-src/${chapterId}/block${blockId}`
      extra += `<div class="playground-actions">`
      extra += `<button class="playground-run" type="button" data-wasm="${wasmDir}">运行</button>`
      extra += `<span class="playground-status">浏览器 WASM 沙箱执行；架构相关结果以 RISC-V 64 参考输出/汇编为准</span>`
      extra += `</div>`
      extra += `<pre class="playground-run-output" hidden><code></code></pre>`
    } else {
      extra += `<div class="playground-actions playground-actions-muted">`
      extra += `<span class="playground-status">此示例未生成可运行 WASM，仅提供构建期输出</span>`
      extra += `</div>`
    }

    extra += `<details class="playground-output">`
    extra += `<summary class="playground-output-label">参考输出</summary>`
    extra += `<pre class="playground-output-pre"><code>${escape(output || '(无输出)')}</code></pre>`
    extra += `</details>`

    if (asm) {
      extra += `<details class="playground-asm">`
      extra += `<summary class="playground-asm-label">汇编 (RISC-V 64)</summary>`
      extra += `<pre class="playground-asm-pre"><code>${escape(asm)}</code></pre>`
      extra += `</details>`
    }
    extra += `</div>`

    html = html.replace(/<\/div>\s*$/, extra + '</div>')

    return html
  }
}
