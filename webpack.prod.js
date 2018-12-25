const baseConfig = require('./webpack.base.js');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = merge(baseConfig, {
  output: {},
  plugins: [new CleanWebpackPlugin([path.join(__dirname, 'dist')])],
});
