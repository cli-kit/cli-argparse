var expect = require('chai').expect;
var parse = require('../..');

describe('cli-argparse:', function() {
  it('should handle no arguments', function(done) {
    // NOTE: we have to modify as mocha has arguments
    process.argv = process.argv.slice(0, 2);
    var result = parse();
    expect(result.flags).to.eql({});
    expect(result.options).to.eql({});
    expect(result.raw).to.eql([]);
    expect(result.stdin).to.eql(false);
    expect(result.unparsed).to.eql([]);
    done();
  });
  it('should handle empty array', function(done) {
    var result = parse([]);
    expect(result.flags).to.eql({});
    expect(result.options).to.eql({});
    expect(result.raw).to.eql([]);
    expect(result.stdin).to.eql(false);
    expect(result.unparsed).to.eql([]);
    done();
  });
})
