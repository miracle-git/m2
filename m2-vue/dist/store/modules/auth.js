"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _types = require("./types");

var _utils = require("../utils");

var _mutations;

var state = {
  token: (0, _utils.getToken)(),
  perms: []
};
var mutations = (_mutations = {}, (0, _defineProperty2["default"])(_mutations, _types.auth.SAVE_AUTH_TOKEN, function (state, payload) {
  state.token = payload;
}), (0, _defineProperty2["default"])(_mutations, _types.auth.SAVE_AUTH_PERMS, function (state, payload) {
  state.perms = payload;
}), _mutations);
var actions = {
  // 用户登录之后 auth/saveToken
  saveToken: function saveToken(_ref, payload) {
    var commit = _ref.commit;
    // 调用并处理结果，错误处理已拦截无需处理
    return new Promise(function (resolve) {
      commit(_types.auth.SAVE_AUTH_TOKEN, payload);
      (0, _utils.setToken)(payload);
      resolve();
    });
  },
  // 获取用户权限点等信息 auth/savePerms
  savePerms: function savePerms(_ref2, payload) {
    var commit = _ref2.commit;
    return new Promise(function (resolve) {
      commit(_types.auth.SAVE_AUTH_PERMS, payload);
      resolve({
        perms: payload
      });
    });
  },
  // 重置令牌 auth/savePerms
  resetToken: function resetToken(_ref3) {
    var commit = _ref3.commit;
    return new Promise(function (resolve) {
      commit(_types.auth.SAVE_AUTH_TOKEN, '');
      commit(_types.auth.SAVE_AUTH_PERMS, []);
      (0, _utils.removeToken)();
      resolve();
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