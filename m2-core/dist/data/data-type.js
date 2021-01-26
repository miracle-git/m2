"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataType = void 0;

var _constants = require("../constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _data_core = {
  _is: function _is(type) {
    var primitive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return function (obj) {
      return primitive ? _typeof(obj) === type.toLowerCase() : {}.toString.call(obj) === '[object ' + type + ']';
    };
  },
  _match: function _match(item, pattern) {
    var regex = new RegExp(pattern);
    return regex.test(item);
  },
  _isWindow: function _isWindow(item) {
    return item && _typeof(item) === 'object' && 'setInterval' in item;
  },
  _hasOwn: Object.prototype.hasOwnProperty
};

var DataType = /*#__PURE__*/function () {
  function DataType() {
    _classCallCheck(this, DataType);
  }

  _createClass(DataType, null, [{
    key: "isObject",

    /**
     * @method 检测当前类型是否为对象
     * @param item 当前检测的类型
     * @returns {Boolean} 如果为对象则返回true, 否则返回false
     */
    value: function isObject(item) {
      return _data_core._is('Object')(item);
    }
    /**
     * @method 检测当前类型是否为普通对象(非window或系统对象)
     * @param item 当前检测的类型
     * @returns {Boolean} 如果为普通对象则返回true, 否则返回false
     */

  }, {
    key: "isPlainObject",
    value: function isPlainObject(item) {
      var _is = _data_core._is,
          _isWindow = _data_core._isWindow,
          _hasOwn = _data_core._hasOwn;

      if (!item || !_is('Object')(item) || _isWindow(item) || item.nodeType) {
        return false;
      } // 兼容IE


      try {
        if (item.constructor && !_hasOwn.call(item, 'constructor') && !_hasOwn.call(item.constructor.prototype, 'isPrototypeOf')) {
          return false;
        }
      } catch (e) {
        return false;
      }

      var key; // for (key in item) {}

      return key === undefined || _hasOwn.call(item, key);
    }
    /**
     * @method 检测当前类型是否为空对象
     * @param item 当前检测的类型
     * @returns {Boolean} 如果为空数组则返回true, 否则返回false
     */

  }, {
    key: "isEmptyObject",
    value: function isEmptyObject(item) {
      return !item || this.isObject(item) && Object.keys(item).length === 0;
    }
    /**
     * @method 检测当前类型是否为数组
     * @param item 当前检测的类型
     * @returns {Boolean} 如果为数组则返回true, 否则返回false
     */

  }, {
    key: "isArray",
    value: function isArray(item) {
      return Array.isArray(item) || _data_core._is('Array')(item);
    }
    /**
     * @method 检测当前类型是否为空数组
     * @param item 当前检测的类型
     * @returns {Boolean} 如果为空数组则返回true, 否则返回false
     */

  }, {
    key: "isEmptyArray",
    value: function isEmptyArray(item) {
      return !item || this.isArray(item) && item.length === 0;
    }
    /**
     * @method 检测当前类型是否为函数
     * @param item 当前检测的类型
     * @returns {Boolean} 如果为函数则返回true, 否则返回false
     */

  }, {
    key: "isFunction",
    value: function isFunction(item) {
      return _data_core._is('Function')(item);
    }
    /**
     * @method 检测当前类型是否为空函数
     * @param item 当前检测的类型
     * @returns {Boolean} 如果为空函数则返回true, 否则返回false
     */

  }, {
    key: "isEmptyFunction",
    value: function isEmptyFunction(item) {
      if (!item) return true;
      var str = item.toString().replace(/\s/g, '');
      return DataType.isFunction(item) && (str === 'functionEMPTY_FUNC(){}' || str === 'function(){}' || str === '()=>{}');
    }
    /**
     * @method 检测当前类型是否为字符串
     * @param item 当前检测的类型
     * @returns {Boolean} 如果为字符串则返回true, 否则返回false
     */

  }, {
    key: "isString",
    value: function isString(item) {
      return _data_core._is('String', true)(item);
    }
    /**
     * @method 检测当前类型是否为数字
     * @param item 当前检测的类型
     * @returns {Boolean} 如果为数字则返回true, 否则返回false
     */

  }, {
    key: "isNumber",
    value: function isNumber(item) {
      return _data_core._is('Number', true)(item);
    }
    /**
     * @method 检测当前类型是否为布尔
     * @param item 当前检测的类型
     * @returns {Boolean} 如果为布尔则返回true, 否则返回false
     */

  }, {
    key: "isBoolean",
    value: function isBoolean(item) {
      return _data_core._is('Boolean', true)(item);
    }
    /**
     * @method 检测当前类型是否为Guid对象
     * @param item 当前检测的类型
     * @returns {Boolean} 如果为Guid则返回true, 否则返回false
     */

  }, {
    key: "isGuid",
    value: function isGuid(item) {
      return _data_core._match(item, _constants.DATA_REGEX_PATTERN.guid);
    }
    /**
     * @method 检测当前类型是否为手机号码
     * @param item 当前检测的类型
     * @param pattern 当前检测的正则匹配表达式（默认值：DATA_REGEX_PATTERN.mobile）
     * @returns {Boolean} 如果为手机号码则返回true, 否则返回false
     */

  }, {
    key: "isMobilePhone",
    value: function isMobilePhone(item) {
      var pattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.DATA_REGEX_PATTERN.mobile;
      return _data_core._match(item, pattern);
    }
    /**
     * @method 检测当前类型是否为座机号码
     * @param item 当前检测的类型
     * @param pattern 当前检测的正则匹配表达式（默认值：DATA_REGEX_PATTERN.tel）
     * @returns {Boolean} 如果为座机号码则返回true, 否则返回false
     */

  }, {
    key: "isTelPhone",
    value: function isTelPhone(item) {
      var pattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.DATA_REGEX_PATTERN.tel;
      return _data_core._match(item, pattern);
    }
    /**
     * @method 检测当前类型是否为电话号码(手机或座机)
     * @param item 当前检测的类型
     * @param {Object} {mobile} 当前检测手机的正则匹配表达式（默认值：DATA_REGEX_PATTERN.mobile）
     * @param {Object} {tel} 当前检测座机的正则匹配表达式（默认值：DATA_REGEX_PATTERN.tel）
     * @returns {Boolean} 如果为电话号码则返回true, 否则返回false
     */

  }, {
    key: "isPhone",
    value: function isPhone(item) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$mobile = _ref.mobile,
          mobile = _ref$mobile === void 0 ? _constants.DATA_REGEX_PATTERN.mobile : _ref$mobile,
          _ref$tel = _ref.tel,
          tel = _ref$tel === void 0 ? _constants.DATA_REGEX_PATTERN.tel : _ref$tel;

      return this.isMobilePhone(item, mobile) || this.isTelPhone(item, tel);
    }
    /**
     * @method 检测当前类型是否为电子邮件
     * @param item 当前检测的类型
     * @param pattern 当前检测的正则匹配表达式（默认值：DATA_REGEX_PATTERN.email）
     * @returns {Boolean} 如果为电子邮件则返回true, 否则返回false
     */

  }, {
    key: "isEmail",
    value: function isEmail(item) {
      var pattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.DATA_REGEX_PATTERN.email;
      return _data_core._match(item, pattern);
    }
    /**
     * @method 检测当前类型是否为身份证号(支持15位或18位)
     * @param item 当前检测的类型
     * @param pattern 当前检测的正则匹配表达式（默认值：DATA_REGEX_PATTERN.idcard）
     * @returns {Boolean} 如果为身份证号则返回true, 否则返回false
     */

  }, {
    key: "isIdCard",
    value: function isIdCard(item) {
      var pattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.DATA_REGEX_PATTERN.idcard;
      return _data_core._match(item, pattern);
    }
    /**
     * @method 检测密码复杂度规则(支持字母数字/字母数字特殊字符/大小写字母特殊字符)
     * @param item 当前检测的类型
     * @param options 当前检测密码复杂度的配置选项(默认值:{ pattern: DATA_REGEX_PATTERN.letterNumberChar, min: 8, max: 30 })
     * @returns {Boolean} 如果为合法密码则返回true, 否则返回false
     */

  }, {
    key: "isValidPassword",
    value: function isValidPassword(item) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _default = {
        pattern: _constants.DATA_REGEX_PATTERN.letterNumberChar,
        min: 8,
        max: 30
      };

      var _options = _objectSpread(_objectSpread({}, _default), options);

      return _data_core._match(item, _options.pattern.replace("{min,max}", "{".concat(_options.min, ",").concat(_options.max, "}")));
    }
    /**
     * @method 检测当前日期是否合法
     * @param item 当前检测的类型
     * @returns {Boolean} 如果为合法日期则返回true, 否则返回false
     */

  }, {
    key: "isValidDate",
    value: function isValidDate(item) {
      return item instanceof Date && !isNaN(item.getTime());
    }
    /**
     * @method 检测当前数据是0而非null,undefined
     * @param item 当前检测的类型
     * @returns {Boolean} 如果为真或0则返回true, 否则返回false
     */

  }, {
    key: "isTrueOrZero",
    value: function isTrueOrZero(item) {
      return item || item == 0 || item === '0';
    }
  }]);

  return DataType;
}();

exports.DataType = DataType;