"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _types = require("./types");

var _utils = require("../utils");

var state = {
  routes: [],
  // 完整路由表
  accessRoutes: [] // 可访问路由表

};
var mutations = (0, _defineProperty2["default"])({}, _types.perm.SAVE_ACCESS_ROUTES, function (state, payload) {
  var constRoutes = payload.constRoutes,
      accessRoutes = payload.accessRoutes; // accessRoutes是用户可以访问的权限页面

  state.accessRoutes = accessRoutes; // routes是完整的路由表

  state.routes = constRoutes.concat(accessRoutes);
});
var actions = {
  // 动态路由生成：在得到用户权限点后会第一时间调用
  generateRoutes: function generateRoutes(_ref, payload) {
    var commit = _ref.commit;
    var admin = payload.admin,
        perms = payload.perms,
        asyncRoutes = payload.asyncRoutes;
    return new Promise(function (resolve) {
      var accessRoutes; // 用户是管理员则拥有完整访问权限

      if (perms.includes(admin)) {
        accessRoutes = asyncRoutes || [];
      } else {
        // 否则需要根据权限点做过滤处理
        accessRoutes = (0, _utils.filterAsyncRoutes)(asyncRoutes, perms);
      }

      commit(_types.perm.SAVE_ACCESS_ROUTES, accessRoutes);
      resolve(accessRoutes);
    });
  }
};
var _default = {
  namespaces: true,
  state: state,
  mutations: mutations,
  actions: actions
};
exports["default"] = _default;