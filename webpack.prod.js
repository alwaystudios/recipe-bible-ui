/* eslint-disable @typescript-eslint/no-var-requires, functional/immutable-data, no-undef */

const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  output: {
    publicPath: '/',
  },
})
