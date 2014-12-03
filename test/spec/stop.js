var expect = require('chai').expect;
var parse = require('../..');

describe('cli-argparse:', function() {
  it('should stop parsing', function(done) {
    var args = ['-xvf', '--', 'server', '--port=80', '--host=localhost'];
    var result = parse(args);
    expect(result.stop).to.eql('--');
    expect(result.raw).to.eql(args);
    expect(result.flags.x).to.eql(true);
    expect(result.flags.v).to.eql(true);
    expect(result.flags.f).to.eql(true);
    expect(result.unparsed).to.be.an('array');
    expect(result.unparsed.length).to.eql(3);
    expect(result.unparsed[0]).to.eql(args[2]);
    expect(result.unparsed[1]).to.eql(args[3]);
    expect(result.unparsed[2]).to.eql(args[4]);
    done();
  });

  it('should stop parsing on string config', function(done) {
    var args = ['-xvf', '#', 'server', '--port=80', '--host=localhost'];
    var result = parse(args, {stop: ['#']});
    expect(result.stop).to.eql('#');
    expect(result.raw).to.eql(args);
    expect(result.flags.x).to.eql(true);
    expect(result.flags.v).to.eql(true);
    expect(result.flags.f).to.eql(true);
    expect(result.unparsed).to.be.an('array');
    expect(result.unparsed.length).to.eql(3);
    expect(result.unparsed[0]).to.eql(args[2]);
    expect(result.unparsed[1]).to.eql(args[3]);
    expect(result.unparsed[2]).to.eql(args[4]);
    done();
  });

  it('should stop parsing on regexp config', function(done) {
    var ptn = /^#/;
    var args = ['-xvf', '#server', '--port=80', '--host=localhost'];
    var result = parse(args, {stop: [ptn]});
    expect(result.stop).to.eql(ptn);
    expect(result.raw).to.eql(args);
    expect(result.flags.x).to.eql(true);
    expect(result.flags.v).to.eql(true);
    expect(result.flags.f).to.eql(true);
    expect(result.unparsed).to.be.an('array');
    expect(result.unparsed.length).to.eql(3);
    expect(result.unparsed[0]).to.eql(args[1].replace(ptn, ''));
    expect(result.unparsed[1]).to.eql(args[2]);
    expect(result.unparsed[2]).to.eql(args[3]);
    done();
  });

  it('should stop parsing on regexp config (empty replacement)', function(done) {
    var ptn = /^#/;
    var args = ['-xvf', '#', 'server', '--port=80', '--host=localhost'];
    var result = parse(args, {stop: [ptn]});
    //console.dir(result);
    expect(result.stop).to.eql(ptn);
    expect(result.raw).to.eql(args);
    expect(result.flags.x).to.eql(true);
    expect(result.flags.v).to.eql(true);
    expect(result.flags.f).to.eql(true);
    expect(result.unparsed).to.be.an('array');
    expect(result.unparsed.length).to.eql(3);
    expect(result.unparsed[0]).to.eql(args[2]);
    expect(result.unparsed[1]).to.eql(args[3]);
    expect(result.unparsed[2]).to.eql(args[4]);
    done();
  });


  it('should ignore invalid stop type', function(done) {
    var args = ['-xvf', 'false', 'server', '--port=80', '--host=localhost'];
    var result = parse(args, {stop: [false]});
    expect(result.stop).to.eql(undefined);
    expect(result.raw).to.eql(args);
    expect(result.flags.x).to.eql(true);
    expect(result.flags.v).to.eql(true);
    expect(result.flags.f).to.eql(true);
    expect(result.unparsed).to.be.an('array');
    expect(result.unparsed.length).to.eql(2);
    expect(result.unparsed[0]).to.eql(args[1]);
    expect(result.unparsed[1]).to.eql(args[2]);
    expect(result.options.port).to.eql('80');
    expect(result.options.host).to.eql('localhost');
    done();
  });

  it('should set noop on stop at arg zero', function(done) {
    var args = ['--', 'server', '--port=80', '--host=localhost'];
    var result = parse(args, {stop: [false]});
    expect(result.stop).to.eql('--');
    expect(result.empty).to.eql(true);
    done();
  });
})
