# Parse

Lightweight argument parser.

This module does not define any options or any program requirements it simply parses arguments into an object structure that is easier for other modules to work with.

## Features

* Lightweight, zero-dependencies `<100` lines of code
* Supports multiple option values
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

## API

```javascript
var parse = require('cli-argparse');
var result = parse();  // use process.argv.slice(2)
console.dir(result);
```

### parse(args)

* `args`: Specific arguments to parse, default is `process.argv.slice(2)`.

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
