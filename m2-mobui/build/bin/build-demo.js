const path = require('path')
const templates = path.resolve(process.cwd(), './examples/views/template')

const chokidar = require('chokidar')
const watcher = chokidar.watch([templates])

watcher.on('ready', function() {
  watcher.on('change', function() {
    exec('npm run i18n')
  })
})

function exec(cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}