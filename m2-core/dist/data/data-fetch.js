"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataFetch = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _qs = _interopRequireDefault(require("qs"));

var _constants = require("../constants");

var _dataType = require("./data-type");

var _dataStorage = require("./data-storage");

var _dataEnv = require("./data-env");

var _dataUtil = require("./data-util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _parseBaseUrl = function _parseBaseUrl(baseUrl, env, proxy) {
  var apiKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  if (baseUrl) return baseUrl;
  if (_dataEnv.IsDev && proxy || !env) return '';
  var apiUrl = '';

  var _buildEnv = (0, _dataEnv.getBuildEnv)();

  var _cacheKey = _dataEnv.cacheEnvKeys.url;

  if (!_dataEnv.IsDev && !apiKey) {
    apiUrl = _dataStorage.DataStorage.get(_cacheKey);
    if (apiUrl) return apiUrl;
  }

  for (var prop in env) {
    var currentEnv = _objectSpread(_objectSpread({}, _dataEnv.DataEnv[prop] || {
      env: prop,
      alias: prop
    }), env[prop]);

    if (currentEnv.env === _buildEnv || currentEnv.alias === _buildEnv) {
      if (_dataType.DataType.isString(currentEnv.api)) {
        apiUrl = currentEnv.api;
      } else if (_dataType.DataType.isObject(currentEnv.api)) {
        apiUrl = currentEnv.api[apiKey];
      }

      if (apiUrl) {
        !_dataEnv.IsDev && _dataStorage.DataStorage.set(_cacheKey, apiUrl);
      }

      break;
    }
  }

  return apiUrl;
};

var _configInterceptor = function _configInterceptor(retry, retryDelay) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants.EMPTY_OBJECT,
      _ref$instance = _ref.instance,
      instance = _ref$instance === void 0 ? _axios["default"] : _ref$instance,
      _ref$request = _ref.request,
      request = _ref$request === void 0 ? _constants.EMPTY_FUNC : _ref$request,
      _ref$response = _ref.response,
      response = _ref$response === void 0 ? _constants.EMPTY_FUNC : _ref$response,
      _ref$reject = _ref.reject,
      reject = _ref$reject === void 0 ? _constants.EMPTY_FUNC : _ref$reject;

  if (!_dataType.DataType.isEmptyFunction(request)) {
    instance.interceptors.request.use(request);
  }

  if (!_dataType.DataType.isEmptyFunction(response)) {
    instance.interceptors.response.use(response, reject);
  }

  if (retry <= 0) return instance;
  instance.defaults.retry = retry;
  instance.defaults.retryDelay = retryDelay;
  instance.interceptors.response.use(undefined, function (err) {
    var config = err.config; // If config does not exist or the retry option is not set, reject

    if (!config || !config.retry) {
      return Promise.reject(err);
    } // Set the variable for keeping track of the retry count


    config.__retryCount = config.__retryCount || 0; // Check if we've maxed out the total number of retries

    if (config.__retryCount >= config.retry) {
      // Reject with the error
      err.failure = true;
      err.message = "Retry ".concat(config.retry, " times, the request has been terminated.");
      return Promise.reject(err);
    } // Increase the retry count


    config.__retryCount += 1; // Create new promise to handle exponential backoff

    var backoff = new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, config.retryDelay);
    }); // Return the promise in which recalls axios to retry the request

    return backoff.then(function () {
      return instance(config);
    });
  });
  return instance;
};

var DataFetch = /*#__PURE__*/function () {
  function DataFetch() {
    _classCallCheck(this, DataFetch);
  }

  _createClass(DataFetch, null, [{
    key: "create",

    /**
     * @method 创建一个新的axios示例
     * @desc {Function} {request} 请求拦截器函数
     * @desc {Function} {response} 响应拦截器正常处理函数
     * @desc {Function} {reject} 响应拦截器错误处理函数
     * @desc {Number} {retry} 自动重试次数(为0代表不重试)
     * @desc {Number} {retryDelay} 再次重试的延迟毫秒数(默认1秒)
     * @desc {Number} {timeout} 当前请求的超时毫秒数(默认30秒)
     * @desc {Object} {headers} 当前请求的header
     * @desc {Object} {extras} 其他配置参数
     * @returns 返回新的axios对象
     */
    value: function create() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.EMPTY_OBJECT,
          _ref2$request = _ref2.request,
          request = _ref2$request === void 0 ? _constants.EMPTY_FUNC : _ref2$request,
          _ref2$response = _ref2.response,
          response = _ref2$response === void 0 ? _constants.EMPTY_FUNC : _ref2$response,
          _ref2$reject = _ref2.reject,
          reject = _ref2$reject === void 0 ? _constants.EMPTY_FUNC : _ref2$reject,
          _ref2$retry = _ref2.retry,
          retry = _ref2$retry === void 0 ? 3 : _ref2$retry,
          _ref2$retryDelay = _ref2.retryDelay,
          retryDelay = _ref2$retryDelay === void 0 ? 1000 : _ref2$retryDelay,
          _ref2$timeout = _ref2.timeout,
          timeout = _ref2$timeout === void 0 ? 30000 : _ref2$timeout,
          _ref2$headers = _ref2.headers,
          headers = _ref2$headers === void 0 ? _constants.EMPTY_OBJECT : _ref2$headers,
          extras = _objectWithoutProperties(_ref2, ["request", "response", "reject", "retry", "retryDelay", "timeout", "headers"]);

      var $axios = _axios["default"].create(_objectSpread({
        headers: headers,
        timeout: timeout
      }, extras));

      if (extras.baseURL) {
        $axios.defaults.baseURL = extras.baseURL;
      }

      if (extras.responseType) {
        $axios.defaults.responseType = extras.responseType;
      }

      for (var _i = 0, _Object$entries = Object.entries(headers); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            val = _Object$entries$_i[1];

        $axios.defaults.headers.common[key] = val;
      } // axios默认使用encodeURI进行编码，会造成参数中带有敏感字符，所以需要使用encodeURIComponent进行编码


      $axios.defaults.paramsSerializer = function (params) {
        return Object.entries(params).reduce(function (res, _ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              key = _ref4[0],
              val = _ref4[1];

          var value = _dataType.DataType.isObject(val) || _dataType.DataType.isArray(val) ? JSON.stringify(val) : val;
          res += "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(value), "&");
          return res;
        }, '').slice(0, -1);
      };

      return _configInterceptor(retry, retryDelay, {
        instance: $axios,
        request: request,
        response: response,
        reject: reject
      });
    }
    /**
     * @method 根据当前url请求数据
     * @param {String} url 当前请求的url
     * @param {Object} {baseUrl,proxy,env,apiKey,method,params,retry,retryDelay,timeout,headers,extras} 当前请求的可选参数
     * @desc {String} baseUrl 当前请求的域名url
     * @desc {Boolean} proxy 当前请求是否开启代理（默认不开启）
     * @desc {Object} {env} 当前环境变量的配置对象
     * @desc {String} {apiKey} 当前请求的Api键值(多个Api时起作用，用于过滤)
     * @desc {String} {method} 当前请求的方法(get,post,...)
     * @desc {Object} {params} 当前请求的参数
     * @desc {Boolean} {query} 是否将请求字符串中的参数转化为params（默认为true）
     * @desc {Number} {retry} 自动重试次数(为0代表不重试)
     * @desc {Number} {retryDelay} 再次重试的延迟毫秒数(默认1秒)
     * @desc {Number} {timeout} 当前请求的超时毫秒数(默认30秒)
     * @desc {Object} {headers} 当前请求的header
     * @desc {Object} {instance} 当前axios请求实例(如果传入instance,则之前的关于axios的配置[method,timeout,headers]将失效)
     * @desc {Object} {extras} 其他配置参数
     * @returns 返回当前请求的promise
     */

  }, {
    key: "axios",
    value: function axios(url) {
      var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.EMPTY_OBJECT,
          baseUrl = _ref5.baseUrl,
          _ref5$proxy = _ref5.proxy,
          proxy = _ref5$proxy === void 0 ? false : _ref5$proxy,
          env = _ref5.env,
          _ref5$apiKey = _ref5.apiKey,
          apiKey = _ref5$apiKey === void 0 ? '' : _ref5$apiKey,
          _ref5$method = _ref5.method,
          method = _ref5$method === void 0 ? _constants.REQUEST_METHOD.GET : _ref5$method,
          _ref5$retry = _ref5.retry,
          retry = _ref5$retry === void 0 ? 3 : _ref5$retry,
          _ref5$retryDelay = _ref5.retryDelay,
          retryDelay = _ref5$retryDelay === void 0 ? 1000 : _ref5$retryDelay,
          _ref5$timeout = _ref5.timeout,
          timeout = _ref5$timeout === void 0 ? 30000 : _ref5$timeout,
          _ref5$headers = _ref5.headers,
          headers = _ref5$headers === void 0 ? _constants.EMPTY_OBJECT : _ref5$headers,
          _ref5$params = _ref5.params,
          params = _ref5$params === void 0 ? _constants.EMPTY_OBJECT : _ref5$params,
          _ref5$query = _ref5.query,
          query = _ref5$query === void 0 ? true : _ref5$query,
          instance = _ref5.instance,
          extras = _objectWithoutProperties(_ref5, ["baseUrl", "proxy", "env", "apiKey", "method", "retry", "retryDelay", "timeout", "headers", "params", "query", "instance"]);

      var $params = params;
      var $method = method;
      var $headers = headers;
      var $url = url;
      var $query = query;
      return new Promise(function (resolve, reject) {
        var options = _objectSpread(_objectSpread({}, _constants.DEFAULT_FETCH_OPTIONS), {}, {
          url: $url,
          baseURL: _parseBaseUrl(baseUrl, env, proxy, apiKey),
          method: $method,
          headers: $headers,
          query: $query,
          timeout: timeout
        }, extras);

        if ($method === _constants.REQUEST_METHOD.GET) {
          options.params = $params;
        } else {
          if (options.query) {
            var _query = _dataUtil.DataUtil.getUrlQuery(options.url);

            if (_query) {
              options.url = options.url.substr(0, options.url.indexOf('?'));
              options.params = _query;
            }
          }

          if ($headers['Content-Type'] === _constants.CONTENT_TYPE.FORM) {
            options.data = _qs["default"].stringify($params, {
              arrayFormat: 'brackets'
            });
          } else if ($headers['Content-Type'] === _constants.CONTENT_TYPE.UPLOAD) {
            var $form = new FormData();

            for (var _i2 = 0, _Object$entries2 = Object.entries($params); _i2 < _Object$entries2.length; _i2++) {
              var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
                  key = _Object$entries2$_i[0],
                  val = _Object$entries2$_i[1];

              $form.append(key, val);
            }

            options.data = $form;
          } else {
            options.data = $params;
          }
        }

        var baseURL = options.baseURL,
            url = options.url,
            method = options.method,
            params = options.params,
            data = options.data,
            headers = options.headers,
            file = options.file,
            _options$responseType = options.responseType,
            responseType = _options$responseType === void 0 ? 'json' : _options$responseType;
        var baseUrl = instance.defaults.baseURL || baseURL;
        var $promise = instance ? instance({
          baseUrl: baseUrl,
          method: method,
          url: url,
          params: params,
          data: data,
          headers: headers,
          responseType: responseType
        }) : _configInterceptor(retry, retryDelay)(options);
        $promise.then(function (res) {
          if (res && res.status === 200) {
            // 处理文件上传
            if (responseType === 'blob') {
              var content = res.headers['content-disposition'];
              var filename = /fileName=([%\w]+(\..*?));/gi.test(content.endsWith(';') ? content : content + ';') && file ? "".concat(file).concat(RegExp.$2) : RegExp.$1;

              _dataUtil.DataUtil.downloadFile(res.data, decodeURIComponent(filename));

              resolve({
                blob: true
              });
            } else {
              resolve(res.data);
            }
          } else {
            reject(res.data);
          }
        })["catch"](function (err) {
          reject(err);
        });
      });
    }
    /**
     * @method 根据当前多个url同时发送请求
     * @param {Array} options 当前请求配置(包含url,config)
     * @returns 返回当前多个请求的promise
     */

  }, {
    key: "all",
    value: function all() {
      var _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.EMPTY_ARRAY;
      if (_dataType.DataType.isEmptyArray(options)) return;
      var $axios = [];
      options.forEach(function (item) {
        if (!_dataType.DataType.isEmptyObject(item) && _dataType.DataType.isString(item.url) && _dataType.DataType.isObject(item.config)) {
          $axios.push(_this.axios(item.url, item.config));
        }
      });
      if (_dataType.DataType.isEmptyArray($axios)) return;
      return Promise.all($axios);
    }
  }]);

  return DataFetch;
}();

exports.DataFetch = DataFetch;