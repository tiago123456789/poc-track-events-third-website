var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task("build:dev", () => {
    return gulp.src([
        "./lib/config.dev.js",
        "./lib/sdk.js"
    ])
        .pipe(concat("sdk.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./build"))
})

gulp.task("build:test", () => {
    return gulp.src([
        "./lib/config.test.js",
        "./lib/sdk.js"
    ])
        .pipe(concat("sdk.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./build"))
})

gulp.task("build:prod", () => {
    return gulp.src([
        "./lib/config.prod.js",
        "./lib/sdk.js"
    ])
        .pipe(concat("sdk.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./build"))
})