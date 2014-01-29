var expect = require('chai').expect;
var parse = require('../..');

describe('cli-argparse:', function() {
  it('should use flag alias key (true)', function(done) {
    var aliases = {'-v --verbose': 'verbose'};
    var args = ['--no-verbose', '-v'];
    var result = parse(args, {alias: aliases});
    expect(result.flags.verbose).to.eql(true);
    done();
  });
  it('should use flag alias key (false)', function(done) {
    var aliases = {'-v --verbose': 'verbose'};
    var args = ['--color', '--no-color'];
    var result = parse(args, {alias: aliases});
    expect(result.flags.color).to.eql(false);
    done();
  });
  it('should use alias long option', function(done) {
    var aliases = {'--file-name': 'name'};
    var args = ['--file-name', 'file.txt'];
    var result = parse(args, {alias: aliases});
    expect(result.options.name).to.eql('file.txt');
    done();
  });
  it('should use alias multiple long options', function(done) {
    var aliases = {'--file-name': 'name'};
    var args = ['--file-name', 'file.txt', '--file-name=file.json'];
    var result = parse(args, {alias: aliases});
    expect(result.options.name).to.eql(['file.txt', 'file.json']);
    done();
  });
})
