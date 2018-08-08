const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, './src/dist/assets'),
    filename: 'bundle.js',
    publicPath: 'assets',
  },
  // devServer: {
  //   contentBase: './src/dist/index.html',
  //   proxy: {
  //     '/**': {
  //       target: 'http://localhost:8080',
  //       secure: false,
  //     },
  //   },
  // },
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
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback:"style-loader",
          use: "css-loader"
        })
        // loader: 'style-loader!css-loader!autoprefixer-loader'
      },
      {
        test: /\.(jpg|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins:[
    new ExtraxtTextPlugin("styles.css")
  ]
};