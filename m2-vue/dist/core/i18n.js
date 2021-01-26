"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getI18nLocale = getI18nLocale;
exports.mergeLangs = mergeLangs;
exports.configDefaultLang = configDefaultLang;
exports.getCurrentLang = getCurrentLang;
exports.changeLang = changeLang;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _vue = _interopRequireDefault(require("vue"));

var _vueI18n = _interopRequireDefault(require("vue-i18n"));

var _m2Core = require("m2-core");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// 配置应用的语言包（集成element,m2）
function getI18nLocale(langs) {
  _vue["default"].use(_vueI18n["default"]); // 配置默认系统语言


  var defaultLang = Object.keys(langs).find(function (item) {
    return langs[item]["default"];
  });
  var lang = getCurrentLang() || langs[defaultLang].alias || defaultLang;
  configDefaultLang(lang);
  var i18n = new _vueI18n["default"]({
    locale: lang,
    messages: langs,
    silentTranslationWarn: true
  }); // 重点：为了实现element,m2等插件的多语言切换

  for (var _len = arguments.length, locales = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    locales[_key - 1] = arguments[_key];
  }

  locales.forEach(function (item) {
    return item.i18n(function (key, val) {
      return i18n.t(key, val);
    });
  });
  return i18n;
} // 合并其他库的语言包与当前应用的语言包


function mergeLangs(appLang) {
  for (var _len2 = arguments.length, langs = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    langs[_key2 - 1] = arguments[_key2];
  }

  return _m2Core.DataUtil.merge(langs, appLang);
} // 配置默认的语言


function configDefaultLang(lang) {
  lang = lang || (navigator.language || navigator.userLanguage).substr(0, 2);

  _m2Core.DataStorage.set(_m2Core.DEFAULT_LANGUAGE_SETTING, lang);
} // 获取当前配置的语言


function getCurrentLang() {
  return _m2Core.DataStorage.get(_m2Core.DEFAULT_LANGUAGE_SETTING);
} // 应用改变语言


function changeLang(vm, lang) {
  var appKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  if (getCurrentLang() === lang) return;

  var _change = function _change(config) {
    configDefaultLang(lang);
    vm.$i18n.locale = lang;
    config && vm.$i18n.setLocaleMessage(lang, config);
    vm.$nextTick(function () {
      return vm.$bus.$emit(_m2Core.REFRESH_APP_LAYOUT);
    });
  };

  if (!appKey) {
    _change();

    return;
  }

  var locales = (0, _toConsumableArray2["default"])(document.querySelectorAll("script[role^=".concat(appKey, "]")));
  var config = {};
  var count = 0;
  locales.map(function (item) {
    var role = item.getAttribute('role');
    item && document.head.removeChild(item);
    var script = document.createElement('script');
    script.addEventListener('load', function () {
      count++;
      config = _objectSpread(_objectSpread({}, config), window[role]);

      if (count === locales.length) {
        _change(config);
      }
    });
    script.setAttribute('src', item.src.replace(getCurrentLang(), lang));
    script.setAttribute('role', role);
    document.head.insertBefore(script, document.head.querySelectorAll('script')[0]);
  });
}