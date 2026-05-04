<template>
  <section v-if="show" id="comments" class="comment-section">
    <div class="comment-head">
      <h2>同道留言</h2>
      <span>{{ comments.length }} 条</span>
    </div>

    <form class="comment-form" @submit.prevent="submitComment">
      <div v-if="replyTarget" class="comment-replying">
        正在回复 {{ replyTarget.author.displayName }}
        <button type="button" @click="cancelReply">取消</button>
      </div>
      <div class="comment-emoji-row" aria-label="常用表情">
        <button
          v-for="emoji in emojis"
          :key="emoji"
          type="button"
          :disabled="!authState.user || pending"
          @click="insertEmoji(emoji)"
        >
          {{ emoji }}
        </button>
      </div>
      <textarea
        v-model.trim="content"
        :disabled="!authState.user || pending"
        maxlength="1000"
        rows="4"
        :placeholder="authState.user ? '留下本章心得' : '登录后可留言'"
      />
      <div class="comment-actions">
        <span v-if="message" class="comment-message">{{ message }}</span>
        <button type="submit" :disabled="!authState.user || pending || !content">
          {{ pending ? '发送中' : '发布' }}
        </button>
      </div>
    </form>

    <form v-if="reportTarget" class="comment-report-form" @submit.prevent="submitReport">
      <div>
        <strong>举报 {{ reportTarget.author.displayName }} 的评论</strong>
        <button type="button" @click="cancelReport">取消</button>
      </div>
      <p>可举报：垃圾广告、人身攻击、违法内容、剧透刷屏、严重跑题。恶意或高频误报可能被限制举报、禁言或封禁。</p>
      <select v-model="reportReason" :disabled="reportPending">
        <option v-for="reason in reportReasons" :key="reason.value" :value="reason.value">{{ reason.label }}</option>
      </select>
      <textarea v-model.trim="reportDetails" :disabled="reportPending" maxlength="300" rows="3" placeholder="补充说明，可选" />
      <button type="submit" :disabled="reportPending">{{ reportPending ? '提交中' : '提交举报' }}</button>
    </form>

    <div v-if="loading" class="comment-empty">读取留言中</div>
    <div v-else-if="commentTree.length" class="comment-list">
      <article v-for="comment in commentTree" :key="comment.id" class="comment-thread">
        <div class="comment-item">
          <header>
            <strong>{{ comment.author.displayName }}</strong>
            <span v-if="comment.author.title" class="cultivation-title-badge">{{ comment.author.title.name }}</span>
            <span :class="['cultivation-badge', rankForPoints(comment.author.cultivationPoints).className]">
              {{ rankForPoints(comment.author.cultivationPoints).name }}
            </span>
            <time>{{ formatTime(comment.createdAt) }}</time>
          </header>
          <div class="comment-markdown markdown-content" v-html="renderMarkdown(comment.content)" />
          <div class="comment-tools">
            <button type="button" :class="{ active: comment.likedByMe }" @click="toggleLike(comment)">
              {{ comment.likedByMe ? '已赞' : '点赞' }} {{ comment.likeCount || 0 }}
            </button>
            <button type="button" :disabled="!authState.user" @click="startReply(comment)">回复</button>
            <button type="button" :disabled="!authState.user || comment.reportedByMe || authState.user.id === comment.author.id" @click="startReport(comment)">
              {{ comment.reportedByMe ? '已举报' : '举报' }} <span v-if="comment.reportCount">{{ comment.reportCount }}</span>
            </button>
            <button
              v-if="authState.user && (authState.user.id === comment.author.id || authState.user.role === 'admin')"
              class="comment-delete"
              type="button"
              @click="deleteComment(comment.id)"
            >
              删除
            </button>
          </div>
        </div>

        <div v-if="comment.children.length" class="comment-replies">
          <div v-for="reply in comment.children" :key="reply.id" class="comment-item comment-reply">
            <header>
              <strong>{{ reply.author.displayName }}</strong>
              <span v-if="reply.author.title" class="cultivation-title-badge">{{ reply.author.title.name }}</span>
              <span :class="['cultivation-badge', rankForPoints(reply.author.cultivationPoints).className]">
                {{ rankForPoints(reply.author.cultivationPoints).name }}
              </span>
              <time>{{ formatTime(reply.createdAt) }}</time>
            </header>
            <div class="comment-markdown markdown-content" v-html="renderMarkdown(reply.content)" />
            <div class="comment-tools">
              <button type="button" :class="{ active: reply.likedByMe }" @click="toggleLike(reply)">
                {{ reply.likedByMe ? '已赞' : '点赞' }} {{ reply.likeCount || 0 }}
              </button>
              <button type="button" :disabled="!authState.user" @click="startReply(comment)">回复</button>
              <button type="button" :disabled="!authState.user || reply.reportedByMe || authState.user.id === reply.author.id" @click="startReport(reply)">
                {{ reply.reportedByMe ? '已举报' : '举报' }} <span v-if="reply.reportCount">{{ reply.reportCount }}</span>
              </button>
              <button
                v-if="authState.user && (authState.user.id === reply.author.id || authState.user.role === 'admin')"
                class="comment-delete"
                type="button"
                @click="deleteComment(reply.id)"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
    <div v-else class="comment-empty">尚无留言</div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vitepress'
import { apiGet, apiPost, authState, loadMe } from '../auth-state'
import { rankForPoints } from '../rank-utils'
import { renderMarkdown } from '../markdown-render'
import { GATE_CHANGE_EVENT, NOVEL_PROGRESS_EVENT, isNovelChapterPath, normalizePath } from '../novel-progress'

const route = useRoute()
const comments = ref([])
const content = ref('')
const message = ref('')
const loading = ref(false)
const pending = ref(false)
const reportPending = ref(false)
const replyTarget = ref(null)
const reportTarget = ref(null)
const reportReason = ref('spam')
const reportDetails = ref('')
const commentUnlocked = ref(true)
const emojis = ['😀', '😂', '👍', '🙏', '🔥', '💡', '🎉', '🤔']
const reportReasons = [
  { value: 'spam', label: '垃圾广告' },
  { value: 'abuse', label: '人身攻击' },
  { value: 'illegal', label: '违法内容' },
  { value: 'spoiler', label: '剧透刷屏' },
  { value: 'offtopic', label: '严重跑题' },
  { value: 'other', label: '其他违规' },
]

const pagePath = computed(() => {
  const rawPath = typeof window === 'undefined'
    ? route.path
    : window.location.pathname
  return normalizePagePath(rawPath || '/')
})

const show = computed(() => {
  const path = pagePath.value
  return !isCommentDisabledPath(path) && commentUnlocked.value
})

const commentTree = computed(() => {
  const byId = new Map()
  const roots = []
  for (const comment of comments.value) {
    byId.set(comment.id, { ...comment, children: [] })
  }
  for (const comment of byId.values()) {
    if (comment.parentId && byId.has(comment.parentId)) {
      byId.get(comment.parentId).children.push(comment)
    } else {
      roots.push(comment)
    }
  }
  return roots
})

onMounted(() => {
  if (!authState.ready) loadMe().catch(() => {
    authState.ready = true
  })
  updateCommentUnlocked()
  loadComments()
  window.addEventListener('xiuxian-auth-change', loadComments)
  window.addEventListener(GATE_CHANGE_EVENT, handleProgressChange)
  window.addEventListener(NOVEL_PROGRESS_EVENT, handleProgressChange)
})

onUnmounted(() => {
  window.removeEventListener('xiuxian-auth-change', loadComments)
  window.removeEventListener(GATE_CHANGE_EVENT, handleProgressChange)
  window.removeEventListener(NOVEL_PROGRESS_EVENT, handleProgressChange)
})

watch(() => route.path, () => {
  updateCommentUnlocked()
  loadComments()
})

function handleProgressChange() {
  updateCommentUnlocked()
  loadComments()
}

function updateCommentUnlocked() {
  if (typeof window === 'undefined') {
    commentUnlocked.value = true
    return
  }
  const path = normalizePath(window.location.pathname)
  if (!isNovelChapterPath(path)) {
    commentUnlocked.value = true
    return
  }
  commentUnlocked.value = !document.querySelector('.section-gate[data-solved="false"], .chapter-gate[data-solved="false"]')
}

async function loadComments() {
  if (!show.value) {
    comments.value = []
    return
  }
  loading.value = true
  try {
    const data = await apiGet(`/api/comments?pagePath=${encodeURIComponent(pagePath.value)}`)
    comments.value = data.comments || []
  } finally {
    loading.value = false
  }
}

async function submitComment() {
  pending.value = true
  message.value = ''
  try {
    const data = await apiPost('/api/comments', {
      pagePath: pagePath.value,
      parentId: replyTarget.value?.id || null,
      content: content.value,
    })
    comments.value.push(data.comment)
    content.value = ''
    replyTarget.value = null
    await loadMe()
  } catch (error) {
    message.value = error.message
  } finally {
    pending.value = false
  }
}

async function deleteComment(id) {
  message.value = ''
  try {
    await apiPost(`/api/comments/${id}/delete`, {})
    comments.value = comments.value.filter((comment) => comment.id !== id && comment.parentId !== id)
  } catch (error) {
    message.value = error.message
  }
}

async function toggleLike(comment) {
  if (!authState.user) {
    message.value = '登录后可点赞'
    return
  }

  message.value = ''
  try {
    const data = comment.likedByMe
      ? await apiPost(`/api/comments/${comment.id}/unlike`, {})
      : await apiPost(`/api/comments/${comment.id}/like`, {})

    comments.value = comments.value.map((item) => {
      if (item.id !== comment.id) return item
      return { ...item, likedByMe: data.likedByMe, likeCount: data.likeCount }
    })
  } catch (error) {
    message.value = error.message
  }
}

function startReply(comment) {
  if (!authState.user) {
    message.value = '登录后可回复'
    return
  }
  replyTarget.value = comment
  content.value = content.value || `@${comment.author.displayName} `
}

function startReport(comment) {
  if (!authState.user) {
    message.value = '登录后可举报'
    return
  }
  reportTarget.value = comment
  reportReason.value = 'spam'
  reportDetails.value = ''
}

async function submitReport() {
  if (!reportTarget.value) return
  reportPending.value = true
  message.value = ''
  try {
    const data = await apiPost(`/api/comments/${reportTarget.value.id}/report`, {
      reason: reportReason.value,
      details: reportDetails.value,
    })
    comments.value = comments.value.map((item) => {
      if (item.id !== reportTarget.value.id) return item
      return { ...item, reportedByMe: data.reportedByMe, reportCount: data.reportCount }
    })
    reportTarget.value = null
    message.value = '举报已提交，管理员采纳后将获得修为。'
  } catch (error) {
    message.value = error.message
  } finally {
    reportPending.value = false
  }
}

function cancelReply() {
  replyTarget.value = null
}

function cancelReport() {
  reportTarget.value = null
}

function insertEmoji(emoji) {
  content.value = `${content.value}${emoji}`
}

function normalizePagePath(value) {
  let path = normalizePath(value).split('?')[0].split('#')[0]
  path = path.replace(/\/index\.html$/, '/')
  path = path.replace(/\.html$/, '')
  return path || '/'
}

function isCommentDisabledPath(path) {
  const normalized = normalizePagePath(path)
  return normalized === '/'
    || normalized === '/rank'
    || normalized === '/en/rank'
    || normalized === '/admin'
    || normalized === '/mailbox'
    || normalized === '/titles'
    || normalized === '/forum'
    || normalized.startsWith('/admin/')
    || normalized.startsWith('/mailbox/')
    || normalized.startsWith('/titles/')
    || normalized.startsWith('/forum/')
    || normalized.endsWith('/404')
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
