import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ChapterNav from './components/ChapterNav.vue'
import ChapterGate from './components/ChapterGate.vue'
import CodeFontSettings from './components/CodeFontSettings.vue'
import CultivationRealm from './components/CultivationRealm.vue'
import KernelSourceLink from './components/KernelSourceLink.vue'
import type { EnhanceAppContext } from 'vitepress'
import { h } from 'vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(CodeFontSettings),
    })
  },
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('ChapterNav', ChapterNav)
    app.component('ChapterGate', ChapterGate)
    app.component('CodeFontSettings', CodeFontSettings)
    app.component('CultivationRealm', CultivationRealm)
    app.component('KernelSourceLink', KernelSourceLink)
    app.component('KernelSourceTerm', KernelSourceLink)
  },
}
