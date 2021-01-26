const fs = require('fs')
const chalk = require('chalk')
const render = require('json-templater/string')
const uppercamelcase = require('uppercamelcase')
const path = require('path')
const endOfLine = require('os').EOL
const components = require('../../components.json')

const OUTPUT_PATH = path.join(__dirname, '../../src/index.js')
const IMPORT_TEMPLATE = 'import {{name}} from \'../packages/{{package}}\''
const INSTALL_COMPONENT_TEMPLATE = '  {{name}}'
const MAIN_TEMPLATE = `/* Automatically generated by './build/bin/build-entry.js' */

{{include}}
import filters from 'm2-vue/dist/filters'
import locale from 'm2-mobui/src/locale'
import EventBus from 'm2-mobui/src/utils/bus'

const components = [
{{install}}
]

const install = (Vue, opts = {}) => {
  locale.use(opts.locale)
  locale.i18n(opts.i18n)

  components.forEach(component => {
    Vue.component(component.name, component)
  })

  filters.forEach(item => Vue.filter(item.name, item.rule))

  Vue.prototype.$bus = new EventBus()
  Vue.prototype.$m2 = {}
  Vue.prototype.$m2.loading = Loading
  Vue.prototype.$m2.loading.hide = Loading.hide
  Vue.prototype.$m2.toast = Toast
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '{{version}}',
  locale: locale.use,
  i18n: locale.i18n,
  install,
{{list}}
}
`

delete components.font

const includeComponentTemplate = []
const installTemplate = []
const listTemplate = []

Object.keys(components).forEach(item => {
  const componentName = uppercamelcase(item)

  includeComponentTemplate.push(render(IMPORT_TEMPLATE, {
    name: componentName,
    package: item
  }))

  if (['Loading', 'Toast'].indexOf(componentName) === -1) {
    installTemplate.push(render(INSTALL_COMPONENT_TEMPLATE, {
      name: componentName,
      component: item
    }))
  }

  listTemplate.push(`  ${componentName}`)
})

const template = render(MAIN_TEMPLATE, {
  include: includeComponentTemplate.join(endOfLine),
  install: installTemplate.join(',' + endOfLine),
  version: process.env.VERSION || require('../../package.json').version,
  list: listTemplate.join(',' + endOfLine)
})

fs.writeFileSync(OUTPUT_PATH, template)
console.log(chalk.green('入口文件已创建:'), OUTPUT_PATH)
