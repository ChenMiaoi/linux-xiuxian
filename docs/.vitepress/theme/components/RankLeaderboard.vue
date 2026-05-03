<template>
  <div :class="['rank-board', { 'rank-board-page': variant === 'page' }]">
    <div v-if="loading" class="rank-empty">读取排行榜中</div>
    <div v-else-if="error" class="rank-empty">{{ error }}</div>
    <ol v-else-if="users.length" class="rank-list">
      <li v-for="(user, index) in users" :key="user.id">
        <span v-if="variant === 'page'" class="rank-place">#{{ index + 1 }}</span>
        <span class="rank-user">{{ user.displayName }}</span>
        <span :class="['cultivation-badge', rankForPoints(user.cultivationPoints).className]">
          {{ rankForPoints(user.cultivationPoints).name }}
        </span>
        <span class="rank-points">{{ user.cultivationPoints }}</span>
      </li>
    </ol>
    <div v-else class="rank-empty">暂无修士上榜</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { apiGet } from '../auth-state'
import { rankForPoints } from '../rank-utils'

defineProps({
  variant: { type: String, default: 'compact' },
})

const users = ref([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const data = await apiGet('/api/rank/leaderboard')
    users.value = data.users || []
  } catch (err) {
    error.value = err.message || '排行榜读取失败'
  } finally {
    loading.value = false
  }
})
</script>
