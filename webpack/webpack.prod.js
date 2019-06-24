const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist')
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      // include all types of chunks
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        include: path.resolve(__dirname, '../src'),
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader', 
          'less-loader'
        ]
      },
      {
        test: /\.(css|less)$/,
        include: /antd/,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader', 
          'less-loader'
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    })
  ]
});