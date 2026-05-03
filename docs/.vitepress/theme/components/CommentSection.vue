<template>
  <section v-if="show" class="comment-section">
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

    <div v-if="loading" class="comment-empty">读取留言中</div>
    <div v-else-if="commentTree.length" class="comment-list">
      <article v-for="comment in commentTree" :key="comment.id" class="comment-thread">
        <div class="comment-item">
          <header>
            <strong>{{ comment.author.displayName }}</strong>
            <span :class="['cultivation-badge', rankForPoints(comment.author.cultivationPoints).className]">
              {{ rankForPoints(comment.author.cultivationPoints).name }}
            </span>
            <time>{{ formatTime(comment.createdAt) }}</time>
          </header>
          <p>{{ comment.content }}</p>
          <div class="comment-tools">
            <button type="button" :class="{ active: comment.likedByMe }" @click="toggleLike(comment)">
              {{ comment.likedByMe ? '已赞' : '点赞' }} {{ comment.likeCount || 0 }}
            </button>
            <button type="button" :disabled="!authState.user" @click="startReply(comment)">回复</button>
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
              <span :class="['cultivation-badge', rankForPoints(reply.author.cultivationPoints).className]">
                {{ rankForPoints(reply.author.cultivationPoints).name }}
              </span>
              <time>{{ formatTime(reply.createdAt) }}</time>
            </header>
            <p>{{ reply.content }}</p>
            <div class="comment-tools">
              <button type="button" :class="{ active: reply.likedByMe }" @click="toggleLike(reply)">
                {{ reply.likedByMe ? '已赞' : '点赞' }} {{ reply.likeCount || 0 }}
              </button>
              <button type="button" :disabled="!authState.user" @click="startReply(comment)">回复</button>
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

const route = useRoute()
const comments = ref([])
const content = ref('')
const message = ref('')
const loading = ref(false)
const pending = ref(false)
const replyTarget = ref(null)
const emojis = ['😀', '😂', '👍', '🙏', '🔥', '💡', '🎉', '🤔']

const pagePath = computed(() => {
  const rawPath = typeof window === 'undefined'
    ? route.path
    : window.location.pathname.replace(/^\/linux-xiuxian(?=\/)/, '')
  return normalizePagePath(rawPath || '/')
})

const show = computed(() => {
  const path = pagePath.value
  return !isCommentDisabledPath(path)
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
  loadComments()
  window.addEventListener('xiuxian-auth-change', loadComments)
})

onUnmounted(() => {
  window.removeEventListener('xiuxian-auth-change', loadComments)
})

watch(() => route.path, loadComments)

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

function cancelReply() {
  replyTarget.value = null
}

function insertEmoji(emoji) {
  content.value = `${content.value}${emoji}`
}

function normalizePagePath(value) {
  let path = value.split('?')[0].split('#')[0]
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
    || normalized.startsWith('/admin/')
    || normalized.startsWith('/mailbox/')
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
