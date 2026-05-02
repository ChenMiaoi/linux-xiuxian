<template>
  <a
    :href="sourceUrl"
    target="_blank"
    rel="noopener"
    class="kernel-source"
  >
    📄 {{ path }}<template v-if="line">:{{ line }}</template>
  </a>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  path: { type: String, required: true },
  line: { type: [String, Number], default: '' },
})

const sourceUrl = computed(() => {
  let url = `https://github.com/torvalds/linux/blob/master/${props.path}`
  if (props.line) url += `#L${props.line}`
  return url
})
</script>
