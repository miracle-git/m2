const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const config = require('./webpack.base')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: ['./src/index.js']
  },
  output: {
    path: path.resolve(process.cwd(), './lib'),
    publicPath: '/dist/',
    filename: 'index.js',
    chunkFilename: '[id].js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'M2',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias
  },
  externals: config.externals,
  optimization: config.isDev ? {
    minimize: false
  } : {
    minimizer: [config.plugins.terser]
  },
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  module: {
    rules: config.rules
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    config.plugins.banner
  ]
}
