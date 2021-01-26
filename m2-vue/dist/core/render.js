"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _vue = _interopRequireDefault(require("vue"));

var _fastclick = _interopRequireDefault(require("fastclick"));

var _moment = _interopRequireDefault(require("moment"));

var _vueCookie = _interopRequireDefault(require("vue-cookie"));

var _vueLazyload = _interopRequireDefault(require("vue-lazyload"));

var _vueFragment = require("vue-fragment");

var _vuescroll = _interopRequireDefault(require("vuescroll"));

var _m2Core = require("m2-core");

var _bus = _interopRequireDefault(require("./bus"));

var _form = require("./form");

var _theme = require("./theme");

var _directives = _interopRequireDefault(require("../directives"));

var _filters = _interopRequireDefault(require("../filters"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

_vue["default"].config.productionTip = false;
/**
 * @method 渲染Vue应用的根组件
 * @param {Object} rootApp 当前应用的根组件(可能是对象或组件)
 * @param {Object} options 当前扩展配置(可能包含el,init,router,store,env,i18n,plugins,appContent,loading,cookie,fastclick,lazy-load)
 * @returns {Object} 获取根组件的实例
 */

function render(rootApp) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!rootApp || !rootApp.component && !rootApp.render) {
    console.error('Vue根组件参数rootApp或rootApp.component尚未配置, 应用无法启动！');
    return;
  } // 清空缓存


  Object.values(_m2Core.cacheEnvKeys).forEach(function (item) {
    _m2Core.DataStorage.remove(item);

    _m2Core.DataStorage.remove(item, _m2Core.STORAGE_TYPE.Session);
  }); // 获取配置参数

  var router = options.router,
      store = options.store,
      env = options.env,
      init = options.init,
      _options$i18n = options.i18n,
      i18n = _options$i18n === void 0 ? null : _options$i18n,
      _options$plugins = options.plugins,
      plugins = _options$plugins === void 0 ? [] : _options$plugins,
      el = options.el,
      _options$appContent = options.appContent,
      appContent = _options$appContent === void 0 ? '' : _options$appContent,
      _options$loading = options.loading,
      loading = _options$loading === void 0 ? false : _options$loading,
      _options$theme = options.theme,
      theme = _options$theme === void 0 ? '' : _options$theme,
      _options$fastclick = options.fastclick,
      fastclick = _options$fastclick === void 0 ? true : _options$fastclick,
      _options$cookie = options.cookie,
      cookie = _options$cookie === void 0 ? true : _options$cookie,
      _options$lazy = options.lazy,
      lazy = _options$lazy === void 0 ? false : _options$lazy; // 为Vue实例挂载数据总线

  _vue["default"].prototype.$bus = _bus["default"]; // 重置表单，formRef为表单的ref值，excludeFields为要排除重新初始化值的属性

  _vue["default"].prototype.$reset = _form.resetForm; // 为Vue实例挂载moment

  _vue["default"].prototype.$moment = _moment["default"]; // 为Vue挂载环境变量配置

  env && (_vue["default"].prototype.$env = (0, _m2Core.getEnvConfig)(env)); // 为Vue注册全局过滤器

  _filters["default"].map(function (item) {
    return _vue["default"].filter(item.name, item.rule);
  }); // 为Vue注册全局指令


  _directives["default"].map(function (item) {
    return _vue["default"].directive(item.name, item.rule(store));
  }); // 解决移动端的300ms延迟问题(默认启用)


  fastclick && _fastclick["default"].attach(document.body); // 是否使用VueCookie(默认启用)

  cookie && _vue["default"].use(_vueCookie["default"]); // 启动图片懒加载(默认不启用)

  _m2Core.DataType.isObject(lazy) && _vue["default"].use(_vueLazyload["default"], lazy); // 全局注册插件组件

  _m2Core.DataType.isArray(plugins) && plugins.forEach(function (plugin) {
    _m2Core.DataType.isFunction(plugin.install) && plugin.install(_vue["default"]);
    _m2Core.DataType.isArray(plugin.components) && plugin.components.forEach(function (item) {
      return _vue["default"].use(item);
    });
  }); // 使用vue-fragment插件解决多根节点问题

  _vue["default"].use(_vueFragment.Plugin); // 使用vue-scroll添加自定义的滚动条


  _vue["default"].use(_vuescroll["default"]);

  _vue["default"].prototype.$vuescrollConfig = {
    name: 'vue-scroll',
    scrollPanel: {
      scrollingX: false
    },
    bar: {
      background: 'rgba(220, 220, 220, .8)',
      size: '4px'
    }
  }; // 配置默认的主题

  theme && (0, _theme.configDefaultTheme)(theme); // 在App渲染之前执行初始化

  typeof init === 'function' && init(_vue["default"]); // 获取vue实例配置

  var config = {
    router: router,
    store: store,
    i18n: i18n,
    plugins: plugins,
    data: function data() {
      return {
        content: appContent,
        loading: loading
      };
    },
    render: function render(h) {
      return h(rootApp.component || rootApp, {
        props: {
          content: this.content,
          loading: this.loading
        }
      });
    }
  }; // 检测el

  var vm = el ? new _vue["default"](_objectSpread(_objectSpread({}, config), {}, {
    el: el
  })) : new _vue["default"](config).$mount(rootApp.root || '#app'); // 挂载全局变量（主要是为框架内部使用）

  window.__context__ = window.__context__ || vm; // 发送事件响应

  _m2Core.DataBus.emit(_m2Core.APP_INSTANCE_READY, window.__context__);

  return vm;
}