const { src, dest, series, watch } = require("gulp");
const webserver = require("gulp-webserver");

function copyHtml(){
    return src("./src/*.html").pipe( dest("./dev/") )
}

function copyJs(){
    return src("./src/*.js").pipe( dest("./dev/") )
}

function server(){
    return src("./dev").pipe( webserver({
        livereload:true,
        open:true
    }) )
}
function _watch(){
    return watch(["./src/*.html"],copyHtml)
}


exports.default = series(copyHtml,copyJs,server,_watch);