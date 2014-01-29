var expect = require('chai').expect;
var argparse = require('../..');

describe('cli-argparse:', function() {
  it('should stop parsing', function(done) {
    var args = [
      '-v',
      '-cffV',
      '--long', 'value',
      '--long', 'new-value',
      '--long-flag',
      '--no-color',
      '--file=file.json', '--file', 'file.txt',
      '-', '--', '--port=80'];
    var result = argparse(args);
    //console.dir(result);
    done();
  });
})
