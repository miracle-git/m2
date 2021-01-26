import SvgIcon from './src/main'

const requireAll = context => context.keys().map(context)
const svg = require.context('../theme-grace/icon', true, /\.svg$/)
requireAll(svg)

SvgIcon.install = (Vue) => {
  Vue.component(SvgIcon.name, SvgIcon)
}

export default SvgIcon
