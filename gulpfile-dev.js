const { src, dest, series, watch, parallel } = require("gulp");
const webserver = require("gulp-webserver");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const webpackStream = require("webpack-stream");
const path = require("path");
const proxy = require("http-proxy-middleware");

function copyHtml(){
    return src("./src/*.html").pipe( dest("./dev/") )
}

function compileJS() {
    return src('./src/app.js')
      .pipe(webpackStream({
        mode: "development",
        entry: './src/app.js',
        output: {
          filename: "app.min.js",
          path: path.resolve(__dirname, './dev/js/')
        },
        module: {
          rules: [
            {
              test: /\js$/,
              exclude: /(node_modules)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                  plugins: ['@babel/plugin-transform-runtime']
                }
              }
            },
            {
              test: /\.html$/,
              loader: "string-loader"
            }
          ]
        }
      }))
      .pipe(dest('./dev/js/'))
  }



function server(){
    return src("./dev").pipe( webserver({
        port:9123,
        livereload:true,
        open:true,
        middleware:[
          proxy('/api',{
            // /api/listmore.json?pageNo=2&pageSize=15
            target:'https://m.lagou.com',
            changeOrigin:true,
            pathRewrite:{
              '^/api/':''  //最终的请求地址去掉api字段
            }
          })
        ]
    }) )
}
function _watch(){
    watch(["./src/*.html"],copyHtml);
    watch(["./src/**/*.js"],compileJS);
    watch(["./src/style/*.scss"],compileSCSS);
}

function compileSCSS(){
    return src("./src/style/*.scss")
        .pipe( sass().on('error', sass.logError) )
        .pipe( concat("app.min.css") )
        .pipe( dest("./dev/style/") )
}
function copyFonts() {
  return src("./src/style/fonts/*.*")
    .pipe(dest("./dev/style/fonts/"));
}

function copyImages(){
  return src("./src/images/*.*")
    .pipe( dest("./dev/images/") )
}
function copyLibs() {
  return src("./src/libs/*.*")
    .pipe(dest("./dev/js/libs/"));
}

exports.default = series( parallel(copyHtml,compileJS,compileSCSS,copyFonts,copyImages,copyLibs),server,_watch);