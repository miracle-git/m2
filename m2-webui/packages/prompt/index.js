import Vue from 'vue'
import { DataType } from 'm2-core'
import Prompt from './src/main'

const PromptConstructor = Vue.extend(Prompt)

PromptConstructor.prototype.close = function() {
  document.body.removeChild(this.$el)
}

let instance

const prompt = (params, callback) => {
  let config = { title: '操作确认', message: '', confirm: null, cancel: null }
  if (DataType.isString(params) && DataType.isFunction(callback)) {
    config.message = params
    config.confirm = callback
  } else {
    config = { ...config, ...params }
  }
  instance = new PromptConstructor({ data: config }).$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)
  instance.show()
  return instance
}

prompt.hide = () => Vue.nextTick(() => {
  instance && instance.close()
})

export default prompt
