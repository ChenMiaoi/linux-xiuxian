/**
 * build-kernel-snippets.ts
 * Extracts referenced Linux source snippets for static VitePress pages.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { kernelSourceTerms, type KernelSourceTerm } from '../docs/.vitepress/kernel-source-terms'

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
const VENDOR_LINUX = join(ROOT, 'vendor', 'linux')
const OUT = join(DOCS, 'public', 'kernel-snippets.json')
const GENERATED_TERMS_OUT = join(DOCS, '.vitepress', 'generated-kernel-source-terms.ts')
const DEFAULT_CONTEXT_LINES = 28
const MAX_LINES = 120
const AUTO_CONTEXT_LINES = 24

const SOURCE_DIRS = [
  'arch/riscv',
  'block',
  'fs',
  'include/linux',
  'include/uapi',
  'init',
  'ipc',
  'kernel',
  'lib',
  'mm',
  'net',
  'security',
]

const SOURCE_EXTENSIONS = new Set([
  '',
  '.S',
  '.c',
  '.h',
])

const IGNORED_AUTO_TERMS = new Set([
  '0',
  '1',
  'A',
  'D',
  'G',
  'R',
  'U',
  'V',
  'W',
  'X',
  'a',
  'a0',
  'a1',
  'a2',
  'a3',
  'a4',
  'a5',
  'a6',
  'a7',
  'b',
  'x',
  'int',
  'char',
  'long',
  'low',
  'high',
  'min',
  'data',
  'size',
  'flags',
  'pending',
  'ready',
  'head',
  'end',
  'open',
  'close',
  'read',
  'write',
  'send',
  'recv',
  'connect',
  'bind',
  'listen',
  'accept',
  'grep',
  'tail',
  'ls',
  'ps',
  'dmesg',
  'insmod',
  'NULL',
  'ra',
  'sp',
  'tp',
])

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

function walkSourceFiles(dir: string): string[] {
  if (!existsSync(dir)) return []

  const files: string[] = []
  for (const entry of readdirSync(dir)) {
    if (entry === '.git') continue

    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      files.push(...walkSourceFiles(fullPath))
      continue
    }

    const dot = entry.lastIndexOf('.')
    const ext = dot >= 0 ? entry.slice(dot) : ''
    if (SOURCE_EXTENSIONS.has(ext)) files.push(fullPath)
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
  const tagRe = /<KernelSource(?:Link|Term)\b([^>]*)\/?>/g
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

function parseCodeTerms(markdown: string): string[] {
  const terms: string[] = []
  const codeSpanRe = /`([^`\n]{1,80})`/g
  let match: RegExpExecArray | null

  while ((match = codeSpanRe.exec(markdown))) {
    const term = normalizeTerm(match[1])
    if (term) terms.push(term)
  }

  return terms
}

function normalizeTerm(value: string): string {
  return value.trim().replace(/\(\)$/, '')
}

function refFromRegisteredTerm(term: (typeof kernelSourceTerms)[string]): SourceRef {
  const ref = term.line ? String(term.line) : (term.symbol ?? term.label)
  return {
    path: term.path,
    line: term.line,
    ref,
    endLine: term.line && term.endLine && term.endLine >= term.line ? term.endLine : undefined,
    symbol: term.symbol ?? term.label,
    note: term.note,
  }
}

function isIdentifierTerm(term: string): boolean {
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(term)) return false
  if (term.length < 3) return false
  return !IGNORED_AUTO_TERMS.has(term)
}

function isSourcePathTerm(term: string): boolean {
  if (!term.includes('/')) return false
  const sourceFile = resolveLinuxPath(term)
  return Boolean(sourceFile && existsSync(sourceFile) && statSync(sourceFile).isFile())
}

function makeTermKeyPattern(terms: Iterable<string>): RegExp | null {
  const keys = [...terms].filter(isIdentifierTerm).sort((a, b) => b.length - a.length)
  if (keys.length === 0) return null
  return new RegExp(`\\b(?:${keys.map(escapeRegExp).join('|')})\\b`, 'g')
}

function collectMarkdownTerms(files: string[]): Set<string> {
  const terms = new Set<string>()

  for (const file of files) {
    const markdown = readFileSync(file, 'utf-8')
    for (const term of parseCodeTerms(markdown)) terms.add(term)
  }

  return terms
}

function resolvePathTerm(term: string): KernelSourceTerm | null {
  const sourceFile = resolveLinuxPath(term)
  if (!sourceFile || !existsSync(sourceFile) || !statSync(sourceFile).isFile()) return null

  return {
    label: term,
    path: term,
    line: 1,
    endLine: AUTO_CONTEXT_LINES,
    symbol: term,
    note: '源码文件',
  }
}

function resolveIdentifierTerms(terms: Set<string>): Record<string, KernelSourceTerm> {
  const unresolved = new Set([...terms].filter(isIdentifierTerm))
  for (const key of Object.keys(kernelSourceTerms)) unresolved.delete(key)

  const pattern = makeTermKeyPattern(unresolved)
  if (!pattern) return {}

  const resolved: Record<string, KernelSourceTerm> = {}
  const sourceFiles = SOURCE_DIRS.flatMap((dir) => walkSourceFiles(join(VENDOR_LINUX, dir)))

  for (const file of sourceFiles) {
    if (unresolved.size === 0) break

    let lines: string[]
    try {
      lines = readFileSync(file, 'utf-8').split(/\r?\n/)
    } catch {
      continue
    }

    const sourcePath = relative(VENDOR_LINUX, file).replace(/\\/g, '/')
    for (let index = 0; index < lines.length; index++) {
      if (unresolved.size === 0) break

      pattern.lastIndex = 0
      const matches = lines[index].match(pattern)
      if (!matches) continue

      for (const match of matches) {
        if (!unresolved.has(match)) continue

        unresolved.delete(match)
        resolved[match] = {
          label: match,
          path: sourcePath,
          line: index + 1,
          endLine: Math.min(lines.length, index + AUTO_CONTEXT_LINES),
          symbol: match,
          note: '自动匹配的内核源码',
        }
      }
    }
  }

  return resolved
}

function buildGeneratedTerms(markdownFiles: string[]): Record<string, KernelSourceTerm> {
  const markdownTerms = collectMarkdownTerms(markdownFiles)
  const generated: Record<string, KernelSourceTerm> = { ...kernelSourceTerms }

  for (const term of markdownTerms) {
    if (generated[term]) continue
    if (!isSourcePathTerm(term)) continue

    const resolved = resolvePathTerm(term)
    if (resolved) generated[term] = resolved
  }

  const identifierTerms = resolveIdentifierTerms(markdownTerms)
  for (const [term, resolved] of Object.entries(identifierTerms)) {
    if (!generated[term]) generated[term] = resolved
  }

  return generated
}

function writeGeneratedTerms(terms: Record<string, KernelSourceTerm>) {
  const body = [
    "import type { KernelSourceTerm } from './kernel-source-terms'",
    '',
    `export const generatedKernelSourceTerms: Record<string, KernelSourceTerm> = ${JSON.stringify(terms, null, 2)}`,
    '',
  ].join('\n')

  writeFileSync(GENERATED_TERMS_OUT, body, 'utf-8')
  console.log(`生成 ${Object.keys(terms).length} 个内核术语映射: ${GENERATED_TERMS_OUT}`)
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
  const markdownFiles = walkMarkdownFiles(DOCS)
  const generatedTerms = buildGeneratedTerms(markdownFiles)
  writeGeneratedTerms(generatedTerms)

  const refs = markdownFiles.flatMap((file) => {
    const markdown = readFileSync(file, 'utf-8')
    return parseSourceRefs(markdown)
  }).concat(Object.values(generatedTerms).map(refFromRegisteredTerm))

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
