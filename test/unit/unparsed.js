var expect = require('chai').expect;
var parse = require('../..');

describe('cli-argparse:', function() {
  it('should ignore non-options (start)', function(done) {
    var args = ['server', 'start', '-v', '--port=80', '--host-name', 'localhost'];
    var result = parse(args);
    expect(result.raw).to.eql(args);
    expect(result.flags.v).to.eql(true);
    expect(result.options.port).to.be.a('string').that.equals('80');
    expect(result.options.hostName).to.be.a('string').that.equals('localhost');
    expect(result.unparsed).to.be.an('array')
      .to.eql(['server', 'start']);
    done();
  });
  it('should ignore non-options (end)', function(done) {
    var args = ['-v', '--port=80', '--host-name', 'localhost', 'server', 'start'];
    var result = parse(args);
    expect(result.raw).to.eql(args);
    expect(result.flags.v).to.eql(true);
    expect(result.options.port).to.be.a('string').that.equals('80');
    expect(result.options.hostName).to.be.a('string').that.equals('localhost');
    expect(result.unparsed).to.be.an('array')
      .to.eql(['server', 'start']);
    done();
  });
  it('should allow hyphens in unparsed', function(done) {
    var args = [
      '-v', '--port=80', 'cmd', '/my-client/my-campaign/my-app'];
    var result = parse(args);
    //console.dir(result);
    expect(result.raw).to.eql(args);
    expect(result.flags.v).to.eql(true);
    expect(result.options.port).to.be.a('string').that.equals('80');
    expect(result.unparsed).to.be.an('array')
      .to.eql(['cmd', '/my-client/my-campaign/my-app']);
    done();
  });
  it('should allow hyphens in unparsed (config)', function(done) {
    var args = [
      '-v', '--port=80', 'cmd', '/my-client/my-campaign/my-app'];
    var conf = {
      options: [ '-c' ],
      flags: [ '-a' ]
    }
    var result = parse(args, conf);
    //console.dir(result);
    expect(result.raw).to.eql(args);
    expect(result.flags.v).to.eql(true);
    expect(result.options.port).to.be.a('string').that.equals('80');
    expect(result.unparsed).to.be.an('array')
      .to.eql(['cmd', '/my-client/my-campaign/my-app']);
    done();
  });
})
