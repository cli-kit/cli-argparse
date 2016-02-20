var expect = require('chai').expect;
var parse = require('../..');

describe('cli-argparse:', function() {

  it('should disable camelcase', function(done) {
    var args = ['--syntax-highlight', '--log-file=foo.log'];
    var result = parse(args, {camelcase: false});
    expect(result.flags['syntax-highlight']).to.eql(true);
    expect(result.options['log-file']).to.eql('foo.log');
    done();
  });

  it('should use camelcase pattern', function(done) {
    var args = ['--syntax_highlight', '--log-file=foo.log', '--foo.bar=baz'];
    var result = parse(args, {camelcase: /[\.-]+/});
    expect(result.flags.syntax_highlight).to.eql(true);
    expect(result.options.logFile).to.eql('foo.log');
    expect(result.options.fooBar).to.eql('baz');
    done();
  });

})
