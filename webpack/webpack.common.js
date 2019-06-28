const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    index: resolve('src/index.js'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': resolve('src'),
      '@ant-design/icons/lib/dist$': resolve('src/icons.js')
    },
    // 加快搜索速度
    modules: [
      'node_modules', 
      resolve('src'), 
      resolve('node_modules')
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: resolve('src'),
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        include: resolve('src'),
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]',
          outputPath: 'images'
        }
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('public/index.html')
    })
  ]
};