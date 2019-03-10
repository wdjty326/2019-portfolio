var path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src/main/js'),
  entry: {
    portfolio: './index.js',
  },
  devtool: 'sourcemaps',
  cache: true,
  output: {
    path: path.resolve(__dirname, 'src/main/webapp'),
    filename: './static/js/[name].bundle.js'
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
            presets: [ '@babel/preset-env', '@babel/preset-react' ]
          }
        }
      }, {
        test: /\.(css|scss)$/,
        use: [ 'style-loader', 'css-loader']
      }, {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader'
          },
        ]
      }, {
        test: /\.(svg|jpeg|jpg|png|ttf|eot)$/,
        loader: 'file-loader'
      }
    ]
  }
};