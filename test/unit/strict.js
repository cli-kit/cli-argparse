var expect = require('chai').expect;
var parse = require('../..');

describe('cli-argparse:', function() {
  it('should ignore unknown options in strict mode', function(done) {
    var aliases = {'--syntax-highlight': 'highlight'}
    var flags = ['--syntax-highlight'];
    var args = ['--port=80', '--syntax-highlight', 'file.txt'];
    var result = parse(args, {flags: flags, alias: aliases, strict: true});
    expect(result.raw).to.eql(args);
    expect(result.flags.highlight).to.eql(true);
    expect(result.unparsed).to.eql(['--port=80', 'file.txt']);
    done();
  });
  it('should allow negated long flag in strict mode', function(done) {
    var aliases = {'--syntax-highlight': 'highlight'}
    var flags = ['--syntax-highlight'];
    var args = ['--port=80', '--no-syntax-highlight', 'file.txt'];
    var result = parse(args, {flags: flags, alias: aliases, strict: true});
    //console.dir(result);
    expect(result.raw).to.eql(args);
    expect(result.flags.highlight).to.eql(false);
    expect(result.unparsed).to.eql(['--port=80', 'file.txt']);
    done();
  });
})
