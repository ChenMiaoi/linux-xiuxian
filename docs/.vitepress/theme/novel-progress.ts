import { getNovelChapterLinks } from '../sidebar'

export const NOVEL_PROGRESS_EVENT = 'xiuxian-novel-progress-change'
export const GATE_CHANGE_EVENT = 'xiuxian-gate-change'

export const novelChapterLinks = getNovelChapterLinks()

function withoutBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  if (base && base !== '/' && path.startsWith(base + '/')) {
    return path.slice(base.length)
  }
  return path
}

export function normalizePath(path: string): string {
  return withoutBase(path.replace(/^https?:\/\/[^/]+/, ''))
    .replace(/[?#].*$/, '')
    .replace(/\/index(?:\.html)?$/, '')
    .replace(/\.html$/, '')
    .replace(/\/$/, '')
}

export function pageCompleteKey(path: string): string {
  return `xiuxian:chapter-complete:${normalizePath(path)}`
}

export function isNovelChapterPath(path: string): boolean {
  return novelChapterLinks.includes(normalizePath(path))
}

export function isPageComplete(path: string): boolean {
  if (typeof window === 'undefined') return false
  return window.localStorage.getItem(pageCompleteKey(path)) === '1'
}

export function setPageComplete(path: string, complete: boolean): void {
  if (typeof window === 'undefined') return
  const key = pageCompleteKey(path)
  if (complete) {
    window.localStorage.setItem(key, '1')
  } else {
    window.localStorage.removeItem(key)
  }
  window.dispatchEvent(new CustomEvent(NOVEL_PROGRESS_EVENT))
}

export function getFirstLockedPath(): string {
  if (typeof window === 'undefined') return novelChapterLinks[0] ?? ''

  for (let i = 0; i < novelChapterLinks.length; i++) {
    if (i === 0) continue
    const prev = novelChapterLinks[i - 1]
    if (!isPageComplete(prev)) return novelChapterLinks[i]
  }

  return ''
}

export function getFirstIncompletePath(): string {
  if (typeof window === 'undefined') return novelChapterLinks[0] ?? ''
  return novelChapterLinks.find((link) => !isPageComplete(link)) ?? ''
}

export function canOpenNovelPath(path: string): boolean {
  const normalized = normalizePath(path)
  const index = novelChapterLinks.indexOf(normalized)
  if (index <= 0) return true
  return isPageComplete(novelChapterLinks[index - 1])
}

export function dispatchGateChange(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(GATE_CHANGE_EVENT))
  window.dispatchEvent(new CustomEvent(NOVEL_PROGRESS_EVENT))
}
