## m2-vue

[![](https://img.shields.io/badge/m2--vue-v1.2.0-green.svg)](https://github.com/miracle-git/m2.git) <br/>
> M2基于Vue框架封装的应用框架库。

### 用法
- 安装
```bash
npm install m2-vue
```
### APIs
- **render** 渲染Vue应用的根组件。
 ####
 | 参数 | 类型 | 描述 | 默认值 | 示例 |
 | ------------ | ------------ | ------------ | ------------ | ------------ |
 | rootApp | object | 当前应用的根组件(可能是对象或组件) | — | — |
 | options | object | 当前扩展配置 | — | {router,store,env,i18n,plugins,fastclick,cookie,lazy,init} |
 ```js
 import { render } from 'm2-vue'
 // 全量加载
 // import M2 from 'm2-mobui'
 // import Element from 'element-ui'
 // 按需加载
 import plugins from './plugins'
 import App from './views/app'
 import router from './router'
 import store from './store'
 import i18n from './locales/i18n'
 import './plugins/svg'

 export default render(App, {
   router,
   store,
   i18n,
   plugins,
   lazy: {
     preLoad: 1,
     loading: require('assets/img/common/loading.gif')
   },
   init: Vue => {
     // 启用全量加载（请在views/app.vue中引入样式：@import "~m2-mobui/lib/theme-grace/index.css"）
     // Vue.use(M2)
     // Vue.use(Element)
     // 启用按需加载（需要重新运行npm run serve）
   }
 })
```
- **getI18nLocale** 配置应用的多语言插件(集成element,m2,...)。
 ####
 | 参数 | 类型 | 描述 | 默认值 | 示例 |
 | ------------ | ------------ | ------------ | ------------ | ------------ |
 | langs | object | 应用多语言配置 | — | { zh: {default:true,name:'姓名'}, en: {name:'Name'} }
 | locales | array | 其他框架(element,m2,...)多语言配置 | — | { elementLocale, m2Locale } |
- **mergeLangs** 合并其他框架的语言包与当前应用的语言包(element,m2,...)。
 ####
 | 参数 | 类型 | 描述 | 默认值 | 示例 |
 | ------------ | ------------ | ------------ | ------------ | ------------ |
 | appLang | object | 当前应用语言包 | — | { name: '姓名' }
 | langs | array | 其他框架(element,m2,...)语言包 | — | { elementLocale, m2Locale } |
- **configDefaultLang** 配置默认的语言。
 ####
 | 参数 | 类型 | 描述 | 默认值 | 示例 |
 | ------------ | ------------ | ------------ | ------------ | ------------ |
 | lang | string | 默认语言(未配置将自动读取浏览器或系统的默认配置) | — | 'zh' |
- **changeLang** 切换当前应用的语言。
- *appKey* 当前多语言配置来源于第三方配置时使用。
 ####
 | 参数 | 类型 | 描述 | 默认值 | 示例 |
 | ------------ | ------------ | ------------ | ------------ | ------------ |
 | vm | object | 当前应用实例vm | — | — |
 | lang | string | 当前切换的语言 | — | 'en' |
 | appKey | string | 当前多语言配置的系统标识符 | — | — |
- **getRouter** 获取路由配置对象。
 ####
 | 参数 | 类型 | 描述 | 默认值 | 示例 |
 | ------------ | ------------ | ------------ | ------------ | ------------ |
 | routerConfig | array | 路由配置对象 | — | — |
 | options | object | 配置选项 | — | { mode: 'hash', redirect: '/home', notmatch: '/404' } |
 ```js
 import { getRouter } from 'm2-vue'

 const routes = [
   { path: '/home', component: () => import('views/home'), meta: { keepAlive: true, title: '首页' } },
   { path: '/category', component: () => import('views/category'), meta: { title: '分类' }  },
   { path: '/shopcart', component: () => import('views/shopcart'), meta: { title: '购物车', auth: true } },
   { path: '/profile', component: () => import('views/profile'), meta: { title: '我的', auth: true } }
 ]

export default getRouter(routes, { redirect: '/home', notmatch: '/404', guard: (to, from, next) => {} })
// export default getRouter(routes, { redirect: '/home', notmatch: '/404', guard: { auth: 'auth', login: 'login', before: (to, from, next) => {} }})
```
- **mapRoute** 将路由表中的路由配置组件名(字符串)映射为真实的组件。
 ####
 | 参数 | 类型 | 描述 | 默认值 | 示例 |
 | ------------ | ------------ | ------------ | ------------ | ------------ |
 | route | object | 当前的路由对象 | — | { path: '/', name: 'Home', component: 'home', children: [] }
 | routeMap | object | 路由映射对象 | — | {'home': () => import('/views/home')}
- **mapRouteConfig** 映射路由表的路由配置项。
 ####
 | 参数 | 类型 | 描述 | 默认值 | 示例 |
 | ------------ | ------------ | ------------ | ------------ | ------------ |
 | routes | Array | 当前的路由对象 | — | [{ path: '/', name: 'Home', component: 'home', children: [] }]
 | routeMap | Object | 路由映射对象 | — | {'home': () => import('/views/home')}
- **getStore** 获取Vuex的Store对象。
 ####
 | 参数 | 类型 | 描述 | 默认值 | 示例 |
 | ------------ | ------------ | ------------ | ------------ | ------------ |
 | options | object | 配置选项 | { state,mutations,getters,actions,modules } | — |
 ```js
  import { getStore } from 'm2-vue'
  import state from './state'
  import getters from './getters'
  import mutations from './mutations'
  import actions from './actions'

  export default getStore({
    state,
    getters,
    mutations,
    actions
  })
```
