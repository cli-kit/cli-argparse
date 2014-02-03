var expect = require('chai').expect;
var parse = require('../..');

describe('cli-argparse:', function() {
  it('should treat long option as flag with alias', function(done) {
    var aliases = {'--syntax-highlight': 'highlight'}
    var flags = ['--syntax-highlight'];
    var args = ['--port=80', '--syntax-highlight', 'file.txt'];
    var result = parse(args, {flags: flags, alias: aliases, strict: true});
    expect(result.raw).to.eql(args);
    //console.dir(result);
    expect(result.flags.highlight).to.eql(true);
    expect(result.unparsed).to.eql(['--port=80', 'file.txt']);
    done();
  });
})
