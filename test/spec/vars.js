var expect = require('chai').expect;
var parse = require('../..');

describe('cli-argparse:', function() {
  //it('should collect vars by string prefix', function(done) {
    //var args = ['@var=value'];
    //var result = parse(args, {vars: {collection: '@'}});
    //expect(result.raw).to.eql(args);
    //expect(result.vars.collection).to.be.an('object')
    //expect(result.vars.collection['var']).to.eql('value');
    //done();
  //});

  //it('should collect vars by after non-aliased long option', function(done) {
    //var args = ['--no-color', '@var=value'];
    //var result = parse(args, {vars: {collection: '@'}});
    //expect(result.raw).to.eql(args);
    //expect(result.vars.collection).to.be.an('object')
    //expect(result.vars.collection['var']).to.eql('value');
    //done();
  //});

  it('should collect vars by string prefix (equality)', function(done) {
    var args = ['@var=value'];
    var result = parse(args, {vars: {collection: '@'}});
    expect(result.raw).to.eql(args);
    expect(result.vars.collection).to.be.an('object')
    expect(result.vars.collection['var']).to.eql('value');
    done();
  });

  it('should collect vars by string prefix (hyphenated)', function(done) {
    var args = ['-Dorg.example.log=info'];
    var result = parse(args, {vars: {collection: '-D'}});
    expect(result.raw).to.eql(args);
    expect(result.vars.collection).to.be.an('object')
    expect(result.vars.collection['org.example.log']).to.eql('info');
    done();
  });

  it('should collect vars by string prefix (hyphenated+equal)', function(done) {
    var args = ['-Dorg.example.log=info'];
    var result = parse(args, {vars: {collection: '-D'}});
    expect(result.raw).to.eql(args);
    expect(result.vars.collection).to.be.an('object')
    expect(result.vars.collection['org.example.log']).to.eql('info');
    done();
  });

  it('should collect vars by regexp', function(done) {
    var args = [':symbol=value'];
    var result = parse(args, {vars: {symbols: /^:([a-zA-Z0-9-])/}});
    expect(result.raw).to.eql(args);
    //console.dir(result);
    expect(result.vars.symbols).to.be.an('object')
    expect(result.vars.symbols['symbol']).to.eql('value');
    done();
  });

  it('should bypass non-matching regexp (space separated)', function(done) {
    var args = [':symbol', 'value'];
    var result = parse(args, {vars: {symbols: /^:([a-zA-Z0-9-])/}});
    expect(result.raw).to.eql(args);
    expect(result.vars.symbol).to.eql(undefined)
    done();
  });

  it('should bypass non-matching regexp', function(done) {
    var args = ['--symbol', 'value'];
    var result = parse(args, {vars: {symbols: /^:/}});
    expect(result.raw).to.eql(args);
    expect(result.vars.symbol).to.eql(undefined);
    expect(result.options.symbol).to.eql('value');
    done();
  });
})
