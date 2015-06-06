var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var del = require('del');
var copy = require('gulp-copy');
var sass = require('gulp-sass');
//var neat = require('node-neat').includePaths;
var webpack = require('gulp-webpack');

var paths = {
  js: './app/**/*.js',
  html: './app/index.html',
  sass: './app/sass/**/*',
  client: './app/js/client.js'
};

gulp.task('jscs', function() {
  return gulp.src(paths.js)
    .pipe(jscs());
});

gulp.task('jshint', function() {
  return gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('clean', function(cb) {
  del(['./build/**/*'], cb);
});

gulp.task('copy', ['clean'], function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest('./build'))
});

gulp.task('sass', ['clean'], function() {
  return gulp.src(paths.sass)
    .pipe(sass({
      includePaths: ['sass']//.concat(neat)
    }))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('webpack', ['clean'], function() {
  return gulp.src(paths.client)
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
  gulp.watch([paths.js, paths.sass], ['build'])
})

gulp.task('default', ['jscs', 'jshint', 'clean', 'sass', 'webpack', 'copy']);
gulp.task('build', ['clean', 'copy', 'sass', 'webpack']);
