import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

if (!existsSync('.git') || !existsSync('.githooks')) {
  process.exit(0)
}

const result = spawnSync('git', ['config', 'core.hooksPath', '.githooks'], {
  stdio: 'ignore',
})

process.exit(result.status === 0 ? 0 : 0)
