<template>
  <div class="auth-widget">
    <template v-if="authState.user">
      <div class="auth-inline">
        <span class="auth-name">{{ authState.user.displayName }}</span>
        <span :class="['cultivation-badge', authState.user.rank?.name ? rankForPoints(authState.user.cultivationPoints).className : 'realm-qi']">
          {{ authState.user.rank?.name || '炼气' }}
        </span>
        <span class="auth-points">{{ authState.user.cultivationPoints }} 修为</span>
        <button class="auth-logout" type="button" @click.stop.prevent="handleLogout">退出</button>
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
import { onMounted, ref } from 'vue'
import { authState, loadMe, login, logout, register } from '../auth-state'
import { rankForPoints } from '../rank-utils'

const open = ref(false)
const mode = ref('login')
const username = ref('')
const displayName = ref('')
const password = ref('')
const pending = ref(false)
const message = ref('')

onMounted(() => {
  if (!authState.ready) loadMe().catch(() => {
    authState.ready = true
  })
})

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
</script>
