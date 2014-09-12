'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var coveralls = require('gulp-coveralls');

var chai = require('chai');

gulp.task('lint', function () {
  return gulp.src([
      'lib/**/*.js',
      'test/**/*.js',
      'gulpfile.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('test', function (cb) {
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

gulp.task('coveralls', [ 'lint', 'test' ], function () {
  return gulp.src('coverage/lcov.info')
    .pipe(coveralls());
});
