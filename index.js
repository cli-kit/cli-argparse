var short = '-', long = '--';
var sre = /^-[^-]+/, lre = /^--[^-]+/, negate = /(--)?no-/;
var camelcase = require('camelcase');

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

function optkey(arg, negated, opts, vkey) {
  var result = alias(arg.replace(negate, long), opts)
    , key = arg;
  if(result.aliased) {
    return result;
  }
  if(!vkey) {
    key = arg.replace(/^-+/, '');
    if(negated) key = key.replace(/^no-/, '');
  }
  return {key: vkey ? key : camelcase(key)};
}


function options(arg, out, next, opts, force, vkey) {
  var equals = arg.indexOf('='), value, negated, info, key, raw = '' + arg;
  var flag = force ? !force : (!next && !~equals) ||
    (next && (!next.indexOf(short) && next != short) && !~equals);
  if(~equals) {
    value = arg.slice(equals + 1);
    arg = arg.slice(0, equals);
  }
  if(~opts.flags.indexOf(arg.replace(negate, long))) flag = true;
  if(next && !flag && !~equals) value = next;
  if(next == short || value == short) out.stdin = true;

  negated = negate.test(arg);
  info = optkey(arg, negated, opts, vkey);
  key = info.key;

  if(~equals && !/^-/.test(arg) && !info.aliased && !vkey) {
    out.unparsed.push(raw);
    return false;
  }

  if(flag) {
    out.flags[key] = negated ? false : true;
  }else{
    if(vkey) {
      out.vars[vkey.key] = out.vars[vkey.key] || {};
      out.vars[vkey.key][(vkey.match instanceof RegExp)
        ? key.replace(vkey.match, '$1')
        : key.replace(vkey.match, '')] = value;
    }else if(!out.options[key]) {
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

function isvar(arg, opts) {
  var k, v, r = false;
  for(k in opts.vars) {
    v = opts.vars[k];
    r = (v instanceof RegExp)
      ? v.test(arg) : arg.indexOf('' + v) === 0;
    if(r) {
      r = {key: k, match: v};
      break;
    }
  }
  return r;
}

module.exports = function parse(args, opts) {
  opts = opts || {}; opts.alias = opts.alias || {};
  opts.flags = opts.flags || []; opts.options = opts.options || [];
  opts.vars = opts.vars || {};
  args = args || process.argv.slice(2); args = args.slice(0);
  args = args.map(function(arg){return '' + arg;})
  var out = {
    flags: {}, options: {}, raw: args.slice(0), stdin: false,
    unparsed: [], strict: !!opts.strict, vars: {}};
  var i, arg, l = args.length, next
    , skip, raw, equals
    , flag, opt, info, stop
    , vkey;
  for(i = 0;i < l;i++) {
    if(!args[0]) break; 
    arg = '' + args.shift();
    //next = args[i];
    skip = false;
    equals = arg.indexOf('=');
    raw = ~equals ? arg.slice(0, equals) : arg;
    raw = raw.replace(negate, long);
    flag = exists(raw, opts.flags);
    opt = exists(arg, opts.options);
    info = alias(arg, opts);
    vkey = isvar(arg, opts);
    if(vkey && ~equals) {
      opt = true;
    }

    // cater for configured options without leading hyphens
    if(info.aliased && !info.short && !info.long && !vkey) {
      flag = negate.test(arg) || !!~opts.flags.indexOf(arg)
        || !!~opts.flags.indexOf(long + arg);
      opt = !!~opts.options.indexOf(arg)
        || !!~opts.options.indexOf(long + arg);
    }

    //console.log(
      //'arg: %s, flag: %s, opt: %s (%j) %s', arg, flag, opt, info, next);

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
    // handle the case where a long option is not aliases
    // and is followed by a value that looks like a variable
    // declaration, do not assign but treat option as flag
    //}else if(next && isvar(next, opts) && !info.aliased) {
      //console.dir('next is var...');
      //out.unparsed.push(arg);
      //skip = flags(arg, out, args[0], opts);
    }else if(opt || ~equals || lre.test(arg)
      // short options may have values
      || opts.short && sre.test(arg)) {
      skip = options(arg, out, args[0], opts, opt, vkey);
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
