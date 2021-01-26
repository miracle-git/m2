/**
 * @file DataType
 * @description 基于数据类型基础类
 */
import { DATA_REGEX_PATTERN } from '../constants'

const _data_core = {
  _is: (type, primitive = false) => {
    return function (obj) {
      return primitive ? typeof obj === type.toLowerCase() : {}.toString.call(obj) === '[object ' + type + ']'
    }
  },
  _match: (item, pattern) => {
    const regex = new RegExp(pattern)
    return regex.test(item)
  },
  _isWindow: (item) => {
    return item && typeof item === 'object' && 'setInterval' in item
  },
  _hasOwn: Object.prototype.hasOwnProperty
}
export class DataType {
  /**
   * @method 检测当前类型是否为对象
   * @param item 当前检测的类型
   * @returns {Boolean} 如果为对象则返回true, 否则返回false
   */
  static isObject(item) {
    return _data_core._is('Object')(item)
  }
  /**
   * @method 检测当前类型是否为普通对象(非window或系统对象)
   * @param item 当前检测的类型
   * @returns {Boolean} 如果为普通对象则返回true, 否则返回false
   */
  static isPlainObject(item) {
    const { _is, _isWindow, _hasOwn } = _data_core;
    if (!item || !_is('Object')(item) || _isWindow(item) || item.nodeType) {
      return false
    }
    // 兼容IE
    try {
      if (item.constructor && !_hasOwn.call(item, 'constructor')
        && !_hasOwn.call(item.constructor.prototype, 'isPrototypeOf')) {
        return false
      }
    } catch (e) {
      return false
    }
    let key
    // for (key in item) {}
    return key === undefined || _hasOwn.call(item, key)
  }
  /**
   * @method 检测当前类型是否为空对象
   * @param item 当前检测的类型
   * @returns {Boolean} 如果为空数组则返回true, 否则返回false
   */
  static isEmptyObject(item) {
    return !item || (this.isObject(item) && Object.keys(item).length === 0)
  }
  /**
   * @method 检测当前类型是否为数组
   * @param item 当前检测的类型
   * @returns {Boolean} 如果为数组则返回true, 否则返回false
   */
  static isArray(item) {
    return Array.isArray(item) || _data_core._is('Array')(item)
  }
  /**
   * @method 检测当前类型是否为空数组
   * @param item 当前检测的类型
   * @returns {Boolean} 如果为空数组则返回true, 否则返回false
   */
  static isEmptyArray(item) {
    return !item || (this.isArray(item) && item.length === 0)
  }
  /**
   * @method 检测当前类型是否为函数
   * @param item 当前检测的类型
   * @returns {Boolean} 如果为函数则返回true, 否则返回false
   */
  static isFunction(item) {
    return _data_core._is('Function')(item)
  }
  /**
   * @method 检测当前类型是否为空函数
   * @param item 当前检测的类型
   * @returns {Boolean} 如果为空函数则返回true, 否则返回false
   */
  static isEmptyFunction(item) {
    if (!item) return true
    const str = item.toString().replace(/\s/g, '')
    return DataType.isFunction(item) && (str === 'functionEMPTY_FUNC(){}' || str === 'function(){}' || str === '()=>{}')
  }
  /**
   * @method 检测当前类型是否为字符串
   * @param item 当前检测的类型
   * @returns {Boolean} 如果为字符串则返回true, 否则返回false
   */
  static isString(item) {
    return _data_core._is('String', true)(item)
  }
  /**
   * @method 检测当前类型是否为数字
   * @param item 当前检测的类型
   * @returns {Boolean} 如果为数字则返回true, 否则返回false
   */
  static isNumber(item) {
    return _data_core._is('Number', true)(item)
  }
  /**
   * @method 检测当前类型是否为布尔
   * @param item 当前检测的类型
   * @returns {Boolean} 如果为布尔则返回true, 否则返回false
   */
  static isBoolean(item) {
    return _data_core._is('Boolean', true)(item)
  }
  /**
   * @method 检测当前类型是否为Guid对象
   * @param item 当前检测的类型
   * @returns {Boolean} 如果为Guid则返回true, 否则返回false
   */
  static isGuid(item) {
    return _data_core._match(item, DATA_REGEX_PATTERN.guid)
  }
  /**
   * @method 检测当前类型是否为手机号码
   * @param item 当前检测的类型
   * @param pattern 当前检测的正则匹配表达式（默认值：DATA_REGEX_PATTERN.mobile）
   * @returns {Boolean} 如果为手机号码则返回true, 否则返回false
   */
  static isMobilePhone(item, pattern = DATA_REGEX_PATTERN.mobile) {
    return _data_core._match(item, pattern)
  }
  /**
   * @method 检测当前类型是否为座机号码
   * @param item 当前检测的类型
   * @param pattern 当前检测的正则匹配表达式（默认值：DATA_REGEX_PATTERN.tel）
   * @returns {Boolean} 如果为座机号码则返回true, 否则返回false
   */
  static isTelPhone(item, pattern = DATA_REGEX_PATTERN.tel) {
    return _data_core._match(item, pattern)
  }
  /**
   * @method 检测当前类型是否为电话号码(手机或座机)
   * @param item 当前检测的类型
   * @param {Object} {mobile} 当前检测手机的正则匹配表达式（默认值：DATA_REGEX_PATTERN.mobile）
   * @param {Object} {tel} 当前检测座机的正则匹配表达式（默认值：DATA_REGEX_PATTERN.tel）
   * @returns {Boolean} 如果为电话号码则返回true, 否则返回false
   */
  static isPhone(item, { mobile = DATA_REGEX_PATTERN.mobile, tel = DATA_REGEX_PATTERN.tel } = {}) {
    return this.isMobilePhone(item, mobile) || this.isTelPhone(item, tel)
  }
  /**
   * @method 检测当前类型是否为电子邮件
   * @param item 当前检测的类型
   * @param pattern 当前检测的正则匹配表达式（默认值：DATA_REGEX_PATTERN.email）
   * @returns {Boolean} 如果为电子邮件则返回true, 否则返回false
   */
  static isEmail(item, pattern = DATA_REGEX_PATTERN.email) {
    return _data_core._match(item, pattern)
  }
  /**
   * @method 检测当前类型是否为身份证号(支持15位或18位)
   * @param item 当前检测的类型
   * @param pattern 当前检测的正则匹配表达式（默认值：DATA_REGEX_PATTERN.idcard）
   * @returns {Boolean} 如果为身份证号则返回true, 否则返回false
   */
  static isIdCard(item, pattern = DATA_REGEX_PATTERN.idcard) {
    return _data_core._match(item, pattern)
  }
  /**
   * @method 检测密码复杂度规则(支持字母数字/字母数字特殊字符/大小写字母特殊字符)
   * @param item 当前检测的类型
   * @param options 当前检测密码复杂度的配置选项(默认值:{ pattern: DATA_REGEX_PATTERN.letterNumberChar, min: 8, max: 30 })
   * @returns {Boolean} 如果为合法密码则返回true, 否则返回false
   */
  static isValidPassword(item, options = {}) {
    const _default = { pattern: DATA_REGEX_PATTERN.letterNumberChar, min: 8, max: 30 }
    const _options = { ..._default, ...options }
    return _data_core._match(item, _options.pattern.replace(`{min,max}`, `{${_options.min},${_options.max}}`))
  }
  /**
   * @method 检测当前日期是否合法
   * @param item 当前检测的类型
   * @returns {Boolean} 如果为合法日期则返回true, 否则返回false
   */
  static isValidDate(item) {
    return item instanceof Date && !isNaN(item.getTime())
  }
  /**
   * @method 检测当前数据是0而非null,undefined
   * @param item 当前检测的类型
   * @returns {Boolean} 如果为真或0则返回true, 否则返回false
   */
  static isTrueOrZero(item) {
    return item || item == 0 || item === '0'
  }
}
