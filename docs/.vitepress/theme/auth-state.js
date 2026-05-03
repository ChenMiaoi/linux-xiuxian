import { reactive } from 'vue'

export const authState = reactive({
  ready: false,
  user: null,
})

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
  return data.user
}

export async function login(username, password) {
  const data = await api('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
  authState.user = data.user
  authState.ready = true
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
  window.dispatchEvent(new CustomEvent('xiuxian-auth-change'))
  return data.user
}

export async function logout() {
  authState.user = null
  authState.ready = true
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
