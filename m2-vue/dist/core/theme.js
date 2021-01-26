"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configDefaultTheme = configDefaultTheme;
exports.getCurrentTheme = getCurrentTheme;
exports.changeTheme = changeTheme;

var _m2Core = require("m2-core");

// 配置默认的主题
function configDefaultTheme(theme) {
  theme = getCurrentTheme() || theme || document.documentElement.getAttribute('data-theme');

  _m2Core.DataStorage.set(_m2Core.DEFAULT_THEME_SETTING, theme);

  document.documentElement.setAttribute('data-theme', theme);
} // 获取当前配置的主题


function getCurrentTheme() {
  return _m2Core.DataStorage.get(_m2Core.DEFAULT_THEME_SETTING) || '';
} // 应用改变主题


function changeTheme(vm, theme) {
  if (getCurrentTheme() === theme) return;

  _m2Core.DataStorage.set(_m2Core.DEFAULT_THEME_SETTING, theme);

  document.documentElement.setAttribute('data-theme', theme);
}