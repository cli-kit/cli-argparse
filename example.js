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
