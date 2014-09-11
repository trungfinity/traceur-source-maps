'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var chai = require('chai');
var coveralls = require('gulp-coveralls');

gulp.task('lint', function () {
  return gulp.src([
      'lib/**/*.js',
      'test/**/*.js',
      'gulpfile.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', [ 'lint' ], function (cb) {
  global.expect = chai.expect;

  gulp.src([ 'lib/**/*.js' ])
    .pipe(istanbul())
    .on('finish', function () {
      gulp.src([
          'test/**/*.js',
          '!test/resources/**/*.js'
        ])
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .on('end', cb);
    });
});

gulp.task('coveralls', [ 'test' ], function () {
  return gulp.src('coverage/lcov.info')
    .pipe(coveralls());
});
