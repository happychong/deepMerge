'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
// happyChong 2018-03-16 start
const fs = require('fs');
// happyChong 2018-03-16 end

const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err)
    throw err

    // happyChong 2018-03-16 start
  var stat = fs.stat;

  var copy = function(src, dst) {
    //读取目录
    fs.readdir(src, function(err, paths) {
      if (err) {
        throw err;
      }
      paths.forEach(function(path) {
        var _src = src + '/' + path;
        var _dst = dst + '/' + path;
        var readable;
        var writable;
        stat(_src, function(err, st) {
          if (err) {
            throw err;
          }

          if (st.isFile()) {
            readable = fs.createReadStream(_src); //创建读取流
            writable = fs.createWriteStream(_dst); //创建写入流
            readable.pipe(writable);
          } else if (st.isDirectory()) {
            exists(_src, _dst, copy);
          }
        });
      });
    });
  }

  var exists = function(src, dst, callback) {
    //测试某个路径下文件是否存在
    fs.exists(dst, function(exists) {
      if (exists) { //不存在
        callback(src, dst);
      } else { //存在
        fs.mkdir(dst, function() { //创建目录
          callback(src, dst)
        })
      }
    })
  }

  exists(path.resolve(__dirname, '../src'), path.resolve(__dirname, '../dist'), copy)

  // happyChong 2018-03-16 end

  // webpack(webpackConfig, (err, stats) => {
  //   spinner.stop()
  //   if (err) throw err
  //   process.stdout.write(stats.toString({
  //     colors: true,
  //     modules: false,
  //     children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
  //     chunks: false,
  //     chunkModules: false
  //   }) + '\n\n')
  //
  //   if (stats.hasErrors()) {
  //     console.log(chalk.red('  Build failed with errors.\n'))
  //     process.exit(1)
  //   }
  //
  //   console.log(chalk.cyan('  Build complete.\n'))
  //   console.log(chalk.yellow(
  //     '  Tip: built files are meant to be served over an HTTP server.\n' +
  //     '  Opening index.html over file:// won\'t work.\n'
  //   ))
  // })
})
