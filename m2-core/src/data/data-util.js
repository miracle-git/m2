/**
 * @file DataUtil
 * @description 基于业务数据处理工具类(字典，时间等)
 */
import { DATA_SEPARATOR, DATE_FORMATTER, LETTER_CASE, DATA_REGEX_PATTERN } from '../constants'
import { DataType } from './data-type'

export class DataUtil {
  /**
   * @method 获取指定类型的字典中所有的项目
   * @param {Array} dict 当前字典数据源(一般为字典数组集合)
   * @param {String} type 字典类型
   * @param {Object} args 扩展配置参数(可配置字段名称)
   * @desc 如当前的字典数据源不存在或未找到指定的字典类型，则都返回空数组
   * @returns {Array} 返回对应字典类型的[{key,value}]
   */
  static getDictItems(dict, type, { typeName = 'type', itemsName = 'items' } = {}) {
    if (!dict || !type) return []
    const dictType = dict.find(item => item[typeName] === type)
    return dictType && dictType[itemsName] ? dictType[itemsName] : []
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
  static getDictValue(dict, type, key, {
    separator = DATA_SEPARATOR.comma,
    typeName = 'type',
    itemsName = 'items',
    keyName = 'key',
    valueName = 'value'
  } = {}) {
    if (!dict || !type || (!key && key !== '0' && key !== false)) return key
    const dictType = dict.find(item => item[typeName] === type)
    if (!dictType) return key
    if (DataType.isArray(key)) {
      const dictItem = dictType[itemsName].filter(item => key.indexOf(item[keyName]) > -1)
      return dictItem.map(item => item[valueName]).join(separator)
    } else {
      if (DataType.isBoolean(key)) {
        key = key ? '1' : '0'
      }
      const dictItem = dictType[itemsName].find(item => item[keyName] === key)
      return dictItem ? dictItem[valueName] : key
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
  static extend(target, source, deep = true) {
    // 如为浅拷贝(只支持对象或者数组的的拷贝)，则直接返回本身
    if (!deep || (!DataType.isPlainObject(source) && !DataType.isArray(source))) return source
    for (const prop in source) {
      const isPlainObjectForSourceProp = DataType.isPlainObject(source[prop])
      const isPlainObjectForTargetProp = DataType.isPlainObject(target[prop])
      const isArrayForSourceProp = DataType.isArray(source[prop])
      const isArrayForTargetProp = DataType.isArray(target[prop])
      if (deep && (isPlainObjectForSourceProp || isArrayForSourceProp)) {
        if (isPlainObjectForSourceProp && !isPlainObjectForTargetProp) {
          target[prop] = {}
        }
        if (isArrayForSourceProp && !isArrayForTargetProp) {
          target[prop] = []
        }
        this.extend(target[prop], source[prop], deep)
      } else if (source[prop] !== undefined) {
        target[prop] = source[prop]
      }
    }
    return target
  }
  /**
   * @method 对指定的数据类型(数组或对象)进行拷贝
   * @param {Array|Object} item 拷贝的来源（对象或数组）
   * @param {Object} {deep,toArray} 扩展配置参数
   * @desc {Boolean} {deep} 是否进行深拷贝（默认：true）
   * @desc {Boolean} {asArray} 拷贝之后是否转化为数组（仅仅只针对对象拷贝，默认：false）
   * @returns {Array|Object} 返回拷贝之后的类型
   */
  static clone(item, { deep = true, asArray = false } = {}) {
    if (DataType.isArray(item)) {
      const target = this.extend([], item, deep)
      return target
    } else if (DataType.isObject(item)) {
      const target = this.extend({}, item, deep)
      return asArray ? [target] : target
    }
    return asArray ? [item] : item
  }
  /**
   * @method 获取指定长度的随机字符串
   * @param {Number} len 指定长度(默认：32)
   * @returns {String} 返回对应的随机字符串
   */
  static randomString(len = 32) {
    // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
    const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    const maxPos = $chars.length
    let result = ''
    for (let i = 0; i < len; i++) {
      result += $chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return result.toLowerCase()
  }

  /**
   * @method 获取介于最小值和最大值之间的随机数
   * @param {Number} min 最小值
   * @param {Number} max 最大值
   * @returns {Number} 返回对应的随机数
   */
  static randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }
  /**
   * @method 获取介于最小值和最大值之间的随机颜色
   * @param {Number} min 最小值
   * @param {Number} max 最大值
   * @returns {String} 返回对应的随机颜色
   */
  static randomColor(min, max) {
    const r = DataUtil.randomNumber(min, max)
    const g = DataUtil.randomNumber(min, max)
    const b = DataUtil.randomNumber(min, max)
    return `rgb(${r},${g},${b})`
  }
  /**
   * @method 获取最近的一年12个月
   * @param {Object} {separator,current} 年月分隔符,是否包含当前月
   * @returns {String} 返回格式化之后的月份
   */
  static getLast12Months({ separator = DATA_SEPARATOR.hyphen, current = true } = {}) {
    const result = []
    const date = new Date()
    date.setMonth(current ? date.getMonth() + 1 : date.getMonth(), 1) // 获取到当前月份,设置月份
    for (let i = 0; i < 12; i++) {
      date.setMonth(date.getMonth() - 1) // 每次循环一次 月份值减1
      let month = date.getMonth() + 1
      month = month < 10 ? '0' + month : month
      result.push(date.getFullYear() + separator + (month))
    }
    return result
  }
  /**
   * @method 获取带星号的文本
   * @param String item 当前需要处理的文本
   * @param {Object} {stars,ignore,before,after} 添加多少个星号,是否不处理(原文返回),星号前导字符数,星号后导字符数
   * @returns {String} 返回处理之后的文本
   */
  static getSecureText(item, { stars = 4, ignore = false, before = 3, after = 4 } = {}) {
    const len = item.length
    if (stars <= 0 || len < stars + before + after || ignore) {
      return item
    }
    let secure = ''
    for (let i = 1; i <= stars; i++) {
      secure += '*'
    }

    const pattern = DATA_REGEX_PATTERN.secure.replace('{before}', `{${before}}`).replace('{after}', `{${after}}`)
    return item.replace(new RegExp(pattern), '$1' + secure + '$2')
  }
  /**
   * @method 获取所有的数字
   */
  static getAllNumbers() {
    return '0,1,2,3,4,5,6,7,8,9'.split(',')
  }
  /**
   * @method 获取所有的字母
   */
  static getAllLetters() {
    return 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'.split(',')
  }
  /**
   * @method 为当前数据类型提供默认值
   * @param item 当前数据类型
   * @param defaultValue 默认值
   * @returns {Boolean} 如果当前数据类型未定义，则将返回默认值
   */
  static defaultVal(item, defaultValue) {
    return item === undefined ? defaultValue : item
  }
  /**
   * @method 获取指定对象/数组指定列对应的数组或对象
   * @param source 当前指定的数组或对象
   * @param {Array} props 指定的列(可多列)
   * @returns {Array|Object} 返回指定列对应的数组或对象
   */
  static pick(source, ...props) {
    const _props = DataType.isArray(props) ? props[0] : props
    const _pickProps = (current, props) => props.reduce((prop, val) =>
      (val in current && (prop[val] = current[val]), prop), {})
    if (DataType.isObject(source)) {
      return _pickProps(source, _props)
    }
    if (DataType.isArray(source)) {
      return source.map(item => _pickProps(item, _props))
    }
    return source
  }
  /**
   * @method 合并一个解构后的对象数组和指定的对象
   * @param {Array} 当前对象数组
   * @param {Object} object 当前指定的对象
   * @returns {Object} 合并后的新对象
   */
  static merge(arr= [], obj= {}) {
    if (!DataType.isArray(arr) || !DataType.isObject(obj)) return
    return arr.reduce((res, item) => ({...res, ...item}), obj)
  }
  /**
   * @method 将字符串按大小字母分隔并返回(大写，小写，原样)
   * @param {String} item 当前指定的字符串
   * @param {Object} separator 分隔符（默认：_）
   * @param {Object} letterCase 以哪种形式返回（默认: 'upper', 也可为lower,other）
   * @returns {Array} 返回操作后的字符串
   */
  static uncamelize(item, { separator = DATA_SEPARATOR.underline, letterCase = LETTER_CASE.Upper } = {}) {
    if (!this.isString(item)) return item
    const result = item.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
      .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
    if (letterCase === LETTER_CASE.Upper) {
      return result.toUpperCase()
    } else if (letterCase === LETTER_CASE.Lower) {
      return result.toLowerCase()
    } else {
      return result
    }
  }
  /**
   * @method 将字符串首字母大写并返回
   * @param {String} item 当前指定的字符串
   * @returns {String} 返回操作后的字符串
   */
  static toUpperFirst(item) {
    if (!item || !DataType.isString(item)) return item
    return item.charAt(0).toUpperCase() + item.slice(1)
  }
  /**
   * @method 页面hash跳转
   * @param {String} url 当前跳转的url
   * @desc 如当前参数url不以#开头，则将自动添加#
   * @throws 如当前参数url为空或非字符串类型，则不会跳转并打印错误
   */
  static redirect(url) {
    if (!url || !DataType.isString(url)) {
      // console.error(`当前地址: ${url} 不合法，无法跳转!`);
      return
    }
    if (!url.startsWith('#')) {
      url = '#' + url
    }
    window.location.hash = url
  }
  /**
   * @method 获取Url中Hash值（#到？之间的值）
   * @param {String} url 当前的Url
   * @returns {String} Hash字符串值
   * @desc 如当前参数routeUrl为空，则自动获取当前Url
   */
  static getHashValue(url = '') {
    url = url || window.location.hash
    return url.replace(/#|\?.*$/, '')
  }
  /**
   * @method 获取Url中指定名称的查询字符串值（QueryString）
   * @param {String} name 指定的查询字符串名称(key)
   * @param {String} url 当前的Url
   * @returns {String} 查询字符串值(key对应的value)
   * @desc 如当前参数routeUrl为空，则自动获取当前Url
   */
  static getQueryValue(name, url = '') {
    url = url || window.location.search
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
    const matches = url.substr(1).match(reg)
    return matches ? unescape(matches[2]) : ''
  }
  /**
   * @method 获取url字符串问号之后的值并转化为对象
   * @param {String} str 当前url字符串
   * @returns {Object} 查询字符串对象
   */
  static getUrlQuery(str) {
    if (!str || !DataType.isString(str) || str.indexOf('?') === -1) return
    const arr = str.split('?')[1].split('&')
    return arr.reduce((res, item) => {
      const query = item.split('=')
      res = { ...res, [query[0]]: encodeURIComponent(query[1]) }
      return res
    }, {})
  }
  /**
   * @method 数字千分位格式化
   * @param {Number} money 数值
   * @param {Number} precision 小数位精度(默认为2)
   * @returns {String} 格式化后的字符串
   */
  static formatMoney(money, precision = 2) {
    if (isNaN(money)) return ''
    let [temp, digit, integer, buffer, positive] = [0.00, 0, 0, [], true]
    const _zero = (val, len) => {
      const _temp = val.toString()
      const _buffer = []
      for (let i = 0, loop = len - _temp.length; i < loop; i++) {
        _buffer.push('0');
      }
      _buffer.push(_temp);
      return _buffer.join('')
    }
    // 取出正负号
    positive = (money >= 0)
    // 强制转换为绝对值数浮点
    temp = (isNaN(temp = parseFloat(money))) ? 0 : Math.abs(temp)
    // 所有内容用正数规则处理
    // 分离整数部分
    integer = parseInt(temp)
    // 分离小数部分(四舍五入)
    digit = parseInt((temp - integer) * Math.pow(10, precision) + 0.5)

    do {
      buffer.unshift(_zero(integer % 1000, 3))
    } while ((integer = parseInt(integer / 1000)))
    // 最高段区去掉前导0
    buffer[0] = parseInt(buffer[0]).toString()
    return ((positive) ? '' : '-') + buffer.join(',') + (precision > 0 ? ('.' + _zero(digit, precision)) : '')
  }
  /**
   * @method 将千分位格式的数字字符串转换为浮点数
   * @param {String} money 数值字符串
   * @returns {Number} 转化后的浮点数
   */
  static unformatMoney(money) {
    const temp = parseFloat(money.replace(/,/g, ''))
    return (isNaN(temp) ? 0 : temp)
  }
  /**
   * @method 格式化日期
   * @param {Date} date 格式化date时间戳
   * @param {String} format 格式化规则
   * @returns {String} 转化后的日期
   */
  static formatDate(date, format = DATE_FORMATTER.date) {
    if (DataType.isNumber(date)) date = new Date(date * 1000)
    if (!DataType.isValidDate(date)) return date
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours() > 12 ? date.getHours() - 12 : date.getHours(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(format)) {
        let str = o[k] + ''
        format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
      }
    }
    return format
  }
  /**
   * @method 格式化日期时间
   * @param {Date} date 格式化date时间戳
   * @param {String} format 格式化规则
   * @returns {String} 转化后的日期
   */
  static formatDateTime(date, format = DATE_FORMATTER.datetime) {
    return this.formatDate(date, format)
  }
  /**
   * @method 格式化日期时间(去秒)
   * @param {Date} date 格式化date时间戳
   * @param {String} format 格式化规则
   * @returns {String} 转化后的日期
   */
  static formatShortDateTime(date, format = DATE_FORMATTER.datetimeShort) {
    return this.formatDate(date, format)
  }
  /**
   * @method 格式化时间
   * @param {Date} date 格式化date时间戳
   * @param {String} format 格式化规则
   * @returns {String} 转化后的日期
   */
  static formatTime(date, format = DATE_FORMATTER.time) {
    return this.formatDate(date, format)
  }
  /**
   * @method 格式化时间(去秒)
   * @param {Date} date 格式化date时间戳
   * @param {String} format 格式化规则
   * @returns {String} 转化后的日期
   */
  static formatShortTime(date, format = DATE_FORMATTER.timeShort) {
    return this.formatDate(date, format)
  }
  /**
   * @method 字符串前导补0
   * @param {String} str 需要补0的字符串
   * @returns {String} 格式化后的字符串
   */
  static padLeftZero(str) {
    return ('00' + str).substr(str.length)
  }
  /**
   * @method 下载文件
   * @param {String} data 当前文件附件数据
   * @param {String} file 下载文件名称
   */
  static downloadFile(data, file) {
    if (!data) return
    const blob = new Blob([data])
    const link = document.createElement('a')
    const url = window.URL.createObjectURL(blob)
    link.href = url
    link.download = file
    link.click()
    window.URL.revokeObjectURL(url)
  }
}
