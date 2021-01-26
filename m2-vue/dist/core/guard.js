"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticate = authenticate;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _m2Core = require("m2-core");

var _utils = require("../store/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function authenticate(router, store) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$loginPath = _ref.loginPath,
      loginPath = _ref$loginPath === void 0 ? '/login' : _ref$loginPath,
      _ref$homePath = _ref.homePath,
      homePath = _ref$homePath === void 0 ? '/' : _ref$homePath,
      _ref$returnUrlQs = _ref.returnUrlQs,
      returnUrlQs = _ref$returnUrlQs === void 0 ? 'redirect' : _ref$returnUrlQs,
      _ref$whiteList = _ref.whiteList,
      whiteList = _ref$whiteList === void 0 ? ['/login'] : _ref$whiteList,
      getPerms = _ref.getPerms;

  router.beforeEach( /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(to, from, next) {
      var hasToken, hasPerms, _yield$getPerms, perms, accessRoutes;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // 获取令牌判断用户是否登录
              hasToken = (0, _utils.getToken)(); // 有令牌说明已登录

              if (!hasToken) {
                _context.next = 34;
                break;
              }

              if (!(to.path === loginPath)) {
                _context.next = 6;
                break;
              }

              // 若已登录重定向至首页
              next({
                path: homePath
              });
              _context.next = 32;
              break;

            case 6:
              // 若用户权限点已附加则说明动态路由已添加
              hasPerms = store.getters.perms && store.getters.perms.length > 0;

              if (!hasPerms) {
                _context.next = 11;
                break;
              }

              next(); // 继续即可

              _context.next = 32;
              break;

            case 11:
              _context.prev = 11;

              if (!(!getPerms instanceof Promise)) {
                _context.next = 15;
                break;
              }

              _m2Core.IsDev && console.warn('getPerm参数必须是一个Promise对象');
              return _context.abrupt("return");

            case 15:
              _context.next = 17;
              return getPerms;

            case 17:
              _yield$getPerms = _context.sent;
              perms = _yield$getPerms.perms;
              _context.next = 21;
              return store.dispatch('perm/generateRoutes', perms);

            case 21:
              accessRoutes = _context.sent;
              // 添加这些路由至路由器
              router.addRoutes(accessRoutes); // 继续路由切换，确保addRoutes完成

              next(_objectSpread(_objectSpread({}, to), {}, {
                replace: true
              }));
              _context.next = 32;
              break;

            case 26:
              _context.prev = 26;
              _context.t0 = _context["catch"](11);
              _context.next = 30;
              return store.dispatch('user/resetToken');

            case 30:
              _m2Core.IsDev && console.warn("\u8BF7\u6C42\u6743\u9650\u65F6\u51FA\u73B0\u5F02\u5E38\uFF1A".concat(error));
              next("".concat(loginPath, "?").concat(returnUrlQs, "=").concat(to.path));

            case 32:
              _context.next = 35;
              break;

            case 34:
              // 用户无令牌
              if (whiteList.indexOf(to.path) !== -1) {
                // 白名单路由放过
                next();
              } else {
                next("".concat(loginPath, "?").concat(returnUrlQs, "=").concat(to.path));
              }

            case 35:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[11, 26]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }());
}