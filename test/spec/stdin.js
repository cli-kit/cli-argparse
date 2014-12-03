var expect = require('chai').expect;
var parse = require('../..');

describe('cli-argparse:', function() {
  it('should use default stdin (false)', function(done) {
    var args = ['-v', '-cffV'];
    var result = parse(args);
    expect(result.raw).to.eql(args);
    expect(result.stdin).to.eql(false);
    done();
  });
  it('should set stdin (true)', function(done) {
    var args = ['-'];
    var result = parse(args);
    expect(result.raw).to.eql(args);
    expect(result.stdin).to.eql(true);
    done();
  });
  it('should use default stdin after -- (false)', function(done) {
    var args = ['--', '-'];
    var result = parse(args);
    expect(result.raw).to.eql(args);
    expect(result.stdin).to.eql(false);
    done();
  });
  it('should accept stdin as value', function(done) {
    var args = ['--file', '-'];
    var result = parse(args);
    expect(result.raw).to.eql(args);
    expect(result.stdin).to.eql(true);
    expect(result.options.file).to.eql('-');
    done();
  });
  it('should accept stdin as value (equals)', function(done) {
    var args = ['--file=-'];
    var result = parse(args);
    expect(result.raw).to.eql(args);
    expect(result.stdin).to.eql(true);
    expect(result.options.file).to.eql('-');
    done();
  });
})
