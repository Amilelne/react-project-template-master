const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './index.js',
  context: resolve(__dirname, 'src'),
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'release')
  },

  module: {
    rules: [
      {
        test: [/\.js$/],
        loader: 'babel-loader',
        query: {
          presets: ['react', 'stage-2']
        }
      }
    ]
  },

  devServer: {
    contentBase: './release',
    port: 3030,
      historyApiFallback:true
  }
}