var path = require('path');
// css 분리
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
// script 또는 link 태그 자동화
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// 기존 build 디렉토리 clear
// var CleanWebpackPlugin = require('clean-webpack-plugin');
// min 압축처리
var UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src/main/js'),
  entry: [ './index.js', '@babel/polyfill' ],
  devtool: 'sourcemaps',
  cache: true,
  output: {
    path: path.resolve(__dirname, 'src/main/webapp'),
    filename: './static/js/bundle.min.js'
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env', '@babel/preset-react' ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-export-namespace-from',
              '@babel/plugin-proposal-throw-expressions'
            ]
          }
        }
      }, {
        test: /\.(css|scss)$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader']
      }, {
        test: /\.(ico|png|jpg|jpeg|gif|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          name: '/static/image/[hash].[ext]',
          limit: 10000,
        },
      }, {
        test: /\.(woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          name: '/static/font/[hash].[ext]',
          limit: 10000,
        },
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']  // 확장자 무시 가능
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '/static/css/bundle.min.css'
    }),
    // new HtmlWebpackPlugin({
    //   favicon: './static/asset/favicon.ico',
    //   template: './jsp/test.jsp',
    //   chunks: ['css', 'index', 'app', 'system', 'monitor']
    // }),
    new UglifyWebpackPlugin({
      cache: true,
      parallel: true,
      sourceMap: true // set to true if you want JS source maps
    }),
    new OptimizeCSSAssetsPlugin({})
  ]
};