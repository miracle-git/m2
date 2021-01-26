import Layout from './src/main'

Layout.install = (Vue) => {
  Vue.component(Layout.name, Layout)
}

export default Layout
