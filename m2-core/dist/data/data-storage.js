"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataStorage = void 0;

var _constants = require("../constants");

var _dataCrypto = require("./data-crypto");

var _dataType = require("./data-type");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _store_core = function _store_core(storageType) {
  var encryptType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (!encryptType) {
    return {
      storage: storageType === _constants.STORAGE_TYPE.Local ? localStorage : sessionStorage
    };
  }

  var encryptKey = _constants.DEFAULT_STORAGE_OPTIONS.encryptKey,
      encryptIv = _constants.DEFAULT_STORAGE_OPTIONS.encryptIv;
  var encryptParams = {
    key: encryptKey,
    iv: encryptIv
  };
  return {
    storage: storageType === _constants.STORAGE_TYPE.Local ? localStorage : sessionStorage,
    secret: encryptType === _constants.SYMMETRIC_CRYPTO_TYPE.AES || encryptType === _constants.SYMMETRIC_CRYPTO_TYPE.DES || encryptType === _constants.SYMMETRIC_CRYPTO_TYPE.RC4,
    encrypt: function encrypt(data) {
      var secret = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return secret ? _dataCrypto.DataCrypto.encrypt(data, encryptType, encryptParams) : data;
    },
    decrypt: function decrypt(data) {
      var secret = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return secret ? _dataCrypto.DataCrypto.decrypt(data, encryptType, encryptParams) : data;
    }
  };
};

var DataStorage = /*#__PURE__*/function () {
  function DataStorage() {
    _classCallCheck(this, DataStorage);
  }

  _createClass(DataStorage, null, [{
    key: "get",

    /**
     * @method 获取存储实例中指定key对应的值
     * @param key 当前存储的key
     * @param options[storageType] 存储类型（默认：STORAGE_TYPE.Local）
     * @param options[encryptType] 加密类型（默认：SYMMETRIC_CRYPTO_TYPE.NONE, 仅限于AES,DES,RC4）
     * @desc 值可能为简单类型，对象或数组
     * @returns 返回当前存储key对应的值
     */
    value: function get(key) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var _DEFAULT_STORAGE_OPTI = _objectSpread(_objectSpread({}, _constants.DEFAULT_STORAGE_OPTIONS), options),
          storageType = _DEFAULT_STORAGE_OPTI.storageType,
          encryptType = _DEFAULT_STORAGE_OPTI.encryptType;

      var _store_core2 = _store_core(storageType, encryptType),
          storage = _store_core2.storage,
          secret = _store_core2.secret,
          decrypt = _store_core2.decrypt;

      try {
        return JSON.parse(decrypt(storage[key] || '', secret));
      } catch (e) {
        return decrypt(storage.getItem(key) || '', secret);
      }
    }
    /**
     * @method 设置指定key和value到储存实例中
     * @param key 当前存储的key
     * @param value 当前存储的value
     * @param options[storageType] 存储类型（默认：STORAGE_TYPE.Local）
     * @param options[encryptType] 加密类型（默认：SYMMETRIC_CRYPTO_TYPE.NONE, 仅限于AES,DES,RC4）
     * @desc 支持简单数据类型，对象或数组的存储
     */

  }, {
    key: "set",
    value: function set(key, value) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var _DEFAULT_STORAGE_OPTI2 = _objectSpread(_objectSpread({}, _constants.DEFAULT_STORAGE_OPTIONS), options),
          storageType = _DEFAULT_STORAGE_OPTI2.storageType,
          encryptType = _DEFAULT_STORAGE_OPTI2.encryptType;

      var _store_core3 = _store_core(storageType, encryptType),
          storage = _store_core3.storage,
          secret = _store_core3.secret,
          encrypt = _store_core3.encrypt;

      if (_dataType.DataType.isObject(value) || _dataType.DataType.isArray(value)) {
        storage[key] = encrypt(JSON.stringify(value), secret);
      } else {
        storage.setItem(key, encrypt(value, secret));
      }
    }
    /**
     * @method 从存储实例中删除指定的key
     * @param key 当前存储的key
     * @param storageType 存储类型（默认：STORAGE_TYPE.Local）
     */

  }, {
    key: "remove",
    value: function remove(key) {
      var storageType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.STORAGE_TYPE.Local;

      var _store_core4 = _store_core(storageType),
          storage = _store_core4.storage;

      storage.removeItem(key);
    }
    /**
     * @method 从存储实例中删除所有的key
     * @param storageType 存储类型（默认：STORAGE_TYPE.Local）
     */

  }, {
    key: "clear",
    value: function clear() {
      var storageType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.STORAGE_TYPE.Local;

      var _store_core5 = _store_core(storageType),
          storage = _store_core5.storage;

      storage.clear();
    }
    /**
     * @method 获取存储实例中的个数
     * @param storageType 存储类型（默认：STORAGE_TYPE.Local）
     */

  }, {
    key: "count",
    value: function count() {
      var storageType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.STORAGE_TYPE.Local;

      var _store_core6 = _store_core(storageType),
          storage = _store_core6.storage;

      return storage.length;
    }
    /**
     * @method 获取存储实例中是否包含指定key的实例
     * @param key 当前存储的key
     * @param storageType 存储类型（默认：STORAGE_TYPE.Local）
     */

  }, {
    key: "contains",
    value: function contains(key) {
      var storageType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.STORAGE_TYPE.Local;

      var _store_core7 = _store_core(storageType),
          storage = _store_core7.storage;

      return key in storage;
    }
  }]);

  return DataStorage;
}();

exports.DataStorage = DataStorage;