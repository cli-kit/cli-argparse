var expect = require('chai').expect;
var parse = require('../..');

describe('cli-argparse:', function() {
  it('should coerce missing value to empty string (short)', function(done) {
    var args = ['-p='];
    var result = parse(args);
    expect(result.options.p).to.be.a('string').that.equals('');
    done();
  });
  it('should coerce missing value to empty string (long)', function(done) {
    var args = ['--port='];
    var result = parse(args);
    expect(result.options.port).to.be.a('string').that.equals('');
    done();
  });
  it('should parse long option (equality)', function(done) {
    var args = ['--port=80'];
    var result = parse(args);
    expect(result.options.port).to.be.a('string').that.equals('80');
    done();
  });
  it('should parse short option (equality)', function(done) {
    var args = ['-p=80'];
    var result = parse(args);
    expect(result.options.p).to.be.a('string').that.equals('80');
    done();
  });

  it('should parse long option without leading hyphens (equality)',
    function(done) {
      var args = ['port=80'];
      var result = parse(args, {alias: {'port': 'port'}});
      expect(result.options.port).to.be.a('string').that.equals('80');
      done();
    }
  );

  it('should allow equals sign in next value (equality)',
    function(done) {
      var args = ['--port', 'variable=value'];
      var result = parse(args);
      expect(result.options.port)
        .to.be.a('string').that.equals('variable=value');
      done();
    }
  );

  it('should allow equals sign in assignment value (equality)',
    function(done) {
      var args = ['--port=variable=value'];
      var result = parse(args);
      expect(result.options.port)
        .to.be.a('string').that.equals('variable=value');
      done();
    }
  );

  it('should allow equals sign in next value of short option (equality)',
    function(done) {
      var conf = {options: ['-p']}
      var args = ['-p','variable=value'];
      var result = parse(args, conf);
      expect(result.options.p)
        .to.be.a('string').that.equals('variable=value');
      done();
    }
  );

  it('should treat non-option with equality as unparsed',
    function(done) {
      var args = ['variable=value', 'http://example.com/path?var=val'];
      var result = parse(args);
      expect(result.unparsed).to.eql(args);
      done();
    }
  );
})
