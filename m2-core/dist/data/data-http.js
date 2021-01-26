"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataHttp = void 0;

var _constants = require("../constants");

var _dataFetch = require("./data-fetch");

var _dataType = require("./data-type");

var _dataUtil = require("./data-util");

var _dataBus = require("./data-bus");

var _dataEnv = require("./data-env");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _http_core = {
  _parse: function _parse(res, prop) {
    if (prop in res) {
      if (_dataType.DataType.isTrueOrZero(res[prop])) {
        return {
          data: res[prop]
        };
      }
    }

    return false;
  },
  _check: function _check(res) {
    var check = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.EMPTY_FUNC;
    var map = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.EMPTY_OBJECT;
    var app = arguments.length > 3 ? arguments[3] : undefined;
    var _result = true;
    !_dataType.DataType.isEmptyFunction(check) && (_result = check(res, app));
    var _map$status = map.status,
        status = _map$status === void 0 ? 'status' : _map$status,
        _map$result = map.result,
        result = _map$result === void 0 ? 'result' : _map$result,
        _map$message = map.message,
        message = _map$message === void 0 ? 'message' : _map$message,
        _map$value = map.value,
        value = _map$value === void 0 ? 0 : _map$value,
        _map$success = map.success,
        success = _map$success === void 0 ? _constants.EMPTY_FUNC : _map$success;

    if (_result) {
      if (res.blob) {
        return {
          success: true,
          data: true
        };
      }

      var isSuccess = _dataType.DataType.isBoolean(res[status]) && res[status];

      if (isSuccess || res[status] === value || success(res)) {
        return _objectSpread({
          success: true
        }, _http_core._parse(res, result));
      }
    }

    return {
      success: false,
      data: null,
      msg: res[message]
    };
  },
  _spinner: {
    show: function show(loading, app) {
      loading && app && app.$m2 && app.$m2.loading();
    },
    hide: function hide(loading, app) {
      loading && app && app.$m2 && app.$m2.loading.hide();
    }
  },
  _handle: function _handle(res, data) {
    var handle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.EMPTY_FUNC;
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _constants.EMPTY_OBJECT;
    var app = arguments.length > 4 ? arguments[4] : undefined;
    if (options.origin) return data;
    !_dataType.DataType.isEmptyFunction(handle) && (res = handle(res, app));

    if (options.key) {
      if (_dataType.DataType.isArray(res.data)) {
        res.data.map(function (item) {
          return item._key = _dataUtil.DataUtil.randomString(options.keyLen);
        });
      } else if (_dataType.DataType.isArray(res.data[_constants.DEFAULT_FETCH_OPTIONS.itemsName])) {
        res.data[_constants.DEFAULT_FETCH_OPTIONS.itemsName].map(function (item) {
          return item._key = _dataUtil.DataUtil.randomString(options.keyLen);
        });
      }
    }

    return res.data;
  }
};
/**
 * @method 基于DataFetch网络客户端封装
 * @param {Object} {ctx,env,instance,spinner,check,handle,map,error} 当前客户端的可选参数
 * @desc {Boolean} {ctx} 是否启用应用上下文(默认false)
 * @desc {Object} {env} 当前环境配置
 * @desc {Object} {axios} 当前请求实例(可使用DataFetch构建，也可配置详细参数，参考axios配置)
 * @desc {Object} {map} 数据映射(对返回数据字段映射)
 * @desc {Function} {spinner} 当前加载器函数(覆盖默认加载器，loading当前请求是否启动加载器)
 * @desc {Function} {check} 数据校验函数(对返回数据的权限校验，app应用上下文，返回boolean)
 * @desc {Function} {handle} 数据处理函数(对返回数据的处理函数, 返回处理结果)
 * @desc {Function} {error} 全局错误处理函数(err是包含title,message的对象)
 */

var DataHttpObject = /*#__PURE__*/function () {
  function DataHttpObject(_ref) {
    var _this2 = this;

    var ctx = _ref.ctx,
        env = _ref.env,
        axios = _ref.axios,
        map = _ref.map,
        spinner = _ref.spinner,
        check = _ref.check,
        handle = _ref.handle,
        error = _ref.error;

    _classCallCheck(this, DataHttpObject);

    _defineProperty(this, "get", function (url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _this2._fetch(url, options);
    });

    _defineProperty(this, "post", function (url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _this2._fetch(url, _objectSpread(_objectSpread({}, options), {}, {
        method: _constants.REQUEST_METHOD.POST
      }));
    });

    _defineProperty(this, "put", function (url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _this2._fetch(url, _objectSpread(_objectSpread({}, options), {}, {
        method: _constants.REQUEST_METHOD.PUT
      }));
    });

    _defineProperty(this, "patch", function (url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _this2._fetch(url, _objectSpread(_objectSpread({}, options), {}, {
        method: _constants.REQUEST_METHOD.PATCH
      }));
    });

    _defineProperty(this, "del", function (url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _this2._fetch(url, _objectSpread(_objectSpread({}, options), {}, {
        method: _constants.REQUEST_METHOD.DELETE
      }));
    });

    _defineProperty(this, "all", function () {
      for (var _len = arguments.length, options = new Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      return _this2._fetchAll(options);
    });

    _defineProperty(this, "proxyGet", function (url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _this2._fetch(url, _objectSpread(_objectSpread({}, options), {}, {
        proxy: true
      }));
    });

    _defineProperty(this, "proxyPost", function (url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _this2._fetch(url, _objectSpread(_objectSpread({}, options), {}, {
        proxy: true,
        method: _constants.REQUEST_METHOD.POST
      }));
    });

    _defineProperty(this, "proxyPut", function (url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _this2._fetch(url, _objectSpread(_objectSpread({}, options), {}, {
        proxy: true,
        method: _constants.REQUEST_METHOD.PUT
      }));
    });

    _defineProperty(this, "proxyPatch", function (url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _this2._fetch(url, _objectSpread(_objectSpread({}, options), {}, {
        proxy: true,
        method: _constants.REQUEST_METHOD.PATCH
      }));
    });

    _defineProperty(this, "proxyDel", function (url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _this2._fetch(url, _objectSpread(_objectSpread({}, options), {}, {
        proxy: true,
        method: _constants.REQUEST_METHOD.DELETE
      }));
    });

    _defineProperty(this, "proxyAll", function () {
      for (var _len2 = arguments.length, options = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        options[_key2] = arguments[_key2];
      }

      return _this2._fetchAll(options.map(function (item) {
        return _objectSpread(_objectSpread({}, item), {}, {
          config: _objectSpread(_objectSpread({}, item.config), {}, {
            proxy: true
          })
        });
      }));
    });

    _defineProperty(this, "proxy", {
      get: this.proxyGet,
      post: this.proxyPost,
      put: this.proxyPut,
      patch: this.proxyPatch,
      del: this.proxyDel,
      all: this.proxyAll
    });

    this._ctx = ctx;
    this._env = env;
    this._axios = axios || _dataFetch.DataFetch.create();
    this._map = map;
    this._spinner = spinner;
    this._check = check;
    this._handle = handle;
    this._error = error;
  } // 私有方法


  _createClass(DataHttpObject, [{
    key: "_fetch",
    value: function _fetch(url, options) {
      var _this3 = this;

      var _this = this;

      return new Promise(function (resolve, reject) {
        var loadData = function loadData(app) {
          var _spinner = _this._spinner || _http_core._spinner;

          _spinner.show(options.loading, app);

          return _dataFetch.DataFetch.axios(url, _objectSpread(_objectSpread({}, options), {}, {
            env: _this._env,
            // apiKey: 'app', // 当存在多个api接口时，配置默认的apiKey(大多数场景使用的api服务)
            instance: _this._axios
          })).then(function (res) {
            var _res = res;
            res = _http_core._check(res, _this._check, _this._map, app);

            if (res.success) {
              resolve(_http_core._handle(res, _res, _this._handle, options, app));
            } else {
              var _error = options.origin ? _res : {
                title: "\u63A5\u53E3:[".concat(url, "]\u8C03\u7528\u5931\u8D25"),
                message: res.msg
              };

              !_dataType.DataType.isEmptyFunction(_this._error) && _this._error(_error, app);
              reject(_error);
            }
          })["catch"](function (err) {
            var _error = options.origin ? err : {
              title: "\u63A5\u53E3:[".concat(url, "]\u8C03\u7528\u5F02\u5E38"),
              message: err.msg || err
            };

            !_dataType.DataType.isEmptyFunction(_this._error) && _this._error(_error, app);
            reject(_error);
          })["finally"](function () {
            _spinner.hide(options.loading, app);
          });
        };

        if (_this3._ctx) {
          if (window.__context__) {
            loadData(window.__context__);
          } else {
            _dataBus.DataBus.on(_constants.APP_INSTANCE_READY, loadData);
          }
        } else {
          loadData();
        }
      });
    }
  }, {
    key: "_fetchAll",
    value: function _fetchAll() {
      var _this4 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.EMPTY_ARRAY;
      if (_dataType.DataType.isEmptyArray(options)) return;

      var _this = this;

      var loading = options.some(function (opt) {
        return opt && opt.config && opt.config.loading;
      });
      return new Promise(function (resolve, reject) {
        var loadData = function loadData(app) {
          var _spinner = _this._spinner || _http_core._spinner;

          _spinner.show(options.loading, app);

          options.forEach(function (opt) {
            return opt.config = _objectSpread(_objectSpread({}, opt.config), {}, {
              env: _this._env,
              instance: _this._axios
            });
          });
          return _dataFetch.DataFetch.all(options).then(function (res) {
            resolve(res.map(function (data, index) {
              var _data = data;
              data = _http_core._check(data, _this._check, _this._map, app);
              return _http_core._handle(data, _data, _this._handle, options[index].config, app);
            }));
          })["catch"](function (err) {
            var _error = {
              title: "\u63A5\u53E3\u8C03\u7528\u5F02\u5E38",
              message: err.msg || err
            };
            !_dataType.DataType.isEmptyFunction(_this._error) && _this._error(_error, app);
            reject(_error);
          })["finally"](function () {
            _spinner.hide(loading, app);
          });
        };

        if (_this4._ctx) {
          if (window.__context__) {
            loadData(window.__context__);
          } else {
            _dataBus.DataBus.on(_constants.APP_INSTANCE_READY, loadData);
          }
        } else {
          loadData();
        }
      });
    } // 通用请求客户端封装

  }]);

  return DataHttpObject;
}(); // 构建单一模式的DataHttp


var DataHttp = {
  getInstance: function () {
    var instance;
    return function () {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.EMPTY_OBJECT,
          _ref2$multi = _ref2.multi,
          multi = _ref2$multi === void 0 ? false : _ref2$multi,
          ctx = _ref2.ctx,
          env = _ref2.env,
          axios = _ref2.axios,
          spinner = _ref2.spinner,
          check = _ref2.check,
          handle = _ref2.handle,
          map = _ref2.map,
          error = _ref2.error;

      if (multi || !instance) {
        instance = new DataHttpObject({
          ctx: ctx,
          env: env,
          axios: axios,
          spinner: spinner,
          check: check,
          handle: handle,
          map: map,
          error: error
        });
      }

      return instance;
    };
  }(),
  create: _dataFetch.DataFetch.create
};
exports.DataHttp = DataHttp;