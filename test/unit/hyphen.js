var expect = require('chai').expect;
var parse = require('../..');

describe('cli-argparse:', function() {
  it('should ignore embedded flag in argument', function(done) {
    var args = ['foo-bar'];
    var result = parse(args, {flags: [ '-b' ]});
    expect(result.unparsed).to.eql(['foo-bar']);
    expect(result.flags).to.eql({});
    expect(result.options).to.eql({});
    expect(result.stdin).to.eql(false);
    expect(result.strict).to.eql(false);
    done();
  });

  it('should ignore embedded flag in argument (strict)', function(done) {
    var args = ['foo-bar'];
    var result = parse(args, {flags: [ '-b' ], strict: true});
    expect(result.unparsed).to.eql(['foo-bar']);
    expect(result.flags).to.eql({});
    expect(result.options).to.eql({});
    expect(result.stdin).to.eql(false);
    expect(result.strict).to.eql(true);
    done();
  });
})
