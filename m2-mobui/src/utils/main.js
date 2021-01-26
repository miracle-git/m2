export const hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key)
export const isListened = (vm, evt) => vm._events[evt] && typeof vm._events[evt] === 'object'
export const getClientHeight = () => document.documentElement.clientHeight
export const getScrollTop = () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
export const setScrollTop = (val) => document.documentElement.scrollTop = document.body.scrollTop = val
export const getMapItem = (item, map, ...props) => props.reduce((res, prop) => ({ ...res, [prop]: item[map[prop]] || item[prop] }), {})
export const oneOf = (current, values = [], field = '') => {
  const result = values.some(item => item === current)
  if (!result) {
    console.warn(`${field}必须是:【${values.join(',')}】其中之一！`)
  }
  return result
}
export const isRouteLink = (url = '') => url.startsWith('/') || url.startsWith('#/')
export const highlight = (val, keyword) => {
  const transformKeyword = keyword.replace(/[.[*?+^$|()/]|\]|\\/g, '\\$&')
  const reg = new RegExp(transformKeyword, 'gi')
  if (val) {
    return val.replace(reg, (text) => `<span style="color: #f81d22;">${text}</span>`)
  }
}
export const trim = (str) => str.trim().replace(/[ ]/g, '')
