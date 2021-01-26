import { DataStorage, DEFAULT_THEME_SETTING } from 'm2-core'

// 配置默认的主题
export function configDefaultTheme(theme) {
  theme = getCurrentTheme() || theme || document.documentElement.getAttribute('data-theme')
  DataStorage.set(DEFAULT_THEME_SETTING, theme)
  document.documentElement.setAttribute('data-theme', theme)
}

// 获取当前配置的主题
export function getCurrentTheme() {
  return DataStorage.get(DEFAULT_THEME_SETTING) || ''
}

// 应用改变主题
export function changeTheme(vm, theme) {
  if (getCurrentTheme() === theme) return
  DataStorage.set(DEFAULT_THEME_SETTING, theme)
  document.documentElement.setAttribute('data-theme', theme)
}
