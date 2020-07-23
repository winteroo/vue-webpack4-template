const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir);
}

function processCss () {
  let obj = {};
  if (process.env.NODE_ENV === 'production') {
    obj = {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../'
      }
    };
  } else {
    obj = {
      loader: 'vue-style-loader'
    };
  }
  console.log(obj);
  return obj;
}

module.exports = {
  context: path.resolve(__dirname, './'),
  entry: {
    app: './src/index.js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[hash:8].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader'
      }],
      include: [resolve('src')]
    },
    {
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      // 表示eslint-loader先执行，与babel-loader存在前后顺序，eslint-loader
      // 要检查装换之前的代码，所以eslint-loader先执行
      enforce: 'pre',
      include: [resolve('src')],
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    },
    {
      test: /\.vue$/,
      use: [{
        loader: 'vue-loader'
      }]
    },
    {
      test: /\.css$/,
      sideEffects: true,
      use: [
        processCss(),
        {
          loader: 'css-loader',
          options: {}
        }]
    },
    {
      test: /\.s[ac]ss$/,
      sideEffects: true,
      use: [processCss(),
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
        // 需要添加postcss配置文件
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'img/[name].[hash:8].[ext]',
        // 因为file-loader将此项配置默认为true，方便tree shaking
        // 但是这样会导致使用src='./images/....png'的引用方式失效，故设置为false使其生效
        // 建议采用ES modules的方式引入,例如：
        // const imgsrc = require('./images/login-img.png');
        esModule: false
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'media/[name].[hash:7].[ext]',
        esModule: false
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'fonts/[name].[hash:7].[ext]',
        esModule: false
      }
    }
    ]
  },
  plugins: [
    // 打包进度插件
    new webpack.ProgressPlugin(),
    // 清除打包文件夹插件
    new CleanWebpackPlugin({
      // 模拟文件的删除即不删除文件
      dry: false
    }),
    // 全局变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // 处理vue的特定插件
    new VueLoaderPlugin(),
    // 提取css为单独文件的插件
    new MiniCssExtractPlugin({
      // 将css打包到执行文件夹
      filename: 'css/[name].[hash:8].css'
    }),
    // 打包html插件，将动态的js插入HTML中
    new HtmlWebpackPlugin({
      title: '测试webpack',
      filename: 'index.html',
      // 控制将脚本插入到什么位置
      inject: true,
      // 是否压缩
      minify: true,
      template: './src/index.html'
    }),
    // 开启gzip压缩插件
    new CompressionPlugin({
      threshold: 10240
    }),
    // 复制文件夹插件
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, './static'),
        to: './'
      }]
    })
  ],
  devServer: {
    hot: true,
    compress: true,
    host: 'localhost',
    port: '8080',
    open: false,
    publicPath: '/',
    quiet: true,
    stats: 'errors-only',
    proxy: {}
  },
  optimization: {
    // 配置tree shaking
    usedExports: true,
    minimize: true,
    minimizer: [new TerserPlugin()],
    // 分离公共chunk在vendor文件中
    splitChunks: {
      chunks: 'all', // 仅提取按需载入的module
      minSize: 10, // 提取出的新chunk在两次压缩(打包压缩和服务器压缩)之前要大于30kb
      maxSize: 0, // 提取出的新chunk在两次压缩之前要小于多少kb，默认为0，即不做限制
      minChunks: 1, // 被提取的chunk最少需要被多少chunks共同引入
      maxAsyncRequests: 5, // 最大按需载入chunks提取数
      maxInitialRequests: 6, // 最大初始同步chunks提取数
      automaticNameDelimiter: '-', // 默认的命名规则（使用~进行连接）
      name: true,
      cacheGroups: { // 缓存组配置，默认有vendors和default
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        lodash: {
          test: /lodash/,
          priority: -1,
          name: 'lodash'
        },
        vue: {
          test: /vue/,
          priority: 10,
          name: 'vue'
        },
        default: {
          minChunks: 2,
          priority: -20,
          enforce: true,
          reuseExistingChunk: true
        }
      }
    }
  }
};
