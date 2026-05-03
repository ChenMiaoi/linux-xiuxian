/**
 * build-kernel-snippets.ts
 * Extracts referenced Linux source snippets for static VitePress pages.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve, sep } from 'node:path'

type SourceRef = {
  path: string
  line?: number
  ref: string
  endLine?: number
  symbol?: string
  note?: string
}

type SourceSnippet = Required<Pick<SourceRef, 'path' | 'line'>> & {
  endLine: number
  symbol: string
  note: string
  code: string
}

const ROOT = resolve(import.meta.dirname, '..')
const DOCS = join(ROOT, 'docs')
const NOVEL = join(DOCS, 'novel')
const VENDOR_LINUX = join(ROOT, 'vendor', 'linux')
const OUT = join(DOCS, 'public', 'kernel-snippets.json')
const DEFAULT_CONTEXT_LINES = 28
const MAX_LINES = 120

function walkMarkdownFiles(dir: string): string[] {
  if (!existsSync(dir)) return []

  const files: string[] = []
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      files.push(...walkMarkdownFiles(fullPath))
      continue
    }
    if (entry.endsWith('.md')) files.push(fullPath)
  }
  return files
}

function parseAttrs(raw: string): Record<string, string> {
  const attrs: Record<string, string> = {}
  const attrRe = /([A-Za-z][\w-]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/g
  let match: RegExpExecArray | null
  while ((match = attrRe.exec(raw))) {
    attrs[match[1]] = match[2] ?? match[3] ?? ''
  }
  return attrs
}

function parseSourceRefs(markdown: string): SourceRef[] {
  const refs: SourceRef[] = []
  const tagRe = /<KernelSourceLink\b([^>]*)\/?>/g
  let match: RegExpExecArray | null

  while ((match = tagRe.exec(markdown))) {
    const attrs = parseAttrs(match[1])
    const rawLine = attrs.line ?? ''
    const line = Number.parseInt(rawLine, 10)
    const hasNumericLine = Number.isInteger(line) && line > 0
    const symbol = attrs.symbol || (!hasNumericLine && rawLine ? rawLine : '')
    if (!attrs.path || (!hasNumericLine && !symbol)) continue

    const endLine = Number.parseInt(attrs.endLine ?? attrs.end ?? '', 10)
    refs.push({
      path: attrs.path,
      line: hasNumericLine ? line : undefined,
      ref: hasNumericLine ? String(line) : symbol,
      endLine: hasNumericLine && Number.isInteger(endLine) && endLine >= line ? endLine : undefined,
      symbol,
      note: attrs.note,
    })
  }

  return refs
}

function resolveLinuxPath(sourcePath: string): string | null {
  if (sourcePath.includes('\0')) return null

  const normalized = sourcePath.replace(/\\/g, '/').replace(/^\/+/, '')
  const absolute = resolve(VENDOR_LINUX, normalized)
  const rel = relative(VENDOR_LINUX, absolute)

  if (rel === '' || rel.startsWith('..') || rel.includes(`..${sep}`)) return null
  return absolute
}

function snippetKey(ref: SourceRef): string {
  return `${ref.path}:${ref.ref}:${ref.endLine ?? ''}`
}

function extractSnippet(ref: SourceRef): SourceSnippet | null {
  const sourceFile = resolveLinuxPath(ref.path)
  if (!sourceFile || !existsSync(sourceFile)) return null

  const lines = readFileSync(sourceFile, 'utf-8').split(/\r?\n/)
  const line = ref.line ?? findSymbolLine(lines, ref.symbol ?? ref.ref)
  if (!line || line > lines.length) return null

  const requestedEnd = ref.endLine ?? Math.min(lines.length, line + DEFAULT_CONTEXT_LINES - 1)
  const endLine = Math.min(lines.length, requestedEnd, line + MAX_LINES - 1)
  const code = lines.slice(line - 1, endLine).join('\n')

  return {
    path: ref.path,
    line,
    endLine,
    symbol: ref.symbol ?? '',
    note: ref.note ?? '',
    code,
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function findSymbolLine(lines: string[], symbol: string): number | null {
  if (!symbol) return null

  const escaped = escapeRegExp(symbol)
  const asmSymbol = new RegExp(`\\bSYM_\\w+\\s*\\(\\s*${escaped}\\b`)
  const asmIndex = lines.findIndex((line) => asmSymbol.test(line))
  if (asmIndex >= 0) return asmIndex + 1

  const cFunction = new RegExp(`\\b${escaped}\\s*\\(`)
  for (let index = 0; index < lines.length; index++) {
    if (!cFunction.test(lines[index])) continue

    const window = lines.slice(index, Math.min(lines.length, index + 6)).join('\n')
    const braceIndex = window.indexOf('{')
    const semicolonIndex = window.indexOf(';')
    if (braceIndex >= 0 && (semicolonIndex < 0 || braceIndex < semicolonIndex)) {
      return index + 1
    }
  }

  const exactSymbol = new RegExp(`\\b${escapeRegExp(symbol)}\\b`)
  const index = lines.findIndex((line) => exactSymbol.test(line))
  return index >= 0 ? index + 1 : null
}

function main() {
  const snippets: Record<string, SourceSnippet> = {}
  const refs = walkMarkdownFiles(NOVEL).flatMap((file) => {
    const markdown = readFileSync(file, 'utf-8')
    return parseSourceRefs(markdown)
  })

  for (const ref of refs) {
    const key = snippetKey(ref)
    if (snippets[key]) continue

    const snippet = extractSnippet(ref)
    if (snippet) snippets[key] = snippet
  }

  mkdirSync(dirname(OUT), { recursive: true })
  writeFileSync(OUT, `${JSON.stringify(snippets, null, 2)}\n`, 'utf-8')
  console.log(`生成 ${Object.keys(snippets).length} 个内核源码片段: ${OUT}`)
}

main()
