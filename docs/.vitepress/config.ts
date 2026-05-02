import { defineConfig } from 'vitepress'
import playgroundPlugin from './theme/markdown-it-playground'

const base = '/linux-xiuxian/'

export default defineConfig({
  base,
  title: 'Linux 内核修仙传',
  description: '以修仙之名，悟内核之道',
  lang: 'zh-CN',
  srcExclude: ['vendor/**'],
  lastUpdated: true,

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap', rel: 'stylesheet' }],
    ['script', { src: `${base}playground.js`, defer: '' }],
  ],

  markdown: {
    config: (md) => {
      playgroundPlugin(md)
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
          text: '前传：根基篇',
          collapsed: false,
          items: [
            { text: '卷首语', link: '/novel/vol0-prologue/' },
            { text: '缘起·道生一', link: '/novel/vol0-prologue/ch000' },
            { text: '第一章：指针之道', link: '/novel/vol0-prologue/ch001' },
            { text: '第二章：结构之术', link: '/novel/vol0-prologue/ch002' },
            { text: '第三章：编译器秘法', link: '/novel/vol0-prologue/ch003' },
            { text: '第四章：寄存器与指令', link: '/novel/vol0-prologue/ch004' },
            { text: '第五章：内联汇编', link: '/novel/vol0-prologue/ch005' },
            { text: '第六章：位运算与原子操作', link: '/novel/vol0-prologue/ch006' },
            { text: '第七章：屏障与无常', link: '/novel/vol0-prologue/ch007' },
            { text: '第八章：预处理器之道', link: '/novel/vol0-prologue/ch008' },
            { text: '第九章：内存布局', link: '/novel/vol0-prologue/ch009' },
            { text: '第十章：ELF 之道', link: '/novel/vol0-prologue/ch010' },
            { text: '终章·筑基归一', link: '/novel/vol0-prologue/ch011' },
          ],
        },
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
            { text: '第十九章：写时复制', link: '/novel/vol2-foundation/ch19' },
            { text: '第二十章：蜕变之术', link: '/novel/vol2-foundation/ch20' },
            { text: '第二十一章：归途', link: '/novel/vol2-foundation/ch21' },
            { text: '第二十二章：僵尸之殇', link: '/novel/vol2-foundation/ch22' },
            { text: '第二十三章：等待之道', link: '/novel/vol2-foundation/ch23' },
            { text: '第二十四章：飞剑传书', link: '/novel/vol2-foundation/ch24' },
            { text: '第二十五章：信号处理', link: '/novel/vol2-foundation/ch25' },
            { text: '第二十六章：不可阻挡', link: '/novel/vol2-foundation/ch26' },
            { text: '第二十七章：shell 小妹', link: '/novel/vol2-foundation/ch27' },
            { text: '第二十八章：进程家族', link: '/novel/vol2-foundation/ch28' },
            { text: '第二十九章：分身有术', link: '/novel/vol2-foundation/ch29' },
            { text: '第三十章：kthreadd 婶婶', link: '/novel/vol2-foundation/ch30' },
            { text: '第三十一章：小千世界', link: '/novel/vol2-foundation/ch31' },
            { text: '第三十二章：因果之链', link: '/novel/vol2-foundation/ch32' },
            { text: '第三十三章：管道', link: '/novel/vol2-foundation/ch33' },
            { text: '第三十四章：共享之秘', link: '/novel/vol2-foundation/ch34' },
            { text: '第三十五章：万物归一', link: '/novel/vol2-foundation/ch35' },
          ],
        },
        {
          text: '第三卷：天道均衡',
          collapsed: true,
          items: [
            { text: '卷首语', link: '/novel/vol3-scheduler/' },
            { text: '第三十六章：竞技场', link: '/novel/vol3-scheduler/ch36' },
            { text: '第三十七章：调度仙子', link: '/novel/vol3-scheduler/ch37' },
            { text: '第三十八章：红黑树', link: '/novel/vol3-scheduler/ch38' },
            { text: '第三十九章：时间片', link: '/novel/vol3-scheduler/ch39' },
            { text: '第四十章：优先级', link: '/novel/vol3-scheduler/ch40' },
            { text: '第四十一章：运行队列', link: '/novel/vol3-scheduler/ch41' },
            { text: '第四十二章：负载均衡', link: '/novel/vol3-scheduler/ch42' },
            { text: '第四十三章：域与组', link: '/novel/vol3-scheduler/ch43' },
            { text: '第四十四章：亲和性', link: '/novel/vol3-scheduler/ch44' },
            { text: '第四十五章：RT 调度', link: '/novel/vol3-scheduler/ch45' },
            { text: '第四十六章：Deadline', link: '/novel/vol3-scheduler/ch46' },
            { text: '第四十七章：上下文切换', link: '/novel/vol3-scheduler/ch47' },
            { text: '第四十八章：调度类', link: '/novel/vol3-scheduler/ch48' },
            { text: '第四十九章：睡眠与唤醒', link: '/novel/vol3-scheduler/ch49' },
            { text: '第五十章：idle 之道', link: '/novel/vol3-scheduler/ch50' },
            { text: '第五十一章：抢占', link: '/novel/vol3-scheduler/ch51' },
            { text: '第五十二章：调度延迟', link: '/novel/vol3-scheduler/ch52' },
            { text: '第五十三章：调度器演进', link: '/novel/vol3-scheduler/ch53' },
            { text: '第五十四章：多核之惑', link: '/novel/vol3-scheduler/ch54' },
            { text: '第五十五章：结丹圆满', link: '/novel/vol3-scheduler/ch55' },
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
