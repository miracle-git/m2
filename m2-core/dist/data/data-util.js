"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataUtil = void 0;

var _constants = require("../constants");

var _dataType = require("./data-type");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DataUtil = /*#__PURE__*/function () {
  function DataUtil() {
    _classCallCheck(this, DataUtil);
  }

  _createClass(DataUtil, null, [{
    key: "getDictItems",

    /**
     * @method 获取指定类型的字典中所有的项目
     * @param {Array} dict 当前字典数据源(一般为字典数组集合)
     * @param {String} type 字典类型
     * @param {Object} args 扩展配置参数(可配置字段名称)
     * @desc 如当前的字典数据源不存在或未找到指定的字典类型，则都返回空数组
     * @returns {Array} 返回对应字典类型的[{key,value}]
     */
    value: function getDictItems(dict, type) {
      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref$typeName = _ref.typeName,
          typeName = _ref$typeName === void 0 ? 'type' : _ref$typeName,
          _ref$itemsName = _ref.itemsName,
          itemsName = _ref$itemsName === void 0 ? 'items' : _ref$itemsName;

      if (!dict || !type) return [];
      var dictType = dict.find(function (item) {
        return item[typeName] === type;
      });
      return dictType && dictType[itemsName] ? dictType[itemsName] : [];
    }
    /**
     * @method 获取指定类型的字典中对应key的值
     * @param {Array} dict 当前字典数据源(一般为字典数组集合)
     * @param {String} type 字典类型
     * @param {String} key 指定的key值(一般为服务器下发))
     * @param {Object} args 扩展配置参数(可配置字段名称)
     * @desc 如当前的字典数据源不存在或未找到指定的字典类型或未找到字典中指定的key，则都返回当前key值
     * @returns {String} 返回字典key对应的value值
     */

  }, {
    key: "getDictValue",
    value: function getDictValue(dict, type, key) {
      var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
          _ref2$separator = _ref2.separator,
          separator = _ref2$separator === void 0 ? _constants.DATA_SEPARATOR.comma : _ref2$separator,
          _ref2$typeName = _ref2.typeName,
          typeName = _ref2$typeName === void 0 ? 'type' : _ref2$typeName,
          _ref2$itemsName = _ref2.itemsName,
          itemsName = _ref2$itemsName === void 0 ? 'items' : _ref2$itemsName,
          _ref2$keyName = _ref2.keyName,
          keyName = _ref2$keyName === void 0 ? 'key' : _ref2$keyName,
          _ref2$valueName = _ref2.valueName,
          valueName = _ref2$valueName === void 0 ? 'value' : _ref2$valueName;

      if (!dict || !type || !key && key !== '0' && key !== false) return key;
      var dictType = dict.find(function (item) {
        return item[typeName] === type;
      });
      if (!dictType) return key;

      if (_dataType.DataType.isArray(key)) {
        var dictItem = dictType[itemsName].filter(function (item) {
          return key.indexOf(item[keyName]) > -1;
        });
        return dictItem.map(function (item) {
          return item[valueName];
        }).join(separator);
      } else {
        if (_dataType.DataType.isBoolean(key)) {
          key = key ? '1' : '0';
        }

        var _dictItem = dictType[itemsName].find(function (item) {
          return item[keyName] === key;
        });

        return _dictItem ? _dictItem[valueName] : key;
      }
    }
    /**
     * @method 扩展(拷贝)已有的数据类型(数组或对象)
     * @param {Array|Object} target 拷贝的目标（对象或数组，依赖于拷贝来源）
     * @param {Array|Object} source 拷贝的来源（对象或数组）
     * @param {Boolean} deep 是否进行深拷贝（默认：true）
     * @desc 只能对数组或对象进行深拷贝，其他数据类型都只能完成浅拷贝
     * @returns {Array|Object} 返回扩展(拷贝)之后的类型
     */

  }, {
    key: "extend",
    value: function extend(target, source) {
      var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      // 如为浅拷贝(只支持对象或者数组的的拷贝)，则直接返回本身
      if (!deep || !_dataType.DataType.isPlainObject(source) && !_dataType.DataType.isArray(source)) return source;

      for (var prop in source) {
        var isPlainObjectForSourceProp = _dataType.DataType.isPlainObject(source[prop]);

        var isPlainObjectForTargetProp = _dataType.DataType.isPlainObject(target[prop]);

        var isArrayForSourceProp = _dataType.DataType.isArray(source[prop]);

        var isArrayForTargetProp = _dataType.DataType.isArray(target[prop]);

        if (deep && (isPlainObjectForSourceProp || isArrayForSourceProp)) {
          if (isPlainObjectForSourceProp && !isPlainObjectForTargetProp) {
            target[prop] = {};
          }

          if (isArrayForSourceProp && !isArrayForTargetProp) {
            target[prop] = [];
          }

          this.extend(target[prop], source[prop], deep);
        } else if (source[prop] !== undefined) {
          target[prop] = source[prop];
        }
      }

      return target;
    }
    /**
     * @method 对指定的数据类型(数组或对象)进行拷贝
     * @param {Array|Object} item 拷贝的来源（对象或数组）
     * @param {Object} {deep,toArray} 扩展配置参数
     * @desc {Boolean} {deep} 是否进行深拷贝（默认：true）
     * @desc {Boolean} {asArray} 拷贝之后是否转化为数组（仅仅只针对对象拷贝，默认：false）
     * @returns {Array|Object} 返回拷贝之后的类型
     */

  }, {
    key: "clone",
    value: function clone(item) {
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref3$deep = _ref3.deep,
          deep = _ref3$deep === void 0 ? true : _ref3$deep,
          _ref3$asArray = _ref3.asArray,
          asArray = _ref3$asArray === void 0 ? false : _ref3$asArray;

      if (_dataType.DataType.isArray(item)) {
        var target = this.extend([], item, deep);
        return target;
      } else if (_dataType.DataType.isObject(item)) {
        var _target = this.extend({}, item, deep);

        return asArray ? [_target] : _target;
      }

      return asArray ? [item] : item;
    }
    /**
     * @method 获取指定长度的随机字符串
     * @param {Number} len 指定长度(默认：32)
     * @returns {String} 返回对应的随机字符串
     */

  }, {
    key: "randomString",
    value: function randomString() {
      var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;
      // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
      var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
      var maxPos = $chars.length;
      var result = '';

      for (var i = 0; i < len; i++) {
        result += $chars.charAt(Math.floor(Math.random() * maxPos));
      }

      return result.toLowerCase();
    }
    /**
     * @method 获取介于最小值和最大值之间的随机数
     * @param {Number} min 最小值
     * @param {Number} max 最大值
     * @returns {Number} 返回对应的随机数
     */

  }, {
    key: "randomNumber",
    value: function randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    /**
     * @method 获取介于最小值和最大值之间的随机颜色
     * @param {Number} min 最小值
     * @param {Number} max 最大值
     * @returns {String} 返回对应的随机颜色
     */

  }, {
    key: "randomColor",
    value: function randomColor(min, max) {
      var r = DataUtil.randomNumber(min, max);
      var g = DataUtil.randomNumber(min, max);
      var b = DataUtil.randomNumber(min, max);
      return "rgb(".concat(r, ",").concat(g, ",").concat(b, ")");
    }
    /**
     * @method 获取最近的一年12个月
     * @param {Object} {separator,current} 年月分隔符,是否包含当前月
     * @returns {String} 返回格式化之后的月份
     */

  }, {
    key: "getLast12Months",
    value: function getLast12Months() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref4$separator = _ref4.separator,
          separator = _ref4$separator === void 0 ? _constants.DATA_SEPARATOR.hyphen : _ref4$separator,
          _ref4$current = _ref4.current,
          current = _ref4$current === void 0 ? true : _ref4$current;

      var result = [];
      var date = new Date();
      date.setMonth(current ? date.getMonth() + 1 : date.getMonth(), 1); // 获取到当前月份,设置月份

      for (var i = 0; i < 12; i++) {
        date.setMonth(date.getMonth() - 1); // 每次循环一次 月份值减1

        var month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        result.push(date.getFullYear() + separator + month);
      }

      return result;
    }
    /**
     * @method 获取带星号的文本
     * @param String item 当前需要处理的文本
     * @param {Object} {stars,ignore,before,after} 添加多少个星号,是否不处理(原文返回),星号前导字符数,星号后导字符数
     * @returns {String} 返回处理之后的文本
     */

  }, {
    key: "getSecureText",
    value: function getSecureText(item) {
      var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref5$stars = _ref5.stars,
          stars = _ref5$stars === void 0 ? 4 : _ref5$stars,
          _ref5$ignore = _ref5.ignore,
          ignore = _ref5$ignore === void 0 ? false : _ref5$ignore,
          _ref5$before = _ref5.before,
          before = _ref5$before === void 0 ? 3 : _ref5$before,
          _ref5$after = _ref5.after,
          after = _ref5$after === void 0 ? 4 : _ref5$after;

      var len = item.length;

      if (stars <= 0 || len < stars + before + after || ignore) {
        return item;
      }

      var secure = '';

      for (var i = 1; i <= stars; i++) {
        secure += '*';
      }

      var pattern = _constants.DATA_REGEX_PATTERN.secure.replace('{before}', "{".concat(before, "}")).replace('{after}', "{".concat(after, "}"));

      return item.replace(new RegExp(pattern), '$1' + secure + '$2');
    }
    /**
     * @method 获取所有的数字
     */

  }, {
    key: "getAllNumbers",
    value: function getAllNumbers() {
      return '0,1,2,3,4,5,6,7,8,9'.split(',');
    }
    /**
     * @method 获取所有的字母
     */

  }, {
    key: "getAllLetters",
    value: function getAllLetters() {
      return 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'.split(',');
    }
    /**
     * @method 为当前数据类型提供默认值
     * @param item 当前数据类型
     * @param defaultValue 默认值
     * @returns {Boolean} 如果当前数据类型未定义，则将返回默认值
     */

  }, {
    key: "defaultVal",
    value: function defaultVal(item, defaultValue) {
      return item === undefined ? defaultValue : item;
    }
    /**
     * @method 获取指定对象/数组指定列对应的数组或对象
     * @param source 当前指定的数组或对象
     * @param {Array} props 指定的列(可多列)
     * @returns {Array|Object} 返回指定列对应的数组或对象
     */

  }, {
    key: "pick",
    value: function pick(source) {
      for (var _len = arguments.length, props = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        props[_key - 1] = arguments[_key];
      }

      var _props = _dataType.DataType.isArray(props) ? props[0] : props;

      var _pickProps = function _pickProps(current, props) {
        return props.reduce(function (prop, val) {
          return val in current && (prop[val] = current[val]), prop;
        }, {});
      };

      if (_dataType.DataType.isObject(source)) {
        return _pickProps(source, _props);
      }

      if (_dataType.DataType.isArray(source)) {
        return source.map(function (item) {
          return _pickProps(item, _props);
        });
      }

      return source;
    }
    /**
     * @method 合并一个解构后的对象数组和指定的对象
     * @param {Array} 当前对象数组
     * @param {Object} object 当前指定的对象
     * @returns {Object} 合并后的新对象
     */

  }, {
    key: "merge",
    value: function merge() {
      var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!_dataType.DataType.isArray(arr) || !_dataType.DataType.isObject(obj)) return;
      return arr.reduce(function (res, item) {
        return _objectSpread(_objectSpread({}, res), item);
      }, obj);
    }
    /**
     * @method 将字符串按大小字母分隔并返回(大写，小写，原样)
     * @param {String} item 当前指定的字符串
     * @param {Object} separator 分隔符（默认：_）
     * @param {Object} letterCase 以哪种形式返回（默认: 'upper', 也可为lower,other）
     * @returns {Array} 返回操作后的字符串
     */

  }, {
    key: "uncamelize",
    value: function uncamelize(item) {
      var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref6$separator = _ref6.separator,
          separator = _ref6$separator === void 0 ? _constants.DATA_SEPARATOR.underline : _ref6$separator,
          _ref6$letterCase = _ref6.letterCase,
          letterCase = _ref6$letterCase === void 0 ? _constants.LETTER_CASE.Upper : _ref6$letterCase;

      if (!this.isString(item)) return item;
      var result = item.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2').replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2');

      if (letterCase === _constants.LETTER_CASE.Upper) {
        return result.toUpperCase();
      } else if (letterCase === _constants.LETTER_CASE.Lower) {
        return result.toLowerCase();
      } else {
        return result;
      }
    }
    /**
     * @method 将字符串首字母大写并返回
     * @param {String} item 当前指定的字符串
     * @returns {String} 返回操作后的字符串
     */

  }, {
    key: "toUpperFirst",
    value: function toUpperFirst(item) {
      if (!item || !_dataType.DataType.isString(item)) return item;
      return item.charAt(0).toUpperCase() + item.slice(1);
    }
    /**
     * @method 页面hash跳转
     * @param {String} url 当前跳转的url
     * @desc 如当前参数url不以#开头，则将自动添加#
     * @throws 如当前参数url为空或非字符串类型，则不会跳转并打印错误
     */

  }, {
    key: "redirect",
    value: function redirect(url) {
      if (!url || !_dataType.DataType.isString(url)) {
        // console.error(`当前地址: ${url} 不合法，无法跳转!`);
        return;
      }

      if (!url.startsWith('#')) {
        url = '#' + url;
      }

      window.location.hash = url;
    }
    /**
     * @method 获取Url中Hash值（#到？之间的值）
     * @param {String} url 当前的Url
     * @returns {String} Hash字符串值
     * @desc 如当前参数routeUrl为空，则自动获取当前Url
     */

  }, {
    key: "getHashValue",
    value: function getHashValue() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      url = url || window.location.hash;
      return url.replace(/#|\?.*$/, '');
    }
    /**
     * @method 获取Url中指定名称的查询字符串值（QueryString）
     * @param {String} name 指定的查询字符串名称(key)
     * @param {String} url 当前的Url
     * @returns {String} 查询字符串值(key对应的value)
     * @desc 如当前参数routeUrl为空，则自动获取当前Url
     */

  }, {
    key: "getQueryValue",
    value: function getQueryValue(name) {
      var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      url = url || window.location.search;
      var reg = new RegExp("(^|&)".concat(name, "=([^&]*)(&|$)"), 'i');
      var matches = url.substr(1).match(reg);
      return matches ? unescape(matches[2]) : '';
    }
    /**
     * @method 获取url字符串问号之后的值并转化为对象
     * @param {String} str 当前url字符串
     * @returns {Object} 查询字符串对象
     */

  }, {
    key: "getUrlQuery",
    value: function getUrlQuery(str) {
      if (!str || !_dataType.DataType.isString(str) || str.indexOf('?') === -1) return;
      var arr = str.split('?')[1].split('&');
      return arr.reduce(function (res, item) {
        var query = item.split('=');
        res = _objectSpread(_objectSpread({}, res), {}, _defineProperty({}, query[0], encodeURIComponent(query[1])));
        return res;
      }, {});
    }
    /**
     * @method 数字千分位格式化
     * @param {Number} money 数值
     * @param {Number} precision 小数位精度(默认为2)
     * @returns {String} 格式化后的字符串
     */

  }, {
    key: "formatMoney",
    value: function formatMoney(money) {
      var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
      if (isNaN(money)) return '';
      var temp = 0.00,
          digit = 0,
          integer = 0,
          buffer = [],
          positive = true;

      var _zero = function _zero(val, len) {
        var _temp = val.toString();

        var _buffer = [];

        for (var i = 0, loop = len - _temp.length; i < loop; i++) {
          _buffer.push('0');
        }

        _buffer.push(_temp);

        return _buffer.join('');
      }; // 取出正负号


      positive = money >= 0; // 强制转换为绝对值数浮点

      temp = isNaN(temp = parseFloat(money)) ? 0 : Math.abs(temp); // 所有内容用正数规则处理
      // 分离整数部分

      integer = parseInt(temp); // 分离小数部分(四舍五入)

      digit = parseInt((temp - integer) * Math.pow(10, precision) + 0.5);

      do {
        buffer.unshift(_zero(integer % 1000, 3));
      } while (integer = parseInt(integer / 1000)); // 最高段区去掉前导0


      buffer[0] = parseInt(buffer[0]).toString();
      return (positive ? '' : '-') + buffer.join(',') + (precision > 0 ? '.' + _zero(digit, precision) : '');
    }
    /**
     * @method 将千分位格式的数字字符串转换为浮点数
     * @param {String} money 数值字符串
     * @returns {Number} 转化后的浮点数
     */

  }, {
    key: "unformatMoney",
    value: function unformatMoney(money) {
      var temp = parseFloat(money.replace(/,/g, ''));
      return isNaN(temp) ? 0 : temp;
    }
    /**
     * @method 格式化日期
     * @param {Date} date 格式化date时间戳
     * @param {String} format 格式化规则
     * @returns {String} 转化后的日期
     */

  }, {
    key: "formatDate",
    value: function formatDate(date) {
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.DATE_FORMATTER.date;
      if (_dataType.DataType.isNumber(date)) date = new Date(date * 1000);
      if (!_dataType.DataType.isValidDate(date)) return date;

      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
      }

      var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours() > 12 ? date.getHours() - 12 : date.getHours(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      };

      for (var k in o) {
        if (new RegExp("(".concat(k, ")")).test(format)) {
          var str = o[k] + '';
          format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? str : this.padLeftZero(str));
        }
      }

      return format;
    }
    /**
     * @method 格式化日期时间
     * @param {Date} date 格式化date时间戳
     * @param {String} format 格式化规则
     * @returns {String} 转化后的日期
     */

  }, {
    key: "formatDateTime",
    value: function formatDateTime(date) {
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.DATE_FORMATTER.datetime;
      return this.formatDate(date, format);
    }
    /**
     * @method 格式化日期时间(去秒)
     * @param {Date} date 格式化date时间戳
     * @param {String} format 格式化规则
     * @returns {String} 转化后的日期
     */

  }, {
    key: "formatShortDateTime",
    value: function formatShortDateTime(date) {
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.DATE_FORMATTER.datetimeShort;
      return this.formatDate(date, format);
    }
    /**
     * @method 格式化时间
     * @param {Date} date 格式化date时间戳
     * @param {String} format 格式化规则
     * @returns {String} 转化后的日期
     */

  }, {
    key: "formatTime",
    value: function formatTime(date) {
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.DATE_FORMATTER.time;
      return this.formatDate(date, format);
    }
    /**
     * @method 格式化时间(去秒)
     * @param {Date} date 格式化date时间戳
     * @param {String} format 格式化规则
     * @returns {String} 转化后的日期
     */

  }, {
    key: "formatShortTime",
    value: function formatShortTime(date) {
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.DATE_FORMATTER.timeShort;
      return this.formatDate(date, format);
    }
    /**
     * @method 字符串前导补0
     * @param {String} str 需要补0的字符串
     * @returns {String} 格式化后的字符串
     */

  }, {
    key: "padLeftZero",
    value: function padLeftZero(str) {
      return ('00' + str).substr(str.length);
    }
    /**
     * @method 下载文件
     * @param {String} data 当前文件附件数据
     * @param {String} file 下载文件名称
     */

  }, {
    key: "downloadFile",
    value: function downloadFile(data, file) {
      if (!data) return;
      var blob = new Blob([data]);
      var link = document.createElement('a');
      var url = window.URL.createObjectURL(blob);
      link.href = url;
      link.download = file;
      link.click();
      window.URL.revokeObjectURL(url);
    }
  }]);

  return DataUtil;
}();

exports.DataUtil = DataUtil;