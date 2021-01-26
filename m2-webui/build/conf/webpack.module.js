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
    filename: 'm2-webui.module.js',
    chunkFilename: '[id].js',
    libraryExport: 'default',
    library: 'M2',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias,
    modules: ['node_modules']
  },
  externals: config.externals,
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  optimization: config.isDev ? {
    minimize: false
  } : {
    minimizer: [config.plugins.terser]
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
