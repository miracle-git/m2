import Vue from 'vue'
import deepmerge from 'deepmerge'
import { DataStorage, DEFAULT_LANGUAGE_SETTING } from 'm2-core'
import format from './format'

let locale = null
let merged = false

let i18nHandler = () => {
  const i18n = Object.getPrototypeOf(this || Vue).$t
  if (typeof i18n === 'function' && !!Vue.locale) {
    if (!merged) {
      merged = true
      Vue.locale(
        Vue.config.lang,
        deepmerge(locale, Vue.locale(Vue.config.lang) || {}, { clone: true })
      )
    }
    return i18n.apply(this, arguments)
  }
}

const trans = (path, options) => {
  const lang = DataStorage.get(DEFAULT_LANGUAGE_SETTING)
  useLang(lang)

  let value = i18nHandler.apply(this, arguments)
  if (value !== null && value !== undefined) return value

  const array = path.split('.')
  let current = locale

  for (let i = 0, j = array.length; i < j; i++) {
    const property = array[i]
    value = current[property]
    if (i === j - 1) return format()(value, options)
    if (!value) return ''
    current = value
  }
  return ''
}

const useLang = (lang) => {
  switch (lang) {
    case 'en-us':
    case 'en':
      locale = require('./lang/en-US').default
      break
    case 'zh-cn':
    case 'zh':
    default:
      locale = require('./lang/zh-CN').default
      break
  }
}

export default {
  t: trans,
  use: useLang,
  i18n: (fn) => i18nHandler = fn || i18nHandler
}
