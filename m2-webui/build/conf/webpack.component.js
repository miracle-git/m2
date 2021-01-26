const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const components = require('../../components.json')
const config = require('./webpack.base')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: components,
  output: {
    path: path.resolve(process.cwd(), './lib'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias,
    modules: ['node_modules']
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
  stats: 'none',
  module: {
    rules: config.rules
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    config.plugins.banner
  ]
}
