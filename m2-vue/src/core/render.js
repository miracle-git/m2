import Vue from 'vue'
import FastClick from 'fastclick'
import moment from 'moment'
import VueCookie from 'vue-cookie'
import VueLazyLoad from 'vue-lazyload'
import { Plugin as Fragment } from 'vue-fragment'
import VueScroll from 'vuescroll'
import { DataBus, DataStorage, DataType, getEnvConfig, cacheEnvKeys, STORAGE_TYPE, APP_INSTANCE_READY } from 'm2-core'
import EventBus from './bus'
import { resetForm } from './form'
import { configDefaultTheme } from './theme'
import directives from '../directives'
import filters from '../filters'

Vue.config.productionTip = false

/**
 * @method 渲染Vue应用的根组件
 * @param {Object} rootApp 当前应用的根组件(可能是对象或组件)
 * @param {Object} options 当前扩展配置(可能包含el,init,router,store,env,http,i18n,plugins,appContent,loading,cookie,fastclick,lazy-load)
 * @returns {Object} 获取根组件的实例
 */
export function render(rootApp, options = {}) {
  if (!rootApp || (!rootApp.component && !rootApp.render)) {
    console.error('Vue根组件参数rootApp或rootApp.component尚未配置, 应用无法启动！')
    return
  }
  // 清空缓存
  Object.values(cacheEnvKeys).forEach(item => {
    DataStorage.remove(item)
    DataStorage.remove(item, STORAGE_TYPE.Session)
  })
  // 获取配置参数
  const { router, store, env, init, http, i18n = null, plugins = [], el, appContent = '', loading = false, theme = '', fastclick = true, cookie = true, lazy = false } = options
  // 为Vue实例挂载数据总线
  Vue.prototype.$bus = EventBus
  // 重置表单，formRef为表单的ref值，excludeFields为要排除重新初始化值的属性
  Vue.prototype.$reset = resetForm
  // 为Vue实例挂载moment
  Vue.prototype.$moment = moment
  // 为Vue挂载环境变量配置
  env && (Vue.prototype.$env = getEnvConfig(env))
  // 为Vue实例挂载网络请求配置
  http && DataType.isObject(http) && (http._ctx ? Vue.prototype.$http = http : Object.keys(http).forEach(item => Vue.prototype.$http = { ...Vue.prototype.$http, [item]: http[item] }))
  // 为Vue注册全局过滤器
  filters.map(item => Vue.filter(item.name, item.rule))
  // 为Vue注册全局指令
  directives.map(item => Vue.directive(item.name, item.rule(store)))
  // 解决移动端的300ms延迟问题(默认启用)
  fastclick && FastClick.attach(document.body)
  // 是否使用VueCookie(默认启用)
  cookie && Vue.use(VueCookie)
  // 启动图片懒加载(默认不启用)
  DataType.isObject(lazy) && Vue.use(VueLazyLoad, lazy)
  // 全局注册插件组件
  DataType.isArray(plugins) && (
    plugins.forEach(plugin => {
      DataType.isFunction(plugin.install) && plugin.install(Vue)
      DataType.isArray(plugin.components) && plugin.components.forEach(item => Vue.use(item))
    })
  )
  // 使用vue-fragment插件解决多根节点问题
  Vue.use(Fragment)
  // 使用vue-scroll添加自定义的滚动条
  Vue.use(VueScroll)
  Vue.prototype.$vuescrollConfig = {
    name: 'vue-scroll',
    scrollPanel: {
      scrollingX: false
    },
    bar: {
      background: 'rgba(220, 220, 220, .8)',
      size: '4px'
    }
  }
  // 配置默认的主题
  theme && configDefaultTheme(theme)
  // 在App渲染之前执行初始化
  typeof init === 'function' && init(Vue)
  // 获取vue实例配置
  const config = {
    router,
    store,
    i18n,
    plugins,
    data() {
      return {
        content: appContent,
        loading
      }
    },
    render(h) {
      return h(rootApp.component || rootApp, {
        props: {
          content: this.content,
          loading: this.loading
        }
      })
    }
  }
  // 检测el
  const vm = el ? new Vue({ ...config, el }) : new Vue(config).$mount(rootApp.root || '#app')
  // 挂载全局变量（主要是为框架内部使用）
  window.__context__ = window.__context__ || vm
  // 发送事件响应
  DataBus.emit(APP_INSTANCE_READY, window.__context__)
  return vm
}
