var short = '-', long = '--';
var sre = /^-[^-]+/, lre = /^--[^-]+/, negate = /^--no-/;

function camelcase(flag) {
  return flag.split('-').reduce(function(str, word){
    return str + word[0].toUpperCase() + word.slice(1);
  });
}

function toOptionKey(arg, negated, opts) {
  var result = alias(arg, opts), key;
  if(result.aliased) return result.key;
  key = arg.replace(/^-+/, '');
  if(negated) key = key.replace(/^no-/, '');
  return camelcase(key);
}

function alias(key, opts) {
  var alias = opts.alias, z, keys;
  for(z in alias) {
    keys = z.split(/\s+/);
    if(keys.indexOf(key) > -1) return {key: alias[z], aliased: true};
  }
  return {key: key, aliased: false};
}

function flags(arg, output, next, opts) {
  var result = alias(arg, opts), keys, skip = false;
  if(result.aliased) output.flags[result.key] = true;
  arg = arg.replace(/^-/, '');
  keys = arg.split('');
  keys.forEach(function(key) {
    result = alias(short + key, opts);
    output.flags[result.aliased ? result.key : key] = true;
  })
  return skip;
}

function options(arg, output, next, opts) {
  var equals = arg.indexOf('='), value, result = false, negated, key;
  var flag = (!next && equals == -1)
    || (next && next.indexOf(short) == 0 && equals == -1);
  if(equals > -1) {
    value = arg.slice(equals + 1); arg = arg.slice(0, equals);
  }
  if(opts.flags.indexOf(arg) > -1) flag = true;
  if(next && !flag && equals == -1) {
    value = next; result = true;
  }
  negated = negate.test(arg);
  key = toOptionKey(arg, negated, opts);
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

function parse(args, opts) {
  opts = opts || {}; opts.alias = opts.alias || {};
  opts.flags = opts.flags || [], opts.options = opts.options || [];
  args = args || process.argv.slice(2); args = args.slice(0);
  var output = {flags: {}, options: {},
    raw: args.slice(0), stdin: false, unparsed: []};
  var i, arg, l = args.length, key, skip;
  for(i = 0;i < l;i++) {
    if(!args[0]) break;
    arg = '' + args.shift(), skip = false;
    if(arg == short) {
      output.stdin = true;
    }else if(arg == long) {
      output.unparsed = output.unparsed.concat(args.slice(i)); break;
    }else if(lre.test(arg) || opts.options.indexOf(arg) > -1) {
      skip = options(arg, output, args[0], opts);
    }else if(sre.test(arg)) {
      skip = flags(arg, output, args[0], opts);
    }else{
      output.unparsed.push(arg);
    }
    if(skip) args.shift(); l--; i--;
  }
  return output;
}

module.exports = parse;
