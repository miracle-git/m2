// 路由守卫（控制权限）
import { IsDev } from 'm2-core'
import { getToken } from '../store/utils'

export function authenticate(router, store, {
  loginPath = '/login',
  homePath = '/',
  returnUrlQs = 'redirect',
  whiteList = ['/login'],
  getPerms // 动态获取权限点(来自应用服务端)
} = {}) {
  router.beforeEach(async(to, from, next) => {
    // 获取令牌判断用户是否登录
    const hasToken = getToken()
    // 有令牌说明已登录
    if (hasToken) {
      if (to.path === loginPath) {
        // 若已登录重定向至首页
        next({ path: homePath })
      } else {
        // 若用户权限点已附加则说明动态路由已添加
        const hasPerms = store.getters.perms && store.getters.perms.length > 0
        if (hasPerms) {
          next() // 继续即可
        } else {
          try {
            // 先请求获取用户信息
            if (!getPerms instanceof Promise) {
              IsDev && console.warn('getPerm参数必须是一个Promise对象')
              return
            }
            const { perms } = await getPerms
            // 根据当前用户角色动态生成路由
            const accessRoutes = await store.dispatch('perm/generateRoutes', perms)
            // 添加这些路由至路由器
            router.addRoutes(accessRoutes)
            // 继续路由切换，确保addRoutes完成
            next({ ...to, replace: true })
          } catch (e) {
            // 出错需重置令牌并重新登录（令牌过期、网络错误等原因）
            await store.dispatch('user/resetToken')
            IsDev && console.warn(`请求权限时出现异常：${error}`)
            next(`${loginPath}?${returnUrlQs}=${to.path}`)
          }
        }
      }
    } else {
      // 用户无令牌
      if (whiteList.indexOf(to.path) !== -1) {
        // 白名单路由放过
        next()
      } else {
        next(`${loginPath}?${returnUrlQs}=${to.path}`)
      }
    }
  })
}
