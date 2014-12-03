var expect = require('chai').expect;
var parse = require('../..');

describe('cli-argparse:', function() {
  it('should handle long option negation', function(done) {
    var args = ['--color', '--no-color'];
    var result = parse(args);
    expect(result.raw).to.eql(args);
    expect(result.flags.color).to.eql(false);
    done();
  });
  it('should handle long option negation override', function(done) {
    var args = ['--no-color', '--color'];
    var result = parse(args);
    expect(result.raw).to.eql(args);
    expect(result.flags.color).to.eql(true);
    done();
  });
  it('should handle short option negation by alias', function(done) {
    var config = {
      alias: {
        '-c --color': 'color',
        '-C --no-color': 'color'},
      flags: [ '-c', '--color', '-C', '--no-color']
    }
    var args = ['-cC'];
    var result = parse(args, config);
    expect(result.raw).to.eql(args);
    expect(result.flags.color).to.eql(false);
    done();
  });
  it('should handle short option negation by alias (double override -cCc)',
    function(done) {
      var config = {
        alias: {
          '-c --color': 'color',
          '-C --no-color': 'color'},
        flags: [ '-c', '--color', '-C', '--no-color']
      }
      var args = ['-cCc'];
      var result = parse(args, config);
      expect(result.raw).to.eql(args);
      expect(result.flags.color).to.eql(true);
      done();
    }
  );
})
