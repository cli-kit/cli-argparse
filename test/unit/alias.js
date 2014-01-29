var expect = require('chai').expect;
var argparse = require('../..');

describe('cli-argparse:', function() {
  it('should use alias key', function(done) {
    var aliases = { "v verbose": "verbose"};
    var args = ['--no-verbose', '-v'];
    var result = argparse(args, {alias: aliases});
    expect(result.flags.verbose).to.eql(true);
    done();
  });
})
