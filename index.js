var short = '-', long = '--';
var sre = /^-[^-]+/, lre = /^--[^-]+/, negate = /^--no-/;

function camelcase(flag) {
  return flag.split('-').reduce(function(str, word){
    return str + word[0].toUpperCase() + word.slice(1);
  });
}

function toOptionKey(arg, negated) {
  var key = arg.replace(/^-+/, '');
  if(negated) key = key.replace(/^no-/, '')
  key = camelcase(key);
  return key;
}

function unique(value, index, self) {
  return self.indexOf(value) === index;
}

function flags(arg, output) {
  arg = arg.replace(/^-/, '');
  var keys = arg.split('');
  keys = keys.filter(unique);
  keys.forEach(function(key) {
    output.flags[key] = true;
  })
}

function options(arg, output, next) {
  var equals = arg.indexOf('='), value, result = false, negated;
  var flag = false, key;
  if(!next || (next && next.indexOf('-') == 0 && equals == -1)) {
    flag = true;
  }
  if(equals > -1) {
    value = arg.slice(equals + 1);
    arg = arg.slice(0, equals);
  }else if(next && !flag) {
    value = next;
    result = true;
  }
  negated = negate.test(arg);
  key = toOptionKey(arg, negated);
  if(flag) {
    output.flags[key] = negated ? false : true;
  }else{
    if(!output.options[key]) {
      output.options[key] = value;
    }else{
      if(!Array.isArray(output.options[key])) {
        output.options[key] = [output.options[key]];
      }
      output.options[key].push(value);
    }
  }
  return result;
}

function parse(args) {
  args = args || process.argv.slice(2);
  args = args.slice(0);
  var output = {flags: {}, options: {}, raw: args.slice(0), stdin: false};
  var i, arg, l = args.length, key, skip;
  for(i = 0;i < l;i++) {
    arg = '' + args.shift(), skip = false;
    if(arg == short) {
      output.stdin = true;
    }else if(arg == long) {
      output.unparsed = args.slice(i);
      break;
    }else if(sre.test(arg)) {
      flags(arg, output);
    }else if(lre.test(arg)) {
      skip = options(arg, output, args[0]);
      if(skip) {
        args.shift(); i--; l--;
        continue;
      }
    }
    l--; i--;
  }
  return output;
}

module.exports = parse;
