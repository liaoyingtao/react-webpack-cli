const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const cssnano = require('cssnano');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    path: resolve('dist')
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessor: cssnano,
        cssProcessorOptions: {
          discardComments: {
            removeAll: true,
          },
          // Run cssnano in safe mode to avoid
          // potentially unsafe transformations.
          safe: true,
        },
        canPrint: false,
      }),
      new UglifyJsPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      minChunks: 3,// 共享最少的chunk数，使用次数超过这个值才会被提取
      maxAsyncRequests: 5,//最多的异步chunk数
      maxInitialRequests: 5,// 最多的同步chunks数
      automaticNameDelimiter: '~',// 多页面共用chunk命名分隔符
      name: true,
      cacheGroups: {// 声明的公共chunk
        vendor: {
          // 过滤需要打入的模块
          test: module => {
            if (module.resource) {
              const include = [/[\\/]node_modules[\\/]/].every(reg => {
                return reg.test(module.resource);
              });
              const exclude = [/[\\/]node_modules[\\/](react|redux|antd)/].some(reg => {
                return reg.test(module.resource);
              });
              return include && !exclude;
            }
            return false;
          },
          name: 'vendor',
          priority: 50,// 确定模块打入的优先级
          reuseExistingChunk: true,// 使用复用已经存在的模块
        },
        react: {
          test({ resource }) {
            return /[\\/]node_modules[\\/](react|redux)/.test(resource);
          },
          name: 'react',
          priority: 20,
          reuseExistingChunk: true,
        },
        antd: {
          test: /[\\/]node_modules[\\/]antd/,
          name: 'antd',
          priority: 15,
          reuseExistingChunk: true,
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        include: [resolve('src'), resolve('node_modules/antd')],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new BundleAnalyzerPlugin(),
    new LodashModuleReplacementPlugin()
  ]
});