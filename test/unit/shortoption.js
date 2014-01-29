var expect = require('chai').expect;
var parse = require('../..');

describe('cli-argparse:', function() {
  it('should treat short argument as option', function(done) {
    var options = ['-f'];
    var args = ['--port=80', '-f', 'file.txt'];
    var result = parse(args, {options: options});
    expect(result.raw).to.eql(args);
    expect(result.options.port).to.be.a('string').that.equals('80');
    expect(result.options.f).to.eql('file.txt');
    done();
  });
})
