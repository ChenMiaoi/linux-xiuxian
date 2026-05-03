import { defineConfig } from 'vitepress'
import playgroundPlugin from './theme/markdown-it-playground'
import kernelSourcePlugin from './theme/markdown-it-kernel-source'
import { getZhSidebar, getEnSidebar } from './sidebar'

const base = '/linux-xiuxian/'

export default defineConfig({
  base,
  title: 'Linux 内核修仙传',
  description: '以修仙之名，悟内核之道',
  lang: 'zh-CN',
  srcExclude: ['vendor/**'],
  lastUpdated: process.env.VITEPRESS_LAST_UPDATED === 'false' ? false : true,

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@400;700&display=swap', rel: 'stylesheet' }],
    ['script', { src: `${base}playground.js`, defer: '' }],
  ],

  markdown: {
    config: (md) => {
      playgroundPlugin(md)
      kernelSourcePlugin(md)
    },
  },

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Linux Kernel Cultivation Chronicle',
      description: 'Enlightenment of the Kernel Through the Art of Cultivation',
      themeConfig: {
        logo: '/logo.svg',
        siteTitle: 'Kernel Cultivation',
        search: { provider: 'local' },
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Guide', link: '/en/guide/introduction' },
          { text: 'Novel', link: '/en/novel/' },
          { text: 'Rank', link: '/en/rank' },
          { text: 'Reference', link: '/en/reference/kernel-map' },
        ],
        sidebar: getEnSidebar(),
        outline: [2, 3],
        footer: {
          message: 'Enlightenment of the kernel through cultivation',
          copyright: 'Linux Kernel Cultivation Chronicle',
        },
      },
    },
  },

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: '内核修仙传',
    search: { provider: 'local' },

    nav: [
      { text: '首页', link: '/' },
      { text: '修仙指南', link: '/guide/introduction' },
      {
        text: '正文',
        items: [
          { text: '前传：根基篇', link: '/novel/vol0-prologue/' },
          { text: '第一卷：混沌初开', link: '/novel/vol1-chaos/' },
          { text: '第二卷：万物之基', link: '/novel/vol2-foundation/' },
          { text: '第三卷：天道均衡', link: '/novel/vol3-scheduler/' },
          { text: '第四卷：内景天地', link: '/novel/vol4-memory/' },
          { text: '第五卷：永恒之森', link: '/novel/vol5-filesystem/' },
          { text: '第六卷：沧海横流', link: '/novel/vol6-network/' },
          { text: '第七卷：天地之桥', link: '/novel/vol7-drivers/' },
          { text: '第八卷：天劫降临', link: '/novel/vol8-security/' },
          { text: '第九卷：大道无形', link: '/novel/vol9-architecture/' },
          { text: '第十卷：飞升大道', link: '/novel/vol10-ascension/' },
        ],
      },
      { text: '排行榜', link: '/rank' },
      { text: '道藏', link: '/reference/kernel-map' },
    ],

    sidebar: getZhSidebar(),

    outline: [2, 3],
    footer: {
      message: '以修仙之名，悟内核之道',
      copyright: 'Linux 内核修仙传',
    },
  },
})
