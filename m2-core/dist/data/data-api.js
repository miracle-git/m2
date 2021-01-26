"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDataApi = void 0;

var _dataType = require("./data-type");

var _dataStorage = require("./data-storage");

var _dataEnv = require("./data-env");

var _constants = require("../constants");

/**
 * @file DataApi
 * @description 获取应用Api配置映射
 */
var _api_prefix = function _api_prefix(prefix) {
  var result = {
    prefix: '',
    exclude: ''
  };

  if (_dataType.DataType.isObject(prefix) && 'prefix' in prefix) {
    result.prefix = prefix.prefix;
    result.exclude = prefix.key || 'others';
  } else if (_dataType.DataType.isString(prefix)) {
    result.prefix = prefix;
  }

  return result;
};

var _api_mapping = function _api_mapping(config, _prefix, mock) {
  var _api_prefix2 = _api_prefix(_prefix),
      prefix = _api_prefix2.prefix,
      exclude = _api_prefix2.exclude;

  return Object.keys(config).reduce(function (api, key) {
    var val = config[key];

    if (_prefix.multi) {
      prefix = _prefix[key] || '';
    }

    if (_dataType.DataType.isString(val)) {
      if (!val.startsWith('/')) {
        config[key] = "/".concat(val);
      }

      if (mock && mock.urls.indexOf(config[key]) > -1) {
        api[key] = "".concat(prefix).concat(mock.prefix).concat(config[key]);
      } else {
        api[key] = "".concat(prefix).concat(config[key]);
      }
    }

    if (_dataType.DataType.isObject(val)) {
      api[key] = _api_mapping(val, key === exclude ? '' : prefix, mock);
    }

    return api;
  }, {});
};

var _api_mocking = function _api_mocking(config) {
  var mock = null;

  if (_dataType.DataType.isArray(config)) {
    mock = {
      prefix: '/mock',
      urls: config
    };
  } else if (_dataType.DataType.isObject(config)) {
    var _config$prefix = config.prefix,
        prefix = _config$prefix === void 0 ? '/mock' : _config$prefix,
        urls = config.urls;

    if (!_dataType.DataType.isEmptyArray(urls)) {
      mock = {
        prefix: prefix,
        urls: urls
      };
    }
  }

  return mock;
};

var getDataApi = function getDataApi(config) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var mock = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var api = {};
  mock = _api_mocking(mock);
  var _cacheKey = _dataEnv.cacheEnvKeys.api;
  var cache = _dataType.DataType.isString(prefix) || _dataType.DataType.isObject(prefix) && prefix.cache;

  if (!_dataEnv.IsDev && cache) {
    api = _dataStorage.DataStorage.get(_cacheKey, {
      encryptType: _constants.SYMMETRIC_CRYPTO_TYPE.DES
    });

    if (!api) {
      api = _api_mapping(config, prefix, mock);

      _dataStorage.DataStorage.set(_cacheKey, api, {
        encryptType: _constants.SYMMETRIC_CRYPTO_TYPE.DES
      });
    }
  } else {
    api = _api_mapping(config, prefix, mock);
  }

  return api;
};

exports.getDataApi = getDataApi;