var expect = require('chai').expect;
var parse = require('../..');

describe('cli-argparse:', function() {
  it('should return flat result object', function(done) {
    var flags = ['--syntax-highlight'];
    var opts = ['--port'];
    var args = ['--port=80', '--syntax-highlight', 'file.txt'];
    var result = parse(args, {flags: flags, options: opts, flat: true});
    expect(result.raw).to.eql(args);
    expect(result.flags).to.eql(undefined);
    expect(result.options.port).to.eql('80');
    expect(result.options.syntaxHighlight).to.eql(true);
    expect(result.unparsed).to.eql(['file.txt']);
    done();
  });
})
