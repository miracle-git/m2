"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cacheEnvKeys = exports.getEnvConfig = exports.getEnvAlias = exports.getBuildEnv = exports.IsDev = exports.DataEnv = void 0;

var _dataStorage = require("./data-storage");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DataEnv = {
  loc: {
    env: 'localhost',
    alias: 'loc'
  },
  dev: {
    env: 'development',
    alias: 'dev'
  },
  sit: {
    env: 'stagingment',
    alias: 'sit'
  },
  uat: {
    env: 'integration',
    alias: 'uat'
  },
  prd: {
    env: 'production',
    alias: 'prd'
  }
}; // 是否为开发环境

exports.DataEnv = DataEnv;
var IsDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'localhost';
exports.IsDev = IsDev;

var getBuildEnv = function getBuildEnv() {
  return process.env.BUILD_ENV || process.env.VUE_APP_BUILD_ENV;
};

exports.getBuildEnv = getBuildEnv;

var getEnvAlias = function getEnvAlias(buildEnv) {
  var currentEnv = Object.values(DataEnv).find(function (item) {
    return item.env === buildEnv;
  });
  return currentEnv ? currentEnv.alias : 'dev';
};

exports.getEnvAlias = getEnvAlias;

var getEnvConfig = function getEnvConfig(env) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var config;

  var _buildEnv = getBuildEnv();

  var _cacheKey = cacheEnvKeys.env;

  if (!IsDev && !key) {
    config = _dataStorage.DataStorage.get(_cacheKey);
    if (config) return config;
  }

  for (var prop in env) {
    var currentEnv = _objectSpread(_objectSpread({}, DataEnv[prop] || {
      env: prop,
      alias: prop
    }), env[prop]);

    if (currentEnv.env === _buildEnv || currentEnv.alias === _buildEnv) {
      config = key ? currentEnv[key] : currentEnv;

      if (config) {
        !IsDev && _dataStorage.DataStorage.set(_cacheKey, config);
      }

      break;
    }
  }

  return config;
};

exports.getEnvConfig = getEnvConfig;
var cacheEnvKeys = {
  api: "m2:app_api_mapping_".concat(getEnvAlias(getBuildEnv())),
  env: "m2:app_env_config_".concat(getEnvAlias(getBuildEnv())),
  url: "m2:app_api_url_".concat(getEnvAlias(getBuildEnv()))
};
exports.cacheEnvKeys = cacheEnvKeys;