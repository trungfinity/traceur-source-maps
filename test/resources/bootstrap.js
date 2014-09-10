'use strict';

var traceur = require('traceur');

require('../..').install(traceur);

traceur.require.makeDefault(function (filename) {
  return !~filename.indexOf('node_modules');
});

require('./main');
