const {series} = require ("gulp");
var gulp = require ("gulp");
//додаткові плагіни Gulp
var sass = require ("gulp-sass")(require('sass')), //конвертує SASS в CSS
    cssnano = require ("gulp-cssnano"), //мінімізація CSS
    autoprefixer = require ('gulp-autoprefixer'), //додавання префіксів в
    //CSS для підтримки
    //старих браузерів
    imagemin = require ('gulp-imagemin'), //стиснення зображень
    concat = require ("gulp-concat"), //об'єднання файлів - конкатенація
    uglify = require ("gulp-uglify"), //мінімізація javascript
    rename = require ("gulp-rename"), //перейменування файлів
pump = require("pump");
var browserSync = require('browser-sync').create();

function html_task(cb)
{
    pump([
            gulp.src ("app/*.html"),
            gulp.dest ("dist")
        ],
        cb)
}
exports.html = html_task;
//об'єднання, компіляція Sass в CSS, додавання префіксів і подальша

function json_task(cb)
{
    pump([
            gulp.src ("app/*.json"),
            gulp.dest ("dist")
        ],
        cb)
}

function sass_task(cb)
{ pump([
        gulp.src ("app/sass/*.sass"),
        concat ('styles.sass'),
        sass (),
        autoprefixer ({
            browsers: ['last 2 versions'],
            cascade: false
        }),
        cssnano (),
        rename ({suffix:'.min'}),
        gulp.dest ("dist/css")
    ],
    cb)
}
exports.sass = sass_task;

function css_task(cb)
{ pump([
        gulp.src ("app/css/*.css"),
        gulp.dest ("dist/css")
    ],
    cb)
}

exports.css = css_task;

//об'єднання і стиснення JS-файлів
function scripts_task(cb)
{ pump([
    gulp.src ("app/js/*.js"), //вихідна директорія файлів
    concat ('scripts.js'), // конкатенація js-файлів в один
    uglify (), //стиснення коду
    rename ({suffix:'.min'}),
    gulp.dest ("dist/js")
],
    cb
);
}
exports.scripts = scripts_task;
//cтискання зображень
function imgs_task(cb)
{ pump([
    gulp.src ( "app/img/*.+(jpg|jpeg|png|gif)"),
    imagemin ({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }),
    gulp.dest ( "dist/img")
    ],
    cb)
}
exports.imgs = imgs_task;

function icons_task(cb)
{ pump([
        gulp.src ( "app/icons/*.+(jpg|jpeg|png|gif)"),
        imagemin ({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }),
        gulp.dest ( "dist/icons")
    ],
    cb)
}

//відстежування за змінами у файлах
function watch_task() {
    gulp.watch ( "app/*.html",gulp.series(["html"]));
    gulp.watch ( "app/js/*.js", gulp.series(["scripts"]));
    gulp.watch ( "app/sass/*.sass", gulp.series(["sass"]));
    //gulp.watch ( "app/icons/*.+(jpg | jpeg | png | gif)", gulp.series([ "imgs"]));

    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
}
exports.watch = watch_task;
//Запуск тасків за замовчуванням
//gulp.task ("default",["html","sass","scripts","imgs","watch"]);
exports.default = series(html_task, sass_task, css_task, scripts_task, icons_task, imgs_task, json_task, watch_task)