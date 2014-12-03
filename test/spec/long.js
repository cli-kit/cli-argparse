var expect = require('chai').expect;
var parse = require('../..');

describe('cli-argparse:', function() {
  it('should parse long option values', function(done) {
    var args = ['--port=80', '--host-name', 'localhost'];
    var result = parse(args);
    expect(result.raw).to.eql(args);
    expect(result.options.port).to.be.a('string').that.equals('80');
    expect(result.options.hostName).to.be.a('string').that.equals('localhost');
    done();
  });
  it('should parse mutiple long option values', function(done) {
    var args = ['--file=file.txt', '--file', 'file.json'];
    var result = parse(args);
    expect(result.raw).to.eql(args);
    expect(result.options.file).to.be.an('array')
      .to.eql(['file.txt', 'file.json']);
    done();
  });
  it('should accepted value with hyphen on forced option', function(done) {
    var options = ['--file'];
    var args = ['--file', '-file.txt'];
    var result = parse(args, {options: options});
    expect(result.raw).to.eql(args);
    expect(result.options.file).to.eql('-file.txt');
    done();
  });
  it('should allow value with hyphen (short option equality)', function(done) {
    var args = ['-int=-1'];
    var result = parse(args);
    expect(result.raw).to.eql(args);
    expect(result.options.int).to.eql('-1');
    done();
  });
  it('should allow value with hyphen (long option equality)', function(done) {
    var args = ['--integer=-1'];
    var result = parse(args);
    expect(result.raw).to.eql(args);
    expect(result.options.integer).to.eql('-1');
    done();
  });
  it('should allow multiple leading hyphens', function(done) {
    var args = ['-----syntax-highlight=true'];
    var result = parse(args);
    expect(result.raw).to.eql(args);
    expect(result.options.syntaxHighlight).to.eql('true');
    done();
  });
})
