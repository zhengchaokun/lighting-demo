/**
  * light v1.0.0
  * (c) 2018 
  */
/**
  * vue-router v3.0.1
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */
(function(a,b) {
function assert(condition, message) {
  if (!condition) {
    throw new Error("[vue-router] " + message);
  }
}

function warn(condition, message) {
  if (process.env.NODE_ENV !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn("[vue-router] " + message);
  }
}

function isError(err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1;
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render(_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children);
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h();
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (val && current !== vm || !val && current === vm) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass);
      // pass non-declared props as attrs
      var attrs = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children);
  }
};

function resolveProps(route, config) {
  switch (typeof config) {
    case 'undefined':
      return;
    case 'object':
      return config;
    case 'function':
      return config(route);
    case 'boolean':
      return config ? route.params : undefined;
    default:
      if (process.env.NODE_ENV !== 'production') {
        warn(false, "props in \"" + route.path + "\" is a " + typeof config + ", " + "expecting an object, function or boolean.");
      }
  }
}

function extend(to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
  return to;
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};

var decode = decodeURIComponent;

function resolveQuery(query, extraQuery, _parseQuery) {
  if (extraQuery === void 0) { extraQuery = {}; }

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    process.env.NODE_ENV !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery;
}

function parseQuery(query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res;
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0 ? decode(parts.join('=')) : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res;
}

function stringifyQuery(obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encode(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&');
    }

    return encode(key) + '=' + encode(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?" + res : '';
}

/*  */

var trailingSlashRE = /\/?$/;

function createRoute(record, location, redirectedFrom, router) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || record && record.name,
    meta: record && record.meta || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route);
}

function clone(value) {
  if (Array.isArray(value)) {
    return value.map(clone);
  } else if (value && typeof value === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res;
  } else {
    return value;
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch(record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res;
}

function getFullPath(ref, _stringifyQuery) {
  var path = ref.path;
  var query = ref.query;if (query === void 0) { query = {}; }
  var hash = ref.hash;if (hash === void 0) { hash = ''; }

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash;
}

function isSameRoute(a, b) {
  if (b === START) {
    return a === b;
  } else if (!b) {
    return false;
  } else if (a.path && b.path) {
    return a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') && a.hash === b.hash && isObjectEqual(a.query, b.query);
  } else if (a.name && b.name) {
    return a.name === b.name && a.hash === b.hash && isObjectEqual(a.query, b.query) && isObjectEqual(a.params, b.params);
  } else {
    return false;
  }
}

function isObjectEqual(a, b) {
  if (a === void 0) { a = {}; }
  if (b === void 0) { b = {}; }

  // handle null value #1566
  if (!a || !b) {
    return a === b;
  }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal);
    }
    return String(aVal) === String(bVal);
  });
}

function isIncludedRoute(current, target) {
  return current.path.replace(trailingSlashRE, '/').indexOf(target.path.replace(trailingSlashRE, '/')) === 0 && (!target.hash || current.hash === target.hash) && queryIncludes(current.query, target.query);
}

function queryIncludes(current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false;
    }
  }
  return true;
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render(h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null ? 'router-link-active' : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null ? 'router-link-exact-active' : globalExactActiveClass;
    var activeClass = this.activeClass == null ? activeClassFallback : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null ? exactActiveClassFallback : this.exactActiveClass;
    var compareTarget = location.path ? createRoute(null, location, null, router) : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact ? classes[exactActiveClass] : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) {
        on[e] = handler;
      });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default);
  }
};

function guardEvent(e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) {
    return;
  }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) {
    return;
  }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) {
    return;
  }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) {
      return;
    }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true;
}

function findAnchor(children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child;
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child;
      }
    }
  }
}

var _Vue;

function install(Vue) {
  if (install.installed && _Vue === Vue) {
    return;
  }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) {
    return v !== undefined;
  };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate() {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed() {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get() {
      return this._routerRoot._router;
    }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get() {
      return this._routerRoot._route;
    }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath(relative, base, append) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative;
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative;
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/');
}

function parsePath(path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  };
}

function cleanPath(path) {
  return path.replace(/\/\//g, '/');
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
// Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
'(\\\\.)',
// Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
// "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse(str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue;
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?'
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens;
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile(str, options) {
  return tokensToFunction(parse(str, options));
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty(str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk(str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue;
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue;
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined');
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`');
        }

        if (value.length === 0) {
          if (token.optional) {
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty');
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`');
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue;
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
      }

      path += token.prefix + segment;
    }

    return path;
  };
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup(group) {
  return group.replace(/([=!:$\/()])/g, '\\$1');
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys(re, keys) {
  re.keys = keys;
  return re;
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags(options) {
  return options.sensitive ? '' : 'i';
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp(path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys);
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp(path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys);
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp(path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options);
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp(tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */keys || options;
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys);
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp(path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */keys || options;
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */keys);
  }

  if (isarray(path)) {
    return arrayToRegexp( /** @type {!Array} */path, /** @type {!Array} */keys, options);
  }

  return stringToRegexp( /** @type {string} */path, /** @type {!Array} */keys, options);
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams(path, params, routeMsg) {
  try {
    var filler = regexpCompileCache[path] || (regexpCompileCache[path] = pathToRegexp_1.compile(path));
    return filler(params || {}, { pretty: true });
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      warn(false, "missing param for " + routeMsg + ": " + e.message);
    }
    return '';
  }
}

/*  */

function createRouteMap(routes, oldPathList, oldPathMap, oldNameMap) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  };
}

function addRouteRecord(pathList, pathMap, nameMap, route, parent, matchAs) {
  var path = route.path;
  var name = route.name;
  if (process.env.NODE_ENV !== 'production') {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(typeof route.component !== 'string', "route config \"component\" for path: " + String(path || name) + " cannot be a " + "string id. Use an actual component instead.");
  }

  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict);

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null ? {} : route.components ? route.props : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (route.name && !route.redirect && route.children.some(function (child) {
        return (/^\/?$/.test(child.path)
        );
      })) {
        warn(false, "Named Route '" + route.name + "' has a default child route. " + "When navigating to this named route (:to=\"{name: '" + route.name + "'\"), " + "the default child route will not be rendered. Remove the name from " + "this route and use the name of the default child route for named " + "links instead.");
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs ? cleanPath(matchAs + "/" + child.path) : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias) ? route.alias : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(pathList, pathMap, nameMap, aliasRoute, parent, record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(false, "Duplicate named routes definition: " + "{ name: \"" + name + "\", path: \"" + record.path + "\" }");
    }
  }
}

function compileRouteRegex(path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (process.env.NODE_ENV !== 'production') {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], "Duplicate param keys in route with path: \"" + path + "\"");
      keys[key.name] = true;
    });
  }
  return regex;
}

function normalizePath(path, parent, strict) {
  if (!strict) {
    path = path.replace(/\/$/, '');
  }
  if (path[0] === '/') {
    return path;
  }
  if (parent == null) {
    return path;
  }
  return cleanPath(parent.path + "/" + path);
}

/*  */

function normalizeLocation(raw, current, append, router) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next;
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, "path " + current.path);
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, "relative params navigation requires a current route.");
    }
    return next;
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = current && current.path || '/';
  var path = parsedPath.path ? resolvePath(parsedPath.path, basePath, append || next.append) : basePath;

  var query = resolveQuery(parsedPath.query, next.query, router && router.options.parseQuery);

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  };
}

function assign(a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a;
}

/*  */

function createMatcher(routes, router) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match(raw, currentRoute, redirectedFrom) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        warn(record, "Route with name '" + name + "' does not exist");
      }
      if (!record) {
        return _createRoute(null, location);
      }
      var paramNames = record.regex.keys.filter(function (key) {
        return !key.optional;
      }).map(function (key) {
        return key.name;
      });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, "named route \"" + name + "\"");
        return _createRoute(record, location, redirectedFrom);
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom);
        }
      }
    }
    // no match
    return _createRoute(null, location);
  }

  function redirect(record, location) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function' ? originalRedirect(createRoute(record, location, null, router)) : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (process.env.NODE_ENV !== 'production') {
        warn(false, "invalid redirect option: " + JSON.stringify(redirect));
      }
      return _createRoute(null, location);
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        assert(targetRecord, "redirect failed: named route \"" + name + "\" not found.");
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location);
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, "redirect route with path \"" + rawPath + "\"");
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location);
    } else {
      if (process.env.NODE_ENV !== 'production') {
        warn(false, "invalid redirect option: " + JSON.stringify(redirect));
      }
      return _createRoute(null, location);
    }
  }

  function alias(record, location, matchAs) {
    var aliasedPath = fillParams(matchAs, location.params, "aliased route with path \"" + matchAs + "\"");
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location);
    }
    return _createRoute(null, location);
  }

  function _createRoute(record, location, redirectedFrom) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location);
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs);
    }
    return createRoute(record, location, redirectedFrom, router);
  }

  return {
    match: match,
    addRoutes: addRoutes
  };
}

function matchRoute(regex, path, params) {
  var m = path.match(regex);

  if (!m) {
    return false;
  } else if (!params) {
    return true;
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true;
}

function resolveRecordPath(path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true);
}

/*  */

var positionStore = Object.create(null);

function setupScroll() {
  // Fix for #1585 for Firefox
  window.history.replaceState({ key: getStateKey() }, '');
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll(router, to, from, isPop) {
  if (!router.app) {
    return;
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return;
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);

    if (!shouldScroll) {
      return;
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll.then(function (shouldScroll) {
        scrollToPosition(shouldScroll, position);
      }).catch(function (err) {
        if (process.env.NODE_ENV !== 'production') {
          assert(false, err.toString());
        }
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition() {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition() {
  var key = getStateKey();
  if (key) {
    return positionStore[key];
  }
}

function getElementPosition(el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  };
}

function isValidPosition(obj) {
  return isNumber(obj.x) || isNumber(obj.y);
}

function normalizePosition(obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  };
}

function normalizeOffset(obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  };
}

function isNumber(v) {
  return typeof v === 'number';
}

function scrollToPosition(shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    var el = document.querySelector(shouldScroll.selector);
    if (el) {
      var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState = inBrowser && function () {
  var ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
    return false;
  }

  return window.history && 'pushState' in window.history;
}();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now ? window.performance : Date;

var _key = genKey();

function genKey() {
  return Time.now().toFixed(3);
}

function getStateKey() {
  return _key;
}

function setStateKey(key) {
  _key = key;
}

function pushState(url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState(url) {
  pushState(url, true);
}

/*  */

function runQueue(queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents(matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function' ? resolvedDef : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          process.env.NODE_ENV !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason) ? reason : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) {
      next();
    }
  };
}

function flatMapComponents(matched, fn) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return fn(m.components[key], m.instances[key], m, key);
    });
  }));
}

function flatten(arr) {
  return Array.prototype.concat.apply([], arr);
}

var hasSymbol = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

function isESModule(obj) {
  return obj.__esModule || hasSymbol && obj[Symbol.toStringTag] === 'Module';
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once(fn) {
  var called = false;
  return function () {
    var arguments$1 = arguments;

    var args = [],
        len = arguments.length;
    while (len--) { args[len] = arguments$1[len]; }

    if (called) {
      return;
    }
    called = true;
    return fn.apply(this, args);
  };
}

/*  */

var History = function History(router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen(cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady(cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError(errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo(location, onComplete, onAbort) {
  var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) {
        cb(route);
      });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) {
        cb(err);
      });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition(route, onComplete, onAbort) {
  var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) {
          cb(err);
        });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (isSameRoute(route, current) &&
  // in the case the route map has been dynamically appended to
  route.matched.length === current.matched.length) {
    this.ensureURL();
    return abort();
  }

  var ref = resolveQueue(this.current.matched, route.matched);
  var updated = ref.updated;
  var deactivated = ref.deactivated;
  var activated = ref.activated;

  var queue = [].concat(
  // in-component leave guards
  extractLeaveGuards(deactivated),
  // global before hooks
  this.router.beforeHooks,
  // in-component update hooks
  extractUpdateHooks(updated),
  // in-config enter guards
  activated.map(function (m) {
    return m.beforeEnter;
  }),
  // async components
  resolveAsyncComponents(activated));

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort();
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (typeof to === 'string' || typeof to === 'object' && (typeof to.path === 'string' || typeof to.name === 'string')) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () {
      return this$1.current === route;
    };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort();
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) {
            cb();
          });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute(route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase(base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = baseEl && baseEl.getAttribute('href') || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '');
}

function resolveQueue(current, next) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break;
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  };
}

function extractGuards(records, name, bind, reverse) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard) ? guard.map(function (guard) {
        return bind(guard, instance, match, key);
      }) : bind(guard, instance, match, key);
    }
  });
  return flatten(reverse ? guards.reverse() : guards);
}

function extractGuard(def, key) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key];
}

function extractLeaveGuards(deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true);
}

function extractUpdateHooks(updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard);
}

function bindGuard(guard, instance) {
  if (instance) {
    return function boundRouteGuard() {
      return guard.apply(instance, arguments);
    };
  }
}

function extractEnterGuards(activated, cbs, isValid) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid);
  });
}

function bindEnterGuard(guard, match, key, cbs, isValid) {
  return function routeEnterGuard(to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    });
  };
}

function poll(cb, // somehow flow cannot infer this is a function
instances, key, isValid) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */

var HTML5History = function (History$$1) {
  function HTML5History(router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return;
      }

      this$1.transitionTo(location, function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if (History$$1) { HTML5History.__proto__ = History$$1; }
  HTML5History.prototype = Object.create(History$$1 && History$$1.prototype);
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go(n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL(push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation() {
    return getLocation(this.base);
  };

  return HTML5History;
}(History);

function getLocation(base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash;
}

/*  */

var HashHistory = function (History$$1) {
  function HashHistory(router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return;
    }
    ensureSlash();
  }

  if (History$$1) { HashHistory.__proto__ = History$$1; }
  HashHistory.prototype = Object.create(History$$1 && History$$1.prototype);
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners() {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', function () {
      var current = this$1.current;
      if (!ensureSlash()) {
        return;
      }
      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    });
  };

  HashHistory.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go(n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL(push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation() {
    return getHash();
  };

  return HashHistory;
}(History);

function checkFallback(base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(cleanPath(base + '/#' + location));
    return true;
  }
}

function ensureSlash() {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true;
  }
  replaceHash('/' + path);
  return false;
}

function getHash() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1);
}

function getUrl(path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return base + "#" + path;
}

function pushHash(path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash(path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */

var AbstractHistory = function (History$$1) {
  function AbstractHistory(router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if (History$$1) { AbstractHistory.__proto__ = History$$1; }
  AbstractHistory.prototype = Object.create(History$$1 && History$$1.prototype);
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go(n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return;
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation() {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/';
  };

  AbstractHistory.prototype.ensureURL = function ensureURL() {
    // noop
  };

  return AbstractHistory;
}(History);

/*  */

var VueRouter$1 = function VueRouter(options) {
  if (options === void 0) { options = {}; }

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break;
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break;
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break;
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, "invalid mode: " + mode);
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter$1.prototype.match = function match(raw, current, redirectedFrom) {
  return this.matcher.match(raw, current, redirectedFrom);
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current;
};

VueRouter$1.prototype.init = function init(app /* Vue component instance */) {
  var this$1 = this;

  process.env.NODE_ENV !== 'production' && assert(install.installed, "not installed. Make sure to call `Vue.use(VueRouter)` " + "before creating root instance.");

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return;
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(history.getCurrentLocation(), setupHashListener, setupHashListener);
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter$1.prototype.beforeEach = function beforeEach(fn) {
  return registerHook(this.beforeHooks, fn);
};

VueRouter$1.prototype.beforeResolve = function beforeResolve(fn) {
  return registerHook(this.resolveHooks, fn);
};

VueRouter$1.prototype.afterEach = function afterEach(fn) {
  return registerHook(this.afterHooks, fn);
};

VueRouter$1.prototype.onReady = function onReady(cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter$1.prototype.onError = function onError(errorCb) {
  this.history.onError(errorCb);
};

VueRouter$1.prototype.push = function push(location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter$1.prototype.replace = function replace(location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter$1.prototype.go = function go(n) {
  this.history.go(n);
};

VueRouter$1.prototype.back = function back() {
  this.go(-1);
};

VueRouter$1.prototype.forward = function forward() {
  this.go(1);
};

VueRouter$1.prototype.getMatchedComponents = function getMatchedComponents(to) {
  var route = to ? to.matched ? to : this.resolve(to).route : this.currentRoute;
  if (!route) {
    return [];
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key];
    });
  }));
};

VueRouter$1.prototype.resolve = function resolve(to, current, append) {
  var location = normalizeLocation(to, current || this.history.current, append, this);
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  };
};

VueRouter$1.prototype.addRoutes = function addRoutes(routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties(VueRouter$1.prototype, prototypeAccessors);

function registerHook(list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) {
      list.splice(i, 1);
    }
  };
}

function createHref(base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path;
}

VueRouter$1.install = install;
VueRouter$1.version = '3.0.1';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter$1);
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var interceptor = createCommonjsModule(function (module, exports) {
var interceptors = {};

var types = {
    "view": 'view',
    "route": 'view',
    "start": "start"
    /**
     * 注册拦截器
     * @param type 拦截器的执行类型
     * @param handler 拦截器的处理函数，不停的拦截器入参有不同的参数入参
     */
};exports.registerInterceptor = function (type, handler) {
    type = types[type];
    interceptors[type] = interceptors[type] || [];
    interceptors[type].push(handler);
    return this;
};

/**
 * 执行拦截器，
 * @param type 需要执行的拦截器的类型
 * @param args 执行拦截器时候注入的入参
 * @param cb 成功之后的拦截器回调
 * @param index
 */
exports.runInterceptor = function (type, args, cb, index) {
    index = index || 0;
    if (interceptors[type] && interceptors[type].length > 0 && index < interceptors[type].length) {
        interceptors[type][index].apply(null, args.concat([function () {
            exports.runInterceptor(type, args, cb, index + 1);
        }]));
    } else {
        cb();
    }
};

exports.getInterceptor = function (type) {
    return interceptors[type] || [];
};
});

var interceptor_1 = interceptor.registerInterceptor;
var interceptor_2 = interceptor.runInterceptor;
var interceptor_3 = interceptor.getInterceptor;

function treeRouteOption(routers) {
    var options = [];
    var home = routers[0] ? routers[0].path : '/404';
    while (true) {
        var route = routers[0];

        if (!route) { break; }

        if (route.home) {
            home = route.path;
        }

        if (!route.parent) {
            options.push({
                path: route.path,
                component: route.component,
                children: []
            });
        } else {
            var node = queryTree(options, route.parent);
            if (node) {
                node.children.push({
                    path: route.path,
                    component: route.component,
                    children: []
                });
            } else {
                var tmp = routers[0];
                routers.push(tmp);
            }
        }
        routers.splice(0, 1);
    }
    return { options: options, home: home };
}

/**
 * 这里的递归算法有问题？
 * 有什么问题呢？
 * 导致这个方法无法退出，递归无法终止导致浏览器卡死，不是假死是真死！
 * @param options
 * @param path
 * @returns {*}
 */
function queryTree(options, path) {
    for (var i = 0; i < options.length; i++) {
        var op = options[i];
        if (op.path === path) {
            return op;
        }

        if (op.children && op.children.length > 0 && path.indexOf(op.path) === 0) {
            return queryTree(op.children, path);
        }
    }
}

var VueAdapt = {
    initVueRouter: function initVueRouter(routeOpt, views, callback) {

        //触发ready，每个视图的ready都在这个时候触发出来
        // views.forEach(function (view) {
        //     if(view.component.ready)view.component.ready();
        // });

        //将生命周期函数缓存起来
        views.forEach(function (view) {
            var orginMounted = view.component.mounted;
            view.component.mounted = [function () {
                var that = this;

                //jsn运行模式下追加请求参数
                if (process.env.RUNTIME === "native") {
                    var path = weex.config.bundleUrl.split("#");
                    if (path.length !== 2) {
                        return;
                    }
                    path = path[1].split("?");
                    if (path[0] === view.path && path[1]) {
                        //视图对了
                        var query = path[1].split("&");
                        query.forEach(function (qr) {
                            if (!qr) {
                                return;
                            }
                            qr = qr.split("=");
                            that.$set(that.$route.query, qr[0], decodeURIComponent(qr[1] || ''));
                        });
                    }
                }

                var rt = view.component;
                if (rt) {
                    this.view = this;
                    this.model = this;
                    this.data = this;

                    var before = rt.beforeShow || rt.beforeRender;
                    if (before) {
                        before.call(this, this.$route.query, this.$route);
                    }
                    var after = rt.afterShow || rt.afterRender;
                    if (after) {
                        after.call(this, this.$route.query, this.$route);
                    }
                }
            }].concat(orginMounted ? [orginMounted] : []);

            var orginDestroyed = view.component.destroyed;
            view.component.destroyed = [function () {
                var rt = view.component;
                if (rt) {
                    var before = rt.beforeHide || rt.beforeUnRender;
                    if (before) {
                        before.call(this);
                    }
                    var after = rt.afterHide || rt.afterUnRender;
                    if (after) {
                        after.call(this);
                    }
                }
            }].concat(orginDestroyed ? [orginDestroyed] : []);
        });

        //梳理负责关系
        var ref = treeRouteOption(views);
        var options = ref.options;
        var home = ref.home;
        options.push({
            path: "/",
            redirect: home
        });
        var router = new VueRouter$1({
            routes: options,
            mode: routeOpt.mode
        });

        //导航钩子注册
        interceptor_3("view").forEach(function (hook) {
            var this$1 = this;

            router.beforeEach(function (to, from, next) {
                hook.call(this$1, from, to, next);
            });
        });
        callback(router);
    },
    VueRouter: VueRouter$1
};

var events = {};
var id = 1;

var bindMap = {
    "appStarted": 'start',
    "viewChanged": "route"
    /**
     * 绑定自定义事件
     * @param event 自定义事件
     * @param handler 自定义事件的处理函数
     */
};var bind = function (event, handler) {
    // appStarted，viewChanged
    if (bindMap[event]) { event = bindMap[event]; }

    handler.id = id;
    events[event] = events[event] || [];
    events[event].push(handler);
    return id++;
};

/**
 * 主动触发应用级事件
 */
var trigger = function (event) {
    var params = [], len = arguments.length - 1;
    while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

    if (events[event] && events[event].length > 0) {
        events[event].forEach(function (handler) {
            //事件的处理必须是异步的
            var doHandler = function () {
                handler.apply({
                    event: event
                }, params);
            };
            setTimeout(doHandler, 0);
        });
    }
};

/**
 * 解绑事件
 */
var unbind = function (event, id) {
    if (id && events[event]) {
        events[event] = events[event].filter(function (handler) {
            return handler.id !== id;
        });
    } else {
        events[event] = [];
    }
};

var greeting = function () {
    var info = "\n    \n         _  _         _      _    _               \n        | |(_)       | |    | |  (_)                 \n        | | _   __ _ | |__  | |_  _  _ __    __ _ \n        | || | / _` || '_ \\ | __|| || '_ \\  / _` |\n        | || || (_| || | | || |_ | || | | || (_| |\n        |_||_| \\__, ||_| |_| \\__||_||_| |_| \\__, |\n                __/ |                        __/ |\n               |___/                        |___/ \n        \n        \n        一个平台，成就千万前端的梦想；\n        一张页面，寄托与您共事的向往；\n        这里有情怀，也有干货；\n        等你来...\n        \n        请将简历发送至  hr@hundsun.com（ 邮件标题请以“姓名-应聘Light-来自console”命名）\n        网站官网：https://light.hscloud.cn\n    ";

    console.log("%c " + info, "color:#999");
};

var extend$1 = function (dist) {
    var source = [], len = arguments.length - 1;
    while ( len-- > 0 ) source[ len ] = arguments[ len + 1 ];

    source.forEach(function (so) {
        for (var k in so) {
            if (so.hasOwnProperty(k)) { dist[k] = so[k]; }
        }
    });
    return dist;
};

/*日期时间*/
var format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)); }
    for (var k in o) { if (new RegExp("(" + k + ")").test(fmt)) { fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)); } }
    return fmt;
};
try {
    Date.prototype.Format = format;
} catch (e) {}
Date.Format = format;

var parse2query = function parse2query(data) {
    var string = "";
    Object.keys(data).forEach(function (key) {
        string += key + "=" + (encodeURIComponent(data[key])) + "&";
    });
    string = string.substring(0, string.length - 1);
    return string;
};

var ajax = null;
if (process.env.RUNTIME == 'native' && typeof weex !== "undefined") {
    var stream$1 = weex.requireModule('stream');

    ajax = function (options) {
        var settings = {};
        settings.method = options.type;
        settings.type = options.dataType;

        settings.headers = options.headers;
        var success = options.success;
        var error = options.error;
        settings.headers['Content-Type'] = settings.headers['content-type'] || 'application/x-www-form-urlencoded';

        settings.body = parse2query(options.data || {});
        settings.url = (options.url) + "?" + (settings.body);
        if (options.dataType == 'jsonp') {
            var jsonpID = 0;
            var callbackName = options.jsonpCallback || 'jsonp' + ++jsonpID;
            settings.url = settings.url + "&callback=" + callbackName;
        }

        stream$1.fetch(settings, function (ret) {
            if (ret.ok) {
                success && success(ret.data);
            } else {
                error && error(ret);
            }
        });
    };
} else {

    var type = function (str) {
        return typeof str;
    };
    var jsonpID = 0,
        key,
        name,
        rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        scriptTypeRE = /^(?:text|application)\/javascript/i,
        xmlTypeRE = /^(?:text|application)\/xml/i,
        jsonType = 'application/json',
        htmlType = 'text/html',
        blankRE = /^\s*$/;

    ajax = function (options) {
        var settings = extend$$1({}, options || {});
        for (key in ajax.settings) { if (settings[key] === undefined) { settings[key] = ajax.settings[key]; } }

        ajaxStart(settings);

        if (!settings.crossDomain) { settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) && RegExp.$2 != location.host; }

        var dataType = settings.dataType,
            hasPlaceholder = /=\?/.test(settings.url);
        if (dataType == 'jsonp' || hasPlaceholder) {
            if (!hasPlaceholder) { settings.url = appendQuery(settings.url, (options.jsonp || 'callback') + '=?'); }
            return ajax.JSONP(settings);
        }

        if (!settings.url) { settings.url = location.toString(); }
        serializeData(settings);

        var mime = settings.accepts[dataType],
            baseHeaders = {},
            protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : location.protocol,
            xhr = ajax.settings.xhr(),
            abortTimeout;

        if (!settings.crossDomain) { baseHeaders['X-Requested-With'] = 'XMLHttpRequest'; }
        if (mime) {
            baseHeaders['Accept'] = mime;
            if (mime.indexOf(',') > -1) { mime = mime.split(',', 2)[0]; }
            xhr.overrideMimeType && xhr.overrideMimeType(mime);
        }
        if (settings.contentType || settings.data && settings.type.toUpperCase() != 'GET') { baseHeaders['Content-Type'] = settings.contentType || 'application/x-www-form-urlencoded'; }
        settings.headers = extend$$1(baseHeaders, settings.headers || {});

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                clearTimeout(abortTimeout);
                var result,
                    error = false;
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0 && protocol == 'file:') {
                    dataType = dataType || mimeToDataType(xhr.getResponseHeader('content-type'));
                    result = xhr.responseText;

                    try {
                        if (dataType == 'script') { (1, eval)(result); }else if (dataType == 'xml') { result = xhr.responseXML; }else if (dataType == 'json') { result = blankRE.test(result) ? null : JSON.parse(result); }
                    } catch (e) {
                        error = e;
                    }

                    if (error) { ajaxError(error, 'parsererror', xhr, settings); }else { ajaxSuccess(result, xhr, settings); }
                } else {
                    ajaxError(null, 'error', xhr, settings);
                }
            }
        };

        var async = 'async' in settings ? settings.async : true;
        xhr.open(settings.type, settings.url, async);

        for (name in settings.headers) { xhr.setRequestHeader(name, settings.headers[name]); }

        if (ajaxBeforeSend(xhr, settings) === false) {
            xhr.abort();
            return false;
        }

        if (settings.timeout > 0) { abortTimeout = setTimeout(function () {
            xhr.onreadystatechange = empty;
            xhr.abort();
            ajaxError(null, 'timeout', xhr, settings);
        }, settings.timeout); }

        // avoid sending empty string (#319)
        xhr.send(settings.data ? settings.data : null);
        return xhr;
    };

    // trigger a custom event and return false if it was cancelled
    function triggerAndReturn(context, eventName, data) {
        //todo: Fire off some events
        //let event = $.Event(eventName)
        //$(context).trigger(event, data)
        return true; //!event.defaultPrevented
    }

    // trigger an Ajax "global" event
    function triggerGlobal(settings, context, eventName, data) {
        if (settings.global) { return triggerAndReturn(context || document, eventName, data); }
    }

    // Number of active Ajax requests
    ajax.active = 0;

    function ajaxStart(settings) {
        if (settings.global && ajax.active++ === 0) { triggerGlobal(settings, null, 'ajaxStart'); }
    }

    function ajaxStop(settings) {
        if (settings.global && ! --ajax.active) { triggerGlobal(settings, null, 'ajaxStop'); }
    }

    // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
    function ajaxBeforeSend(xhr, settings) {
        var context = settings.context;
        if (settings.beforeSend.call(context, xhr, settings) === false || triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false) { return false; }

        triggerGlobal(settings, context, 'ajaxSend', [xhr, settings]);
    }

    function ajaxSuccess(data, xhr, settings) {
        var context = settings.context,
            status = 'success';
        settings.success.call(context, data, status, xhr);
        triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data]);
        ajaxComplete(status, xhr, settings);
    }

    // type: "timeout", "error", "abort", "parsererror"
    function ajaxError(error, type, xhr, settings) {
        var context = settings.context;
        settings.error.call(context, xhr, type, error);
        triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error]);
        ajaxComplete(type, xhr, settings);
    }

    // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
    function ajaxComplete(status, xhr, settings) {
        var context = settings.context;
        settings.complete.call(context, xhr, status);
        triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings]);
        ajaxStop(settings);
    }

    // Empty function, used as default callback
    function empty() {}

    ajax.JSONP = function (options) {
        if (!('type' in options)) { return ajax(options); }

        var callbackName = options.jsonpCallback || 'jsonp' + ++jsonpID,
            script = document.createElement('script'),
            abort = function () {
            //todo: remove script
            //$(script).remove()
            if (callbackName in window) { window[callbackName] = empty; }
            ajaxComplete('abort', xhr, options);
        },
            xhr = { abort: abort },
            abortTimeout,
            head = document.getElementsByTagName("head")[0] || document.documentElement;

        if (options.error) { script.onerror = function () {
            xhr.abort();
            options.error();
        }; }

        window[callbackName] = function (data) {
            clearTimeout(abortTimeout);
            //todo: remove script
            //$(script).remove()
            delete window[callbackName];
            ajaxSuccess(data, xhr, options);
        };

        serializeData(options);
        script.src = options.url.replace(/=\?/, '=' + callbackName);

        // Use insertBefore instead of appendChild to circumvent an IE6 bug.
        // This arises when a base node is used (see jQuery bugs #2709 and #4378).
        head.insertBefore(script, head.firstChild);

        if (options.timeout > 0) { abortTimeout = setTimeout(function () {
            xhr.abort();
            ajaxComplete('timeout', xhr, options);
        }, options.timeout); }

        return xhr;
    };

    ajax.settings = {
        // Default type of request
        type: 'GET',
        // Callback that is executed before request
        beforeSend: empty,
        // Callback that is executed if the request succeeds
        success: empty,
        // Callback that is executed the the server drops error
        error: empty,
        // Callback that is executed on request complete (both: error and success)
        complete: empty,
        // The context for the callbacks
        context: null,
        // Whether to trigger "global" Ajax events
        global: true,
        // Transport
        xhr: function () {
            return new XMLHttpRequest();
        },
        // MIME types mapping
        accepts: {
            script: 'text/javascript, application/javascript',
            json: jsonType,
            xml: 'application/xml, text/xml',
            html: htmlType,
            text: 'text/plain'
        },
        // Whether the request is to another domain
        crossDomain: false,
        // Default timeout
        timeout: 0
    };

    function mimeToDataType(mime) {
        return mime && (mime == htmlType ? 'html' : mime == jsonType ? 'json' : scriptTypeRE.test(mime) ? 'script' : xmlTypeRE.test(mime) && 'xml') || 'text';
    }

    function appendQuery(url, query) {
        return (url + '&' + query).replace(/[&?]{1,2}/, '?');
    }

    // serialize payload and append it to the URL for GET requests
    function serializeData(options) {
        if (type(options.data) === 'object') { options.data = param(options.data); }
        if (options.data && (!options.type || options.type.toUpperCase() == 'GET')) { options.url = appendQuery(options.url, options.data); }
    }

    ajax.get = function (url, success) {
        return ajax({ url: url, success: success });
    };

    ajax.post = function (url, data, success, dataType) {
        if (type(data) === 'function') { dataType = dataType || success, success = data, data = null; }
        return ajax({ type: 'POST', url: url, data: data, success: success, dataType: dataType });
    };

    ajax.getJSON = function (url, success) {
        return ajax({ url: url, success: success, dataType: 'json' });
    };

    ajax.request = function (params) {
        return new Promise(function (resolve) {
            var success = params.success;
            params.success = function (data) {
                resolve(data);
            };
            ajax(params);
        });
    };

    var escape = encodeURIComponent;

    function serialize(params, obj, traditional, scope) {
        var array = type(obj) === 'array';
        for (var key in obj) {
            var value = obj[key];

            if (scope) { key = traditional ? scope : scope + '[' + (array ? '' : key) + ']'; }
            // handle data in serializeArray() format
            if (!scope && array) { params.add(value.name, value.value); }
            // recurse into nested objects
            else if (traditional ? type(value) === 'array' : type(value) === 'object') { serialize(params, value, traditional, key); }else { params.add(key, value); }
        }
    }

    function param(obj, traditional) {
        var params = [];
        params.add = function (k, v) {
            this.push(escape(k) + '=' + escape(v));
        };
        serialize(params, obj, traditional);
        return params.join('&').replace('%20', '+');
    }

    function extend$$1(target) {
        var slice = Array.prototype.slice;
        slice.call(arguments, 1).forEach(function (source) {
            for (key in source) { if (source[key] !== undefined) { target[key] = source[key]; } }
        });
        return target;
    }
}

var ajax$1 = ajax;

function Logger(options) {
    //默认日志是关闭的
    this.level = options.level || Logger.LOG_OFF;
    this.appendix = options.appendix || "Lighting";
}

Logger.LEVEL_DEBUG = 1;
Logger.LEVEL_INFO = 2;
Logger.LEVEL_WARN = 3;
Logger.LEVEL_ERROR = 4;
Logger.LOG_OFF = 5;

/**
 * 错误信息
 * @param msg
 */
Logger.prototype.error = function (msg) {
    if (this.level <= Logger.LEVEL_ERROR) {
        console.error("[" + this.appendix + "]" + msg);
        if (Logger.websocket) { Logger.websocket.send(JSON.stringify({
            type: "log",
            level: "error",
            message: msg,
            userAgent: navigator.userAgent
        })); }
    }
};

/**
 * 警告信息
 * @param msg
 */
Logger.prototype.warn = function (msg) {
    if (this.level <= Logger.LEVEL_WARN) {
        console.warn("[" + this.appendix + "]" + msg);
        if (Logger.websocket) { Logger.websocket.send(JSON.stringify({
            type: "log",
            level: "warn",
            message: msg,
            userAgent: navigator.userAgent
        })); }
    }
};

/**
 * 一般信息
 * @param msg
 */
Logger.prototype.info = function (msg) {
    if (this.level <= Logger.LEVEL_INFO) {
        console.info("[" + this.appendix + "]" + msg);
        if (Logger.websocket) { Logger.websocket.send(JSON.stringify({
            type: "log",
            level: "info",
            message: msg,
            userAgent: navigator.userAgent
        })); }
    }
};

/**
 * 调试信息
 * @param msg
 */
Logger.prototype.debug = function (msg) {
    if (this.level <= Logger.LEVEL_DEBUG) {
        console.log("[" + this.appendix + "]" + msg);
        if (Logger.websocket) { Logger.websocket.send(JSON.stringify({
            type: "log",
            level: "debug",
            message: msg,
            userAgent: navigator.userAgent
        })); }
    }
};

var _extends = Object.assign || function (target) {
var arguments$1 = arguments;
 for (var i = 1; i < arguments.length; i++) { var source = arguments$1[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var views = [];
var config = {};
var VueRouter = VueAdapt.VueRouter;

function registerView(view) {
    views.push(view);
    return this;
}

//设备是否准备就绪
var deviceReady = function (cb) {
    if (process.env.RUNTIME === "web" && navigator.userAgent.toLowerCase().indexOf("lightos") !== -1) {
        document.addEventListener("deviceready", function () {
            window.LightJSBridge.onPageAppear = function () {
                trigger("viewappear");
            };
            window.LightJSBridge.onPageDisAppear = function () {
                trigger("viewdisappear");
            };
            cb();
        });
    } else {
        cb();
    }
};

var Light = {
    route: registerView,
    registerView: registerView,

    filter: interceptor_1,
    runInterceptor: interceptor_2,
    registerInterceptor: interceptor_1,

    VueRouter: VueRouter,
    Logger: Logger,

    config: function config$1(confi) {
        this.extend(config, confi);
        return this;
    },
    /**
     *
     * @param options
     * @param options.el 挂载的父节点
     * @param options.routeMode 路由模式
     * @param options.routeMode 路由模式
     * @param options.viewport 设置运行页面的宽度（仅支持JSN）
     * @param cb
     */
    start: function start(options, cb) {
        var arguments$1 = arguments;

        var that = this;
        deviceReady(function () { return that._startNow.apply(that, arguments$1); });
    },
    _startNow: function _startNow(options, cb) {
        var that = this;
        switch (arguments.length) {
            case 0:
                cb = function () {};
                options = {};
                break;
            case 1:
                if (typeof options === "function") {
                    cb = options;
                    options = {};
                } else {
                    cb = function () {};
                }
                break;
            case 2:
                break;
        }
        this.runInterceptor("start", [], function () {
            //--------------------------------------------------------
            if (typeof weex !== "undefined" && options.viewport) {
                //设置页面宽度保持对这种页面的兼容
                var meta = weex.requireModule('meta');
                meta.setViewport({
                    width: options.viewport
                });
            }
            //--------------------------------------------------------
            VueAdapt.initVueRouter({
                mode: options.routeMode || 'hash'
            }, views, function (router) {
                that.router = router;
                var rootVUE = {};
                rootVUE.router = router;
                rootVUE.el = options.el || "#main";

                if (process.env.RUNTIME === "web") {} else if (process.env.RUNTIME === "native") {
                    rootVUE.render = function () {
                        var _vm = this;
                        var _h = _vm.$createElement;
                        var _c = _vm._self._c || _h;
                        return _c('div', {
                            on: {
                                "androidback": _vm.back,
                                "viewappear": _vm.viewappear,
                                "viewdisappear": _vm.viewdisappear
                            }
                        }, [_c('router-view', {
                            staticStyle: {
                                flex: "1"
                            }
                        })], 1);
                    };
                    rootVUE.render._withStripped = true;
                    rootVUE.staticRenderFns = [];
                    rootVUE.style = {};
                    rootVUE.methods = {
                        back: function () {
                            this.$router.back();
                        },
                        viewappear: function viewappear() {
                            trigger("viewappear");
                        },
                        viewdisappear: function viewdisappear() {
                            trigger("viewdisappear");
                        }
                    };
                    var defaultView = "/";

                    //如果有native则肯定有weex.config.bundleUrl

                    var checkView = /#([^?]{1,})/ig.exec(weex.config.bundleUrl);
                    if (checkView && checkView[1]) {
                        defaultView = checkView[1];
                    }

                    // let config = weex.config.inputParam;
                    // if(config && config._VIEW_){
                    //     defaultView =  config._VIEW_
                    // }
                    rootVUE.router.push(defaultView);
                }

                var app = new Light.Vue(rootVUE);
                trigger("appStarted");
                if (cb && typeof cb === "function") { cb.call(null, rootVUE.router); }
            });
        });
    },
    /**
     * 视图跳转,
     *              绝对路径              相对路径
     * webview
     *
     * jsnative
     *
     * browser
     *
     * @param view 路径,可以支持多种类型,规则视图不能有视图参数
     *  1. https://demo.lightyy.com/index.html?a=1#/view/abc
     *  2. https://demo.lightyy.com/index.native.js?a=1#/view/abc
     *  //3. index.native.js?a=1#/view/abc
     *  //4. index.html?a=1#/view/abc
     *  5. #/view/abc?
     *  5. view/abc
     *  H5运行时的默认navigate行为是单页模式,而jsn默认是视图跳转模式
     *  history是是否产生历史记录
     *  replace是是否在当前容器中打开,true则是,false则否,jsn中默认是false,其他情况默认是true
     *  这里的接口设计又是有点问题的,应该好好调整一下
     * @param params
     * @param options 是否产生历史记录
     */
    navigate: function navigate(view, params, options) {
        options = options || {};
        params = params || {};

        var path = {
            params: params,
            type: process.env.RUNTIME
        };

        //链接和路由
        if (/^https?:\/\//i.test(view)) {
            var split = view.split("#");
            path.url = split[0];
            path.view = split.length === 2 ? split[1] : '';
            //跳转的目标类型
            if (/\.js$/.test(path.url)) {
                path.type = "native";
            } else {
                path.type = "web";
            }
        } else {
            if (view.indexOf("#/") === 0) {
                view = view.substring(1);
            } else {
                view = "/" + view;
            }
            path.view = view;
            path.url = process.env.RUNTIME === "native" ? weex.config.bundleUrl.split("#")[0] : location.href.split("#")[0];
        }

        var _view = path.view ? "#" + path.view : "";
        var _params = parse2query(path.params) ? "?" + parse2query(path.params) : "";
        var dist = path.url + _view + _params;

        //处理跳转:native-->native------------------------------------
        if (process.env.RUNTIME === "native" && path.type === "native") {
            //jSN环境
            var navigator$1 = weex.requireModule('navigator');

            if (options.replace) {
                this.router.push({ path: view, query: params });
            } else {
                navigator$1.push(_extends({
                    url: dist,
                    animated: "true"
                }, options), function (event) {
                    if (options.callback) { options.callback(); }
                });
            }
        }

        //处理跳转:native-->web------------------------------------
        if (process.env.RUNTIME === "native" && path.type === "web") {
            var event = weex.requireModule("event");
            event.openNative("web", _extends({
                startPage: dist
            }, options));
        }

        //处理跳转:web-->native------------------------------------
        if (process.env.RUNTIME === "web" && path.type === "native") {
            if (navigator.userAgent.toLowerCase().indexOf("lightos") !== -1) {
                //webview
                location.href = "gmu://jsnative?startPage=" + (encodeURIComponent(dist)) + "&" + (parse2query(options));
            } else {
                //browser
                location.href = dist;
            }
        }

        //处理跳转:web-->web------------------------------------
        if (process.env.RUNTIME === "web" && path.type === "web") {
            if (options.replace !== false) {
                if (path.url === location.href.split("#")[0]) {
                    if (options && options.history === false) {
                        this.router.replace({ path: path.view, query: params });
                    } else {
                        this.router.push({ path: path.view, query: params });
                    }
                } else {
                    if (options && options.history === false) {
                        location.replace(dist);
                    } else {
                        location.href = dist;
                    }
                }
            }

            if (options.replace === false) {
                if (navigator.userAgent.toLowerCase().indexOf("lightos") !== -1) {
                    //webview
                    location.href = "gmu://web?startPage=" + (encodeURIComponent(dist)) + "&" + (parse2query(options));
                } else {
                    //browser
                    location.href = dist;
                }
            }
        }
        //处理跳转------------------------------------END
    },
    inspect: function inspect() {
        console.table(this);
    },
    bind: bind, unbind: unbind, trigger: trigger, on: bind, off: unbind, ajax: ajax$1, extend: extend$1,

    log: function log(info) {
        if (process.env.NODE_ENV === "dev") {
            //修复Uncaught TypeError: Illegal invocation(…)的问题
            console.log(info);
        }
    },
    install: function install(Vue) {
        this.Model = Vue;
        this.Vue = Vue;
        Vue.use(VueRouter);
        Vue.component("sub-view", Vue.component("router-view"));
        Vue.prototype.$light = this;
        if (typeof weex !== 'undefined') {
            Vue.prototype.$page = weex;
        }
    }
};

if (typeof weex !== "undefined") {
    var stream = weex.requireModule('stream');

    //设置页面宽度保持对这种页面的兼容
    // const meta = weex.requireModule('meta');
    // meta.setViewport({
    //     width: weex.config.env.deviceWidth
    // });

    Light.fetch = stream.fetch;
    Light.requireModule = weex.requireModule;
}

bind("appStarted", function () {
    greeting();
});

// export default Light;
// exports.light = Light
window.Light = Light
return Light;
})