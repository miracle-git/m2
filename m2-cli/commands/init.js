const { prompt } = require('inquirer')
const program = require('commander')
const chalk = require('chalk')
const download = require('download-git-repo')
const ora = require('ora')
const fs = require('fs')

const option = {
  args: program.parse(process.argv).args[0],
  type: 'web'
}

const question = [
  {
    type: 'input',
    name: 'name',
    message: '项目名称',
    default: typeof option.args === 'string' ? option.args : 'm2-app',
    filter(val) {
      return val.trim()
    },
    validate(val) {
      const validate = (val.trim().split(' ')).length === 1
      return validate || '项目名称不能包含空格'
    },
    transformer(val) {
      return val
    }
  },
  {
    type: 'input',
    name: 'description',
    message: '项目描述',
    default: '基于前端框架创建Vue工程化项目',
    validate() {
      return true
    },
    transformer(val) {
      return val
    }
  },
  {
    type: 'input',
    name: 'type',
    message: '项目类型(web,mob,mfe: web-PC端模板, mob-移动端模板, mfe-微前端模板)',
    default: option.type, // web, mfe, mob
    filter(val) {
      return val.trim()
    },
    validate(val) {
      const validate = ['web', 'mfe', 'mob'].some(item => item === val.trim())
      if (validate) { option.type = val.trim() }
      return validate || '项目类型必须为: web,mob,mfe之一'
    },
    transformer(val) {
      return val
    }
  },
  {
    type: 'input',
    name: 'author',
    message: '作者',
    default: '',
    validate() {
      return true
    },
    transformer(val) {
      return val
    }
  }
]

module.exports = prompt(question).then(({ name, description, author }) => {
  const repository = require('../template').init.path[option.type]
  const destination = `./${name}`
  const spinner = ora('下载中, 请稍后...')

  spinner.start()
  download(`${repository}`, destination, { clone: false },(err) => {
    if (err) {
      console.log(chalk.red(err))
      process.exit()
    }

    if (option.type !== 'mfe') {
      fs.readFile(`${destination}/package.json`, 'utf8', function (err, data) {
        if (err) {
          spinner.stop()
          console.error(chalk.red(err))
          return
        }

        const packageJson = JSON.parse(data)
        packageJson.name = name
        packageJson.description = description
        packageJson.author = author

        fs.writeFile(`${destination}/package.json`, JSON.stringify(packageJson, null, 2), 'utf8', function (err) {
          if (err) {
            spinner.stop()
            console.error(chalk.red(err))
          } else {
            spinner.stop()
            console.log(chalk.green('项目创建成功'))
            console.log(`
              ${chalk.yellow(`cd ${name}`)}
              ${chalk.yellow('npm install')}
              ${chalk.yellow('npm run serve')}
            `)
          }
        })
      })
    } else {
      spinner.stop()
      console.log(chalk.green('项目创建成功'))
      console.log(`
        ${chalk.yellow(`cd ${name}`)}
        ${chalk.yellow('npm install')}
        ${chalk.yellow('npm run serve')}
      `)
    }
  })
})
