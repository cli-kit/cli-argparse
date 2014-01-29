var expect = require('chai').expect;
var argparse = require('../..');

describe('cli-argparse:', function() {
  it('should ignore non-option', function(done) {
    var args = ['server', 'start', '--port=80', '--host-name', 'localhost'];
    var result = argparse(args);
    expect(result.raw).to.eql(args);
    expect(result.unparsed).to.be.an('array')
      .to.eql(['server', 'start']);
    done();
  });
})
