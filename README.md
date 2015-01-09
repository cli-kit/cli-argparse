# Parse

Lightweight yet feature rich argument parser.

This module does not define any options or any program requirements it simply parses arguments into an object structure that is easier for other modules to work with.

## Features

* Supports multiple option values as arrays
* Supports long flag negations, eg: `--no-color`
* Supports `--option=value`, `--option value` and `option=value`
* Expands short flags such as `-xvf`
* Assignment on last flag expansion `-xvf file.tgz`
* Treat `-` as special stdin flag
* Stop argument parsing on `--`
* Comprehensive test suite
* 100% code coverage

## Install

```
npm install cli-argparse
```

## Test

```
npm test
```

## Example

```javascript
var parse = require('cli-argparse');
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
  ]
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

Note that you should **not** use the negated long form (--no-highlight) when specifying these hints, always use the positive form.

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

##### Aliases

Aliases allow arguments to map to meaningful property names that will be set on the result object `options` and `flags`.

Aliases are mapped on the raw argument name, to map `-v | --verbose` to a `verbose` property use `{'-v --verbose': 'verbose'}`.

##### Flags

Use the flags array when you need to force a long argument to be treated as a flag, for example `['--syntax-highlight']`.

##### Options

Use the options array when you need to treat a short argument as accepting a value, for example `['-f']`.

##### Strict

A `boolean` that indicates that only known arguments (those declared in the options and flags properties) are accepted, all other arguments will be placed in the unparsed array.

##### Flat

Creating a flat result can be useful if you are certain that there are no naming collisions, typically this can be achieved by providing hints using `flags` and `options`.

When this option is specified the result object will not have a `flags` property, instead all flags and options will be in the `options` property of the result.

## License

Everything is [MIT](http://en.wikipedia.org/wiki/MIT_License). Read the [license](/LICENSE) if you feel inclined.
