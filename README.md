# Traceur source maps

When using [Traceur][2] as a command-line utility to transpile [Node.js][1]
source code, it provides `--source-maps` option to create source map files.
But when using at runtime by requiring `traceur` module to live-transpile files,
[Traceur][2] lacks the ability to reports correct stack trace.

Here comes this module to solve that problem: it provides source map for
[Node.js][1] files when using [Traceur][2] on the fly.

## Installation

This module can be installed easily with `npm`:

    $ npm install traceur-source-maps

## Usage

Below is a small example to describe how to use this module.

**bootstrap.js**:

    var traceur = require('traceur');

    require('traceur-source-maps').install(traceur);

    traceur.require.makeDefault(
      function (filename) {
        return !~filename.indexOf('node_modules');
      },
      { sourceMaps: true }
    );

    require('./main');

**main.js**:

    import { hey } from './greet';

    hey();

**greet.js**:

    export function hey() {
      hi();
    }

    export function hi() {
      throw new Error('Call me maybe!');
    }

Run **bootstrap.js** using [Node.js][1], notice the stack trace reports correct
line number where the error occurred (line 6 of **greet.js**).

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

An almost identical, in-source-code example can be found [here][3].

## Compatibility

* This module conflicts with all source code which uses [source-map-support][4]
module (or maybe some modules with similar features) to provide source mapping.

* This module has been tested to run properly with [Traceur][2] version
**0.0.61** (latest version at the time of writing). It could be broken in the
future if [Traceur][2] introduces non backward-compatible changes. In that
circumstance, feel free to [create new issue][5] or [create a pull request][6].

## Contribution

Before [create a pull request][6], make sure that you:

* Followed coding convention as described in **[.editorconfig][7]** or **[.jshintrc][8]** file
(more information can be found at [editorconfig.org][9] and [www.jshint.com/docs][10],
respectively).

* Added tests for your code.

* Passed all tests!

To execute all tests, simply run:

    $ npm test

### Contributors

* **Author**: [Meo][11]

## License

This module is released under [MIT license][12].

[1]: http://nodejs.org
[2]: http://github.com/google/traceur-compiler
[3]: http://github.com/meoguru/traceur-source-maps/tree/master/test/resources
[4]: http://github.com/evanw/node-source-map-support
[5]: http://github.com/meoguru/traceur-source-maps/issues/new
[6]: http://github.com/meoguru/traceur-source-maps/pulls
[7]: http://github.com/meoguru/traceur-source-maps/blob/master/.editorconfig
[8]: http://github.com/meoguru/traceur-source-maps/blob/master/.jshintrc
[9]: http://editorconfig.org
[10]: http://www.jshint.com/docs
[11]: http://meo.guru
[12]: http://github.com/meoguru/traceur-source-maps/blob/master/LICENSE
