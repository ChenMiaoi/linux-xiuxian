<template>
  <div class="chapter-nav">
    <a v-if="prev" :href="prevHref" class="nav-prev">← 上一回</a>
    <span v-else></span>
    <a
      v-if="next"
      :href="locked ? undefined : nextHref"
      class="nav-next"
      :class="{ 'nav-locked': locked }"
      :aria-disabled="locked ? 'true' : 'false'"
      @click="handleNext"
    >
      {{ locked ? '完成试炼后继续 →' : '下一回 →' }}
    </a>
    <span v-else></span>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  prev: { type: String, default: '' },
  next: { type: String, default: '' },
})

const locked = ref(false)
const prevHref = computed(() => props.prev ? withBase(props.prev) : '')
const nextHref = computed(() => props.next ? withBase(props.next) : '')

function refreshLock() {
  if (typeof document === 'undefined') return
  locked.value = document.querySelectorAll('.section-gate[data-solved="false"], .chapter-gate[data-solved="false"]').length > 0
}

function handleNext(event) {
  refreshLock()
  if (!locked.value) return

  event.preventDefault()
  const gate = document.querySelector('.section-gate[data-solved="false"], .chapter-gate[data-solved="false"]')
  gate?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

onMounted(() => {
  nextTick(refreshLock)
  window.addEventListener('xiuxian-gate-change', refreshLock)
})

onUnmounted(() => {
  window.removeEventListener('xiuxian-gate-change', refreshLock)
})
</script>
