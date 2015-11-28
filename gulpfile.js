/**
 * Imports
 */
var gulp        = require('gulp');
var del         = require('del');
var plumber     = require('gulp-plumber');
var header      = require('gulp-header');
var rename      = require('gulp-rename');
var browserify  = require('browserify');
var buffer      = require('vinyl-buffer');
var source      = require('vinyl-source-stream');
var uglify      = require('gulp-uglify');
var karma       = require('karma').Server;
var runSequence = require('run-sequence');
var pkg         = require('./package.json');

var banner = [
    '/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    '',
    ''
].join('\n');

var paths = {
    input: 'src/',
    output: 'dist/'
};

var inputFilePath = paths.input + 'channel-api.js';

var outputFileName = 'channel-api-stub.js';
var outputFileNameMin = 'channel-api-stub.min.js';

gulp.task('clean', function(cb) {
    del([
        paths.output + '**'
    ], cb)
});

gulp.task('build:dev', function() {

    return browserify({
            entries: inputFilePath,
            standalone: 'channelapi'
        })
        .bundle()
        .pipe(plumber())
        .pipe(source('channel-api.js'))
        .pipe(buffer())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename(outputFileName))
        .pipe(gulp.dest(paths.output));
});

gulp.task('build:min', function() {

    return browserify(inputFilePath)
      .bundle()
      .pipe(plumber())
      .pipe(source('channel-api.js'))
      .pipe(buffer())
      .pipe(header(banner, { pkg: pkg }))
      .pipe(uglify({
          mangle: false
      }))
      .pipe(rename(outputFileNameMin))
      .pipe(gulp.dest(paths.output));

});

gulp.task('watch', function() {
    gulp.watch(paths.input + '/*', ['test']);
    gulp.watch('test/unit/**/*.spec.js', ['test']);
});

gulp.task('test', function(callback) {
    new karma({
      configFile: __dirname + '/test/karma.conf.js',
      singleRun: true
    }, callback).start();
});

gulp.task('default', function(callback) {
    runSequence(
        'test',
        'watch',
        callback
    );
});

gulp.task('build', function(callback) {
    runSequence(
        'clean',
        'test',
        [
            'build:dev',
            'build:min'
        ],
        callback
    );
});