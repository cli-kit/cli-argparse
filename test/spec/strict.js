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
  it('should ignore unknown options in strict mode (options conf)',
    function(done) {
      var aliases = {'--syntax-highlight': 'highlight'}
      var flags = ['--syntax-highlight'];
      var options = ['--port'];
      var args = ['--port=80', '--syntax-highlight', '-u', 'file.txt'];
      var result = parse(args, {
        flags: flags, options: options, alias: aliases, strict: true});
      expect(result.raw).to.eql(args);
      expect(result.flags.highlight).to.eql(true);
      expect(result.options.port).to.eql('80');
      expect(result.unparsed).to.eql(['-u','file.txt']);
      //console.dir(result);
      done();
    }
  );
  it('should expand flags in strict mode', function(done) {
    var aliases = {'--syntax-highlight': 'highlight'}
    var flags = ['--syntax-highlight', '-x', '-v', '-f'];
    var args = ['-xvfg', '--port=80', '--no-syntax-highlight', 'file.txt'];
    var result = parse(args, {flags: flags, alias: aliases, strict: true});
    expect(result.raw).to.eql(args);
    expect(result.flags.highlight).to.eql(false);
    expect(result.flags.x).to.eql(true);
    expect(result.flags.v).to.eql(true);
    expect(result.flags.f).to.eql(true);
    //console.dir(result);
    expect(result.unparsed).to.eql(['-g', '--port=80', 'file.txt']);
    done();
  });
})
