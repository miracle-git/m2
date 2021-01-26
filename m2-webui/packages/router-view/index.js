import RouterView from './src/main'

RouterView.install = (Vue) => {
  Vue.component(RouterView.name, RouterView)
}

export default RouterView
