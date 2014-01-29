var expect = require('chai').expect;
var parse = require('../..');

describe('cli-argparse:', function() {
  it('should handle long option negation', function(done) {
    var args = ['--color', '--no-color'];
    var result = parse(args);
    expect(result.raw).to.eql(args);
    expect(result.flags.color).to.eql(false);
    done();
  });
  it('should handle long option negation override', function(done) {
    var args = ['--no-color', '--color'];
    var result = parse(args);
    expect(result.raw).to.eql(args);
    expect(result.flags.color).to.eql(true);
    done();
  });
})
