'use strict';

var traceur = require('traceur');

require('../..').install(traceur);

traceur.require.makeDefault(function (filePath) {
  return !~filePath.indexOf('node_modules');
});

require('./main');
