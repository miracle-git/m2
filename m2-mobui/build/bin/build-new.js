'use strict'

const chalk = require('chalk')
// 读取命令行参数
const name = process.argv[2]

if (!name) {
  console.log(chalk.red('[组件名称]必须输入(满足camel或PASCAL规则,如:myApp,MyApp,my-app)'))
  console.log(chalk.green('创建命令: npm run new my-app 组件描述'))
  process.exit(1)
}

if (name.toLowerCase().startsWith('m2')) {
  console.log(chalk.red('[组件名称]不能以m2开头'))
  console.log(chalk.green('创建命令: npm run new my-app 组件描述'))
  process.exit(1)
}

const uncamelize = (item) => {
  if (typeof item !== 'string') item = item + ''
  const result = item.replace(/([a-z\d])([A-Z])/g, '$1-$2').replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1-$2')
  return result.toLowerCase()
}

const camelize = (item) => {
  if (typeof item !== 'string') item = item + ''
  return uppercamelcase(item.charAt(0).toLowerCase() + item.slice(1))
}

const path = require('path')
const fs = require('fs')
const fileSave = require('file-save')
const uppercamelcase = require('uppercamelcase')
const componentName = uncamelize(name) // 转为小写短横线分隔
const chineseName = process.argv[3] || componentName
const componentFullName = `m2-${componentName}`
const ComponentName = camelize(name) // 大驼峰
const packagesPath = path.resolve(__dirname, '../../packages', componentName)
const packagesfile = [
  {
    filename: 'index.js',
    content: `import ${ComponentName} from './src/main'

${ComponentName}.install = (Vue) => {
  Vue.component(${ComponentName}.name, ${ComponentName})
}

export default ${ComponentName}`
  },
  {
    filename: 'src/main.vue',
    content: `<template>
  <div class="${componentFullName}"></div>
</template>

<script>
  export default {
    name: '${componentFullName}'
  }
</script>`
  },
  {
    filename: path.join('../../examples/docs/zh-CN', `${componentName}.md`),
    content: `## ${ComponentName} ${chineseName}`
  },
  // {
  //   filename: path.join('../../examples/docs/en-US', `${componentName}.md`),
  //   content: `## ${ComponentName}`
  // },
  {
    filename: path.join('../../packages/theme-grace/src', `${componentName}.less`),
    content: `.${componentFullName} {}`
  }
]

// 添加到 components.json
const componentsFile = require('../../components.json')
const componentsPath = path.join(__dirname, '../../components.json')

if (componentsFile[componentName]) {
  console.error(chalk.red(`${name}组件已存在，请修改名称后重试。`))
  process.exit(1)
}
componentsFile[componentName] = `./packages/${componentName}`

fileSave(componentsPath)
  .write(JSON.stringify(componentsFile, null, '  '), 'utf8')
  .end('\n')
console.log(chalk.green('已修改: ', componentsPath))

// 添加到 index.less
const lessPath = path.join(__dirname, '../../packages/theme-grace/src/index.less')
const lessImportText = `${fs.readFileSync(lessPath)}@import "./${componentName}.less";`
fileSave(lessPath)
  .write(lessImportText, 'utf8')
  .end('\n')
console.log(chalk.green('已修改: ', lessPath))

// 添加到 nav.config.json
const navConfigFile = require('../../examples/nav.conf.json')
const navConfigPath = path.join(__dirname, '../../examples/nav.conf.json')
Object.keys(navConfigFile).forEach(lang => {
  const pages = navConfigFile[lang]
  const children = pages[pages.length - 3].children
  children.push({
    path: `/${componentName}`,
    name: lang === 'zh-CN' && componentName !== chineseName
      ? `${ComponentName} ${chineseName}`
      : ComponentName
  })
})

fileSave(navConfigPath)
  .write(JSON.stringify(navConfigFile, null, '  '), 'utf8')
  .end('\n')
console.log(chalk.green('已修改: ', navConfigPath))

// 创建 package
packagesfile.forEach(item => {
  const filePath = path.join(packagesPath, item.filename)
  fileSave(filePath).write(item.content, 'utf8').end('\n')
  console.log(chalk.green('已创建: ', filePath))
})

console.log(chalk.green('成功!'))
