const isDev = process.env.NODE_ENV === 'development';
const path = require('path');
const pkg = require('./package.json');

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: path.join(__dirname, 'src', 'index.ts'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: pkg.name + '.js',
  },
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        exclude: [
          path.join(__dirname, 'node_modules')
        ],
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: [
      '.js',
      '.ts',
    ],
  },
};