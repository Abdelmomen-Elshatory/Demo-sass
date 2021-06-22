let gulp = require("gulp");
// let concat = require('gulp-concat');
let autoprefixer = require('gulp-autoprefixer');
let sass = require('gulp-sass');
let pug = require('gulp-pug');
// let sourcemaps = require('gulp-sourcemaps');
let zip = require('gulp-zip');
let imagemin = require('gulp-imagemin');


// HTML Task
gulp.task("html", function () {
    return gulp.src("pug/*.pug")
    .pipe(pug())
    .pipe(gulp.dest("dist"))
})

// Css Task
gulp.task("css", function () {
    return gulp.src("scss/*.scss")
    // .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer())
    // .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"))
})

// Compress Img
gulp.task("img", function() {
    return gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
})

// Compress Files
gulp.task("compress", function () {
    return gulp.src("dist/**/*.*")
        .pipe(zip("website.zip"))
        .pipe(gulp.dest("."))
})

// Watch Task
gulp.task("watch" , function () {
    gulp.watch("pug/**/*.pug",  gulp.series('html'))
    gulp.watch("scss/**/*.scss",  gulp.series('css'))
    gulp.watch("images/**/*",  gulp.series('img'))
    // gulp.watch("dist/**/*.*",  gulp.series('compress'))
})