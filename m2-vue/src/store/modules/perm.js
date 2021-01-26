import { perm } from './types'
import { filterAsyncRoutes } from '../utils'

const state = {
  routes: [], // 完整路由表
  accessRoutes: [] // 可访问路由表
}

const mutations = {
  [perm.SAVE_ACCESS_ROUTES](state, payload) {
    const { constRoutes, accessRoutes } = payload
    // accessRoutes是用户可以访问的权限页面
    state.accessRoutes = accessRoutes
    // routes是完整的路由表
    state.routes = constRoutes.concat(accessRoutes)
  }
}

const actions = {
  // 动态路由生成：在得到用户权限点后会第一时间调用
  generateRoutes({ commit }, payload) {
    const { admin, perms, asyncRoutes } = payload
    return new Promise(resolve => {
      let accessRoutes
      // 用户是管理员则拥有完整访问权限
      if (perms.includes(admin)) {
        accessRoutes = asyncRoutes || []
      } else {
        // 否则需要根据权限点做过滤处理
        accessRoutes = filterAsyncRoutes(asyncRoutes, perms)
      }
      commit(perm.SAVE_ACCESS_ROUTES, accessRoutes)
      resolve(accessRoutes)
    })
  }
}

export default {
  namespaces: true,
  state,
  mutations,
  actions
}
