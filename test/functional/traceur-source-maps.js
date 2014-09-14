'use strict';

describe('traceur-source-maps', function () {
  it('should report correct line number where error occurred in stack trace', function () {
    var traceur = require('traceur');
    var traceurSourceMaps = require('../..');

    traceurSourceMaps.install();

    traceur.require.makeDefault(function (filePath) {
      return !~filePath.indexOf('node_modules');
    });

    try {
      require('../resources/main');
    }
    catch (err) {
      expect(err).to.have.property('stack')
        .that.have.string('greet.js:6:9')
        .that.have.string('greet.js:2:3')
        .that.have.string('main.js:3:1');
    }
  });
});
