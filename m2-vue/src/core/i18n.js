import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { DataUtil, DataStorage, REFRESH_APP_LAYOUT, DEFAULT_LANGUAGE_SETTING } from 'm2-core'

// 配置应用的语言包（集成element,m2）
export function getI18nLocale(langs, ...locales) {
  Vue.use(VueI18n)
  // 配置默认系统语言
  const defaultLang = Object.keys(langs).find(item => langs[item].default)
  const lang = getCurrentLang() || langs[defaultLang].alias || defaultLang
  configDefaultLang(lang)
  const i18n = new VueI18n({
    locale: lang,
    messages: langs,
    silentTranslationWarn: true
  })
  // 重点：为了实现element,m2等插件的多语言切换
  locales.forEach(item => item.i18n((key, val) => i18n.t(key, val)))
  return i18n
}

// 合并其他库的语言包与当前应用的语言包
export function mergeLangs(appLang, ...langs) {
  return DataUtil.merge(langs, appLang)
}

// 配置默认的语言
export function configDefaultLang(lang) {
  lang = lang || (navigator.language || navigator.userLanguage).substr(0, 2)
  DataStorage.set(DEFAULT_LANGUAGE_SETTING, lang)
}

// 获取当前配置的语言
export function getCurrentLang() {
  return DataStorage.get(DEFAULT_LANGUAGE_SETTING)
}

// 应用改变语言
export function changeLang(vm, lang, appKey = '') {
  if (getCurrentLang() === lang) return
  const _change = (config) => {
    configDefaultLang(lang)
    vm.$i18n.locale = lang
    config && vm.$i18n.setLocaleMessage(lang, config)
    vm.$nextTick(() => vm.$bus.$emit(REFRESH_APP_LAYOUT))
  }
  if (!appKey) {
    _change()
    return
  }
  const locales = [...document.querySelectorAll(`script[role^=${appKey}]`)]
  let config = {}
  let count = 0
  locales.map(item => {
    const role = item.getAttribute('role')
    item && document.head.removeChild(item)
    const script = document.createElement('script')
    script.addEventListener('load', () => {
      count++
      config = { ...config, ...window[role] }
      if (count === locales.length) {
        _change(config)
      }
    })
    script.setAttribute('src', item.src.replace(getCurrentLang(), lang))
    script.setAttribute('role', role)
    document.head.insertBefore(script, document.head.querySelectorAll('script')[0])
  })
}
