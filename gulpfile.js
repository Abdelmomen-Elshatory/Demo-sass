let gulp = require("gulp");
// let concat = require('gulp-concat');
let autoprefixer = require('gulp-autoprefixer');
let sass = require('gulp-sass');
let pug = require('gulp-pug');
let sourcemaps = require('gulp-sourcemaps');
let zip = require('gulp-zip');
let image = require('gulp-image');


// HTML Task
gulp.task("html", function () {
    return gulp.src("pug/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("./dist"))
})

// Css Task
gulp.task("css", function () {
    return gulp.src("scss/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"))
})

// Compress Img
gulp.task('img', function (done) {
    gulp.src('img/*')
        .pipe(image())
        .pipe(gulp.dest('dist/images'));
    done();
});

// Compress Files
gulp.task("compress", function () {
    return gulp.src("dist/**/*.*")
        .pipe(zip("demo.zip"))
        .pipe(gulp.dest("."))
})

// Watch Task
gulp.task("watch" , function () {
    gulp.watch("pug/**/*.pug",  gulp.series('html'))
    gulp.watch("scss/**/*.scss",  gulp.series('css'))
    gulp.watch("img/*",  gulp.series('img'))
    gulp.watch("dist/**/*.*",  gulp.series('compress'))
})