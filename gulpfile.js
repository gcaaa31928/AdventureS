var gulp = require('gulp');
var connect = require('gulp-connect');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var sourcemaps = require('gulp-sourcemaps');
var mainBowerFiles = require('main-bower-files');
var del = require('del');

var paths = {
    scripts: ['app/scripts/**/*.coffee', '!client/external/**/*.coffee']
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function () {
    // You can use multiple globbing patterns as you would with `gulp.src`
    return del(['build']);
});

gulp.task('scripts', ['clean'], function () {
    // Minify and copy all JavaScript (except vendor scripts)
    // with sourcemaps all the way down
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(coffee())
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'))
        .pipe(gulp.dest('app/scripts'));
});

gulp.task('index', function () {
    return gulp.src('./app/index.html')
        .pipe(inject(gulp.src(mainBowerFiles(), {read: false}), {name: 'bower', relative: true}))
        .pipe(gulp.dest('./build'));
});

// Copy all static images
gulp.task('images', ['clean'], function () {
    return gulp.src(paths.images)
    // Pass in options to the task
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('build/img'));
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('start:server', function () {
    connect.server({
        root: ['app'],
        livereload: false,
        // Change this to '0.0.0.0' to access the server from outside.
        port: 9000
    });
});
// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'index', 'start:server']);