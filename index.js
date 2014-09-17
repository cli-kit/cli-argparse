var short = '-', long = '--';
var sre = /^-[^-]+/, lre = /^--[^-]+/, negate = /(--)?no-/;
var camelcase = require('cli-util').camelcase;

function exists(arg, list) {
  for(var i = 0;i < list.length;i++){
    if(arg.indexOf(list[i]) === 0) return true;
  }
}

function alias(key, opts) {
  var z, keys;
  for(z in opts.alias) {
    keys = z.split(/\s+/);
    if(~keys.indexOf(key)
      || ~keys.indexOf(key.replace(negate, ''))) {
      return {
        key: opts.alias[z].replace(negate, ''),
        aliased: true, negated: negate.test(key) || negate.test(z),
        short: sre.test(key),
        long: lre.test(key)
      };
    }
  }
  return {key: key, aliased: false};
}

function flags(arg, out, next, opts) {
  var result = alias(arg, opts), keys, i = 0, key, v = true;
  if(result.aliased) out.flags[result.key] = v;
  arg = arg.replace(/^-/, ''); keys = arg.split('');
  if(keys.length <= 1 && result.aliased) return;

  // cater for aliased flags without leading hyphens
  if(result.aliased) {
    out.flags[result.key] = result.negated ? false : true;
    return;
  }

  // flag expansion: -xvf
  for(;i < keys.length; i++) {
    key = keys[i]; v = true;
    if(opts.strict && !exists(short + key, opts.flags)) {
      out.unparsed.push(short + key);
      continue;
    }
    if(i == keys.length - 1 && ~opts.options.indexOf(short + key)) {
      return options(short + key, out, next, opts);
    }
    result = alias(short + key, opts);
    if(result.negated) v = false;
    out.flags[result.aliased ? result.key : key] = v;
  }
}

function optkey(arg, negated, opts) {
  var result = alias(arg.replace(negate, long), opts), key;
  if(result.aliased) {
    return result;
  }
  key = arg.replace(/^-+/, '');
  if(negated) key = key.replace(/^no-/, '');
  return {key: camelcase(key)};
}


function options(arg, out, next, opts, force) {
  var equals = arg.indexOf('='), value, negated, info, key, raw = '' + arg;
  var flag = force ? !force : (!next && !~equals) ||
    (next && (!next.indexOf(short) && next != short) && !~equals);
  if(~equals) {
    value = arg.slice(equals + 1); arg = arg.slice(0, equals);
  }
  if(~opts.flags.indexOf(arg.replace(negate, long))) flag = true;
  if(next && !flag && !~equals) value = next;
  if(next == short || value == short) out.stdin = true;

  negated = negate.test(arg);
  info = optkey(arg, negated, opts);
  key = info.key;

  if(~equals && !/^-/.test(arg) && !info.aliased) {
    out.unparsed.push(raw);
    return false;
  }

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
  return (value == next);
}

function breaks(arg, opts, out) {
  var list = (arg === long) ? [long] : [];
  if(Array.isArray(opts.stop) && !list.length) {
    list = opts.stop.filter(function(ptn) {
      if(typeof ptn === 'string' || (ptn instanceof RegExp)) {
        return (ptn instanceof RegExp) ? ptn.test(arg) : arg === ptn;
      }
      return false;
    })
  }
  if(list.length) {
    out.stop = list[0];
  }
  return list.length > 0 ? list[0] : null;
}

module.exports = function parse(args, opts) {
  opts = opts || {}; opts.alias = opts.alias || {};
  opts.flags = opts.flags || []; opts.options = opts.options || [];
  args = args || process.argv.slice(2); args = args.slice(0);
  var out = {flags: {}, options: {}, raw: args.slice(0), stdin: false,
    unparsed: [], strict: !!opts.strict};
  var i, arg, l = args.length, skip, raw, equals, flag, opt, info, stop;
  for(i = 0;i < l;i++) {
    if(!args[0]) break; arg = '' + args.shift(); skip = false;
    equals = arg.indexOf('=');
    raw = ~equals ? arg.slice(0, equals) : arg;
    raw = raw.replace(negate, long); flag = exists(raw, opts.flags);
    opt = exists(arg, opts.options);
    info = alias(arg, opts);

    // cater for configured options without leading hyphens
    if(info.aliased && !info.short && !info.long) {
      flag = negate.test(arg) || !!~opts.flags.indexOf(arg)
        || !!~opts.flags.indexOf(long + arg);
      opt = !!~opts.options.indexOf(arg)
        || !!~opts.options.indexOf(long + arg);
    }

    //console.log('arg: %s, flag: %s, opt: %s (%j)', arg, flag, opt, info);

    if(opts.strict && (!opt && !flag) && !info.aliased) {
      out.unparsed.push(arg);
    }else if(arg === short) {
      out.stdin = true;
    }else if(stop = breaks(arg, opts, out)) {
      if(stop instanceof RegExp) {
        stop = arg.replace(stop, '');
        out.skip = stop ? [stop] : [];
        out.skip = out.skip.concat(args.slice(i));
      }else{
        out.skip = args.slice(i);
      }
      out.unparsed = out.unparsed.concat(out.skip);
      if(arg === out.raw[0]) {
        out.empty = true;
      }
      break;
    }else if(opt || ~equals || lre.test(arg)) {
      skip = options(arg, out, args[0], opts, opt);
    }else if(flag || sre.test(arg)) {
      skip = flags(arg, out, args[0], opts);
    }else{
      out.unparsed.push(arg);
    }
    if(skip) args.shift(); l--; i--;
  }
  if(opts.flat) {
    for(var z in out.flags) {out.options[z] = out.flags[z];}
    delete out.flags;
  }
  return out;
};
