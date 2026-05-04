import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ChapterNav from './components/ChapterNav.vue'
import ChapterGate from './components/ChapterGate.vue'
import CodeFontSettings from './components/CodeFontSettings.vue'
import CultivationRealm from './components/CultivationRealm.vue'
import KernelSourceLink from './components/KernelSourceLink.vue'
import NovelProgressGuard from './components/NovelProgressGuard.vue'
import GitHubRepoStats from './components/GitHubRepoStats.vue'
import AuthWidget from './components/AuthWidget.vue'
import CommentSection from './components/CommentSection.vue'
import RankLeaderboard from './components/RankLeaderboard.vue'
import RankRulesHelp from './components/RankRulesHelp.vue'
import AdminPanel from './components/AdminPanel.vue'
import MailboxPanel from './components/MailboxPanel.vue'
import ForumBoard from './components/ForumBoard.vue'
import type { EnhanceAppContext } from 'vitepress'
import { h } from 'vue'

export default {
  extends: DefaultTheme,
  Layout() {
    const navTools = () => h('div', { class: 'xiuxian-nav-tools' }, [h(GitHubRepoStats), h(AuthWidget)])
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': navTools,
      'nav-screen-content-after': navTools,
      'doc-after': () => h(CommentSection),
      'layout-bottom': () => h(CodeFontSettings),
      'layout-top': () => h(NovelProgressGuard),
    })
  },
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('ChapterNav', ChapterNav)
    app.component('ChapterGate', ChapterGate)
    app.component('CodeFontSettings', CodeFontSettings)
    app.component('CultivationRealm', CultivationRealm)
    app.component('KernelSourceLink', KernelSourceLink)
    app.component('KernelSourceTerm', KernelSourceLink)
    app.component('AuthWidget', AuthWidget)
    app.component('CommentSection', CommentSection)
    app.component('RankLeaderboard', RankLeaderboard)
    app.component('RankRulesHelp', RankRulesHelp)
    app.component('AdminPanel', AdminPanel)
    app.component('MailboxPanel', MailboxPanel)
    app.component('ForumBoard', ForumBoard)
  },
}
