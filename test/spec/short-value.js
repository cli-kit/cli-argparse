var expect = require('chai').expect;
var parse = require('../..');

describe('cli-argparse:', function() {

  it('should treat short argument as option w/ short option', function(done) {
    var args = ['-h', 'localhost', '-p', '8080'];
    var result = parse(args, {short: true});
    expect(result.raw).to.eql(args);
    expect(result.options.h).to.eql('localhost');
    expect(result.options.p).to.eql('8080');
    done();
  });

})
