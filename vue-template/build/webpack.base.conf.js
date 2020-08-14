const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

function processCss () {
  let obj = {};
  console.log(process.env.NODE_ENV);
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
  entry: {
    // 默认的输出文件名称，默认为main
    app: ['core-js/stable', 'regenerator-runtime/runtime', './src/index.js']
  },
  output: {
    filename: '[name].[hash:8].js',
    path: resolve('dist')
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
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
  }
};
