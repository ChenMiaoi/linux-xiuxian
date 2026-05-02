<template>
  <span :class="['cultivation-badge', realmClass]">{{ realm }}</span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  realm: { type: String, required: true },
})

const realmMap = {
  '炼气': 'qi',
  '筑基': 'foundation',
  '结丹': 'core',
  '元婴': 'nascent',
  '斩灵': 'spirit',
  '问道': 'dao',
  '合道': 'merge',
  '渡劫': 'tribulation',
  '大乘': 'mahayana',
  '飞升': 'immortal',
}

const realmClass = computed(() => {
  for (const [key, cls] of Object.entries(realmMap)) {
    if (props.realm.includes(key)) return `realm-${cls}`
  }
  return 'realm-qi'
})
</script>
