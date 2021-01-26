'use strict'

const fs = require('fs')
const path = require('path')
const langConfig = require('../../examples/i18n/page.json')

langConfig.forEach(lang => {
  try {
    fs.statSync(path.resolve(__dirname, `../../examples/views/${lang.lang}`))
  } catch (e) {
    fs.mkdirSync(path.resolve(__dirname, `../../examples/views/${lang.lang}`))
  }

  Object.keys(lang.views).forEach(item => {
    const templatePath = path.resolve(__dirname, `../../examples/views/template/${item}.tpl`)
    const outputPath = path.resolve(__dirname, `../../examples/views/${lang.lang}/${item}.vue`)
    const pairs = lang.views[item]
    let content = fs.readFileSync(templatePath, 'utf8')

    Object.keys(pairs).forEach(key => {
      content = content.replace(new RegExp(`<%=\\s*${key}\\s*>`, 'g'), pairs[key])
    })

    fs.writeFileSync(outputPath, content)
  })
})
