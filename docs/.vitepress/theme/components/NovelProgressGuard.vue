<template></template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useData, useRouter, withBase } from 'vitepress'
import {
  GATE_CHANGE_EVENT,
  NOVEL_PROGRESS_EVENT,
  canOpenNovelPath,
  getFirstIncompletePath,
  isNovelChapterPath,
  novelChapterLinks,
  normalizePath,
  pageCompleteKey,
  setPageComplete,
} from '../novel-progress'
import { apiPost, authState, loadMe } from '../auth-state'

const router = useRouter()
const { page } = useData()

let removeSidebarHandler: (() => void) | null = null
let scrollTimer = 0
let refreshTimer = 0
const awardedInSession = new Set<string>()

function currentPath(): string {
  if (typeof window === 'undefined') return ''
  return normalizePath(window.location.pathname)
}

function firstUnsolvedGate(): HTMLElement | null {
  return document.querySelector<HTMLElement>('.section-gate[data-solved="false"], .chapter-gate[data-solved="false"]')
}

function updatePageCompletion(): void {
  const path = currentPath()
  if (!isNovelChapterPath(path)) return

  const hasUnsolved = !!firstUnsolvedGate()
  if (!hasUnsolved) {
    setPageComplete(path, true)
    awardChapterUnlock(path)
  } else {
    window.localStorage.removeItem(pageCompleteKey(path))
    window.dispatchEvent(new CustomEvent(NOVEL_PROGRESS_EVENT))
  }
}

async function awardChapterUnlock(path: string): Promise<void> {
  if (!authState.user) return

  const normalized = normalizePath(path)
  const awardKey = `xiuxian:chapter-award:${normalized}`
  if (awardedInSession.has(normalized) || window.localStorage.getItem(awardKey) === '1') return

  awardedInSession.add(normalized)
  try {
    const data = await apiPost('/api/progress/chapter-unlock', { pagePath: normalized })
    if (data.pointAward?.awarded || data.pointAward?.reason === 'duplicate') {
      window.localStorage.setItem(awardKey, '1')
    }
    if (data.pointAward?.awarded) {
      await loadMe()
    }
  } catch {
    awardedInSession.delete(normalized)
  }
}

function clampScroll(): void {
  const gate = firstUnsolvedGate()
  if (!gate) return

  const rect = gate.getBoundingClientRect()
  const gateBottom = rect.bottom + window.scrollY
  const maxScroll = Math.max(0, gateBottom - window.innerHeight + 160)
  if (window.scrollY > maxScroll) {
    window.scrollTo({ top: maxScroll, behavior: 'smooth' })
  }
}

function installSectionGates(): void {
  document.querySelectorAll('.section-gate[data-auto="true"]').forEach((gate) => gate.remove())

  const path = currentPath()
  if (!isNovelChapterPath(path)) {
    updateSidebarLocks()
    updateCommentOutlineLink()
    return
  }

  updatePageCompletion()
  updateSidebarLocks()
  updateCommentOutlineLink()
  window.clearTimeout(scrollTimer)
  scrollTimer = window.setTimeout(clampScroll, 80)
}

function updateCommentOutlineLink(): void {
  const existing = document.querySelector<HTMLAnchorElement>('.xiuxian-comment-outline')
  const path = currentPath()
  const unlocked = isNovelChapterPath(path) && !firstUnsolvedGate()

  if (!unlocked) {
    existing?.remove()
    return
  }

  const outline = document.querySelector<HTMLElement>('.VPDocAsideOutline .content')
  if (!outline) return

  const link = existing ?? document.createElement('a')
  link.className = 'xiuxian-comment-outline'
  link.href = '#comments'
  link.textContent = '同道留言'
  link.setAttribute('aria-label', '跳转到同道留言')
  link.onclick = (event) => {
    event.preventDefault()
    document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.replaceState(null, '', '#comments')
  }

  if (!existing) {
    const title = outline.querySelector('.outline-title')
    title?.insertAdjacentElement('afterend', link)
  }
}

function updateSidebarLocks(): void {
  const firstLocked = novelChapterLinks.find((link, index) => index > 0 && !canOpenNovelPath(link))
  const firstLockedIndex = firstLocked ? novelChapterLinks.indexOf(firstLocked) : -1

  document.querySelectorAll<HTMLAnchorElement>('.VPSidebar a[href]').forEach((anchor) => {
    const path = normalizePath(anchor.getAttribute('href') ?? '')
    const index = novelChapterLinks.indexOf(path)
    const locked = firstLockedIndex >= 0 && index >= firstLockedIndex
    anchor.classList.toggle('xiuxian-sidebar-locked', locked)
    if (locked) {
      anchor.setAttribute('aria-disabled', 'true')
      anchor.setAttribute('title', '此章仍被封印，先完成前序小节问答考核。')
    } else {
      anchor.removeAttribute('aria-disabled')
      anchor.removeAttribute('title')
    }
  })
}

function interceptSidebarClicks(): void {
  removeSidebarHandler?.()

  const handler = (event: MouseEvent) => {
    const anchor = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
    if (!anchor) return

    const path = normalizePath(anchor.getAttribute('href') ?? '')
    if (!isNovelChapterPath(path) || canOpenNovelPath(path)) return

    event.preventDefault()
    event.stopPropagation()
    const gate = firstUnsolvedGate()
    gate?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  document.addEventListener('click', handler, true)
  removeSidebarHandler = () => document.removeEventListener('click', handler, true)
}

function guardDirectRoute(): void {
  const path = currentPath()
  if (!isNovelChapterPath(path) || canOpenNovelPath(path)) return

  const fallback = getFirstIncompletePath() || novelChapterLinks[0]
  if (fallback && fallback !== path) {
    router.go(withBase(fallback))
  }
}

function refresh(): void {
  const run = () => {
    guardDirectRoute()
    installSectionGates()
    updateCommentOutlineLink()
  }

  nextTick(run)
  window.clearTimeout(refreshTimer)
  refreshTimer = window.setTimeout(run, 120)
}

onMounted(() => {
  refresh()
  interceptSidebarClicks()
  window.addEventListener('scroll', clampScroll, { passive: true })
  window.addEventListener(GATE_CHANGE_EVENT, refresh)
  window.addEventListener(NOVEL_PROGRESS_EVENT, updateSidebarLocks)
})

onUnmounted(() => {
  window.clearTimeout(refreshTimer)
  document.querySelector<HTMLAnchorElement>('.xiuxian-comment-outline')?.remove()
  removeSidebarHandler?.()
  window.removeEventListener('scroll', clampScroll)
  window.removeEventListener(GATE_CHANGE_EVENT, refresh)
  window.removeEventListener(NOVEL_PROGRESS_EVENT, updateSidebarLocks)
})

watch(() => page.value.relativePath, refresh)
</script>
