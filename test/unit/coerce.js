var expect = require('chai').expect;
var parse = require('../..');

describe('cli-argparse:', function() {
  it('should coerce non-strings', function(done) {
    var args = ['--port', 8080];
    var result = parse(args);
    expect(result.options.port).to.eql('8080');
    done();
  });
})
