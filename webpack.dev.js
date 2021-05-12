/* eslint-disable @typescript-eslint/no-var-requires, functional/immutable-data, no-undef */

const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    port: 3000,
  },
  output: {
    publicPath: '/',
  },
})
