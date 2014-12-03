var expect = require('chai').expect;
var parse = require('../..');

describe('cli-argparse:', function() {
  it('should parse flag options', function(done) {
    var args = ['-v', '-cffV'];
    var result = parse(args);
    expect(result.raw).to.eql(args);
    expect(result.flags.v).to.eql(true);
    expect(result.flags.c).to.eql(true);
    expect(result.flags.f).to.eql(true);
    expect(result.flags.V).to.eql(true);
    done();
  });
  it('should parse long flag option', function(done) {
    var args = ['--long-flag'];
    var result = parse(args);
    expect(result.raw).to.eql(args);
    expect(result.flags.longFlag).to.eql(true);
    done();
  });
  it('should parse multiple long flag options', function(done) {
    var args = ['--long-flag', '--multiple-flag'];
    var result = parse(args);
    expect(result.raw).to.eql(args);
    expect(result.flags.longFlag).to.eql(true);
    expect(result.flags.multipleFlag).to.eql(true);
    done();
  });
  it('should parse short/long flags', function(done) {
    var args = ['-xvf', '--long-flag', '--multiple-flag'];
    var result = parse(args);
    expect(result.raw).to.eql(args);
    expect(result.flags.x).to.eql(true);
    expect(result.flags.v).to.eql(true);
    expect(result.flags.f).to.eql(true);
    expect(result.flags.longFlag).to.eql(true);
    expect(result.flags.multipleFlag).to.eql(true);
    done();
  });
  it('should parse long/short flags', function(done) {
    var args = ['--long-flag', '--multiple-flag', '-xvf'];
    var result = parse(args);
    expect(result.raw).to.eql(args);
    expect(result.flags.x).to.eql(true);
    expect(result.flags.v).to.eql(true);
    expect(result.flags.f).to.eql(true);
    expect(result.flags.longFlag).to.eql(true);
    expect(result.flags.multipleFlag).to.eql(true);
    done();
  });
  it('should parse short/long/short flags', function(done) {
    var args = ['-xvf', '--long-flag', '--multiple-flag', '-z'];
    var result = parse(args);
    expect(result.raw).to.eql(args);
    expect(result.flags.x).to.eql(true);
    expect(result.flags.v).to.eql(true);
    expect(result.flags.f).to.eql(true);
    expect(result.flags.longFlag).to.eql(true);
    expect(result.flags.multipleFlag).to.eql(true);
    expect(result.flags.z).to.eql(true);
    done();
  });
})
