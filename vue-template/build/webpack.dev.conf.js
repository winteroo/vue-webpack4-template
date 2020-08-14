const webpack = require('webpack');
const path = require('path');
const {
  merge
} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const colors = require('colors');
const config = require('../config/dev.env');
console.log(config);
module.exports = merge(baseWebpackConfig, {
  devtool: 'source-map',
  plugins: [
    // 全局变量
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(config)
    }),
    new webpack.ProgressPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    // // 提取css为单独文件的插件
    // new MiniCssExtractPlugin({
    //   // 将css打包到执行文件夹
    //   filename: 'css/[name].[hash:8].css'
    // }),
    // 打包html插件，将动态的js插入HTML中
    new HtmlWebpackPlugin({
      // 文档标题
      title: '测试webpack',
      filename: 'index.html',
      // 控制将脚本插入到什么位置
      inject: true,
      // 是否压缩
      minify: false,
      template: './src/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, '../static'),
        to: './'
      }]
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`You application is running here ${colors.green('http://localhost:8080')}`],
        notes: [
          `Welcome to my website ${colors.yellow('https://winteroo.github.io/ylblog/')}`,
          `Webpack Tutorial : ${colors.yellow('https://winteroo.github.io/ylblog/docs/webpack/')}`
        ]
      }
    }),
    new StylelintPlugin({
      // 正则匹配想要lint监测的文件
      files: ['**/*.s?(a|c)ss', '**/*.less', '**/*.vue']
    })
  ],
  devServer: {
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: 'localhost',
    port: '8080',
    open: false,
    publicPath: '/',
    quiet: true,
    stats: 'errors-only',
    proxy: {}
    // watchOptions: {
    //   poll: true
    // }
  }
});
