const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'eval',
  devServer: {
    historyApiFallback: true
  },
  entry: path.join(__dirname, '/src/index.js'),
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.styl$/,
      exclude: /node_modules/,
      loader: 'style-loader!css-loader!stylus-loader'
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    },
    {
      test: /\.mp3$/,
      loader: 'file-loader'
    }]
  },
  resolve: {
    modules: [path.join(__dirname, '/src/index.js'), 'node_modules'],
    extensions: ['.js', '.jsx', '.styl']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}
