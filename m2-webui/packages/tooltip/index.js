import Tooltip from './src/main'

Tooltip.install = (Vue) => {
  Vue.component(Tooltip.name, Tooltip)
}

export default Tooltip
