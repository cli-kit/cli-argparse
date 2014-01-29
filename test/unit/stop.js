var expect = require('chai').expect;
var argparse = require('../..');

describe('cli-argparse:', function() {
  it('should stop parsing', function(done) {
    var args = ['-xvf', '--', 'server', '--port=80', '--host=localhost'];
    var result = argparse(args);
    expect(result.raw).to.eql(args);
    expect(result.flags.x).to.eql(true);
    expect(result.flags.v).to.eql(true);
    expect(result.flags.f).to.eql(true);
    expect(result.unparsed).to.be.an('array');
    expect(result.unparsed.length).to.eql(3);
    expect(result.unparsed[0]).to.eql(args[2]);
    expect(result.unparsed[1]).to.eql(args[3]);
    expect(result.unparsed[2]).to.eql(args[4]);
    done();
  });
})
