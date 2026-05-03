<template>
  <div class="mailbox-panel">
    <form class="mailbox-appeal" @submit.prevent="submitAppeal">
      <h2>向管理员申诉</h2>
      <input v-model.trim="subject" placeholder="主题" maxlength="80" required />
      <textarea v-model.trim="body" placeholder="说明情况" maxlength="1000" rows="4" required />
      <button type="submit" :disabled="pending">提交申诉</button>
    </form>

    <section class="mailbox-list">
      <h2>站内信</h2>
      <div v-if="loading" class="admin-muted">读取信箱中</div>
      <article v-for="message in messages" :key="message.id" :class="['mailbox-message', { unread: !message.readAt, warning: message.kind === 'risk_warning' }]">
        <header>
          <strong>{{ message.subject }}</strong>
          <span>{{ labelKind(message.kind) }}</span>
          <time>{{ formatTime(message.createdAt) }}</time>
        </header>
        <p>{{ message.body }}</p>
        <button v-if="!message.readAt" type="button" @click="markRead(message.id)">标记已读</button>
      </article>
      <div v-if="!loading && !messages.length" class="admin-empty">暂无消息</div>
    </section>
    <p v-if="notice" class="admin-message">{{ notice }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { apiGet, apiPost, authState, loadMe, refreshMailboxStatus } from '../auth-state'

const loading = ref(true)
const pending = ref(false)
const messages = ref([])
const subject = ref('')
const body = ref('')
const notice = ref('')

onMounted(async () => {
  try {
    if (!authState.ready) await loadMe()
    await loadMessages()
  } catch (error) {
    notice.value = error.message
  } finally {
    loading.value = false
  }
})

async function loadMessages() {
  const data = await apiGet('/api/mailbox/messages')
  messages.value = data.messages || []
  await refreshMailboxStatus().catch(() => {})
}

async function submitAppeal() {
  pending.value = true
  notice.value = ''
  try {
    await apiPost('/api/mailbox/appeals', { subject: subject.value, body: body.value })
    subject.value = ''
    body.value = ''
    notice.value = '申诉已提交'
    await loadMessages()
  } catch (error) {
    notice.value = error.message
  } finally {
    pending.value = false
  }
}

async function markRead(id) {
  await apiPost(`/api/mailbox/messages/${id}/read`, {})
  messages.value = messages.value.map((message) => message.id === id ? { ...message, readAt: new Date().toISOString() } : message)
  await refreshMailboxStatus().catch(() => {})
}

function labelKind(kind) {
  return {
    system: '系统通知',
    risk_warning: '系统警告',
    appeal: '申诉',
    admin_reply: '管理员回复',
  }[kind] || kind
}

function formatTime(value) {
  const normalized = typeof value === 'string' && /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value)
    ? `${value.replace(' ', 'T')}Z`
    : value
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(new Date(normalized))
}
</script>
