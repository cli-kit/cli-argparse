# Parse

Lightweight argument parser.

This module does not define any options or any program requirements it simply parses arguments into an object structure that is easier for other modules to work with.

## Install

```
npm install cli-argparse
```

## Test

```
npm test
```

## API

```javascript
var parse = require('argparse');
var result = parse();  // use process.argv.slice(2)
console.dir(result);
```

## License

Everything is [MIT](http://en.wikipedia.org/wiki/MIT_License). Read the [license](/LICENSE) if you feel inclined.
