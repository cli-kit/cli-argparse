var expect = require('chai').expect;
var parse = require('../..');

describe('cli-argparse:', function() {
  it('should treat short argument as option (equality)', function(done) {
    var args = ['-f=file.json'];
    var result = parse(args);
    expect(result.raw).to.eql(args);
    expect(result.options.f).to.eql('file.json');
    done();
  });
  it('should treat short argument as option', function(done) {
    var options = ['-f'];
    var args = ['--port=80', '-f', 'file.txt', '-f=file.json'];
    var result = parse(args, {options: options});
    expect(result.raw).to.eql(args);
    expect(result.options.port).to.be.a('string').that.equals('80');
    expect(result.options.f).to.eql(['file.txt', 'file.json']);
    done();
  });
  it('should treat short argument as option on flag expansion', function(done) {
    var options = ['-f'];
    var args = ['-xvf', 'file.txt', '-f=file.json'];
    var result = parse(args, {options: options});
    expect(result.raw).to.eql(args);
    expect(result.options.f).to.eql(['file.txt', 'file.json']);
    done();
  });
  it('should treat short argument as option with alias', function(done) {
    var aliases = {'-f': 'file'};
    var options = ['-f'];
    var args = ['-xvf', 'file.txt', '-f=file.json', '-f', 'file.js'];
    var result = parse(args, {options: options, alias: aliases});
    expect(result.raw).to.eql(args);
    expect(result.options.file).to.eql(['file.txt', 'file.json', 'file.js']);
    done();
  });
})
