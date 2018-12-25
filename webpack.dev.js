const CopyWebpackPlugin = require('copy-webpack-plugin');
const baseConfig = require('./webpack.base.js');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConfig, {
  devServer: {
    contentBase: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'static'),
    ],
    compress: true,
    hot: true,
    watchContentBase: true,
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{ from: './static', to: 'static' }]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'static', 'index.html'),
    }),
  ],
});