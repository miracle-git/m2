import Vue from 'vue'
import Loading from './src/main'

const LoadingConstructor = Vue.extend(Loading)
const hasLoading = () => document.body.querySelector('.m2-loading')
LoadingConstructor.prototype.close = function() {
  if (!hasLoading()) return
  this.visible = false
  document.body.removeChild(this.$el)
}

let instance

const loading = (message) => {
  if (hasLoading()) return
  instance = new LoadingConstructor({ data: { message, visible: true } }).$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)
  instance.visible = true
  return instance
}

loading.hide = () => Vue.nextTick(() => {
  instance && instance.close()
})

export default loading
