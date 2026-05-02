import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ChapterNav from './components/ChapterNav.vue'
import CultivationRealm from './components/CultivationRealm.vue'
import KernelSourceLink from './components/KernelSourceLink.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ChapterNav', ChapterNav)
    app.component('CultivationRealm', CultivationRealm)
    app.component('KernelSourceLink', KernelSourceLink)
  },
}
