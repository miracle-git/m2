"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _auth = _interopRequireDefault(require("./modules/auth"));

var _perm = _interopRequireDefault(require("./modules/perm"));

var _default = {
  modules: [_auth["default"], _perm["default"]],
  getters: {
    perms: function perms(state) {
      return state.auth.perms;
    },
    token: function token(state) {
      return state.auth.token;
    },
    accessRoutes: function accessRoutes(state) {
      return state.perm.routes;
    }
  }
};
exports["default"] = _default;