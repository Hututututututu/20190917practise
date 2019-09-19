const { src, dest, series, watch, parallel } = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const webpackStream = require("webpack-stream");

function copyHtml(){
    return src("./src/*.html").pipe( dest("./dist/") )
}

function compileJS() {
    return webpackStream({
        mode: "production",
        entry: './src/app.js',
        output: {
          filename: "app.min.js"
          // path: path.resolve(__dirname, './dist/js/')
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
      })
      .pipe(dest('./dist/js/'))
  }


function compileSCSS(){
    return src("./src/style/*.scss")
        .pipe( sass().on('error', sass.logError) )
        .pipe( concat("app.min.css") )
        .pipe( dest("./dist/style/") )
}
function copyFonts() {
  return src("./src/style/fonts/*.*")
    .pipe(dest("./dist/style/fonts/"));
}

function copyImages(){
  return src("./src/images/*.*")
    .pipe( dest("./dist/images/") )
}
function copyLibs() {
  return src("./src/libs/*.*")
    .pipe(dest("./dist/js/libs/"));
}

exports.default = series( parallel(copyHtml,compileJS,compileSCSS,copyFonts,copyImages,copyLibs));