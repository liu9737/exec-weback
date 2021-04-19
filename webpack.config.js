/** 
 * @description webpack 配置文件
 * 所有的构建工具都是基于node运行的
 * 模块化默认采用commonjs
 */

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

module.exports = {
  entry: './src/index.js',
  // context: resolve(__dirname, 'app'),
  output: {
    filename: 'build.js',
    path: resolve(__dirname, 'build'), // 通常写一个绝对路径
    // publicPath:"./",
    chunkFilename: '[name].js'
  },
  // loader 的配置
  module: {
    rules: [
      // 详细loader配置
      {
        // 匹配哪些文件
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader" }
          // 使用哪些loader

        ]
        // use: [
        //     // use数组中loader执行顺序： 从下到上 依次执行
        //     // 创建style标签，将js中的样式资源插入进去，添加到head中生效
        //     'style-loader',
        //     // 将css文件变成commonjs模块，加载到js中，里面的内容是样式字符串
        //     'css-loader'
        //   ]
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        // 问题：处理不了html中的图片
        test: /\.(jpeg|png|gif)$/,
        // 使用一个loader
        loader: 'url-loader',
        options: {
          // 图片大小小于 8kb， 就会用base64处理
          // 优点： 减少请求数量（减轻服务器压力）
          // 缺点： 图片体积会更大（文件请求速度慢）
          limit: 200 * 1024,
          esModule: false,
          // url-loader 默认使用es6模块话解析，而html-loader引入图片是commonjs，解析时会出现问题： 【object Module】
          // 解决： 关闭url-loader 的 es6模块化
          name: '[hash:10].[ext]' // ext 取文件原来的扩展名，hash 取元素hash的前10位
        }
      },
      {
        test: /\.html$/,
        loader: 'html-withimg-loader' // 处理html文件的img图片的（负责引入这个图片，从而能被url-loader进行处理）
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env"]
          }
        },
        exclude: '/node_modules/'
      }
    ]
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  devServer: {

  },
  // 插件
  plugins: [
    // html-webpack-plugin
    // 默认创建一个html文件，自动引入打包输出的所有资源
    new HtmlWebpackPlugin({
      // 复制这个html文件，并自动引入打包输出的所有资源
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({   //  压缩打包css 文件插件
      filename: "css/[name].css"   // 打包后最终生成的 dist 文件里面的 打包后的 css 文件   
    }),
    // new ParallelUglifyPlugin({
    //   uglifyJS: {
    //     output: {
    //       beautify: false, // 紧凑输出
    //       comments: false, // 删除注释
    //     },
    //     compress: {
    //       warnings: false,
    //       drop_console: false,
    //     }
    //   }
    // })

  ],
  mode: 'production' // production
}

