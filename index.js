var short = '-', long = '--';
var sre = /^-[^-]+/, lre = /^--[^-]+/, negate = /--no-/;
var camelcase = require('cli-util').camelcase;

function optkey(arg, negated, opts) {
  var result = alias(arg.replace(negate, long), opts), key;
  if(result.aliased) return result.key;
  key = arg.replace(/^-+/, '');
  if(negated) key = key.replace(/^no-/, '');
  return camelcase(key);
}

function alias(key, opts) {
  var alias = opts.alias, z, keys;
  for(z in alias) {
    keys = z.split(/\s+/);
    if(~keys.indexOf(key)) return {key: alias[z],
      aliased: true, negated: negate.test(z)};
  }
  return {key: key, aliased: false};
}

function flags(arg, out, next, opts) {
  var result = alias(arg, opts), keys, i = 0, key, v = true;
  if(result.aliased) out.flags[result.key] = v;
  arg = arg.replace(/^-/, ''); keys = arg.split('');
  for(;i < keys.length; i++) {
    key = keys[i]; v = true;
    if(i == keys.length - 1 && ~opts.options.indexOf(short + key)) {
      return options(short + key, out, next, opts);
    }
    result = alias(short + key, opts);
    if(result.negated) v = false;
    out.flags[result.aliased ? result.key : key] = v;
  }
}

function options(arg, out, next, opts, force) {
  var equals = arg.indexOf('='), value, result = false, negated, key;
  var flag = force ? !force : (!next && !~equals)
    || (next && (!next.indexOf(short) && next != short) && !~equals);
  if(~equals) {
    value = arg.slice(equals + 1); arg = arg.slice(0, equals);
  }
  if(~opts.flags.indexOf(arg.replace(negate, long))) flag = true;
  if(next && !flag && !~equals) {
    value = next; result = true;
  }
  if(next == short || value == short) out.stdin = true;
  negated = negate.test(arg);
  key = optkey(arg, negated, opts);
  if(flag) {
    out.flags[key] = negated ? false : true;
  }else{
    if(!out.options[key]) {
      out.options[key] = value;
    }else{
      if(!Array.isArray(out.options[key])) out.options[key] = [out.options[key]];
      out.options[key].push(value);
    }
  }
  return result;
}

module.exports = function parse(args, opts) {
  function exists(arg, list) {
    for(var i = 0;i < list.length;i++) {if(~arg.indexOf(list[i])) return true;}
  }
  opts = opts || {}; opts.alias = opts.alias || {};
  opts.flags = opts.flags || []; opts.options = opts.options || [];
  args = args || process.argv.slice(2); args = args.slice(0);
  var out = {flags: {}, options: {},
    raw: args.slice(0), stdin: false, unparsed: [], strict: !!opts.strict};
  var i, arg, l = args.length, key, skip, larg, raw, equals, flag, opt;
  for(i = 0;i < l;i++) {
    if(!args[0]) break;
    arg = '' + args.shift(); skip = false;
    equals = arg.indexOf('='); raw = ~equals ? arg.slice(0, equals) : arg;
    raw = raw.replace(negate, long); flag = exists(raw, opts.flags);
    opt = exists(arg, opts.options); larg = lre.test(arg) || ~equals;
    if(opt) larg = true;
    if(opts.strict && (!opt && !flag)) {
      out.unparsed.push(arg);
    }else if(arg == short) {
      out.stdin = true;
    }else if(arg == long) {
      out.unparsed = out.unparsed.concat(args.slice(i)); break;
    }else if(larg) {
      skip = options(arg, out, args[0], opts, opt);
    }else if(sre.test(arg)) {
      skip = flags(arg, out, args[0], opts);
    }else{
      out.unparsed.push(arg);
    }
    if(skip) args.shift(); l--; i--;
  }
  return out;
}
