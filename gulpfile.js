var gulp = require('gulp');
var connect = require('gulp-connect');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var sourcemaps = require('gulp-sourcemaps');
var mainBowerFiles = require('main-bower-files');
var runSequence = require('run-sequence');
var del = require('del');
var wiredep = require('wiredep').stream;

var paths = {
    coffee_scripts: ['app/coffee_scripts/**/*.coffee', '!client/external/**/*.coffee'],
    scripts: ['./build/**/*.js', './build/**/*.css']
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
    return gulp.src(paths.coffee_scripts)
        // .pipe(sourcemaps.init())
        .pipe(coffee())
        // .pipe(uglify())
        // .pipe(concat('all.min.js'))
        // .pipe(sourcemaps.write())
        .on('error', swallowError)
        .pipe(gulp.dest('app/scripts'))
});


gulp.task('bower', function () {
    return gulp.src('./app/index.html')
        .pipe(wiredep({
            optional: 'configuration',
            goes: 'here'
        }))
        .on('error', swallowError)
        .pipe(gulp.dest('./app/'));
});
//
// gulp.task('inject', function () {
//     var target = gulp.src('./build/index.html');
//     var sources = gulp.src(['./build/**/*.js', './build/**/*.css'], {read: false});
//     return target.pipe(inject(sources, {ignorePath: 'build'}))
//         .on('error', swallowError)
//         .pipe(gulp.dest('./build/'));
// });

// Copy all static images
gulp.task('images', ['clean'], function () {
    return gulp.src(paths.images)
    // Pass in options to the task
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('build/img'));
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.coffee_scripts, ['scripts']);
    gulp.watch('bower.json', ['bower']);
});

gulp.task('start:server', function () {
    connect.server({
        root: ['app'],
        livereload: false,
        // Change this to '0.0.0.0' to access the server from outside.
        port: 9000,
        middleware: function (connect) {
            return [connect().use("/bower_components", connect.static("bower_components"))];
        }
    });
});
// The default task (called when you run `gulp` from cli)
gulp.task('serve', function(cb) {
    runSequence('scripts', 'bower', 'start:server', 'watch', cb);
});
gulp.task('default', ['watch', 'scripts', 'bower', 'start:server']);


function swallowError (error) {
    console.log(error.toString());
    this.emit('end')
}