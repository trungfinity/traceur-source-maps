'use strict';

describe('traceur-source-maps', function () {
  it('should report correct line number where error occurred in stack trace', function () {
    try {
      require('../resources/bootstrap');
    }
    catch (err) {
      expect(err).to.have.property('stack')
        .that.have.string('greet.js:8:9')
        .that.have.string('greet.js:4:3')
        .that.have.string('main.js:5:1');
    }
  });
});
