#!/usr/bin/env node
import { readFileSync } from 'node:fs'

const allowedTypes = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'perf',
  'test',
  'build',
  'ci',
  'chore',
  'revert',
]

function usage() {
  console.error('Usage: node scripts/validate-commit-msg.mjs <commit-msg-file>')
  console.error('   or: node scripts/validate-commit-msg.mjs --message "feat(scope): description"')
}

function readMessage(args) {
  if (process.env.COMMIT_MSG) {
    return process.env.COMMIT_MSG
  }

  if (args[0] === '--message') {
    const message = args.slice(1).join(' ').trim()
    if (!message) {
      usage()
      process.exit(2)
    }
    return message
  }

  const file = args[0]
  if (!file) {
    usage()
    process.exit(2)
  }

  return readFileSync(file, 'utf8')
}

function firstMeaningfulLine(message) {
  return message
    .split(/\r?\n/)
    .map(line => line.trim())
    .find(line => line && !line.startsWith('#')) || ''
}

function validate(message) {
  const subject = firstMeaningfulLine(message)
  const typeList = allowedTypes.join('|')
  const pattern = new RegExp(`^(${typeList})(\\([a-z0-9][a-z0-9._-]*\\))?!?: .{1,100}$`)

  if (/^(Merge|Revert)\b/.test(subject)) {
    return []
  }

  const errors = []

  if (!pattern.test(subject)) {
    errors.push(
      '提交信息必须使用 Conventional Commits 格式：<type>(<scope>): <description>',
      '示例：feat(vol1): 新增第二章互动试炼',
      '示例：fix(theme): 修复 playground 代码缩进',
      `允许的 type：${allowedTypes.join(', ')}`,
    )
  }

  if (subject.endsWith('.') || subject.endsWith('。')) {
    errors.push('description 末尾不要使用句号。')
  }

  return errors
}

const message = readMessage(process.argv.slice(2))
const errors = validate(message)

if (errors.length > 0) {
  console.error('\ncommit message 校验失败：')
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  console.error('')
  process.exit(1)
}
