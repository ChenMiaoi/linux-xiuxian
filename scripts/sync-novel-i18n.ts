/**
 * sync-novel-i18n.ts
 * Creates English novel route placeholders for every Chinese novel page.
 *
 * Existing English files are treated as translations and are never overwritten
 * unless they contain the generated marker below.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const ZH_NOVEL = join(ROOT, 'docs', 'novel')
const EN_NOVEL = join(ROOT, 'docs', 'en', 'novel')
const GENERATED_MARKER = '<!-- xiuxian-i18n-generated -->'

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

function extractTitle(markdown: string, fallback: string): string {
  const frontmatterTitle = markdown.match(/^---[\s\S]*?\ntitle:\s*(.+?)\n[\s\S]*?---/)
  if (frontmatterTitle?.[1]) return frontmatterTitle[1].trim().replace(/^['"]|['"]$/g, '')

  const heading = markdown.match(/^#\s+(.+)$/m)
  if (heading?.[1]) return heading[1].trim()

  return fallback
}

function pageTitle(zhTitle: string): string {
  return `Translation Pending: ${zhTitle}`
}

function makePlaceholder(zhFile: string): string {
  const rel = relative(ZH_NOVEL, zhFile).replace(/\\/g, '/')
  const sourceRoute = `/novel/${rel.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')}`
  const zhMarkdown = readFileSync(zhFile, 'utf-8')
  const zhTitle = extractTitle(zhMarkdown, rel)
  const title = pageTitle(zhTitle)

  return `---\ntitle: ${JSON.stringify(title)}\n---\n\n${GENERATED_MARKER}\n\n# ${title}\n\nThis English translation has not been written yet.\n\nThe Chinese source page is available here: [${zhTitle}](${sourceRoute}).\n\nTranslators can replace this generated placeholder with a real English chapter while keeping the same path.\n`
}

function shouldWrite(file: string): boolean {
  if (!existsSync(file)) return true
  return readFileSync(file, 'utf-8').includes(GENERATED_MARKER)
}

function main() {
  let written = 0
  let kept = 0

  for (const zhFile of walkMarkdownFiles(ZH_NOVEL)) {
    const rel = relative(ZH_NOVEL, zhFile)
    const enFile = join(EN_NOVEL, rel)
    mkdirSync(dirname(enFile), { recursive: true })

    if (!shouldWrite(enFile)) {
      kept++
      continue
    }

    writeFileSync(enFile, makePlaceholder(zhFile), 'utf-8')
    written++
  }

  console.log(`同步英文小说占位页: 写入 ${written} 个，保留已有翻译 ${kept} 个`)
}

main()
