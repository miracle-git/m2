import Link from './src/main'

Link.install = (Vue) => {
  Vue.component(Link.name, Link)
}

export default Link
