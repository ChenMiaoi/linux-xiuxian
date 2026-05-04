export function normalizePagePath(value) {
  if (typeof value !== 'string') return '/'
  let path = value.trim() || '/'
  path = path.split('?')[0].split('#')[0]
  const siteBase = process.env.SITE_BASE || '/'
  const normalizedBase = siteBase === '/' ? '' : `/${siteBase.replace(/^\/+|\/+$/g, '')}`
  if (normalizedBase && path.startsWith(`${normalizedBase}/`)) {
    path = path.slice(normalizedBase.length)
  }
  path = path.replace(/\/index\.html$/, '/')
  path = path.replace(/\.html$/, '')
  if (!path.startsWith('/')) path = `/${path}`
  return path || '/'
}

export function pagePathAliases(value) {
  const normalized = normalizePagePath(value)
  const aliases = new Set([normalized])
  if (normalized === '/') {
    aliases.add('/index.html')
  } else if (!normalized.endsWith('/')) {
    aliases.add(`${normalized}.html`)
  } else {
    aliases.add(`${normalized}index.html`)
  }
  return [...aliases]
}
