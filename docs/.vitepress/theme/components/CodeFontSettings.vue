<template>
  <div class="code-font-settings" aria-label="代码字体设置">
    <label>
      <span>代码字体</span>
      <select v-model="fontChoice" @change="applySettings">
        <option value="Cascadia Code">Cascadia Code</option>
        <option value="Cascadia Mono">Cascadia Mono</option>
        <option value="Consolas">Consolas</option>
      </select>
    </label>
    <label>
      <span>字号</span>
      <input
        v-model.number="fontSize"
        type="number"
        min="10"
        max="22"
        step="1"
        @input="applySettings"
        @change="applySettings"
      >
      <span>pt</span>
    </label>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const STORAGE_FONT = 'xiuxian:code-font-family'
const STORAGE_SIZE = 'xiuxian:code-font-size-pt'

const fontChoice = ref('Cascadia Code')
const fontSize = ref(14)

function clampSize(value) {
  const n = Number(value)
  if (!Number.isFinite(n)) return 14
  return Math.min(22, Math.max(10, Math.round(n)))
}

function applySettings() {
  if (typeof document === 'undefined') return

  fontSize.value = clampSize(fontSize.value)
  document.documentElement.style.setProperty('--xiuxian-code-font-family', `"${fontChoice.value}"`)
  document.documentElement.style.setProperty('--xiuxian-code-font-size', `${fontSize.value}pt`)

  localStorage.setItem(STORAGE_FONT, fontChoice.value)
  localStorage.setItem(STORAGE_SIZE, String(fontSize.value))
}

onMounted(() => {
  const savedFont = localStorage.getItem(STORAGE_FONT)
  const savedSize = localStorage.getItem(STORAGE_SIZE)

  if (savedFont === 'Consolas' || savedFont === 'Cascadia Mono' || savedFont === 'Cascadia Code') {
    fontChoice.value = savedFont
  }
  fontSize.value = clampSize(savedSize || 14)
  applySettings()
})
</script>
