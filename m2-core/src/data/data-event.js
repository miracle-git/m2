/**
 * @file DataEvent
 * @description 封装window相关的事件函数
 */
export const DataEvent = {
  /**
   * @method 页面数据上拉滚动加载
   * @param {Function} {handler} 加载数据回调函数
   * @param {Number} {threshold} 距离屏幕底部即将加载数据的距离(默认：20)
   */
  scroll: (handler, { threshold = 20 } = {}) => {
    const { clientHeight, scrollTop } = document.documentElement
    const { scrollHeight } = document.body
    if ((scrollTop + clientHeight) >= (scrollHeight - threshold)) {
      handler()
    }
  },
  /**
   * @method 节流函数(500ms内只能点击一次，点击后立即触发，重复点击无效，必须等3s之后才能点击第二次)
   * @param {Function} {handler} 事件处理函数
   * @param {Number} {delay} 恢复点击的毫秒数
   */
  throttle: (handler, delay = 500) => {
    let last, deferTimer
    return function (...args) {
      let that = this
      let now = +new Date()
      if (last && now < last + delay) {
        deferTimer && clearTimeout(deferTimer)
        deferTimer = setTimeout(() => {
          last = now
          handler.apply(that, args)
        }, delay)
      } else {
        last = now
        handler.apply(that, args)
      }
    }
  },
  /**
   * @method 防抖函数(500ms之后出结果，重复点击无效，如果重复点击了，重新计算3s时间，从点击的时刻算起，必须等待3s时间触发事件)
   * @param {Function} {handler} 事件处理函数
   * @param {Number} {delay} 恢复点击的毫秒数
   */
  debounce: (handler, delay = 500) => {
    let timeout
    return function (...args) {
      // 获取函数的作用域和变量
      let that = this
      // 每次事件被触发，都会清除当前的timer，然后重写设置超时调用
      timeout && clearTimeout(timeout)
      timeout = setTimeout(() => {
        handler.apply(that, args)
      }, delay)
    }
  }
}

export const throttle = (delay = 500) => {
  return function (target, prop, descriptor) {
    descriptor.value = DataEvent.throttle(descriptor.value, delay)
    return descriptor
  }
}

export const debounce = (delay = 500) => {
  return function (target, prop, descriptor) {
    descriptor.value = DataEvent.debounce(descriptor.value, delay)
    return descriptor
  }
}
