<template>
  <div class="chapter-nav">
    <a v-if="prev" :href="prev" class="nav-prev">← 上一回</a>
    <span v-else></span>
    <a v-if="next" :href="next" class="nav-next">下一回 →</a>
    <span v-else></span>
  </div>
</template>

<script setup>
defineProps({
  prev: { type: String, default: '' },
  next: { type: String, default: '' },
})
</script>
