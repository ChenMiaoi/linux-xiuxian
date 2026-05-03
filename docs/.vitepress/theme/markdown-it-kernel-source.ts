import type MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token.mjs'
import { generatedKernelSourceTerms } from '../generated-kernel-source-terms'
import type { KernelSourceTerm } from '../kernel-source-terms'

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function normalizeTerm(value: string): string {
  return value.trim().replace(/\(\)$/, '')
}

function renderTerm(term: KernelSourceTerm): string {
  const attrs = [
    ['label', term.label],
    ['path', term.path],
    ['line', term.line ? String(term.line) : ''],
    ['endLine', term.endLine ? String(term.endLine) : ''],
    ['symbol', term.symbol ?? ''],
    ['note', term.note ?? ''],
  ]
    .filter(([, value]) => value)
    .map(([name, value]) => `${name}="${escapeAttr(value)}"`)
    .join(' ')

  return `<KernelSourceTerm ${attrs} />`
}

function transformInlineTokens(tokens: Token[]) {
  for (const token of tokens) {
    if (token.type === 'code_inline') {
      const key = normalizeTerm(token.content)
      const term = generatedKernelSourceTerms[key]
      if (!term) continue

      token.type = 'html_inline'
      token.tag = ''
      token.nesting = 0
      token.content = renderTerm(term)
      token.markup = ''
      token.info = ''
      token.attrs = null
      token.children = null
      continue
    }

    if (token.children) transformInlineTokens(token.children)
  }
}

export default function kernelSourcePlugin(md: MarkdownIt) {
  md.core.ruler.after('inline', 'xiuxian_kernel_source_terms', (state) => {
    for (const token of state.tokens) {
      if (token.type === 'inline' && token.children) {
        transformInlineTokens(token.children)
      }
    }
  })
}
