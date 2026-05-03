import fs from 'node:fs'
import path from 'node:path'
import YAML from 'yaml'

const defaultConfigPaths = [
  process.env.CONFIG_FILE,
  path.resolve('.deploy.yaml'),
  path.resolve('.deploy.yml'),
].filter(Boolean)

function flattenConfig(input, prefix = '') {
  const entries = []
  if (!input || typeof input !== 'object' || Array.isArray(input)) return entries

  for (const [key, value] of Object.entries(input)) {
    const envKey = `${prefix}${key}`.replace(/[.-]/g, '_').toUpperCase()
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      entries.push(...flattenConfig(value, `${envKey}_`))
    } else if (Array.isArray(value)) {
      entries.push([envKey, value.join(',')])
    } else if (value !== null && value !== undefined) {
      entries.push([envKey, String(value)])
    }
  }

  return entries
}

for (const configPath of defaultConfigPaths) {
  if (!fs.existsSync(configPath)) continue

  const parsed = YAML.parse(fs.readFileSync(configPath, 'utf8')) || {}
  for (const [key, value] of flattenConfig(parsed)) {
    if (process.env[key] === undefined || process.env[key] === '') {
      process.env[key] = value
    }
  }
  break
}
