var expect = require('chai').expect;
var parse = require('../..');

describe('cli-argparse:', function() {
  it('should alias flag key (true)', function(done) {
    var aliases = {'-v --verbose': 'verbose'};
    var args = ['--no-verbose', '-v'];
    var result = parse(args, {alias: aliases});
    expect(result.flags.verbose).to.eql(true);
    done();
  });
  it('should alias flag key (false)', function(done) {
    var aliases = {'-v --verbose': 'verbose'};
    var args = ['--color', '--no-color'];
    var result = parse(args, {alias: aliases});
    expect(result.flags.color).to.eql(false);
    done();
  });
  it('should alias long option', function(done) {
    var aliases = {'--file-name': 'name'};
    var args = ['--file-name', 'file.txt'];
    var result = parse(args, {alias: aliases});
    expect(result.options.name).to.eql('file.txt');
    done();
  });
  it('should alias negated long option', function(done) {
    var aliases = {'--highlight-syntax': 'highlight'};
    var args = ['--no-highlight-syntax'];
    var result = parse(args, {alias: aliases});
    expect(result.flags.highlight).to.eql(false);
    done();
  });
  it('should alias multiple long options', function(done) {
    var aliases = {'--file-name': 'name'};
    var args = ['--file-name', 'file.txt', '--file-name=file.json'];
    var result = parse(args, {alias: aliases});
    expect(result.options.name).to.eql(['file.txt', 'file.json']);
    done();
  });
  it('should alias flag expansion', function(done) {
    var aliases = {'-v --verbose': 'verbose'};
    var args = ['-xvf'];
    var result = parse(args, {alias: aliases});
    expect(result.flags.x).to.eql(true);
    expect(result.flags.verbose).to.eql(true);
    expect(result.flags.f).to.eql(true);
    done();
  });

  it('should alias long option without leading hyphens', function(done) {
    var aliases = {'file-name': 'name'};
    var args = ['file-name', 'file.txt'];
    var result = parse(args, {alias: aliases, options: ['file-name']});
    expect(result.options.name).to.eql('file.txt');
    done();
  });

  it('should alias flag option without leading hyphens (color)', function(done) {
    var aliases = {'color': 'color'};
    var args = ['color'];
    var result = parse(args, {alias: aliases, flags: ['--color']});
    expect(result.flags.color).to.eql(true);
    done();
  });

  it('should negate flag option without leading hyphens (color)', function(done) {
    var aliases = {'color': 'color'};
    var args = ['no-color'];
    var result = parse(args, {alias: aliases, flags: ['--color']});
    expect(result.flags.color).to.eql(false);
    done();
  });

  it('should alias flag option with and without leading hyphens (color)',
    function(done) {
      var aliases = {'--color color': 'color'};
      var args = ['color'];
      var result = parse(args, {alias: aliases, flags: ['--color']});
      expect(result.flags.color).to.eql(true);
      done();
    }
  );

  it('should negate flag option with and without leading hyphens (color)',
    function(done) {
      var aliases = {'--no-color no-color': 'color'};
      var args = ['no-color'];
      var result = parse(args, {alias: aliases, flags: ['--color']});
      expect(result.flags.color).to.eql(false);
      done();
    }
  );
})
