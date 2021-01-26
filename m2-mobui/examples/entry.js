// 兼容IE浏览器
import '@babel/polyfill'
import 'whatwg-fetch'
import Vue from 'vue'
import entry from './app'
import VueRouter from 'vue-router'
import Element from 'element-ui'
import M2 from 'main/index.js'
import hljs from 'highlight.js'
import routes from './router'
import title from './i18n/title'
import { Header, Footer, Sidenav, DemoBlock } from 'components'
// import 'element-ui/lib/theme-chalk/index.css'
import './demo-styles/index.less'
import 'm2-theme/lib/index.css'
import 'packages/theme-grace/src/index.less'
import './assets/color.less'
import './assets/layout.less'
import './assets/common.less'
import './assets/icons.less'
import icon from './icon.json'

Vue.use(Element)
Vue.use(M2)
Vue.use(VueRouter)

Vue.component('main-header', Header)
Vue.component('demo-block', DemoBlock)
Vue.component('side-nav', Sidenav)
Vue.component('footer-nav', Footer)

Vue.prototype.$icon = icon // Icon 列表页用
const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
})

router.afterEach(route => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)')
    Array.prototype.forEach.call(blocks, hljs.highlightBlock)
  })
  const data = title[route.meta.lang]
  for (const val in data) {
    if (new RegExp('^' + val, 'g').test(route.name)) {
      document.title = data[val]
      return
    }
  }
  document.title = 'M2 MobUI'
})

new Vue({ // eslint-disable-line
  ...entry,
  router
}).$mount('#app')
