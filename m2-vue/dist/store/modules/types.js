"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.perm = exports.auth = void 0;
// 按照模块来配置type
var auth = {
  SAVE_AUTH_TOKEN: 'SAVE_AUTH_TOKEN',
  SAVE_AUTH_PERMS: 'SAVE_AUTH_PERMS'
};
exports.auth = auth;
var perm = {
  SAVE_ACCESS_ROUTES: 'SAVE_ACCESS_ROUTES'
};
exports.perm = perm;