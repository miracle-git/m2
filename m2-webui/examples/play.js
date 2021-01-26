import Vue from 'vue'
import VueRouter from 'vue-router'
import { DataBus, APP_INSTANCE_READY } from 'm2-core'
import Element from 'element-ui'
import M2 from 'main/index.js'
import App from './play.vue'
import 'm2-theme/lib/index.css'
import 'packages/theme-grace/src/index.less'
import icon from './icon.json'

Vue.use(Element)
Vue.use(M2)
Vue.use(VueRouter)

Vue.prototype.$icon = icon // Icon 列表页用
const router = new VueRouter({
  mode: 'hash'
})

window.__context__ = new Vue({ // eslint-disable-line
  router,
  render: h => h(App)
}).$mount('#app')

DataBus.emit(APP_INSTANCE_READY, window.__context__)
