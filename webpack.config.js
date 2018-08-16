const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

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
      test: /\.(css|styl)$/,
      exclude: /node_modules/,
      loader: 'style-loader!css-loader!stylus-loader'
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    },
    {
      test: /\.(png|jpg|svg)$/,
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
      template: path.join(__dirname, '/src/index.html')
    }),
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(process.env.API_URL)
    })
  ]
}
