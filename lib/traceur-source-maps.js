'use strict';

var crypto = require('crypto');
var os = require('os');
var path = require('path');
var fs = require('fs');

var parentRequire = require('parent-require');
var sourceMapSupport = require('source-map-support');

var defaultTraceur = parentRequire('traceur');
var key = String(Date.now());

exports.install = function (traceur) {
  /* istanbul ignore next */
  traceur = traceur || defaultTraceur;

  var Compiler = traceur.Compiler;
  var NodeCompiler = traceur.NodeCompiler;

  traceur.compile = function (source, options) {
    options = Compiler.commonJSOptions(options);
    options.filename = path.basename(options.moduleName);
    options.sourceMaps = true;

    var compiler = new NodeCompiler(options);
    var compiledSource = compiler.compile(source);

    var sourceMapPath = getSourceMapPath(options.moduleName);
    fs.writeFileSync(sourceMapPath, compiler.getSourceMap(), 'utf8');

    return compiledSource;
  };

  sourceMapSupport.install({
    retrieveSourceMap: retrieveSourceMap
  });
};

function retrieveSourceMap(sourcePath) {
  var sourceMapPath = getSourceMapPath(sourcePath);

  if (fs.existsSync(sourceMapPath)) {
    return {
      url: sourcePath,
      map: fs.readFileSync(sourceMapPath, 'utf8')
    };
  }

  return sourceMapSupport.retrieveSourceMap(sourcePath);
}

function getSourceMapPath(sourcePath) {
  var sourceMapBasename = shasum(sourcePath) + '.map';
  return path.join(os.tmpdir(), sourceMapBasename);
}

function shasum(value) {
  return crypto.createHmac('sha1', key)
    .update(value)
    .digest('hex');
}
