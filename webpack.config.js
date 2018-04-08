const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['./Client/src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    contentBase: './dist/index.html',
    proxy: {
      '/**': {
        target: 'http://localhost:8080',
        secure: false,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
};