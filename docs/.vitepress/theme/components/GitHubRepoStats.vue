<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

type RepoStats = {
  stars: number
  forks: number
  updatedAt: number
}

const repo = 'ChenMiaoi/linux-xiuxian'
const repoUrl = `https://github.com/${repo}`
const apiUrl = `https://api.github.com/repos/${repo}`
const cacheKey = `xiuxian:github-repo-stats:${repo}`
const cacheTtl = 10 * 60 * 1000

const { lang } = useData()
const stats = ref<RepoStats | null>(null)
const isLoaded = ref(false)

const labels = computed(() => {
  const isEnglish = lang.value?.startsWith('en')
  return {
    repo: isEnglish ? 'Open GitHub repository' : '打开 GitHub 仓库',
    stars: isEnglish ? 'stars' : 'stars',
    forks: isEnglish ? 'forks' : 'forks',
    loading: isEnglish ? 'Loading GitHub repository stats' : '正在加载 GitHub 仓库统计',
  }
})

function formatCount(value: number) {
  if (value >= 1000) {
    const scaled = value / 1000
    return `${scaled >= 10 ? Math.round(scaled) : scaled.toFixed(1)}k`
  }

  return `${value}`
}

function readCachedStats() {
  try {
    const raw = localStorage.getItem(cacheKey)
    if (!raw) return null

    const cached = JSON.parse(raw) as RepoStats
    if (
      typeof cached.stars !== 'number' ||
      typeof cached.forks !== 'number' ||
      typeof cached.updatedAt !== 'number'
    ) {
      return null
    }

    return cached
  } catch {
    return null
  }
}

function writeCachedStats(value: RepoStats) {
  try {
    localStorage.setItem(cacheKey, JSON.stringify(value))
  } catch {
    // Ignore storage failures; the visible GitHub link still works.
  }
}

onMounted(async () => {
  const cached = readCachedStats()
  if (cached) {
    stats.value = cached
    isLoaded.value = true
  }

  if (cached && Date.now() - cached.updatedAt < cacheTtl) return

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    })

    if (!response.ok) return

    const data = await response.json()
    const nextStats = {
      stars: Number(data.stargazers_count ?? 0),
      forks: Number(data.forks_count ?? data.forks ?? 0),
      updatedAt: Date.now(),
    }

    stats.value = nextStats
    isLoaded.value = true
    writeCachedStats(nextStats)
  } catch {
    if (!stats.value) isLoaded.value = true
  }
})
</script>

<template>
  <a
    class="github-repo-stats"
    :href="repoUrl"
    target="_blank"
    rel="noreferrer"
    :aria-label="labels.repo"
    :title="stats ? `${formatCount(stats.stars)} ${labels.stars}, ${formatCount(stats.forks)} ${labels.forks}` : labels.loading"
  >
    <svg class="github-repo-stats-icon" viewBox="0 0 16 16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.57 7.57 0 0 1 8 3.86c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
      />
    </svg>
    <span v-if="stats" class="github-repo-stats-count" aria-label="GitHub stars">
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path
          fill="currentColor"
          d="M8 .25a.75.75 0 0 1 .67.42l1.88 3.81 4.21.61a.75.75 0 0 1 .42 1.28l-3.04 2.97.72 4.2a.75.75 0 0 1-1.09.79L8 12.35l-3.77 1.98a.75.75 0 0 1-1.09-.79l.72-4.2L.82 6.37a.75.75 0 0 1 .42-1.28l4.21-.61L7.33.67A.75.75 0 0 1 8 .25Z"
        />
      </svg>
      {{ formatCount(stats.stars) }}
    </span>
    <span v-if="stats" class="github-repo-stats-count" aria-label="GitHub forks">
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path
          fill="currentColor"
          d="M5 3.25a2.25 2.25 0 1 1-3 2.12v5.26a2.25 2.25 0 1 1-1.5 0V5.37A2.25 2.25 0 0 1 5 3.25Zm8.5 7.38V8.75A2.75 2.75 0 0 0 10.75 6H8.5A4.25 4.25 0 0 1 4.25 1.75V1a.75.75 0 0 1 1.5 0v.75A2.75 2.75 0 0 0 8.5 4.5h2.25A4.25 4.25 0 0 1 15 8.75v1.88a2.25 2.25 0 1 1-1.5 0ZM2.75 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 9.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm11.5 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
        />
      </svg>
      {{ formatCount(stats.forks) }}
    </span>
    <span v-else-if="!isLoaded" class="github-repo-stats-placeholder" aria-hidden="true">...</span>
  </a>
</template>
