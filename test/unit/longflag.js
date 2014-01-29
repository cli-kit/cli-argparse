var expect = require('chai').expect;
var parse = require('../..');

describe('cli-argparse:', function() {
  it('should treat long option as flag', function(done) {
    var flags = ['--highlight-code'];
    var args = ['--port=80', '--highlight-code', 'file.txt'];
    var result = parse(args, {flags: flags});
    expect(result.raw).to.eql(args);
    expect(result.options.port).to.be.a('string').that.equals('80');
    expect(result.flags.highlightCode).to.eql(true);
    expect(result.unparsed).to.eql(['file.txt']);
    done();
  });
})
