var expect = require('chai').expect;
var parse = require('../..');

describe('cli-argparse:', function() {

  it('should not convert to camelcase', function(done) {
    var args = ['--syntax-highlight', '--log-file=foo.log'];
    var result = parse(args, {camelcase: false});
    expect(result.flags['syntax-highlight']).to.eql(true);
    expect(result.options['log-file']).to.eql('foo.log');
    done();
  });

})
