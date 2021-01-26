"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRouter = getRouter;
exports.mapRoute = mapRoute;
exports.mapRouteConfig = mapRouteConfig;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _m2Core = require("m2-core");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// 配置页面title
var configTitle = function configTitle(to) {
  var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _m2Core.DATA_SEPARATOR.hyphen;
  var title,
      docTitle = document.title;

  if (to.meta && to.meta.title) {
    if (docTitle.includes(delimiter)) {
      title = docTitle.substring(0, docTitle.indexOf(delimiter));
    } else {
      title = docTitle;
    }

    title += "".concat(delimiter).concat(to.meta.title);
  } else {
    title = docTitle.split(delimiter)[0];
  }

  title && (document.title = title);
}; // 配置全局路由守卫


var getGuardRouter = function getGuardRouter(router, guard, delimiter) {
  var guardConfig = {
    auth: 'auth',
    login: '/login',
    before: function before() {},
    after: function after() {}
  };

  if (_m2Core.DataType.isFunction(guard)) {
    guardConfig = _objectSpread(_objectSpread({}, guardConfig), {}, {
      before: guard
    });
  } else if (_m2Core.DataType.isObject(guard)) {
    guardConfig = _objectSpread(_objectSpread({}, guardConfig), guard);
  }

  var _guardConfig = guardConfig,
      auth = _guardConfig.auth,
      login = _guardConfig.login,
      before = _guardConfig.before,
      after = _guardConfig.after; // 当前路由配置满足以下三种情况，才会进行全局路由守卫
  // 1. meta中auth(可改为别的属性名)已被设置过(不论是true,false,...)
  // 2. 当前路由不是登录页面
  // 3. 当前路由未配置过独享守卫beforeEnter

  router.beforeEach(function (to, from, next) {
    // 动态设置每一个页面的title
    configTitle(to, delimiter);

    if ([auth] in to.meta && to.path !== login && !to.beforeEnter) {
      // 在before hook中去校验用户是否登录的逻辑
      before(to, from, next);
    } else {
      next();
    }
  });
  router.afterEach = after;
  return router;
}; // 配置默认路由


var getDefaultRouter = function getDefaultRouter(router, delimiter) {
  router.beforeEach(function (to, from, next) {
    // 动态设置每一个页面的title
    configTitle(to, delimiter);
    next();
  });
  return router;
};
/**
 * @method 获取路由配置对象
 * @param {Array} routesConfig 当前路由配置对象
 * @param {Object} options 当前扩展配置(可能包含mode,base,delimiter,guard,redirect,notmatch)
 * @returns {Object} 获取路由配置对象
 */


function getRouter(routesConfig) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  _vue["default"].use(_vueRouter["default"]);

  var mode = options.mode,
      base = options.base,
      guard = options.guard,
      delimiter = options.delimiter,
      redirect = options.redirect,
      notmatch = options.notmatch;
  redirect && routesConfig.unshift({
    path: '',
    redirect: redirect
  }); // 当所有路由都未匹配时，转到对应的页面

  var defaultRoute = notmatch || redirect;
  defaultRoute && routesConfig.push({
    path: '*',
    redirect: defaultRoute
  });
  var router = new _vueRouter["default"]({
    mode: mode || 'history',
    base: base || process.env.BASE_URL,
    routes: routesConfig
  }); // 配置全局路由守卫({guard: {auth,login,before}} 或 guard(to,from,next))

  return guard ? getGuardRouter(router, guard, delimiter) : getDefaultRouter(router, delimiter);
}
/**
 * @method 将路由表中的路由配置组件名(字符串)映射为真实的组件
 * @param {Object} route 当前的路由对象({path:'/',name:'首页',component:'home'})
 * @param {Object} routeMap 路由映射对象({'home': () => import('/views/home')})
 * @returns {Object} 获取映射后的路由
 */


function mapRoute(route, routeMap) {
  route.component = routeMap[route.component];

  if (route.children) {
    route.children = route.children.map(function (item) {
      return mapRoute(item, routeMap);
    });
  }

  return route;
}
/**
 * @method 映射路由表的路由配置项
 * @param {Array} routes 当前的路由对象([{path:'/',name:'首页',component:'home'}])
 * @param {Object} routeMap 路由映射对象({'home': () => import('/views/home')})
 * @returns {Object} 获取映射后的路由配置项
 */


function mapRouteConfig(routes, routeMap) {
  return routes.map(function (item) {
    return mapRoute(item, routeMap);
  });
}