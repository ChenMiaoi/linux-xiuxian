<template>
  <span
    class="kernel-source-wrap"
    @mouseenter="showPreview"
    @mouseleave="hidePreview"
    @focusin="showPreview"
    @focusout="hidePreview"
  >
    <a
      :href="sourceUrl"
      target="_blank"
      rel="noopener"
      class="kernel-source"
    >
      📄 {{ path }}<template v-if="line">:{{ line }}</template>
    </a>

    <span v-if="open && hasPreviewRef" class="kernel-source-popover" role="tooltip">
      <span class="kernel-source-popover-title">
        {{ snippetTitle }}
      </span>
      <span v-if="note" class="kernel-source-note">{{ note }}</span>
      <span v-if="loading" class="kernel-source-state">正在读取源码片段...</span>
      <span v-else-if="snippet" class="kernel-source-codebox">
        <code>{{ snippet.code }}</code>
      </span>
      <span v-else class="kernel-source-state">未找到本地源码片段</span>
      <a :href="sourceUrl" target="_blank" rel="noopener" class="kernel-source-full-link">
        打开完整源码
      </a>
    </span>
  </span>
</template>

<script setup>
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  path: { type: String, required: true },
  line: { type: [String, Number], default: '' },
  endLine: { type: [String, Number], default: '' },
  end: { type: [String, Number], default: '' },
  symbol: { type: String, default: '' },
  note: { type: String, default: '' },
})

const open = ref(false)
const loading = ref(false)
const snippet = ref(null)

let snippetCachePromise
let snippetCache

const normalizedLine = computed(() => {
  const value = Number.parseInt(String(props.line), 10)
  return Number.isInteger(value) && value > 0 ? value : ''
})

const symbolRef = computed(() => {
  if (normalizedLine.value) return props.symbol
  return props.symbol || String(props.line || '')
})

const hasPreviewRef = computed(() => Boolean(normalizedLine.value || symbolRef.value))

const normalizedEndLine = computed(() => {
  const rawEnd = props.endLine || props.end
  const value = Number.parseInt(String(rawEnd), 10)
  return Number.isInteger(value) && normalizedLine.value && value >= normalizedLine.value ? value : ''
})

const snippetKey = computed(() => {
  const ref = normalizedLine.value || symbolRef.value
  if (!ref) return ''
  return `${props.path}:${ref}:${normalizedEndLine.value || ''}`
})

const snippetTitle = computed(() => {
  const linePart = normalizedLine.value
    ? (normalizedEndLine.value ? `${normalizedLine.value}-${normalizedEndLine.value}` : normalizedLine.value)
    : symbolRef.value
  return symbolRef.value && normalizedLine.value
    ? `${symbolRef.value} · ${props.path}:${linePart}`
    : `${props.path}:${linePart}`
})

const sourceUrl = computed(() => {
  let url = `https://github.com/torvalds/linux/blob/master/${props.path}`
  const line = normalizedLine.value || snippet.value?.line
  const endLine = normalizedEndLine.value || snippet.value?.endLine
  if (line) {
    url += `#L${line}`
    if (endLine && endLine !== line) url += `-L${endLine}`
  }
  return url
})

async function loadSnippetIndex() {
  if (snippetCache) return snippetCache
  if (!snippetCachePromise) {
    snippetCachePromise = fetch(withBase('/kernel-snippets.json'))
      .then((res) => (res.ok ? res.json() : {}))
      .catch(() => ({}))
  }
  snippetCache = await snippetCachePromise
  return snippetCache
}

async function showPreview() {
  open.value = true
  if (!snippetKey.value || snippet.value) return

  loading.value = true
  const snippets = await loadSnippetIndex()
  snippet.value = snippets[snippetKey.value] ?? null
  loading.value = false
}

function hidePreview() {
  open.value = false
}
</script>
