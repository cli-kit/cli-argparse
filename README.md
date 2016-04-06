Table of Contents
=================

* [Parse](#parse)
  * [Features](#features)
  * [Install](#install)
  * [Example](#example)
  * [API](#api)
    * [parse([args], [options])](#parseargs-options)
      * [Options](#options)
      * [Result](#result)
      * [Aliases](#aliases)
      * [Flags](#flags)
      * [Options](#options-1)
      * [Strict](#strict)
      * [Flat](#flat)
      * [Vars](#vars)
  * [Developer](#developer)
    * [Test](#test)
    * [Cover](#cover)
    * [Lint](#lint)
    * [Clean](#clean)
    * [Readme](#readme)
  * [License](#license)

Parse
=====

[<img src="https://travis-ci.org/cli-kit/cli-argparse.svg?v=2" alt="Build Status">](https://travis-ci.org/tmpfs/cli-argparse)
[<img src="http://img.shields.io/npm/v/cli-argparse.svg?v=2" alt="npm version">](https://npmjs.org/package/cli-argparse)
[<img src="https://coveralls.io/repos/cli-kit/cli-argparse/badge.svg?branch=master&service=github&v=2" alt="Coverage Status">](https://coveralls.io/github/tmpfs/cli-argparse?branch=master).

Lightweight yet feature rich argument parser.

This module does not define any options or any program requirements it simply parses arguments into an object structure that is easier for other modules to work with.

## Features

* Supports multiple option values as arrays.
* Supports long flag negations, eg: `--no-color`.
* Supports `--option=value`, `--option value` and `option=value`.
* Expands short flags such as `-xvf`.
* Supports multiple flags as numbers: `-ddd`.
* Assignment on last flag expansion `-xvf file.tgz`.
* Treat `-` as special stdin flag.
* Stop argument parsing on `--`.
* Comprehensive test suite.
* 100% code coverage.

## Install

```
npm install cli-argparse
```

## Example

```javascript
var parse = require('./index');
var args = [
  'server',
  'start',
  '-xvd',
  '--port=80',
  '--config',
  '-',
  '--config=config.json',
  '--log',
  'server.log',
  '--no-color'
];
var result = parse(args);
console.log(JSON.stringify(result, undefined, 2));
```

```json
{
  "flags": {
    "x": true,
    "v": true,
    "d": true,
    "color": false
  },
  "options": {
    "port": "80",
    "config": [
      "-",
      "config.json"
    ],
    "log": "server.log"
  },
  "raw": [
    "server",
    "start",
    "-xvd",
    "--port=80",
    "--config",
    "-",
    "--config=config.json",
    "--log",
    "server.log",
    "--no-color"
  ],
  "stdin": true,
  "unparsed": [
    "server",
    "start"
  ],
  "strict": false,
  "vars": {}
}
```

## API

```javascript
var parse = require('cli-argparse');
var result = parse();
console.dir(result);
```

### parse([args], [options])

* `args`: Specific arguments to parse, default is `process.argv.slice(2)`.
* `options`: Parsing configuration options.

Returns a result object.

#### Options

* `alias`: Map of argument names to property names.
* `flags`: Array of argument names to be treated as flags.
* `options`: Array of argument names to be treated as options.
* `short`: Allow short options to have values.
* `strict`: A boolean that indicates only arguments specified as `options` or `flags` should be parsed.
* `flat`: A boolean that creates a flat result structure.
* `stop`: Array of strings or patterns to stop parsing on, the special pattern `--` is always respected first.
* `vars`: A string or regexp used to collect variables into the `vars` object.
* `camelcase`: When `false` do not convert option names to camelcase; when a string or regexp split the option name on the given pattern for conversion to camelcase.

#### Result

The result object contains the fields:

* `flags`: Object containing arguments treated as flags.
* `options`: Object containing arguments treated as options with values.
* `raw`: Array of the raw arguments parsed. 
* `stdin`: Boolean indicating whether `-` is present in the argument list.
* `unparsed`: Array of values that were not parsed.
* `skip`: Array of args skipped upon `--` or a custom stop pattern.
* `stop`: If a stop pattern matched this will contain the pattern that matched (string or regexp).
* `empty`: Set to `true` if a stop pattern matched on the first argument.
* `vars`: Variables collected when the `vars` option is configured.

#### Aliases

Aliases allow arguments to map to meaningful property names that will be set on the result object `options` and `flags`.

Aliases are mapped on the raw argument name, to map `-v | --verbose` to a `verbose` property use `{'-v --verbose': 'verbose'}`.

Note that you should **not** use the negated long form (--no-highlight) when specifying these hints, always use the positive form.

#### Flags

Use the flags array when you need to force a long argument to be treated as a flag, for example `['--syntax-highlight']`.

#### Options

Use the options array when you need to treat a short argument as accepting a value, for example `['-f']`.

#### Strict

A `boolean` that indicates that only known arguments (those declared in the options and flags properties) are accepted, all other arguments will be placed in the unparsed array.

#### Flat

Creating a flat result can be useful if you are certain that there are no naming collisions, typically this can be achieved by providing hints using `flags` and `options`.

When this option is specified the result object will not have a `flags` property, instead all flags and options will be in the `options` property of the result.

#### Vars

Sometimes it is useful to collect arguments following a convention, for example `-D` like java or maybe all arguments prefixed with `@`. When the `vars` option is set all arguments that match the convention are collected in to the `vars` result object, see the [vars test spec](https://github.com/cli-kit/cli-argparse/blob/master/test/spec/vars.js) for examples.

## Developer

### Test

To run the test suite:

```
npm test
```

### Cover

To generate code coverage run:

```
npm run cover
```

### Lint

Run the source tree through [jshint](http://jshint.com) and [jscs](http://jscs.info):

```
npm run lint
```

### Clean

Remove generated files:

```
npm run clean
```

### Readme

To build the readme file from the partial definitions (requires [mdp](https://github.com/tmpfs/mdp)):

```
npm run readme
```

## License

Everything is [MIT](http://en.wikipedia.org/wiki/MIT_License). Read the [license](https://github.com/cli-kit/cli-argparse/blob/master/LICENSE) if you feel inclined.

Generated by [mdp(1)](https://github.com/tmpfs/mdp).

[mdp]: https://github.com/tmpfs/mdp
[jshint]: http://jshint.com
[jscs]: http://jscs.info
