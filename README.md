# Parse

Lightweight yet feature rich argument parser.

This module does not define any options or any program requirements it simply parses arguments into an object structure that is easier for other modules to work with.

## Features

* Supports multiple option values as arrays
* Supports long flag negations, eg: `--no-color`
* Supports `--option=value` and `--option value`
* Expands short flags such as `-xvf`
* Treat `-` as special stdin flag
* Stop argument parsing on `--`
* Comprehensive test suite

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

### parse(args, [options])

* `args`: Specific arguments to parse, default is `process.argv.slice(2)`.
* `options`: Parsing configuration options.

Returns a result object.

#### Result

The result object contains the fields:

* `flags`: Object containing arguments treated as flags.
* `options`: Object containing arguments treated as options with values.
* `raw`: Array of the raw arguments parsed. 
* `stdin`: Boolean indicating whether `-` is present in the argument list.
* `unparsed`: Array of values that were not parsed.

#### Options

* `alias`: Map of argument names to property names.
* `flags`: Array of argument names to be treated as flags.
* `options`: Array of argument names to be treated as options.

##### Aliases

Aliases are mapped on the raw argument name, to map `-v | --verbose` to a `verbose` property use `{'-v --verbose': 'verbose'}`.

##### Flags

Use the flags array when you need to force a long argument to be treated as a flag, for example `['--syntax-highlight']`.

##### Options

Use the options array when you need to treat a short argument as accepting a value, for example `['-f']`.

##### Strict

A `boolean` that indicates that only known arguments (those declared in the options and flags properties) are accepted, all other arguments will be placed in the unparsed array.

## License

Everything is [MIT](http://en.wikipedia.org/wiki/MIT_License). Read the [license](/LICENSE) if you feel inclined.
