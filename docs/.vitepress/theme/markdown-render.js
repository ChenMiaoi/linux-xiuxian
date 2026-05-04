import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: false,
  breaks: true,
  linkify: true,
  typographer: false,
})

const defaultLinkOpen = md.renderer.rules.link_open || ((tokens, idx, options, _env, self) => {
  return self.renderToken(tokens, idx, options)
})

md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  const targetIndex = token.attrIndex('target')
  if (targetIndex < 0) token.attrPush(['target', '_blank'])
  else token.attrs[targetIndex][1] = '_blank'

  const relIndex = token.attrIndex('rel')
  if (relIndex < 0) token.attrPush(['rel', 'nofollow noopener noreferrer'])
  else token.attrs[relIndex][1] = 'nofollow noopener noreferrer'

  return defaultLinkOpen(tokens, idx, options, env, self)
}

export function renderMarkdown(value) {
  return md.render(String(value || ''))
}
