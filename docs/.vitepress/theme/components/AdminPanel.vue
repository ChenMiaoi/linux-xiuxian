<template>
  <div class="admin-panel">
    <header class="admin-hero">
      <div>
        <span>Admin Console</span>
        <h1>管理后台</h1>
        <p>集中查看用户风险、评论治理和申诉信箱。</p>
      </div>
      <div v-if="authState.user?.role === 'admin'" class="admin-tabs" aria-label="管理后台导航">
        <button type="button" :class="{ active: tab === 'users' }" @click="tab = 'users'">用户治理</button>
        <button type="button" :class="{ active: tab === 'comments' }" @click="tab = 'comments'">评论管理</button>
        <button type="button" :class="{ active: tab === 'mailbox' }" @click="tab = 'mailbox'">申诉信箱</button>
      </div>
    </header>
    <div v-if="loading" class="admin-muted">读取后台数据中</div>
    <div v-else-if="!authState.user" class="admin-empty">请先登录。</div>
    <div v-else-if="authState.user.role !== 'admin'" class="admin-empty">当前账号没有管理员权限。</div>
    <template v-else>
      <div class="admin-stats">
        <div>
          <span>用户</span>
          <strong>{{ summary.users }}</strong>
        </div>
        <div>
          <span>有效评论</span>
          <strong>{{ summary.comments }}</strong>
        </div>
        <div>
          <span>已删评论</span>
          <strong>{{ summary.deletedComments }}</strong>
        </div>
        <div>
          <span>被举报评论</span>
          <strong>{{ summary.reportedComments }}</strong>
        </div>
      </div>

      <section v-if="tab === 'users'" class="admin-section">
        <h2>用户</h2>
        <div class="admin-filters">
          <label>
            境界
            <select v-model="rankFilter" @change="loadUsers">
              <option value="all">全部</option>
              <option v-for="rank in ranks" :key="rank" :value="rank">{{ rank }}</option>
            </select>
          </label>
          <label>
            状态
            <select v-model="statusFilter" @change="loadUsers">
              <option value="all">全部</option>
              <option value="active">正常</option>
              <option value="muted">禁言</option>
              <option value="banned">封禁</option>
            </select>
          </label>
        </div>
        <div class="admin-user-list">
          <article v-for="user in users" :key="user.id" class="admin-user-card">
            <header>
              <div>
                <strong>{{ user.displayName }}</strong>
                <small>@{{ user.username }}</small>
              </div>
              <span :class="['admin-status', `status-${user.status}`]">{{ statusLabel(user.status) }}</span>
            </header>
            <div class="admin-user-meta">
              <span>{{ user.rank.name }} / {{ user.cultivationPoints }} 修为</span>
              <span>{{ user.role }}</span>
              <span>{{ user.github ? `@${user.github.login}` : '未绑定 GitHub' }}</span>
              <span>评论 {{ user.commentCount }} / 已删 {{ user.deletedCommentCount }}</span>
            </div>
            <div class="admin-risk">
              <strong>异常 {{ user.riskScore }}</strong>
              <span>{{ user.riskReasons.length ? user.riskReasons.join('、') : '暂无明显异常' }}</span>
            </div>
            <div class="admin-user-actions">
              <template v-if="user.id !== authState.user.id">
                <button type="button" :disabled="moderatingId === user.id" @click="moderateUser(user.id, 'mute')">禁言 24h</button>
                <button type="button" :disabled="moderatingId === user.id" @click="moderateUser(user.id, 'ban')">封号</button>
                <button type="button" :disabled="moderatingId === user.id" @click="moderateUser(user.id, 'restore')">恢复</button>
              </template>
              <span v-else class="admin-action-note">当前管理员账号不可自操作</span>
            </div>
          </article>
        </div>
      </section>

      <section v-if="tab === 'comments'" class="admin-section">
        <h2>被举报评论</h2>
        <div class="admin-comments">
          <article v-for="comment in comments" :key="comment.id" class="admin-comment">
            <header>
              <strong>{{ comment.author.displayName }}</strong>
              <span>{{ comment.pagePath }}</span>
              <span>举报 {{ comment.reportCount }}</span>
              <span>{{ reportReasonText(comment.reportReasons) }}</span>
              <time>{{ formatTime(comment.createdAt) }}</time>
            </header>
            <p>{{ comment.content }}</p>
            <div class="admin-user-actions">
              <button type="button" @click="deleteComment(comment.id)">删除并采纳举报</button>
              <button type="button" @click="rejectReports(comment.id)">驳回举报</button>
            </div>
          </article>
          <div v-if="!comments.length" class="admin-empty">暂无被举报评论</div>
        </div>
      </section>

      <section v-if="tab === 'mailbox'" class="admin-section">
        <h2>申诉与系统警告</h2>
        <div class="admin-mailbox-groups">
          <div class="admin-mailbox-group">
            <h3>用户申诉</h3>
            <article v-for="message in appealMessages" :key="message.id" class="admin-comment admin-mailbox-item">
              <header>
                <strong>{{ message.user?.displayName || '用户' }}</strong>
                <span>{{ message.subject }}</span>
                <time>{{ formatTime(message.createdAt) }}</time>
              </header>
              <p>{{ message.body }}</p>
              <textarea v-model="replyDrafts[message.id]" placeholder="回复用户" rows="3" />
              <div class="admin-user-actions">
                <button type="button" @click="replyMessage(message.id)">回复并关闭</button>
                <button type="button" @click="closeMessage(message.id)">仅关闭</button>
              </div>
            </article>
            <div v-if="!appealMessages.length" class="admin-empty">暂无待处理申诉</div>
          </div>

          <div class="admin-mailbox-group">
            <h3>系统警告记录</h3>
            <article v-for="message in warningMessages" :key="message.id" class="admin-comment admin-mailbox-item admin-warning-record">
            <header>
              <strong>{{ message.user?.displayName || '用户' }}</strong>
              <span>{{ message.subject }}</span>
              <span>{{ statusText(message.status) }}</span>
              <time>{{ formatTime(message.createdAt) }}</time>
            </header>
            <p>{{ message.body }}</p>
              <button v-if="message.status !== 'closed'" type="button" @click="closeMessage(message.id)">关闭记录</button>
            </article>
            <div v-if="!warningMessages.length" class="admin-empty">暂无系统警告</div>
          </div>
        </div>
      </section>
    </template>
    <p v-if="message" class="admin-message">{{ message }}</p>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { apiGet, apiPost, authState, loadMe } from '../auth-state'

const loading = ref(true)
const message = ref('')
const summary = ref({ users: 0, comments: 0, deletedComments: 0, reportedComments: 0 })
const users = ref([])
const comments = ref([])
const adminMessages = ref([])
const replyDrafts = ref({})
const ranks = ref([])
const tab = ref('users')
const rankFilter = ref('all')
const statusFilter = ref('all')
const moderatingId = ref(null)
const appealMessages = computed(() => adminMessages.value.filter((item) => item.kind === 'appeal' && item.status !== 'closed'))
const warningMessages = computed(() => adminMessages.value.filter((item) => item.kind === 'risk_warning'))

onMounted(async () => {
  try {
    if (!authState.ready) await loadMe()
    if (authState.user?.role === 'admin') await loadAdminData()
  } catch (error) {
    message.value = error.message
  } finally {
    loading.value = false
  }
})

async function loadAdminData() {
  const [summaryData, commentsData, messagesData] = await Promise.all([
    apiGet('/api/admin/summary'),
    apiGet('/api/admin/comments'),
    apiGet('/api/admin/mailbox/messages'),
  ])
  summary.value = summaryData
  comments.value = commentsData.comments || []
  adminMessages.value = messagesData.messages || []
  await loadUsers()
}

async function loadUsers() {
  const query = new URLSearchParams({
    rank: rankFilter.value,
    status: statusFilter.value,
  })
  const usersData = await apiGet(`/api/admin/users?${query}`)
  users.value = usersData.users || []
  ranks.value = usersData.ranks || []
}

async function deleteComment(id) {
  await apiPost(`/api/admin/comments/${id}/delete`, {})
  comments.value = comments.value.filter((comment) => comment.id !== id)
  summary.value = {
    ...summary.value,
    comments: Math.max(0, summary.value.comments - 1),
    deletedComments: summary.value.deletedComments + 1,
    reportedComments: Math.max(0, summary.value.reportedComments - 1),
  }
}

async function rejectReports(id) {
  await apiPost(`/api/admin/comments/${id}/reject-reports`, {})
  comments.value = comments.value.filter((comment) => comment.id !== id)
  summary.value = {
    ...summary.value,
    reportedComments: Math.max(0, summary.value.reportedComments - 1),
  }
}

async function moderateUser(id, action) {
  message.value = ''
  moderatingId.value = id
  try {
    const data = await apiPost(`/api/admin/users/${id}/moderate`, {
      action,
      hours: 24,
      note: action === 'restore' ? '管理员恢复' : '管理员处理',
    })
    users.value = users.value.map((user) => user.id === id ? data.user : user)
    message.value = {
      mute: '已禁言该用户 24 小时。',
      ban: '已封禁该用户。',
      restore: '已恢复该用户。',
    }[action]
  } catch (error) {
    message.value = error.message
  } finally {
    moderatingId.value = null
  }
}

async function replyMessage(id) {
  const body = replyDrafts.value[id]
  if (!body) return
  await apiPost(`/api/admin/mailbox/messages/${id}/reply`, { body })
  adminMessages.value = adminMessages.value.filter((message) => message.id !== id)
  delete replyDrafts.value[id]
}

async function closeMessage(id) {
  await apiPost(`/api/admin/mailbox/messages/${id}/close`, {})
  adminMessages.value = adminMessages.value.map((message) => message.id === id ? { ...message, status: 'closed' } : message)
}

function statusLabel(status) {
  return {
    active: '正常',
    muted: '禁言',
    banned: '封禁',
  }[status] || status
}

function statusText(status) {
  return status === 'closed' ? '已关闭' : '待处理'
}

function reportReasonText(reasons = []) {
  const labels = {
    spam: '垃圾广告',
    abuse: '人身攻击',
    illegal: '违法内容',
    spoiler: '剧透刷屏',
    offtopic: '严重跑题',
    other: '其他违规',
  }
  return reasons.map((reason) => labels[reason] || reason).join('、') || '未分类'
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
