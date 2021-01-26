const fs = require('fs')
const path = require('path')
const components = require('../../components.json')
const themes = ['theme-grace']
const basepath = path.resolve(__dirname, '../../packages/')

const fileExists = (filePath) => {
  try {
    return fs.statSync(filePath).isFile()
  } catch (err) {
    return false
  }
}

themes.forEach((theme) => {
  const isLess = theme !== 'theme-default'
  let content = isLess ? '@import "./base.less";\n' : '@import "./base.css";\n'
  Object.keys(components).forEach(item => {
    const fileName = item + (isLess ? '.less' : '.css')
    content += '@import "./' + fileName + '";\n'
    const filePath = path.resolve(basepath, theme, 'src', fileName)
    if (!fileExists(filePath)) {
      fs.writeFileSync(filePath, '', 'utf8')
    }
  })
  fs.writeFileSync(path.resolve(basepath, theme, 'src', isLess ? 'index.less' : 'index.css'), content)
})
