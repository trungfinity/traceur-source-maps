'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var path = {
  all: [
    'lib/**/*.js',
    'test/**/*.js',
    'gulpfile.js'
  ],
  code: [ 'lib/**/*.js' ],
  test: [
    'test/**/*.js',
    '!test/setup.js',
    '!test/resources/**/*.js'
  ],
  testSetup: [ 'test/setup.js' ],
  testResources: [ 'test/resources/**/*.js' ]
};

var watching = false;

gulp.task('lint', function () {
  return lint(gulp.src(path.all));
});

gulp.task('test', function (cb) {
  gulp.src(path.code)
    .pipe($.istanbul({
      includeUntested: true
    }))
    .on('finish', function () {
      test(gulp.src(path.test))
        .pipe($.istanbul.writeReports())
        .on('end', cb);
    });
});

gulp.task('watch', function () {
  watching = true;

  // Lints only changed files
  lint($.watch(path.all));

  // Tests using only changed test files
  $.watch(path.test, test);

  // Tests all on code and test resource changes
  gulp.watch([
      path.code,
      path.testSetup,
      path.testResources
    ], [ 'test' ]);
});

gulp.task('coveralls', [ 'lint', 'test' ], function () {
  return gulp.src('coverage/lcov.info')
    .pipe($.coveralls());
});

function lint(src) {
  return src
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.notify({
      title: 'Lint',
      message: function (file) {
        if (file.jshint.success) {
          return false;
        }

        var errors = file.jshint.results.map(function (data) {
          if (data.error) {
            return $.util.template(
              '(<%= line %>:<%= character %>) <%= reason %>',
              {
                file: file,
                line: data.error.line,
                character: data.error.character,
                reason: data.error.reason
              }
            );
          }
        }).join('\n');

        return '<%= file.relative %> ' +
          '(<%= file.jshint.results.length %> ' +
          'error<% if (file.jshint.results.length > 1) { %>s<% } %>).\n' +
          errors;
      }
    }))
    .pipe($.jshint.reporter('fail'));
}

function test(src) {
  require('./test/setup');

  return src
    .pipe($.mocha())
    .on('error', $.notify.onError({
      title: 'Mocha',
      message: '<%= error.message %>'
    }))
    .on('error', function () {
      if (watching) {
        this.emit('end');
      }
      else {
        process.exit(1);
      }
    });
}
