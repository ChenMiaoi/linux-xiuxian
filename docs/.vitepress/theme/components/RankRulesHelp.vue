<template>
  <span class="rank-rules-help">
    <button
      class="rank-rules-trigger"
      type="button"
      aria-label="查看积分规则"
      :aria-expanded="open ? 'true' : 'false'"
      @click="open = !open"
    >
      ?
    </button>
    <div v-if="open" class="rank-rules-popover">
      <div class="rank-rules-head">
        <strong>{{ copy.title }}</strong>
        <button type="button" aria-label="关闭" @click="open = false">×</button>
      </div>
      <ol class="rank-rules-list">
        <li v-for="rule in copy.rules" :key="rule">{{ rule }}</li>
      </ol>
      <p>{{ copy.note }}</p>
      <div class="rank-realms-grid">
        <span
          v-for="realm in realms"
          :key="realm.name"
          :class="['cultivation-badge', realm.className]"
        >
          {{ realm.name }} {{ realm.points }}
        </span>
      </div>
    </div>
  </span>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  locale: { type: String, default: 'zh' },
})

const open = ref(false)

const zh = {
  title: '修为获取规则',
  rules: [
    '注册入山：获得 10 修为。',
    '评论发言：每条有效评论获得 2 修为；每天最多 5 条计入修为。',
    '章节解锁：每完成并解锁一章获得 10 修为；每章仅计一次。',
    'GitHub 有效 Issue：后续接入 GitHub 关联后开放，每个有效 Issue 获得 10 修为，不设上限。',
    'GitHub PR 成功 Merge：后续接入 GitHub 关联后开放，每次 Merge 获得 80 修为，不设上限。',
  ],
  note: 'GitHub 积分会以绑定账号、Issue/PR 状态和维护者标记为准，避免重复计分。',
}

const en = {
  title: 'Point Rules',
  rules: [
    'Registration: +10 points.',
    'Commenting: +2 points for each valid comment; only the first 5 comments per day count.',
    'Chapter unlock: +10 points after completing a chapter; each chapter counts once.',
    'Valid GitHub Issue: +10 points after GitHub linking is added, with no cap.',
    'Merged GitHub PR: +80 points after GitHub linking is added, with no cap.',
  ],
  note: 'GitHub points will depend on the linked account, issue/PR state, and maintainer validation.',
}

const realms = [
  { name: '炼气', points: '0', className: 'realm-qi' },
  { name: '筑基', points: '100', className: 'realm-foundation' },
  { name: '金丹', points: '500', className: 'realm-core' },
  { name: '元婴', points: '1500', className: 'realm-nascent' },
  { name: '化神', points: '4000', className: 'realm-spirit' },
  { name: '炼虚', points: '10000', className: 'realm-dao' },
  { name: '合体', points: '25000', className: 'realm-merge' },
  { name: '大乘', points: '60000', className: 'realm-mahayana' },
  { name: '渡劫', points: '150000', className: 'realm-tribulation' },
  { name: '飞升', points: '400000', className: 'realm-immortal' },
]

const copy = computed(() => props.locale === 'en' ? en : zh)
</script>
