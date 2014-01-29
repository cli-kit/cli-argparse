var expect = require('chai').expect;
var argparse = require('../..');

describe('cli-argparse:', function() {
  it('should parse long option values', function(done) {
    var args = ['--port=80', '--host-name', 'localhost'];
    var result = argparse(args);
    expect(result.raw).to.eql(args);
    expect(result.options.port).to.be.a('string').that.equals('80');
    expect(result.options.hostName).to.be.a('string').that.equals('localhost');
    done();
  });
  it('should parse mutiple long option values', function(done) {
    var args = ['--file=file.txt', '--file', 'file.json'];
    var result = argparse(args);
    expect(result.raw).to.eql(args);
    expect(result.options.file).to.be.an('array')
      .to.eql(['file.txt', 'file.json']);
    done();
  });
})
