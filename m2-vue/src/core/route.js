import Vue from 'vue'
import VueRouter from 'vue-router'
import { DataType, DATA_SEPARATOR } from 'm2-core'

// 配置页面title
const configTitle = (to, delimiter = DATA_SEPARATOR.hyphen) => {
  let title, docTitle = document.title
  if (to.meta && to.meta.title) {
    if (docTitle.includes(delimiter)) {
      title = docTitle.substring(0, docTitle.indexOf(delimiter))
    } else {
      title = docTitle
    }
    title += `${delimiter}${to.meta.title}`
  } else {
    title = docTitle.split(delimiter)[0]
  }
  title && (document.title = title)
}

// 配置全局路由守卫
const getGuardRouter = (router, guard, delimiter) => {
  let guardConfig = { auth: 'auth', login: '/login', before: () => {}, after: () => {} }
  if (DataType.isFunction(guard)) {
    guardConfig = { ...guardConfig, before: guard }
  } else if (DataType.isObject(guard)) {
    guardConfig = { ...guardConfig, ...guard }
  }

  const { auth, login, before, after } = guardConfig
  // 当前路由配置满足以下三种情况，才会进行全局路由守卫
  // 1. meta中auth(可改为别的属性名)已被设置过(不论是true,false,...)
  // 2. 当前路由不是登录页面
  // 3. 当前路由未配置过独享守卫beforeEnter
  router.beforeEach((to, from, next) => {
    // 动态设置每一个页面的title
    configTitle(to, delimiter)
    if (([auth] in to.meta) && to.path !== login && !to.beforeEnter) {
      // 在before hook中去校验用户是否登录的逻辑
      before(to, from, next)
    } else {
      next()
    }
  })

  router.afterEach = after
  return router
}

// 配置默认路由
const getDefaultRouter = (router, delimiter) => {
  router.beforeEach((to, from, next) => {
    // 动态设置每一个页面的title
    configTitle(to, delimiter)
    next()
  })
  return router
}

/**
 * @method 获取路由配置对象
 * @param {Array} routesConfig 当前路由配置对象
 * @param {Object} options 当前扩展配置(可能包含mode,base,delimiter,guard,redirect,notmatch)
 * @returns {Object} 获取路由配置对象
 */
export function getRouter(routesConfig, options = {}) {
  Vue.use(VueRouter)

  const { mode, base, guard, delimiter, redirect, notmatch } = options
  redirect && routesConfig.unshift({ path: '', redirect })
  // 当所有路由都未匹配时，转到对应的页面
  const defaultRoute = notmatch || redirect
  defaultRoute && routesConfig.push({ path: '*', redirect: defaultRoute })

  const router = new VueRouter({
    mode: mode || 'history',
    base: base || process.env.BASE_URL,
    routes: routesConfig
  })

  // 配置全局路由守卫({guard: {auth,login,before}} 或 guard(to,from,next))
  return guard ? getGuardRouter(router, guard, delimiter) : getDefaultRouter(router, delimiter)
}

/**
 * @method 将路由表中的路由配置组件名(字符串)映射为真实的组件
 * @param {Object} route 当前的路由对象({path:'/',name:'首页',component:'home'})
 * @param {Object} routeMap 路由映射对象({'home': () => import('/views/home')})
 * @returns {Object} 获取映射后的路由
 */
export function mapRoute(route, routeMap) {
  route.component = routeMap[route.component]
  if (route.children) {
    route.children = route.children.map(item => mapRoute(item, routeMap))
  }
  return route
}

/**
 * @method 映射路由表的路由配置项
 * @param {Array} routes 当前的路由对象([{path:'/',name:'首页',component:'home'}])
 * @param {Object} routeMap 路由映射对象({'home': () => import('/views/home')})
 * @returns {Object} 获取映射后的路由配置项
 */
export function mapRouteConfig(routes, routeMap) {
  return routes.map(item => mapRoute(item, routeMap))
}
