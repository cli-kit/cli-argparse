var expect = require('chai').expect;
var parse = require('../..');

describe('cli-argparse:', function() {
  it('should treat long option as flag', function(done) {
    var flags = ['--syntax-highlight'];
    var args = ['--port=80', '--syntax-highlight', 'file.txt'];
    var result = parse(args, {flags: flags});
    expect(result.raw).to.eql(args);
    expect(result.options.port).to.be.a('string').that.equals('80');
    expect(result.flags.syntaxHighlight).to.eql(true);
    expect(result.unparsed).to.eql(['file.txt']);
    done();
  });
  it('should treat long option as flag with alias', function(done) {
    var aliases = {'--syntax-highlight': 'highlight'}
    var flags = ['--syntax-highlight'];
    var args = ['--port=80', '--syntax-highlight', 'file.txt'];
    var result = parse(args, {flags: flags, alias: aliases});
    expect(result.raw).to.eql(args);
    expect(result.options.port).to.be.a('string').that.equals('80');
    expect(result.flags.highlight).to.eql(true);
    expect(result.unparsed).to.eql(['file.txt']);
    done();
  });
  it('should allow non-hyphenated flag', function(done) {
    var flags = ['?'];
    var aliases = {'?': 'help'};
    var args = ['?'];
    var result = parse(args, {flags: flags, alias: aliases});
    expect(result.flags.help).to.eql(true);
    done();
  });
})
