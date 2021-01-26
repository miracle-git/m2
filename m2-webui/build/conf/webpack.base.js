const path = require('path')
var fs = require('fs')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const resolve = (dir) => path.resolve(__dirname, dir)
const components = require('../../components.json')
const utilsList = fs.readdirSync(path.resolve(__dirname, '../../src/utils'))
const configList = fs.readdirSync(path.resolve(__dirname, '../../src/config'))
const externals = {}

exports.isDev = process.env.NODE_ENV === 'development'
exports.isProd = process.env.NODE_ENV === 'production'
exports.isPlay = !!process.env.PLAY_ENV

Object.keys(components).forEach(function(key) {
  externals[`m2-webui/packages/${key}`] = `m2-webui/lib/${key}`
})
externals['m2-webui/src/locale'] = 'm2-webui/lib/locale'
externals['m2-webui/src/mixins'] = 'm2-webui/lib/mixins'
utilsList.forEach(function(file) {
  file = path.basename(file, '.js')
  externals[`m2-webui/src/utils/${file}`] = `m2-webui/lib/utils/${file}`
})
configList.forEach(function(file) {
  file = path.basename(file, '.js')
  externals[`m2-webui/src/config/${file}`] = `m2-webui/lib/config/${file}`
})
exports.externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()]

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
}

exports.alias = {
  'm2-webui': resolve('../../'),
  api: resolve('../../api'),
  main: resolve('../../src'),
  packages: resolve('../../packages'),
  images: resolve('../../packages/theme-grace/img'),
  examples: resolve('../../examples'),
  components: resolve('../../examples/components'),
  assets: resolve('../../examples/assets'),
  mixins: resolve('../../src/mixins'),
  directives: resolve('../../src/directives')
}
exports.plugins = {
  banner: new webpack.BannerPlugin(
    `m2-webui v1.0.0
(c) 2020 by Miracle He
Released under the MIT License.`),
  terser: new TerserWebpackPlugin({
    terserOptions: {
      ecma: undefined,
      warnings: false,
      parse: {},
      compress: {
        drop_console: true,
        drop_debugger: false,
        pure_funcs: ['console.log'] // 移除console
      }
    }
  })
}
exports.rules = [
  {
    test: /\.(jsx?|babel|es6)$/,
    include: process.cwd(),
    exclude: /node_modules/,
    loader: 'babel-loader'
  },
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
      compilerOptions: {
        preserveWhitespace: false
      }
    }
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
  },
  {
    test: /\.less$/,
    use: ['style-loader', 'css-loader', 'less-loader']
  },
  {
    test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g|webp)(\?\S*)?$/,
    exclude: [resolve('../../packages/theme-grace/icon')],
    use: [{
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: path.posix.join('static', '[name].[hash:7].[ext]')
      }
    }]
  },
  {
    test: /\.svg$/,
    include: [resolve('../../packages/theme-grace/icon')],
    use: [{
      loader: 'svg-sprite-loader',
      options: {
        symbolId: 'icon-[name]'
      }
    }]
  }
]
exports.jsexclude = /node_modules/
