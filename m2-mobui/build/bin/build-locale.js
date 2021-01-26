const fs = require('fs')
const save = require('file-save')
const { resolve, basename } = require('path')
const localePath = resolve(__dirname, '../../src/locale/lang')
const localeFiles = fs.readdirSync(localePath)

const transform = (filename, name, cb) => {
  require('babel-core').transformFile(resolve(localePath, filename), {
    plugins: [
      'add-module-exports',
      ['transform-es2015-modules-umd', { loose: true }]
    ],
    moduleId: name
  }, cb)
}

localeFiles.filter(item => /\.js$/.test(item)).forEach(item => {
  const name = basename(item, '.js')
  transform(item, name, (err, res) => {
    if (err) {
      console.error(err)
      return
    }

    const code = res.code.replace('define(\'', 'define(\'m2/locale/')
      .replace('global.', 'global.M2.lang = global.M2.lang || {}; \n    global.M2.lang.')
    save(resolve(__dirname, '../../lib/umd/locale', item)).write(code)
  })
})
