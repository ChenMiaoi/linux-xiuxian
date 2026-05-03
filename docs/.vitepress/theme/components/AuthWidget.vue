<template>
  <div class="auth-widget">
    <template v-if="authState.user">
      <button :class="['auth-inline', 'auth-user-trigger', { 'has-alert': authState.unreadRiskWarnings > 0 }]" type="button" @click="open = !open">
        <span class="auth-name">{{ authState.user.displayName }}</span>
        <span :class="['cultivation-badge', authState.user.rank?.name ? rankForPoints(authState.user.cultivationPoints).className : 'realm-qi']">
          {{ authState.user.rank?.name || '炼气' }}
        </span>
        <span v-if="authState.unreadMessages" class="auth-alert-badge">{{ authState.unreadMessages }}</span>
        <span class="auth-caret">▾</span>
      </button>
      <div v-if="open" class="auth-popover auth-account-popover">
        <div class="auth-profile">
          <strong>{{ authState.user.displayName }}</strong>
          <span>{{ authState.user.cultivationPoints }} 修为</span>
        </div>
        <a v-if="authState.unreadRiskWarnings" class="auth-warning-link" href="/linux-xiuxian/mailbox">
          <strong>系统警告待查看</strong>
          <span>{{ authState.unreadRiskWarnings }} 条高风险通知</span>
        </a>
        <div class="auth-account-row">
          <span>GitHub</span>
          <span v-if="authState.user.github" class="auth-github">@{{ authState.user.github.login }}</span>
          <span v-else class="auth-muted">未绑定</span>
        </div>
        <a class="auth-secondary auth-link-button" href="/linux-xiuxian/mailbox">信箱</a>
        <button v-if="authState.user.github" class="auth-secondary" type="button" @click.stop.prevent="handleGitHubUnlink">解绑 GitHub</button>
        <button v-else class="auth-secondary" type="button" @click.stop.prevent="handleGitHubLink">绑定 GitHub</button>
        <button class="auth-secondary" type="button" @click.stop.prevent="handleLogout">退出登录</button>
      </div>
    </template>

    <template v-else>
      <button class="auth-trigger" type="button" @click="open = !open">入山</button>

      <div v-if="open" class="auth-popover">
        <form class="auth-form" @submit.prevent="handleSubmit">
          <div class="auth-tabs">
            <button type="button" :class="{ active: mode === 'login' }" @click="mode = 'login'">登录</button>
            <button type="button" :class="{ active: mode === 'register' }" @click="mode = 'register'">注册</button>
          </div>
          <input v-model.trim="username" autocomplete="username" placeholder="道号" required />
          <input
            v-if="mode === 'register'"
            v-model.trim="displayName"
            autocomplete="nickname"
            placeholder="显示名"
          />
          <input v-model="password" autocomplete="current-password" placeholder="口令" required type="password" />
          <button class="auth-primary" type="submit" :disabled="pending">
            {{ pending ? '请稍候' : mode === 'login' ? '登录' : '注册' }}
          </button>
          <p v-if="message" class="auth-message">{{ message }}</p>
        </form>
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { apiPost, authState, loadMe, login, logout, refreshMailboxStatus, register } from '../auth-state'
import { rankForPoints } from '../rank-utils'

const open = ref(false)
const mode = ref('login')
const username = ref('')
const displayName = ref('')
const password = ref('')
const pending = ref(false)
const message = ref('')
let mailboxTimer = null

onMounted(() => {
  if (!authState.ready) {
    loadMe().finally(() => {
      refreshMailboxIfLoggedIn()
    }).catch(() => {
      authState.ready = true
    })
  } else if (authState.user) {
    refreshMailboxStatus().catch(() => {
    authState.ready = true
    })
  }
  mailboxTimer = window.setInterval(refreshMailboxIfLoggedIn, 60 * 1000)
  window.addEventListener('focus', refreshMailboxIfLoggedIn)
})

onUnmounted(() => {
  if (mailboxTimer) window.clearInterval(mailboxTimer)
  window.removeEventListener('focus', refreshMailboxIfLoggedIn)
})

function refreshMailboxIfLoggedIn() {
  if (!authState.user) return
  refreshMailboxStatus().catch(() => {})
}

async function handleSubmit() {
  pending.value = true
  message.value = ''
  try {
    if (mode.value === 'login') {
      await login(username.value, password.value)
    } else {
      await register(username.value, password.value, displayName.value)
    }
    password.value = ''
  } catch (error) {
    message.value = error.message
  } finally {
    pending.value = false
  }
}

async function handleLogout() {
  await logout()
  open.value = false
}

function handleGitHubLink() {
  window.location.href = '/api/github/login'
}

async function handleGitHubUnlink() {
  const data = await apiPost('/api/github/unlink', {})
  authState.user = data.user
}
</script>
