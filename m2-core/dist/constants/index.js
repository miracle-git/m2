"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EMPTY_OBJECT = exports.EMPTY_ARRAY = exports.EMPTY_FUNC = exports.APP_INSTANCE_READY = exports.REFRESH_APP_LAYOUT = exports.WINDOW_SCREEN_RESIZE = exports.MFE_SYNC_MENU = exports.DEFAULT_THEME_SETTING = exports.DEFAULT_LANGUAGE_SETTING = exports.DEFAULT_VERIFY_CODE_OPTIONS = exports.VERIFY_CODE_TYPE = exports.DEFAULT_STORAGE_OPTIONS = exports.STORAGE_TYPE = exports.SYMMETRIC_CRYPTO_TYPE = exports.ASYMMETRIC_CRYPTO_TYPE = exports.DEFAULT_FETCH_OPTIONS = exports.LETTER_CASE = exports.CONTENT_TYPE = exports.REQUEST_METHOD = exports.DATA_REGEX_PATTERN = exports.DATE_FORMATTER = exports.DATA_SEPARATOR = void 0;

/**
 * @constant 数据分隔符常量
 */
var DATA_SEPARATOR = {
  ampersand: '&',
  comma: ',',
  colon: ':',
  semicolon: ';',
  bar: '|',
  hyphen: '-',
  at: '@',
  dollar: '$',
  slash: '/',
  backslash: '\\',
  underline: '_',
  whitespace: ' '
};
/**
 * @constant 时间格式化常量
 */

exports.DATA_SEPARATOR = DATA_SEPARATOR;
var DATE_FORMATTER = {
  date: 'yyyy-MM-dd',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  datetimeShort: 'yyyy-MM-dd HH:mm',
  time: 'HH:mm:ss',
  timeShort: 'HH:mm'
};
/**
 * @constant 正则表达式常量
 */

exports.DATE_FORMATTER = DATE_FORMATTER;
var DATA_REGEX_PATTERN = {
  guid: '^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$',
  mobile: '^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\\d{8}$',
  tel: '^(\\d{3,4}-\\d{7,8}-\\d{1,5})|(^\\d{3,4}-\\d{7,8})$',
  email: '^[0-9a-z][_.0-9a-z-]{0,31}@([0-9a-z][0-9a-z-]{0,30}[0-9a-z]\\.){1,4}[a-z]{2,4}$',
  idcard: '^\\d{18,18}|\\d{15,15}|\\d{17,17}x|\\d{17,17}X$',
  secure: '^(.{before})(?:\\w+)(.{after})$',
  letterNumber: '^(?=.*[0-9])(?=.*[a-zA-Z]).{min,max}$',
  letterNumberChar: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{min,max}$',
  letterNumberCharCase: '^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{min,max}$'
};
/**
 * @constant 请求方法常量
 */

exports.DATA_REGEX_PATTERN = DATA_REGEX_PATTERN;
var REQUEST_METHOD = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete'
};
/**
 * @constant 请求数据格式
 */

exports.REQUEST_METHOD = REQUEST_METHOD;
var CONTENT_TYPE = {
  FORM: 'application/x-www-form-urlencoded',
  UPLOAD: 'multipart/form-data',
  JSON: 'application/json'
};
/**
 * @constant 字母格式
 */

exports.CONTENT_TYPE = CONTENT_TYPE;
var LETTER_CASE = {
  Upper: 'upper',
  Lower: 'lower',
  Other: ''
};
/**
 * @constant 请求默认常量
 */

exports.LETTER_CASE = LETTER_CASE;
var DEFAULT_FETCH_OPTIONS = {
  loading: false,
  itemsName: 'list',
  method: REQUEST_METHOD.Get,
  params: {},
  key: false,
  keyLen: 5,
  origin: false
};
/**
 * @constant 非对称加密算法类型
 */

exports.DEFAULT_FETCH_OPTIONS = DEFAULT_FETCH_OPTIONS;
var ASYMMETRIC_CRYPTO_TYPE = {
  MD5: {
    name: 'MD5'
  },
  SHA1: {
    name: 'SHA1'
  },
  SHA3: {
    name: 'SHA3'
  },
  SHA224: {
    name: 'SHA224'
  },
  SHA256: {
    name: 'SHA256'
  },
  SHA384: {
    name: 'SHA384'
  },
  SHA512: {
    name: 'SHA512'
  },
  HMACMD5: {
    name: 'HmacMD5',
    hmac: true
  },
  HMACSHA1: {
    name: 'HmacSHA1',
    hmac: true
  },
  HMACSHA3: {
    name: 'HmacSHA3',
    hmac: true
  },
  HMACSHA224: {
    name: 'HmacSHA224',
    hmac: true
  },
  HMACSHA256: {
    name: 'HmacSHA256',
    hmac: true
  },
  HMACSHA384: {
    name: 'HmacSHA384',
    hmac: true
  },
  HMACSHA512: {
    name: 'HmacSHA512',
    hmac: true
  },
  PBKDF2: {
    name: 'PBKDF2',
    params: {
      keySize: 128 / 32,
      iterations: 10
    }
  },
  EVPKDF: {
    name: 'EvpKDF',
    params: {
      keySize: 128 / 32,
      iterations: 10
    }
  },
  RIPEMD160: {
    name: 'RIPEMD160',
    params: {
      keySize: 128 / 32,
      iterations: 10
    }
  },
  NONE: {
    name: ''
  }
};
/**
 * @constant 对称加密算法类型
 */

exports.ASYMMETRIC_CRYPTO_TYPE = ASYMMETRIC_CRYPTO_TYPE;
var SYMMETRIC_CRYPTO_TYPE = {
  BASE64: {
    name: 'Base64',
    encoding: true
  },
  AES: {
    name: 'AES'
  },
  DES: {
    name: 'DES'
  },
  RC4: {
    name: 'RC4',
    iv: false
  },
  RABBIT: {
    name: 'Rabbit'
  },
  RABBITLEGACY: {
    name: 'RabbitLegacy'
  },
  NONE: {
    name: ''
  }
};
/**
 * @constant 存储类型常量
 */

exports.SYMMETRIC_CRYPTO_TYPE = SYMMETRIC_CRYPTO_TYPE;
var STORAGE_TYPE = {
  Local: 'local',
  Session: 'session'
};
/**
 * @constant 存储常量
 */

exports.STORAGE_TYPE = STORAGE_TYPE;
var DEFAULT_STORAGE_OPTIONS = {
  storageType: STORAGE_TYPE.Local,
  encryptType: SYMMETRIC_CRYPTO_TYPE.NONE,
  encryptKey: 'm2-storage-key',
  encryptIv: 'm2-storage-iv'
};
/**
 * @constant 验证码类型常量
 */

exports.DEFAULT_STORAGE_OPTIONS = DEFAULT_STORAGE_OPTIONS;
var VERIFY_CODE_TYPE = {
  letter: 'letter',
  // 纯字母
  number: 'number',
  // 纯数字
  letterNumber: 'letter_number' // 字母数字组合

};
/**
 * @constant 图形验证码常量
 */

exports.VERIFY_CODE_TYPE = VERIFY_CODE_TYPE;
var DEFAULT_VERIFY_CODE_OPTIONS = {
  canvasId: 'm2-verify-canvas',
  // canvas的ID
  width: 100,
  // 默认canvas宽度
  height: 30,
  // 默认canvas高度
  len: 4,
  // 默认验证码长度
  ignoreCase: true,
  // 是否忽略大小写
  autoRefresh: true,
  // 当验证码比对失败是否自动刷新
  type: VERIFY_CODE_TYPE.letterNumber,
  // 图形验证码默认类型(letter_number:数字字母混合类型、number:纯数字、letter:纯字母)
  strokeLine: false,
  // 是否添加干扰线
  strokePoint: false,
  // 是否添加干扰点
  code: ''
};
/**
 * @constant 存储系统默认的语言设置
 */

exports.DEFAULT_VERIFY_CODE_OPTIONS = DEFAULT_VERIFY_CODE_OPTIONS;
var DEFAULT_LANGUAGE_SETTING = 'm2-sys-def-lang';
/**
 * @constant 存储系统默认的主题设置
 */

exports.DEFAULT_LANGUAGE_SETTING = DEFAULT_LANGUAGE_SETTING;
var DEFAULT_THEME_SETTING = 'm2-sys-def-theme';
/**
 * @constant 微前端同步菜单设置
 */

exports.DEFAULT_THEME_SETTING = DEFAULT_THEME_SETTING;
var MFE_SYNC_MENU = 'm2-mfe-sync-menu';
/**
 * @constant 前端屏幕重置大小
 */

exports.MFE_SYNC_MENU = MFE_SYNC_MENU;
var WINDOW_SCREEN_RESIZE = 'm2-window-screen-resize';
/**
 * @constant 刷新页面布局
 */

exports.WINDOW_SCREEN_RESIZE = WINDOW_SCREEN_RESIZE;
var REFRESH_APP_LAYOUT = 'm2-refresh-app-layout';
/**
 * @constant 前端应用组件实例
 */

exports.REFRESH_APP_LAYOUT = REFRESH_APP_LAYOUT;
var APP_INSTANCE_READY = 'm2-app-instance-ready';
/**
 * @constant 空类型默认
 */

exports.APP_INSTANCE_READY = APP_INSTANCE_READY;

var EMPTY_FUNC = function EMPTY_FUNC() {};

exports.EMPTY_FUNC = EMPTY_FUNC;
var EMPTY_ARRAY = [];
exports.EMPTY_ARRAY = EMPTY_ARRAY;
var EMPTY_OBJECT = {};
exports.EMPTY_OBJECT = EMPTY_OBJECT;