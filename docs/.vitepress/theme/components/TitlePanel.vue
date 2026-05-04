<template>
  <section class="title-panel">
    <header class="title-hero">
      <div>
        <span>Titles</span>
        <h1>称号</h1>
        <p>查看已解锁称号，并选择一个作为当前展示称号。</p>
      </div>
      <a href="/linux-xiuxian/">返回首页</a>
    </header>

    <div v-if="loading" class="title-empty">读取称号中</div>
    <div v-else-if="!authState.user" class="title-empty">请先登录。</div>
    <template v-else>
      <section v-if="authState.user.title" class="title-current">
        <span>当前称号</span>
        <strong>{{ authState.user.title.name }}</strong>
        <p>{{ authState.user.title.description }}</p>
      </section>

      <div v-if="titles.length" class="title-grid">
        <article
          v-for="title in titles"
          :key="title.name"
          :class="['title-card', { active: title.name === authState.user.title?.name }]"
        >
          <header>
            <span class="cultivation-title-badge">{{ title.name }}</span>
            <small>{{ title.source }}</small>
          </header>
          <p>{{ title.description }}</p>
          <button
            type="button"
            :disabled="pending || title.name === authState.user.title?.name"
            @click="selectTitle(title.name)"
          >
            {{ title.name === authState.user.title?.name ? '当前使用' : '设为当前' }}
          </button>
        </article>
      </div>
      <div v-else class="title-empty">还没有解锁称号。</div>
    </template>
    <p v-if="message" class="title-message">{{ message }}</p>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { apiPost, authState, loadMe } from '../auth-state'

const loading = ref(true)
const pending = ref(false)
const message = ref('')

const titles = computed(() => authState.user?.titles?.unlocked || [])

onMounted(async () => {
  try {
    if (!authState.ready) await loadMe()
  } catch (error) {
    message.value = error.message
  } finally {
    loading.value = false
  }
})

async function selectTitle(titleName) {
  pending.value = true
  message.value = ''
  try {
    const data = await apiPost('/api/auth/title', { titleName })
    authState.user = data.user
    message.value = '称号已更新。'
  } catch (error) {
    message.value = error.message
  } finally {
    pending.value = false
  }
}
</script>
