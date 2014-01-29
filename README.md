# Parse

Lightweight argument parser.

This module does not define any options or any program requirements it simply parses arguments into an object structure that is easier for other modules to work with.

## Features

* Supports multiple option values as arrays
* Supports long flag negations, eg: `--no-color`
* Supports `--option=value` and `--option value`
* Expands short flags such as `-xvf`
* Treat `-` as special stdin flag
* Stop argument parsing on `--`

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
var parse = require('..');
var args = [
  'server',
  'start',
  '-xvd',
  '--port=80',
  '--file=file.txt',
  '--file',
  'file.json'
];
var result = parse(args);
```

```json
{
  "flags": {
    "x": true,
    "v": true,
    "d": true
  },
  "options": {
    "port": "80",
    "file": [
      "file.txt",
      "file.json"
    ]
  },
  "raw": [
    "server",
    "start",
    "-xvd",
    "--port=80",
    "--file=file.txt",
    "--file",
    "file.json"
  ],
  "stdin": false,
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

### Result

The result object contains the fields:

* `flags`: Object containing arguments treated as flags.
* `options`: Object containing arguments treated as options with values.
* `raw`: Array of the raw arguments parsed. 
* `stdin`: Boolean indicating whether `-` is present in the argument list.
* `unparsed`: Array of values that were not parsed.

## License

Everything is [MIT](http://en.wikipedia.org/wiki/MIT_License). Read the [license](/LICENSE) if you feel inclined.
