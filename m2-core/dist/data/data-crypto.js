"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataCrypto = void 0;

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

var _dataUtil = require("./data-util");

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* 采用策略模式实现 */
var _crypto_core = function () {
  var context = {}; // 非对称加密策略

  Object.keys(_constants.ASYMMETRIC_CRYPTO_TYPE).forEach(function (prop) {
    var _item = _constants.ASYMMETRIC_CRYPTO_TYPE[prop];

    if (_item.name) {
      var _crypto = _cryptoJs["default"][_item.name];
      context[_item.name] = {
        symmetric: false
      };

      if (_item.hmac) {
        context[_item.name] = _objectSpread(_objectSpread({}, context[prop]), {}, {
          encrypt: function encrypt(data, key) {
            return _crypto(data, key).toString();
          }
        });
      } else if (_item.params) {
        context[_item.name] = _objectSpread(_objectSpread({}, context[prop]), {}, {
          encrypt: function encrypt(data, key) {
            return _crypto(data, key, _item.params).toString();
          }
        });
      } else {
        context[_item.name] = _objectSpread(_objectSpread({}, context[prop]), {}, {
          encrypt: function encrypt(data) {
            return _crypto(data).toString();
          }
        });
      }
    }
  }); // 对称加密策略

  Object.keys(_constants.SYMMETRIC_CRYPTO_TYPE).forEach(function (prop) {
    var _item = _constants.SYMMETRIC_CRYPTO_TYPE[prop];

    if (_item.name) {
      context[_item.name] = {
        symmetric: true
      };

      if (_item.encoding) {
        context[_item.name] = _objectSpread(_objectSpread({}, context[_item.name]), {}, {
          encrypt: function encrypt(data) {
            return _cryptoJs["default"].enc[_item.name].stringify(_cryptoJs["default"].enc.Utf8.parse(data)).toString();
          },
          decrypt: function decrypt(data) {
            return _cryptoJs["default"].enc.Utf8.stringify(_cryptoJs["default"].enc[_item.name].parse(data));
          }
        });
      } else {
        var _key = function _key(key) {
          return _cryptoJs["default"].enc.Utf8.parse(key);
        };

        var _cfg = function _cfg(iv) {
          return {
            iv: _cryptoJs["default"].enc.Utf8.parse(iv),
            mode: _cryptoJs["default"].mode.CFB,
            padding: _cryptoJs["default"].pad.Pkcs7,
            format: _cryptoJs["default"].format.Hex
          };
        };

        var _iv = _dataUtil.DataUtil.defaultVal(_item.iv, true);

        var _CryptoJS$_item$name = _cryptoJs["default"][_item.name],
            _encrypt = _CryptoJS$_item$name.encrypt,
            _decrypt = _CryptoJS$_item$name.decrypt;

        if (_iv) {
          context[_item.name] = _objectSpread(_objectSpread({}, context[_item.name]), {}, {
            encrypt: function encrypt(data, key, iv) {
              return _encrypt(_cryptoJs["default"].enc.Utf8.parse(data), _key(key), _cfg(iv)).toString();
            },
            decrypt: function decrypt(data, key, iv) {
              return _decrypt(_cryptoJs["default"].lib.CipherParams.create({
                ciphertext: _cryptoJs["default"].enc.Hex.parse(data)
              }), _key(key), _cfg(iv)).toString(_cryptoJs["default"].enc.Utf8);
            }
          });
        } else {
          context[_item.name] = _objectSpread(_objectSpread({}, context[_item.name]), {}, {
            encrypt: function encrypt(data, key) {
              return _encrypt(_cryptoJs["default"].enc.Utf8.parse(data), _key(key)).toString(_cryptoJs["default"].format.Hex);
            },
            decrypt: function decrypt(data, key) {
              return _decrypt(_cryptoJs["default"].lib.CipherParams.create({
                ciphertext: _cryptoJs["default"].enc.Hex.parse(data)
              }), _key(key)).toString(_cryptoJs["default"].enc.Utf8);
            }
          });
        }
      }
    }
  });
  return context;
}();

var _checkCrypto = function _checkCrypto(crypto) {
  var _context = _crypto_core[crypto];

  if (!_context) {
    console.error("\u6307\u5B9A\u7684\u52A0\u5BC6\u7B97\u6CD5[".concat(crypto, "]\u4E0D\u5728").concat(_constants.ASYMMETRIC_CRYPTO_TYPE, "\u6216").concat(_constants.SYMMETRIC_CRYPTO_TYPE, "\u8303\u56F4\u5185\uFF01"));
    return false;
  }

  return _context;
};

var DataCrypto = /*#__PURE__*/function () {
  function DataCrypto() {
    _classCallCheck(this, DataCrypto);
  }

  _createClass(DataCrypto, null, [{
    key: "encrypt",

    /**
     * @method 加密当前的数据
     * @param data 需要加密的数据
     * @param crypto 加解密策略(ASYMMETRIC_CRYPTO_TYPE | SYMMETRIC_CRYPTO_TYPE)
     * @param key 密钥(来自应用配置)
     * @param iv 矢量(来自应用配置)
     * @returns {String} 加密之后的密文字符串
     */
    value: function encrypt(data, crypto) {
      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref$key = _ref.key,
          key = _ref$key === void 0 ? '' : _ref$key,
          _ref$iv = _ref.iv,
          iv = _ref$iv === void 0 ? '' : _ref$iv;

      var _context = _checkCrypto(crypto.name);

      if (!_context) return data;
      return _context.symmetric ? _context.encrypt(data, key, iv) : _context.encrypt(data, key);
    }
    /**
     * @method 解密当前的数据
     * @param data 需要解密的数据
     * @param crypto 加解密策略(ASYMMETRIC_CRYPTO_TYPE | SYMMETRIC_CRYPTO_TYPE)
     * @param key 密钥(来自应用配置)
     * @param iv 矢量(来自应用配置)
     * @returns {String} 解密之后的原文字符串
     */

  }, {
    key: "decrypt",
    value: function decrypt(data, crypto) {
      var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref2$key = _ref2.key,
          key = _ref2$key === void 0 ? '' : _ref2$key,
          _ref2$iv = _ref2.iv,
          iv = _ref2$iv === void 0 ? '' : _ref2$iv;

      var _context = _checkCrypto(crypto.name);

      if (!_context) return data;
      return _context.symmetric ? _context.decrypt(data, key, iv) : '';
    }
  }]);

  return DataCrypto;
}();

exports.DataCrypto = DataCrypto;