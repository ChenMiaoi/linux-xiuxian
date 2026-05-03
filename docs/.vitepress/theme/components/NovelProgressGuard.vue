<template></template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useData, useRouter, withBase } from 'vitepress'
import {
  GATE_CHANGE_EVENT,
  NOVEL_PROGRESS_EVENT,
  canOpenNovelPath,
  dispatchGateChange,
  getFirstIncompletePath,
  isNovelChapterPath,
  novelChapterLinks,
  normalizePath,
  pageCompleteKey,
  setPageComplete,
} from '../novel-progress'

const router = useRouter()
const { page } = useData()

let removeSidebarHandler: (() => void) | null = null
let scrollTimer = 0

function currentPath(): string {
  if (typeof window === 'undefined') return ''
  return normalizePath(window.location.pathname)
}

function normalizeAnswer(value: string): string {
  return value
    .replace(/\s+/g, '')
    .replace(/[，。！？、：:；;,.!?'"`“”‘’（）()[\]【】《》<>—-]/g, '')
    .toLowerCase()
}

function answerFromHeading(text: string): string {
  return text
    .replace(/^第?[一二三四五六七八九十百千万零〇两\d]+[、.．：:\s-]*/, '')
    .replace(/\s*[—-]\s*.*$/, '')
    .trim() || text.trim()
}

function sectionStorageKey(path: string, index: number, heading: string): string {
  return `xiuxian:section-gate:${path}:${index}:${normalizeAnswer(heading)}`
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
  } else {
    window.localStorage.removeItem(pageCompleteKey(path))
    window.dispatchEvent(new CustomEvent(NOVEL_PROGRESS_EVENT))
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

function makeGate(path: string, index: number, headingText: string): HTMLElement {
  const answer = answerFromHeading(headingText)
  const key = sectionStorageKey(path, index, headingText)
  const gate = document.createElement('section')
  gate.className = 'section-gate'
  gate.dataset.auto = 'true'
  gate.dataset.solved = window.localStorage.getItem(key) === '1' ? 'true' : 'false'

  gate.innerHTML = `
    <div class="section-gate-head">
      <span class="section-gate-kicker">${gate.dataset.solved === 'true' ? '小节已通关' : '小节问答考核'}</span>
      <h3>${headingText}</h3>
    </div>
    <p class="section-gate-prompt">本小节的关窍是什么？请输入小节标题中的核心词。</p>
    <input class="section-gate-answer" type="text" placeholder="例如：${answer}" ${gate.dataset.solved === 'true' ? 'disabled' : ''}>
    <div class="section-gate-actions">
      <button type="button" ${gate.dataset.solved === 'true' ? 'disabled' : ''}>${gate.dataset.solved === 'true' ? '已解封' : '提交'}</button>
      <span class="section-gate-message">${gate.dataset.solved === 'true' ? '已解封，可以继续。' : '答对后才能进入下一小节。'}</span>
    </div>
  `

  const input = gate.querySelector<HTMLInputElement>('.section-gate-answer')
  const button = gate.querySelector<HTMLButtonElement>('button')
  const message = gate.querySelector<HTMLElement>('.section-gate-message')
  const kicker = gate.querySelector<HTMLElement>('.section-gate-kicker')

  function submit(): void {
    if (gate.dataset.solved === 'true') return
    if (normalizeAnswer(input?.value ?? '') !== normalizeAnswer(answer)) {
      if (message) {
        message.textContent = '还没有对上，再看一眼小节标题和本段核心概念。'
        message.classList.add('error')
      }
      return
    }

    gate.dataset.solved = 'true'
    gate.classList.add('section-gate-unlocked')
    window.localStorage.setItem(key, '1')
    if (input) input.disabled = true
    if (button) {
      button.disabled = true
      button.textContent = '已解封'
    }
    if (kicker) kicker.textContent = '小节已通关'
    if (message) {
      message.textContent = '已解封，可以继续。'
      message.classList.remove('error')
    }
    updatePageCompletion()
    dispatchGateChange()
  }

  if (gate.dataset.solved === 'true') gate.classList.add('section-gate-unlocked')
  button?.addEventListener('click', submit)
  input?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') submit()
  })

  return gate
}

function installSectionGates(): void {
  document.querySelectorAll('.section-gate[data-auto="true"]').forEach((gate) => gate.remove())

  const path = currentPath()
  if (!isNovelChapterPath(path)) {
    updateSidebarLocks()
    return
  }

  const content = document.querySelector<HTMLElement>('.VPDoc .content-container')
  if (!content) return

  const headings = Array.from(content.querySelectorAll<HTMLHeadingElement>('h2'))
    .filter((heading) => heading.id && heading.textContent?.trim())

  headings.forEach((heading, index) => {
    const gate = makeGate(path, index, heading.textContent?.trim() ?? '')
    let cursor: Element | null = heading.nextElementSibling
    while (cursor && cursor.tagName !== 'H2' && !cursor.classList.contains('chapter-gate') && !cursor.classList.contains('chapter-nav')) {
      cursor = cursor.nextElementSibling
    }

    if (cursor) {
      content.insertBefore(gate, cursor)
    } else {
      content.appendChild(gate)
    }
  })

  updatePageCompletion()
  updateSidebarLocks()
  window.clearTimeout(scrollTimer)
  scrollTimer = window.setTimeout(clampScroll, 80)
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
  nextTick(() => {
    guardDirectRoute()
    installSectionGates()
  })
}

onMounted(() => {
  refresh()
  interceptSidebarClicks()
  window.addEventListener('scroll', clampScroll, { passive: true })
  window.addEventListener(GATE_CHANGE_EVENT, refresh)
  window.addEventListener(NOVEL_PROGRESS_EVENT, updateSidebarLocks)
})

onUnmounted(() => {
  removeSidebarHandler?.()
  window.removeEventListener('scroll', clampScroll)
  window.removeEventListener(GATE_CHANGE_EVENT, refresh)
  window.removeEventListener(NOVEL_PROGRESS_EVENT, updateSidebarLocks)
})

watch(() => page.value.relativePath, refresh)
</script>
