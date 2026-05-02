<template>
  <section
    ref="gateEl"
    class="chapter-gate"
    :class="{ 'chapter-gate-unlocked': solved }"
    :data-gate-id="gateId"
    :data-solved="solved ? 'true' : 'false'"
  >
    <div class="chapter-gate-head">
      <span class="chapter-gate-kicker">{{ solved ? '关卡已破' : '破关试炼' }}</span>
      <h3>{{ title }}</h3>
    </div>

    <p v-if="prompt" class="chapter-gate-prompt">{{ prompt }}</p>

    <textarea
      v-if="mode === 'code'"
      v-model="input"
      class="chapter-gate-code"
      spellcheck="false"
      :placeholder="placeholder || '补全代码后再破关'"
      :disabled="solved"
    />
    <input
      v-else
      v-model="input"
      class="chapter-gate-answer"
      type="text"
      :placeholder="placeholder || '输入答案'"
      :disabled="solved"
      @keydown.enter="check"
    >

    <div class="chapter-gate-actions">
      <button type="button" :disabled="solved" @click="check">
        {{ solved ? '已解锁' : '提交' }}
      </button>
      <span class="chapter-gate-message" :class="{ error: messageType === 'error' }">
        {{ message }}
      </span>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  id: { type: String, default: '' },
  title: { type: String, default: '本章试炼' },
  prompt: { type: String, default: '' },
  answer: { type: String, required: true },
  mode: { type: String, default: 'answer' },
  placeholder: { type: String, default: '' },
  lockScroll: { type: Boolean, default: true },
})

const input = ref('')
const solved = ref(false)
const message = ref('答对后才能继续滑动和进入下一章。')
const messageType = ref('')
const gateEl = ref(null)

const pageKey = computed(() => {
  if (typeof window === 'undefined') return 'ssr'
  return window.location.pathname.replace(/\/$/, '')
})

const gateId = computed(() => props.id || props.title)
const storageKey = computed(() => `xiuxian:chapter-gate:${pageKey.value}:${gateId.value}`)

function normalize(value) {
  return String(value || '')
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+/g, props.mode === 'code' ? ' ' : '')
    .trim()
    .toLowerCase()
}

function announce() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('xiuxian-gate-change'))
}

function check() {
  if (solved.value) return
  if (normalize(input.value) !== normalize(props.answer)) {
    message.value = props.mode === 'code' ? '还差一点，检查代码里的关键符号。' : '答案不对，再想想本章的关键概念。'
    messageType.value = 'error'
    return
  }

  solved.value = true
  message.value = '破关成功，可以继续阅读。'
  messageType.value = ''
  localStorage.setItem(storageKey.value, '1')
  nextTick(announce)
}

function clampScroll() {
  if (!props.lockScroll || solved.value || !gateEl.value) return

  const rect = gateEl.value.getBoundingClientRect()
  const gateBottom = rect.bottom + window.scrollY
  const maxScroll = Math.max(0, gateBottom - window.innerHeight + 160)
  if (window.scrollY > maxScroll) {
    window.scrollTo({ top: maxScroll, behavior: 'smooth' })
  }
}

onMounted(() => {
  solved.value = localStorage.getItem(storageKey.value) === '1'
  if (solved.value) {
    message.value = '已解锁，可以继续阅读。'
  }
  announce()
  window.addEventListener('scroll', clampScroll, { passive: true })
})

onUnmounted(() => {
  announce()
  window.removeEventListener('scroll', clampScroll)
})
</script>
