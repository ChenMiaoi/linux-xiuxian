import { reactive } from 'vue'

export const authState = reactive({
  ready: false,
  user: null,
  unreadMessages: 0,
  unreadRiskWarnings: 0,
})

function syncAdminClass() {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('xiuxian-admin-user', authState.user?.role === 'admin')
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.message || '请求失败')
  }
  return data
}

export async function loadMe() {
  if (typeof window === 'undefined') return null
  const data = await api('/api/auth/me')
  authState.user = data.user
  authState.ready = true
  syncAdminClass()
  if (authState.user) {
    refreshMailboxStatus().catch(() => {})
  } else {
    clearMailboxStatus()
  }
  return data.user
}

export async function login(username, password) {
  const data = await api('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
  authState.user = data.user
  authState.ready = true
  syncAdminClass()
  await refreshMailboxStatus().catch(() => {})
  window.dispatchEvent(new CustomEvent('xiuxian-auth-change'))
  return data.user
}

export async function register(username, password, displayName) {
  const data = await api('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, password, displayName }),
  })
  authState.user = data.user
  authState.ready = true
  syncAdminClass()
  await refreshMailboxStatus().catch(() => {})
  window.dispatchEvent(new CustomEvent('xiuxian-auth-change'))
  return data.user
}

export async function logout() {
  authState.user = null
  authState.ready = true
  clearMailboxStatus()
  syncAdminClass()
  try {
    await api('/api/auth/logout', { method: 'POST' })
  } finally {
    window.dispatchEvent(new CustomEvent('xiuxian-auth-change'))
  }
}

export async function apiGet(path) {
  return api(path)
}

export async function apiPost(path, body) {
  return api(path, { method: 'POST', body: JSON.stringify(body) })
}

export async function apiDelete(path) {
  return api(path, { method: 'DELETE' })
}

export async function refreshMailboxStatus() {
  if (typeof window === 'undefined' || !authState.user) {
    clearMailboxStatus()
    return { unreadMessages: 0, unreadRiskWarnings: 0 }
  }

  const data = await api('/api/mailbox/messages')
  const messages = data.messages || []
  authState.unreadMessages = messages.filter((message) => !message.readAt).length
  authState.unreadRiskWarnings = messages.filter((message) => !message.readAt && message.kind === 'risk_warning').length
  return {
    unreadMessages: authState.unreadMessages,
    unreadRiskWarnings: authState.unreadRiskWarnings,
  }
}

function clearMailboxStatus() {
  authState.unreadMessages = 0
  authState.unreadRiskWarnings = 0
}
