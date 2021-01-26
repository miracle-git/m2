const $cookie = window.__context__ ? window.__context__.$cookie : {}
const $cookieTokenKey = 'm2-app-token'
/**
 * 根据路由meta.perms确定是否当前用户拥有访问权限
 * @perms 用户拥有权限点
 * @route 待判定路由
 */
const hasPermission = (perms, route) => {
  // 如果当前路由有perms字段则需判断用户访问权限
  if (route.meta && route.meta.perms) {
    // 若用户拥有的权限点中有被包含在待判定路由权限点中的则拥有访问权
    return perms.some(item => route.meta.perms.includes(item))
  } else {
    // 没有设置roles则无需判定即可访问
    return true
  }
}

// 获取Token
export function getToken() {
  $cookie.get($cookieTokenKey)
}
// 设置Token(默认1个月过期)
export function setToken(value, expires = '1M') {
  $cookie.set($cookieTokenKey, value, { expires })
}
// 删除Token
export function removeToken() {
  $cookie.delete($cookieTokenKey)
}
/**
 * 递归过滤AsyncRoutes路由表
 * @routes 待过滤路由表，首次传入的就是AsyncRoutes
 * @roles 用户拥有权限点
 */
export function filterAsyncRoutes(routes, perms) {
  const result = []
  routes.forEach(item => {
    // 复制一份
    const $route = { ...item }
    // 如果用户有访问权则加入结果路由表
    if (hasPermission(perms, $route)) {
      // 如果存在子路由则递归过滤之
      if ($route.children) {
        $route.children = filterAsyncRoutes($route.children, perms)
      }
      result.push($route)
    }
  })
  return result
}
