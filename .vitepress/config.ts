import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Linux 内核修仙传',
  description: '以修仙之名，悟内核之道',
  lang: 'zh-CN',
  srcExclude: ['vendor/**'],
  lastUpdated: true,

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap', rel: 'stylesheet' }],
  ],

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
      { text: '道藏', link: '/reference/kernel-map' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '修仙指南',
          items: [
            { text: '简介', link: '/guide/introduction' },
            { text: '修炼体系', link: '/guide/cultivation-system' },
            { text: '人物志', link: '/guide/character-guide' },
            { text: '世界观设定', link: '/guide/world-building' },
          ],
        },
      ],
      '/reference/': [
        {
          text: '道藏（技术参考）',
          items: [
            { text: '内核地图', link: '/reference/kernel-map' },
            { text: '术语对照', link: '/reference/glossary' },
            { text: '源码注解', link: '/reference/source-annotations' },
          ],
        },
      ],
      '/novel/': [
        {
          text: '第一卷：混沌初开',
          collapsed: false,
          items: [
            { text: '卷首语', link: '/novel/vol1-chaos/' },
            { text: '第一章：天地未分', link: '/novel/vol1-chaos/ch01' },
            { text: '第二章：天雷劈下', link: '/novel/vol1-chaos/ch02' },
            { text: '第三章：命运之门', link: '/novel/vol1-chaos/ch03' },
            { text: '第四章：脱胎换骨', link: '/novel/vol1-chaos/ch04' },
            { text: '第五章：开天辟地', link: '/novel/vol1-chaos/ch05' },
            { text: '第六章：天选之子', link: '/novel/vol1-chaos/ch06' },
            { text: '第七章：天道初显', link: '/novel/vol1-chaos/ch07' },
            { text: '第八章：第一次祈祷', link: '/novel/vol1-chaos/ch08' },
            { text: '第九章：不期而至', link: '/novel/vol1-chaos/ch09' },
            { text: '第十章：世界末日', link: '/novel/vol1-chaos/ch10' },
            { text: '第十一章：劫后余生', link: '/novel/vol1-chaos/ch11' },
            { text: '第十二章：天道法则', link: '/novel/vol1-chaos/ch12' },
            { text: '第十三章：不甘 idle', link: '/novel/vol1-chaos/ch13' },
            { text: '第十四章：踏上征途', link: '/novel/vol1-chaos/ch14' },
            { text: '第十五章：新的开始', link: '/novel/vol1-chaos/ch15' },
          ],
        },
        {
          text: '第二卷：万物之基',
          collapsed: true,
          items: [
            { text: '卷首语', link: '/novel/vol2-foundation/' },
            { text: '第十六章：分身之术', link: '/novel/vol2-foundation/ch16' },
            { text: '第十七章：task_struct 之躯', link: '/novel/vol2-foundation/ch17' },
            { text: '第十八章：fork 大道', link: '/novel/vol2-foundation/ch18' },
          ],
        },
        {
          text: '第三卷：天道均衡',
          collapsed: true,
          items: [
            { text: '卷首语', link: '/novel/vol3-scheduler/' },
            { text: '第三十六章：竞技场', link: '/novel/vol3-scheduler/ch36' },
          ],
        },
        {
          text: '第四卷：内景天地',
          collapsed: true,
          items: [
            { text: '卷首语', link: '/novel/vol4-memory/' },
            { text: '第五十六章：内景初开', link: '/novel/vol4-memory/ch56' },
          ],
        },
        {
          text: '第五卷：永恒之森',
          collapsed: true,
          items: [
            { text: '卷首语', link: '/novel/vol5-filesystem/' },
            { text: '第八十一章：古树之森', link: '/novel/vol5-filesystem/ch81' },
          ],
        },
        {
          text: '第六卷：沧海横流',
          collapsed: true,
          items: [
            { text: '卷首语', link: '/novel/vol6-network/' },
            { text: '第一百零六章：望海', link: '/novel/vol6-network/ch106' },
          ],
        },
        {
          text: '第七卷：天地之桥',
          collapsed: true,
          items: [
            { text: '卷首语', link: '/novel/vol7-drivers/' },
            { text: '第一百三十一章：设备山脉', link: '/novel/vol7-drivers/ch131' },
          ],
        },
        {
          text: '第八卷：天劫降临',
          collapsed: true,
          items: [
            { text: '卷首语', link: '/novel/vol8-security/' },
            { text: '第一百五十六章：暗影', link: '/novel/vol8-security/ch156' },
          ],
        },
        {
          text: '第九卷：大道无形',
          collapsed: true,
          items: [
            { text: '卷首语', link: '/novel/vol9-architecture/' },
            { text: '第一百七十六章：无常', link: '/novel/vol9-architecture/ch176' },
          ],
        },
        {
          text: '第十卷：飞升大道',
          collapsed: true,
          items: [
            { text: '卷首语', link: '/novel/vol10-ascension/' },
            { text: '第二百零一章：补丁', link: '/novel/vol10-ascension/ch201' },
          ],
        },
      ],
    },

    outline: [2, 3],
    socialLinks: [{ icon: 'github', link: 'https://github.com/ChenMiaoi/linux-xiuxian' }],
    footer: {
      message: '以修仙之名，悟内核之道',
      copyright: 'Linux 内核修仙传',
    },
  },
})
