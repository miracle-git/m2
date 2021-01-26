import Vue from 'vue'
import { DataType } from 'm2-core'
import Alert from './src/main'

const AlertConstructor = Vue.extend(Alert)
const alert = (params) => {
  let config = { title: '消息提示', message: '', size: 'sm', close: null }
  if (DataType.isString(params)) {
    config.message = params
  } else {
    config = { ...config, ...params }
  }
  const instance = new AlertConstructor({ data: config }).$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)
  instance.show()
  return instance
}

export default alert
