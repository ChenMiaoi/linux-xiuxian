<template>
  <section class="forum-board">
    <header class="forum-hero">
      <span>Forum</span>
      <h1>问道坛</h1>
      <p>交流修行 Linux 内核过程中遇到的卡点、疑惑和心得。</p>
    </header>

    <section class="forum-compose" aria-labelledby="forum-compose-title">
      <div class="forum-compose-head">
        <div>
          <span>发帖</span>
          <h2 id="forum-compose-title">先读规矩，再开坛论道</h2>
        </div>
        <strong>{{ posts.length }} 帖</strong>
      </div>

      <details open class="forum-knowledge">
        <summary>必读知识</summary>
        <div class="forum-knowledge-body">
          <ol>
            <li>只讨论学习、调试、阅读源码、环境搭建和章节理解中的具体困难。</li>
            <li>发帖前先搜索相同或相近问题；已有帖子能继续讨论时，不要重复发帖。</li>
            <li>不要发布攻击、辱骂、歧视、色情、赌博、广告、引流、侵权或违法内容。</li>
            <li>安全相关问题只能用于防护、学习和复现公开资料，不要索要或提供攻击目标、绕过手段、恶意代码。</li>
            <li>提问时给出上下文、报错、环境和已尝试方法；不刷屏，不重复顶帖。</li>
          </ol>
          <label class="forum-ack">
            <input v-model="knowledgeAccepted" type="checkbox" />
            <span>我已阅读并同意遵守以上规则，违规内容可被删除、禁言或封禁。</span>
          </label>
        </div>
      </details>

      <form class="forum-form" @submit.prevent="submitPost">
        <div class="forum-form-row">
          <select v-model="category" :disabled="!authState.user || postPending" aria-label="帖子分类">
            <option value="求助">求助</option>
            <option value="心得">心得</option>
            <option value="纠错">纠错</option>
            <option value="资源">资源</option>
          </select>
          <input
            v-model.trim="title"
            :disabled="!authState.user || postPending"
            maxlength="60"
            placeholder="标题：一句话说清楚遇到的问题"
          />
        </div>
        <textarea
          v-model.trim="body"
          :disabled="!authState.user || postPending"
          maxlength="850"
          rows="6"
          :placeholder="authState.user ? '描述背景、环境、报错、已尝试方法，以及希望同道帮你确认什么' : '登录后可发帖'"
        />
        <div v-if="similarPosts.length" class="forum-similar">
          <strong>可能已有相似帖子</strong>
          <button
            v-for="post in similarPosts"
            :key="post.id"
            type="button"
            @click="focusSearch(parsePost(post).title)"
          >
            {{ parsePost(post).title }}
          </button>
        </div>
        <div class="forum-actions">
          <span v-if="message" class="forum-message">{{ message }}</span>
          <button type="submit" :disabled="!canSubmitPost">
            {{ postPending ? '发布中' : '发布帖子' }}
          </button>
        </div>
      </form>
    </section>

    <form v-if="reportTarget" class="forum-report" @submit.prevent="submitReport">
      <div>
        <strong>举报 {{ reportTarget.author.displayName }} 的内容</strong>
        <button type="button" @click="cancelReport">取消</button>
      </div>
      <select v-model="reportReason" :disabled="reportPending">
        <option v-for="reason in reportReasons" :key="reason.value" :value="reason.value">{{ reason.label }}</option>
      </select>
      <textarea v-model.trim="reportDetails" :disabled="reportPending" maxlength="300" rows="3" placeholder="补充说明，可选" />
      <button type="submit" :disabled="reportPending">{{ reportPending ? '提交中' : '提交举报' }}</button>
    </form>

    <section class="forum-search" aria-label="搜索问道坛帖子">
      <input
        v-model.trim="searchQuery"
        type="search"
        placeholder="搜索标题、正文、分类、作者或回复"
      />
      <button v-if="searchQuery" type="button" @click="searchQuery = ''">清空</button>
      <span>{{ searchQuery ? `${filteredPosts.length} / ${posts.length} 帖` : `共 ${posts.length} 帖` }}</span>
    </section>

    <div v-if="loading" class="forum-empty">读取帖子中</div>
    <div v-else-if="filteredPosts.length" class="forum-list">
      <article v-for="post in filteredPosts" :key="post.id" class="forum-post">
        <header class="forum-post-head">
          <div>
            <span class="forum-category">{{ parsePost(post).category }}</span>
            <h2>{{ parsePost(post).title }}</h2>
          </div>
          <time>{{ formatTime(post.createdAt) }}</time>
        </header>
        <div class="forum-author">
          <strong>{{ post.author.displayName }}</strong>
          <span v-if="post.author.title" class="cultivation-title-badge">{{ post.author.title.name }}</span>
          <span :class="['cultivation-badge', rankForPoints(post.author.cultivationPoints).className]">
            {{ rankForPoints(post.author.cultivationPoints).name }}
          </span>
        </div>
        <div class="forum-markdown markdown-content" v-html="renderMarkdown(parsePost(post).body)" />
        <div class="forum-tools">
          <button type="button" :class="{ active: post.likedByMe }" @click="toggleLike(post)">
            {{ post.likedByMe ? '已赞' : '点赞' }} {{ post.likeCount || 0 }}
          </button>
          <button type="button" :disabled="!authState.user" @click="startReply(post)">回复 {{ post.children.length }}</button>
          <button type="button" :disabled="!authState.user || post.reportedByMe || authState.user.id === post.author.id" @click="startReport(post)">
            {{ post.reportedByMe ? '已举报' : '举报' }}
          </button>
          <button
            v-if="authState.user && (authState.user.id === post.author.id || authState.user.role === 'admin')"
            class="forum-delete"
            type="button"
            @click="deleteComment(post.id)"
          >
            删除
          </button>
        </div>

        <form v-if="replyTarget?.id === post.id" class="forum-reply-form" @submit.prevent="submitReply(post)">
          <textarea v-model.trim="replyContent" :disabled="replyPending" maxlength="600" rows="3" placeholder="写下你的建议、追问或解法" />
          <div class="forum-actions">
            <button type="button" @click="cancelReply">取消</button>
            <button type="submit" :disabled="replyPending || !replyContent">{{ replyPending ? '回复中' : '回复' }}</button>
          </div>
        </form>

        <div v-if="post.children.length" class="forum-replies">
          <article v-for="reply in post.children" :key="reply.id" class="forum-reply">
            <header>
              <strong>{{ reply.author.displayName }}</strong>
              <span v-if="reply.author.title" class="cultivation-title-badge">{{ reply.author.title.name }}</span>
              <time>{{ formatTime(reply.createdAt) }}</time>
            </header>
            <div class="forum-markdown markdown-content" v-html="renderMarkdown(reply.content)" />
            <div class="forum-tools">
              <button type="button" :class="{ active: reply.likedByMe }" @click="toggleLike(reply)">
                {{ reply.likedByMe ? '已赞' : '点赞' }} {{ reply.likeCount || 0 }}
              </button>
              <button type="button" :disabled="!authState.user || reply.reportedByMe || authState.user.id === reply.author.id" @click="startReport(reply)">
                {{ reply.reportedByMe ? '已举报' : '举报' }}
              </button>
              <button
                v-if="authState.user && (authState.user.id === reply.author.id || authState.user.role === 'admin')"
                class="forum-delete"
                type="button"
                @click="deleteComment(reply.id)"
              >
                删除
              </button>
            </div>
          </article>
        </div>
      </article>
    </div>
    <div v-else class="forum-empty">{{ searchQuery ? '没有找到匹配的帖子。' : '还没有帖子。' }}</div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { apiGet, apiPost, authState, loadMe } from '../auth-state'
import { rankForPoints } from '../rank-utils'
import { renderMarkdown } from '../markdown-render'

const forumPath = '/forum'
const comments = ref([])
const loading = ref(false)
const postPending = ref(false)
const replyPending = ref(false)
const reportPending = ref(false)
const message = ref('')
const knowledgeAccepted = ref(false)
const category = ref('求助')
const title = ref('')
const body = ref('')
const searchQuery = ref('')
const replyTarget = ref(null)
const replyContent = ref('')
const reportTarget = ref(null)
const reportReason = ref('illegal')
const reportDetails = ref('')
const reportReasons = [
  { value: 'illegal', label: '违法或危险内容' },
  { value: 'abuse', label: '人身攻击' },
  { value: 'spam', label: '广告引流' },
  { value: 'offtopic', label: '严重跑题' },
  { value: 'other', label: '其他违规' },
]

const posts = computed(() => {
  const byId = new Map()
  const roots = []
  for (const comment of comments.value) byId.set(comment.id, { ...comment, children: [] })
  for (const comment of byId.values()) {
    if (comment.parentId && byId.has(comment.parentId)) {
      byId.get(comment.parentId).children.push(comment)
    } else {
      roots.push(comment)
    }
  }
  return roots.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

const canSubmitPost = computed(() => {
  return Boolean(authState.user && !postPending.value && knowledgeAccepted.value && title.value && body.value)
})

const filteredPosts = computed(() => {
  const query = normalizeSearch(searchQuery.value)
  if (!query) return posts.value
  return posts.value.filter((post) => searchableText(post).includes(query))
})

const similarPosts = computed(() => {
  const query = normalizeSearch(title.value)
  if (query.length < 4) return []
  return posts.value
    .filter((post) => searchableText(post).includes(query))
    .slice(0, 3)
})

onMounted(() => {
  if (!authState.ready) loadMe().catch(() => {
    authState.ready = true
  })
  loadPosts()
  window.addEventListener('xiuxian-auth-change', loadPosts)
})

onUnmounted(() => {
  window.removeEventListener('xiuxian-auth-change', loadPosts)
})

async function loadPosts() {
  loading.value = true
  try {
    const data = await apiGet(`/api/comments?pagePath=${encodeURIComponent(forumPath)}`)
    comments.value = data.comments || []
  } finally {
    loading.value = false
  }
}

async function submitPost() {
  postPending.value = true
  message.value = ''
  try {
    const data = await apiPost('/api/comments', {
      pagePath: forumPath,
      parentId: null,
      content: `【${category.value}】${title.value}\n\n${body.value}`,
      knowledgeAccepted: knowledgeAccepted.value,
    })
    comments.value.push(data.comment)
    title.value = ''
    body.value = ''
    knowledgeAccepted.value = false
    await loadMe()
  } catch (error) {
    message.value = error.message
  } finally {
    postPending.value = false
  }
}

async function submitReply(post) {
  replyPending.value = true
  message.value = ''
  try {
    const data = await apiPost('/api/comments', {
      pagePath: forumPath,
      parentId: post.id,
      content: replyContent.value,
    })
    comments.value.push(data.comment)
    replyTarget.value = null
    replyContent.value = ''
    await loadMe()
  } catch (error) {
    message.value = error.message
  } finally {
    replyPending.value = false
  }
}

async function toggleLike(comment) {
  if (!authState.user) {
    message.value = '登录后可点赞'
    return
  }
  const data = comment.likedByMe
    ? await apiPost(`/api/comments/${comment.id}/unlike`, {})
    : await apiPost(`/api/comments/${comment.id}/like`, {})
  comments.value = comments.value.map((item) => item.id === comment.id ? { ...item, ...data } : item)
}

async function deleteComment(id) {
  await apiPost(`/api/comments/${id}/delete`, {})
  comments.value = comments.value.filter((comment) => comment.id !== id && comment.parentId !== id)
}

function startReply(post) {
  if (!authState.user) {
    message.value = '登录后可回复'
    return
  }
  replyTarget.value = post
  replyContent.value = ''
}

function cancelReply() {
  replyTarget.value = null
  replyContent.value = ''
}

function startReport(comment) {
  reportTarget.value = comment
  reportReason.value = 'illegal'
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
    comments.value = comments.value.map((item) => item.id === reportTarget.value.id ? { ...item, ...data } : item)
    reportTarget.value = null
    message.value = '举报已提交，管理员会在后台处理。'
  } catch (error) {
    message.value = error.message
  } finally {
    reportPending.value = false
  }
}

function cancelReport() {
  reportTarget.value = null
}

function focusSearch(value) {
  searchQuery.value = value
}

function parsePost(post) {
  const match = post.content.match(/^【(.+?)】(.+?)\n\n([\s\S]*)$/)
  if (match) return { category: match[1], title: match[2], body: match[3] }
  const [firstLine, ...rest] = post.content.split('\n')
  return { category: '问道', title: firstLine || '无题', body: rest.join('\n') || post.content }
}

function searchableText(post) {
  const parsed = parsePost(post)
  const replies = post.children?.map((reply) => `${reply.content} ${reply.author.displayName}`).join(' ') || ''
  return normalizeSearch(`${parsed.category} ${parsed.title} ${parsed.body} ${post.author.displayName} ${replies}`)
}

function normalizeSearch(value) {
  return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ')
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
