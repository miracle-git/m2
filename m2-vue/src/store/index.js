import auth from './modules/auth'
import perm from './modules/perm'

export default {
  modules: [auth, perm],
  getters: {
    perms: state => state.auth.perms,
    token: state => state.auth.token,
    accessRoutes: state => state.perm.routes
  }
}
