import { auth } from './types'
import { getToken, setToken, removeToken } from '../utils'

const state = {
  token: getToken(),
  perms: []
}

const mutations = {
  [auth.SAVE_AUTH_TOKEN](state, payload) {
    state.token = payload
  },
  [auth.SAVE_AUTH_PERMS](state, payload) {
    state.perms = payload
  }
}

const actions = {
  // 用户登录之后 auth/saveToken
  saveToken({ commit }, payload) {
    // 调用并处理结果，错误处理已拦截无需处理
    return new Promise(resolve => {
      commit(auth.SAVE_AUTH_TOKEN, payload)
      setToken(payload)
      resolve()
    })
  },
  // 获取用户权限点等信息 auth/savePerms
  savePerms({ commit }, payload) {
    return new Promise(resolve => {
      commit(auth.SAVE_AUTH_PERMS, payload)
      resolve({ perms: payload })
    })
  },
  // 重置令牌 auth/savePerms
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit(auth.SAVE_AUTH_TOKEN, '')
      commit(auth.SAVE_AUTH_PERMS, [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaces: true,
  state,
  mutations,
  actions
}
