# Traceur source maps

[![NPM version][img-npm]][url-npm]
[![Downloads][img-downloads]][url-npm]
[![Support us][img-gratipay]][url-gratipay]
[![Build Status][img-travis]][url-travis]
[![Coveralls Status][img-coveralls]][url-coveralls]

When using [Traceur][url-traceur] as a command-line utility to transpile
[Node.js][url-nodejs] source code, it provides `--source-maps` option to
create source map files. But when using at runtime by requiring `traceur`
module to live-transpile files, [Traceur][url-traceur] lacks the ability
to reports correct stack trace.

Here comes this module to solve that problem: it provides source map for
[Node.js][url-nodejs] files when using [Traceur][url-traceur] on the fly.

## Installation

This module can be installed easily with `npm`:

```sh
$ npm install traceur-source-maps
```

## Usage

Below is a small example to describe how to use this module.

**bootstrap.js**:

```js
var traceur = require('traceur');

require('traceur-source-maps').install(traceur);

traceur.require.makeDefault(
  function (filename) {
    return !~filename.indexOf('node_modules');
  },
  { sourceMaps: true }
);

require('./main');
```

**main.js**:

```js
import { hey } from './greet';

hey();
```

**greet.js**:

```js
export function hey() {
  hi();
}

export function hi() {
  throw new Error('Call me maybe!');
}
```

Run **bootstrap.js** using [Node.js][url-nodejs], notice the stack trace
reports correct line number where the error occurred (line 6 of **greet.js**).

```sh
$ node bootstrap.js

/some/dir/greet.js:6
  throw new Error('Call me maybe!');

        ^
Error: Call me maybe!
    at hi (/some/dir/greet.js:6:9)
    at hey (/some/dir/greet.js:2:3)
    at Object.<anonymous> (/some/dir/main.js:3:1)
    at Module._compile (module.js:456:26)
    at Object.Module._extensions..js (/some/dir/node_modules/traceur-source-maps/node_modules/traceur/src/node/require.js:65:21)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:312:12)
    at Module.require (module.js:364:17)
    at require (module.js:380:17)
    at Object.<anonymous> (/some/dir/bootstrap.js:12:1)
```

An almost identical, in-source-code example can be found [here][repo-test-res].

## Compatibility

* This module conflicts with all source code which uses
[source-map-support][url-source-map-support] module (or maybe some modules
with similar features) to provide source mapping.

* This module has been tested to run properly with [Traceur][url-traceur]
version **0.0.61** (latest version at the time of writing). It could be broken
in the future if [Traceur][url-traceur] introduces non backward-compatible
changes. In that circumstance, feel free to [create new issue][url-new-issue]
or [create a pull request][url-pull-request].

## Contributing

Before [create a pull request][url-pull-request], make sure that you:

* Followed coding convention as described in
**[.editorconfig][repo-editorconfig]** or **[.jshintrc][repo-jshintrc]** file
(more information can be found at [editorconfig.org][url-editorconfig] and
[www.jshint.com/docs][url-jshint-docs], respectively).

* Added tests for your code.

* Passed all tests!

To execute all tests, simply run:

    $ npm test

### Contributors

* **Author**: [Meo][url-meoguru]

## License

This module is released under [MIT license][url-license].

[//]: # (Site URLs)
[url-nodejs]: http://nodejs.org
[url-traceur]: http://github.com/google/traceur-compiler
[url-editorconfig]: http://editorconfig.org
[url-jshint-docs]: http://www.jshint.com/docs

[//]: # (External repository URLs)
[url-source-map-support]: http://github.com/evanw/node-source-map-support

[//]: # (Repository URLs)
[url-new-issue]: http://github.com/meoguru/traceur-source-maps/issues/new
[url-pull-request]: http://github.com/meoguru/traceur-source-maps/pulls
[url-license]: http://github.com/meoguru/traceur-source-maps/blob/master/LICENSE

[//]: # (Repository resources)
[repo-editorconfig]: http://github.com/meoguru/traceur-source-maps/blob/master/.editorconfig
[repo-jshintrc]: http://github.com/meoguru/traceur-source-maps/blob/master/.jshintrc
[repo-test-res]: http://github.com/meoguru/traceur-source-maps/tree/master/test/resources

[//]: # (Repository meta information)
[url-npm]: https://npmjs.org/package/traceur-source-maps
[img-npm]: http://img.shields.io/npm/v/traceur-source-maps.svg?style=flat
[img-downloads]: http://img.shields.io/npm/dm/traceur-source-maps.svg?style=flat
[url-gratipay]: https://gratipay.com/meoguru
[img-gratipay]: http://img.shields.io/gratipay/meoguru.svg?style=flat
[url-travis]: https://travis-ci.org/meoguru/traceur-source-maps
[img-travis]: http://img.shields.io/travis/meoguru/traceur-source-maps.svg?style=flat
[url-coveralls]: https://coveralls.io/r/meoguru/traceur-source-maps
[img-coveralls]: http://img.shields.io/coveralls/meoguru/traceur-source-maps/master.svg?style=flat

[//]: # (Authors and contributors URLs)
[url-meoguru]: http://meo.guru
