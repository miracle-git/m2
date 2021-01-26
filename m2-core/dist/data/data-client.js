"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataClient = void 0;

var _constants = require("../constants");

var _dataFetch = require("./data-fetch");

var _dataType = require("./data-type");

var _dataUtil = require("./data-util");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _client_core = {
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
    var _result = true;
    !_dataType.DataType.isEmptyFunction(check) && (_result = check(res));

    if (_result) {
      var _map$status = map.status,
          status = _map$status === void 0 ? 'status' : _map$status,
          _map$result = map.result,
          result = _map$result === void 0 ? 'result' : _map$result,
          _map$message = map.message,
          message = _map$message === void 0 ? 'message' : _map$message;

      if (res[status] || res[status] === 0) {
        return _objectSpread({
          success: true
        }, _client_core._parse(res, result));
      }

      return {
        success: false,
        data: null,
        msg: res[message]
      };
    }
  },
  _spinner: {
    show: function show(loading, app) {
      loading && app && app.$m2 && app.$m2.loading();
    },
    hide: function hide(loading, app) {
      loading && app && app.$m2 && app.$m2.loading.hide();
    }
  },
  _handle: function _handle(res) {
    var handle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.EMPTY_FUNC;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.EMPTY_OBJECT;
    !_dataType.DataType.isEmptyFunction(handle) && (res = handle(res));

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
 * @param {Object} {app,env,instance,spinner,check,handle,map,error} 当前客户端的可选参数
 * @desc {Object} {app} 当前应用上下文
 * @desc {Object} {env} 当前环境配置
 * @desc {Object} {axios} 当前请求实例(可使用DataFetch构建)
 * @desc {Function} {spinner} 当前加载器函数(覆盖m2默认加载器)
 * @desc {Function} {check} 数据校验函数(对返回数据的权限校验)
 * @desc {Function} {handle} 数据处理函数(对返回数据的处理函数)
 * @desc {Object} {map} 数据映射(对返回数据字段映射)
 * @desc {Function} {error} 全局错误处理函数
 */

var DataClient = /*#__PURE__*/function () {
  function DataClient(_ref) {
    var _this2 = this;

    var app = _ref.app,
        env = _ref.env,
        axios = _ref.axios,
        spinner = _ref.spinner,
        check = _ref.check,
        handle = _ref.handle,
        map = _ref.map,
        error = _ref.error;

    _classCallCheck(this, DataClient);

    _defineProperty(this, "get", function (url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _this2._fetch(url, options);
    });

    _defineProperty(this, "post", function (url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _this2._fetch(url, _objectSpread({}, options, {
        method: _constants.REQUEST_METHOD.POST
      }));
    });

    _defineProperty(this, "put", function (url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _this2._fetch(url, _objectSpread({}, options, {
        method: _constants.REQUEST_METHOD.PUT
      }));
    });

    _defineProperty(this, "patch", function (url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _this2._fetch(url, _objectSpread({}, options, {
        method: _constants.REQUEST_METHOD.PATCH
      }));
    });

    _defineProperty(this, "del", function (url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _this2._fetch(url, _objectSpread({}, options, {
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
      return _this2._fetch(url, _objectSpread({}, options, {
        proxy: true
      }));
    });

    _defineProperty(this, "proxyPost", function (url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _this2._fetch(url, _objectSpread({}, options, {
        proxy: true,
        method: _constants.REQUEST_METHOD.POST
      }));
    });

    _defineProperty(this, "proxyPut", function (url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _this2._fetch(url, _objectSpread({}, options, {
        proxy: true,
        method: _constants.REQUEST_METHOD.POST
      }));
    });

    _defineProperty(this, "proxyPatch", function (url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _this2._fetch(url, _objectSpread({}, options, {
        proxy: true,
        method: _constants.REQUEST_METHOD.PATCH
      }));
    });

    _defineProperty(this, "proxyDel", function (url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _this2._fetch(url, _objectSpread({}, options, {
        proxy: true,
        method: _constants.REQUEST_METHOD.DELETE
      }));
    });

    _defineProperty(this, "proxyAll", function () {
      for (var _len2 = arguments.length, options = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        options[_key2] = arguments[_key2];
      }

      return _this2._fetchAll(options.map(function (item) {
        return _objectSpread({}, item, {
          config: _objectSpread({}, item.config, {
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

    _defineProperty(this, "http", {
      get: this.get,
      post: this.post,
      put: this.put,
      patch: this.patch,
      del: this.del,
      all: this.all,
      proxy: this.proxy
    });

    this._app = app || window['__context__'];
    this._env = env;
    this._axios = axios || _dataFetch.DataFetch.create();
    this._spinner = spinner;
    this._check = check;
    this._handle = handle;
    this._map = map;
    this._error = error;
  } // 私有方法


  _createClass(DataClient, [{
    key: "_fetch",
    value: function _fetch(url, options) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var _spinner = _this._spinner || _client_core._spinner;

        _spinner.show(options.loading, _this._app);

        return _dataFetch.DataFetch.axios(url, _objectSpread({
          env: _this._env,
          // apiKey: 'app', // 当存在多个api接口时，配置默认的apiKey(大多数场景使用的api服务)
          instance: _this._axios
        }, options)).then(function (res) {
          _spinner.hide(options.loading, _this._app);

          res = _client_core._check(res, _this._check, _this._map);

          if (res.success) {
            resolve(_client_core._handle(res, _this._handle, options));
          } else {
            var _error = {
              title: "\u63A5\u53E3:[".concat(url, "]\u8C03\u7528\u5931\u8D25"),
              message: res.msg
            };
            !_dataType.DataType.isEmptyFunction(_this._error) && _this.error(_error);
            reject(_error);
          }
        })["catch"](function (err) {
          _spinner.hide(options.loading, _this._app);

          var _error = {
            title: "\u63A5\u53E3:[".concat(url, "]\u8C03\u7528\u5F02\u5E38"),
            message: err.msg || err
          };
          !_dataType.DataType.isEmptyFunction(_this._error) && _this.error(_error);
          reject(_error);
        });
      });
    }
  }, {
    key: "_fetchAll",
    value: function _fetchAll() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.EMPTY_ARRAY;
      if (_dataType.DataType.isEmptyArray(options)) return;

      var _this = this;

      var loading = options.some(function (opt) {
        return opt && opt.config && opt.config.loading;
      });
      return new Promise(function (resolve, reject) {
        var _spinner = _this._spinner || _client_core._spinner;

        _spinner.show(options.loading, _this._app);

        options.forEach(function (opt) {
          return opt.config = _objectSpread({}, opt.config, {
            env: _this._env,
            instance: _this._axios
          });
        });
        return _dataFetch.DataFetch.all(options).then(function (res) {
          _spinner.hide(loading, _this._app);

          resolve(res.map(function (data, index) {
            data = _client_core._check(data, _this._check, _this._map);
            return _client_core._handle(data, _this._handle, options[index].config);
          }));
        })["catch"](function (err) {
          _spinner.hide(loading, _this._app);

          var _error = {
            title: "\u63A5\u53E3\u8C03\u7528\u5F02\u5E38",
            message: err.msg || err
          };
          !_dataType.DataType.isEmptyFunction(_this._error) && _this.error(_error);
          reject(_error);
        });
      });
    } // 构建同一客户端单例(ES6无法屏蔽构造器，之后可更新迭代为ts)

  }], [{
    key: "getInstance",
    value: function getInstance() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.EMPTY_OBJECT,
          app = _ref2.app,
          env = _ref2.env,
          client = _ref2.client,
          spinner = _ref2.spinner,
          check = _ref2.check,
          handle = _ref2.handle,
          map = _ref2.map,
          error = _ref2.error;

      if (!this._instance) {
        this._instance = new DataClient({
          app: app,
          env: env,
          client: client,
          spinner: spinner,
          check: check,
          handle: handle,
          map: map,
          error: error
        });
      }

      return this._instance;
    } // 通用请求客户端封装

  }]);

  return DataClient;
}();

exports.DataClient = DataClient;