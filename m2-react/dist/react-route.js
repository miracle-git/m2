"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getParam = exports.getRouteQueryParam = exports.getRouteParam = exports.createHistory = exports.renderRoutes = exports.loadLayoutRoutesConfig = exports.loadRoutesConfig = void 0;

var _react = _interopRequireDefault(require("react"));

var _history = require("history");

var _reactRouterDom = require("react-router-dom");

var _m2Core = require("m2-core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var loadRoutesConfig = function loadRoutesConfig(rootApp, childRoutes) {
  var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '/';

  if (!rootApp) {
    console.error('React根组件参数rootApp尚未配置, 应用无法启动！');
    return;
  }

  var routes = [{
    path: context,
    component: rootApp,
    children: childRoutes
  }].filter(function (item) {
    return item.children && item.children.length > 0;
  });

  var handleDefaultRoute = function handleDefaultRoute(route) {
    var childRoutes = route.children;

    if (!route.extra && childRoutes && childRoutes.length > 0) {
      var defaultRoute = childRoutes.find(function (child) {
        return child["default"] || child.isDefault;
      });

      if (defaultRoute) {
        var first = _objectSpread({}, defaultRoute);

        first.path = route.path;
        first.exact = true;
        first.autoDefaultRoute = true; // mark it so that the simple nav won't show it.

        route.children.unshift(first);
      }

      route.children.forEach(handleDefaultRoute);
    }
  };

  routes.forEach(handleDefaultRoute);
  return routes;
};

exports.loadRoutesConfig = loadRoutesConfig;

var loadLayoutRoutesConfig = function loadLayoutRoutesConfig(layouts, childRoutes) {
  if (_m2Core.DataType.isEmptyArray(layouts)) {
    console.error('React布局参数layouts尚未配置, 应用无法启动！');
    return;
  } // 根据布局对路由配置进行分类


  var routes = [];

  var _filterRoutes = function _filterRoutes(routes, layout) {
    var result = [];
    routes.forEach(function (route) {
      var _routes = _m2Core.DataType.isArray(route) ? route : [route];

      var _item = _routes.find(function (item) {
        return item.layout === layout.name || layout["default"] && !item.layout;
      });

      if (_item) {
        result.push(_item);
      }
    });
    return result;
  };

  var _getRoutePrefix = function _getRoutePrefix(layout) {
    if (layout.prefix) return layout.prefix;
    return layout["default"] ? '/' : '/' + layout.name;
  };

  layouts.forEach(function (item) {
    routes = [].concat(_toConsumableArray(routes), _toConsumableArray(loadRoutesConfig(item.layout, _filterRoutes(childRoutes, item), _getRoutePrefix(item))));
  });
  return routes;
};

exports.loadLayoutRoutesConfig = loadLayoutRoutesConfig;

var renderRoutes = function renderRoutes(routesConfig, contextPath) {
  var configOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _configOptions$routeT = configOptions.routeType,
      routeType = _configOptions$routeT === void 0 ? 'hash' : _configOptions$routeT,
      _configOptions$authen = configOptions.authenticated,
      authenticated = _configOptions$authen === void 0 ? false : _configOptions$authen,
      _configOptions$redire = configOptions.redirectUrl,
      redirectUrl = _configOptions$redire === void 0 ? '' : _configOptions$redire,
      _configOptions$redire2 = configOptions.redirect404,
      redirect404 = _configOptions$redire2 === void 0 ? '' : _configOptions$redire2; // Resolve route config object

  var children = [];

  var renderRouteItem = function renderRouteItem(item, routeContextPath) {
    var main = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (redirectUrl && !main) {
      if (!item["public"] && !authenticated) {
        item = _objectSpread({}, item, {
          component: function component() {
            return _react["default"].createElement(_reactRouterDom.Redirect, {
              to: redirectUrl
            });
          },
          children: null
        });
      }
    }

    var newContextPath;

    if (/^\//.test(item.path)) {
      newContextPath = item.path;
    } else {
      newContextPath = "".concat(routeContextPath, "/").concat(item.path || '');
    }

    newContextPath = newContextPath.replace(/\/+/g, '/');

    if (item.component && item.children) {
      var childRoutes = renderRoutes(item.children, newContextPath, configOptions);
      children.push(_react["default"].createElement(_reactRouterDom.Route, {
        key: newContextPath,
        render: function render(props) {
          return _react["default"].createElement(item.component, props, childRoutes);
        },
        path: newContextPath
      }));
    } else if (item.component) {
      children.push(_react["default"].createElement(_reactRouterDom.Route, {
        key: newContextPath,
        component: item.component,
        path: newContextPath,
        exact: true
      }));
    } else if (item.children) {
      item.children.forEach(function (child) {
        return renderRouteItem(child, newContextPath);
      });
    }
  };

  routesConfig.forEach(function (item) {
    return renderRouteItem(item, contextPath, true);
  }); // Add not matched page (404)

  if (redirect404) {
    if (authenticated) {
      children.push(_react["default"].createElement(_reactRouterDom.Route, {
        key: "/not-match",
        component: function component() {
          return _react["default"].createElement(_reactRouterDom.Redirect, {
            to: redirect404
          });
        }
      }));
    }
  } // Use Switch so that only the first matched route is rendered.


  return routeType === 'hash' ? _react["default"].createElement(_reactRouterDom.HashRouter, null, _react["default"].createElement(_reactRouterDom.Switch, null, children)) : _react["default"].createElement(_reactRouterDom.BrowserRouter, null, _react["default"].createElement(_reactRouterDom.Switch, null, children));
};

exports.renderRoutes = renderRoutes;

var createHistory = function createHistory() {
  var routeType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'hash';
  routeType = routeType.toLowerCase();

  if (routeType === 'browser') {
    return (0, _history.createBrowserHistory)();
  } else if (routeType === 'memory') {
    return (0, _history.createMemoryHistory)();
  } else {
    return (0, _history.createHashHistory)();
  }
};

exports.createHistory = createHistory;

var getRouteParam = function getRouteParam(name, props) {
  if (name && props && props.match) {
    return props.match.params[name];
  }

  return '';
};

exports.getRouteParam = getRouteParam;

var getRouteQueryParam = function getRouteQueryParam(name, props) {
  if (name && props && props.location) {
    return _m2Core.UrlUtil.getQueryValue(name, props.location.search);
  }

  return '';
};

exports.getRouteQueryParam = getRouteQueryParam;

var getParam = function getParam(name, props) {
  var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return query ? getRouteQueryParam(name, props) : getRouteParam(name, props);
};

exports.getParam = getParam;