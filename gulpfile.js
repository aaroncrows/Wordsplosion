var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');
var webpack = require('gulp-webpack');

var paths = {
  js: './app/**/*.js',
  html: './app/index.html',
  sass: './app/stylesheets/main.scss',
  client: './app/js/client.js'
};

gulp.task('lint', function() {
  return gulp.src(paths.js)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('clean', function(cb) {
  del(['./build/**/*'], cb);
});

gulp.task('copy', ['clean'], function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest('./build'));
});

gulp.task('sass', ['clean'], function() {
  return gulp.src(paths.sass)
    .pipe(sass({
      includePaths: ['sass']
    }))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('webpack', ['clean'], function() {
  return gulp.src(paths.client)
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
  gulp.watch([paths.js, './app/**/*.scss', './app/**/*.html'], ['build']);
});

gulp.task('default', ['lint', 'clean', 'sass', 'webpack', 'copy']);
gulp.task('build', ['clean', 'copy', 'sass', 'webpack']);
