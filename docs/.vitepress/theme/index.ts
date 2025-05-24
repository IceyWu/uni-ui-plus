import { h } from 'vue'
import Theme from 'vitepress/theme'
import './styles/vars.css'
import './styles/custom.css'
import './styles/scrollbar.scss'

import NavBarTitleAfter from './components/NavBarTitleAfter.vue'
import CustomFooter from './components/CustomFooter.vue'
import SvgImage from './components/SvgImage.vue'
import HomeStar from './components/HomeStar.vue'
import ExternalLink from './components/ExternalLink.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      'home-hero-info-after':()=>h(HomeStar),
      'layout-bottom':() => h(CustomFooter),
      'nav-bar-title-after': () => h(NavBarTitleAfter),
    })
  },
  enhanceApp({ app }) {
    app.component('SvgImage', SvgImage)
    app.component('ExternalLink',ExternalLink)
    app.use(ElementPlus)
  },
}
