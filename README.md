# traceur-source-maps

[![NPM version][meta-img-npm]][meta-url-npm]
[![Build status][meta-img-travis]][meta-url-travis]
[![Coveralls status][meta-img-coveralls]][meta-url-coveralls]
[![Support us][meta-img-gratipay]][meta-url-gratipay]

When using [Traceur][url-traceur] as a command-line utility to transpile
[Node.js][url-node] source code, it provides `--source-maps` option to
create source map files. But when using at runtime by requiring
[traceur][url-traceur] module to live-transpile files, [Traceur][url-traceur]
lacks the ability to reports correct stack trace.

Here comes this module to solve that problem: it provides source map for
[Node.js][url-node] files when using [Traceur][url-traceur] on the fly.

## Installation

This module can be installed easily with [npm][url-npm]:

```sh
$ npm install traceur-source-maps
```

## Usage

Below is a small example to describe how to use this module.

**bootstrap.js**:

```js
var traceur = require('traceur');

require('traceur-source-maps').install(traceur);

traceur.require.makeDefault(function (filePath) {
  return !~filePath.indexOf('node_modules');
});
// There is no need to pass `{ sourceMaps: true }` as options,
// source mapping is always enabled after install

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

Run **bootstrap.js** using [Node.js][url-node], notice the stack trace
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

## Compatibility

* This module conflicts with all source code which uses
[source-map-support][url-source-map-support] module (or maybe some modules
with similar features) to provide source mapping.

* This module has been tested to run properly with [Traceur][url-traceur]
version **0.0.72** (latest version at the time of writing). It could be broken
in the future if [Traceur][url-traceur] introduces non backward-compatible
changes. In that circumstance, feel free to [create new issue][repo-url-new-issue]
or [create a pull request][repo-url-pull-request].

## Contributing

Before [create a pull request][repo-url-pull-request], make sure that you:

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

This module is released under [MIT license][repo-license].

[//]: # (Site URLs)
[url-node]: http://nodejs.org
[url-npm]: https://www.npmjs.org/
[url-editorconfig]: http://editorconfig.org
[url-jshint-docs]: http://www.jshint.com/docs
[url-traceur]: https://github.com/google/traceur-compiler
[url-source-map-support]: https://github.com/evanw/node-source-map-support

[//]: # (Repository URLs and resources)
[repo-url-new-issue]: https://github.com/meoguru/traceur-source-maps/issues/new
[repo-url-pull-request]: https://github.com/meoguru/traceur-source-maps/pulls
[repo-license]: https://github.com/meoguru/traceur-source-maps/blob/master/LICENSE
[repo-editorconfig]: https://github.com/meoguru/traceur-source-maps/blob/master/.editorconfig
[repo-jshintrc]: https://github.com/meoguru/traceur-source-maps/blob/master/.jshintrc

[//]: # (Repository meta information)
[meta-url-npm]: https://npmjs.org/package/traceur-source-maps
[meta-img-npm]: https://img.shields.io/npm/v/traceur-source-maps.svg?style=flat
[meta-url-travis]: https://travis-ci.org/meoguru/traceur-source-maps
[meta-img-travis]: https://img.shields.io/travis/meoguru/traceur-source-maps.svg?style=flat
[meta-url-coveralls]: https://coveralls.io/r/meoguru/traceur-source-maps
[meta-img-coveralls]: https://img.shields.io/coveralls/meoguru/traceur-source-maps/master.svg?style=flat
[meta-url-gratipay]: https://gratipay.com/meoguru
[meta-img-gratipay]: https://img.shields.io/gratipay/meoguru.svg?style=flat

[//]: # (Authors and contributors URLs)
[url-meoguru]: http://meo.guru
