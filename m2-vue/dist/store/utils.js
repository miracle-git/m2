"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToken = getToken;
exports.setToken = setToken;
exports.removeToken = removeToken;
exports.filterAsyncRoutes = filterAsyncRoutes;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var $cookie = window.__context__ ? window.__context__.$cookie : {};
var $cookieTokenKey = 'm2-app-token';
/**
 * 根据路由meta.perms确定是否当前用户拥有访问权限
 * @perms 用户拥有权限点
 * @route 待判定路由
 */

var hasPermission = function hasPermission(perms, route) {
  // 如果当前路由有perms字段则需判断用户访问权限
  if (route.meta && route.meta.perms) {
    // 若用户拥有的权限点中有被包含在待判定路由权限点中的则拥有访问权
    return perms.some(function (item) {
      return route.meta.perms.includes(item);
    });
  } else {
    // 没有设置roles则无需判定即可访问
    return true;
  }
}; // 获取Token


function getToken() {
  $cookie.get($cookieTokenKey);
} // 设置Token(默认1个月过期)


function setToken(value) {
  var expires = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '1M';
  $cookie.set($cookieTokenKey, value, {
    expires: expires
  });
} // 删除Token


function removeToken() {
  $cookie["delete"]($cookieTokenKey);
}
/**
 * 递归过滤AsyncRoutes路由表
 * @routes 待过滤路由表，首次传入的就是AsyncRoutes
 * @roles 用户拥有权限点
 */


function filterAsyncRoutes(routes, perms) {
  var result = [];
  routes.forEach(function (item) {
    // 复制一份
    var $route = _objectSpread({}, item); // 如果用户有访问权则加入结果路由表


    if (hasPermission(perms, $route)) {
      // 如果存在子路由则递归过滤之
      if ($route.children) {
        $route.children = filterAsyncRoutes($route.children, perms);
      }

      result.push($route);
    }
  });
  return result;
}