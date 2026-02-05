// @ts-nocheck

"use strict";
var ReDesignEditor = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/object-assign/index.js
  var require_object_assign = __commonJS({
    "node_modules/object-assign/index.js"(exports, module) {
      "use strict";
      var getOwnPropertySymbols = Object.getOwnPropertySymbols;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var propIsEnumerable = Object.prototype.propertyIsEnumerable;
      function toObject(val) {
        if (val === null || val === void 0) {
          throw new TypeError("Object.assign cannot be called with null or undefined");
        }
        return Object(val);
      }
      function shouldUseNative() {
        try {
          if (!Object.assign) {
            return false;
          }
          var test1 = new String("abc");
          test1[5] = "de";
          if (Object.getOwnPropertyNames(test1)[0] === "5") {
            return false;
          }
          var test2 = {};
          for (var i = 0; i < 10; i++) {
            test2["_" + String.fromCharCode(i)] = i;
          }
          var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
            return test2[n];
          });
          if (order2.join("") !== "0123456789") {
            return false;
          }
          var test3 = {};
          "abcdefghijklmnopqrst".split("").forEach(function(letter) {
            test3[letter] = letter;
          });
          if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
            return false;
          }
          return true;
        } catch (err) {
          return false;
        }
      }
      module.exports = shouldUseNative() ? Object.assign : function(target, source) {
        var from;
        var to = toObject(target);
        var symbols;
        for (var s = 1; s < arguments.length; s++) {
          from = Object(arguments[s]);
          for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
              to[key] = from[key];
            }
          }
          if (getOwnPropertySymbols) {
            symbols = getOwnPropertySymbols(from);
            for (var i = 0; i < symbols.length; i++) {
              if (propIsEnumerable.call(from, symbols[i])) {
                to[symbols[i]] = from[symbols[i]];
              }
            }
          }
        }
        return to;
      };
    }
  });

  // node_modules/react/cjs/react.production.min.js
  var require_react_production_min = __commonJS({
    "node_modules/react/cjs/react.production.min.js"(exports) {
      "use strict";
      var l = require_object_assign();
      var n = 60103;
      var p = 60106;
      exports.Fragment = 60107;
      exports.StrictMode = 60108;
      exports.Profiler = 60114;
      var q = 60109;
      var r = 60110;
      var t = 60112;
      exports.Suspense = 60113;
      var u = 60115;
      var v = 60116;
      if ("function" === typeof Symbol && Symbol.for) {
        w = Symbol.for;
        n = w("react.element");
        p = w("react.portal");
        exports.Fragment = w("react.fragment");
        exports.StrictMode = w("react.strict_mode");
        exports.Profiler = w("react.profiler");
        q = w("react.provider");
        r = w("react.context");
        t = w("react.forward_ref");
        exports.Suspense = w("react.suspense");
        u = w("react.memo");
        v = w("react.lazy");
      }
      var w;
      var x = "function" === typeof Symbol && Symbol.iterator;
      function y(a) {
        if (null === a || "object" !== typeof a) return null;
        a = x && a[x] || a["@@iterator"];
        return "function" === typeof a ? a : null;
      }
      function z(a) {
        for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
        return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var A = { isMounted: function() {
        return false;
      }, enqueueForceUpdate: function() {
      }, enqueueReplaceState: function() {
      }, enqueueSetState: function() {
      } };
      var B = {};
      function C(a, b, c) {
        this.props = a;
        this.context = b;
        this.refs = B;
        this.updater = c || A;
      }
      C.prototype.isReactComponent = {};
      C.prototype.setState = function(a, b) {
        if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error(z(85));
        this.updater.enqueueSetState(this, a, b, "setState");
      };
      C.prototype.forceUpdate = function(a) {
        this.updater.enqueueForceUpdate(this, a, "forceUpdate");
      };
      function D() {
      }
      D.prototype = C.prototype;
      function E(a, b, c) {
        this.props = a;
        this.context = b;
        this.refs = B;
        this.updater = c || A;
      }
      var F = E.prototype = new D();
      F.constructor = E;
      l(F, C.prototype);
      F.isPureReactComponent = true;
      var G = { current: null };
      var H = Object.prototype.hasOwnProperty;
      var I = { key: true, ref: true, __self: true, __source: true };
      function J(a, b, c) {
        var e, d = {}, k = null, h = null;
        if (null != b) for (e in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) H.call(b, e) && !I.hasOwnProperty(e) && (d[e] = b[e]);
        var g = arguments.length - 2;
        if (1 === g) d.children = c;
        else if (1 < g) {
          for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
          d.children = f;
        }
        if (a && a.defaultProps) for (e in g = a.defaultProps, g) void 0 === d[e] && (d[e] = g[e]);
        return { $$typeof: n, type: a, key: k, ref: h, props: d, _owner: G.current };
      }
      function K(a, b) {
        return { $$typeof: n, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
      }
      function L(a) {
        return "object" === typeof a && null !== a && a.$$typeof === n;
      }
      function escape(a) {
        var b = { "=": "=0", ":": "=2" };
        return "$" + a.replace(/[=:]/g, function(a2) {
          return b[a2];
        });
      }
      var M = /\/+/g;
      function N(a, b) {
        return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
      }
      function O(a, b, c, e, d) {
        var k = typeof a;
        if ("undefined" === k || "boolean" === k) a = null;
        var h = false;
        if (null === a) h = true;
        else switch (k) {
          case "string":
          case "number":
            h = true;
            break;
          case "object":
            switch (a.$$typeof) {
              case n:
              case p:
                h = true;
            }
        }
        if (h) return h = a, d = d(h), a = "" === e ? "." + N(h, 0) : e, Array.isArray(d) ? (c = "", null != a && (c = a.replace(M, "$&/") + "/"), O(d, b, c, "", function(a2) {
          return a2;
        })) : null != d && (L(d) && (d = K(d, c + (!d.key || h && h.key === d.key ? "" : ("" + d.key).replace(M, "$&/") + "/") + a)), b.push(d)), 1;
        h = 0;
        e = "" === e ? "." : e + ":";
        if (Array.isArray(a)) for (var g = 0; g < a.length; g++) {
          k = a[g];
          var f = e + N(k, g);
          h += O(k, b, c, f, d);
        }
        else if (f = y(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done; ) k = k.value, f = e + N(k, g++), h += O(k, b, c, f, d);
        else if ("object" === k) throw b = "" + a, Error(z(31, "[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b));
        return h;
      }
      function P(a, b, c) {
        if (null == a) return a;
        var e = [], d = 0;
        O(a, e, "", "", function(a2) {
          return b.call(c, a2, d++);
        });
        return e;
      }
      function Q(a) {
        if (-1 === a._status) {
          var b = a._result;
          b = b();
          a._status = 0;
          a._result = b;
          b.then(function(b2) {
            0 === a._status && (b2 = b2.default, a._status = 1, a._result = b2);
          }, function(b2) {
            0 === a._status && (a._status = 2, a._result = b2);
          });
        }
        if (1 === a._status) return a._result;
        throw a._result;
      }
      var R = { current: null };
      function S() {
        var a = R.current;
        if (null === a) throw Error(z(321));
        return a;
      }
      var T = { ReactCurrentDispatcher: R, ReactCurrentBatchConfig: { transition: 0 }, ReactCurrentOwner: G, IsSomeRendererActing: { current: false }, assign: l };
      exports.Children = { map: P, forEach: function(a, b, c) {
        P(a, function() {
          b.apply(this, arguments);
        }, c);
      }, count: function(a) {
        var b = 0;
        P(a, function() {
          b++;
        });
        return b;
      }, toArray: function(a) {
        return P(a, function(a2) {
          return a2;
        }) || [];
      }, only: function(a) {
        if (!L(a)) throw Error(z(143));
        return a;
      } };
      exports.Component = C;
      exports.PureComponent = E;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = T;
      exports.cloneElement = function(a, b, c) {
        if (null === a || void 0 === a) throw Error(z(267, a));
        var e = l({}, a.props), d = a.key, k = a.ref, h = a._owner;
        if (null != b) {
          void 0 !== b.ref && (k = b.ref, h = G.current);
          void 0 !== b.key && (d = "" + b.key);
          if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
          for (f in b) H.call(b, f) && !I.hasOwnProperty(f) && (e[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
        }
        var f = arguments.length - 2;
        if (1 === f) e.children = c;
        else if (1 < f) {
          g = Array(f);
          for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
          e.children = g;
        }
        return {
          $$typeof: n,
          type: a.type,
          key: d,
          ref: k,
          props: e,
          _owner: h
        };
      };
      exports.createContext = function(a, b) {
        void 0 === b && (b = null);
        a = { $$typeof: r, _calculateChangedBits: b, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null };
        a.Provider = { $$typeof: q, _context: a };
        return a.Consumer = a;
      };
      exports.createElement = J;
      exports.createFactory = function(a) {
        var b = J.bind(null, a);
        b.type = a;
        return b;
      };
      exports.createRef = function() {
        return { current: null };
      };
      exports.forwardRef = function(a) {
        return { $$typeof: t, render: a };
      };
      exports.isValidElement = L;
      exports.lazy = function(a) {
        return { $$typeof: v, _payload: { _status: -1, _result: a }, _init: Q };
      };
      exports.memo = function(a, b) {
        return { $$typeof: u, type: a, compare: void 0 === b ? null : b };
      };
      exports.useCallback = function(a, b) {
        return S().useCallback(a, b);
      };
      exports.useContext = function(a, b) {
        return S().useContext(a, b);
      };
      exports.useDebugValue = function() {
      };
      exports.useEffect = function(a, b) {
        return S().useEffect(a, b);
      };
      exports.useImperativeHandle = function(a, b, c) {
        return S().useImperativeHandle(a, b, c);
      };
      exports.useLayoutEffect = function(a, b) {
        return S().useLayoutEffect(a, b);
      };
      exports.useMemo = function(a, b) {
        return S().useMemo(a, b);
      };
      exports.useReducer = function(a, b, c) {
        return S().useReducer(a, b, c);
      };
      exports.useRef = function(a) {
        return S().useRef(a);
      };
      exports.useState = function(a) {
        return S().useState(a);
      };
      exports.version = "17.0.2";
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/scheduler/cjs/scheduler.production.min.js
  var require_scheduler_production_min = __commonJS({
    "node_modules/scheduler/cjs/scheduler.production.min.js"(exports) {
      "use strict";
      var f;
      var g;
      var h;
      var k;
      if ("object" === typeof performance && "function" === typeof performance.now) {
        l = performance;
        exports.unstable_now = function() {
          return l.now();
        };
      } else {
        p = Date, q = p.now();
        exports.unstable_now = function() {
          return p.now() - q;
        };
      }
      var l;
      var p;
      var q;
      if ("undefined" === typeof window || "function" !== typeof MessageChannel) {
        t = null, u = null, w = function() {
          if (null !== t) try {
            var a = exports.unstable_now();
            t(true, a);
            t = null;
          } catch (b) {
            throw setTimeout(w, 0), b;
          }
        };
        f = function(a) {
          null !== t ? setTimeout(f, 0, a) : (t = a, setTimeout(w, 0));
        };
        g = function(a, b) {
          u = setTimeout(a, b);
        };
        h = function() {
          clearTimeout(u);
        };
        exports.unstable_shouldYield = function() {
          return false;
        };
        k = exports.unstable_forceFrameRate = function() {
        };
      } else {
        x = window.setTimeout, y = window.clearTimeout;
        if ("undefined" !== typeof console) {
          z = window.cancelAnimationFrame;
          "function" !== typeof window.requestAnimationFrame && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
          "function" !== typeof z && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
        }
        A = false, B = null, C = -1, D = 5, E = 0;
        exports.unstable_shouldYield = function() {
          return exports.unstable_now() >= E;
        };
        k = function() {
        };
        exports.unstable_forceFrameRate = function(a) {
          0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : D = 0 < a ? Math.floor(1e3 / a) : 5;
        };
        F = new MessageChannel(), G = F.port2;
        F.port1.onmessage = function() {
          if (null !== B) {
            var a = exports.unstable_now();
            E = a + D;
            try {
              B(true, a) ? G.postMessage(null) : (A = false, B = null);
            } catch (b) {
              throw G.postMessage(null), b;
            }
          } else A = false;
        };
        f = function(a) {
          B = a;
          A || (A = true, G.postMessage(null));
        };
        g = function(a, b) {
          C = x(function() {
            a(exports.unstable_now());
          }, b);
        };
        h = function() {
          y(C);
          C = -1;
        };
      }
      var t;
      var u;
      var w;
      var x;
      var y;
      var z;
      var A;
      var B;
      var C;
      var D;
      var E;
      var F;
      var G;
      function H(a, b) {
        var c = a.length;
        a.push(b);
        a: for (; ; ) {
          var d = c - 1 >>> 1, e = a[d];
          if (void 0 !== e && 0 < I(e, b)) a[d] = b, a[c] = e, c = d;
          else break a;
        }
      }
      function J(a) {
        a = a[0];
        return void 0 === a ? null : a;
      }
      function K(a) {
        var b = a[0];
        if (void 0 !== b) {
          var c = a.pop();
          if (c !== b) {
            a[0] = c;
            a: for (var d = 0, e = a.length; d < e; ) {
              var m = 2 * (d + 1) - 1, n = a[m], v = m + 1, r = a[v];
              if (void 0 !== n && 0 > I(n, c)) void 0 !== r && 0 > I(r, n) ? (a[d] = r, a[v] = c, d = v) : (a[d] = n, a[m] = c, d = m);
              else if (void 0 !== r && 0 > I(r, c)) a[d] = r, a[v] = c, d = v;
              else break a;
            }
          }
          return b;
        }
        return null;
      }
      function I(a, b) {
        var c = a.sortIndex - b.sortIndex;
        return 0 !== c ? c : a.id - b.id;
      }
      var L = [];
      var M = [];
      var N = 1;
      var O = null;
      var P = 3;
      var Q = false;
      var R = false;
      var S = false;
      function T(a) {
        for (var b = J(M); null !== b; ) {
          if (null === b.callback) K(M);
          else if (b.startTime <= a) K(M), b.sortIndex = b.expirationTime, H(L, b);
          else break;
          b = J(M);
        }
      }
      function U(a) {
        S = false;
        T(a);
        if (!R) if (null !== J(L)) R = true, f(V);
        else {
          var b = J(M);
          null !== b && g(U, b.startTime - a);
        }
      }
      function V(a, b) {
        R = false;
        S && (S = false, h());
        Q = true;
        var c = P;
        try {
          T(b);
          for (O = J(L); null !== O && (!(O.expirationTime > b) || a && !exports.unstable_shouldYield()); ) {
            var d = O.callback;
            if ("function" === typeof d) {
              O.callback = null;
              P = O.priorityLevel;
              var e = d(O.expirationTime <= b);
              b = exports.unstable_now();
              "function" === typeof e ? O.callback = e : O === J(L) && K(L);
              T(b);
            } else K(L);
            O = J(L);
          }
          if (null !== O) var m = true;
          else {
            var n = J(M);
            null !== n && g(U, n.startTime - b);
            m = false;
          }
          return m;
        } finally {
          O = null, P = c, Q = false;
        }
      }
      var W = k;
      exports.unstable_IdlePriority = 5;
      exports.unstable_ImmediatePriority = 1;
      exports.unstable_LowPriority = 4;
      exports.unstable_NormalPriority = 3;
      exports.unstable_Profiling = null;
      exports.unstable_UserBlockingPriority = 2;
      exports.unstable_cancelCallback = function(a) {
        a.callback = null;
      };
      exports.unstable_continueExecution = function() {
        R || Q || (R = true, f(V));
      };
      exports.unstable_getCurrentPriorityLevel = function() {
        return P;
      };
      exports.unstable_getFirstCallbackNode = function() {
        return J(L);
      };
      exports.unstable_next = function(a) {
        switch (P) {
          case 1:
          case 2:
          case 3:
            var b = 3;
            break;
          default:
            b = P;
        }
        var c = P;
        P = b;
        try {
          return a();
        } finally {
          P = c;
        }
      };
      exports.unstable_pauseExecution = function() {
      };
      exports.unstable_requestPaint = W;
      exports.unstable_runWithPriority = function(a, b) {
        switch (a) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            a = 3;
        }
        var c = P;
        P = a;
        try {
          return b();
        } finally {
          P = c;
        }
      };
      exports.unstable_scheduleCallback = function(a, b, c) {
        var d = exports.unstable_now();
        "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
        switch (a) {
          case 1:
            var e = -1;
            break;
          case 2:
            e = 250;
            break;
          case 5:
            e = 1073741823;
            break;
          case 4:
            e = 1e4;
            break;
          default:
            e = 5e3;
        }
        e = c + e;
        a = { id: N++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
        c > d ? (a.sortIndex = c, H(M, a), null === J(L) && a === J(M) && (S ? h() : S = true, g(U, c - d))) : (a.sortIndex = e, H(L, a), R || Q || (R = true, f(V)));
        return a;
      };
      exports.unstable_wrapCallback = function(a) {
        var b = P;
        return function() {
          var c = P;
          P = b;
          try {
            return a.apply(this, arguments);
          } finally {
            P = c;
          }
        };
      };
    }
  });

  // node_modules/scheduler/index.js
  var require_scheduler = __commonJS({
    "node_modules/scheduler/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_scheduler_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/react-dom/cjs/react-dom.production.min.js
  var require_react_dom_production_min = __commonJS({
    "node_modules/react-dom/cjs/react-dom.production.min.js"(exports) {
      "use strict";
      var aa = require_react();
      var m = require_object_assign();
      var r = require_scheduler();
      function y(a) {
        for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
        return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      if (!aa) throw Error(y(227));
      var ba = /* @__PURE__ */ new Set();
      var ca = {};
      function da(a, b) {
        ea(a, b);
        ea(a + "Capture", b);
      }
      function ea(a, b) {
        ca[a] = b;
        for (a = 0; a < b.length; a++) ba.add(b[a]);
      }
      var fa = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement);
      var ha = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
      var ia = Object.prototype.hasOwnProperty;
      var ja = {};
      var ka = {};
      function la(a) {
        if (ia.call(ka, a)) return true;
        if (ia.call(ja, a)) return false;
        if (ha.test(a)) return ka[a] = true;
        ja[a] = true;
        return false;
      }
      function ma(a, b, c, d) {
        if (null !== c && 0 === c.type) return false;
        switch (typeof b) {
          case "function":
          case "symbol":
            return true;
          case "boolean":
            if (d) return false;
            if (null !== c) return !c.acceptsBooleans;
            a = a.toLowerCase().slice(0, 5);
            return "data-" !== a && "aria-" !== a;
          default:
            return false;
        }
      }
      function na(a, b, c, d) {
        if (null === b || "undefined" === typeof b || ma(a, b, c, d)) return true;
        if (d) return false;
        if (null !== c) switch (c.type) {
          case 3:
            return !b;
          case 4:
            return false === b;
          case 5:
            return isNaN(b);
          case 6:
            return isNaN(b) || 1 > b;
        }
        return false;
      }
      function B(a, b, c, d, e, f, g) {
        this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
        this.attributeName = d;
        this.attributeNamespace = e;
        this.mustUseProperty = c;
        this.propertyName = a;
        this.type = b;
        this.sanitizeURL = f;
        this.removeEmptyString = g;
      }
      var D = {};
      "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
        D[a] = new B(a, 0, false, a, null, false, false);
      });
      [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
        var b = a[0];
        D[b] = new B(b, 1, false, a[1], null, false, false);
      });
      ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
        D[a] = new B(a, 2, false, a.toLowerCase(), null, false, false);
      });
      ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
        D[a] = new B(a, 2, false, a, null, false, false);
      });
      "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
        D[a] = new B(a, 3, false, a.toLowerCase(), null, false, false);
      });
      ["checked", "multiple", "muted", "selected"].forEach(function(a) {
        D[a] = new B(a, 3, true, a, null, false, false);
      });
      ["capture", "download"].forEach(function(a) {
        D[a] = new B(a, 4, false, a, null, false, false);
      });
      ["cols", "rows", "size", "span"].forEach(function(a) {
        D[a] = new B(a, 6, false, a, null, false, false);
      });
      ["rowSpan", "start"].forEach(function(a) {
        D[a] = new B(a, 5, false, a.toLowerCase(), null, false, false);
      });
      var oa = /[\-:]([a-z])/g;
      function pa(a) {
        return a[1].toUpperCase();
      }
      "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
        var b = a.replace(
          oa,
          pa
        );
        D[b] = new B(b, 1, false, a, null, false, false);
      });
      "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
        var b = a.replace(oa, pa);
        D[b] = new B(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
      });
      ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
        var b = a.replace(oa, pa);
        D[b] = new B(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
      });
      ["tabIndex", "crossOrigin"].forEach(function(a) {
        D[a] = new B(a, 1, false, a.toLowerCase(), null, false, false);
      });
      D.xlinkHref = new B("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
      ["src", "href", "action", "formAction"].forEach(function(a) {
        D[a] = new B(a, 1, false, a.toLowerCase(), null, true, true);
      });
      function qa(a, b, c, d) {
        var e = D.hasOwnProperty(b) ? D[b] : null;
        var f = null !== e ? 0 === e.type : d ? false : !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1] ? false : true;
        f || (na(b, c, e, d) && (c = null), d || null === e ? la(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c))));
      }
      var ra = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      var sa = 60103;
      var ta = 60106;
      var ua = 60107;
      var wa = 60108;
      var xa = 60114;
      var ya = 60109;
      var za = 60110;
      var Aa = 60112;
      var Ba = 60113;
      var Ca = 60120;
      var Da = 60115;
      var Ea = 60116;
      var Fa = 60121;
      var Ga = 60128;
      var Ha = 60129;
      var Ia = 60130;
      var Ja = 60131;
      if ("function" === typeof Symbol && Symbol.for) {
        E = Symbol.for;
        sa = E("react.element");
        ta = E("react.portal");
        ua = E("react.fragment");
        wa = E("react.strict_mode");
        xa = E("react.profiler");
        ya = E("react.provider");
        za = E("react.context");
        Aa = E("react.forward_ref");
        Ba = E("react.suspense");
        Ca = E("react.suspense_list");
        Da = E("react.memo");
        Ea = E("react.lazy");
        Fa = E("react.block");
        E("react.scope");
        Ga = E("react.opaque.id");
        Ha = E("react.debug_trace_mode");
        Ia = E("react.offscreen");
        Ja = E("react.legacy_hidden");
      }
      var E;
      var Ka = "function" === typeof Symbol && Symbol.iterator;
      function La(a) {
        if (null === a || "object" !== typeof a) return null;
        a = Ka && a[Ka] || a["@@iterator"];
        return "function" === typeof a ? a : null;
      }
      var Ma;
      function Na(a) {
        if (void 0 === Ma) try {
          throw Error();
        } catch (c) {
          var b = c.stack.trim().match(/\n( *(at )?)/);
          Ma = b && b[1] || "";
        }
        return "\n" + Ma + a;
      }
      var Oa = false;
      function Pa(a, b) {
        if (!a || Oa) return "";
        Oa = true;
        var c = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
          if (b) if (b = function() {
            throw Error();
          }, Object.defineProperty(b.prototype, "props", { set: function() {
            throw Error();
          } }), "object" === typeof Reflect && Reflect.construct) {
            try {
              Reflect.construct(b, []);
            } catch (k) {
              var d = k;
            }
            Reflect.construct(a, [], b);
          } else {
            try {
              b.call();
            } catch (k) {
              d = k;
            }
            a.call(b.prototype);
          }
          else {
            try {
              throw Error();
            } catch (k) {
              d = k;
            }
            a();
          }
        } catch (k) {
          if (k && d && "string" === typeof k.stack) {
            for (var e = k.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h]; ) h--;
            for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f[h]) {
              if (1 !== g || 1 !== h) {
                do
                  if (g--, h--, 0 > h || e[g] !== f[h]) return "\n" + e[g].replace(" at new ", " at ");
                while (1 <= g && 0 <= h);
              }
              break;
            }
          }
        } finally {
          Oa = false, Error.prepareStackTrace = c;
        }
        return (a = a ? a.displayName || a.name : "") ? Na(a) : "";
      }
      function Qa(a) {
        switch (a.tag) {
          case 5:
            return Na(a.type);
          case 16:
            return Na("Lazy");
          case 13:
            return Na("Suspense");
          case 19:
            return Na("SuspenseList");
          case 0:
          case 2:
          case 15:
            return a = Pa(a.type, false), a;
          case 11:
            return a = Pa(a.type.render, false), a;
          case 22:
            return a = Pa(a.type._render, false), a;
          case 1:
            return a = Pa(a.type, true), a;
          default:
            return "";
        }
      }
      function Ra(a) {
        if (null == a) return null;
        if ("function" === typeof a) return a.displayName || a.name || null;
        if ("string" === typeof a) return a;
        switch (a) {
          case ua:
            return "Fragment";
          case ta:
            return "Portal";
          case xa:
            return "Profiler";
          case wa:
            return "StrictMode";
          case Ba:
            return "Suspense";
          case Ca:
            return "SuspenseList";
        }
        if ("object" === typeof a) switch (a.$$typeof) {
          case za:
            return (a.displayName || "Context") + ".Consumer";
          case ya:
            return (a._context.displayName || "Context") + ".Provider";
          case Aa:
            var b = a.render;
            b = b.displayName || b.name || "";
            return a.displayName || ("" !== b ? "ForwardRef(" + b + ")" : "ForwardRef");
          case Da:
            return Ra(a.type);
          case Fa:
            return Ra(a._render);
          case Ea:
            b = a._payload;
            a = a._init;
            try {
              return Ra(a(b));
            } catch (c) {
            }
        }
        return null;
      }
      function Sa(a) {
        switch (typeof a) {
          case "boolean":
          case "number":
          case "object":
          case "string":
          case "undefined":
            return a;
          default:
            return "";
        }
      }
      function Ta(a) {
        var b = a.type;
        return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
      }
      function Ua(a) {
        var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
        if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
          var e = c.get, f = c.set;
          Object.defineProperty(a, b, { configurable: true, get: function() {
            return e.call(this);
          }, set: function(a2) {
            d = "" + a2;
            f.call(this, a2);
          } });
          Object.defineProperty(a, b, { enumerable: c.enumerable });
          return { getValue: function() {
            return d;
          }, setValue: function(a2) {
            d = "" + a2;
          }, stopTracking: function() {
            a._valueTracker = null;
            delete a[b];
          } };
        }
      }
      function Va(a) {
        a._valueTracker || (a._valueTracker = Ua(a));
      }
      function Wa(a) {
        if (!a) return false;
        var b = a._valueTracker;
        if (!b) return true;
        var c = b.getValue();
        var d = "";
        a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
        a = d;
        return a !== c ? (b.setValue(a), true) : false;
      }
      function Xa(a) {
        a = a || ("undefined" !== typeof document ? document : void 0);
        if ("undefined" === typeof a) return null;
        try {
          return a.activeElement || a.body;
        } catch (b) {
          return a.body;
        }
      }
      function Ya(a, b) {
        var c = b.checked;
        return m({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
      }
      function Za(a, b) {
        var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
        c = Sa(null != b.value ? b.value : c);
        a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
      }
      function $a(a, b) {
        b = b.checked;
        null != b && qa(a, "checked", b, false);
      }
      function ab(a, b) {
        $a(a, b);
        var c = Sa(b.value), d = b.type;
        if (null != c) if ("number" === d) {
          if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
        } else a.value !== "" + c && (a.value = "" + c);
        else if ("submit" === d || "reset" === d) {
          a.removeAttribute("value");
          return;
        }
        b.hasOwnProperty("value") ? bb(a, b.type, c) : b.hasOwnProperty("defaultValue") && bb(a, b.type, Sa(b.defaultValue));
        null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
      }
      function cb(a, b, c) {
        if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
          var d = b.type;
          if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
          b = "" + a._wrapperState.initialValue;
          c || b === a.value || (a.value = b);
          a.defaultValue = b;
        }
        c = a.name;
        "" !== c && (a.name = "");
        a.defaultChecked = !!a._wrapperState.initialChecked;
        "" !== c && (a.name = c);
      }
      function bb(a, b, c) {
        if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
      }
      function db(a) {
        var b = "";
        aa.Children.forEach(a, function(a2) {
          null != a2 && (b += a2);
        });
        return b;
      }
      function eb(a, b) {
        a = m({ children: void 0 }, b);
        if (b = db(b.children)) a.children = b;
        return a;
      }
      function fb(a, b, c, d) {
        a = a.options;
        if (b) {
          b = {};
          for (var e = 0; e < c.length; e++) b["$" + c[e]] = true;
          for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
        } else {
          c = "" + Sa(c);
          b = null;
          for (e = 0; e < a.length; e++) {
            if (a[e].value === c) {
              a[e].selected = true;
              d && (a[e].defaultSelected = true);
              return;
            }
            null !== b || a[e].disabled || (b = a[e]);
          }
          null !== b && (b.selected = true);
        }
      }
      function gb(a, b) {
        if (null != b.dangerouslySetInnerHTML) throw Error(y(91));
        return m({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
      }
      function hb(a, b) {
        var c = b.value;
        if (null == c) {
          c = b.children;
          b = b.defaultValue;
          if (null != c) {
            if (null != b) throw Error(y(92));
            if (Array.isArray(c)) {
              if (!(1 >= c.length)) throw Error(y(93));
              c = c[0];
            }
            b = c;
          }
          null == b && (b = "");
          c = b;
        }
        a._wrapperState = { initialValue: Sa(c) };
      }
      function ib(a, b) {
        var c = Sa(b.value), d = Sa(b.defaultValue);
        null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
        null != d && (a.defaultValue = "" + d);
      }
      function jb(a) {
        var b = a.textContent;
        b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
      }
      var kb = { html: "http://www.w3.org/1999/xhtml", mathml: "http://www.w3.org/1998/Math/MathML", svg: "http://www.w3.org/2000/svg" };
      function lb(a) {
        switch (a) {
          case "svg":
            return "http://www.w3.org/2000/svg";
          case "math":
            return "http://www.w3.org/1998/Math/MathML";
          default:
            return "http://www.w3.org/1999/xhtml";
        }
      }
      function mb(a, b) {
        return null == a || "http://www.w3.org/1999/xhtml" === a ? lb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
      }
      var nb;
      var ob = (function(a) {
        return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
          MSApp.execUnsafeLocalFunction(function() {
            return a(b, c, d, e);
          });
        } : a;
      })(function(a, b) {
        if (a.namespaceURI !== kb.svg || "innerHTML" in a) a.innerHTML = b;
        else {
          nb = nb || document.createElement("div");
          nb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
          for (b = nb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
          for (; b.firstChild; ) a.appendChild(b.firstChild);
        }
      });
      function pb(a, b) {
        if (b) {
          var c = a.firstChild;
          if (c && c === a.lastChild && 3 === c.nodeType) {
            c.nodeValue = b;
            return;
          }
        }
        a.textContent = b;
      }
      var qb = {
        animationIterationCount: true,
        borderImageOutset: true,
        borderImageSlice: true,
        borderImageWidth: true,
        boxFlex: true,
        boxFlexGroup: true,
        boxOrdinalGroup: true,
        columnCount: true,
        columns: true,
        flex: true,
        flexGrow: true,
        flexPositive: true,
        flexShrink: true,
        flexNegative: true,
        flexOrder: true,
        gridArea: true,
        gridRow: true,
        gridRowEnd: true,
        gridRowSpan: true,
        gridRowStart: true,
        gridColumn: true,
        gridColumnEnd: true,
        gridColumnSpan: true,
        gridColumnStart: true,
        fontWeight: true,
        lineClamp: true,
        lineHeight: true,
        opacity: true,
        order: true,
        orphans: true,
        tabSize: true,
        widows: true,
        zIndex: true,
        zoom: true,
        fillOpacity: true,
        floodOpacity: true,
        stopOpacity: true,
        strokeDasharray: true,
        strokeDashoffset: true,
        strokeMiterlimit: true,
        strokeOpacity: true,
        strokeWidth: true
      };
      var rb = ["Webkit", "ms", "Moz", "O"];
      Object.keys(qb).forEach(function(a) {
        rb.forEach(function(b) {
          b = b + a.charAt(0).toUpperCase() + a.substring(1);
          qb[b] = qb[a];
        });
      });
      function sb(a, b, c) {
        return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || qb.hasOwnProperty(a) && qb[a] ? ("" + b).trim() : b + "px";
      }
      function tb(a, b) {
        a = a.style;
        for (var c in b) if (b.hasOwnProperty(c)) {
          var d = 0 === c.indexOf("--"), e = sb(c, b[c], d);
          "float" === c && (c = "cssFloat");
          d ? a.setProperty(c, e) : a[c] = e;
        }
      }
      var ub = m({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
      function vb(a, b) {
        if (b) {
          if (ub[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(y(137, a));
          if (null != b.dangerouslySetInnerHTML) {
            if (null != b.children) throw Error(y(60));
            if (!("object" === typeof b.dangerouslySetInnerHTML && "__html" in b.dangerouslySetInnerHTML)) throw Error(y(61));
          }
          if (null != b.style && "object" !== typeof b.style) throw Error(y(62));
        }
      }
      function wb(a, b) {
        if (-1 === a.indexOf("-")) return "string" === typeof b.is;
        switch (a) {
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return false;
          default:
            return true;
        }
      }
      function xb(a) {
        a = a.target || a.srcElement || window;
        a.correspondingUseElement && (a = a.correspondingUseElement);
        return 3 === a.nodeType ? a.parentNode : a;
      }
      var yb = null;
      var zb = null;
      var Ab = null;
      function Bb(a) {
        if (a = Cb(a)) {
          if ("function" !== typeof yb) throw Error(y(280));
          var b = a.stateNode;
          b && (b = Db(b), yb(a.stateNode, a.type, b));
        }
      }
      function Eb(a) {
        zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
      }
      function Fb() {
        if (zb) {
          var a = zb, b = Ab;
          Ab = zb = null;
          Bb(a);
          if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
        }
      }
      function Gb(a, b) {
        return a(b);
      }
      function Hb(a, b, c, d, e) {
        return a(b, c, d, e);
      }
      function Ib() {
      }
      var Jb = Gb;
      var Kb = false;
      var Lb = false;
      function Mb() {
        if (null !== zb || null !== Ab) Ib(), Fb();
      }
      function Nb(a, b, c) {
        if (Lb) return a(b, c);
        Lb = true;
        try {
          return Jb(a, b, c);
        } finally {
          Lb = false, Mb();
        }
      }
      function Ob(a, b) {
        var c = a.stateNode;
        if (null === c) return null;
        var d = Db(c);
        if (null === d) return null;
        c = d[b];
        a: switch (b) {
          case "onClick":
          case "onClickCapture":
          case "onDoubleClick":
          case "onDoubleClickCapture":
          case "onMouseDown":
          case "onMouseDownCapture":
          case "onMouseMove":
          case "onMouseMoveCapture":
          case "onMouseUp":
          case "onMouseUpCapture":
          case "onMouseEnter":
            (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
            a = !d;
            break a;
          default:
            a = false;
        }
        if (a) return null;
        if (c && "function" !== typeof c) throw Error(y(231, b, typeof c));
        return c;
      }
      var Pb = false;
      if (fa) try {
        Qb = {};
        Object.defineProperty(Qb, "passive", { get: function() {
          Pb = true;
        } });
        window.addEventListener("test", Qb, Qb);
        window.removeEventListener("test", Qb, Qb);
      } catch (a) {
        Pb = false;
      }
      var Qb;
      function Rb(a, b, c, d, e, f, g, h, k) {
        var l = Array.prototype.slice.call(arguments, 3);
        try {
          b.apply(c, l);
        } catch (n) {
          this.onError(n);
        }
      }
      var Sb = false;
      var Tb = null;
      var Ub = false;
      var Vb = null;
      var Wb = { onError: function(a) {
        Sb = true;
        Tb = a;
      } };
      function Xb(a, b, c, d, e, f, g, h, k) {
        Sb = false;
        Tb = null;
        Rb.apply(Wb, arguments);
      }
      function Yb(a, b, c, d, e, f, g, h, k) {
        Xb.apply(this, arguments);
        if (Sb) {
          if (Sb) {
            var l = Tb;
            Sb = false;
            Tb = null;
          } else throw Error(y(198));
          Ub || (Ub = true, Vb = l);
        }
      }
      function Zb(a) {
        var b = a, c = a;
        if (a.alternate) for (; b.return; ) b = b.return;
        else {
          a = b;
          do
            b = a, 0 !== (b.flags & 1026) && (c = b.return), a = b.return;
          while (a);
        }
        return 3 === b.tag ? c : null;
      }
      function $b(a) {
        if (13 === a.tag) {
          var b = a.memoizedState;
          null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
          if (null !== b) return b.dehydrated;
        }
        return null;
      }
      function ac(a) {
        if (Zb(a) !== a) throw Error(y(188));
      }
      function bc(a) {
        var b = a.alternate;
        if (!b) {
          b = Zb(a);
          if (null === b) throw Error(y(188));
          return b !== a ? null : a;
        }
        for (var c = a, d = b; ; ) {
          var e = c.return;
          if (null === e) break;
          var f = e.alternate;
          if (null === f) {
            d = e.return;
            if (null !== d) {
              c = d;
              continue;
            }
            break;
          }
          if (e.child === f.child) {
            for (f = e.child; f; ) {
              if (f === c) return ac(e), a;
              if (f === d) return ac(e), b;
              f = f.sibling;
            }
            throw Error(y(188));
          }
          if (c.return !== d.return) c = e, d = f;
          else {
            for (var g = false, h = e.child; h; ) {
              if (h === c) {
                g = true;
                c = e;
                d = f;
                break;
              }
              if (h === d) {
                g = true;
                d = e;
                c = f;
                break;
              }
              h = h.sibling;
            }
            if (!g) {
              for (h = f.child; h; ) {
                if (h === c) {
                  g = true;
                  c = f;
                  d = e;
                  break;
                }
                if (h === d) {
                  g = true;
                  d = f;
                  c = e;
                  break;
                }
                h = h.sibling;
              }
              if (!g) throw Error(y(189));
            }
          }
          if (c.alternate !== d) throw Error(y(190));
        }
        if (3 !== c.tag) throw Error(y(188));
        return c.stateNode.current === c ? a : b;
      }
      function cc(a) {
        a = bc(a);
        if (!a) return null;
        for (var b = a; ; ) {
          if (5 === b.tag || 6 === b.tag) return b;
          if (b.child) b.child.return = b, b = b.child;
          else {
            if (b === a) break;
            for (; !b.sibling; ) {
              if (!b.return || b.return === a) return null;
              b = b.return;
            }
            b.sibling.return = b.return;
            b = b.sibling;
          }
        }
        return null;
      }
      function dc(a, b) {
        for (var c = a.alternate; null !== b; ) {
          if (b === a || b === c) return true;
          b = b.return;
        }
        return false;
      }
      var ec;
      var fc;
      var gc;
      var hc;
      var ic = false;
      var jc = [];
      var kc = null;
      var lc = null;
      var mc = null;
      var nc = /* @__PURE__ */ new Map();
      var oc = /* @__PURE__ */ new Map();
      var pc = [];
      var qc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
      function rc(a, b, c, d, e) {
        return { blockedOn: a, domEventName: b, eventSystemFlags: c | 16, nativeEvent: e, targetContainers: [d] };
      }
      function sc(a, b) {
        switch (a) {
          case "focusin":
          case "focusout":
            kc = null;
            break;
          case "dragenter":
          case "dragleave":
            lc = null;
            break;
          case "mouseover":
          case "mouseout":
            mc = null;
            break;
          case "pointerover":
          case "pointerout":
            nc.delete(b.pointerId);
            break;
          case "gotpointercapture":
          case "lostpointercapture":
            oc.delete(b.pointerId);
        }
      }
      function tc(a, b, c, d, e, f) {
        if (null === a || a.nativeEvent !== f) return a = rc(b, c, d, e, f), null !== b && (b = Cb(b), null !== b && fc(b)), a;
        a.eventSystemFlags |= d;
        b = a.targetContainers;
        null !== e && -1 === b.indexOf(e) && b.push(e);
        return a;
      }
      function uc(a, b, c, d, e) {
        switch (b) {
          case "focusin":
            return kc = tc(kc, a, b, c, d, e), true;
          case "dragenter":
            return lc = tc(lc, a, b, c, d, e), true;
          case "mouseover":
            return mc = tc(mc, a, b, c, d, e), true;
          case "pointerover":
            var f = e.pointerId;
            nc.set(f, tc(nc.get(f) || null, a, b, c, d, e));
            return true;
          case "gotpointercapture":
            return f = e.pointerId, oc.set(f, tc(oc.get(f) || null, a, b, c, d, e)), true;
        }
        return false;
      }
      function vc(a) {
        var b = wc(a.target);
        if (null !== b) {
          var c = Zb(b);
          if (null !== c) {
            if (b = c.tag, 13 === b) {
              if (b = $b(c), null !== b) {
                a.blockedOn = b;
                hc(a.lanePriority, function() {
                  r.unstable_runWithPriority(a.priority, function() {
                    gc(c);
                  });
                });
                return;
              }
            } else if (3 === b && c.stateNode.hydrate) {
              a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
              return;
            }
          }
        }
        a.blockedOn = null;
      }
      function xc(a) {
        if (null !== a.blockedOn) return false;
        for (var b = a.targetContainers; 0 < b.length; ) {
          var c = yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
          if (null !== c) return b = Cb(c), null !== b && fc(b), a.blockedOn = c, false;
          b.shift();
        }
        return true;
      }
      function zc(a, b, c) {
        xc(a) && c.delete(b);
      }
      function Ac() {
        for (ic = false; 0 < jc.length; ) {
          var a = jc[0];
          if (null !== a.blockedOn) {
            a = Cb(a.blockedOn);
            null !== a && ec(a);
            break;
          }
          for (var b = a.targetContainers; 0 < b.length; ) {
            var c = yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
            if (null !== c) {
              a.blockedOn = c;
              break;
            }
            b.shift();
          }
          null === a.blockedOn && jc.shift();
        }
        null !== kc && xc(kc) && (kc = null);
        null !== lc && xc(lc) && (lc = null);
        null !== mc && xc(mc) && (mc = null);
        nc.forEach(zc);
        oc.forEach(zc);
      }
      function Bc(a, b) {
        a.blockedOn === b && (a.blockedOn = null, ic || (ic = true, r.unstable_scheduleCallback(r.unstable_NormalPriority, Ac)));
      }
      function Cc(a) {
        function b(b2) {
          return Bc(b2, a);
        }
        if (0 < jc.length) {
          Bc(jc[0], a);
          for (var c = 1; c < jc.length; c++) {
            var d = jc[c];
            d.blockedOn === a && (d.blockedOn = null);
          }
        }
        null !== kc && Bc(kc, a);
        null !== lc && Bc(lc, a);
        null !== mc && Bc(mc, a);
        nc.forEach(b);
        oc.forEach(b);
        for (c = 0; c < pc.length; c++) d = pc[c], d.blockedOn === a && (d.blockedOn = null);
        for (; 0 < pc.length && (c = pc[0], null === c.blockedOn); ) vc(c), null === c.blockedOn && pc.shift();
      }
      function Dc(a, b) {
        var c = {};
        c[a.toLowerCase()] = b.toLowerCase();
        c["Webkit" + a] = "webkit" + b;
        c["Moz" + a] = "moz" + b;
        return c;
      }
      var Ec = { animationend: Dc("Animation", "AnimationEnd"), animationiteration: Dc("Animation", "AnimationIteration"), animationstart: Dc("Animation", "AnimationStart"), transitionend: Dc("Transition", "TransitionEnd") };
      var Fc = {};
      var Gc = {};
      fa && (Gc = document.createElement("div").style, "AnimationEvent" in window || (delete Ec.animationend.animation, delete Ec.animationiteration.animation, delete Ec.animationstart.animation), "TransitionEvent" in window || delete Ec.transitionend.transition);
      function Hc(a) {
        if (Fc[a]) return Fc[a];
        if (!Ec[a]) return a;
        var b = Ec[a], c;
        for (c in b) if (b.hasOwnProperty(c) && c in Gc) return Fc[a] = b[c];
        return a;
      }
      var Ic = Hc("animationend");
      var Jc = Hc("animationiteration");
      var Kc = Hc("animationstart");
      var Lc = Hc("transitionend");
      var Mc = /* @__PURE__ */ new Map();
      var Nc = /* @__PURE__ */ new Map();
      var Oc = [
        "abort",
        "abort",
        Ic,
        "animationEnd",
        Jc,
        "animationIteration",
        Kc,
        "animationStart",
        "canplay",
        "canPlay",
        "canplaythrough",
        "canPlayThrough",
        "durationchange",
        "durationChange",
        "emptied",
        "emptied",
        "encrypted",
        "encrypted",
        "ended",
        "ended",
        "error",
        "error",
        "gotpointercapture",
        "gotPointerCapture",
        "load",
        "load",
        "loadeddata",
        "loadedData",
        "loadedmetadata",
        "loadedMetadata",
        "loadstart",
        "loadStart",
        "lostpointercapture",
        "lostPointerCapture",
        "playing",
        "playing",
        "progress",
        "progress",
        "seeking",
        "seeking",
        "stalled",
        "stalled",
        "suspend",
        "suspend",
        "timeupdate",
        "timeUpdate",
        Lc,
        "transitionEnd",
        "waiting",
        "waiting"
      ];
      function Pc(a, b) {
        for (var c = 0; c < a.length; c += 2) {
          var d = a[c], e = a[c + 1];
          e = "on" + (e[0].toUpperCase() + e.slice(1));
          Nc.set(d, b);
          Mc.set(d, e);
          da(e, [d]);
        }
      }
      var Qc = r.unstable_now;
      Qc();
      var F = 8;
      function Rc(a) {
        if (0 !== (1 & a)) return F = 15, 1;
        if (0 !== (2 & a)) return F = 14, 2;
        if (0 !== (4 & a)) return F = 13, 4;
        var b = 24 & a;
        if (0 !== b) return F = 12, b;
        if (0 !== (a & 32)) return F = 11, 32;
        b = 192 & a;
        if (0 !== b) return F = 10, b;
        if (0 !== (a & 256)) return F = 9, 256;
        b = 3584 & a;
        if (0 !== b) return F = 8, b;
        if (0 !== (a & 4096)) return F = 7, 4096;
        b = 4186112 & a;
        if (0 !== b) return F = 6, b;
        b = 62914560 & a;
        if (0 !== b) return F = 5, b;
        if (a & 67108864) return F = 4, 67108864;
        if (0 !== (a & 134217728)) return F = 3, 134217728;
        b = 805306368 & a;
        if (0 !== b) return F = 2, b;
        if (0 !== (1073741824 & a)) return F = 1, 1073741824;
        F = 8;
        return a;
      }
      function Sc(a) {
        switch (a) {
          case 99:
            return 15;
          case 98:
            return 10;
          case 97:
          case 96:
            return 8;
          case 95:
            return 2;
          default:
            return 0;
        }
      }
      function Tc(a) {
        switch (a) {
          case 15:
          case 14:
            return 99;
          case 13:
          case 12:
          case 11:
          case 10:
            return 98;
          case 9:
          case 8:
          case 7:
          case 6:
          case 4:
          case 5:
            return 97;
          case 3:
          case 2:
          case 1:
            return 95;
          case 0:
            return 90;
          default:
            throw Error(y(358, a));
        }
      }
      function Uc(a, b) {
        var c = a.pendingLanes;
        if (0 === c) return F = 0;
        var d = 0, e = 0, f = a.expiredLanes, g = a.suspendedLanes, h = a.pingedLanes;
        if (0 !== f) d = f, e = F = 15;
        else if (f = c & 134217727, 0 !== f) {
          var k = f & ~g;
          0 !== k ? (d = Rc(k), e = F) : (h &= f, 0 !== h && (d = Rc(h), e = F));
        } else f = c & ~g, 0 !== f ? (d = Rc(f), e = F) : 0 !== h && (d = Rc(h), e = F);
        if (0 === d) return 0;
        d = 31 - Vc(d);
        d = c & ((0 > d ? 0 : 1 << d) << 1) - 1;
        if (0 !== b && b !== d && 0 === (b & g)) {
          Rc(b);
          if (e <= F) return b;
          F = e;
        }
        b = a.entangledLanes;
        if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - Vc(b), e = 1 << c, d |= a[c], b &= ~e;
        return d;
      }
      function Wc(a) {
        a = a.pendingLanes & -1073741825;
        return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
      }
      function Xc(a, b) {
        switch (a) {
          case 15:
            return 1;
          case 14:
            return 2;
          case 12:
            return a = Yc(24 & ~b), 0 === a ? Xc(10, b) : a;
          case 10:
            return a = Yc(192 & ~b), 0 === a ? Xc(8, b) : a;
          case 8:
            return a = Yc(3584 & ~b), 0 === a && (a = Yc(4186112 & ~b), 0 === a && (a = 512)), a;
          case 2:
            return b = Yc(805306368 & ~b), 0 === b && (b = 268435456), b;
        }
        throw Error(y(358, a));
      }
      function Yc(a) {
        return a & -a;
      }
      function Zc(a) {
        for (var b = [], c = 0; 31 > c; c++) b.push(a);
        return b;
      }
      function $c(a, b, c) {
        a.pendingLanes |= b;
        var d = b - 1;
        a.suspendedLanes &= d;
        a.pingedLanes &= d;
        a = a.eventTimes;
        b = 31 - Vc(b);
        a[b] = c;
      }
      var Vc = Math.clz32 ? Math.clz32 : ad;
      var bd = Math.log;
      var cd = Math.LN2;
      function ad(a) {
        return 0 === a ? 32 : 31 - (bd(a) / cd | 0) | 0;
      }
      var dd = r.unstable_UserBlockingPriority;
      var ed = r.unstable_runWithPriority;
      var fd = true;
      function gd(a, b, c, d) {
        Kb || Ib();
        var e = hd, f = Kb;
        Kb = true;
        try {
          Hb(e, a, b, c, d);
        } finally {
          (Kb = f) || Mb();
        }
      }
      function id(a, b, c, d) {
        ed(dd, hd.bind(null, a, b, c, d));
      }
      function hd(a, b, c, d) {
        if (fd) {
          var e;
          if ((e = 0 === (b & 4)) && 0 < jc.length && -1 < qc.indexOf(a)) a = rc(null, a, b, c, d), jc.push(a);
          else {
            var f = yc(a, b, c, d);
            if (null === f) e && sc(a, d);
            else {
              if (e) {
                if (-1 < qc.indexOf(a)) {
                  a = rc(f, a, b, c, d);
                  jc.push(a);
                  return;
                }
                if (uc(f, a, b, c, d)) return;
                sc(a, d);
              }
              jd(a, b, d, null, c);
            }
          }
        }
      }
      function yc(a, b, c, d) {
        var e = xb(d);
        e = wc(e);
        if (null !== e) {
          var f = Zb(e);
          if (null === f) e = null;
          else {
            var g = f.tag;
            if (13 === g) {
              e = $b(f);
              if (null !== e) return e;
              e = null;
            } else if (3 === g) {
              if (f.stateNode.hydrate) return 3 === f.tag ? f.stateNode.containerInfo : null;
              e = null;
            } else f !== e && (e = null);
          }
        }
        jd(a, b, d, e, c);
        return null;
      }
      var kd = null;
      var ld = null;
      var md = null;
      function nd() {
        if (md) return md;
        var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
        for (a = 0; a < c && b[a] === e[a]; a++) ;
        var g = c - a;
        for (d = 1; d <= g && b[c - d] === e[f - d]; d++) ;
        return md = e.slice(a, 1 < d ? 1 - d : void 0);
      }
      function od(a) {
        var b = a.keyCode;
        "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
        10 === a && (a = 13);
        return 32 <= a || 13 === a ? a : 0;
      }
      function pd() {
        return true;
      }
      function qd() {
        return false;
      }
      function rd(a) {
        function b(b2, d, e, f, g) {
          this._reactName = b2;
          this._targetInst = e;
          this.type = d;
          this.nativeEvent = f;
          this.target = g;
          this.currentTarget = null;
          for (var c in a) a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f) : f[c]);
          this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : false === f.returnValue) ? pd : qd;
          this.isPropagationStopped = qd;
          return this;
        }
        m(b.prototype, { preventDefault: function() {
          this.defaultPrevented = true;
          var a2 = this.nativeEvent;
          a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
        }, stopPropagation: function() {
          var a2 = this.nativeEvent;
          a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
        }, persist: function() {
        }, isPersistent: pd });
        return b;
      }
      var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
        return a.timeStamp || Date.now();
      }, defaultPrevented: 0, isTrusted: 0 };
      var td = rd(sd);
      var ud = m({}, sd, { view: 0, detail: 0 });
      var vd = rd(ud);
      var wd;
      var xd;
      var yd;
      var Ad = m({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
        return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
      }, movementX: function(a) {
        if ("movementX" in a) return a.movementX;
        a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
        return wd;
      }, movementY: function(a) {
        return "movementY" in a ? a.movementY : xd;
      } });
      var Bd = rd(Ad);
      var Cd = m({}, Ad, { dataTransfer: 0 });
      var Dd = rd(Cd);
      var Ed = m({}, ud, { relatedTarget: 0 });
      var Fd = rd(Ed);
      var Gd = m({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Hd = rd(Gd);
      var Id = m({}, sd, { clipboardData: function(a) {
        return "clipboardData" in a ? a.clipboardData : window.clipboardData;
      } });
      var Jd = rd(Id);
      var Kd = m({}, sd, { data: 0 });
      var Ld = rd(Kd);
      var Md = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
      };
      var Nd = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
      };
      var Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
      function Pd(a) {
        var b = this.nativeEvent;
        return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
      }
      function zd() {
        return Pd;
      }
      var Qd = m({}, ud, { key: function(a) {
        if (a.key) {
          var b = Md[a.key] || a.key;
          if ("Unidentified" !== b) return b;
        }
        return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
      }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
        return "keypress" === a.type ? od(a) : 0;
      }, keyCode: function(a) {
        return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
      }, which: function(a) {
        return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
      } });
      var Rd = rd(Qd);
      var Sd = m({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 });
      var Td = rd(Sd);
      var Ud = m({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd });
      var Vd = rd(Ud);
      var Wd = m({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Xd = rd(Wd);
      var Yd = m({}, Ad, {
        deltaX: function(a) {
          return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
        },
        deltaY: function(a) {
          return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
        },
        deltaZ: 0,
        deltaMode: 0
      });
      var Zd = rd(Yd);
      var $d = [9, 13, 27, 32];
      var ae = fa && "CompositionEvent" in window;
      var be = null;
      fa && "documentMode" in document && (be = document.documentMode);
      var ce = fa && "TextEvent" in window && !be;
      var de = fa && (!ae || be && 8 < be && 11 >= be);
      var ee = String.fromCharCode(32);
      var fe = false;
      function ge(a, b) {
        switch (a) {
          case "keyup":
            return -1 !== $d.indexOf(b.keyCode);
          case "keydown":
            return 229 !== b.keyCode;
          case "keypress":
          case "mousedown":
          case "focusout":
            return true;
          default:
            return false;
        }
      }
      function he(a) {
        a = a.detail;
        return "object" === typeof a && "data" in a ? a.data : null;
      }
      var ie = false;
      function je(a, b) {
        switch (a) {
          case "compositionend":
            return he(b);
          case "keypress":
            if (32 !== b.which) return null;
            fe = true;
            return ee;
          case "textInput":
            return a = b.data, a === ee && fe ? null : a;
          default:
            return null;
        }
      }
      function ke(a, b) {
        if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
        switch (a) {
          case "paste":
            return null;
          case "keypress":
            if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
              if (b.char && 1 < b.char.length) return b.char;
              if (b.which) return String.fromCharCode(b.which);
            }
            return null;
          case "compositionend":
            return de && "ko" !== b.locale ? null : b.data;
          default:
            return null;
        }
      }
      var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
      function me(a) {
        var b = a && a.nodeName && a.nodeName.toLowerCase();
        return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
      }
      function ne(a, b, c, d) {
        Eb(d);
        b = oe(b, "onChange");
        0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
      }
      var pe = null;
      var qe = null;
      function re(a) {
        se(a, 0);
      }
      function te(a) {
        var b = ue(a);
        if (Wa(b)) return a;
      }
      function ve(a, b) {
        if ("change" === a) return b;
      }
      var we = false;
      if (fa) {
        if (fa) {
          ye = "oninput" in document;
          if (!ye) {
            ze = document.createElement("div");
            ze.setAttribute("oninput", "return;");
            ye = "function" === typeof ze.oninput;
          }
          xe = ye;
        } else xe = false;
        we = xe && (!document.documentMode || 9 < document.documentMode);
      }
      var xe;
      var ye;
      var ze;
      function Ae() {
        pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
      }
      function Be(a) {
        if ("value" === a.propertyName && te(qe)) {
          var b = [];
          ne(b, qe, a, xb(a));
          a = re;
          if (Kb) a(b);
          else {
            Kb = true;
            try {
              Gb(a, b);
            } finally {
              Kb = false, Mb();
            }
          }
        }
      }
      function Ce(a, b, c) {
        "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
      }
      function De(a) {
        if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
      }
      function Ee(a, b) {
        if ("click" === a) return te(b);
      }
      function Fe(a, b) {
        if ("input" === a || "change" === a) return te(b);
      }
      function Ge(a, b) {
        return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
      }
      var He = "function" === typeof Object.is ? Object.is : Ge;
      var Ie = Object.prototype.hasOwnProperty;
      function Je(a, b) {
        if (He(a, b)) return true;
        if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
        var c = Object.keys(a), d = Object.keys(b);
        if (c.length !== d.length) return false;
        for (d = 0; d < c.length; d++) if (!Ie.call(b, c[d]) || !He(a[c[d]], b[c[d]])) return false;
        return true;
      }
      function Ke(a) {
        for (; a && a.firstChild; ) a = a.firstChild;
        return a;
      }
      function Le(a, b) {
        var c = Ke(a);
        a = 0;
        for (var d; c; ) {
          if (3 === c.nodeType) {
            d = a + c.textContent.length;
            if (a <= b && d >= b) return { node: c, offset: b - a };
            a = d;
          }
          a: {
            for (; c; ) {
              if (c.nextSibling) {
                c = c.nextSibling;
                break a;
              }
              c = c.parentNode;
            }
            c = void 0;
          }
          c = Ke(c);
        }
      }
      function Me(a, b) {
        return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Me(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
      }
      function Ne() {
        for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
          try {
            var c = "string" === typeof b.contentWindow.location.href;
          } catch (d) {
            c = false;
          }
          if (c) a = b.contentWindow;
          else break;
          b = Xa(a.document);
        }
        return b;
      }
      function Oe(a) {
        var b = a && a.nodeName && a.nodeName.toLowerCase();
        return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
      }
      var Pe = fa && "documentMode" in document && 11 >= document.documentMode;
      var Qe = null;
      var Re = null;
      var Se = null;
      var Te = false;
      function Ue(a, b, c) {
        var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
        Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Oe(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Je(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
      }
      Pc(
        "cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "),
        0
      );
      Pc("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "), 1);
      Pc(Oc, 2);
      for (Ve = "change selectionchange textInput compositionstart compositionend compositionupdate".split(" "), We = 0; We < Ve.length; We++) Nc.set(Ve[We], 0);
      var Ve;
      var We;
      ea("onMouseEnter", ["mouseout", "mouseover"]);
      ea("onMouseLeave", ["mouseout", "mouseover"]);
      ea("onPointerEnter", ["pointerout", "pointerover"]);
      ea("onPointerLeave", ["pointerout", "pointerover"]);
      da("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
      da("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
      da("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
      da("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
      da("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
      da("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
      var Xe = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
      var Ye = new Set("cancel close invalid load scroll toggle".split(" ").concat(Xe));
      function Ze(a, b, c) {
        var d = a.type || "unknown-event";
        a.currentTarget = c;
        Yb(d, b, void 0, a);
        a.currentTarget = null;
      }
      function se(a, b) {
        b = 0 !== (b & 4);
        for (var c = 0; c < a.length; c++) {
          var d = a[c], e = d.event;
          d = d.listeners;
          a: {
            var f = void 0;
            if (b) for (var g = d.length - 1; 0 <= g; g--) {
              var h = d[g], k = h.instance, l = h.currentTarget;
              h = h.listener;
              if (k !== f && e.isPropagationStopped()) break a;
              Ze(e, h, l);
              f = k;
            }
            else for (g = 0; g < d.length; g++) {
              h = d[g];
              k = h.instance;
              l = h.currentTarget;
              h = h.listener;
              if (k !== f && e.isPropagationStopped()) break a;
              Ze(e, h, l);
              f = k;
            }
          }
        }
        if (Ub) throw a = Vb, Ub = false, Vb = null, a;
      }
      function G(a, b) {
        var c = $e(b), d = a + "__bubble";
        c.has(d) || (af(b, a, 2, false), c.add(d));
      }
      var bf = "_reactListening" + Math.random().toString(36).slice(2);
      function cf(a) {
        a[bf] || (a[bf] = true, ba.forEach(function(b) {
          Ye.has(b) || df(b, false, a, null);
          df(b, true, a, null);
        }));
      }
      function df(a, b, c, d) {
        var e = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 0, f = c;
        "selectionchange" === a && 9 !== c.nodeType && (f = c.ownerDocument);
        if (null !== d && !b && Ye.has(a)) {
          if ("scroll" !== a) return;
          e |= 2;
          f = d;
        }
        var g = $e(f), h = a + "__" + (b ? "capture" : "bubble");
        g.has(h) || (b && (e |= 4), af(f, a, e, b), g.add(h));
      }
      function af(a, b, c, d) {
        var e = Nc.get(b);
        switch (void 0 === e ? 2 : e) {
          case 0:
            e = gd;
            break;
          case 1:
            e = id;
            break;
          default:
            e = hd;
        }
        c = e.bind(null, b, c, a);
        e = void 0;
        !Pb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
        d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
      }
      function jd(a, b, c, d, e) {
        var f = d;
        if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
          if (null === d) return;
          var g = d.tag;
          if (3 === g || 4 === g) {
            var h = d.stateNode.containerInfo;
            if (h === e || 8 === h.nodeType && h.parentNode === e) break;
            if (4 === g) for (g = d.return; null !== g; ) {
              var k = g.tag;
              if (3 === k || 4 === k) {
                if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e) return;
              }
              g = g.return;
            }
            for (; null !== h; ) {
              g = wc(h);
              if (null === g) return;
              k = g.tag;
              if (5 === k || 6 === k) {
                d = f = g;
                continue a;
              }
              h = h.parentNode;
            }
          }
          d = d.return;
        }
        Nb(function() {
          var d2 = f, e2 = xb(c), g2 = [];
          a: {
            var h2 = Mc.get(a);
            if (void 0 !== h2) {
              var k2 = td, x = a;
              switch (a) {
                case "keypress":
                  if (0 === od(c)) break a;
                case "keydown":
                case "keyup":
                  k2 = Rd;
                  break;
                case "focusin":
                  x = "focus";
                  k2 = Fd;
                  break;
                case "focusout":
                  x = "blur";
                  k2 = Fd;
                  break;
                case "beforeblur":
                case "afterblur":
                  k2 = Fd;
                  break;
                case "click":
                  if (2 === c.button) break a;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                  k2 = Bd;
                  break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                  k2 = Dd;
                  break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                  k2 = Vd;
                  break;
                case Ic:
                case Jc:
                case Kc:
                  k2 = Hd;
                  break;
                case Lc:
                  k2 = Xd;
                  break;
                case "scroll":
                  k2 = vd;
                  break;
                case "wheel":
                  k2 = Zd;
                  break;
                case "copy":
                case "cut":
                case "paste":
                  k2 = Jd;
                  break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                  k2 = Td;
              }
              var w = 0 !== (b & 4), z = !w && "scroll" === a, u = w ? null !== h2 ? h2 + "Capture" : null : h2;
              w = [];
              for (var t = d2, q; null !== t; ) {
                q = t;
                var v = q.stateNode;
                5 === q.tag && null !== v && (q = v, null !== u && (v = Ob(t, u), null != v && w.push(ef(t, v, q))));
                if (z) break;
                t = t.return;
              }
              0 < w.length && (h2 = new k2(h2, x, null, c, e2), g2.push({ event: h2, listeners: w }));
            }
          }
          if (0 === (b & 7)) {
            a: {
              h2 = "mouseover" === a || "pointerover" === a;
              k2 = "mouseout" === a || "pointerout" === a;
              if (h2 && 0 === (b & 16) && (x = c.relatedTarget || c.fromElement) && (wc(x) || x[ff])) break a;
              if (k2 || h2) {
                h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
                if (k2) {
                  if (x = c.relatedTarget || c.toElement, k2 = d2, x = x ? wc(x) : null, null !== x && (z = Zb(x), x !== z || 5 !== x.tag && 6 !== x.tag)) x = null;
                } else k2 = null, x = d2;
                if (k2 !== x) {
                  w = Bd;
                  v = "onMouseLeave";
                  u = "onMouseEnter";
                  t = "mouse";
                  if ("pointerout" === a || "pointerover" === a) w = Td, v = "onPointerLeave", u = "onPointerEnter", t = "pointer";
                  z = null == k2 ? h2 : ue(k2);
                  q = null == x ? h2 : ue(x);
                  h2 = new w(v, t + "leave", k2, c, e2);
                  h2.target = z;
                  h2.relatedTarget = q;
                  v = null;
                  wc(e2) === d2 && (w = new w(u, t + "enter", x, c, e2), w.target = q, w.relatedTarget = z, v = w);
                  z = v;
                  if (k2 && x) b: {
                    w = k2;
                    u = x;
                    t = 0;
                    for (q = w; q; q = gf(q)) t++;
                    q = 0;
                    for (v = u; v; v = gf(v)) q++;
                    for (; 0 < t - q; ) w = gf(w), t--;
                    for (; 0 < q - t; ) u = gf(u), q--;
                    for (; t--; ) {
                      if (w === u || null !== u && w === u.alternate) break b;
                      w = gf(w);
                      u = gf(u);
                    }
                    w = null;
                  }
                  else w = null;
                  null !== k2 && hf(g2, h2, k2, w, false);
                  null !== x && null !== z && hf(g2, z, x, w, true);
                }
              }
            }
            a: {
              h2 = d2 ? ue(d2) : window;
              k2 = h2.nodeName && h2.nodeName.toLowerCase();
              if ("select" === k2 || "input" === k2 && "file" === h2.type) var J = ve;
              else if (me(h2)) if (we) J = Fe;
              else {
                J = De;
                var K = Ce;
              }
              else (k2 = h2.nodeName) && "input" === k2.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (J = Ee);
              if (J && (J = J(a, d2))) {
                ne(g2, J, c, e2);
                break a;
              }
              K && K(a, h2, d2);
              "focusout" === a && (K = h2._wrapperState) && K.controlled && "number" === h2.type && bb(h2, "number", h2.value);
            }
            K = d2 ? ue(d2) : window;
            switch (a) {
              case "focusin":
                if (me(K) || "true" === K.contentEditable) Qe = K, Re = d2, Se = null;
                break;
              case "focusout":
                Se = Re = Qe = null;
                break;
              case "mousedown":
                Te = true;
                break;
              case "contextmenu":
              case "mouseup":
              case "dragend":
                Te = false;
                Ue(g2, c, e2);
                break;
              case "selectionchange":
                if (Pe) break;
              case "keydown":
              case "keyup":
                Ue(g2, c, e2);
            }
            var Q;
            if (ae) b: {
              switch (a) {
                case "compositionstart":
                  var L = "onCompositionStart";
                  break b;
                case "compositionend":
                  L = "onCompositionEnd";
                  break b;
                case "compositionupdate":
                  L = "onCompositionUpdate";
                  break b;
              }
              L = void 0;
            }
            else ie ? ge(a, c) && (L = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (L = "onCompositionStart");
            L && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== L ? "onCompositionEnd" === L && ie && (Q = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), K = oe(d2, L), 0 < K.length && (L = new Ld(L, a, null, c, e2), g2.push({ event: L, listeners: K }), Q ? L.data = Q : (Q = he(c), null !== Q && (L.data = Q))));
            if (Q = ce ? je(a, c) : ke(a, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld(
              "onBeforeInput",
              "beforeinput",
              null,
              c,
              e2
            ), g2.push({ event: e2, listeners: d2 }), e2.data = Q);
          }
          se(g2, b);
        });
      }
      function ef(a, b, c) {
        return { instance: a, listener: b, currentTarget: c };
      }
      function oe(a, b) {
        for (var c = b + "Capture", d = []; null !== a; ) {
          var e = a, f = e.stateNode;
          5 === e.tag && null !== f && (e = f, f = Ob(a, c), null != f && d.unshift(ef(a, f, e)), f = Ob(a, b), null != f && d.push(ef(a, f, e)));
          a = a.return;
        }
        return d;
      }
      function gf(a) {
        if (null === a) return null;
        do
          a = a.return;
        while (a && 5 !== a.tag);
        return a ? a : null;
      }
      function hf(a, b, c, d, e) {
        for (var f = b._reactName, g = []; null !== c && c !== d; ) {
          var h = c, k = h.alternate, l = h.stateNode;
          if (null !== k && k === d) break;
          5 === h.tag && null !== l && (h = l, e ? (k = Ob(c, f), null != k && g.unshift(ef(c, k, h))) : e || (k = Ob(c, f), null != k && g.push(ef(c, k, h))));
          c = c.return;
        }
        0 !== g.length && a.push({ event: b, listeners: g });
      }
      function jf() {
      }
      var kf = null;
      var lf = null;
      function mf(a, b) {
        switch (a) {
          case "button":
          case "input":
          case "select":
          case "textarea":
            return !!b.autoFocus;
        }
        return false;
      }
      function nf(a, b) {
        return "textarea" === a || "option" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
      }
      var of = "function" === typeof setTimeout ? setTimeout : void 0;
      var pf = "function" === typeof clearTimeout ? clearTimeout : void 0;
      function qf(a) {
        1 === a.nodeType ? a.textContent = "" : 9 === a.nodeType && (a = a.body, null != a && (a.textContent = ""));
      }
      function rf(a) {
        for (; null != a; a = a.nextSibling) {
          var b = a.nodeType;
          if (1 === b || 3 === b) break;
        }
        return a;
      }
      function sf(a) {
        a = a.previousSibling;
        for (var b = 0; a; ) {
          if (8 === a.nodeType) {
            var c = a.data;
            if ("$" === c || "$!" === c || "$?" === c) {
              if (0 === b) return a;
              b--;
            } else "/$" === c && b++;
          }
          a = a.previousSibling;
        }
        return null;
      }
      var tf = 0;
      function uf(a) {
        return { $$typeof: Ga, toString: a, valueOf: a };
      }
      var vf = Math.random().toString(36).slice(2);
      var wf = "__reactFiber$" + vf;
      var xf = "__reactProps$" + vf;
      var ff = "__reactContainer$" + vf;
      var yf = "__reactEvents$" + vf;
      function wc(a) {
        var b = a[wf];
        if (b) return b;
        for (var c = a.parentNode; c; ) {
          if (b = c[ff] || c[wf]) {
            c = b.alternate;
            if (null !== b.child || null !== c && null !== c.child) for (a = sf(a); null !== a; ) {
              if (c = a[wf]) return c;
              a = sf(a);
            }
            return b;
          }
          a = c;
          c = a.parentNode;
        }
        return null;
      }
      function Cb(a) {
        a = a[wf] || a[ff];
        return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
      }
      function ue(a) {
        if (5 === a.tag || 6 === a.tag) return a.stateNode;
        throw Error(y(33));
      }
      function Db(a) {
        return a[xf] || null;
      }
      function $e(a) {
        var b = a[yf];
        void 0 === b && (b = a[yf] = /* @__PURE__ */ new Set());
        return b;
      }
      var zf = [];
      var Af = -1;
      function Bf(a) {
        return { current: a };
      }
      function H(a) {
        0 > Af || (a.current = zf[Af], zf[Af] = null, Af--);
      }
      function I(a, b) {
        Af++;
        zf[Af] = a.current;
        a.current = b;
      }
      var Cf = {};
      var M = Bf(Cf);
      var N = Bf(false);
      var Df = Cf;
      function Ef(a, b) {
        var c = a.type.contextTypes;
        if (!c) return Cf;
        var d = a.stateNode;
        if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
        var e = {}, f;
        for (f in c) e[f] = b[f];
        d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
        return e;
      }
      function Ff(a) {
        a = a.childContextTypes;
        return null !== a && void 0 !== a;
      }
      function Gf() {
        H(N);
        H(M);
      }
      function Hf(a, b, c) {
        if (M.current !== Cf) throw Error(y(168));
        I(M, b);
        I(N, c);
      }
      function If(a, b, c) {
        var d = a.stateNode;
        a = b.childContextTypes;
        if ("function" !== typeof d.getChildContext) return c;
        d = d.getChildContext();
        for (var e in d) if (!(e in a)) throw Error(y(108, Ra(b) || "Unknown", e));
        return m({}, c, d);
      }
      function Jf(a) {
        a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Cf;
        Df = M.current;
        I(M, a);
        I(N, N.current);
        return true;
      }
      function Kf(a, b, c) {
        var d = a.stateNode;
        if (!d) throw Error(y(169));
        c ? (a = If(a, b, Df), d.__reactInternalMemoizedMergedChildContext = a, H(N), H(M), I(M, a)) : H(N);
        I(N, c);
      }
      var Lf = null;
      var Mf = null;
      var Nf = r.unstable_runWithPriority;
      var Of = r.unstable_scheduleCallback;
      var Pf = r.unstable_cancelCallback;
      var Qf = r.unstable_shouldYield;
      var Rf = r.unstable_requestPaint;
      var Sf = r.unstable_now;
      var Tf = r.unstable_getCurrentPriorityLevel;
      var Uf = r.unstable_ImmediatePriority;
      var Vf = r.unstable_UserBlockingPriority;
      var Wf = r.unstable_NormalPriority;
      var Xf = r.unstable_LowPriority;
      var Yf = r.unstable_IdlePriority;
      var Zf = {};
      var $f = void 0 !== Rf ? Rf : function() {
      };
      var ag = null;
      var bg = null;
      var cg = false;
      var dg = Sf();
      var O = 1e4 > dg ? Sf : function() {
        return Sf() - dg;
      };
      function eg() {
        switch (Tf()) {
          case Uf:
            return 99;
          case Vf:
            return 98;
          case Wf:
            return 97;
          case Xf:
            return 96;
          case Yf:
            return 95;
          default:
            throw Error(y(332));
        }
      }
      function fg(a) {
        switch (a) {
          case 99:
            return Uf;
          case 98:
            return Vf;
          case 97:
            return Wf;
          case 96:
            return Xf;
          case 95:
            return Yf;
          default:
            throw Error(y(332));
        }
      }
      function gg(a, b) {
        a = fg(a);
        return Nf(a, b);
      }
      function hg(a, b, c) {
        a = fg(a);
        return Of(a, b, c);
      }
      function ig() {
        if (null !== bg) {
          var a = bg;
          bg = null;
          Pf(a);
        }
        jg();
      }
      function jg() {
        if (!cg && null !== ag) {
          cg = true;
          var a = 0;
          try {
            var b = ag;
            gg(99, function() {
              for (; a < b.length; a++) {
                var c = b[a];
                do
                  c = c(true);
                while (null !== c);
              }
            });
            ag = null;
          } catch (c) {
            throw null !== ag && (ag = ag.slice(a + 1)), Of(Uf, ig), c;
          } finally {
            cg = false;
          }
        }
      }
      var kg = ra.ReactCurrentBatchConfig;
      function lg(a, b) {
        if (a && a.defaultProps) {
          b = m({}, b);
          a = a.defaultProps;
          for (var c in a) void 0 === b[c] && (b[c] = a[c]);
          return b;
        }
        return b;
      }
      var mg = Bf(null);
      var ng = null;
      var og = null;
      var pg = null;
      function qg() {
        pg = og = ng = null;
      }
      function rg(a) {
        var b = mg.current;
        H(mg);
        a.type._context._currentValue = b;
      }
      function sg(a, b) {
        for (; null !== a; ) {
          var c = a.alternate;
          if ((a.childLanes & b) === b) if (null === c || (c.childLanes & b) === b) break;
          else c.childLanes |= b;
          else a.childLanes |= b, null !== c && (c.childLanes |= b);
          a = a.return;
        }
      }
      function tg(a, b) {
        ng = a;
        pg = og = null;
        a = a.dependencies;
        null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (ug = true), a.firstContext = null);
      }
      function vg(a, b) {
        if (pg !== a && false !== b && 0 !== b) {
          if ("number" !== typeof b || 1073741823 === b) pg = a, b = 1073741823;
          b = { context: a, observedBits: b, next: null };
          if (null === og) {
            if (null === ng) throw Error(y(308));
            og = b;
            ng.dependencies = { lanes: 0, firstContext: b, responders: null };
          } else og = og.next = b;
        }
        return a._currentValue;
      }
      var wg = false;
      function xg(a) {
        a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null }, effects: null };
      }
      function yg(a, b) {
        a = a.updateQueue;
        b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
      }
      function zg(a, b) {
        return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
      }
      function Ag(a, b) {
        a = a.updateQueue;
        if (null !== a) {
          a = a.shared;
          var c = a.pending;
          null === c ? b.next = b : (b.next = c.next, c.next = b);
          a.pending = b;
        }
      }
      function Bg(a, b) {
        var c = a.updateQueue, d = a.alternate;
        if (null !== d && (d = d.updateQueue, c === d)) {
          var e = null, f = null;
          c = c.firstBaseUpdate;
          if (null !== c) {
            do {
              var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
              null === f ? e = f = g : f = f.next = g;
              c = c.next;
            } while (null !== c);
            null === f ? e = f = b : f = f.next = b;
          } else e = f = b;
          c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f, shared: d.shared, effects: d.effects };
          a.updateQueue = c;
          return;
        }
        a = c.lastBaseUpdate;
        null === a ? c.firstBaseUpdate = b : a.next = b;
        c.lastBaseUpdate = b;
      }
      function Cg(a, b, c, d) {
        var e = a.updateQueue;
        wg = false;
        var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
        if (null !== h) {
          e.shared.pending = null;
          var k = h, l = k.next;
          k.next = null;
          null === g ? f = l : g.next = l;
          g = k;
          var n = a.alternate;
          if (null !== n) {
            n = n.updateQueue;
            var A = n.lastBaseUpdate;
            A !== g && (null === A ? n.firstBaseUpdate = l : A.next = l, n.lastBaseUpdate = k);
          }
        }
        if (null !== f) {
          A = e.baseState;
          g = 0;
          n = l = k = null;
          do {
            h = f.lane;
            var p = f.eventTime;
            if ((d & h) === h) {
              null !== n && (n = n.next = {
                eventTime: p,
                lane: 0,
                tag: f.tag,
                payload: f.payload,
                callback: f.callback,
                next: null
              });
              a: {
                var C = a, x = f;
                h = b;
                p = c;
                switch (x.tag) {
                  case 1:
                    C = x.payload;
                    if ("function" === typeof C) {
                      A = C.call(p, A, h);
                      break a;
                    }
                    A = C;
                    break a;
                  case 3:
                    C.flags = C.flags & -4097 | 64;
                  case 0:
                    C = x.payload;
                    h = "function" === typeof C ? C.call(p, A, h) : C;
                    if (null === h || void 0 === h) break a;
                    A = m({}, A, h);
                    break a;
                  case 2:
                    wg = true;
                }
              }
              null !== f.callback && (a.flags |= 32, h = e.effects, null === h ? e.effects = [f] : h.push(f));
            } else p = { eventTime: p, lane: h, tag: f.tag, payload: f.payload, callback: f.callback, next: null }, null === n ? (l = n = p, k = A) : n = n.next = p, g |= h;
            f = f.next;
            if (null === f) if (h = e.shared.pending, null === h) break;
            else f = h.next, h.next = null, e.lastBaseUpdate = h, e.shared.pending = null;
          } while (1);
          null === n && (k = A);
          e.baseState = k;
          e.firstBaseUpdate = l;
          e.lastBaseUpdate = n;
          Dg |= g;
          a.lanes = g;
          a.memoizedState = A;
        }
      }
      function Eg(a, b, c) {
        a = b.effects;
        b.effects = null;
        if (null !== a) for (b = 0; b < a.length; b++) {
          var d = a[b], e = d.callback;
          if (null !== e) {
            d.callback = null;
            d = c;
            if ("function" !== typeof e) throw Error(y(191, e));
            e.call(d);
          }
        }
      }
      var Fg = new aa.Component().refs;
      function Gg(a, b, c, d) {
        b = a.memoizedState;
        c = c(d, b);
        c = null === c || void 0 === c ? b : m({}, b, c);
        a.memoizedState = c;
        0 === a.lanes && (a.updateQueue.baseState = c);
      }
      var Kg = { isMounted: function(a) {
        return (a = a._reactInternals) ? Zb(a) === a : false;
      }, enqueueSetState: function(a, b, c) {
        a = a._reactInternals;
        var d = Hg(), e = Ig(a), f = zg(d, e);
        f.payload = b;
        void 0 !== c && null !== c && (f.callback = c);
        Ag(a, f);
        Jg(a, e, d);
      }, enqueueReplaceState: function(a, b, c) {
        a = a._reactInternals;
        var d = Hg(), e = Ig(a), f = zg(d, e);
        f.tag = 1;
        f.payload = b;
        void 0 !== c && null !== c && (f.callback = c);
        Ag(a, f);
        Jg(a, e, d);
      }, enqueueForceUpdate: function(a, b) {
        a = a._reactInternals;
        var c = Hg(), d = Ig(a), e = zg(c, d);
        e.tag = 2;
        void 0 !== b && null !== b && (e.callback = b);
        Ag(a, e);
        Jg(a, d, c);
      } };
      function Lg(a, b, c, d, e, f, g) {
        a = a.stateNode;
        return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Je(c, d) || !Je(e, f) : true;
      }
      function Mg(a, b, c) {
        var d = false, e = Cf;
        var f = b.contextType;
        "object" === typeof f && null !== f ? f = vg(f) : (e = Ff(b) ? Df : M.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Ef(a, e) : Cf);
        b = new b(c, f);
        a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
        b.updater = Kg;
        a.stateNode = b;
        b._reactInternals = a;
        d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
        return b;
      }
      function Ng(a, b, c, d) {
        a = b.state;
        "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
        "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
        b.state !== a && Kg.enqueueReplaceState(b, b.state, null);
      }
      function Og(a, b, c, d) {
        var e = a.stateNode;
        e.props = c;
        e.state = a.memoizedState;
        e.refs = Fg;
        xg(a);
        var f = b.contextType;
        "object" === typeof f && null !== f ? e.context = vg(f) : (f = Ff(b) ? Df : M.current, e.context = Ef(a, f));
        Cg(a, c, e, d);
        e.state = a.memoizedState;
        f = b.getDerivedStateFromProps;
        "function" === typeof f && (Gg(a, b, f, c), e.state = a.memoizedState);
        "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Kg.enqueueReplaceState(e, e.state, null), Cg(a, c, e, d), e.state = a.memoizedState);
        "function" === typeof e.componentDidMount && (a.flags |= 4);
      }
      var Pg = Array.isArray;
      function Qg(a, b, c) {
        a = c.ref;
        if (null !== a && "function" !== typeof a && "object" !== typeof a) {
          if (c._owner) {
            c = c._owner;
            if (c) {
              if (1 !== c.tag) throw Error(y(309));
              var d = c.stateNode;
            }
            if (!d) throw Error(y(147, a));
            var e = "" + a;
            if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === e) return b.ref;
            b = function(a2) {
              var b2 = d.refs;
              b2 === Fg && (b2 = d.refs = {});
              null === a2 ? delete b2[e] : b2[e] = a2;
            };
            b._stringRef = e;
            return b;
          }
          if ("string" !== typeof a) throw Error(y(284));
          if (!c._owner) throw Error(y(290, a));
        }
        return a;
      }
      function Rg(a, b) {
        if ("textarea" !== a.type) throw Error(y(31, "[object Object]" === Object.prototype.toString.call(b) ? "object with keys {" + Object.keys(b).join(", ") + "}" : b));
      }
      function Sg(a) {
        function b(b2, c2) {
          if (a) {
            var d2 = b2.lastEffect;
            null !== d2 ? (d2.nextEffect = c2, b2.lastEffect = c2) : b2.firstEffect = b2.lastEffect = c2;
            c2.nextEffect = null;
            c2.flags = 8;
          }
        }
        function c(c2, d2) {
          if (!a) return null;
          for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
          return null;
        }
        function d(a2, b2) {
          for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
          return a2;
        }
        function e(a2, b2) {
          a2 = Tg(a2, b2);
          a2.index = 0;
          a2.sibling = null;
          return a2;
        }
        function f(b2, c2, d2) {
          b2.index = d2;
          if (!a) return c2;
          d2 = b2.alternate;
          if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags = 2, c2) : d2;
          b2.flags = 2;
          return c2;
        }
        function g(b2) {
          a && null === b2.alternate && (b2.flags = 2);
          return b2;
        }
        function h(a2, b2, c2, d2) {
          if (null === b2 || 6 !== b2.tag) return b2 = Ug(c2, a2.mode, d2), b2.return = a2, b2;
          b2 = e(b2, c2);
          b2.return = a2;
          return b2;
        }
        function k(a2, b2, c2, d2) {
          if (null !== b2 && b2.elementType === c2.type) return d2 = e(b2, c2.props), d2.ref = Qg(a2, b2, c2), d2.return = a2, d2;
          d2 = Vg(c2.type, c2.key, c2.props, null, a2.mode, d2);
          d2.ref = Qg(a2, b2, c2);
          d2.return = a2;
          return d2;
        }
        function l(a2, b2, c2, d2) {
          if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Wg(c2, a2.mode, d2), b2.return = a2, b2;
          b2 = e(b2, c2.children || []);
          b2.return = a2;
          return b2;
        }
        function n(a2, b2, c2, d2, f2) {
          if (null === b2 || 7 !== b2.tag) return b2 = Xg(c2, a2.mode, d2, f2), b2.return = a2, b2;
          b2 = e(b2, c2);
          b2.return = a2;
          return b2;
        }
        function A(a2, b2, c2) {
          if ("string" === typeof b2 || "number" === typeof b2) return b2 = Ug("" + b2, a2.mode, c2), b2.return = a2, b2;
          if ("object" === typeof b2 && null !== b2) {
            switch (b2.$$typeof) {
              case sa:
                return c2 = Vg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Qg(a2, null, b2), c2.return = a2, c2;
              case ta:
                return b2 = Wg(b2, a2.mode, c2), b2.return = a2, b2;
            }
            if (Pg(b2) || La(b2)) return b2 = Xg(
              b2,
              a2.mode,
              c2,
              null
            ), b2.return = a2, b2;
            Rg(a2, b2);
          }
          return null;
        }
        function p(a2, b2, c2, d2) {
          var e2 = null !== b2 ? b2.key : null;
          if ("string" === typeof c2 || "number" === typeof c2) return null !== e2 ? null : h(a2, b2, "" + c2, d2);
          if ("object" === typeof c2 && null !== c2) {
            switch (c2.$$typeof) {
              case sa:
                return c2.key === e2 ? c2.type === ua ? n(a2, b2, c2.props.children, d2, e2) : k(a2, b2, c2, d2) : null;
              case ta:
                return c2.key === e2 ? l(a2, b2, c2, d2) : null;
            }
            if (Pg(c2) || La(c2)) return null !== e2 ? null : n(a2, b2, c2, d2, null);
            Rg(a2, c2);
          }
          return null;
        }
        function C(a2, b2, c2, d2, e2) {
          if ("string" === typeof d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
          if ("object" === typeof d2 && null !== d2) {
            switch (d2.$$typeof) {
              case sa:
                return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, d2.type === ua ? n(b2, a2, d2.props.children, e2, d2.key) : k(b2, a2, d2, e2);
              case ta:
                return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l(b2, a2, d2, e2);
            }
            if (Pg(d2) || La(d2)) return a2 = a2.get(c2) || null, n(b2, a2, d2, e2, null);
            Rg(b2, d2);
          }
          return null;
        }
        function x(e2, g2, h2, k2) {
          for (var l2 = null, t = null, u = g2, z = g2 = 0, q = null; null !== u && z < h2.length; z++) {
            u.index > z ? (q = u, u = null) : q = u.sibling;
            var n2 = p(e2, u, h2[z], k2);
            if (null === n2) {
              null === u && (u = q);
              break;
            }
            a && u && null === n2.alternate && b(e2, u);
            g2 = f(n2, g2, z);
            null === t ? l2 = n2 : t.sibling = n2;
            t = n2;
            u = q;
          }
          if (z === h2.length) return c(e2, u), l2;
          if (null === u) {
            for (; z < h2.length; z++) u = A(e2, h2[z], k2), null !== u && (g2 = f(u, g2, z), null === t ? l2 = u : t.sibling = u, t = u);
            return l2;
          }
          for (u = d(e2, u); z < h2.length; z++) q = C(u, e2, z, h2[z], k2), null !== q && (a && null !== q.alternate && u.delete(null === q.key ? z : q.key), g2 = f(q, g2, z), null === t ? l2 = q : t.sibling = q, t = q);
          a && u.forEach(function(a2) {
            return b(e2, a2);
          });
          return l2;
        }
        function w(e2, g2, h2, k2) {
          var l2 = La(h2);
          if ("function" !== typeof l2) throw Error(y(150));
          h2 = l2.call(h2);
          if (null == h2) throw Error(y(151));
          for (var t = l2 = null, u = g2, z = g2 = 0, q = null, n2 = h2.next(); null !== u && !n2.done; z++, n2 = h2.next()) {
            u.index > z ? (q = u, u = null) : q = u.sibling;
            var w2 = p(e2, u, n2.value, k2);
            if (null === w2) {
              null === u && (u = q);
              break;
            }
            a && u && null === w2.alternate && b(e2, u);
            g2 = f(w2, g2, z);
            null === t ? l2 = w2 : t.sibling = w2;
            t = w2;
            u = q;
          }
          if (n2.done) return c(e2, u), l2;
          if (null === u) {
            for (; !n2.done; z++, n2 = h2.next()) n2 = A(e2, n2.value, k2), null !== n2 && (g2 = f(n2, g2, z), null === t ? l2 = n2 : t.sibling = n2, t = n2);
            return l2;
          }
          for (u = d(e2, u); !n2.done; z++, n2 = h2.next()) n2 = C(u, e2, z, n2.value, k2), null !== n2 && (a && null !== n2.alternate && u.delete(null === n2.key ? z : n2.key), g2 = f(n2, g2, z), null === t ? l2 = n2 : t.sibling = n2, t = n2);
          a && u.forEach(function(a2) {
            return b(e2, a2);
          });
          return l2;
        }
        return function(a2, d2, f2, h2) {
          var k2 = "object" === typeof f2 && null !== f2 && f2.type === ua && null === f2.key;
          k2 && (f2 = f2.props.children);
          var l2 = "object" === typeof f2 && null !== f2;
          if (l2) switch (f2.$$typeof) {
            case sa:
              a: {
                l2 = f2.key;
                for (k2 = d2; null !== k2; ) {
                  if (k2.key === l2) {
                    switch (k2.tag) {
                      case 7:
                        if (f2.type === ua) {
                          c(a2, k2.sibling);
                          d2 = e(k2, f2.props.children);
                          d2.return = a2;
                          a2 = d2;
                          break a;
                        }
                        break;
                      default:
                        if (k2.elementType === f2.type) {
                          c(a2, k2.sibling);
                          d2 = e(k2, f2.props);
                          d2.ref = Qg(a2, k2, f2);
                          d2.return = a2;
                          a2 = d2;
                          break a;
                        }
                    }
                    c(a2, k2);
                    break;
                  } else b(a2, k2);
                  k2 = k2.sibling;
                }
                f2.type === ua ? (d2 = Xg(f2.props.children, a2.mode, h2, f2.key), d2.return = a2, a2 = d2) : (h2 = Vg(f2.type, f2.key, f2.props, null, a2.mode, h2), h2.ref = Qg(a2, d2, f2), h2.return = a2, a2 = h2);
              }
              return g(a2);
            case ta:
              a: {
                for (k2 = f2.key; null !== d2; ) {
                  if (d2.key === k2) if (4 === d2.tag && d2.stateNode.containerInfo === f2.containerInfo && d2.stateNode.implementation === f2.implementation) {
                    c(a2, d2.sibling);
                    d2 = e(d2, f2.children || []);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  } else {
                    c(a2, d2);
                    break;
                  }
                  else b(a2, d2);
                  d2 = d2.sibling;
                }
                d2 = Wg(f2, a2.mode, h2);
                d2.return = a2;
                a2 = d2;
              }
              return g(a2);
          }
          if ("string" === typeof f2 || "number" === typeof f2) return f2 = "" + f2, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f2), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Ug(f2, a2.mode, h2), d2.return = a2, a2 = d2), g(a2);
          if (Pg(f2)) return x(a2, d2, f2, h2);
          if (La(f2)) return w(a2, d2, f2, h2);
          l2 && Rg(a2, f2);
          if ("undefined" === typeof f2 && !k2) switch (a2.tag) {
            case 1:
            case 22:
            case 0:
            case 11:
            case 15:
              throw Error(y(152, Ra(a2.type) || "Component"));
          }
          return c(a2, d2);
        };
      }
      var Yg = Sg(true);
      var Zg = Sg(false);
      var $g = {};
      var ah = Bf($g);
      var bh = Bf($g);
      var ch = Bf($g);
      function dh(a) {
        if (a === $g) throw Error(y(174));
        return a;
      }
      function eh(a, b) {
        I(ch, b);
        I(bh, a);
        I(ah, $g);
        a = b.nodeType;
        switch (a) {
          case 9:
          case 11:
            b = (b = b.documentElement) ? b.namespaceURI : mb(null, "");
            break;
          default:
            a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = mb(b, a);
        }
        H(ah);
        I(ah, b);
      }
      function fh() {
        H(ah);
        H(bh);
        H(ch);
      }
      function gh(a) {
        dh(ch.current);
        var b = dh(ah.current);
        var c = mb(b, a.type);
        b !== c && (I(bh, a), I(ah, c));
      }
      function hh(a) {
        bh.current === a && (H(ah), H(bh));
      }
      var P = Bf(0);
      function ih(a) {
        for (var b = a; null !== b; ) {
          if (13 === b.tag) {
            var c = b.memoizedState;
            if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
          } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
            if (0 !== (b.flags & 64)) return b;
          } else if (null !== b.child) {
            b.child.return = b;
            b = b.child;
            continue;
          }
          if (b === a) break;
          for (; null === b.sibling; ) {
            if (null === b.return || b.return === a) return null;
            b = b.return;
          }
          b.sibling.return = b.return;
          b = b.sibling;
        }
        return null;
      }
      var jh = null;
      var kh = null;
      var lh = false;
      function mh(a, b) {
        var c = nh(5, null, null, 0);
        c.elementType = "DELETED";
        c.type = "DELETED";
        c.stateNode = b;
        c.return = a;
        c.flags = 8;
        null !== a.lastEffect ? (a.lastEffect.nextEffect = c, a.lastEffect = c) : a.firstEffect = a.lastEffect = c;
      }
      function oh(a, b) {
        switch (a.tag) {
          case 5:
            var c = a.type;
            b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
            return null !== b ? (a.stateNode = b, true) : false;
          case 6:
            return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, true) : false;
          case 13:
            return false;
          default:
            return false;
        }
      }
      function ph(a) {
        if (lh) {
          var b = kh;
          if (b) {
            var c = b;
            if (!oh(a, b)) {
              b = rf(c.nextSibling);
              if (!b || !oh(a, b)) {
                a.flags = a.flags & -1025 | 2;
                lh = false;
                jh = a;
                return;
              }
              mh(jh, c);
            }
            jh = a;
            kh = rf(b.firstChild);
          } else a.flags = a.flags & -1025 | 2, lh = false, jh = a;
        }
      }
      function qh(a) {
        for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
        jh = a;
      }
      function rh(a) {
        if (a !== jh) return false;
        if (!lh) return qh(a), lh = true, false;
        var b = a.type;
        if (5 !== a.tag || "head" !== b && "body" !== b && !nf(b, a.memoizedProps)) for (b = kh; b; ) mh(a, b), b = rf(b.nextSibling);
        qh(a);
        if (13 === a.tag) {
          a = a.memoizedState;
          a = null !== a ? a.dehydrated : null;
          if (!a) throw Error(y(317));
          a: {
            a = a.nextSibling;
            for (b = 0; a; ) {
              if (8 === a.nodeType) {
                var c = a.data;
                if ("/$" === c) {
                  if (0 === b) {
                    kh = rf(a.nextSibling);
                    break a;
                  }
                  b--;
                } else "$" !== c && "$!" !== c && "$?" !== c || b++;
              }
              a = a.nextSibling;
            }
            kh = null;
          }
        } else kh = jh ? rf(a.stateNode.nextSibling) : null;
        return true;
      }
      function sh() {
        kh = jh = null;
        lh = false;
      }
      var th = [];
      function uh() {
        for (var a = 0; a < th.length; a++) th[a]._workInProgressVersionPrimary = null;
        th.length = 0;
      }
      var vh = ra.ReactCurrentDispatcher;
      var wh = ra.ReactCurrentBatchConfig;
      var xh = 0;
      var R = null;
      var S = null;
      var T = null;
      var yh = false;
      var zh = false;
      function Ah() {
        throw Error(y(321));
      }
      function Bh(a, b) {
        if (null === b) return false;
        for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return false;
        return true;
      }
      function Ch(a, b, c, d, e, f) {
        xh = f;
        R = b;
        b.memoizedState = null;
        b.updateQueue = null;
        b.lanes = 0;
        vh.current = null === a || null === a.memoizedState ? Dh : Eh;
        a = c(d, e);
        if (zh) {
          f = 0;
          do {
            zh = false;
            if (!(25 > f)) throw Error(y(301));
            f += 1;
            T = S = null;
            b.updateQueue = null;
            vh.current = Fh;
            a = c(d, e);
          } while (zh);
        }
        vh.current = Gh;
        b = null !== S && null !== S.next;
        xh = 0;
        T = S = R = null;
        yh = false;
        if (b) throw Error(y(300));
        return a;
      }
      function Hh() {
        var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
        null === T ? R.memoizedState = T = a : T = T.next = a;
        return T;
      }
      function Ih() {
        if (null === S) {
          var a = R.alternate;
          a = null !== a ? a.memoizedState : null;
        } else a = S.next;
        var b = null === T ? R.memoizedState : T.next;
        if (null !== b) T = b, S = a;
        else {
          if (null === a) throw Error(y(310));
          S = a;
          a = { memoizedState: S.memoizedState, baseState: S.baseState, baseQueue: S.baseQueue, queue: S.queue, next: null };
          null === T ? R.memoizedState = T = a : T = T.next = a;
        }
        return T;
      }
      function Jh(a, b) {
        return "function" === typeof b ? b(a) : b;
      }
      function Kh(a) {
        var b = Ih(), c = b.queue;
        if (null === c) throw Error(y(311));
        c.lastRenderedReducer = a;
        var d = S, e = d.baseQueue, f = c.pending;
        if (null !== f) {
          if (null !== e) {
            var g = e.next;
            e.next = f.next;
            f.next = g;
          }
          d.baseQueue = e = f;
          c.pending = null;
        }
        if (null !== e) {
          e = e.next;
          d = d.baseState;
          var h = g = f = null, k = e;
          do {
            var l = k.lane;
            if ((xh & l) === l) null !== h && (h = h.next = { lane: 0, action: k.action, eagerReducer: k.eagerReducer, eagerState: k.eagerState, next: null }), d = k.eagerReducer === a ? k.eagerState : a(d, k.action);
            else {
              var n = {
                lane: l,
                action: k.action,
                eagerReducer: k.eagerReducer,
                eagerState: k.eagerState,
                next: null
              };
              null === h ? (g = h = n, f = d) : h = h.next = n;
              R.lanes |= l;
              Dg |= l;
            }
            k = k.next;
          } while (null !== k && k !== e);
          null === h ? f = d : h.next = g;
          He(d, b.memoizedState) || (ug = true);
          b.memoizedState = d;
          b.baseState = f;
          b.baseQueue = h;
          c.lastRenderedState = d;
        }
        return [b.memoizedState, c.dispatch];
      }
      function Lh(a) {
        var b = Ih(), c = b.queue;
        if (null === c) throw Error(y(311));
        c.lastRenderedReducer = a;
        var d = c.dispatch, e = c.pending, f = b.memoizedState;
        if (null !== e) {
          c.pending = null;
          var g = e = e.next;
          do
            f = a(f, g.action), g = g.next;
          while (g !== e);
          He(f, b.memoizedState) || (ug = true);
          b.memoizedState = f;
          null === b.baseQueue && (b.baseState = f);
          c.lastRenderedState = f;
        }
        return [f, d];
      }
      function Mh(a, b, c) {
        var d = b._getVersion;
        d = d(b._source);
        var e = b._workInProgressVersionPrimary;
        if (null !== e) a = e === d;
        else if (a = a.mutableReadLanes, a = (xh & a) === a) b._workInProgressVersionPrimary = d, th.push(b);
        if (a) return c(b._source);
        th.push(b);
        throw Error(y(350));
      }
      function Nh(a, b, c, d) {
        var e = U;
        if (null === e) throw Error(y(349));
        var f = b._getVersion, g = f(b._source), h = vh.current, k = h.useState(function() {
          return Mh(e, b, c);
        }), l = k[1], n = k[0];
        k = T;
        var A = a.memoizedState, p = A.refs, C = p.getSnapshot, x = A.source;
        A = A.subscribe;
        var w = R;
        a.memoizedState = { refs: p, source: b, subscribe: d };
        h.useEffect(function() {
          p.getSnapshot = c;
          p.setSnapshot = l;
          var a2 = f(b._source);
          if (!He(g, a2)) {
            a2 = c(b._source);
            He(n, a2) || (l(a2), a2 = Ig(w), e.mutableReadLanes |= a2 & e.pendingLanes);
            a2 = e.mutableReadLanes;
            e.entangledLanes |= a2;
            for (var d2 = e.entanglements, h2 = a2; 0 < h2; ) {
              var k2 = 31 - Vc(h2), v = 1 << k2;
              d2[k2] |= a2;
              h2 &= ~v;
            }
          }
        }, [c, b, d]);
        h.useEffect(function() {
          return d(b._source, function() {
            var a2 = p.getSnapshot, c2 = p.setSnapshot;
            try {
              c2(a2(b._source));
              var d2 = Ig(w);
              e.mutableReadLanes |= d2 & e.pendingLanes;
            } catch (q) {
              c2(function() {
                throw q;
              });
            }
          });
        }, [b, d]);
        He(C, c) && He(x, b) && He(A, d) || (a = { pending: null, dispatch: null, lastRenderedReducer: Jh, lastRenderedState: n }, a.dispatch = l = Oh.bind(null, R, a), k.queue = a, k.baseQueue = null, n = Mh(e, b, c), k.memoizedState = k.baseState = n);
        return n;
      }
      function Ph(a, b, c) {
        var d = Ih();
        return Nh(d, a, b, c);
      }
      function Qh(a) {
        var b = Hh();
        "function" === typeof a && (a = a());
        b.memoizedState = b.baseState = a;
        a = b.queue = { pending: null, dispatch: null, lastRenderedReducer: Jh, lastRenderedState: a };
        a = a.dispatch = Oh.bind(null, R, a);
        return [b.memoizedState, a];
      }
      function Rh(a, b, c, d) {
        a = { tag: a, create: b, destroy: c, deps: d, next: null };
        b = R.updateQueue;
        null === b ? (b = { lastEffect: null }, R.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
        return a;
      }
      function Sh(a) {
        var b = Hh();
        a = { current: a };
        return b.memoizedState = a;
      }
      function Th() {
        return Ih().memoizedState;
      }
      function Uh(a, b, c, d) {
        var e = Hh();
        R.flags |= a;
        e.memoizedState = Rh(1 | b, c, void 0, void 0 === d ? null : d);
      }
      function Vh(a, b, c, d) {
        var e = Ih();
        d = void 0 === d ? null : d;
        var f = void 0;
        if (null !== S) {
          var g = S.memoizedState;
          f = g.destroy;
          if (null !== d && Bh(d, g.deps)) {
            Rh(b, c, f, d);
            return;
          }
        }
        R.flags |= a;
        e.memoizedState = Rh(1 | b, c, f, d);
      }
      function Wh(a, b) {
        return Uh(516, 4, a, b);
      }
      function Xh(a, b) {
        return Vh(516, 4, a, b);
      }
      function Yh(a, b) {
        return Vh(4, 2, a, b);
      }
      function Zh(a, b) {
        if ("function" === typeof b) return a = a(), b(a), function() {
          b(null);
        };
        if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
          b.current = null;
        };
      }
      function $h(a, b, c) {
        c = null !== c && void 0 !== c ? c.concat([a]) : null;
        return Vh(4, 2, Zh.bind(null, b, a), c);
      }
      function ai() {
      }
      function bi(a, b) {
        var c = Ih();
        b = void 0 === b ? null : b;
        var d = c.memoizedState;
        if (null !== d && null !== b && Bh(b, d[1])) return d[0];
        c.memoizedState = [a, b];
        return a;
      }
      function ci(a, b) {
        var c = Ih();
        b = void 0 === b ? null : b;
        var d = c.memoizedState;
        if (null !== d && null !== b && Bh(b, d[1])) return d[0];
        a = a();
        c.memoizedState = [a, b];
        return a;
      }
      function di(a, b) {
        var c = eg();
        gg(98 > c ? 98 : c, function() {
          a(true);
        });
        gg(97 < c ? 97 : c, function() {
          var c2 = wh.transition;
          wh.transition = 1;
          try {
            a(false), b();
          } finally {
            wh.transition = c2;
          }
        });
      }
      function Oh(a, b, c) {
        var d = Hg(), e = Ig(a), f = { lane: e, action: c, eagerReducer: null, eagerState: null, next: null }, g = b.pending;
        null === g ? f.next = f : (f.next = g.next, g.next = f);
        b.pending = f;
        g = a.alternate;
        if (a === R || null !== g && g === R) zh = yh = true;
        else {
          if (0 === a.lanes && (null === g || 0 === g.lanes) && (g = b.lastRenderedReducer, null !== g)) try {
            var h = b.lastRenderedState, k = g(h, c);
            f.eagerReducer = g;
            f.eagerState = k;
            if (He(k, h)) return;
          } catch (l) {
          } finally {
          }
          Jg(a, e, d);
        }
      }
      var Gh = { readContext: vg, useCallback: Ah, useContext: Ah, useEffect: Ah, useImperativeHandle: Ah, useLayoutEffect: Ah, useMemo: Ah, useReducer: Ah, useRef: Ah, useState: Ah, useDebugValue: Ah, useDeferredValue: Ah, useTransition: Ah, useMutableSource: Ah, useOpaqueIdentifier: Ah, unstable_isNewReconciler: false };
      var Dh = { readContext: vg, useCallback: function(a, b) {
        Hh().memoizedState = [a, void 0 === b ? null : b];
        return a;
      }, useContext: vg, useEffect: Wh, useImperativeHandle: function(a, b, c) {
        c = null !== c && void 0 !== c ? c.concat([a]) : null;
        return Uh(4, 2, Zh.bind(
          null,
          b,
          a
        ), c);
      }, useLayoutEffect: function(a, b) {
        return Uh(4, 2, a, b);
      }, useMemo: function(a, b) {
        var c = Hh();
        b = void 0 === b ? null : b;
        a = a();
        c.memoizedState = [a, b];
        return a;
      }, useReducer: function(a, b, c) {
        var d = Hh();
        b = void 0 !== c ? c(b) : b;
        d.memoizedState = d.baseState = b;
        a = d.queue = { pending: null, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
        a = a.dispatch = Oh.bind(null, R, a);
        return [d.memoizedState, a];
      }, useRef: Sh, useState: Qh, useDebugValue: ai, useDeferredValue: function(a) {
        var b = Qh(a), c = b[0], d = b[1];
        Wh(function() {
          var b2 = wh.transition;
          wh.transition = 1;
          try {
            d(a);
          } finally {
            wh.transition = b2;
          }
        }, [a]);
        return c;
      }, useTransition: function() {
        var a = Qh(false), b = a[0];
        a = di.bind(null, a[1]);
        Sh(a);
        return [a, b];
      }, useMutableSource: function(a, b, c) {
        var d = Hh();
        d.memoizedState = { refs: { getSnapshot: b, setSnapshot: null }, source: a, subscribe: c };
        return Nh(d, a, b, c);
      }, useOpaqueIdentifier: function() {
        if (lh) {
          var a = false, b = uf(function() {
            a || (a = true, c("r:" + (tf++).toString(36)));
            throw Error(y(355));
          }), c = Qh(b)[1];
          0 === (R.mode & 2) && (R.flags |= 516, Rh(
            5,
            function() {
              c("r:" + (tf++).toString(36));
            },
            void 0,
            null
          ));
          return b;
        }
        b = "r:" + (tf++).toString(36);
        Qh(b);
        return b;
      }, unstable_isNewReconciler: false };
      var Eh = { readContext: vg, useCallback: bi, useContext: vg, useEffect: Xh, useImperativeHandle: $h, useLayoutEffect: Yh, useMemo: ci, useReducer: Kh, useRef: Th, useState: function() {
        return Kh(Jh);
      }, useDebugValue: ai, useDeferredValue: function(a) {
        var b = Kh(Jh), c = b[0], d = b[1];
        Xh(function() {
          var b2 = wh.transition;
          wh.transition = 1;
          try {
            d(a);
          } finally {
            wh.transition = b2;
          }
        }, [a]);
        return c;
      }, useTransition: function() {
        var a = Kh(Jh)[0];
        return [
          Th().current,
          a
        ];
      }, useMutableSource: Ph, useOpaqueIdentifier: function() {
        return Kh(Jh)[0];
      }, unstable_isNewReconciler: false };
      var Fh = { readContext: vg, useCallback: bi, useContext: vg, useEffect: Xh, useImperativeHandle: $h, useLayoutEffect: Yh, useMemo: ci, useReducer: Lh, useRef: Th, useState: function() {
        return Lh(Jh);
      }, useDebugValue: ai, useDeferredValue: function(a) {
        var b = Lh(Jh), c = b[0], d = b[1];
        Xh(function() {
          var b2 = wh.transition;
          wh.transition = 1;
          try {
            d(a);
          } finally {
            wh.transition = b2;
          }
        }, [a]);
        return c;
      }, useTransition: function() {
        var a = Lh(Jh)[0];
        return [
          Th().current,
          a
        ];
      }, useMutableSource: Ph, useOpaqueIdentifier: function() {
        return Lh(Jh)[0];
      }, unstable_isNewReconciler: false };
      var ei = ra.ReactCurrentOwner;
      var ug = false;
      function fi(a, b, c, d) {
        b.child = null === a ? Zg(b, null, c, d) : Yg(b, a.child, c, d);
      }
      function gi(a, b, c, d, e) {
        c = c.render;
        var f = b.ref;
        tg(b, e);
        d = Ch(a, b, c, d, f, e);
        if (null !== a && !ug) return b.updateQueue = a.updateQueue, b.flags &= -517, a.lanes &= ~e, hi(a, b, e);
        b.flags |= 1;
        fi(a, b, d, e);
        return b.child;
      }
      function ii(a, b, c, d, e, f) {
        if (null === a) {
          var g = c.type;
          if ("function" === typeof g && !ji(g) && void 0 === g.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = g, ki(a, b, g, d, e, f);
          a = Vg(c.type, null, d, b, b.mode, f);
          a.ref = b.ref;
          a.return = b;
          return b.child = a;
        }
        g = a.child;
        if (0 === (e & f) && (e = g.memoizedProps, c = c.compare, c = null !== c ? c : Je, c(e, d) && a.ref === b.ref)) return hi(a, b, f);
        b.flags |= 1;
        a = Tg(g, d);
        a.ref = b.ref;
        a.return = b;
        return b.child = a;
      }
      function ki(a, b, c, d, e, f) {
        if (null !== a && Je(a.memoizedProps, d) && a.ref === b.ref) if (ug = false, 0 !== (f & e)) 0 !== (a.flags & 16384) && (ug = true);
        else return b.lanes = a.lanes, hi(a, b, f);
        return li(a, b, c, d, f);
      }
      function mi(a, b, c) {
        var d = b.pendingProps, e = d.children, f = null !== a ? a.memoizedState : null;
        if ("hidden" === d.mode || "unstable-defer-without-hiding" === d.mode) if (0 === (b.mode & 4)) b.memoizedState = { baseLanes: 0 }, ni(b, c);
        else if (0 !== (c & 1073741824)) b.memoizedState = { baseLanes: 0 }, ni(b, null !== f ? f.baseLanes : c);
        else return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a }, ni(b, a), null;
        else null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, ni(b, d);
        fi(a, b, e, c);
        return b.child;
      }
      function oi(a, b) {
        var c = b.ref;
        if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 128;
      }
      function li(a, b, c, d, e) {
        var f = Ff(c) ? Df : M.current;
        f = Ef(b, f);
        tg(b, e);
        c = Ch(a, b, c, d, f, e);
        if (null !== a && !ug) return b.updateQueue = a.updateQueue, b.flags &= -517, a.lanes &= ~e, hi(a, b, e);
        b.flags |= 1;
        fi(a, b, c, e);
        return b.child;
      }
      function pi(a, b, c, d, e) {
        if (Ff(c)) {
          var f = true;
          Jf(b);
        } else f = false;
        tg(b, e);
        if (null === b.stateNode) null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2), Mg(b, c, d), Og(b, c, d, e), d = true;
        else if (null === a) {
          var g = b.stateNode, h = b.memoizedProps;
          g.props = h;
          var k = g.context, l = c.contextType;
          "object" === typeof l && null !== l ? l = vg(l) : (l = Ff(c) ? Df : M.current, l = Ef(b, l));
          var n = c.getDerivedStateFromProps, A = "function" === typeof n || "function" === typeof g.getSnapshotBeforeUpdate;
          A || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Ng(b, g, d, l);
          wg = false;
          var p = b.memoizedState;
          g.state = p;
          Cg(b, d, g, e);
          k = b.memoizedState;
          h !== d || p !== k || N.current || wg ? ("function" === typeof n && (Gg(b, c, n, d), k = b.memoizedState), (h = wg || Lg(b, c, h, d, p, k, l)) ? (A || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4)) : ("function" === typeof g.componentDidMount && (b.flags |= 4), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4), d = false);
        } else {
          g = b.stateNode;
          yg(a, b);
          h = b.memoizedProps;
          l = b.type === b.elementType ? h : lg(b.type, h);
          g.props = l;
          A = b.pendingProps;
          p = g.context;
          k = c.contextType;
          "object" === typeof k && null !== k ? k = vg(k) : (k = Ff(c) ? Df : M.current, k = Ef(b, k));
          var C = c.getDerivedStateFromProps;
          (n = "function" === typeof C || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== A || p !== k) && Ng(b, g, d, k);
          wg = false;
          p = b.memoizedState;
          g.state = p;
          Cg(b, d, g, e);
          var x = b.memoizedState;
          h !== A || p !== x || N.current || wg ? ("function" === typeof C && (Gg(b, c, C, d), x = b.memoizedState), (l = wg || Lg(b, c, l, d, p, x, k)) ? (n || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(
            d,
            x,
            k
          ), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, x, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 256)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 256), b.memoizedProps = d, b.memoizedState = x), g.props = d, g.state = x, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 256), d = false);
        }
        return qi(a, b, c, d, f, e);
      }
      function qi(a, b, c, d, e, f) {
        oi(a, b);
        var g = 0 !== (b.flags & 64);
        if (!d && !g) return e && Kf(b, c, false), hi(a, b, f);
        d = b.stateNode;
        ei.current = b;
        var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
        b.flags |= 1;
        null !== a && g ? (b.child = Yg(b, a.child, null, f), b.child = Yg(b, null, h, f)) : fi(a, b, h, f);
        b.memoizedState = d.state;
        e && Kf(b, c, true);
        return b.child;
      }
      function ri(a) {
        var b = a.stateNode;
        b.pendingContext ? Hf(a, b.pendingContext, b.pendingContext !== b.context) : b.context && Hf(a, b.context, false);
        eh(a, b.containerInfo);
      }
      var si = { dehydrated: null, retryLane: 0 };
      function ti(a, b, c) {
        var d = b.pendingProps, e = P.current, f = false, g;
        (g = 0 !== (b.flags & 64)) || (g = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
        g ? (f = true, b.flags &= -65) : null !== a && null === a.memoizedState || void 0 === d.fallback || true === d.unstable_avoidThisFallback || (e |= 1);
        I(P, e & 1);
        if (null === a) {
          void 0 !== d.fallback && ph(b);
          a = d.children;
          e = d.fallback;
          if (f) return a = ui(b, a, e, c), b.child.memoizedState = { baseLanes: c }, b.memoizedState = si, a;
          if ("number" === typeof d.unstable_expectedLoadTime) return a = ui(b, a, e, c), b.child.memoizedState = { baseLanes: c }, b.memoizedState = si, b.lanes = 33554432, a;
          c = vi({ mode: "visible", children: a }, b.mode, c, null);
          c.return = b;
          return b.child = c;
        }
        if (null !== a.memoizedState) {
          if (f) return d = wi(a, b, d.children, d.fallback, c), f = b.child, e = a.child.memoizedState, f.memoizedState = null === e ? { baseLanes: c } : { baseLanes: e.baseLanes | c }, f.childLanes = a.childLanes & ~c, b.memoizedState = si, d;
          c = xi(a, b, d.children, c);
          b.memoizedState = null;
          return c;
        }
        if (f) return d = wi(a, b, d.children, d.fallback, c), f = b.child, e = a.child.memoizedState, f.memoizedState = null === e ? { baseLanes: c } : { baseLanes: e.baseLanes | c }, f.childLanes = a.childLanes & ~c, b.memoizedState = si, d;
        c = xi(a, b, d.children, c);
        b.memoizedState = null;
        return c;
      }
      function ui(a, b, c, d) {
        var e = a.mode, f = a.child;
        b = { mode: "hidden", children: b };
        0 === (e & 2) && null !== f ? (f.childLanes = 0, f.pendingProps = b) : f = vi(b, e, 0, null);
        c = Xg(c, e, d, null);
        f.return = a;
        c.return = a;
        f.sibling = c;
        a.child = f;
        return c;
      }
      function xi(a, b, c, d) {
        var e = a.child;
        a = e.sibling;
        c = Tg(e, { mode: "visible", children: c });
        0 === (b.mode & 2) && (c.lanes = d);
        c.return = b;
        c.sibling = null;
        null !== a && (a.nextEffect = null, a.flags = 8, b.firstEffect = b.lastEffect = a);
        return b.child = c;
      }
      function wi(a, b, c, d, e) {
        var f = b.mode, g = a.child;
        a = g.sibling;
        var h = { mode: "hidden", children: c };
        0 === (f & 2) && b.child !== g ? (c = b.child, c.childLanes = 0, c.pendingProps = h, g = c.lastEffect, null !== g ? (b.firstEffect = c.firstEffect, b.lastEffect = g, g.nextEffect = null) : b.firstEffect = b.lastEffect = null) : c = Tg(g, h);
        null !== a ? d = Tg(a, d) : (d = Xg(d, f, e, null), d.flags |= 2);
        d.return = b;
        c.return = b;
        c.sibling = d;
        b.child = c;
        return d;
      }
      function yi(a, b) {
        a.lanes |= b;
        var c = a.alternate;
        null !== c && (c.lanes |= b);
        sg(a.return, b);
      }
      function zi(a, b, c, d, e, f) {
        var g = a.memoizedState;
        null === g ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e, lastEffect: f } : (g.isBackwards = b, g.rendering = null, g.renderingStartTime = 0, g.last = d, g.tail = c, g.tailMode = e, g.lastEffect = f);
      }
      function Ai(a, b, c) {
        var d = b.pendingProps, e = d.revealOrder, f = d.tail;
        fi(a, b, d.children, c);
        d = P.current;
        if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 64;
        else {
          if (null !== a && 0 !== (a.flags & 64)) a: for (a = b.child; null !== a; ) {
            if (13 === a.tag) null !== a.memoizedState && yi(a, c);
            else if (19 === a.tag) yi(a, c);
            else if (null !== a.child) {
              a.child.return = a;
              a = a.child;
              continue;
            }
            if (a === b) break a;
            for (; null === a.sibling; ) {
              if (null === a.return || a.return === b) break a;
              a = a.return;
            }
            a.sibling.return = a.return;
            a = a.sibling;
          }
          d &= 1;
        }
        I(P, d);
        if (0 === (b.mode & 2)) b.memoizedState = null;
        else switch (e) {
          case "forwards":
            c = b.child;
            for (e = null; null !== c; ) a = c.alternate, null !== a && null === ih(a) && (e = c), c = c.sibling;
            c = e;
            null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
            zi(b, false, e, c, f, b.lastEffect);
            break;
          case "backwards":
            c = null;
            e = b.child;
            for (b.child = null; null !== e; ) {
              a = e.alternate;
              if (null !== a && null === ih(a)) {
                b.child = e;
                break;
              }
              a = e.sibling;
              e.sibling = c;
              c = e;
              e = a;
            }
            zi(b, true, c, null, f, b.lastEffect);
            break;
          case "together":
            zi(b, false, null, null, void 0, b.lastEffect);
            break;
          default:
            b.memoizedState = null;
        }
        return b.child;
      }
      function hi(a, b, c) {
        null !== a && (b.dependencies = a.dependencies);
        Dg |= b.lanes;
        if (0 !== (c & b.childLanes)) {
          if (null !== a && b.child !== a.child) throw Error(y(153));
          if (null !== b.child) {
            a = b.child;
            c = Tg(a, a.pendingProps);
            b.child = c;
            for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = Tg(a, a.pendingProps), c.return = b;
            c.sibling = null;
          }
          return b.child;
        }
        return null;
      }
      var Bi;
      var Ci;
      var Di;
      var Ei;
      Bi = function(a, b) {
        for (var c = b.child; null !== c; ) {
          if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
          else if (4 !== c.tag && null !== c.child) {
            c.child.return = c;
            c = c.child;
            continue;
          }
          if (c === b) break;
          for (; null === c.sibling; ) {
            if (null === c.return || c.return === b) return;
            c = c.return;
          }
          c.sibling.return = c.return;
          c = c.sibling;
        }
      };
      Ci = function() {
      };
      Di = function(a, b, c, d) {
        var e = a.memoizedProps;
        if (e !== d) {
          a = b.stateNode;
          dh(ah.current);
          var f = null;
          switch (c) {
            case "input":
              e = Ya(a, e);
              d = Ya(a, d);
              f = [];
              break;
            case "option":
              e = eb(a, e);
              d = eb(a, d);
              f = [];
              break;
            case "select":
              e = m({}, e, { value: void 0 });
              d = m({}, d, { value: void 0 });
              f = [];
              break;
            case "textarea":
              e = gb(a, e);
              d = gb(a, d);
              f = [];
              break;
            default:
              "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = jf);
          }
          vb(c, d);
          var g;
          c = null;
          for (l in e) if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l]) if ("style" === l) {
            var h = e[l];
            for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
          } else "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ca.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
          for (l in d) {
            var k = d[l];
            h = null != e ? e[l] : void 0;
            if (d.hasOwnProperty(l) && k !== h && (null != k || null != h)) if ("style" === l) if (h) {
              for (g in h) !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
              for (g in k) k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
            } else c || (f || (f = []), f.push(l, c)), c = k;
            else "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f = f || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ca.hasOwnProperty(l) ? (null != k && "onScroll" === l && G("scroll", a), f || h === k || (f = [])) : "object" === typeof k && null !== k && k.$$typeof === Ga ? k.toString() : (f = f || []).push(l, k));
          }
          c && (f = f || []).push(
            "style",
            c
          );
          var l = f;
          if (b.updateQueue = l) b.flags |= 4;
        }
      };
      Ei = function(a, b, c, d) {
        c !== d && (b.flags |= 4);
      };
      function Fi(a, b) {
        if (!lh) switch (a.tailMode) {
          case "hidden":
            b = a.tail;
            for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
            null === c ? a.tail = null : c.sibling = null;
            break;
          case "collapsed":
            c = a.tail;
            for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
            null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
        }
      }
      function Gi(a, b, c) {
        var d = b.pendingProps;
        switch (b.tag) {
          case 2:
          case 16:
          case 15:
          case 0:
          case 11:
          case 7:
          case 8:
          case 12:
          case 9:
          case 14:
            return null;
          case 1:
            return Ff(b.type) && Gf(), null;
          case 3:
            fh();
            H(N);
            H(M);
            uh();
            d = b.stateNode;
            d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
            if (null === a || null === a.child) rh(b) ? b.flags |= 4 : d.hydrate || (b.flags |= 256);
            Ci(b);
            return null;
          case 5:
            hh(b);
            var e = dh(ch.current);
            c = b.type;
            if (null !== a && null != b.stateNode) Di(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 128);
            else {
              if (!d) {
                if (null === b.stateNode) throw Error(y(166));
                return null;
              }
              a = dh(ah.current);
              if (rh(b)) {
                d = b.stateNode;
                c = b.type;
                var f = b.memoizedProps;
                d[wf] = b;
                d[xf] = f;
                switch (c) {
                  case "dialog":
                    G("cancel", d);
                    G("close", d);
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    G("load", d);
                    break;
                  case "video":
                  case "audio":
                    for (a = 0; a < Xe.length; a++) G(Xe[a], d);
                    break;
                  case "source":
                    G("error", d);
                    break;
                  case "img":
                  case "image":
                  case "link":
                    G("error", d);
                    G("load", d);
                    break;
                  case "details":
                    G("toggle", d);
                    break;
                  case "input":
                    Za(d, f);
                    G("invalid", d);
                    break;
                  case "select":
                    d._wrapperState = { wasMultiple: !!f.multiple };
                    G("invalid", d);
                    break;
                  case "textarea":
                    hb(d, f), G("invalid", d);
                }
                vb(c, f);
                a = null;
                for (var g in f) f.hasOwnProperty(g) && (e = f[g], "children" === g ? "string" === typeof e ? d.textContent !== e && (a = ["children", e]) : "number" === typeof e && d.textContent !== "" + e && (a = ["children", "" + e]) : ca.hasOwnProperty(g) && null != e && "onScroll" === g && G("scroll", d));
                switch (c) {
                  case "input":
                    Va(d);
                    cb(d, f, true);
                    break;
                  case "textarea":
                    Va(d);
                    jb(d);
                    break;
                  case "select":
                  case "option":
                    break;
                  default:
                    "function" === typeof f.onClick && (d.onclick = jf);
                }
                d = a;
                b.updateQueue = d;
                null !== d && (b.flags |= 4);
              } else {
                g = 9 === e.nodeType ? e : e.ownerDocument;
                a === kb.html && (a = lb(c));
                a === kb.html ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
                a[wf] = b;
                a[xf] = d;
                Bi(a, b, false, false);
                b.stateNode = a;
                g = wb(c, d);
                switch (c) {
                  case "dialog":
                    G("cancel", a);
                    G("close", a);
                    e = d;
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    G("load", a);
                    e = d;
                    break;
                  case "video":
                  case "audio":
                    for (e = 0; e < Xe.length; e++) G(Xe[e], a);
                    e = d;
                    break;
                  case "source":
                    G("error", a);
                    e = d;
                    break;
                  case "img":
                  case "image":
                  case "link":
                    G("error", a);
                    G("load", a);
                    e = d;
                    break;
                  case "details":
                    G("toggle", a);
                    e = d;
                    break;
                  case "input":
                    Za(a, d);
                    e = Ya(a, d);
                    G("invalid", a);
                    break;
                  case "option":
                    e = eb(a, d);
                    break;
                  case "select":
                    a._wrapperState = { wasMultiple: !!d.multiple };
                    e = m({}, d, { value: void 0 });
                    G("invalid", a);
                    break;
                  case "textarea":
                    hb(a, d);
                    e = gb(a, d);
                    G("invalid", a);
                    break;
                  default:
                    e = d;
                }
                vb(c, e);
                var h = e;
                for (f in h) if (h.hasOwnProperty(f)) {
                  var k = h[f];
                  "style" === f ? tb(a, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, null != k && ob(a, k)) : "children" === f ? "string" === typeof k ? ("textarea" !== c || "" !== k) && pb(a, k) : "number" === typeof k && pb(a, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ca.hasOwnProperty(f) ? null != k && "onScroll" === f && G("scroll", a) : null != k && qa(a, f, k, g));
                }
                switch (c) {
                  case "input":
                    Va(a);
                    cb(a, d, false);
                    break;
                  case "textarea":
                    Va(a);
                    jb(a);
                    break;
                  case "option":
                    null != d.value && a.setAttribute("value", "" + Sa(d.value));
                    break;
                  case "select":
                    a.multiple = !!d.multiple;
                    f = d.value;
                    null != f ? fb(a, !!d.multiple, f, false) : null != d.defaultValue && fb(a, !!d.multiple, d.defaultValue, true);
                    break;
                  default:
                    "function" === typeof e.onClick && (a.onclick = jf);
                }
                mf(c, d) && (b.flags |= 4);
              }
              null !== b.ref && (b.flags |= 128);
            }
            return null;
          case 6:
            if (a && null != b.stateNode) Ei(a, b, a.memoizedProps, d);
            else {
              if ("string" !== typeof d && null === b.stateNode) throw Error(y(166));
              c = dh(ch.current);
              dh(ah.current);
              rh(b) ? (d = b.stateNode, c = b.memoizedProps, d[wf] = b, d.nodeValue !== c && (b.flags |= 4)) : (d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[wf] = b, b.stateNode = d);
            }
            return null;
          case 13:
            H(P);
            d = b.memoizedState;
            if (0 !== (b.flags & 64)) return b.lanes = c, b;
            d = null !== d;
            c = false;
            null === a ? void 0 !== b.memoizedProps.fallback && rh(b) : c = null !== a.memoizedState;
            if (d && !c && 0 !== (b.mode & 2)) if (null === a && true !== b.memoizedProps.unstable_avoidThisFallback || 0 !== (P.current & 1)) 0 === V && (V = 3);
            else {
              if (0 === V || 3 === V) V = 4;
              null === U || 0 === (Dg & 134217727) && 0 === (Hi & 134217727) || Ii(U, W);
            }
            if (d || c) b.flags |= 4;
            return null;
          case 4:
            return fh(), Ci(b), null === a && cf(b.stateNode.containerInfo), null;
          case 10:
            return rg(b), null;
          case 17:
            return Ff(b.type) && Gf(), null;
          case 19:
            H(P);
            d = b.memoizedState;
            if (null === d) return null;
            f = 0 !== (b.flags & 64);
            g = d.rendering;
            if (null === g) if (f) Fi(d, false);
            else {
              if (0 !== V || null !== a && 0 !== (a.flags & 64)) for (a = b.child; null !== a; ) {
                g = ih(a);
                if (null !== g) {
                  b.flags |= 64;
                  Fi(d, false);
                  f = g.updateQueue;
                  null !== f && (b.updateQueue = f, b.flags |= 4);
                  null === d.lastEffect && (b.firstEffect = null);
                  b.lastEffect = d.lastEffect;
                  d = c;
                  for (c = b.child; null !== c; ) f = c, a = d, f.flags &= 2, f.nextEffect = null, f.firstEffect = null, f.lastEffect = null, g = f.alternate, null === g ? (f.childLanes = 0, f.lanes = a, f.child = null, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
                  I(P, P.current & 1 | 2);
                  return b.child;
                }
                a = a.sibling;
              }
              null !== d.tail && O() > Ji && (b.flags |= 64, f = true, Fi(d, false), b.lanes = 33554432);
            }
            else {
              if (!f) if (a = ih(g), null !== a) {
                if (b.flags |= 64, f = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Fi(d, true), null === d.tail && "hidden" === d.tailMode && !g.alternate && !lh) return b = b.lastEffect = d.lastEffect, null !== b && (b.nextEffect = null), null;
              } else 2 * O() - d.renderingStartTime > Ji && 1073741824 !== c && (b.flags |= 64, f = true, Fi(d, false), b.lanes = 33554432);
              d.isBackwards ? (g.sibling = b.child, b.child = g) : (c = d.last, null !== c ? c.sibling = g : b.child = g, d.last = g);
            }
            return null !== d.tail ? (c = d.tail, d.rendering = c, d.tail = c.sibling, d.lastEffect = b.lastEffect, d.renderingStartTime = O(), c.sibling = null, b = P.current, I(P, f ? b & 1 | 2 : b & 1), c) : null;
          case 23:
          case 24:
            return Ki(), null !== a && null !== a.memoizedState !== (null !== b.memoizedState) && "unstable-defer-without-hiding" !== d.mode && (b.flags |= 4), null;
        }
        throw Error(y(156, b.tag));
      }
      function Li(a) {
        switch (a.tag) {
          case 1:
            Ff(a.type) && Gf();
            var b = a.flags;
            return b & 4096 ? (a.flags = b & -4097 | 64, a) : null;
          case 3:
            fh();
            H(N);
            H(M);
            uh();
            b = a.flags;
            if (0 !== (b & 64)) throw Error(y(285));
            a.flags = b & -4097 | 64;
            return a;
          case 5:
            return hh(a), null;
          case 13:
            return H(P), b = a.flags, b & 4096 ? (a.flags = b & -4097 | 64, a) : null;
          case 19:
            return H(P), null;
          case 4:
            return fh(), null;
          case 10:
            return rg(a), null;
          case 23:
          case 24:
            return Ki(), null;
          default:
            return null;
        }
      }
      function Mi(a, b) {
        try {
          var c = "", d = b;
          do
            c += Qa(d), d = d.return;
          while (d);
          var e = c;
        } catch (f) {
          e = "\nError generating stack: " + f.message + "\n" + f.stack;
        }
        return { value: a, source: b, stack: e };
      }
      function Ni(a, b) {
        try {
          console.error(b.value);
        } catch (c) {
          setTimeout(function() {
            throw c;
          });
        }
      }
      var Oi = "function" === typeof WeakMap ? WeakMap : Map;
      function Pi(a, b, c) {
        c = zg(-1, c);
        c.tag = 3;
        c.payload = { element: null };
        var d = b.value;
        c.callback = function() {
          Qi || (Qi = true, Ri = d);
          Ni(a, b);
        };
        return c;
      }
      function Si(a, b, c) {
        c = zg(-1, c);
        c.tag = 3;
        var d = a.type.getDerivedStateFromError;
        if ("function" === typeof d) {
          var e = b.value;
          c.payload = function() {
            Ni(a, b);
            return d(e);
          };
        }
        var f = a.stateNode;
        null !== f && "function" === typeof f.componentDidCatch && (c.callback = function() {
          "function" !== typeof d && (null === Ti ? Ti = /* @__PURE__ */ new Set([this]) : Ti.add(this), Ni(a, b));
          var c2 = b.stack;
          this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
        });
        return c;
      }
      var Ui = "function" === typeof WeakSet ? WeakSet : Set;
      function Vi(a) {
        var b = a.ref;
        if (null !== b) if ("function" === typeof b) try {
          b(null);
        } catch (c) {
          Wi(a, c);
        }
        else b.current = null;
      }
      function Xi(a, b) {
        switch (b.tag) {
          case 0:
          case 11:
          case 15:
          case 22:
            return;
          case 1:
            if (b.flags & 256 && null !== a) {
              var c = a.memoizedProps, d = a.memoizedState;
              a = b.stateNode;
              b = a.getSnapshotBeforeUpdate(b.elementType === b.type ? c : lg(b.type, c), d);
              a.__reactInternalSnapshotBeforeUpdate = b;
            }
            return;
          case 3:
            b.flags & 256 && qf(b.stateNode.containerInfo);
            return;
          case 5:
          case 6:
          case 4:
          case 17:
            return;
        }
        throw Error(y(163));
      }
      function Yi(a, b, c) {
        switch (c.tag) {
          case 0:
          case 11:
          case 15:
          case 22:
            b = c.updateQueue;
            b = null !== b ? b.lastEffect : null;
            if (null !== b) {
              a = b = b.next;
              do {
                if (3 === (a.tag & 3)) {
                  var d = a.create;
                  a.destroy = d();
                }
                a = a.next;
              } while (a !== b);
            }
            b = c.updateQueue;
            b = null !== b ? b.lastEffect : null;
            if (null !== b) {
              a = b = b.next;
              do {
                var e = a;
                d = e.next;
                e = e.tag;
                0 !== (e & 4) && 0 !== (e & 1) && (Zi(c, a), $i(c, a));
                a = d;
              } while (a !== b);
            }
            return;
          case 1:
            a = c.stateNode;
            c.flags & 4 && (null === b ? a.componentDidMount() : (d = c.elementType === c.type ? b.memoizedProps : lg(c.type, b.memoizedProps), a.componentDidUpdate(
              d,
              b.memoizedState,
              a.__reactInternalSnapshotBeforeUpdate
            )));
            b = c.updateQueue;
            null !== b && Eg(c, b, a);
            return;
          case 3:
            b = c.updateQueue;
            if (null !== b) {
              a = null;
              if (null !== c.child) switch (c.child.tag) {
                case 5:
                  a = c.child.stateNode;
                  break;
                case 1:
                  a = c.child.stateNode;
              }
              Eg(c, b, a);
            }
            return;
          case 5:
            a = c.stateNode;
            null === b && c.flags & 4 && mf(c.type, c.memoizedProps) && a.focus();
            return;
          case 6:
            return;
          case 4:
            return;
          case 12:
            return;
          case 13:
            null === c.memoizedState && (c = c.alternate, null !== c && (c = c.memoizedState, null !== c && (c = c.dehydrated, null !== c && Cc(c))));
            return;
          case 19:
          case 17:
          case 20:
          case 21:
          case 23:
          case 24:
            return;
        }
        throw Error(y(163));
      }
      function aj(a, b) {
        for (var c = a; ; ) {
          if (5 === c.tag) {
            var d = c.stateNode;
            if (b) d = d.style, "function" === typeof d.setProperty ? d.setProperty("display", "none", "important") : d.display = "none";
            else {
              d = c.stateNode;
              var e = c.memoizedProps.style;
              e = void 0 !== e && null !== e && e.hasOwnProperty("display") ? e.display : null;
              d.style.display = sb("display", e);
            }
          } else if (6 === c.tag) c.stateNode.nodeValue = b ? "" : c.memoizedProps;
          else if ((23 !== c.tag && 24 !== c.tag || null === c.memoizedState || c === a) && null !== c.child) {
            c.child.return = c;
            c = c.child;
            continue;
          }
          if (c === a) break;
          for (; null === c.sibling; ) {
            if (null === c.return || c.return === a) return;
            c = c.return;
          }
          c.sibling.return = c.return;
          c = c.sibling;
        }
      }
      function bj(a, b) {
        if (Mf && "function" === typeof Mf.onCommitFiberUnmount) try {
          Mf.onCommitFiberUnmount(Lf, b);
        } catch (f) {
        }
        switch (b.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
          case 22:
            a = b.updateQueue;
            if (null !== a && (a = a.lastEffect, null !== a)) {
              var c = a = a.next;
              do {
                var d = c, e = d.destroy;
                d = d.tag;
                if (void 0 !== e) if (0 !== (d & 4)) Zi(b, c);
                else {
                  d = b;
                  try {
                    e();
                  } catch (f) {
                    Wi(d, f);
                  }
                }
                c = c.next;
              } while (c !== a);
            }
            break;
          case 1:
            Vi(b);
            a = b.stateNode;
            if ("function" === typeof a.componentWillUnmount) try {
              a.props = b.memoizedProps, a.state = b.memoizedState, a.componentWillUnmount();
            } catch (f) {
              Wi(
                b,
                f
              );
            }
            break;
          case 5:
            Vi(b);
            break;
          case 4:
            cj(a, b);
        }
      }
      function dj(a) {
        a.alternate = null;
        a.child = null;
        a.dependencies = null;
        a.firstEffect = null;
        a.lastEffect = null;
        a.memoizedProps = null;
        a.memoizedState = null;
        a.pendingProps = null;
        a.return = null;
        a.updateQueue = null;
      }
      function ej(a) {
        return 5 === a.tag || 3 === a.tag || 4 === a.tag;
      }
      function fj(a) {
        a: {
          for (var b = a.return; null !== b; ) {
            if (ej(b)) break a;
            b = b.return;
          }
          throw Error(y(160));
        }
        var c = b;
        b = c.stateNode;
        switch (c.tag) {
          case 5:
            var d = false;
            break;
          case 3:
            b = b.containerInfo;
            d = true;
            break;
          case 4:
            b = b.containerInfo;
            d = true;
            break;
          default:
            throw Error(y(161));
        }
        c.flags & 16 && (pb(b, ""), c.flags &= -17);
        a: b: for (c = a; ; ) {
          for (; null === c.sibling; ) {
            if (null === c.return || ej(c.return)) {
              c = null;
              break a;
            }
            c = c.return;
          }
          c.sibling.return = c.return;
          for (c = c.sibling; 5 !== c.tag && 6 !== c.tag && 18 !== c.tag; ) {
            if (c.flags & 2) continue b;
            if (null === c.child || 4 === c.tag) continue b;
            else c.child.return = c, c = c.child;
          }
          if (!(c.flags & 2)) {
            c = c.stateNode;
            break a;
          }
        }
        d ? gj(a, c, b) : hj(a, c, b);
      }
      function gj(a, b, c) {
        var d = a.tag, e = 5 === d || 6 === d;
        if (e) a = e ? a.stateNode : a.stateNode.instance, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = jf));
        else if (4 !== d && (a = a.child, null !== a)) for (gj(a, b, c), a = a.sibling; null !== a; ) gj(a, b, c), a = a.sibling;
      }
      function hj(a, b, c) {
        var d = a.tag, e = 5 === d || 6 === d;
        if (e) a = e ? a.stateNode : a.stateNode.instance, b ? c.insertBefore(a, b) : c.appendChild(a);
        else if (4 !== d && (a = a.child, null !== a)) for (hj(a, b, c), a = a.sibling; null !== a; ) hj(a, b, c), a = a.sibling;
      }
      function cj(a, b) {
        for (var c = b, d = false, e, f; ; ) {
          if (!d) {
            d = c.return;
            a: for (; ; ) {
              if (null === d) throw Error(y(160));
              e = d.stateNode;
              switch (d.tag) {
                case 5:
                  f = false;
                  break a;
                case 3:
                  e = e.containerInfo;
                  f = true;
                  break a;
                case 4:
                  e = e.containerInfo;
                  f = true;
                  break a;
              }
              d = d.return;
            }
            d = true;
          }
          if (5 === c.tag || 6 === c.tag) {
            a: for (var g = a, h = c, k = h; ; ) if (bj(g, k), null !== k.child && 4 !== k.tag) k.child.return = k, k = k.child;
            else {
              if (k === h) break a;
              for (; null === k.sibling; ) {
                if (null === k.return || k.return === h) break a;
                k = k.return;
              }
              k.sibling.return = k.return;
              k = k.sibling;
            }
            f ? (g = e, h = c.stateNode, 8 === g.nodeType ? g.parentNode.removeChild(h) : g.removeChild(h)) : e.removeChild(c.stateNode);
          } else if (4 === c.tag) {
            if (null !== c.child) {
              e = c.stateNode.containerInfo;
              f = true;
              c.child.return = c;
              c = c.child;
              continue;
            }
          } else if (bj(a, c), null !== c.child) {
            c.child.return = c;
            c = c.child;
            continue;
          }
          if (c === b) break;
          for (; null === c.sibling; ) {
            if (null === c.return || c.return === b) return;
            c = c.return;
            4 === c.tag && (d = false);
          }
          c.sibling.return = c.return;
          c = c.sibling;
        }
      }
      function ij(a, b) {
        switch (b.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
          case 22:
            var c = b.updateQueue;
            c = null !== c ? c.lastEffect : null;
            if (null !== c) {
              var d = c = c.next;
              do
                3 === (d.tag & 3) && (a = d.destroy, d.destroy = void 0, void 0 !== a && a()), d = d.next;
              while (d !== c);
            }
            return;
          case 1:
            return;
          case 5:
            c = b.stateNode;
            if (null != c) {
              d = b.memoizedProps;
              var e = null !== a ? a.memoizedProps : d;
              a = b.type;
              var f = b.updateQueue;
              b.updateQueue = null;
              if (null !== f) {
                c[xf] = d;
                "input" === a && "radio" === d.type && null != d.name && $a(c, d);
                wb(a, e);
                b = wb(a, d);
                for (e = 0; e < f.length; e += 2) {
                  var g = f[e], h = f[e + 1];
                  "style" === g ? tb(c, h) : "dangerouslySetInnerHTML" === g ? ob(c, h) : "children" === g ? pb(c, h) : qa(c, g, h, b);
                }
                switch (a) {
                  case "input":
                    ab(c, d);
                    break;
                  case "textarea":
                    ib(c, d);
                    break;
                  case "select":
                    a = c._wrapperState.wasMultiple, c._wrapperState.wasMultiple = !!d.multiple, f = d.value, null != f ? fb(c, !!d.multiple, f, false) : a !== !!d.multiple && (null != d.defaultValue ? fb(c, !!d.multiple, d.defaultValue, true) : fb(c, !!d.multiple, d.multiple ? [] : "", false));
                }
              }
            }
            return;
          case 6:
            if (null === b.stateNode) throw Error(y(162));
            b.stateNode.nodeValue = b.memoizedProps;
            return;
          case 3:
            c = b.stateNode;
            c.hydrate && (c.hydrate = false, Cc(c.containerInfo));
            return;
          case 12:
            return;
          case 13:
            null !== b.memoizedState && (jj = O(), aj(b.child, true));
            kj(b);
            return;
          case 19:
            kj(b);
            return;
          case 17:
            return;
          case 23:
          case 24:
            aj(b, null !== b.memoizedState);
            return;
        }
        throw Error(y(163));
      }
      function kj(a) {
        var b = a.updateQueue;
        if (null !== b) {
          a.updateQueue = null;
          var c = a.stateNode;
          null === c && (c = a.stateNode = new Ui());
          b.forEach(function(b2) {
            var d = lj.bind(null, a, b2);
            c.has(b2) || (c.add(b2), b2.then(d, d));
          });
        }
      }
      function mj(a, b) {
        return null !== a && (a = a.memoizedState, null === a || null !== a.dehydrated) ? (b = b.memoizedState, null !== b && null === b.dehydrated) : false;
      }
      var nj = Math.ceil;
      var oj = ra.ReactCurrentDispatcher;
      var pj = ra.ReactCurrentOwner;
      var X = 0;
      var U = null;
      var Y = null;
      var W = 0;
      var qj = 0;
      var rj = Bf(0);
      var V = 0;
      var sj = null;
      var tj = 0;
      var Dg = 0;
      var Hi = 0;
      var uj = 0;
      var vj = null;
      var jj = 0;
      var Ji = Infinity;
      function wj() {
        Ji = O() + 500;
      }
      var Z = null;
      var Qi = false;
      var Ri = null;
      var Ti = null;
      var xj = false;
      var yj = null;
      var zj = 90;
      var Aj = [];
      var Bj = [];
      var Cj = null;
      var Dj = 0;
      var Ej = null;
      var Fj = -1;
      var Gj = 0;
      var Hj = 0;
      var Ij = null;
      var Jj = false;
      function Hg() {
        return 0 !== (X & 48) ? O() : -1 !== Fj ? Fj : Fj = O();
      }
      function Ig(a) {
        a = a.mode;
        if (0 === (a & 2)) return 1;
        if (0 === (a & 4)) return 99 === eg() ? 1 : 2;
        0 === Gj && (Gj = tj);
        if (0 !== kg.transition) {
          0 !== Hj && (Hj = null !== vj ? vj.pendingLanes : 0);
          a = Gj;
          var b = 4186112 & ~Hj;
          b &= -b;
          0 === b && (a = 4186112 & ~a, b = a & -a, 0 === b && (b = 8192));
          return b;
        }
        a = eg();
        0 !== (X & 4) && 98 === a ? a = Xc(12, Gj) : (a = Sc(a), a = Xc(a, Gj));
        return a;
      }
      function Jg(a, b, c) {
        if (50 < Dj) throw Dj = 0, Ej = null, Error(y(185));
        a = Kj(a, b);
        if (null === a) return null;
        $c(a, b, c);
        a === U && (Hi |= b, 4 === V && Ii(a, W));
        var d = eg();
        1 === b ? 0 !== (X & 8) && 0 === (X & 48) ? Lj(a) : (Mj(a, c), 0 === X && (wj(), ig())) : (0 === (X & 4) || 98 !== d && 99 !== d || (null === Cj ? Cj = /* @__PURE__ */ new Set([a]) : Cj.add(a)), Mj(a, c));
        vj = a;
      }
      function Kj(a, b) {
        a.lanes |= b;
        var c = a.alternate;
        null !== c && (c.lanes |= b);
        c = a;
        for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
        return 3 === c.tag ? c.stateNode : null;
      }
      function Mj(a, b) {
        for (var c = a.callbackNode, d = a.suspendedLanes, e = a.pingedLanes, f = a.expirationTimes, g = a.pendingLanes; 0 < g; ) {
          var h = 31 - Vc(g), k = 1 << h, l = f[h];
          if (-1 === l) {
            if (0 === (k & d) || 0 !== (k & e)) {
              l = b;
              Rc(k);
              var n = F;
              f[h] = 10 <= n ? l + 250 : 6 <= n ? l + 5e3 : -1;
            }
          } else l <= b && (a.expiredLanes |= k);
          g &= ~k;
        }
        d = Uc(a, a === U ? W : 0);
        b = F;
        if (0 === d) null !== c && (c !== Zf && Pf(c), a.callbackNode = null, a.callbackPriority = 0);
        else {
          if (null !== c) {
            if (a.callbackPriority === b) return;
            c !== Zf && Pf(c);
          }
          15 === b ? (c = Lj.bind(null, a), null === ag ? (ag = [c], bg = Of(Uf, jg)) : ag.push(c), c = Zf) : 14 === b ? c = hg(99, Lj.bind(null, a)) : (c = Tc(b), c = hg(c, Nj.bind(null, a)));
          a.callbackPriority = b;
          a.callbackNode = c;
        }
      }
      function Nj(a) {
        Fj = -1;
        Hj = Gj = 0;
        if (0 !== (X & 48)) throw Error(y(327));
        var b = a.callbackNode;
        if (Oj() && a.callbackNode !== b) return null;
        var c = Uc(a, a === U ? W : 0);
        if (0 === c) return null;
        var d = c;
        var e = X;
        X |= 16;
        var f = Pj();
        if (U !== a || W !== d) wj(), Qj(a, d);
        do
          try {
            Rj();
            break;
          } catch (h) {
            Sj(a, h);
          }
        while (1);
        qg();
        oj.current = f;
        X = e;
        null !== Y ? d = 0 : (U = null, W = 0, d = V);
        if (0 !== (tj & Hi)) Qj(a, 0);
        else if (0 !== d) {
          2 === d && (X |= 64, a.hydrate && (a.hydrate = false, qf(a.containerInfo)), c = Wc(a), 0 !== c && (d = Tj(a, c)));
          if (1 === d) throw b = sj, Qj(a, 0), Ii(a, c), Mj(a, O()), b;
          a.finishedWork = a.current.alternate;
          a.finishedLanes = c;
          switch (d) {
            case 0:
            case 1:
              throw Error(y(345));
            case 2:
              Uj(a);
              break;
            case 3:
              Ii(a, c);
              if ((c & 62914560) === c && (d = jj + 500 - O(), 10 < d)) {
                if (0 !== Uc(a, 0)) break;
                e = a.suspendedLanes;
                if ((e & c) !== c) {
                  Hg();
                  a.pingedLanes |= a.suspendedLanes & e;
                  break;
                }
                a.timeoutHandle = of(Uj.bind(null, a), d);
                break;
              }
              Uj(a);
              break;
            case 4:
              Ii(a, c);
              if ((c & 4186112) === c) break;
              d = a.eventTimes;
              for (e = -1; 0 < c; ) {
                var g = 31 - Vc(c);
                f = 1 << g;
                g = d[g];
                g > e && (e = g);
                c &= ~f;
              }
              c = e;
              c = O() - c;
              c = (120 > c ? 120 : 480 > c ? 480 : 1080 > c ? 1080 : 1920 > c ? 1920 : 3e3 > c ? 3e3 : 4320 > c ? 4320 : 1960 * nj(c / 1960)) - c;
              if (10 < c) {
                a.timeoutHandle = of(Uj.bind(null, a), c);
                break;
              }
              Uj(a);
              break;
            case 5:
              Uj(a);
              break;
            default:
              throw Error(y(329));
          }
        }
        Mj(a, O());
        return a.callbackNode === b ? Nj.bind(null, a) : null;
      }
      function Ii(a, b) {
        b &= ~uj;
        b &= ~Hi;
        a.suspendedLanes |= b;
        a.pingedLanes &= ~b;
        for (a = a.expirationTimes; 0 < b; ) {
          var c = 31 - Vc(b), d = 1 << c;
          a[c] = -1;
          b &= ~d;
        }
      }
      function Lj(a) {
        if (0 !== (X & 48)) throw Error(y(327));
        Oj();
        if (a === U && 0 !== (a.expiredLanes & W)) {
          var b = W;
          var c = Tj(a, b);
          0 !== (tj & Hi) && (b = Uc(a, b), c = Tj(a, b));
        } else b = Uc(a, 0), c = Tj(a, b);
        0 !== a.tag && 2 === c && (X |= 64, a.hydrate && (a.hydrate = false, qf(a.containerInfo)), b = Wc(a), 0 !== b && (c = Tj(a, b)));
        if (1 === c) throw c = sj, Qj(a, 0), Ii(a, b), Mj(a, O()), c;
        a.finishedWork = a.current.alternate;
        a.finishedLanes = b;
        Uj(a);
        Mj(a, O());
        return null;
      }
      function Vj() {
        if (null !== Cj) {
          var a = Cj;
          Cj = null;
          a.forEach(function(a2) {
            a2.expiredLanes |= 24 & a2.pendingLanes;
            Mj(a2, O());
          });
        }
        ig();
      }
      function Wj(a, b) {
        var c = X;
        X |= 1;
        try {
          return a(b);
        } finally {
          X = c, 0 === X && (wj(), ig());
        }
      }
      function Xj(a, b) {
        var c = X;
        X &= -2;
        X |= 8;
        try {
          return a(b);
        } finally {
          X = c, 0 === X && (wj(), ig());
        }
      }
      function ni(a, b) {
        I(rj, qj);
        qj |= b;
        tj |= b;
      }
      function Ki() {
        qj = rj.current;
        H(rj);
      }
      function Qj(a, b) {
        a.finishedWork = null;
        a.finishedLanes = 0;
        var c = a.timeoutHandle;
        -1 !== c && (a.timeoutHandle = -1, pf(c));
        if (null !== Y) for (c = Y.return; null !== c; ) {
          var d = c;
          switch (d.tag) {
            case 1:
              d = d.type.childContextTypes;
              null !== d && void 0 !== d && Gf();
              break;
            case 3:
              fh();
              H(N);
              H(M);
              uh();
              break;
            case 5:
              hh(d);
              break;
            case 4:
              fh();
              break;
            case 13:
              H(P);
              break;
            case 19:
              H(P);
              break;
            case 10:
              rg(d);
              break;
            case 23:
            case 24:
              Ki();
          }
          c = c.return;
        }
        U = a;
        Y = Tg(a.current, null);
        W = qj = tj = b;
        V = 0;
        sj = null;
        uj = Hi = Dg = 0;
      }
      function Sj(a, b) {
        do {
          var c = Y;
          try {
            qg();
            vh.current = Gh;
            if (yh) {
              for (var d = R.memoizedState; null !== d; ) {
                var e = d.queue;
                null !== e && (e.pending = null);
                d = d.next;
              }
              yh = false;
            }
            xh = 0;
            T = S = R = null;
            zh = false;
            pj.current = null;
            if (null === c || null === c.return) {
              V = 1;
              sj = b;
              Y = null;
              break;
            }
            a: {
              var f = a, g = c.return, h = c, k = b;
              b = W;
              h.flags |= 2048;
              h.firstEffect = h.lastEffect = null;
              if (null !== k && "object" === typeof k && "function" === typeof k.then) {
                var l = k;
                if (0 === (h.mode & 2)) {
                  var n = h.alternate;
                  n ? (h.updateQueue = n.updateQueue, h.memoizedState = n.memoizedState, h.lanes = n.lanes) : (h.updateQueue = null, h.memoizedState = null);
                }
                var A = 0 !== (P.current & 1), p = g;
                do {
                  var C;
                  if (C = 13 === p.tag) {
                    var x = p.memoizedState;
                    if (null !== x) C = null !== x.dehydrated ? true : false;
                    else {
                      var w = p.memoizedProps;
                      C = void 0 === w.fallback ? false : true !== w.unstable_avoidThisFallback ? true : A ? false : true;
                    }
                  }
                  if (C) {
                    var z = p.updateQueue;
                    if (null === z) {
                      var u = /* @__PURE__ */ new Set();
                      u.add(l);
                      p.updateQueue = u;
                    } else z.add(l);
                    if (0 === (p.mode & 2)) {
                      p.flags |= 64;
                      h.flags |= 16384;
                      h.flags &= -2981;
                      if (1 === h.tag) if (null === h.alternate) h.tag = 17;
                      else {
                        var t = zg(-1, 1);
                        t.tag = 2;
                        Ag(h, t);
                      }
                      h.lanes |= 1;
                      break a;
                    }
                    k = void 0;
                    h = b;
                    var q = f.pingCache;
                    null === q ? (q = f.pingCache = new Oi(), k = /* @__PURE__ */ new Set(), q.set(l, k)) : (k = q.get(l), void 0 === k && (k = /* @__PURE__ */ new Set(), q.set(l, k)));
                    if (!k.has(h)) {
                      k.add(h);
                      var v = Yj.bind(null, f, l, h);
                      l.then(v, v);
                    }
                    p.flags |= 4096;
                    p.lanes = b;
                    break a;
                  }
                  p = p.return;
                } while (null !== p);
                k = Error((Ra(h.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.");
              }
              5 !== V && (V = 2);
              k = Mi(k, h);
              p = g;
              do {
                switch (p.tag) {
                  case 3:
                    f = k;
                    p.flags |= 4096;
                    b &= -b;
                    p.lanes |= b;
                    var J = Pi(p, f, b);
                    Bg(p, J);
                    break a;
                  case 1:
                    f = k;
                    var K = p.type, Q = p.stateNode;
                    if (0 === (p.flags & 64) && ("function" === typeof K.getDerivedStateFromError || null !== Q && "function" === typeof Q.componentDidCatch && (null === Ti || !Ti.has(Q)))) {
                      p.flags |= 4096;
                      b &= -b;
                      p.lanes |= b;
                      var L = Si(p, f, b);
                      Bg(p, L);
                      break a;
                    }
                }
                p = p.return;
              } while (null !== p);
            }
            Zj(c);
          } catch (va) {
            b = va;
            Y === c && null !== c && (Y = c = c.return);
            continue;
          }
          break;
        } while (1);
      }
      function Pj() {
        var a = oj.current;
        oj.current = Gh;
        return null === a ? Gh : a;
      }
      function Tj(a, b) {
        var c = X;
        X |= 16;
        var d = Pj();
        U === a && W === b || Qj(a, b);
        do
          try {
            ak();
            break;
          } catch (e) {
            Sj(a, e);
          }
        while (1);
        qg();
        X = c;
        oj.current = d;
        if (null !== Y) throw Error(y(261));
        U = null;
        W = 0;
        return V;
      }
      function ak() {
        for (; null !== Y; ) bk(Y);
      }
      function Rj() {
        for (; null !== Y && !Qf(); ) bk(Y);
      }
      function bk(a) {
        var b = ck(a.alternate, a, qj);
        a.memoizedProps = a.pendingProps;
        null === b ? Zj(a) : Y = b;
        pj.current = null;
      }
      function Zj(a) {
        var b = a;
        do {
          var c = b.alternate;
          a = b.return;
          if (0 === (b.flags & 2048)) {
            c = Gi(c, b, qj);
            if (null !== c) {
              Y = c;
              return;
            }
            c = b;
            if (24 !== c.tag && 23 !== c.tag || null === c.memoizedState || 0 !== (qj & 1073741824) || 0 === (c.mode & 4)) {
              for (var d = 0, e = c.child; null !== e; ) d |= e.lanes | e.childLanes, e = e.sibling;
              c.childLanes = d;
            }
            null !== a && 0 === (a.flags & 2048) && (null === a.firstEffect && (a.firstEffect = b.firstEffect), null !== b.lastEffect && (null !== a.lastEffect && (a.lastEffect.nextEffect = b.firstEffect), a.lastEffect = b.lastEffect), 1 < b.flags && (null !== a.lastEffect ? a.lastEffect.nextEffect = b : a.firstEffect = b, a.lastEffect = b));
          } else {
            c = Li(b);
            if (null !== c) {
              c.flags &= 2047;
              Y = c;
              return;
            }
            null !== a && (a.firstEffect = a.lastEffect = null, a.flags |= 2048);
          }
          b = b.sibling;
          if (null !== b) {
            Y = b;
            return;
          }
          Y = b = a;
        } while (null !== b);
        0 === V && (V = 5);
      }
      function Uj(a) {
        var b = eg();
        gg(99, dk.bind(null, a, b));
        return null;
      }
      function dk(a, b) {
        do
          Oj();
        while (null !== yj);
        if (0 !== (X & 48)) throw Error(y(327));
        var c = a.finishedWork;
        if (null === c) return null;
        a.finishedWork = null;
        a.finishedLanes = 0;
        if (c === a.current) throw Error(y(177));
        a.callbackNode = null;
        var d = c.lanes | c.childLanes, e = d, f = a.pendingLanes & ~e;
        a.pendingLanes = e;
        a.suspendedLanes = 0;
        a.pingedLanes = 0;
        a.expiredLanes &= e;
        a.mutableReadLanes &= e;
        a.entangledLanes &= e;
        e = a.entanglements;
        for (var g = a.eventTimes, h = a.expirationTimes; 0 < f; ) {
          var k = 31 - Vc(f), l = 1 << k;
          e[k] = 0;
          g[k] = -1;
          h[k] = -1;
          f &= ~l;
        }
        null !== Cj && 0 === (d & 24) && Cj.has(a) && Cj.delete(a);
        a === U && (Y = U = null, W = 0);
        1 < c.flags ? null !== c.lastEffect ? (c.lastEffect.nextEffect = c, d = c.firstEffect) : d = c : d = c.firstEffect;
        if (null !== d) {
          e = X;
          X |= 32;
          pj.current = null;
          kf = fd;
          g = Ne();
          if (Oe(g)) {
            if ("selectionStart" in g) h = { start: g.selectionStart, end: g.selectionEnd };
            else a: if (h = (h = g.ownerDocument) && h.defaultView || window, (l = h.getSelection && h.getSelection()) && 0 !== l.rangeCount) {
              h = l.anchorNode;
              f = l.anchorOffset;
              k = l.focusNode;
              l = l.focusOffset;
              try {
                h.nodeType, k.nodeType;
              } catch (va) {
                h = null;
                break a;
              }
              var n = 0, A = -1, p = -1, C = 0, x = 0, w = g, z = null;
              b: for (; ; ) {
                for (var u; ; ) {
                  w !== h || 0 !== f && 3 !== w.nodeType || (A = n + f);
                  w !== k || 0 !== l && 3 !== w.nodeType || (p = n + l);
                  3 === w.nodeType && (n += w.nodeValue.length);
                  if (null === (u = w.firstChild)) break;
                  z = w;
                  w = u;
                }
                for (; ; ) {
                  if (w === g) break b;
                  z === h && ++C === f && (A = n);
                  z === k && ++x === l && (p = n);
                  if (null !== (u = w.nextSibling)) break;
                  w = z;
                  z = w.parentNode;
                }
                w = u;
              }
              h = -1 === A || -1 === p ? null : { start: A, end: p };
            } else h = null;
            h = h || { start: 0, end: 0 };
          } else h = null;
          lf = { focusedElem: g, selectionRange: h };
          fd = false;
          Ij = null;
          Jj = false;
          Z = d;
          do
            try {
              ek();
            } catch (va) {
              if (null === Z) throw Error(y(330));
              Wi(Z, va);
              Z = Z.nextEffect;
            }
          while (null !== Z);
          Ij = null;
          Z = d;
          do
            try {
              for (g = a; null !== Z; ) {
                var t = Z.flags;
                t & 16 && pb(Z.stateNode, "");
                if (t & 128) {
                  var q = Z.alternate;
                  if (null !== q) {
                    var v = q.ref;
                    null !== v && ("function" === typeof v ? v(null) : v.current = null);
                  }
                }
                switch (t & 1038) {
                  case 2:
                    fj(Z);
                    Z.flags &= -3;
                    break;
                  case 6:
                    fj(Z);
                    Z.flags &= -3;
                    ij(Z.alternate, Z);
                    break;
                  case 1024:
                    Z.flags &= -1025;
                    break;
                  case 1028:
                    Z.flags &= -1025;
                    ij(Z.alternate, Z);
                    break;
                  case 4:
                    ij(Z.alternate, Z);
                    break;
                  case 8:
                    h = Z;
                    cj(g, h);
                    var J = h.alternate;
                    dj(h);
                    null !== J && dj(J);
                }
                Z = Z.nextEffect;
              }
            } catch (va) {
              if (null === Z) throw Error(y(330));
              Wi(Z, va);
              Z = Z.nextEffect;
            }
          while (null !== Z);
          v = lf;
          q = Ne();
          t = v.focusedElem;
          g = v.selectionRange;
          if (q !== t && t && t.ownerDocument && Me(t.ownerDocument.documentElement, t)) {
            null !== g && Oe(t) && (q = g.start, v = g.end, void 0 === v && (v = q), "selectionStart" in t ? (t.selectionStart = q, t.selectionEnd = Math.min(v, t.value.length)) : (v = (q = t.ownerDocument || document) && q.defaultView || window, v.getSelection && (v = v.getSelection(), h = t.textContent.length, J = Math.min(g.start, h), g = void 0 === g.end ? J : Math.min(g.end, h), !v.extend && J > g && (h = g, g = J, J = h), h = Le(t, J), f = Le(t, g), h && f && (1 !== v.rangeCount || v.anchorNode !== h.node || v.anchorOffset !== h.offset || v.focusNode !== f.node || v.focusOffset !== f.offset) && (q = q.createRange(), q.setStart(h.node, h.offset), v.removeAllRanges(), J > g ? (v.addRange(q), v.extend(f.node, f.offset)) : (q.setEnd(f.node, f.offset), v.addRange(q))))));
            q = [];
            for (v = t; v = v.parentNode; ) 1 === v.nodeType && q.push({ element: v, left: v.scrollLeft, top: v.scrollTop });
            "function" === typeof t.focus && t.focus();
            for (t = 0; t < q.length; t++) v = q[t], v.element.scrollLeft = v.left, v.element.scrollTop = v.top;
          }
          fd = !!kf;
          lf = kf = null;
          a.current = c;
          Z = d;
          do
            try {
              for (t = a; null !== Z; ) {
                var K = Z.flags;
                K & 36 && Yi(t, Z.alternate, Z);
                if (K & 128) {
                  q = void 0;
                  var Q = Z.ref;
                  if (null !== Q) {
                    var L = Z.stateNode;
                    switch (Z.tag) {
                      case 5:
                        q = L;
                        break;
                      default:
                        q = L;
                    }
                    "function" === typeof Q ? Q(q) : Q.current = q;
                  }
                }
                Z = Z.nextEffect;
              }
            } catch (va) {
              if (null === Z) throw Error(y(330));
              Wi(Z, va);
              Z = Z.nextEffect;
            }
          while (null !== Z);
          Z = null;
          $f();
          X = e;
        } else a.current = c;
        if (xj) xj = false, yj = a, zj = b;
        else for (Z = d; null !== Z; ) b = Z.nextEffect, Z.nextEffect = null, Z.flags & 8 && (K = Z, K.sibling = null, K.stateNode = null), Z = b;
        d = a.pendingLanes;
        0 === d && (Ti = null);
        1 === d ? a === Ej ? Dj++ : (Dj = 0, Ej = a) : Dj = 0;
        c = c.stateNode;
        if (Mf && "function" === typeof Mf.onCommitFiberRoot) try {
          Mf.onCommitFiberRoot(Lf, c, void 0, 64 === (c.current.flags & 64));
        } catch (va) {
        }
        Mj(a, O());
        if (Qi) throw Qi = false, a = Ri, Ri = null, a;
        if (0 !== (X & 8)) return null;
        ig();
        return null;
      }
      function ek() {
        for (; null !== Z; ) {
          var a = Z.alternate;
          Jj || null === Ij || (0 !== (Z.flags & 8) ? dc(Z, Ij) && (Jj = true) : 13 === Z.tag && mj(a, Z) && dc(Z, Ij) && (Jj = true));
          var b = Z.flags;
          0 !== (b & 256) && Xi(a, Z);
          0 === (b & 512) || xj || (xj = true, hg(97, function() {
            Oj();
            return null;
          }));
          Z = Z.nextEffect;
        }
      }
      function Oj() {
        if (90 !== zj) {
          var a = 97 < zj ? 97 : zj;
          zj = 90;
          return gg(a, fk);
        }
        return false;
      }
      function $i(a, b) {
        Aj.push(b, a);
        xj || (xj = true, hg(97, function() {
          Oj();
          return null;
        }));
      }
      function Zi(a, b) {
        Bj.push(b, a);
        xj || (xj = true, hg(97, function() {
          Oj();
          return null;
        }));
      }
      function fk() {
        if (null === yj) return false;
        var a = yj;
        yj = null;
        if (0 !== (X & 48)) throw Error(y(331));
        var b = X;
        X |= 32;
        var c = Bj;
        Bj = [];
        for (var d = 0; d < c.length; d += 2) {
          var e = c[d], f = c[d + 1], g = e.destroy;
          e.destroy = void 0;
          if ("function" === typeof g) try {
            g();
          } catch (k) {
            if (null === f) throw Error(y(330));
            Wi(f, k);
          }
        }
        c = Aj;
        Aj = [];
        for (d = 0; d < c.length; d += 2) {
          e = c[d];
          f = c[d + 1];
          try {
            var h = e.create;
            e.destroy = h();
          } catch (k) {
            if (null === f) throw Error(y(330));
            Wi(f, k);
          }
        }
        for (h = a.current.firstEffect; null !== h; ) a = h.nextEffect, h.nextEffect = null, h.flags & 8 && (h.sibling = null, h.stateNode = null), h = a;
        X = b;
        ig();
        return true;
      }
      function gk(a, b, c) {
        b = Mi(c, b);
        b = Pi(a, b, 1);
        Ag(a, b);
        b = Hg();
        a = Kj(a, 1);
        null !== a && ($c(a, 1, b), Mj(a, b));
      }
      function Wi(a, b) {
        if (3 === a.tag) gk(a, a, b);
        else for (var c = a.return; null !== c; ) {
          if (3 === c.tag) {
            gk(c, a, b);
            break;
          } else if (1 === c.tag) {
            var d = c.stateNode;
            if ("function" === typeof c.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ti || !Ti.has(d))) {
              a = Mi(b, a);
              var e = Si(c, a, 1);
              Ag(c, e);
              e = Hg();
              c = Kj(c, 1);
              if (null !== c) $c(c, 1, e), Mj(c, e);
              else if ("function" === typeof d.componentDidCatch && (null === Ti || !Ti.has(d))) try {
                d.componentDidCatch(b, a);
              } catch (f) {
              }
              break;
            }
          }
          c = c.return;
        }
      }
      function Yj(a, b, c) {
        var d = a.pingCache;
        null !== d && d.delete(b);
        b = Hg();
        a.pingedLanes |= a.suspendedLanes & c;
        U === a && (W & c) === c && (4 === V || 3 === V && (W & 62914560) === W && 500 > O() - jj ? Qj(a, 0) : uj |= c);
        Mj(a, b);
      }
      function lj(a, b) {
        var c = a.stateNode;
        null !== c && c.delete(b);
        b = 0;
        0 === b && (b = a.mode, 0 === (b & 2) ? b = 1 : 0 === (b & 4) ? b = 99 === eg() ? 1 : 2 : (0 === Gj && (Gj = tj), b = Yc(62914560 & ~Gj), 0 === b && (b = 4194304)));
        c = Hg();
        a = Kj(a, b);
        null !== a && ($c(a, b, c), Mj(a, c));
      }
      var ck;
      ck = function(a, b, c) {
        var d = b.lanes;
        if (null !== a) if (a.memoizedProps !== b.pendingProps || N.current) ug = true;
        else if (0 !== (c & d)) ug = 0 !== (a.flags & 16384) ? true : false;
        else {
          ug = false;
          switch (b.tag) {
            case 3:
              ri(b);
              sh();
              break;
            case 5:
              gh(b);
              break;
            case 1:
              Ff(b.type) && Jf(b);
              break;
            case 4:
              eh(b, b.stateNode.containerInfo);
              break;
            case 10:
              d = b.memoizedProps.value;
              var e = b.type._context;
              I(mg, e._currentValue);
              e._currentValue = d;
              break;
            case 13:
              if (null !== b.memoizedState) {
                if (0 !== (c & b.child.childLanes)) return ti(a, b, c);
                I(P, P.current & 1);
                b = hi(a, b, c);
                return null !== b ? b.sibling : null;
              }
              I(P, P.current & 1);
              break;
            case 19:
              d = 0 !== (c & b.childLanes);
              if (0 !== (a.flags & 64)) {
                if (d) return Ai(a, b, c);
                b.flags |= 64;
              }
              e = b.memoizedState;
              null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
              I(P, P.current);
              if (d) break;
              else return null;
            case 23:
            case 24:
              return b.lanes = 0, mi(a, b, c);
          }
          return hi(a, b, c);
        }
        else ug = false;
        b.lanes = 0;
        switch (b.tag) {
          case 2:
            d = b.type;
            null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
            a = b.pendingProps;
            e = Ef(b, M.current);
            tg(b, c);
            e = Ch(null, b, d, a, e, c);
            b.flags |= 1;
            if ("object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof) {
              b.tag = 1;
              b.memoizedState = null;
              b.updateQueue = null;
              if (Ff(d)) {
                var f = true;
                Jf(b);
              } else f = false;
              b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null;
              xg(b);
              var g = d.getDerivedStateFromProps;
              "function" === typeof g && Gg(b, d, g, a);
              e.updater = Kg;
              b.stateNode = e;
              e._reactInternals = b;
              Og(b, d, a, c);
              b = qi(null, b, d, true, f, c);
            } else b.tag = 0, fi(null, b, e, c), b = b.child;
            return b;
          case 16:
            e = b.elementType;
            a: {
              null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
              a = b.pendingProps;
              f = e._init;
              e = f(e._payload);
              b.type = e;
              f = b.tag = hk(e);
              a = lg(e, a);
              switch (f) {
                case 0:
                  b = li(null, b, e, a, c);
                  break a;
                case 1:
                  b = pi(null, b, e, a, c);
                  break a;
                case 11:
                  b = gi(null, b, e, a, c);
                  break a;
                case 14:
                  b = ii(null, b, e, lg(e.type, a), d, c);
                  break a;
              }
              throw Error(y(306, e, ""));
            }
            return b;
          case 0:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), li(a, b, d, e, c);
          case 1:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), pi(a, b, d, e, c);
          case 3:
            ri(b);
            d = b.updateQueue;
            if (null === a || null === d) throw Error(y(282));
            d = b.pendingProps;
            e = b.memoizedState;
            e = null !== e ? e.element : null;
            yg(a, b);
            Cg(b, d, null, c);
            d = b.memoizedState.element;
            if (d === e) sh(), b = hi(a, b, c);
            else {
              e = b.stateNode;
              if (f = e.hydrate) kh = rf(b.stateNode.containerInfo.firstChild), jh = b, f = lh = true;
              if (f) {
                a = e.mutableSourceEagerHydrationData;
                if (null != a) for (e = 0; e < a.length; e += 2) f = a[e], f._workInProgressVersionPrimary = a[e + 1], th.push(f);
                c = Zg(b, null, d, c);
                for (b.child = c; c; ) c.flags = c.flags & -3 | 1024, c = c.sibling;
              } else fi(a, b, d, c), sh();
              b = b.child;
            }
            return b;
          case 5:
            return gh(b), null === a && ph(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, nf(d, e) ? g = null : null !== f && nf(d, f) && (b.flags |= 16), oi(a, b), fi(a, b, g, c), b.child;
          case 6:
            return null === a && ph(b), null;
          case 13:
            return ti(a, b, c);
          case 4:
            return eh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Yg(b, null, d, c) : fi(a, b, d, c), b.child;
          case 11:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), gi(a, b, d, e, c);
          case 7:
            return fi(a, b, b.pendingProps, c), b.child;
          case 8:
            return fi(
              a,
              b,
              b.pendingProps.children,
              c
            ), b.child;
          case 12:
            return fi(a, b, b.pendingProps.children, c), b.child;
          case 10:
            a: {
              d = b.type._context;
              e = b.pendingProps;
              g = b.memoizedProps;
              f = e.value;
              var h = b.type._context;
              I(mg, h._currentValue);
              h._currentValue = f;
              if (null !== g) if (h = g.value, f = He(h, f) ? 0 : ("function" === typeof d._calculateChangedBits ? d._calculateChangedBits(h, f) : 1073741823) | 0, 0 === f) {
                if (g.children === e.children && !N.current) {
                  b = hi(a, b, c);
                  break a;
                }
              } else for (h = b.child, null !== h && (h.return = b); null !== h; ) {
                var k = h.dependencies;
                if (null !== k) {
                  g = h.child;
                  for (var l = k.firstContext; null !== l; ) {
                    if (l.context === d && 0 !== (l.observedBits & f)) {
                      1 === h.tag && (l = zg(-1, c & -c), l.tag = 2, Ag(h, l));
                      h.lanes |= c;
                      l = h.alternate;
                      null !== l && (l.lanes |= c);
                      sg(h.return, c);
                      k.lanes |= c;
                      break;
                    }
                    l = l.next;
                  }
                } else g = 10 === h.tag ? h.type === b.type ? null : h.child : h.child;
                if (null !== g) g.return = h;
                else for (g = h; null !== g; ) {
                  if (g === b) {
                    g = null;
                    break;
                  }
                  h = g.sibling;
                  if (null !== h) {
                    h.return = g.return;
                    g = h;
                    break;
                  }
                  g = g.return;
                }
                h = g;
              }
              fi(a, b, e.children, c);
              b = b.child;
            }
            return b;
          case 9:
            return e = b.type, f = b.pendingProps, d = f.children, tg(b, c), e = vg(
              e,
              f.unstable_observedBits
            ), d = d(e), b.flags |= 1, fi(a, b, d, c), b.child;
          case 14:
            return e = b.type, f = lg(e, b.pendingProps), f = lg(e.type, f), ii(a, b, e, f, d, c);
          case 15:
            return ki(a, b, b.type, b.pendingProps, d, c);
          case 17:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2), b.tag = 1, Ff(d) ? (a = true, Jf(b)) : a = false, tg(b, c), Mg(b, d, e), Og(b, d, e, c), qi(null, b, d, true, a, c);
          case 19:
            return Ai(a, b, c);
          case 23:
            return mi(a, b, c);
          case 24:
            return mi(a, b, c);
        }
        throw Error(y(156, b.tag));
      };
      function ik(a, b, c, d) {
        this.tag = a;
        this.key = c;
        this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
        this.index = 0;
        this.ref = null;
        this.pendingProps = b;
        this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
        this.mode = d;
        this.flags = 0;
        this.lastEffect = this.firstEffect = this.nextEffect = null;
        this.childLanes = this.lanes = 0;
        this.alternate = null;
      }
      function nh(a, b, c, d) {
        return new ik(a, b, c, d);
      }
      function ji(a) {
        a = a.prototype;
        return !(!a || !a.isReactComponent);
      }
      function hk(a) {
        if ("function" === typeof a) return ji(a) ? 1 : 0;
        if (void 0 !== a && null !== a) {
          a = a.$$typeof;
          if (a === Aa) return 11;
          if (a === Da) return 14;
        }
        return 2;
      }
      function Tg(a, b) {
        var c = a.alternate;
        null === c ? (c = nh(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.nextEffect = null, c.firstEffect = null, c.lastEffect = null);
        c.childLanes = a.childLanes;
        c.lanes = a.lanes;
        c.child = a.child;
        c.memoizedProps = a.memoizedProps;
        c.memoizedState = a.memoizedState;
        c.updateQueue = a.updateQueue;
        b = a.dependencies;
        c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
        c.sibling = a.sibling;
        c.index = a.index;
        c.ref = a.ref;
        return c;
      }
      function Vg(a, b, c, d, e, f) {
        var g = 2;
        d = a;
        if ("function" === typeof a) ji(a) && (g = 1);
        else if ("string" === typeof a) g = 5;
        else a: switch (a) {
          case ua:
            return Xg(c.children, e, f, b);
          case Ha:
            g = 8;
            e |= 16;
            break;
          case wa:
            g = 8;
            e |= 1;
            break;
          case xa:
            return a = nh(12, c, b, e | 8), a.elementType = xa, a.type = xa, a.lanes = f, a;
          case Ba:
            return a = nh(13, c, b, e), a.type = Ba, a.elementType = Ba, a.lanes = f, a;
          case Ca:
            return a = nh(19, c, b, e), a.elementType = Ca, a.lanes = f, a;
          case Ia:
            return vi(c, e, f, b);
          case Ja:
            return a = nh(24, c, b, e), a.elementType = Ja, a.lanes = f, a;
          default:
            if ("object" === typeof a && null !== a) switch (a.$$typeof) {
              case ya:
                g = 10;
                break a;
              case za:
                g = 9;
                break a;
              case Aa:
                g = 11;
                break a;
              case Da:
                g = 14;
                break a;
              case Ea:
                g = 16;
                d = null;
                break a;
              case Fa:
                g = 22;
                break a;
            }
            throw Error(y(130, null == a ? a : typeof a, ""));
        }
        b = nh(g, c, b, e);
        b.elementType = a;
        b.type = d;
        b.lanes = f;
        return b;
      }
      function Xg(a, b, c, d) {
        a = nh(7, a, d, b);
        a.lanes = c;
        return a;
      }
      function vi(a, b, c, d) {
        a = nh(23, a, d, b);
        a.elementType = Ia;
        a.lanes = c;
        return a;
      }
      function Ug(a, b, c) {
        a = nh(6, a, null, b);
        a.lanes = c;
        return a;
      }
      function Wg(a, b, c) {
        b = nh(4, null !== a.children ? a.children : [], a.key, b);
        b.lanes = c;
        b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
        return b;
      }
      function jk(a, b, c) {
        this.tag = b;
        this.containerInfo = a;
        this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
        this.timeoutHandle = -1;
        this.pendingContext = this.context = null;
        this.hydrate = c;
        this.callbackNode = null;
        this.callbackPriority = 0;
        this.eventTimes = Zc(0);
        this.expirationTimes = Zc(-1);
        this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
        this.entanglements = Zc(0);
        this.mutableSourceEagerHydrationData = null;
      }
      function kk(a, b, c) {
        var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return { $$typeof: ta, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
      }
      function lk(a, b, c, d) {
        var e = b.current, f = Hg(), g = Ig(e);
        a: if (c) {
          c = c._reactInternals;
          b: {
            if (Zb(c) !== c || 1 !== c.tag) throw Error(y(170));
            var h = c;
            do {
              switch (h.tag) {
                case 3:
                  h = h.stateNode.context;
                  break b;
                case 1:
                  if (Ff(h.type)) {
                    h = h.stateNode.__reactInternalMemoizedMergedChildContext;
                    break b;
                  }
              }
              h = h.return;
            } while (null !== h);
            throw Error(y(171));
          }
          if (1 === c.tag) {
            var k = c.type;
            if (Ff(k)) {
              c = If(c, k, h);
              break a;
            }
          }
          c = h;
        } else c = Cf;
        null === b.context ? b.context = c : b.pendingContext = c;
        b = zg(f, g);
        b.payload = { element: a };
        d = void 0 === d ? null : d;
        null !== d && (b.callback = d);
        Ag(e, b);
        Jg(e, g, f);
        return g;
      }
      function mk(a) {
        a = a.current;
        if (!a.child) return null;
        switch (a.child.tag) {
          case 5:
            return a.child.stateNode;
          default:
            return a.child.stateNode;
        }
      }
      function nk(a, b) {
        a = a.memoizedState;
        if (null !== a && null !== a.dehydrated) {
          var c = a.retryLane;
          a.retryLane = 0 !== c && c < b ? c : b;
        }
      }
      function ok(a, b) {
        nk(a, b);
        (a = a.alternate) && nk(a, b);
      }
      function pk() {
        return null;
      }
      function qk(a, b, c) {
        var d = null != c && null != c.hydrationOptions && c.hydrationOptions.mutableSources || null;
        c = new jk(a, b, null != c && true === c.hydrate);
        b = nh(3, null, null, 2 === b ? 7 : 1 === b ? 3 : 0);
        c.current = b;
        b.stateNode = c;
        xg(b);
        a[ff] = c.current;
        cf(8 === a.nodeType ? a.parentNode : a);
        if (d) for (a = 0; a < d.length; a++) {
          b = d[a];
          var e = b._getVersion;
          e = e(b._source);
          null == c.mutableSourceEagerHydrationData ? c.mutableSourceEagerHydrationData = [b, e] : c.mutableSourceEagerHydrationData.push(b, e);
        }
        this._internalRoot = c;
      }
      qk.prototype.render = function(a) {
        lk(a, this._internalRoot, null, null);
      };
      qk.prototype.unmount = function() {
        var a = this._internalRoot, b = a.containerInfo;
        lk(null, a, null, function() {
          b[ff] = null;
        });
      };
      function rk(a) {
        return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
      }
      function sk(a, b) {
        b || (b = a ? 9 === a.nodeType ? a.documentElement : a.firstChild : null, b = !(!b || 1 !== b.nodeType || !b.hasAttribute("data-reactroot")));
        if (!b) for (var c; c = a.lastChild; ) a.removeChild(c);
        return new qk(a, 0, b ? { hydrate: true } : void 0);
      }
      function tk(a, b, c, d, e) {
        var f = c._reactRootContainer;
        if (f) {
          var g = f._internalRoot;
          if ("function" === typeof e) {
            var h = e;
            e = function() {
              var a2 = mk(g);
              h.call(a2);
            };
          }
          lk(b, g, a, e);
        } else {
          f = c._reactRootContainer = sk(c, d);
          g = f._internalRoot;
          if ("function" === typeof e) {
            var k = e;
            e = function() {
              var a2 = mk(g);
              k.call(a2);
            };
          }
          Xj(function() {
            lk(b, g, a, e);
          });
        }
        return mk(g);
      }
      ec = function(a) {
        if (13 === a.tag) {
          var b = Hg();
          Jg(a, 4, b);
          ok(a, 4);
        }
      };
      fc = function(a) {
        if (13 === a.tag) {
          var b = Hg();
          Jg(a, 67108864, b);
          ok(a, 67108864);
        }
      };
      gc = function(a) {
        if (13 === a.tag) {
          var b = Hg(), c = Ig(a);
          Jg(a, c, b);
          ok(a, c);
        }
      };
      hc = function(a, b) {
        return b();
      };
      yb = function(a, b, c) {
        switch (b) {
          case "input":
            ab(a, c);
            b = c.name;
            if ("radio" === c.type && null != b) {
              for (c = a; c.parentNode; ) c = c.parentNode;
              c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
              for (b = 0; b < c.length; b++) {
                var d = c[b];
                if (d !== a && d.form === a.form) {
                  var e = Db(d);
                  if (!e) throw Error(y(90));
                  Wa(d);
                  ab(d, e);
                }
              }
            }
            break;
          case "textarea":
            ib(a, c);
            break;
          case "select":
            b = c.value, null != b && fb(a, !!c.multiple, b, false);
        }
      };
      Gb = Wj;
      Hb = function(a, b, c, d, e) {
        var f = X;
        X |= 4;
        try {
          return gg(98, a.bind(null, b, c, d, e));
        } finally {
          X = f, 0 === X && (wj(), ig());
        }
      };
      Ib = function() {
        0 === (X & 49) && (Vj(), Oj());
      };
      Jb = function(a, b) {
        var c = X;
        X |= 2;
        try {
          return a(b);
        } finally {
          X = c, 0 === X && (wj(), ig());
        }
      };
      function uk(a, b) {
        var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
        if (!rk(b)) throw Error(y(200));
        return kk(a, b, null, c);
      }
      var vk = { Events: [Cb, ue, Db, Eb, Fb, Oj, { current: false }] };
      var wk = { findFiberByHostInstance: wc, bundleType: 0, version: "17.0.2", rendererPackageName: "react-dom" };
      var xk = { bundleType: wk.bundleType, version: wk.version, rendererPackageName: wk.rendererPackageName, rendererConfig: wk.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ra.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
        a = cc(a);
        return null === a ? null : a.stateNode;
      }, findFiberByHostInstance: wk.findFiberByHostInstance || pk, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null };
      if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
        yk = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!yk.isDisabled && yk.supportsFiber) try {
          Lf = yk.inject(xk), Mf = yk;
        } catch (a) {
        }
      }
      var yk;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = vk;
      exports.createPortal = uk;
      exports.findDOMNode = function(a) {
        if (null == a) return null;
        if (1 === a.nodeType) return a;
        var b = a._reactInternals;
        if (void 0 === b) {
          if ("function" === typeof a.render) throw Error(y(188));
          throw Error(y(268, Object.keys(a)));
        }
        a = cc(b);
        a = null === a ? null : a.stateNode;
        return a;
      };
      exports.flushSync = function(a, b) {
        var c = X;
        if (0 !== (c & 48)) return a(b);
        X |= 1;
        try {
          if (a) return gg(99, a.bind(null, b));
        } finally {
          X = c, ig();
        }
      };
      exports.hydrate = function(a, b, c) {
        if (!rk(b)) throw Error(y(200));
        return tk(null, a, b, true, c);
      };
      exports.render = function(a, b, c) {
        if (!rk(b)) throw Error(y(200));
        return tk(null, a, b, false, c);
      };
      exports.unmountComponentAtNode = function(a) {
        if (!rk(a)) throw Error(y(40));
        return a._reactRootContainer ? (Xj(function() {
          tk(null, null, a, false, function() {
            a._reactRootContainer = null;
            a[ff] = null;
          });
        }), true) : false;
      };
      exports.unstable_batchedUpdates = Wj;
      exports.unstable_createPortal = function(a, b) {
        return uk(a, b, 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null);
      };
      exports.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
        if (!rk(c)) throw Error(y(200));
        if (null == a || void 0 === a._reactInternals) throw Error(y(38));
        return tk(a, b, c, false, d);
      };
      exports.version = "17.0.2";
    }
  });

  // node_modules/react-dom/index.js
  var require_react_dom = __commonJS({
    "node_modules/react-dom/index.js"(exports, module) {
      "use strict";
      function checkDCE() {
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
          return;
        }
        if (false) {
          throw new Error("^_^");
        }
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
        } catch (err) {
          console.error(err);
        }
      }
      if (true) {
        checkDCE();
        module.exports = require_react_dom_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // src/css-editor-iframe.tsx
  var css_editor_iframe_exports = {};
  __export(css_editor_iframe_exports, {
    default: () => css_editor_iframe_default
  });
  var import_react2 = __toESM(require_react());

  // src/lib/settingsSection.tsx
  var import_react = __toESM(require_react());
  var import_react_dom = __toESM(require_react_dom());

  // src/lib/settings.module.css
  var settings_default = {
    settingsContainer: "settings_settingsContainer",
    heading: "settings_heading",
    description: "settings_description",
    inputWrapper: "settings_inputWrapper"
  };

  // src/lib/settingsSection.tsx
  var SettingsSection = class {
    constructor(name, settingsId, initialSettingsFields = {}) {
      this.name = name;
      this.settingsId = settingsId;
      this.initialSettingsFields = initialSettingsFields;
      this.settingsFields = this.initialSettingsFields;
      this.setRerender = null;
      this.buttonClassnames = null;
      this.pushSettings = async () => {
        Object.entries(this.settingsFields).forEach(([nameId, field]) => {
          if (field.type !== "button" && this.getFieldValue(nameId) === void 0) {
            this.setFieldValue(nameId, field.defaultValue);
          }
        });
        while (!Spicetify?.Platform?.History?.listen) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        if (this.stopHistoryListener) this.stopHistoryListener();
        this.stopHistoryListener = Spicetify.Platform.History.listen((e) => {
          if (e.pathname === "/preferences") {
            this.render();
          }
        });
        if (Spicetify.Platform.History.location.pathname === "/preferences") {
          await this.render();
        }
      };
      this.rerender = () => {
        if (this.setRerender) {
          this.setRerender(Math.random());
        }
      };
      this.render = async () => {
        while (!document.getElementById("desktop.settings.selectLanguage")) {
          if (Spicetify.Platform.History.location.pathname !== "/preferences")
            return;
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        const allSettingsContainer = document.querySelector(
          ".main-view-container__scroll-node-child main div"
        );
        if (!allSettingsContainer)
          return console.error("[spcr-settings] settings container not found");
        this.buttonClassnames = Array.from(allSettingsContainer.querySelectorAll(":scope > button")).at(
          -1
        )?.className ?? null;
        let pluginSettingsContainer = Array.from(
          allSettingsContainer.children
        ).find((child) => child.id === this.settingsId);
        if (!pluginSettingsContainer) {
          pluginSettingsContainer = document.createElement("div");
          pluginSettingsContainer.id = this.settingsId;
          pluginSettingsContainer.className = settings_default.settingsContainer;
          allSettingsContainer.appendChild(pluginSettingsContainer);
        } else {
          console.log(pluginSettingsContainer);
        }
        import_react_dom.default.render(/* @__PURE__ */ import_react.default.createElement(this.FieldsContainer, null), pluginSettingsContainer);
      };
      this.addButton = (nameId, description, value, onClick, events) => {
        this.settingsFields[nameId] = {
          type: "button",
          description,
          value,
          events: {
            onClick,
            ...events
          }
        };
      };
      this.addInput = (nameId, description, defaultValue, onChange, events) => {
        this.settingsFields[nameId] = {
          type: "input",
          description,
          defaultValue,
          events: {
            onChange,
            ...events
          }
        };
      };
      this.addHidden = (nameId, defaultValue) => {
        this.settingsFields[nameId] = {
          type: "hidden",
          defaultValue
        };
      };
      this.addToggle = (nameId, description, defaultValue, onChange, events) => {
        this.settingsFields[nameId] = {
          type: "toggle",
          description,
          defaultValue,
          events: {
            onChange,
            ...events
          }
        };
      };
      this.addDropDown = (nameId, description, options, defaultIndexOrValue, onSelect, events) => {
        const defaultValue = typeof options === "function" ? defaultIndexOrValue : options[defaultIndexOrValue];
        this.settingsFields[nameId] = {
          type: "dropdown",
          description,
          defaultValue,
          options,
          events: {
            onSelect,
            ...events
          }
        };
      };
      this.getFieldValue = (nameId) => {
        return JSON.parse(
          Spicetify.LocalStorage.get(`${this.settingsId}.${nameId}`) || "{}"
        )?.value;
      };
      this.setFieldValue = (nameId, newValue) => {
        Spicetify.LocalStorage.set(
          `${this.settingsId}.${nameId}`,
          JSON.stringify({ value: newValue })
        );
      };
      this.FieldsContainer = () => {
        const [rerender, setRerender] = (0, import_react.useState)(0);
        this.setRerender = setRerender;
        return /* @__PURE__ */ import_react.default.createElement("div", { className: ["x-settings-section", settings_default.settingsContainer].join(" "), key: rerender }, /* @__PURE__ */ import_react.default.createElement(
          "h2",
          {
            className: ["main-shelf-title main-type-cello", settings_default.heading].join(
              " "
            )
          },
          this.name
        ), Object.entries(this.settingsFields).map(([nameId, field]) => {
          return /* @__PURE__ */ import_react.default.createElement(this.Field, { nameId, field });
        }));
      };
      this.Field = (props) => {
        const id = `${this.settingsId}.${props.nameId}`;
        let defaultStateValue;
        if (props.field.type === "button") {
          defaultStateValue = props.field.value;
        } else {
          defaultStateValue = this.getFieldValue(props.nameId);
        }
        if (props.field.type === "hidden") {
          return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null);
        }
        const [value, setValueState] = (0, import_react.useState)(defaultStateValue);
        const setValue = (newValue) => {
          if (newValue !== void 0) {
            setValueState(newValue);
            this.setFieldValue(props.nameId, newValue);
          }
        };
        const dropdownOptions = props.field.type === "dropdown" ? typeof props.field.options === "function" ? props.field.options(
          this.getFieldValue.bind(this)
        ) : props.field.options : [];
        (0, import_react.useEffect)(() => {
          if (props.field.type === "dropdown" && dropdownOptions.length > 0 && value !== void 0 && !dropdownOptions.includes(value)) {
            setValue(dropdownOptions[0]);
          }
        }, [props.field.type, props.nameId, value, dropdownOptions.join(",")]);
        return /* @__PURE__ */ import_react.default.createElement("div", { className: "x-settings-row" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "x-settings-firstColumn" }, /* @__PURE__ */ import_react.default.createElement("label", { className: settings_default.description, htmlFor: id }, props.field.description || "")), /* @__PURE__ */ import_react.default.createElement(
          "div",
          {
            className: ["x-settings-secondColumn", settings_default.inputWrapper].join(" ")
          },
          props.field.type === "input" ? /* @__PURE__ */ import_react.default.createElement(
            "input",
            {
              className: "main-dropDown-dropDown",
              id,
              dir: "ltr",
              value,
              type: "text",
              ...props.field.events,
              onChange: (e) => {
                setValue(e.currentTarget.value);
                const onChange = props.field.events?.onChange;
                if (onChange) onChange(e);
              }
            }
          ) : props.field.type === "button" ? /* @__PURE__ */ import_react.default.createElement("span", { className: "" }, /* @__PURE__ */ import_react.default.createElement(
            "button",
            {
              id,
              className: this.buttonClassnames ?? "",
              ...props.field.events,
              onClick: (e) => {
                setValue();
                const onClick = props.field.events?.onClick;
                if (onClick) onClick(e);
              },
              type: "button"
            },
            value
          )) : props.field.type === "toggle" ? /* @__PURE__ */ import_react.default.createElement("label", { className: "x-toggle-wrapper x-settings-secondColumn" }, /* @__PURE__ */ import_react.default.createElement(
            "input",
            {
              id,
              className: "x-toggle-input",
              type: "checkbox",
              checked: value,
              ...props.field.events,
              onClick: (e) => {
                setValue(e.currentTarget.checked);
                const onClick = props.field.events?.onClick;
                if (onClick) onClick(e);
              }
            }
          ), /* @__PURE__ */ import_react.default.createElement("span", { className: "x-toggle-indicatorWrapper" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "x-toggle-indicator" }))) : props.field.type === "dropdown" ? (() => {
            const dropdownField = props.field;
            return /* @__PURE__ */ import_react.default.createElement(
              "select",
              {
                className: "main-dropDown-dropDown",
                id,
                ...dropdownField.events,
                value: dropdownOptions.includes(value) ? value : dropdownOptions[0],
                onChange: (e) => {
                  const newVal = dropdownOptions[e.currentTarget.selectedIndex];
                  setValue(newVal);
                  const onSelect = dropdownField.events?.onSelect;
                  if (onSelect) onSelect(e);
                }
              },
              dropdownOptions.map((option) => /* @__PURE__ */ import_react.default.createElement("option", { key: option, value: option }, option))
            );
          })() : /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null)
        ));
      };
    }
  };

  // src/css-editor-iframe.tsx
  var CSSEditorIframe = class extends import_react2.default.Component {
    constructor(props) {
      super(props);
      this.settings = new SettingsSection("ReDesign", "redesign-editor");
      this.styleElement = null;
      this.settingsPollingInterval = null;
      this.lastThemeSettings = {
        palette: "Default",
        uiTheme: "Dark"
      };
      this.cachedEditorHTML = null;
      this.cacheVersion = "v72";
      // FIX: Set CSS mode INSIDE initializeColorPicker() for proper timing
      this.cachedVersion = "";
      this.cachedPalette = "";
      this.cachedUiTheme = "";
      this.handleMouseDown = (e) => {
        e.preventDefault();
        if (this.state.minimized) {
          this.setState({
            isDragging: true,
            dragStartX: e.clientX - this.state.minimizedX,
            dragStartY: e.clientY - this.state.minimizedY
          });
        } else {
          this.setState({
            isDragging: true,
            dragStartX: e.clientX - this.state.x,
            dragStartY: e.clientY - this.state.y
          });
        }
        try {
          const nativeEvent = e.nativeEvent;
          if (nativeEvent.pointerId !== void 0) {
            e.target.setPointerCapture?.(nativeEvent.pointerId);
          }
        } catch (err) {
        }
      };
      this.handleResizeMouseDown = (e, direction) => {
        e.stopPropagation();
        this.setState({
          isResizing: true,
          resizeDirection: direction,
          dragStartX: e.clientX,
          dragStartY: e.clientY
        });
      };
      this.handleMouseMove = (e) => {
        if (!this._rafId) {
          this._rafId = requestAnimationFrame(() => {
            if (this.state.isDragging) {
              if (this.state.minimized) {
                this.setState({
                  minimizedX: e.clientX - this.state.dragStartX,
                  minimizedY: e.clientY - this.state.dragStartY
                });
              } else {
                this.setState({
                  x: e.clientX - this.state.dragStartX,
                  y: e.clientY - this.state.dragStartY
                });
              }
            } else if (this.state.isResizing && this.state.resizeDirection) {
              const deltaX = e.clientX - this.state.dragStartX;
              const deltaY = e.clientY - this.state.dragStartY;
              const direction = this.state.resizeDirection;
              this.setState((prevState) => {
                let newState = { dragStartX: e.clientX, dragStartY: e.clientY };
                if (direction.includes("e")) {
                  newState.width = Math.max(400, prevState.width + deltaX);
                }
                if (direction.includes("s")) {
                  newState.height = Math.max(300, prevState.height + deltaY);
                }
                if (direction.includes("w")) {
                  const newWidth = Math.max(400, prevState.width - deltaX);
                  if (newWidth >= 400) {
                    newState.width = newWidth;
                    newState.x = prevState.x + deltaX;
                  }
                }
                if (direction.includes("n")) {
                  const newHeight = Math.max(300, prevState.height - deltaY);
                  if (newHeight >= 300) {
                    newState.height = newHeight;
                    newState.y = prevState.y + deltaY;
                  }
                }
                return newState;
              });
            }
            this._rafId = null;
          });
        }
      };
      this._rafId = null;
      this.handleMouseUp = () => {
        if (this.state.isDragging) {
          this.setState({ isDragging: false });
        }
        if (this.state.isResizing) {
          this.setState({ isResizing: false, resizeDirection: null });
        }
      };
      this.handleMinimize = () => {
        this.setState({ minimized: true });
      };
      this.handleMaximize = () => {
        this.setState({ minimized: false });
      };
      this.checkThemeSettingsChanged = () => {
        const currentPalette = this.settings.getFieldValue("editor-palette") || "Default";
        const currentUiTheme = this.settings.getFieldValue("ui-theme") || "Dark";
        if (currentPalette !== this.lastThemeSettings.palette || currentUiTheme !== this.lastThemeSettings.uiTheme) {
          console.log("[ReDesign] \u26A0\uFE0F Theme settings changed, reloading iframe...");
          console.log("[ReDesign] Old:", this.lastThemeSettings);
          console.log("[ReDesign] New:", { palette: currentPalette, uiTheme: currentUiTheme });
          this.lastThemeSettings.palette = currentPalette;
          this.lastThemeSettings.uiTheme = currentUiTheme;
          this.forceReloadIframe();
        }
      };
      this.handleWindowResize = () => {
        console.log("[ReDesign] Window resized:", {
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight,
          editorWidth: this.state.width,
          editorHeight: this.state.height,
          currentX: this.state.x,
          currentY: this.state.y,
          minimized: this.state.minimized,
          minimizedX: this.state.minimizedX,
          minimizedY: this.state.minimizedY
        });
        const maxX = window.innerWidth - this.state.width;
        const maxY = window.innerHeight - this.state.height;
        const newX = Math.min(this.state.x, Math.max(0, maxX));
        const newY = Math.min(this.state.y, Math.max(0, maxY));
        const minimizedWidth = 180;
        const minimizedHeight = 50;
        const maxMinX = window.innerWidth - minimizedWidth;
        const maxMinY = window.innerHeight - minimizedHeight;
        const newMinX = Math.min(this.state.minimizedX, Math.max(0, maxMinX));
        const newMinY = Math.min(this.state.minimizedY, Math.max(0, maxMinY));
        console.log("[ReDesign] Calculated new positions:", {
          expanded: { newX, newY, maxX, maxY },
          minimized: { newMinX, newMinY, maxMinX, maxMinY },
          willUpdate: newX !== this.state.x || newY !== this.state.y || newMinX !== this.state.minimizedX || newMinY !== this.state.minimizedY
        });
        this.setState({
          x: newX,
          y: newY,
          minimizedX: newMinX,
          minimizedY: newMinY
        });
      };
      this.iframeRef = import_react2.default.createRef();
      this.editorContainerRef = import_react2.default.createRef();
      this.settings.addHidden("css", "/* Write your CSS here :D */\n\n");
      this.settings.addButton(
        "button-1",
        "Open ReDesign editor",
        "Open ReDesign Editor",
        () => this.toggle()
      );
      this.settings.addInput(
        "open-hotkey",
        "Hotkey to open/close editor",
        "F12",
        () => {
          this.openHotkey = this.settings.getFieldValue("open-hotkey");
        }
      );
      this.settings.addInput(
        "font-size",
        "Editor font size (px)",
        "14px",
        () => {
          this.setState({
            fontSize: this.settings.getFieldValue("font-size")
          });
          this.sendCSSToIframe();
        }
      );
      this.settings.addToggle(
        "auto-save",
        "Enable auto-save",
        true,
        () => {
          this.sendCSSToIframe();
        }
      );
      this.settings.addToggle(
        "line-numbers",
        "Show line numbers",
        true,
        () => {
          this.sendCSSToIframe();
        }
      );
      this.settings.addToggle(
        "word-wrap",
        "Enable word wrap",
        false,
        () => {
          this.sendCSSToIframe();
        }
      );
      this.settings.addInput(
        "tab-size",
        "Tab size (spaces)",
        "2",
        () => {
          this.sendCSSToIframe();
        }
      );
      this.settings.addDropDown(
        "ui-theme",
        "Editor UI theme",
        ["Dark (Default)", "Light"],
        0,
        () => {
          const uiTheme = this.settings.getFieldValue("ui-theme") || "Dark (Default)";
          const isLight = uiTheme.toLowerCase().includes("light");
          const palettes = isLight ? [
            "Chrome",
            "Clouds",
            "Crimson Editor",
            "Dawn",
            "Dreamweaver",
            "Eclipse",
            "GitHub",
            "IPlastic",
            "Katzenmilch",
            "Kuroir",
            "Solarized Light",
            "SQL Server",
            "Textmate",
            "Tomorrow",
            "Xcode",
            "Cloud Editor",
            "Goole",
            "IPython"
          ] : [
            "Monokai",
            "Dracula",
            "Ambiance",
            "Tomorrow Night",
            "Tomorrow Night Blue",
            "Tomorrow Night Eighties",
            "Nord Dark",
            "Gruvbox",
            "Clouds Midnight",
            "Cobalt",
            "Terminal",
            "Pastel on Dark",
            "Idle Fingers",
            "Chaos",
            "Merbivore",
            "Merbivore Soft",
            "KR Theme",
            "Twilight"
          ];
          const currentPalette = this.settings.getFieldValue("editor-palette");
          if (currentPalette && !palettes.includes(currentPalette)) {
            this.settings.setFieldValue("editor-palette", palettes[0]);
          }
          this.settings.rerender();
          this.reloadIframe();
        }
      );
      const getEditorPaletteOptions = (getFieldValue) => {
        const uiTheme = getFieldValue("ui-theme") || "Dark (Default)";
        return uiTheme.toLowerCase().includes("light") ? [
          "Chrome",
          "Clouds",
          "Crimson Editor",
          "Dawn",
          "Dreamweaver",
          "Eclipse",
          "GitHub",
          "IPlastic",
          "Katzenmilch",
          "Kuroir",
          "Solarized Light",
          "SQL Server",
          "Textmate",
          "Tomorrow",
          "Xcode",
          "Cloud Editor",
          "Goole",
          "IPython"
        ] : [
          "Monokai",
          "Dracula",
          "Ambiance",
          "Tomorrow Night",
          "Tomorrow Night Blue",
          "Tomorrow Night Eighties",
          "Nord Dark",
          "Gruvbox",
          "Clouds Midnight",
          "Cobalt",
          "Terminal",
          "Pastel on Dark",
          "Idle Fingers",
          "Chaos",
          "Merbivore",
          "Merbivore Soft",
          "KR Theme",
          "Twilight"
        ];
      };
      this.settings.addDropDown(
        "editor-palette",
        "Editor palette",
        getEditorPaletteOptions,
        "Monokai",
        () => {
          this.reloadIframe();
        }
      );
      console.log("[ReDesign] About to register settings...");
      this.addSettingsContainerStyles();
      console.log("[ReDesign] \u2705 CSS styles added to <head>");
      this.settings.pushSettings();
      console.log("[ReDesign] Settings registered successfully");
      console.log("[ReDesign] Settings section name:", this.settings.name);
      setTimeout(() => {
        const container = document.getElementById("redesign-editor");
        if (container) {
          container.classList.add("x-settings-section");
          console.log("[ReDesign] \u2705 Added x-settings-section class to container");
        }
      }, 100);
      this.openHotkey = this.settings.getFieldValue("open-hotkey");
      this.keydownHandler = (e) => {
        const target = e.target;
        const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
        if (!isInput && e.key === this.openHotkey) {
          e.preventDefault();
          e.stopPropagation();
          this.toggle();
        }
      };
      window.addEventListener("keydown", this.keydownHandler, { capture: true });
      document.addEventListener("keydown", this.keydownHandler, { capture: true });
      console.log(`[ReDesign] Registered hotkey: ${this.openHotkey} on window and document`);
      this.messageHandler = (event) => {
        if (event.data && event.data.type === "UPDATE_CSS") {
          this.updateCSS(event.data.css);
        } else if (event.data && event.data.type === "REQUEST_CSS") {
          this.sendCSSToIframe();
        } else if (event.data && event.data.type === "CLOSE_EDITOR") {
          console.log("[ReDesign] CLOSE_EDITOR message received from iframe");
          this.toggle();
        } else if (event.data && event.data.type === "OPEN_SETTINGS") {
          console.log("[ReDesign] Minimizing editor and opening Spotify settings...");
          this.setState({ minimized: true });
          setTimeout(() => {
            Spicetify.Platform.History?.push("/preferences");
          }, 100);
        }
      };
      window.addEventListener("message", this.messageHandler);
      this.state = {
        code: this.settings.getFieldValue("css"),
        fontSize: this.settings.getFieldValue("font-size"),
        visible: false,
        minimized: false,
        x: 100,
        y: 50,
        width: 1e3,
        height: 700,
        minimizedX: Math.max(0, window.innerWidth - 200),
        minimizedY: Math.max(0, window.innerHeight - 70),
        isDragging: false,
        isResizing: false,
        resizeDirection: null,
        dragStartX: 0,
        dragStartY: 0,
        iframeKey: 0
      };
      this.applyCSS(this.state.code);
    }
    applyCSS(css) {
      if (!this.styleElement) {
        this.styleElement = document.createElement("style");
        this.styleElement.id = "redesign-custom-styles";
        document.head.appendChild(this.styleElement);
      }
      this.styleElement.textContent = css;
    }
    updateCSS(css) {
      this.setState({ code: css });
      this.settings.setFieldValue("css", css);
      this.applyCSS(css);
    }
    toggle() {
      const newVisible = !this.state.visible;
      console.log(`[ReDesign] Toggle editor: ${this.state.visible} -> ${newVisible}`);
      this.setState({ visible: newVisible }, () => {
        if (this.state.visible) {
          setTimeout(() => this.sendCSSToIframe(), 100);
        }
      });
    }
    sendCSSToIframe() {
      if (this.iframeRef.current && this.iframeRef.current.contentWindow) {
        this.iframeRef.current.contentWindow.postMessage({
          type: "SET_CSS",
          css: this.state.code
        }, "*");
      }
    }
    reloadIframe() {
      this.setState({ visible: this.state.visible }, () => {
        setTimeout(() => this.sendCSSToIframe(), 100);
      });
    }
    forceReloadIframe() {
      this.setState({ iframeKey: this.state.iframeKey + 1 }, () => {
        setTimeout(() => this.sendCSSToIframe(), 100);
      });
    }
    componentDidMount() {
      document.addEventListener("mousemove", this.handleMouseMove);
      document.addEventListener("mouseup", this.handleMouseUp);
      window.addEventListener("resize", this.handleWindowResize);
      this.lastThemeSettings.palette = this.settings.getFieldValue("editor-palette") || "Default";
      this.lastThemeSettings.uiTheme = this.settings.getFieldValue("ui-theme") || "Dark";
      console.log("[ReDesign] Initial theme settings:", this.lastThemeSettings);
      this.settingsPollingInterval = window.setInterval(() => {
        this.checkThemeSettingsChanged();
      }, 500);
    }
    addSettingsContainerStyles() {
      const settingsStyle = document.createElement("style");
      settingsStyle.id = "redesign-settings-styles";
      settingsStyle.textContent = `
      /* CRITICAL FIX: Remove dropdown arrow from text inputs */
      #redesign-editor input.main-dropDown-dropDown[type="text"] {
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        appearance: none !important;
        background-image: none !important;
        background-color: rgba(var(--spice-rgb-selected-row, 40, 40, 40), 0.3) !important;
        border: 1px solid transparent !important;
        border-radius: 4px !important;
        padding: 8px 12px !important;
        color: var(--spice-text, #fff) !important;
        font-size: 14px !important;
        min-width: 200px !important;
      }

      #redesign-editor input.main-dropDown-dropDown[type="text"]:hover {
        background-color: rgba(var(--spice-rgb-selected-row, 40, 40, 40), 0.5) !important;
      }

      #redesign-editor input.main-dropDown-dropDown[type="text"]:focus {
        outline: 2px solid var(--spice-button, #1db954) !important;
        outline-offset: -1px !important;
        background-color: rgba(var(--spice-rgb-selected-row, 40, 40, 40), 0.6) !important;
      }

      /* Fix dropdown select styling */
      #redesign-editor select.main-dropDown-dropDown {
        background-color: rgba(var(--spice-rgb-selected-row, 40, 40, 40), 0.3) !important;
        border: 1px solid transparent !important;
        border-radius: 4px !important;
        padding: 8px 32px 8px 12px !important;
        color: var(--spice-text, #fff) !important;
        font-size: 14px !important;
        min-width: 200px !important;
      }

      #redesign-editor select.main-dropDown-dropDown:hover {
        background-color: rgba(var(--spice-rgb-selected-row, 40, 40, 40), 0.5) !important;
      }

      #redesign-editor select.main-dropDown-dropDown:focus {
        outline: 2px solid var(--spice-button, #1db954) !important;
        outline-offset: -1px !important;
      }

      /* Fix dropdown menu options styling */
      #redesign-editor select.main-dropDown-dropDown option {
        background-color: var(--spice-background-elevated, #282828) !important;
        color: var(--spice-text, #fff) !important;
        padding: 8px 12px !important;
      }

      #redesign-editor select.main-dropDown-dropDown option:hover {
        background-color: var(--spice-background-highlight, rgba(255, 255, 255, 0.1)) !important;
      }

      #redesign-editor select.main-dropDown-dropDown option:checked {
        background-color: var(--spice-button, #1db954) !important;
        color: var(--spice-button-text, #000) !important;
      }

      /* Fix button styling */
      #redesign-editor button {
        background-color: var(--spice-button, #1db954) !important;
        color: var(--spice-button-text, #000) !important;
        border: none !important;
        border-radius: 500px !important;
        padding: 8px 32px !important;
        font-size: 14px !important;
        font-weight: 700 !important;
        cursor: pointer !important;
        transition: transform 0.1s ease !important;
      }

      #redesign-editor button:hover {
        transform: scale(1.04) !important;
        background-color: var(--spice-button-active, #1ed760) !important;
      }

      #redesign-editor button:active {
        transform: scale(0.96) !important;
      }
    `;
      document.head.appendChild(settingsStyle);
    }
    componentWillUnmount() {
      if (this.keydownHandler) {
        window.removeEventListener("keydown", this.keydownHandler, { capture: true });
        document.removeEventListener("keydown", this.keydownHandler, { capture: true });
      }
      window.removeEventListener("message", this.messageHandler);
      document.removeEventListener("mousemove", this.handleMouseMove);
      document.removeEventListener("mouseup", this.handleMouseUp);
      window.removeEventListener("resize", this.handleWindowResize);
      if (this.settingsPollingInterval) {
        clearInterval(this.settingsPollingInterval);
        this.settingsPollingInterval = null;
      }
      if (this._rafId) {
        cancelAnimationFrame(this._rafId);
        this._rafId = null;
      }
      if (this.styleElement) {
        this.styleElement.remove();
      }
    }
    getEditorHTML() {
      const paletteValue = this.settings.getFieldValue("editor-palette") || "Default";
      const uiThemeValue = this.settings.getFieldValue("ui-theme") || "Dark";
      console.log("[ReDesign] Cache check:", {
        hasCachedHTML: !!this.cachedEditorHTML,
        cachedVersion: this.cachedVersion,
        currentVersion: this.cacheVersion,
        versionMatch: this.cachedVersion === this.cacheVersion,
        paletteMatch: this.cachedPalette === paletteValue,
        uiThemeMatch: this.cachedUiTheme === uiThemeValue
      });
      if (this.cachedEditorHTML && this.cachedVersion === this.cacheVersion && this.cachedPalette === paletteValue && this.cachedUiTheme === uiThemeValue) {
        console.log("[ReDesign] \u26A1 Using cached HTML");
        return this.cachedEditorHTML;
      }
      console.log("[ReDesign] \u{1F504} Regenerating HTML (cache miss)");
      const paletteToTheme = {
        "Monokai": "ace/theme/monokai",
        "Dracula": "ace/theme/dracula",
        "Ambiance": "ace/theme/ambiance",
        "Tomorrow Night": "ace/theme/tomorrow_night",
        "Tomorrow Night Blue": "ace/theme/tomorrow_night_blue",
        "Tomorrow Night Eighties": "ace/theme/tomorrow_night_eighties",
        "Nord Dark": "ace/theme/nord_dark",
        "Gruvbox": "ace/theme/gruvbox",
        "Clouds Midnight": "ace/theme/clouds_midnight",
        "Cobalt": "ace/theme/cobalt",
        "Terminal": "ace/theme/terminal",
        "Pastel on Dark": "ace/theme/pastel_on_dark",
        "Idle Fingers": "ace/theme/idle_fingers",
        "Chaos": "ace/theme/chaos",
        "Merbivore": "ace/theme/merbivore",
        "Merbivore Soft": "ace/theme/merbivore_soft",
        "KR Theme": "ace/theme/kr_theme",
        "Twilight": "ace/theme/twilight",
        "Chrome": "ace/theme/chrome",
        "Clouds": "ace/theme/clouds",
        "Crimson Editor": "ace/theme/crimson_editor",
        "Dawn": "ace/theme/dawn",
        "Dreamweaver": "ace/theme/dreamweaver",
        "Eclipse": "ace/theme/eclipse",
        "GitHub": "ace/theme/github",
        "IPlastic": "ace/theme/iplastic",
        "Katzenmilch": "ace/theme/katzenmilch",
        "Kuroir": "ace/theme/kuroir",
        "Solarized Light": "ace/theme/solarized_light",
        "SQL Server": "ace/theme/sqlserver",
        "Textmate": "ace/theme/textmate",
        "Tomorrow": "ace/theme/tomorrow",
        "Xcode": "ace/theme/xcode",
        "Cloud Editor": "ace/theme/cloud_editor",
        "Goole": "ace/theme/goole",
        "IPython": "ace/theme/ipython"
      };
      const editorTheme = paletteToTheme[paletteValue] || "ace/theme/monokai";
      console.log("[ReDesign] Selected palette:", paletteValue, "-> Theme:", editorTheme);
      const lineNumbers = this.settings.getFieldValue("line-numbers") !== false;
      const wordWrap = this.settings.getFieldValue("word-wrap") || false;
      const tabSize = parseInt(this.settings.getFieldValue("tab-size") || "2");
      const autoSave = this.settings.getFieldValue("auto-save") !== false;
      const uiTheme = uiThemeValue.toLowerCase();
      let bgColor, bgColorSecondary, textColor, borderColor, btnBg, btnHover, btnIconBg, btnIconHover, statusColor, infoBg, aceTheme;
      if (uiTheme === "light") {
        bgColor = "#ffffff";
        bgColorSecondary = "#f3f3f3";
        textColor = "#1e1e1e";
        borderColor = "#e0e0e0";
        btnBg = "#0e639c";
        btnHover = "#1177bb";
        btnIconBg = "transparent";
        btnIconHover = "#e0e0e0";
        statusColor = "#16825d";
        infoBg = "#0e639c";
        aceTheme = editorTheme;
      } else {
        bgColor = "#1e1e1e";
        bgColorSecondary = "#252526";
        textColor = "#d4d4d4";
        borderColor = "#3e3e42";
        btnBg = "#0e639c";
        btnHover = "#1177bb";
        btnIconBg = "transparent";
        btnIconHover = "#3e3e42";
        statusColor = "#4ec9b0";
        infoBg = "#007acc";
        aceTheme = editorTheme;
      }
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ReDesign Editor</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: ${bgColor};
      color: ${textColor};
      overflow: hidden;
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .header {
      background: ${bgColorSecondary};
      border-bottom: 1px solid ${borderColor};
      padding: 8px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
      -webkit-app-region: drag;
    }
    .header-left { display: flex; gap: 6px; align-items: center; -webkit-app-region: no-drag; }
    .header-right { display: flex; gap: 4px; align-items: center; }
    .status { font-size: 12px; color: ${statusColor}; display: flex; align-items: center; gap: 4px; }
    .status::before { content: ''; width: 6px; height: 6px; background: ${statusColor}; border-radius: 50%; animation: pulse 2s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    .btn { background: ${btnBg}; border: none; color: white; padding: 4px 8px; border-radius: 3px; cursor: pointer; font-size: 11px; transition: background 0.2s; }
    .btn:hover { background: ${btnHover}; }
    .btn-icon { background: ${btnIconBg}; border: 1px solid ${borderColor}; color: ${textColor}; padding: 4px 8px; }
    .btn-icon:hover { background: ${btnIconHover}; border-color: ${borderColor}; }
    #editor { flex: 1; width: 100%; font-size: ${this.state.fontSize}; }
    .status-bar {
      background: ${bgColorSecondary};
      border-top: 1px solid ${borderColor};
      color: ${textColor};
      padding: 0 12px;
      font-size: 11px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
      font-family: 'SF Mono', Monaco, 'Consolas', 'Courier New', monospace;
      user-select: none;
    }
    .status-bar-left, .status-bar-right { display: flex; align-items: center; gap: 0; }
    .status-bar-item {
      padding: 0 8px;
      height: 100%;
      display: flex;
      align-items: center;
      border-right: 1px solid ${borderColor};
      color: ${textColor}cc;
    }
    .status-bar-item:last-child { border-right: none; }
    .status-bar-item.status-message { color: ${statusColor}; font-weight: 600; }
    .status-bar-item.status-message.saved { color: ${statusColor}; }

    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
       PROFESSIONAL COLOR PICKER - VS Code / Figma / Linear Inspired
       Modern, Elegant, Production-Ready Design
       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
    
    /* Main Container - Height adapts to content; scroll when > 85vh */
    .colorpicker-body {
      position: relative !important;
      background: linear-gradient(135deg, ${bgColorSecondary}b0 0%, ${bgColorSecondary}bd 100%) !important;
      border: 1px solid ${borderColor}80 !important;
      border-radius: 12px !important;
      box-shadow: 
        0 0 0 1px rgba(255, 255, 255, 0.03),
        0 20px 60px -10px rgba(0, 0, 0, 0.85),
        0 8px 24px -8px rgba(0, 0, 0, 0.6),
        0 0 1px rgba(0, 0, 0, 0.8) !important;
      padding: 0 !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', 'Helvetica Neue', Arial, sans-serif !important;
      color: ${textColor} !important;
      min-width: 300px !important;
      max-width: 300px !important;
      height: auto !important;
      min-height: 0 !important;
      max-height: 65vh !important;
      overflow-x: hidden !important;
      overflow-y: auto !important;
      pointer-events: auto !important;
      user-select: none !important;
      -webkit-user-select: none !important;
      display: flex !important;
      flex-direction: column !important;
      flex-wrap: nowrap !important;
      backdrop-filter: blur(3px) saturate(180%) !important;
      -webkit-backdrop-filter: blur(32px) saturate(180%) !important;
      animation: colorpicker-fadein 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
      will-change: transform, opacity !important;
    }
    
    @keyframes colorpicker-fadein {
      from {
        opacity: 0;
        transform: translateY(-16px) scale(0.92);
        filter: blur(4px);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
      }
    }
    
    .colorpicker-body * {
      box-sizing: border-box !important;
    }
    
    /* Scrollbar: no space when hidden (width 0); visible only in scrollbar zone or while scrolling */
    .colorpicker-body::-webkit-scrollbar,
    .colorpicker-body *::-webkit-scrollbar {
      width: 0 !important;
      height: 0 !important;
      background: transparent !important;
      transition: width 0.15s ease, height 0.15s ease !important;
    }
    .colorpicker-body.scrollbar-visible::-webkit-scrollbar,
    .colorpicker-body.is-scrolling::-webkit-scrollbar,
    .colorpicker-body.scrollbar-visible *::-webkit-scrollbar,
    .colorpicker-body.is-scrolling *::-webkit-scrollbar {
      width: 6px !important;
      height: 6px !important;
    }
    .colorpicker-body::-webkit-scrollbar-track,
    .colorpicker-body *::-webkit-scrollbar-track {
      background: transparent !important;
      border-radius: 3px !important;
    }
    .colorpicker-body::-webkit-scrollbar-thumb,
    .colorpicker-body *::-webkit-scrollbar-thumb {
      background: transparent !important;
      border-radius: 3px !important;
      transition: background 0.15s ease !important;
    }
    .colorpicker-body.scrollbar-visible::-webkit-scrollbar-thumb,
    .colorpicker-body.scrollbar-visible *::-webkit-scrollbar-thumb,
    .colorpicker-body.is-scrolling::-webkit-scrollbar-thumb,
    .colorpicker-body.is-scrolling *::-webkit-scrollbar-thumb {
      background: ${textColor}40 !important;
    }
    .colorpicker-body.scrollbar-visible::-webkit-scrollbar-track,
    .colorpicker-body.is-scrolling::-webkit-scrollbar-track,
    .colorpicker-body.scrollbar-visible *::-webkit-scrollbar-track,
    .colorpicker-body.is-scrolling *::-webkit-scrollbar-track {
      background: ${textColor}12 !important;
    }
    .colorpicker-body.scrollbar-visible::-webkit-scrollbar-thumb:hover,
    .colorpicker-body.scrollbar-visible *::-webkit-scrollbar-thumb:hover,
    .colorpicker-body.is-scrolling::-webkit-scrollbar-thumb:hover,
    .colorpicker-body.is-scrolling *::-webkit-scrollbar-thumb:hover {
      background: ${textColor}60 !important;
    }
    /* Firefox: no space when hidden; visible only with class */
    .colorpicker-body,
    .colorpicker-body * {
      scrollbar-width: none !important;
      scrollbar-color: transparent transparent !important;
    }
    .colorpicker-body.scrollbar-visible,
    .colorpicker-body.scrollbar-visible *,
    .colorpicker-body.is-scrolling,
    .colorpicker-body.is-scrolling * {
      scrollbar-width: thin !important;
      scrollbar-color: ${textColor}40 transparent !important;
    }
    
    /* Arrow Pointer - Hidden */
    .colorpicker-body + .arrow,
    .arrow {
      display: none !important;
    }
    
    /* Color Preview Area - Main palette (saturation/value square) - compact, crosshair only here. NOT .color-chooser (dropdown) */
    .colorpicker-body > .color,
    .colorpicker-body .saturation,
    .colorpicker-body .value {
      height: 180px !important;
      max-height: 180px !important;
      width: 100% !important;
      border-radius: 12px 12px 0 0 !important;
      border: none !important;
      margin: 0 !important;
      position: relative !important;
      cursor: crosshair !important;
      flex-shrink: 0 !important;
      order: 0 !important;
      z-index: 1 !important;
    }
    
    /* Main color container - MUST allow dynamic background-color from JS */
    .colorpicker-body > .color {
      overflow: hidden !important;
      /* NO background here - let ace-colorpicker set it dynamically */
      /* NO border-bottom - would show the hue color bleeding through */
    }
    
    /* Separator line as pseudo-element (after all color layers) */
    .colorpicker-body > .color::after {
      content: '' !important;
      position: absolute !important;
      bottom: 0 !important;
      left: 0 !important;
      right: 0 !important;
      height: 1px !important;
      background: ${borderColor}60 !important;
      z-index: 100 !important;
      pointer-events: none !important;
    }
    
    /* Checkerboard pattern as pseudo-element (behind everything) - VERY subtle */
    .colorpicker-body > .color::before {
      content: '' !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      background: 
        linear-gradient(45deg, ${bgColorSecondary}08 25%, transparent 25%, transparent 75%, ${bgColorSecondary}08 75%, ${bgColorSecondary}08),
        linear-gradient(45deg, ${bgColorSecondary}08 25%, transparent 25%, transparent 75%, ${bgColorSecondary}08 75%, ${bgColorSecondary}08) !important;
      background-size: 8px 8px !important;
      background-position: 0 0, 4px 4px !important;
      z-index: 0 !important;
      pointer-events: none !important;
      opacity: 0.3 !important;
    }
    
    /* Saturation gradient overlay (white to transparent, left to right) */
    .colorpicker-body .saturation {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0)) !important;
      z-index: 1 !important;
      pointer-events: none !important;
    }
    
    /* Value/Brightness gradient overlay (transparent to black, top to bottom) */
    .colorpicker-body .value {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0), #000) !important;
      z-index: 2 !important;
      pointer-events: none !important;
    }
    
    /* Drag Pointer - Multiple selectors for robustness */
    .colorpicker-body .drag-pointer,
    .colorpicker-body .saturation .drag-pointer,
    .colorpicker-body .value .drag-pointer,
    .colorpicker-body > .color .drag-pointer {
      position: absolute !important;
      width: 16px !important;
      height: 16px !important;
      border: 2.5px solid white !important;
      border-radius: 50% !important;
      box-shadow: 
        0 0 0 1.5px rgba(0, 0, 0, 0.4),
        0 3px 10px rgba(0, 0, 0, 0.5),
        inset 0 0 0 1px rgba(255, 255, 255, 0.2) !important;
      margin: -8px 0 0 -8px !important;
      pointer-events: none !important;
      transition: transform 0.12s cubic-bezier(0.4, 0, 0.2, 1) !important;
      will-change: transform !important;
      z-index: 10 !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
    }
    
    /* Scale effect ONLY when dragging in color picker area (not on button clicks) */
    .colorpicker-body > .color:active .drag-pointer {
      transform: scale(1.12) !important;
    }
    
    /* Control Section - Sliders left, Color previews right - compact */
    .colorpicker-body .control {
      padding: 8px 10px !important;
      margin: 0 !important;
      background: ${bgColor}40 !important;
      border-bottom: 1px solid ${borderColor}50 !important;
      display: grid !important;
      grid-template-columns: 1fr 42px 42px !important;
      grid-template-rows: 1fr 1fr !important;
      gap: 4px 8px !important;
      align-items: center !important;
      min-height: 52px !important;
      flex-shrink: 0 !important;
      order: 1 !important;
    }
    
    /* Hue slider - spans first row, first column */
    .colorpicker-body .control .hue,
    .colorpicker-body .control .hue-control {
      grid-column: 1 !important;
      grid-row: 1 !important;
      align-self: center !important;
    }
    
    /* Opacity slider - spans second row, first column */
    .colorpicker-body .control .opacity,
    .colorpicker-body .control .opacity-control {
      grid-column: 1 !important;
      grid-row: 2 !important;
      align-self: center !important;
    }
    
    /* Previous color - perfect square, second column, spans both rows */
    /* Ultra-specific selectors with nth-child for maximum priority */
    .colorpicker-body .control > .color:first-of-type,
    .colorpicker-body .control > .empty:first-of-type,
    .colorpicker-body .control > .color:nth-child(3),
    .colorpicker-body .control > .empty:nth-child(3),
    .colorpicker-body .control .color:first-of-type,
    .colorpicker-body .control .empty:first-of-type {
      display: block !important;
      position: relative !important;
      grid-column: 2 !important;
      grid-row: 1 / 3 !important;
      width: 42px !important;
      height: 42px !important;
      min-width: 42px !important;
      min-height: 42px !important;
      max-width: 42px !important;
      max-height: 42px !important;
      aspect-ratio: 1 / 1 !important;
      align-self: center !important;
      justify-self: center !important;
      flex-shrink: 0 !important;
      flex-grow: 0 !important;
      overflow: hidden !important;
      box-sizing: border-box !important;
    }
    
    /* Current color - perfect square, third column, spans both rows */
    /* Ultra-specific selectors with nth-child for maximum priority */
    .colorpicker-body .control > .color:last-of-type,
    .colorpicker-body .control > .empty:last-of-type,
    .colorpicker-body .control > .color:nth-child(4),
    .colorpicker-body .control > .empty:nth-child(4),
    .colorpicker-body .control .color:last-of-type,
    .colorpicker-body .control .empty:last-of-type {
      display: block !important;
      position: relative !important;
      grid-column: 3 !important;
      grid-row: 1 / 3 !important;
      width: 42px !important;
      height: 42px !important;
      min-width: 42px !important;
      min-height: 42px !important;
      max-width: 42px !important;
      max-height: 42px !important;
      aspect-ratio: 1 / 1 !important;
      align-self: center !important;
      justify-self: center !important;
      flex-shrink: 0 !important;
      flex-grow: 0 !important;
      overflow: hidden !important;
      box-sizing: border-box !important;
    }
    
    /* Hue Slider - Multiple selectors for robustness */
    .colorpicker-body .hue,
    .colorpicker-body .hue-control,
    .colorpicker-body .control .hue {
      height: 12px !important;
      border-radius: 6px !important;
      position: relative !important;
      cursor: pointer !important;
      box-shadow: 
        inset 0 1px 3px rgba(0, 0, 0, 0.35),
        0 0 0 1px rgba(0, 0, 0, 0.1) !important;
      transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
      overflow: hidden !important;
      border: 1px solid ${borderColor}80 !important;
    }
    
    /* Hue gradient - full HSL circle 0\u2013360\xB0 (red \u2192 yellow \u2192 green \u2192 cyan \u2192 blue \u2192 magenta \u2192 red) */
    .colorpicker-body .hue-container,
    .colorpicker-body .hue .hue-container {
      width: 100% !important;
      height: 100% !important;
      position: relative !important;
      background: linear-gradient(to right,
        #ff0000 0%,
        #ffff00 16.67%,
        #00ff00 33.33%,
        #00ffff 50%,
        #0000ff 66.67%,
        #ff00ff 83.33%,
        #ff0000 100%) !important;
    }
    
    /* Opacity Slider */
    .colorpicker-body .opacity,
    .colorpicker-body .opacity-control,
    .colorpicker-body .control .opacity {
      height: 12px !important;
      border-radius: 6px !important;
      position: relative !important;
      cursor: pointer !important;
      box-shadow: 
        inset 0 1px 3px rgba(0, 0, 0, 0.35),
        0 0 0 1px rgba(0, 0, 0, 0.1) !important;
      transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
      overflow: hidden !important;
      border: 1px solid ${borderColor}80 !important;
    }
    
    /* Opacity checkerboard background */
    .colorpicker-body .opacity-container,
    .colorpicker-body .opacity .opacity-container {
      width: 100% !important;
      height: 100% !important;
      position: relative !important;
      background:
        linear-gradient(45deg, ${bgColorSecondary} 25%, transparent 25%, transparent 75%, ${bgColorSecondary} 75%, ${bgColorSecondary}),
        linear-gradient(45deg, ${bgColorSecondary} 25%, transparent 25%, transparent 75%, ${bgColorSecondary} 75%, ${bgColorSecondary}),
        ${bgColor} !important;
      background-size: 8px 8px !important;
      background-position: 0 0, 4px 4px !important;
    }
    
    /* Color bar overlay for opacity */
    .colorpicker-body .color-bar,
    .colorpicker-body .opacity .color-bar {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      pointer-events: none !important;
    }
    
    /* Hover states for sliders */
    .colorpicker-body .hue:hover,
    .colorpicker-body .opacity:hover {
      box-shadow: 
        inset 0 1px 4px rgba(0, 0, 0, 0.35),
        0 0 0 2px ${statusColor}40 !important;
    }
    
    /* Drag Bar - Multiple selectors for all slider types */
    .colorpicker-body .drag-bar,
    .colorpicker-body .hue .drag-bar,
    .colorpicker-body .opacity .drag-bar,
    .colorpicker-body .hue-control .drag-bar,
    .colorpicker-body .opacity-control .drag-bar {
      position: absolute !important;
      top: 50% !important;
      width: 4px !important;
      height: 18px !important;
      background: linear-gradient(180deg, #ffffff 0%, #f0f0f0 100%) !important;
      border-radius: 2px !important;
      box-shadow: 
        0 2px 5px rgba(0, 0, 0, 0.45),
        0 0 0 1.5px rgba(0, 0, 0, 0.25),
        inset 0 1px 0 rgba(255, 255, 255, 0.4) !important;
      transform: translateX(-50%) translateY(-50%) !important;
      cursor: grab !important;
      transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1) !important;
      will-change: transform !important;
      z-index: 10 !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
    }
    
    .colorpicker-body .drag-bar:hover {
      transform: translateX(-50%) translateY(-50%) scale(1.15) !important;
      box-shadow: 
        0 3px 8px rgba(0, 0, 0, 0.5),
        0 0 0 2px ${statusColor}60,
        inset 0 1px 0 rgba(255, 255, 255, 0.5) !important;
    }
    
    .colorpicker-body .drag-bar:active {
      cursor: grabbing !important;
      transform: translateX(-50%) translateY(-50%) scale(1.08) !important;
    }
    
    /* Color preview squares in control section - Perfect squares 50x50 */
    .colorpicker-body .control .empty,
    .colorpicker-body .control > .color {
      border-radius: 8px !important;
      border: 1.5px solid ${borderColor}80 !important;
      cursor: pointer !important;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
      box-shadow: 
        0 1px 3px rgba(0, 0, 0, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
      flex-shrink: 0 !important;
    }
    
    /* Prev only: checkerboard as base (::before); curr gets color from library, no ::before to avoid hover glitch */
    .colorpicker-body .control .empty::before {
      content: '' !important;
      position: absolute !important;
      inset: 0 !important;
      border-radius: inherit !important;
      background:
        linear-gradient(45deg, ${bgColorSecondary} 25%, transparent 25%, transparent 75%, ${bgColorSecondary} 75%, ${bgColorSecondary}),
        linear-gradient(45deg, ${bgColorSecondary} 25%, transparent 25%, transparent 75%, ${bgColorSecondary} 75%, ${bgColorSecondary});
      background-size: 8px 8px !important;
      background-position: 0 0, 4px 4px !important;
      z-index: -1 !important;
      pointer-events: none !important;
    }
    
    .colorpicker-body .control > .color:hover {
      transform: scale(1.05) !important;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
    }
    
    /* Information Section - Compact */
    .colorpicker-body .information {
      padding: 8px 10px !important;
      background: ${bgColor}60 !important;
      border-bottom: 1px solid ${borderColor}50 !important;
      display: grid !important;
      grid-template-columns: auto 1fr !important;
      grid-template-rows: auto auto auto !important;
      gap: 6px 6px !important;
      align-items: start !important;
      flex-shrink: 0 !important;
      order: 2 !important;
    }
    
    /* Format Switcher Button - First column, first row */
    .colorpicker-body .information-change {
      grid-column: 1 !important;
      grid-row: 1 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: flex-start !important;
      margin: 0 !important;
      padding: 0 !important;
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
    }
    
    /* HEX Input Section - Second column, first row (SEMPRE VISIBILE) */
    .colorpicker-body .information-item.hex {
      grid-column: 2 !important;
      grid-row: 1 !important;
      display: grid !important;
      grid-template-columns: 1fr !important;
      margin: 0 !important;
    }
    
    /* RGB Input Section - Span both columns, second row */
    .colorpicker-body .information-item.rgb {
      grid-column: 1 / 3 !important;
      grid-row: 2 !important;
      display: grid !important;
      grid-template-columns: repeat(4, 1fr) !important;
      gap: 8px !important;
      margin: 0 !important;
    }
    
    /* HSL Input Section - Span both columns, third row */
    .colorpicker-body .information-item.hsl {
      grid-column: 1 / 3 !important;
      grid-row: 3 !important;
      display: grid !important;
      grid-template-columns: repeat(4, 1fr) !important;
      gap: 8px !important;
      margin: 0 !important;
    }
    
    /* Hidden state - controlled by JavaScript via class */
    .colorpicker-body .information-item.rgb.format-hidden,
    .colorpicker-body .information-item.hsl.format-hidden {
      display: none !important;
    }
    
    /* Arrow Buttons - Format switcher with LARGER clickable area */
    .colorpicker-body .arrow-button,
    .colorpicker-body .format-change-button {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: auto !important;
      height: auto !important;
      min-width: 30px !important;
      min-height: 30px !important;
      padding: 5px 8px !important;
      background: ${bgColorSecondary}cc !important;
      border: 1px solid ${borderColor}70 !important;
      border-radius: 6px !important;
      cursor: pointer !important;
      transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1) !important;
      position: relative !important;
      flex-shrink: 0 !important;
      pointer-events: auto !important;
      z-index: 100 !important;
      font-family: 'SF Mono', 'Monaco', 'Menlo', 'Consolas', 'Courier New', monospace !important;
      font-size: 10px !important;
      font-weight: 700 !important;
      color: ${textColor}80 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.3px !important;
      line-height: 1 !important;
      gap: 4px !important;
    }
    
    /* Palette Toggle Button - Full width, toggle visibility of palette section */
    .colorpicker-body .color-sets-choose-btn {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 100% !important;
      height: auto !important;
      min-height: 32px !important;
      padding: 8px 12px !important;
      background: ${bgColorSecondary}cc !important;
      border: 1px solid ${borderColor}70 !important;
      border-radius: 6px !important;
      cursor: pointer !important;
      transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1) !important;
      position: relative !important;
      pointer-events: auto !important;
      z-index: 100 !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
      font-size: 11px !important;
      font-weight: 600 !important;
      color: ${textColor} !important;
      text-transform: uppercase !important;
      letter-spacing: 0.5px !important;
      line-height: 1 !important;
      gap: 6px !important;
    }
    .colorpicker-body .color-sets-choose-btn:hover {
      background: ${borderColor}50 !important;
      border-color: ${borderColor} !important;
    }
    .colorpicker-body .colorsets .menu {
      width: 100% !important;
      margin-bottom: 8px !important;
    }
    
    /* Format Change Button - Down arrow icon (pointer-events NONE to allow clicks) */
    .colorpicker-body .format-change-button::after {
      content: '\u25BC' !important;
      margin-left: 0 !important;
      font-size: 14px !important;
      color: ${textColor}80 !important;
      line-height: 1 !important;
      pointer-events: none !important;
      display: inline-block !important;
      vertical-align: middle !important;
      font-family: monospace !important;
      transform: translateY(0px) !important;
      font-weight: 700 !important;
    }
    
    /* Color Sets Button - Text + chevron icon */
    .colorpicker-body .color-sets-choose-btn::before {
      content: 'Palette' !important;
      font-size: 11px !important;
      font-weight: 600 !important;
    }
    .colorpicker-body .color-sets-choose-btn::after {
      content: '\u25BC' !important;
      font-size: 10px !important;
      color: ${textColor}80 !important;
      line-height: 1 !important;
      transition: transform 0.2s ease !important;
    }
    .colorpicker-body .colorsets.palette-collapsed .color-sets-choose-btn::after {
      transform: rotate(-90deg) !important;
    }
    
    .colorpicker-body .arrow-button:hover {
      background: ${borderColor}60 !important;
      border-color: ${textColor}50 !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2) !important;
    }
    
    .colorpicker-body .arrow-button:hover::after {
      color: ${textColor} !important;
    }
    
    .colorpicker-body .arrow-button:active {
      transform: translateY(0) !important;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2) !important;
    }
    
    /* Input Fields - Already handled by .information grid layout above */
    /* HEX input is positioned via grid-column: 2 */
    /* RGB/HSL inputs span both columns via grid-column: 1 / 3 */
    
    .colorpicker-body .input-field {
      position: relative !important;
      display: flex !important;
      flex-direction: column !important;
    }
    
    /* Input Label - Optimized size for better readability */
    .colorpicker-body .input-field .title {
      position: static !important;
      transform: none !important;
      font-size: 9px !important;
      color: ${textColor}70 !important;
      font-weight: 700 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.6px !important;
      margin-bottom: 4px !important;
      pointer-events: none !important;
    }
    
    /* Input Field - Optimized padding for better proportions */
    .colorpicker-body .input-field .input {
      width: 100% !important;
      padding: 8px 6px !important;
      background: ${bgColorSecondary}cc !important;
      border: 1px solid ${borderColor}70 !important;
      border-radius: 6px !important;
      color: ${textColor} !important;
      font-size: 12px !important;
      font-weight: 600 !important;
      text-align: center !important;
      font-family: 'SF Mono', 'Monaco', 'Menlo', 'Consolas', 'Courier New', monospace !important;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
      -webkit-user-select: text !important;
      user-select: text !important;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.08) !important;
      min-height: 32px !important;
    }
    
    .colorpicker-body .input-field .input:hover {
      border-color: ${textColor}50 !important;
      background: ${bgColorSecondary}e6 !important;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.08), 0 0 0 1px ${borderColor}30 !important;
    }
    
    .colorpicker-body .input-field .input:focus {
      outline: none !important;
      border-color: ${statusColor} !important;
      background: ${bgColor}f0 !important;
      box-shadow: 
        inset 0 1px 2px rgba(0, 0, 0, 0.08),
        0 0 0 3px ${statusColor}25,
        0 1px 3px rgba(0, 0, 0, 0.1) !important;
      transform: translateY(-1px) !important;
    }
    
    /* Input Postfix - Optimized position */
    .colorpicker-body .input-field .postfix {
      position: absolute !important;
      right: 8px !important;
      bottom: 9px !important;
      font-size: 9px !important;
      color: ${textColor}50 !important;
      pointer-events: none !important;
      font-weight: 600 !important;
    }
    
    /* Color Presets - Layout per ace-colorpicker + colorpicker-enhanced.css (lib structure: .color-item > .empty + .color-view; + only when Custom) */
    .colorpicker-body .colorsets {
      padding: 6px 12px 10px !important;
      background: ${bgColor}80 !important;
      flex-shrink: 0 !important;
      order: 3 !important;
      min-width: 0 !important;
      width: 100% !important;
      position: relative !important;
      z-index: 10 !important;
      overflow: visible !important;
      box-sizing: border-box !important;
    }
    
    /* color-list: flex wrap (enhanced). current-color-sets: display contents so .color-item / .add-color-item are direct flex children */
    .colorpicker-body .colorsets .color-list {
      display: flex !important;
      flex-wrap: wrap !important;
      justify-content: center !important;
      align-items: flex-start !important;
      gap: 8px !important;
      padding: 8px 0 !important;
      min-width: 0 !important;
      width: 100% !important;
      overflow: visible !important;
      box-sizing: border-box !important;
    }
    .colorpicker-body .colorsets .current-color-sets {
      display: contents !important;
    }
    
    /* add-color-item: + button (Custom only). Enhanced has no rule; match .color-item size, always visible */
    .colorpicker-body .colorsets .add-color-item {
      flex: 0 0 28px !important;
      flex-shrink: 0 !important;
      width: 28px !important;
      height: 28px !important;
      min-width: 28px !important;
      min-height: 28px !important;
      border-radius: 4px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      border: 1px dashed ${borderColor} !important;
      background: ${bgColorSecondary}ee !important;
      cursor: pointer !important;
      color: ${textColor} !important;
      font-size: 18px !important;
      font-weight: 600 !important;
      line-height: 1 !important;
      visibility: visible !important;
      opacity: 1 !important;
      z-index: 1 !important;
      transition: transform 0.15s ease, background 0.15s ease !important;
    }
    .colorpicker-body .colorsets .add-color-item:hover {
      transform: scale(1.1) !important;
      background: ${borderColor}40 !important;
    }
    
    /* color-item: enhanced base. Overlay .empty + .color-view via absolute so checkerboard shows through transparent */
    .colorpicker-body .colorsets .color-item {
      flex: 0 0 28px !important;
      width: 28px !important;
      height: 28px !important;
      min-width: 28px !important;
      min-height: 28px !important;
      position: relative !important;
      cursor: pointer !important;
      border-radius: 4px !important;
      overflow: hidden !important;
      box-sizing: border-box !important;
      transition: transform 0.15s ease !important;
    }
    .colorpicker-body .colorsets .color-item:hover {
      transform: scale(1.15) !important;
    }
    .colorpicker-body .colorsets .color-item:active {
      transform: scale(1.05) !important;
    }
    
    /* .empty: checkerboard (enhanced). Base layer; transparent .color-view shows it */
    .colorpicker-body .colorsets .color-item .empty {
      position: absolute !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      border-radius: inherit !important;
      box-sizing: border-box !important;
      border: 1px solid ${borderColor} !important;
      background: linear-gradient(45deg, ${bgColorSecondary} 25%, transparent 25%, transparent 75%, ${bgColorSecondary} 75%, ${bgColorSecondary}),
        linear-gradient(45deg, ${bgColorSecondary} 25%, transparent 25%, transparent 75%, ${bgColorSecondary} 75%, ${bgColorSecondary}),
        ${bgColor} !important;
      background-size: 6px 6px !important;
      background-position: 0 0, 3px 3px !important;
    }
    
    /* .color-view: color layer (enhanced). library sets style="background-color: ..."; transparent = see .empty */
    .colorpicker-body .colorsets .color-item .color-view {
      position: absolute !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      border-radius: inherit !important;
      box-sizing: border-box !important;
      border: 1px solid ${borderColor} !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
      transition: box-shadow 0.15s ease !important;
    }
    .colorpicker-body .colorsets .color-item:hover .color-view {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
    }
    
    /* Inline color token - ace-colorpicker highlights color values with .ace_color */
    .ace_color {
      padding: 0 2px !important;
      border-radius: 2px !important;
      min-width: 0.6em !important;
      display: inline-block !important;
    }
    /* Inline Color Preview (in editor) - Optimized size */
    .ace-colorview {
      position: absolute !important;
      width: 14px !important;
      height: 14px !important;
      border-radius: 3px !important;
      margin-left: 6px !important;
      cursor: pointer !important;
      border: 2px solid ${borderColor}cc !important;
      background: 
        linear-gradient(45deg, #70707020 25%, transparent 25%, transparent 75%, #70707020 75%, #70707020),
        linear-gradient(45deg, #70707020 25%, transparent 25%, transparent 75%, #70707020 75%, #70707020) !important;
      background-size: 4px 4px !important;
      background-position: 0 0, 2px 2px !important;
      transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1) !important;
      box-shadow: 
        0 2px 4px rgba(0, 0, 0, 0.25),
        inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
    }
    
    .ace-colorview:hover {
      transform: scale(1.3) translateY(-1px) !important;
      box-shadow: 
        0 5px 14px rgba(0, 0, 0, 0.45),
        0 2px 6px rgba(0, 0, 0, 0.3),
        0 0 0 2px ${statusColor}50 !important;
      border-color: ${statusColor} !important;
      z-index: 100 !important;
    }
    
    /* Context Menu - positioned relative to picker (containing block from backdrop-filter) */
    .colorpicker-body .colorsets-contextmenu:not(.show) {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
    .colorpicker-body .colorsets-contextmenu.show {
      display: block !important;
      visibility: visible !important;
      pointer-events: auto !important;
    }
    .colorpicker-body .colorsets-contextmenu.show:not(.repositioned) {
      opacity: 0 !important;
    }
    .colorpicker-body .colorsets-contextmenu.show.repositioned {
      opacity: 1 !important;
    }
    .colorpicker-body .colorsets-contextmenu {
      position: absolute !important;
      width: auto !important;
      min-width: max-content !important;
      max-width: 200px !important;
      box-sizing: border-box !important;
      margin: 0 !important;
      padding: 4px !important;
      background: ${bgColorSecondary}fa !important;
      border: 1px solid ${borderColor}90 !important;
      border-radius: 6px !important;
      box-shadow: 
        0 8px 24px rgba(0, 0, 0, 0.5),
        0 2px 8px rgba(0, 0, 0, 0.3),
        0 0 0 1px rgba(255, 255, 255, 0.05) !important;
      list-style: none !important;
      z-index: 100000 !important;
      backdrop-filter: blur(12px) !important;
      -webkit-backdrop-filter: blur(12px) !important;
    }
    
    .colorpicker-body .colorsets-contextmenu li {
      padding: 6px 12px !important;
      border-radius: 4px !important;
      cursor: pointer !important;
      font-size: 11px !important;
      font-weight: 500 !important;
      color: ${textColor} !important;
      white-space: nowrap !important;
      transition: background 0.12s ease !important;
    }
    
    .colorpicker-body .colorsets-contextmenu li:hover {
      background: ${borderColor}50 !important;
      color: ${textColor} !important;
    }
    
    .colorpicker-body .colorsets-contextmenu li:active {
      background: ${borderColor}70 !important;
    }
    
    /* Color Chooser (Material / Color Scale / Custom dropdown) - always visible inside .colorsets when section is expanded */
    .colorpicker-body .color-chooser {
      display: block !important;
      visibility: visible !important;
      position: relative !important;
      height: auto !important;
      max-height: 35vh !important;
      overflow-y: auto !important;
      width: 100% !important;
      margin: 0 0 8px 0 !important;
      padding: 10px !important;
      background: ${bgColorSecondary}ee !important;
      border: 1px solid ${borderColor}60 !important;
      border-radius: 6px !important;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1) !important;
      pointer-events: auto !important;
      cursor: default !important;
      box-sizing: border-box !important;
    }
    
    /* Hide dropdown + swatches when palette section is fully collapsed */
    .colorpicker-body .colorsets.palette-collapsed .color-chooser,
    .colorpicker-body .colorsets.palette-collapsed .color-list {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      overflow: hidden !important;
      pointer-events: none !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    
    /* X button: hide only the list (Material/Custom/Color Scale), keep header (Color Palettes + X) visible */
    .colorpicker-body .colorsets.chooser-collapsed .color-chooser .colorsets-list {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      overflow: hidden !important;
      pointer-events: none !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    
    /* Chooser inner: header (Color Palettes + X button) - side by side, compact */
    .colorpicker-body .color-chooser-container {
      display: block !important;
      visibility: visible !important;
    }
    .colorpicker-body .colorsets-item-header {
      display: flex !important;
      flex-direction: row !important;
      justify-content: space-between !important;
      align-items: center !important;
      margin-bottom: 8px !important;
      padding: 0 0 6px 0 !important;
      border-bottom: 1px solid ${borderColor}60 !important;
      gap: 8px !important;
    }
    .colorpicker-body .colorsets-item-header .title,
    .colorpicker-body .colorsets-item-header h1 {
      font-size: 10px !important;
      font-weight: 700 !important;
      color: ${textColor}90 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.5px !important;
      margin: 0 !important;
      flex: 1 !important;
      white-space: nowrap !important;
    }
    .colorpicker-body .colorsets-item-header .items,
    .colorpicker-body .colorsets-item-header span {
      font-size: 14px !important;
      cursor: pointer !important;
      color: ${textColor}60 !important;
      padding: 2px 6px !important;
      border-radius: 4px !important;
      transition: all 0.15s ease !important;
      line-height: 1 !important;
      flex-shrink: 0 !important;
    }
    .colorpicker-body .colorsets-item-header .items:hover,
    .colorpicker-body .colorsets-item-header span:hover {
      background: ${borderColor}50 !important;
      color: ${textColor} !important;
    }
    
    /* Palette sections list (Material, Custom, Color Scale) - wrap layout */
    .colorpicker-body .colorsets-list {
      display: flex !important;
      flex-direction: row !important;
      flex-wrap: wrap !important;
      gap: 6px !important;
      visibility: visible !important;
      max-height: none !important;
      overflow: visible !important;
    }
    /* First child wrapper: display contents so children flow directly */
    .colorpicker-body .colorsets-list > div:first-child {
      display: contents !important;
    }
    
    /* Each palette section base style */
    .colorpicker-body .colorsets-item {
      display: flex !important;
      flex-wrap: wrap !important;
      visibility: visible !important;
      padding: 6px 8px !important;
      border-radius: 5px !important;
      cursor: pointer !important;
      border: 1px solid ${borderColor}30 !important;
      background: ${bgColor}30 !important;
      transition: background 0.15s ease, border-color 0.15s ease !important;
    }
    .colorpicker-body .colorsets-item:hover {
      background: ${borderColor}25 !important;
      border-color: ${borderColor}60 !important;
    }
    
    /* Material and Color Scale: side by side (each ~50%) */
    .colorpicker-body .colorsets-item[data-colorsets-index="0"],
    .colorpicker-body .colorsets-item[data-colorsets-index="2"] {
      flex: 1 1 calc(50% - 3px) !important;
    }
    
    /* Custom: full width below */
    .colorpicker-body .colorsets-item[data-colorsets-index="1"] {
      flex: 1 1 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
      order: 3 !important;
      justify-content: space-between !important;
    }
    
    /* Palette section title (MATERIAL, CUSTOM, COLOR SCALE) */
    .colorpicker-body .colorsets-item .title,
    .colorpicker-body .colorsets-item h1 {
      display: block !important;
      visibility: visible !important;
      font-size: 10px !important;
      font-weight: 700 !important;
      color: ${textColor}70 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.5px !important;
      margin: 0 0 4px 0 !important;
      white-space: nowrap !important;
    }
    
    /* Color previews inside each palette section - horizontal row */
    .colorpicker-body .colorsets-item .items {
      display: flex !important;
      flex-direction: row !important;
      flex-wrap: wrap !important;
      gap: 3px !important;
      visibility: visible !important;
    }
    .colorpicker-body .colorsets-item .items > div {
      display: flex !important;
      flex-direction: row !important;
      flex-wrap: wrap !important;
      gap: 2px !important;
    }
    .colorpicker-body .colorsets-item .items .color-item {
      flex: 0 0 14px !important;
      width: 14px !important;
      height: 14px !important;
      min-width: 14px !important;
      min-height: 14px !important;
      border-radius: 2px !important;
    }
    .colorpicker-body .colorsets-item .items .color-item .color-view {
      width: 100% !important;
      height: 100% !important;
      border-radius: inherit !important;
    }
    
    /* Accessibility - WCAG AAA Compliant */
    .colorpicker-body *:focus-visible {
      outline: 3px solid ${statusColor} !important;
      outline-offset: 3px !important;
      border-radius: 4px !important;
    }
    
    /* Keyboard Navigation Indicators */
    .colorpicker-body button:focus-visible,
    .colorpicker-body .color-item:focus-visible {
      outline: 3px solid ${statusColor} !important;
      outline-offset: 2px !important;
      box-shadow: 0 0 0 5px ${statusColor}20 !important;
    }
    
    /* Reduced Motion Support */
    @media (prefers-reduced-motion: reduce) {
      .colorpicker-body,
      .colorpicker-body *,
      .colorpicker-body *::before,
      .colorpicker-body *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
    
    /* High Contrast Mode */
    @media (prefers-contrast: high) {
      .colorpicker-body {
        border-width: 3px !important;
        border-color: ${textColor} !important;
      }
      .colorpicker-body .input-field .input:focus {
        outline: 4px solid ${statusColor} !important;
        outline-offset: 3px !important;
      }
      .colorpicker-body button:hover {
        outline: 2px solid ${textColor} !important;
      }
    }
    
    /* Dark Mode Enhancements */
    @media (prefers-color-scheme: dark) {
      .colorpicker-body {
        box-shadow: 
          0 0 0 1px rgba(255, 255, 255, 0.05),
          0 24px 72px -12px rgba(0, 0, 0, 0.95),
          0 12px 32px -8px rgba(0, 0, 0, 0.7) !important;
      }
    }
    
    /* Light Mode Enhancements */
    @media (prefers-color-scheme: light) {
      .colorpicker-body {
        box-shadow: 
          0 0 0 1px rgba(0, 0, 0, 0.08),
          0 20px 60px -10px rgba(0, 0, 0, 0.25),
          0 8px 24px -8px rgba(0, 0, 0, 0.15) !important;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="header-left">
      <button class="btn btn-icon" onclick="showHelp()" title="Help & Shortcuts">?</button>
      <button class="btn btn-icon" onclick="showAbout()" title="About ReDesign">\u2139</button>
      <button class="btn" onclick="openSettings()" title="Settings">\u2699 Settings</button>
    </div>
    <div class="header-right">
      <div class="status">${autoSave ? "Auto-saving" : "Manual save"}</div>
    </div>
  </div>
  <div id="editor">/* Loading editor... */</div>
  <div class="status-bar">
    <div class="status-bar-left">
      <span class="status-bar-item" id="status-position">Ln 1, Col 1</span>
      <span class="status-bar-item" id="status-selection" style="display:none"></span>
      <span class="status-bar-item">CSS</span>
      <span class="status-bar-item">UTF-8</span>
      <span class="status-bar-item">Tab ${tabSize}</span>
    </div>
    <div class="status-bar-right">
      <span class="status-bar-item status-message" id="status-message">Ctrl+S save \u2022 Ctrl+F find</span>
    </div>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/ace.js"><\/script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/ext-language_tools.js"><\/script>
  <script>
    // Load ace-colorpicker: inline first (no livereload), then CDN fallback
    (function() {
      var inline = typeof __ACE_COLORPICKER_INLINE__ !== 'undefined' && __ACE_COLORPICKER_INLINE__;
      if (inline) {
        var el = document.createElement('script');
        el.textContent = inline;
        document.head.appendChild(el);
        console.log('[ReDesign] \u2713 Loaded ace-colorpicker (inline, no livereload)');
        return;
      }
      var cdnSources = [
        'https://cdn.jsdelivr.net/npm/ace-colorpicker@0.0.12/addon/ace-colorpicker.min.js',
        'https://unpkg.com/ace-colorpicker@0.0.12/addon/ace-colorpicker.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/ace-colorpicker/0.0.12/ace-colorpicker.min.js'
      ];
      var idx = 0;
      function load(url) {
        return new Promise(function(resolve, reject) {
          var s = document.createElement('script');
          s.src = url;
          s.onload = function() { console.log('[ReDesign] \u2713 Loaded ace-colorpicker from:', url); resolve(); };
          s.onerror = reject;
          document.head.appendChild(s);
        });
      }
      function next() {
        if (idx >= cdnSources.length) {
          console.error('[ReDesign] \u2717 All CDN sources failed');
          return;
        }
        load(cdnSources[idx]).catch(function() { idx++; next(); });
      }
      next();
    })();
  <\/script>
  <script>
    const CLOSE_HOTKEY = ${JSON.stringify(this.openHotkey)};
    let editor;
    function initEditor() {
      if (typeof ace === 'undefined') {
        setTimeout(initEditor, 50);
        return;
      }
      try {
        editor = ace.edit("editor");
      } catch (e) {
        document.getElementById("editor").innerHTML = '<span style="color:#e74c3c;font-size:12px;">Failed to load editor. Check console.</span>';
        console.error('[ReDesign] Editor init error:', e);
        return;
      }
      const theme = ${JSON.stringify(aceTheme)};
      console.log("[ReDesign] Setting Ace theme:", theme);
      editor.setTheme(theme);
      editor.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        fontSize: "${this.state.fontSize}",
        showPrintMargin: false,
        highlightActiveLine: true,
        showGutter: ${lineNumbers},
        tabSize: ${tabSize},
        useSoftTabs: true,
        wrap: ${wordWrap}
      });
      console.log('[ReDesign] \u2713 Editor initialized and ready');
      function updateStatusBar() {
        try {
          var pos = editor.getSelection().getCursor();
          var line = pos.row + 1, col = pos.column + 1;
          var posEl = document.getElementById('status-position');
          if (posEl) posEl.textContent = 'Ln ' + line + ', Col ' + col;
          var range = editor.getSelection().getRange();
          var selEl = document.getElementById('status-selection');
          if (selEl) {
            if (range.isEmpty()) {
              selEl.textContent = '';
              selEl.style.display = 'none';
            } else {
              var start = range.start, end = range.end;
              selEl.textContent = start.row === end.row ? (end.column - start.column) + ' selected' : (end.row - start.row + 1) + ' lines selected';
              selEl.style.display = '';
            }
          }
        } catch (e) {}
      }
      editor.on('changeCursor', updateStatusBar);
      editor.on('changeSelection', updateStatusBar);
      updateStatusBar();
      tryInitColorPicker();
      setTimeout(runPostEditorInit, 150);
    }
    function tryInitColorPicker(maxAttempts) {
      maxAttempts = maxAttempts || 50;
        let attempts = 0;
        const checkInterval = setInterval(function() {
          attempts++;
          if (typeof AceColorPicker !== 'undefined') {
            console.log('[ReDesign] \u2713 AceColorPicker loaded after', attempts, 'attempts');
            clearInterval(checkInterval);
            initializeColorPicker();
          } else if (attempts >= maxAttempts) {
            console.warn('[ReDesign] \u26A0\uFE0F AceColorPicker not loaded after', maxAttempts, 'attempts - editor works without it');
            clearInterval(checkInterval);
          }
        }, 100);
      }
    function runPostEditorInit() {
    var currentCSS = '';
    var saveTimeout = null;
    window.parent.postMessage({ type: 'REQUEST_CSS' }, '*');
    window.addEventListener('message', function(event) {
      if (event.data && event.data.type === 'SET_CSS') {
        currentCSS = event.data.css;
        if (editor && editor.getValue() !== currentCSS) {
          var cursorPosition = editor.getCursorPosition();
          editor.setValue(currentCSS, -1);
          editor.moveCursorToPosition(cursorPosition);
        }
      }
    });
    var autoSaveEnabled = ${autoSave};
    if (editor && editor.session) editor.session.on('change', function() {
      if (autoSaveEnabled) {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(function() {
          var css = editor.getValue();
          if (css !== currentCSS) {
            currentCSS = css;
            window.parent.postMessage({ type: 'UPDATE_CSS', css: css }, '*');
          }
        }, 300);
      }
    });
    editor.commands.addCommand({
      name: 'save',
      bindKey: { win: 'Ctrl-S', mac: 'Cmd-S' },
      exec: function(ed) {
        var css = ed.getValue();
        window.parent.postMessage({ type: 'UPDATE_CSS', css: css }, '*');
        var msgEl = document.getElementById('status-message');
        if (msgEl) {
          var originalText = msgEl.textContent;
          msgEl.textContent = 'Saved';
          msgEl.classList.add('saved');
          setTimeout(function() {
            msgEl.textContent = originalText;
            msgEl.classList.remove('saved');
          }, 1500);
        }
      }
    });
    editor.commands.addCommand({
      name: 'toggleEditor',
      bindKey: { win: CLOSE_HOTKEY, mac: CLOSE_HOTKEY },
      exec: function() {
        window.parent.postMessage({ type: 'CLOSE_EDITOR' }, '*');
      }
    });
    window.addEventListener('load', function() {
      if (editor) editor.focus();
    });
    }
      function initializeColorPicker() {
        // Initialize ace-colorpicker for color preview and picker
        console.log('[ReDesign] Initializing color picker...');
        console.log('[ReDesign] AceColorPicker available:', typeof AceColorPicker !== 'undefined');

        if (typeof AceColorPicker !== 'undefined') {
        try {
          var lastXY = { x: 0, y: 0 };
          var lastPrevColor = null;
          var colorPickerInstance = null;
          var cpSetupCallCount = 0;
          var cpObserverEventCount = 0;
          var cpInitTimestamp = Date.now();
          console.log('[ReDesign][CP] init context', {
            initAt: cpInitTimestamp,
            editorReady: !!editor,
            aceAvailable: typeof ace !== 'undefined'
          });
          // CRITICAL: Set CSS mode and init color picker ONLY after mode is loaded.
          // AceColorPicker injects highlight rules into the current mode; if we call load()
          // before the CSS mode is active, rules are injected into the wrong mode and colors
          // in the editor are not highlighted (no .ace_color tokens).
          // We also run our own rule injection so color highlighting works even if the addon's fails (e.g. CDN build structure).
          var colorPickerLoaded = false;
          var COLOR_REGEX = '#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?)|rgb\\((?:\\s*\\d{1,3},\\s*){2}\\d{1,3}\\s*\\)|rgba\\((?:\\s*\\d{1,3},\\s*){3}\\d*\\.?\\d+\\s*\\)|hsl\\(\\s*\\d{1,3}(?:,\\s*\\d{1,3}%){2}\\s*\\)|hsla\\(\\s*\\d{1,3}(?:,\\s*\\d{1,3}%){2},\\s*\\d*\\.?\\d+\\s*\\)';
          function injectColorHighlightRules() {
            try {
              var session = editor.session;
              var mode = session.$mode;
              if (!mode) return;
              var rules = (mode.$highlightRules && mode.$highlightRules.getRules && mode.$highlightRules.getRules()) || mode.$rules;
              if (!rules || typeof rules !== 'object') return;
              var colorRule = { token: 'color', regex: COLOR_REGEX };
              for (var stateName in rules) {
                if (Object.prototype.hasOwnProperty.call(rules, stateName) && Array.isArray(rules[stateName])) {
                  rules[stateName].unshift(colorRule);
                }
              }
              mode.$tokenizer = null;
              if (session.bgTokenizer && session.bgTokenizer.setTokenizer && mode.getTokenizer) {
                session.bgTokenizer.setTokenizer(mode.getTokenizer());
                session.bgTokenizer.start(0);
              }
              editor.renderer.updateFull(true);
              console.log('[ReDesign] \u2713 Color highlight rules injected');
            } catch (e) {
              console.warn('[ReDesign] Color rule injection failed:', e);
            }
          }
          function doLoadColorPicker() {
            if (colorPickerLoaded) return;
            colorPickerLoaded = true;
            console.log('[ReDesign] \u2713 CSS mode active, loading AceColorPicker (doLoadColorPicker)');
            var colorView = AceColorPicker.load(ace, editor, {
              showDelay: 300,
              hideDelay: 1000
            });
            console.log('[ReDesign][CP] AceColorPicker.load result', {
              hasColorView: !!colorView,
              hasColorpicker: !!(colorView && colorView.colorpicker)
            });
            // Library closes picker when mousemove target changes (e.g. leaving token). Don't close if cursor is over the picker.
            document.addEventListener('mousemove', function(e) { lastXY.x = e.clientX; lastXY.y = e.clientY; }, true);
            var originalClose = colorView.close_color_picker && colorView.close_color_picker.bind(colorView);
            if (originalClose) {
              colorView.close_color_picker = function() {
                var picker = document.querySelector('.colorpicker-body');
                if (picker) {
                  var control = picker.querySelector('.control');
                  if (control) {
                    var swatches = Array.from(control.children).filter(function(c) { return c.classList && (c.classList.contains('color') || c.classList.contains('empty')); });
                    var currEl = swatches[1];
                    if (currEl) {
                      var bg = window.getComputedStyle(currEl).backgroundColor;
                      if (bg) lastPrevColor = bg;
                    }
                  }
                }
                requestAnimationFrame(function() {
                  var el = document.elementFromPoint(lastXY.x, lastXY.y);
                  if (el && (el.closest('.ace-colorpicker') || el.closest('.colorpicker-body'))) return;
                  originalClose();
                });
              };
            }
            var cp = colorView.colorpicker;
            colorPickerInstance = cp;
            console.log('[ReDesign][CP] colorPickerInstance set', {
              hasInstance: !!cp,
              keys: cp ? Object.keys(cp) : null
            });
            if (cp && cp.hide) {
              var originalHide = cp.hide.bind(cp);
              cp.hide = function() {
                var picker = document.querySelector('.colorpicker-body');
                if (picker) {
                  var control = picker.querySelector('.control');
                  if (control) {
                    var swatches = Array.from(control.children).filter(function(c) { return c.classList && (c.classList.contains('color') || c.classList.contains('empty')); });
                    var currEl = swatches[1];
                    if (currEl) {
                      var bg = window.getComputedStyle(currEl).backgroundColor;
                      if (bg) lastPrevColor = bg;
                    }
                  }
                }
                var el = document.elementFromPoint(lastXY.x, lastXY.y);
                if (el && (el.closest('.ace-colorpicker') || el.closest('.colorpicker-body'))) return;
                originalHide();
              };
            }
            injectColorHighlightRules();
            console.log('[ReDesign] \u2713 Color picker initialized successfully');
            setTimeout(function() {
              var pb = document.querySelector('.colorpicker-body');
              if (pb && typeof runColorPickerSetup === 'function') runColorPickerSetup(pb);
            }, 100);
          }

          editor.session.setMode("ace/mode/css", function() {
            console.log('[ReDesign][CP] editor.session.setMode callback fired, loading color picker');
            doLoadColorPicker();
          });
          // Fallback: if setMode does not invoke callback (e.g. mode already set), init after short delay
          setTimeout(function() {
            if (!colorPickerLoaded) {
              try {
                var m = editor.session.getMode && editor.session.getMode();
                console.log('[ReDesign][CP] fallback setMode timeout fired', {
                  hasMode: !!m,
                  modeId: m && m.$id
                });
                if (m && m.$id === 'ace/mode/css') {
                  doLoadColorPicker();
                }
              } catch (e) {
                console.warn('[ReDesign][CP] fallback setMode error', e);
              }
            }
          }, 100);

          function runColorPickerSetup(pickerBody) {
            cpSetupCallCount++;
            if (!pickerBody) {
              console.warn('[ReDesign][CPSetup] called with null pickerBody, call #', cpSetupCallCount);
              return;
            }
            var existingId = pickerBody.getAttribute('data-redesign-id') || null;
            if (!existingId) {
              existingId = String(Date.now()) + '-' + String(cpSetupCallCount);
              pickerBody.setAttribute('data-redesign-id', existingId);
            }
            console.log('[ReDesign][CPSetup] start', {
              call: cpSetupCallCount,
              pickerId: existingId,
              hasSetupDone: pickerBody.hasAttribute('data-redesign-setup-done')
            });
            if (pickerBody.hasAttribute('data-redesign-setup-done')) {
              console.log('[ReDesign][CPSetup] abort: setup already done for pickerId', existingId);
              return;
            }
            pickerBody.setAttribute('data-redesign-setup-done', '1');

            var colorsets = pickerBody.querySelector('.colorsets');
            var rgbSection = pickerBody.querySelector('.information-item.rgb');
            var hslSection = pickerBody.querySelector('.information-item.hsl');
            var hexSection = pickerBody.querySelector('.information-item.hex');
            console.log('[ReDesign][CPSetup] sections presence', {
              hasColorsets: !!colorsets,
              hasRgb: !!rgbSection,
              hasHsl: !!hslSection,
              hasHex: !!hexSection
            });
            if (!hexSection || !rgbSection || !hslSection) {
              console.warn('[ReDesign][CPSetup] abort: sections missing, removing setup flag', {
                pickerId: existingId
              });
              pickerBody.removeAttribute('data-redesign-setup-done');
              return;
            }
            rgbSection.classList.add('format-hidden');
            hslSection.classList.add('format-hidden');

            var currentFormat = 'hex';
            var isToggling = false;
            var toggleTimeout = null;
            function toggleFormat() {
              if (isToggling) return;
              isToggling = true;
              if (toggleTimeout) clearTimeout(toggleTimeout);
              if (currentFormat === 'hex') {
                currentFormat = 'expanded';
                rgbSection.classList.remove('format-hidden');
                hslSection.classList.remove('format-hidden');
              } else {
                currentFormat = 'hex';
                rgbSection.classList.add('format-hidden');
                hslSection.classList.add('format-hidden');
              }
              toggleTimeout = setTimeout(function() { isToggling = false; }, 200);
            }

            var syncing = false;
            function rgbToHsl(r, g, b, a) {
              r /= 255; g /= 255; b /= 255;
              var max = Math.max(r,g,b), min = Math.min(r,g,b), d = max - min;
              var h = 0, s = 0, l = (max + min) / 2;
              if (d) {
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                else if (max === g) h = ((b - r) / d + 2) / 6;
                else h = ((r - g) / d + 4) / 6;
              }
              return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100), a: a };
            }
            function hslToRgb(h, s, l, a) {
              h /= 360; s /= 100; l /= 100;
              var r, g, b;
              if (s === 0) r = g = b = l;
              else {
                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                var hue2rgb = function(p, q, t) {
                  if (t < 0) t += 1; if (t > 1) t -= 1;
                  if (t < 1/6) return p + (q - p) * 6 * t;
                  if (t < 1/2) return q;
                  if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                  return p;
                };
                r = hue2rgb(p, q, h + 1/3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1/3);
              }
              return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255), a: a };
            }
            function parseNum(v, def) { var n = parseFloat(String(v).replace(/[^0-9.-]/g, '')); return isNaN(n) ? def : n; }

            pickerBody.addEventListener('click', function(e) {
              var t = e.target;
              if (!t || !t.closest) return;
              console.log('[ReDesign][CPSetup:click]', {
                pickerId: pickerBody.getAttribute('data-redesign-id'),
                targetTag: t.tagName,
                targetClass: t.className
              });
              var control = pickerBody.querySelector('.control');
              if (control) {
                var swatches = Array.from(control.children).filter(function(c) { return c.classList && (c.classList.contains('color') || c.classList.contains('empty')); });
                var prevEl = swatches[0];
                if (prevEl && (t === prevEl || prevEl.contains(t))) {
                  e.preventDefault();
                  e.stopPropagation();
                  var bg = window.getComputedStyle(prevEl).backgroundColor;
                  if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
                    try {
                      if (colorPickerInstance && colorPickerInstance.initColor) colorPickerInstance.initColor(bg);
                    } catch (err) {}
                  }
                  return;
                }
              }
              if (t.closest('.format-change-button') || (t.closest('.information-change') && t.closest('button'))) {
                console.log('[ReDesign][CPSetup:click] format toggle button hit');
                e.preventDefault();
                e.stopPropagation();
                toggleFormat();
                return;
              }
              if (colorsets && t.closest('.color-sets-choose-btn')) {
                console.log('[ReDesign][CPSetup:click] palette toggle button hit');
                e.preventDefault();
                e.stopPropagation();
                colorsets.classList.toggle('palette-collapsed');
                if (!colorsets.classList.contains('palette-collapsed')) colorsets.classList.remove('chooser-collapsed');
                return;
              }
              var chooserHeader = colorsets ? colorsets.querySelector('.colorsets-item-header .items') : null;
              if (chooserHeader && (t === chooserHeader || chooserHeader.contains(t))) {
                console.log('[ReDesign][CPSetup:click] chooser header toggle hit');
                e.preventDefault();
                e.stopPropagation();
                colorsets.classList.toggle('chooser-collapsed');
                chooserHeader.textContent = colorsets.classList.contains('chooser-collapsed') ? '+' : '\xD7';
                return;
              }
            }, true);

            pickerBody.addEventListener('input', function(e) {
              var inp = e.target;
              if (!inp || !rgbSection || !hslSection || syncing) return;
              var rgbInputs = Array.from(rgbSection.querySelectorAll('.input-field .input, .input-field input'));
              var hslInputs = Array.from(hslSection.querySelectorAll('.input-field .input, .input-field input'));
              console.log('[ReDesign][CPSetup:input]', {
                pickerId: pickerBody.getAttribute('data-redesign-id'),
                targetClass: inp.className,
                inRgbSection: rgbSection && rgbSection.contains && rgbSection.contains(inp),
                inHslSection: hslSection && hslSection.contains && hslSection.contains(inp),
                rgbInputsCount: rgbInputs.length,
                hslInputsCount: hslInputs.length
              });
              if (rgbInputs.length < 4 || hslInputs.length < 4) return;
              if (rgbSection.contains(inp)) {
                var r = parseNum(rgbInputs[0].value, 0), g = parseNum(rgbInputs[1].value, 0), b = parseNum(rgbInputs[2].value, 0);
                var a = rgbInputs[3] ? parseNum(rgbInputs[3].value, 255) : 255;
                if (a > 1) a = a / 255;
                var hsl = rgbToHsl(r, g, b, a);
                syncing = true;
                hslInputs[0].value = hsl.h; hslInputs[1].value = hsl.s; hslInputs[2].value = hsl.l;
                if (hslInputs[3]) hslInputs[3].value = (a <= 1 ? Math.round(a * 100) : 100);
                hslInputs.forEach(function(i) { i.dispatchEvent(new Event('input', { bubbles: true })); });
                setTimeout(function() { syncing = false; }, 0);
                var colorStr = a < 1 ? 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')' : 'rgb(' + r + ',' + g + ',' + b + ')';
                try { if (colorPickerInstance && colorPickerInstance.initColor) colorPickerInstance.initColor(colorStr); } catch (err) {}
              } else if (hslSection.contains(inp)) {
                var h = parseNum(hslInputs[0].value, 0), s = parseNum(hslInputs[1].value, 0), l = parseNum(hslInputs[2].value, 0);
                var a = hslInputs[3] ? parseNum(hslInputs[3].value, 100) : 100;
                if (a > 1) a = a / 100;
                var rgb = hslToRgb(h, s, l, a);
                syncing = true;
                rgbInputs[0].value = rgb.r; rgbInputs[1].value = rgb.g; rgbInputs[2].value = rgb.b;
                if (rgbInputs[3]) rgbInputs[3].value = (a < 1 ? Math.round(a * 255) : 255);
                rgbInputs.forEach(function(i) { i.dispatchEvent(new Event('input', { bubbles: true })); });
                setTimeout(function() { syncing = false; }, 0);
                var colorStr = a < 1 ? 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + a + ')' : 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
                try { if (colorPickerInstance && colorPickerInstance.initColor) colorPickerInstance.initColor(colorStr); } catch (err) {}
              }
            }, true);
            pickerBody.addEventListener('change', function(e) {
              var inp = e.target;
              if (!inp || !rgbSection || !hslSection || syncing) return;
              var rgbInputs = Array.from(rgbSection.querySelectorAll('.input-field .input, .input-field input'));
              var hslInputs = Array.from(hslSection.querySelectorAll('.input-field .input, .input-field input'));
              console.log('[ReDesign][CPSetup:change]', {
                pickerId: pickerBody.getAttribute('data-redesign-id'),
                targetClass: inp.className,
                inRgbSection: rgbSection && rgbSection.contains && rgbSection.contains(inp),
                inHslSection: hslSection && hslSection.contains && hslSection.contains(inp),
                rgbInputsCount: rgbInputs.length,
                hslInputsCount: hslInputs.length
              });
              if (rgbInputs.length < 4 || hslInputs.length < 4) return;
              if (rgbSection.contains(inp)) {
                var r = parseNum(rgbInputs[0].value, 0), g = parseNum(rgbInputs[1].value, 0), b = parseNum(rgbInputs[2].value, 0);
                var a = rgbInputs[3] ? parseNum(rgbInputs[3].value, 255) : 255;
                if (a > 1) a = a / 255;
                var hsl = rgbToHsl(r, g, b, a);
                syncing = true;
                hslInputs[0].value = hsl.h; hslInputs[1].value = hsl.s; hslInputs[2].value = hsl.l;
                if (hslInputs[3]) hslInputs[3].value = (a <= 1 ? Math.round(a * 100) : 100);
                setTimeout(function() { syncing = false; }, 0);
                var colorStr = a < 1 ? 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')' : 'rgb(' + r + ',' + g + ',' + b + ')';
                try { if (colorPickerInstance && colorPickerInstance.initColor) colorPickerInstance.initColor(colorStr); } catch (err) {}
              } else if (hslSection.contains(inp)) {
                var h = parseNum(hslInputs[0].value, 0), s = parseNum(hslInputs[1].value, 0), l = parseNum(hslInputs[2].value, 0);
                var a = hslInputs[3] ? parseNum(hslInputs[3].value, 100) : 100;
                if (a > 1) a = a / 100;
                var rgb = hslToRgb(h, s, l, a);
                syncing = true;
                rgbInputs[0].value = rgb.r; rgbInputs[1].value = rgb.g; rgbInputs[2].value = rgb.b;
                if (rgbInputs[3]) rgbInputs[3].value = (a < 1 ? Math.round(a * 255) : 255);
                setTimeout(function() { syncing = false; }, 0);
                var colorStr = a < 1 ? 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + a + ')' : 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
                try { if (colorPickerInstance && colorPickerInstance.initColor) colorPickerInstance.initColor(colorStr); } catch (err) {}
              }
            }, true);

            var scrollbarHideTimer = null;
            var SCROLLBAR_ZONE_PX = 10;
            pickerBody.addEventListener('scroll', function() {
              pickerBody.classList.add('is-scrolling');
              if (scrollbarHideTimer) clearTimeout(scrollbarHideTimer);
              scrollbarHideTimer = setTimeout(function() {
                scrollbarHideTimer = null;
                pickerBody.classList.remove('is-scrolling');
              }, 1000);
            }, { passive: true });
            pickerBody.addEventListener('mousemove', function(e) {
              var rect = pickerBody.getBoundingClientRect();
              if (e.clientX >= rect.right - SCROLLBAR_ZONE_PX) {
                pickerBody.classList.add('scrollbar-visible');
              } else {
                pickerBody.classList.remove('scrollbar-visible');
              }
            }, { passive: true });
            pickerBody.addEventListener('mouseleave', function() {
              pickerBody.classList.remove('scrollbar-visible');
            }, { passive: true });

            // PREV sync: set prev from lastPrevColor (captured when picker closed) when picker opens
                        (function setupPrevColorSync() {
                          var prevSynced = false;
                          var lastVisible = false;
                          var interval = setInterval(function() {
                            var picker = document.querySelector('.colorpicker-body');
                            if (!picker) return;
                            var rect = picker.getBoundingClientRect();
                            var visible = rect.width > 0 && rect.height > 0;
                            if (!visible) {
                              lastVisible = false;
                              prevSynced = false;
                              return;
                            }
                            if (visible && !lastVisible) prevSynced = false;
                            lastVisible = visible;
                            if (!visible || prevSynced) return;
                            var control = picker.querySelector('.control');
                            if (!control) return;
                            var swatches = Array.from(control.children).filter(function(c) { return c.classList && (c.classList.contains('color') || c.classList.contains('empty')); });
                            var prevEl = swatches[0];
                            if (!prevEl) return;
                            var bg = lastPrevColor || (swatches[1] ? window.getComputedStyle(swatches[1]).backgroundColor : null);
                            if (bg) {
                              prevEl.style.backgroundColor = bg;
                              prevSynced = true;
                            }
                          }, 80);
                        })();
                        
                        // PALETTE SECTION: Move dropdown inside .colorsets and setup toggle
                        function setupPaletteSection() {
                          const colorsets = pickerBody.querySelector('.colorsets');
                          const colorChooser = pickerBody.querySelector('.color-chooser');
                          const paletteBtn = pickerBody.querySelector('.color-sets-choose-btn');
                          if (!colorsets || !paletteBtn) {
                            return;
                          }
                          if (colorsets.hasAttribute('data-redesign-palette-setup')) {
                            return;
                          }
                          colorsets.setAttribute('data-redesign-palette-setup', '1');
                          console.log('[ReDesign] Setting up palette section...');
                          
                          // Chooser positioning: done synchronously via appendChild hook when picker is appended.
                          // Fallback move only if hook did not run (e.g. library uses different append target)
                          if (colorChooser && colorChooser.parentNode !== colorsets) {
                            const menu = colorsets.querySelector('.menu');
                            if (menu && menu.nextSibling) {
                              colorsets.insertBefore(colorChooser, menu.nextSibling);
                            } else {
                              colorsets.appendChild(colorChooser);
                            }
                            colorChooser.classList.remove('open');
                          }
                          
                          // Palette toggle handler
                          function togglePaletteSection(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            e.stopImmediatePropagation();
                            
                            colorsets.classList.toggle('palette-collapsed');
                            if (!colorsets.classList.contains('palette-collapsed')) {
                              colorsets.classList.remove('chooser-collapsed');
                            }
                            const isCollapsed = colorsets.classList.contains('palette-collapsed');
                            console.log('[ReDesign] Palette section', isCollapsed ? 'collapsed' : 'expanded');
                          }
                          
                          // Replace library click handler with our toggle
                          paletteBtn.removeAttribute('onclick');
                          paletteBtn.addEventListener('click', togglePaletteSection, true);
                          
                          // X button (next to "Color Palettes"): toggle list (Material/Custom/Color Scale), keep header visible for reopen
                          var closeChooserBtn = colorChooser ? colorChooser.querySelector('.colorsets-item-header .items') : null;
                          if (closeChooserBtn) {
                            closeChooserBtn.addEventListener('click', function(e) {
                              e.preventDefault();
                              e.stopPropagation();
                              colorsets.classList.toggle('chooser-collapsed');
                              var collapsed = colorsets.classList.contains('chooser-collapsed');
                              closeChooserBtn.textContent = collapsed ? '+' : '\xD7';
                              console.log('[ReDesign] Chooser', collapsed ? 'collapsed (click + to reopen)' : 'expanded');
                            }, true);
                            console.log('[ReDesign] Chooser toggle (X/+) button handler installed');
                          }
                          
                          // Chooser collapsed by default when picker opens
                          colorsets.classList.add('chooser-collapsed');
                          if (closeChooserBtn) closeChooserBtn.textContent = '+';
                          
                          console.log('[ReDesign] Palette toggle handler installed');
                          
                          // CONTEXT MENU: Wrapper inside pickerBody, coordinates include scrollTop/scrollLeft.
                          function setupContextMenuPositioning() {
                            var wrapper = document.createElement('div');
                            wrapper.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:100001;';
                            wrapper.className = 'contextmenu-position-wrapper';
                            pickerBody.appendChild(wrapper);
                            var DEBUG = false;
                            function log() {
                              if (DEBUG && console && console.log) {
                                console.log.apply(console, ['[ReDesign][CMenu]'].concat(Array.prototype.slice.call(arguments)));
                              }
                            }
                            
                            function hideContextMenu(menu) {
                              if (menu) {
                                menu.classList.remove('show', 'repositioned');
                              }
                            }
                            
                            function repositionMenu(menu, clientX, clientY, clickTarget) {
                              if (!menu) return;
                              menu.classList.remove('repositioned');
                              wrapper.appendChild(menu);
                              menu.style.pointerEvents = 'auto';
                              var scrollTop = pickerBody.scrollTop || 0;
                              var scrollLeft = pickerBody.scrollLeft || 0;
                              var pickerRect = pickerBody.getBoundingClientRect();
                              var visibleX = clientX - pickerRect.left;
                              var visibleY = clientY - pickerRect.top;
                              var left = visibleX + scrollLeft + 4;
                              var top = visibleY + scrollTop - 4;
                              var pad = 6;
                              var menuRect = menu.getBoundingClientRect();
                              if (left + menuRect.width > pickerRect.width + scrollLeft - pad) {
                                left = visibleX + scrollLeft - menuRect.width - 4;
                              }
                              if (left < pad) left = pad;
                              if (top + menuRect.height > pickerRect.height + scrollTop - pad) {
                                top = visibleY + scrollTop - menuRect.height - 4;
                              }
                              if (top < pad) top = pad;
                              menu.style.left = left + 'px';
                              menu.style.top = top + 'px';
                              menu.classList.add('repositioned');
                            }
                            
                            function queryAllRoots(sel) {
                              var found = null;
                              function scan(root) {
                                if (found) return;
                                try {
                                  var r = root.querySelector(sel);
                                  if (r) { found = r; return; }
                                  var els = root.querySelectorAll('*');
                                  for (var i = 0; i < els.length && !found; i++) {
                                    if (els[i].shadowRoot) scan(els[i].shadowRoot);
                                  }
                                } catch (e) {}
                              }
                              var r = document.querySelector(sel);
                              if (r) return r;
                              scan(document);
                              return found;
                            }
                            function findContextMenu() {
                              var menu = queryAllRoots('.colorsets-contextmenu.show');
                              if (menu) return menu;
                              menu = queryAllRoots('.colorsets-contextmenu');
                              if (menu) return menu;
                              var li = document.querySelector('[data-type="clear-palette"]');
                              if (li) return li.closest('ul');
                              try {
                                var pd = window.parent && window.parent.document;
                                if (pd && pd !== document) {
                                  menu = pd.querySelector('.colorsets-contextmenu.show') || pd.querySelector('.colorsets-contextmenu');
                                  if (menu) return menu;
                                }
                              } catch (e) {}
                              return null;
                            }
                            
                            var pendingCx, pendingCy, pendingTarget;
                            function checkAndReposition(menu) {
                              if (menu && menu.classList.contains('show') && pendingCx != null) {
                                log('menu found via observer/poll');
                                repositionMenu(menu, pendingCx, pendingCy, pendingTarget);
                                pendingCx = null;
                              }
                            }
                            var menuObserver = new MutationObserver(function(mutations) {
                              var menu = findContextMenu();
                              if (menu) checkAndReposition(menu);
                            });
                            menuObserver.observe(document.body, { attributes: true, childList: true, subtree: true, attributeFilter: ['class'] });
                            
                            colorsets.addEventListener('contextmenu', function(e) {
                              var cx = e.clientX;
                              var cy = e.clientY;
                              var target = e.target && e.target.closest ? e.target.closest('.color-item, .add-color-item') : e.target;
                              log('contextmenu: clientX=' + cx + ', clientY=' + cy);
                              pendingCx = cx;
                              pendingCy = cy;
                              pendingTarget = target;
                              
                              function tryReposition(attempt) {
                                var menu = findContextMenu();
                                if (menu) {
                                  pendingCx = null;
                                  if (!menu.classList.contains('show')) menu.classList.add('show');
                                  repositionMenu(menu, cx, cy, target);
                                  return;
                                }
                                if (attempt < 12) {
                                  setTimeout(function() { tryReposition(attempt + 1); }, 20);
                                } else {
                                  pendingCx = null;
                                  var uls = document.querySelectorAll('ul');
                                  log('menu not found. Tip: right-click on Custom palette squares. ULs: ' + uls.length);
                                }
                              }
                              setTimeout(function() { tryReposition(0); }, 10);
                            }, false);
                            
                            document.addEventListener('mousedown', function(e) {
                              if (e.button === 2) return;
                              var menu = document.querySelector('.colorsets-contextmenu.show');
                              if (menu && !menu.contains(e.target)) hideContextMenu(menu);
                            }, false);
                            
                            document.addEventListener('keydown', function(e) {
                              if (e.key === 'Escape') {
                                var menu = document.querySelector('.colorsets-contextmenu.show');
                                if (menu) {
                                  e.preventDefault();
                                  hideContextMenu(menu);
                                }
                              }
                            }, false);
                            
                            pickerBody.addEventListener('scroll', function() {
                              var menu = document.querySelector('.colorsets-contextmenu.show');
                              if (menu) hideContextMenu(menu);
                            }, { passive: true });
                            
                            console.log('[ReDesign] Context menu handlers installed (lazy find)');
                          }
                          
                          setupContextMenuPositioning();
                        }
                        
                        // COLOR SCALE: Update palette from gradient-selected color (native: fixed scale red->yellow->black)
                        function setupColorScaleSync() {
                          var lastScaleColor = null;
                          function parseColorToRgb(str) {
                            if (!str || str === 'transparent' || str === 'rgba(0, 0, 0, 0)') return null;
                            var m = str.match(/rgb\\(\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)/);
                            if (m) return { r: +m[1], g: +m[2], b: +m[3] };
                            m = str.match(/rgba\\(\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)/);
                            if (m) return { r: +m[1], g: +m[2], b: +m[3] };
                            m = str.match(/#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/);
                            if (m) return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
                            m = str.match(/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/);
                            if (m) return { r: parseInt(m[1]+m[1], 16), g: parseInt(m[2]+m[2], 16), b: parseInt(m[3]+m[3], 16) };
                            return null;
                          }
                          function blend(a, b, t) {
                            t = Math.max(0, Math.min(1, t));
                            return {
                              r: Math.round(a.r + (b.r - a.r) * t),
                              g: Math.round(a.g + (b.g - a.g) * t),
                              b: Math.round(a.b + (b.b - a.b) * t)
                            };
                          }
                          function scaleFromColor(rgb, count) {
                            var white = { r: 255, g: 255, b: 255 };
                            var black = { r: 0, g: 0, b: 0 };
                            var colors = [];
                            var n = Math.max(3, count || 9);
                            for (var i = 0; i < n; i++) {
                              var t = n > 1 ? i / (n - 1) : 0;
                              var c = t <= 0.5 ? blend(white, rgb, t * 2) : blend(rgb, black, (t - 0.5) * 2);
                              colors.push(c);
                            }
                            return colors.map(function(c) { return 'rgb(' + c.r + ',' + c.g + ',' + c.b + ')'; });
                          }
                          function updateColorScalePalette(rgb) {
                            var store = colorPickerInstance && (colorPickerInstance.$store || colorPickerInstance.store);
                            if (store && store.colorSetsList && store.colorSetsList[2]) {
                              var scalePalette = store.colorSetsList[2];
                              var hexColors = scaleFromColor(rgb, 9).map(function(c) {
                                var m = c.match(/rgb\\(\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)/);
                                if (!m) return c;
                                var r = parseInt(m[1], 10).toString(16); if (r.length < 2) r = '0' + r;
                                var g = parseInt(m[2], 10).toString(16); if (g.length < 2) g = '0' + g;
                                var b = parseInt(m[3], 10).toString(16); if (b.length < 2) b = '0' + b;
                                return '#' + r + g + b;
                              });
                              scalePalette.colors = hexColors;
                              delete scalePalette.scale;
                              delete scalePalette.count;
                              try {
                                if (colorPickerInstance.dispatch) colorPickerInstance.dispatch('@changeCurrentColorSets');
                                if (colorPickerInstance.refresh) colorPickerInstance.refresh();
                              } catch (e) {}
                            }
                            var scaleSection = pickerBody.querySelector('.colorsets-item[data-colorsets-index="2"]');
                            if (scaleSection) {
                              var items = scaleSection.querySelector('.items');
                              if (items) {
                                var colorViews = items.querySelectorAll('.color-item .color-view');
                                var newColors = scaleFromColor(rgb, Math.max(colorViews.length, 9));
                                colorViews.forEach(function(v, i) {
                                  if (newColors[i]) v.style.backgroundColor = newColors[i];
                                });
                              }
                            }
                          }
                          setInterval(function() {
                            var picker = document.querySelector('.colorpicker-body');
                            if (!picker) return;
                            var control = picker.querySelector('.control');
                            if (!control) return;
                            var swatches = Array.from(control.children).filter(function(c) { return c.classList && (c.classList.contains('color') || c.classList.contains('empty')); });
                            var currEl = swatches[1];
                            if (!currEl) return;
                            var bg = window.getComputedStyle(currEl).backgroundColor;
                            var rgb = parseColorToRgb(bg);
                            if (!rgb) return;
                            var key = rgb.r + ',' + rgb.g + ',' + rgb.b;
                            if (lastScaleColor === key) return;
                            lastScaleColor = key;
                            updateColorScalePalette(rgb);
                          }, 150);
                          console.log('[ReDesign] Color Scale sync from gradient installed');
                        }
                        setupColorScaleSync();
                        setupPaletteSection();
          }

          const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
              mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) {
                  var body = node.querySelector ? node.querySelector('.colorpicker-body') : null;
                  var isBody = node.classList && node.classList.contains('colorpicker-body');
                  if (body || isBody) {
                    var pickerBody = isBody ? node : body;
                    cpObserverEventCount++;
                    console.log('[ReDesign][CPObserver] colorpicker-body detected', {
                      event: cpObserverEventCount,
                      nodeTag: node.tagName,
                      isBody: isBody,
                      hasBodyQuery: !!body,
                      existingPickerCount: document.querySelectorAll('.colorpicker-body').length
                    });
                    // Run setup after the library has finished its first render (Vue/ace-colorpicker).
                    // A single rAF was too early: refs and listeners ended up on placeholder DOM.
                    setTimeout(function() {
                      console.log('[ReDesign][CPObserver] invoking runColorPickerSetup from observer timeout', {
                        event: cpObserverEventCount,
                        hasPicker: !!pickerBody,
                        pickerId: pickerBody && pickerBody.getAttribute && pickerBody.getAttribute('data-redesign-id')
                      });
                      if (pickerBody && typeof runColorPickerSetup === 'function') runColorPickerSetup(pickerBody);
                    }, 120);
                  }
                }
              });
            });
          });
          observer.observe(document.body, {
            childList: true,
            subtree: true
          });

          // Test if color picker appears
          setTimeout(function() {
            const colorViews = document.querySelectorAll('.ace-colorview');
            const colorPickers = document.querySelectorAll('.ace-colorpicker');
            console.log('[ReDesign] Color views found:', colorViews.length);
            console.log('[ReDesign] Color pickers found:', colorPickers.length);

            if (colorViews.length > 0) {
              console.log('[ReDesign] First color view element:', colorViews[0]);
            }
          }, 2000);

        } catch (e) {
          console.error('[ReDesign] \u2717 Failed to initialize color picker:', e);
          console.error('[ReDesign] Error stack:', e.stack);
        }
      } else {
        console.warn('[ReDesign] \u2717 AceColorPicker not found - library may not have loaded');
        console.warn('[ReDesign] Check network tab for CDN errors');
      }
      }
      
    // Add intelligent context-aware CSS completers
      if (ace.require && typeof ace.require('ace/ext/language_tools') !== 'undefined') {
        try {
          const langTools = ace.require('ace/ext/language_tools');
          console.log('[ReDesign] Language tools loaded, adding context-aware completers...');

          // Complete CSS properties database
          const cssPropertiesDB = {
            'display': ['block', 'inline', 'inline-block', 'flex', 'inline-flex', 'grid', 'inline-grid', 'table', 'table-row', 'table-cell', 'none', 'contents', 'flow-root', 'list-item'],
            'position': ['static', 'relative', 'absolute', 'fixed', 'sticky'],
            'flex-direction': ['row', 'row-reverse', 'column', 'column-reverse'],
            'flex-wrap': ['nowrap', 'wrap', 'wrap-reverse'],
            'justify-content': ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly', 'start', 'end', 'left', 'right'],
            'align-items': ['flex-start', 'flex-end', 'center', 'baseline', 'stretch', 'start', 'end', 'self-start', 'self-end'],
            'align-content': ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly', 'stretch', 'start', 'end'],
            'align-self': ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
            'flex-grow': ['0', '1', '2'],
            'flex-shrink': ['0', '1'],
            'flex-basis': ['auto', '0', '100%', 'content'],
            'order': ['0', '1', '-1'],
            'gap': ['0', '4px', '8px', '12px', '16px', '20px', '24px', '32px'],
            'row-gap': ['0', '4px', '8px', '12px', '16px', '20px', '24px'],
            'column-gap': ['0', '4px', '8px', '12px', '16px', '20px', '24px'],
            'grid-template-columns': ['none', 'auto', '1fr', '1fr 1fr', '1fr 2fr', 'repeat(auto-fit, minmax(200px, 1fr))', 'repeat(3, 1fr)'],
            'grid-template-rows': ['none', 'auto', '1fr', '1fr 1fr', 'repeat(3, 1fr)'],
            'grid-template-areas': ['none'],
            'grid-auto-columns': ['auto', 'min-content', 'max-content', '1fr'],
            'grid-auto-rows': ['auto', 'min-content', 'max-content', '1fr'],
            'grid-auto-flow': ['row', 'column', 'dense', 'row dense', 'column dense'],
            'margin': ['0', 'auto', '4px', '8px', '12px', '16px', '20px', '24px', '32px', '0 auto'],
            'margin-top': ['0', 'auto', '4px', '8px', '12px', '16px', '20px', '24px'],
            'margin-right': ['0', 'auto', '4px', '8px', '12px', '16px', '20px', '24px'],
            'margin-bottom': ['0', 'auto', '4px', '8px', '12px', '16px', '20px', '24px'],
            'margin-left': ['0', 'auto', '4px', '8px', '12px', '16px', '20px', '24px'],
            'padding': ['0', '4px', '8px', '12px', '16px', '20px', '24px', '32px'],
            'padding-top': ['0', '4px', '8px', '12px', '16px', '20px', '24px'],
            'padding-right': ['0', '4px', '8px', '12px', '16px', '20px', '24px'],
            'padding-bottom': ['0', '4px', '8px', '12px', '16px', '20px', '24px'],
            'padding-left': ['0', '4px', '8px', '12px', '16px', '20px', '24px'],
            'width': ['auto', '100%', 'fit-content', 'max-content', 'min-content', '0'],
            'height': ['auto', '100%', 'fit-content', 'max-content', 'min-content', '0'],
            'min-width': ['0', 'auto', 'fit-content', 'max-content', 'min-content'],
            'min-height': ['0', 'auto', 'fit-content', 'max-content', 'min-content'],
            'max-width': ['none', '100%', '1200px', '960px', '768px', 'fit-content'],
            'max-height': ['none', '100%', '100vh'],
            'box-sizing': ['content-box', 'border-box'],
            'font-family': ['inherit', 'sans-serif', 'serif', 'monospace', 'cursive', 'fantasy', 'system-ui'],
            'font-size': ['inherit', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '48px', '1rem', '1.2rem'],
            'font-weight': ['normal', 'bold', 'lighter', 'bolder', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
            'font-style': ['normal', 'italic', 'oblique'],
            'text-align': ['left', 'center', 'right', 'justify', 'start', 'end'],
            'text-decoration': ['none', 'underline', 'overline', 'line-through', 'underline dotted', 'underline wavy'],
            'text-transform': ['none', 'uppercase', 'lowercase', 'capitalize'],
            'line-height': ['normal', '1', '1.2', '1.4', '1.5', '1.6', '1.8', '2'],
            'letter-spacing': ['normal', '0.05em', '0.1em', '0.2em', '-0.05em'],
            'word-spacing': ['normal', '0.1em', '0.2em', '0.3em'],
            'white-space': ['normal', 'nowrap', 'pre', 'pre-wrap', 'pre-line', 'break-spaces'],
            'color': ['inherit', 'currentColor', 'transparent', 'black', 'white'],
            'background': ['none', 'transparent'],
            'background-color': ['transparent', 'inherit'],
            'background-image': ['none', 'url()', 'linear-gradient()', 'radial-gradient()'],
            'background-size': ['auto', 'cover', 'contain', '100%', '100% 100%'],
            'background-position': ['center', 'top', 'bottom', 'left', 'right', 'center center', 'top left', 'top right', 'bottom left', 'bottom right'],
            'background-repeat': ['repeat', 'repeat-x', 'repeat-y', 'no-repeat', 'space', 'round'],
            'background-attachment': ['scroll', 'fixed', 'local'],
            'opacity': ['0', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1'],
            'border': ['none', '1px solid', '2px solid', '1px dashed', '2px dashed', '1px dotted'],
            'border-style': ['none', 'solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset'],
            'border-width': ['0', '1px', '2px', '3px', '4px', 'thin', 'medium', 'thick'],
            'border-color': ['transparent', 'currentColor'],
            'border-radius': ['0', '2px', '4px', '6px', '8px', '12px', '16px', '50%', '999px'],
            'box-shadow': ['none', '0 1px 3px rgba(0,0,0,0.12)', '0 2px 4px rgba(0,0,0,0.1)', '0 4px 8px rgba(0,0,0,0.15)', '0 8px 16px rgba(0,0,0,0.2)'],
            'transform': ['none', 'translate(0, 0)', 'translateX(0)', 'translateY(0)', 'scale(1)', 'scaleX(1)', 'scaleY(1)', 'rotate(0deg)', 'skew(0deg)'],
            'transform-origin': ['center', 'top', 'bottom', 'left', 'right', 'top left', 'top right', 'bottom left', 'bottom right'],
            'transition': ['none', 'all 0.3s', 'all 0.3s ease', 'all 0.5s ease-in-out'],
            'transition-property': ['all', 'none', 'opacity', 'transform', 'color', 'background-color'],
            'transition-duration': ['0s', '0.1s', '0.2s', '0.3s', '0.5s', '1s'],
            'transition-timing-function': ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out', 'cubic-bezier(0.4, 0, 0.2, 1)'],
            'animation': ['none'],
            'animation-name': ['none'],
            'animation-duration': ['0s', '0.3s', '0.5s', '1s', '2s'],
            'animation-timing-function': ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out'],
            'animation-iteration-count': ['1', 'infinite'],
            'animation-direction': ['normal', 'reverse', 'alternate', 'alternate-reverse'],
            'cursor': ['auto', 'default', 'pointer', 'text', 'move', 'not-allowed', 'help', 'wait', 'crosshair', 'grab', 'grabbing'],
            'overflow': ['visible', 'hidden', 'scroll', 'auto', 'clip'],
            'overflow-x': ['visible', 'hidden', 'scroll', 'auto', 'clip'],
            'overflow-y': ['visible', 'hidden', 'scroll', 'auto', 'clip'],
            'overflow-wrap': ['normal', 'break-word', 'anywhere'],
            'word-break': ['normal', 'break-all', 'keep-all', 'break-word'],
            'z-index': ['auto', '0', '1', '10', '100', '1000', '-1'],
            'visibility': ['visible', 'hidden', 'collapse'],
            'pointer-events': ['auto', 'none', 'all'],
            'user-select': ['auto', 'none', 'text', 'all'],
            'list-style': ['none', 'disc', 'circle', 'square', 'decimal'],
            'list-style-type': ['none', 'disc', 'circle', 'square', 'decimal', 'lower-alpha', 'upper-alpha'],
            'list-style-position': ['inside', 'outside'],
            'vertical-align': ['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'sub', 'super'],
            'object-fit': ['fill', 'contain', 'cover', 'none', 'scale-down'],
            'object-position': ['center', 'top', 'bottom', 'left', 'right'],
            'filter': ['none', 'blur(5px)', 'brightness(1)', 'contrast(1)', 'grayscale(0)', 'hue-rotate(0deg)', 'invert(0)', 'opacity(1)', 'saturate(1)', 'sepia(0)'],
            'backdrop-filter': ['none', 'blur(10px)'],
            'mix-blend-mode': ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn'],
            'isolation': ['auto', 'isolate'],
            'content': ['none', 'normal', '""', 'attr()'],
            'quotes': ['none', 'auto'],
            'resize': ['none', 'both', 'horizontal', 'vertical'],
            'outline': ['none', '1px solid', '2px solid'],
            'outline-style': ['none', 'solid', 'dashed', 'dotted', 'double'],
            'outline-width': ['thin', 'medium', 'thick', '1px', '2px'],
            'outline-offset': ['0', '1px', '2px', '4px'],
            'appearance': ['none', 'auto'],
            'will-change': ['auto', 'transform', 'opacity', 'scroll-position']
          };

          // Context-aware completer
          const contextAwareCSSCompleter = {
            getCompletions: function(ed, session, pos, prefix, callback) {
              const line = session.getLine(pos.row);
              const beforeCursor = line.substring(0, pos.column);
              const afterCursor = line.substring(pos.column);
              console.log('[ReDesign] \u{1F527} Autocomplete triggered. Position:', pos, 'Prefix:', JSON.stringify(prefix));
              console.log('[ReDesign] \u{1F4DD} Line:', JSON.stringify(line));
              console.log('[ReDesign] \u2B05\uFE0F Before cursor:', JSON.stringify(beforeCursor));
              console.log('[ReDesign] \u27A1\uFE0F After cursor:', JSON.stringify(afterCursor));

              // Check if we're after a colon (suggesting values)
              const colonMatch = beforeCursor.match(/([a-z-]+)s*:s*([^;]*)$/i);
              console.log('[ReDesign] \u{1F50D} Colon match:', colonMatch);

              if (colonMatch) {
                // We're suggesting values for a property
                const propertyName = colonMatch[1].trim();
                console.log('[ReDesign] Suggesting values for property:', propertyName);
                const values = cssPropertiesDB[propertyName] || [];

                const completions = values.map(val => ({
                  caption: val,
                  value: val + ';',  // Add semicolon after value
                  meta: 'value',
                  score: 1000
                }));

                console.log('[ReDesign] Returning', completions.length, 'value completions for property:', propertyName);
                callback(null, completions);
              } else {
                // We're suggesting property names
                console.log('[ReDesign] Suggesting property names');
                const completions = Object.keys(cssPropertiesDB).map(prop => ({
                  caption: prop,
                  value: prop + ': ',  // Only colon and space, NO semicolon
                  meta: 'property',
                  score: 900,
                  completer: {
                    insertMatch: function(editor, data) {
                      // Insert the property with colon and space
                      editor.completer.insertMatch({value: data.value});
                      // Insert semicolon
                      editor.insert(';');
                      // Move cursor before semicolon
                      const pos = editor.getCursorPosition();
                      editor.moveCursorTo(pos.row, pos.column - 1);
                      // Trigger value autocomplete immediately
                      setTimeout(function() {
                        editor.execCommand('startAutocomplete');
                      }, 0);
                    }
                  }
                }));

                console.log('[ReDesign] Returning', completions.length, 'property completions');
                callback(null, completions);
              }
            }
          };

          // Replace all completers with our custom one (don't add to existing)
          langTools.setCompleters([contextAwareCSSCompleter]);
          console.log('[ReDesign] \u2713 Context-aware CSS completers set successfully (replaced defaults)');

          // Add custom space handler without removing default insertstring
          editor.commands.addCommand({
            name: 'customSpaceInsert',
            bindKey: {win: 'Space', mac: 'Space'},
            exec: function(ed) {
              console.log('[ReDesign] \u{1F50D} Space key pressed');

              const pos = ed.getCursorPosition();
              const edSession = ed.session;
              const line = edSession.getLine(pos.row);
              const beforeCursor = line.substring(0, pos.column);
              const afterCursor = line.substring(pos.column);

              const colonBeforeCursor = /([a-z-]+):$/i.test(beforeCursor);
              const semicolonAfterCursor = /^;/.test(afterCursor);

              console.log('[ReDesign] \u{1F4CD} Context:', {
                colonBefore: colonBeforeCursor,
                semicolonAfter: semicolonAfterCursor,
                beforeCursor: JSON.stringify(beforeCursor),
                afterCursor: JSON.stringify(afterCursor)
              });

              if (colonBeforeCursor && semicolonAfterCursor) {
                console.log('[ReDesign] \u2713 Property colon pattern detected');

                // Remove semicolon, insert space, trigger autocomplete
                const Range = ace.require('ace/range').Range;
                const range = new Range(pos.row, pos.column, pos.row, pos.column + 1);
                edSession.remove(range);
                ed.insert(' ');

                setTimeout(function() {
                  console.log('[ReDesign] \u2192 Triggering autocomplete');
                  ed.execCommand('startAutocomplete');
                }, 50);
              } else {
                // Normal space insertion
                console.log('[ReDesign] \u2139\uFE0F Normal space');
                ed.insert(' ');
              }
            }
          });
          console.log('[ReDesign] \u2713 Custom space handler registered');

        } catch (e) {
          console.error('[ReDesign] \u2717 Failed to add custom completers:', e);
        }
      } else {
        console.warn('[ReDesign] \u2717 Language tools not available');
      }

    function showHelp() {
      const helpDiv = document.createElement('div');
      helpDiv.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:' + '${bgColorSecondary}' + ';border:1px solid ' + '${borderColor}' + ';border-radius:8px;padding:24px;box-shadow:0 8px 32px rgba(0,0,0,0.8);z-index:10000;min-width:420px;max-width:500px;color:' + '${textColor}' + ';font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;';
      helpDiv.innerHTML = '<div style="text-align:center;margin-bottom:20px;"><h2 style="color:' + '${statusColor}' + ';margin:0 0 8px 0;">Keyboard Shortcuts</h2><p style="color:#858585;font-size:12px;margin:0;">ReDesign Editor Hotkeys</p></div><div style="margin-bottom:20px;"><table style="width:100%;border-collapse:collapse;"><tr style="border-bottom:1px solid ' + '${borderColor}' + ';"><td style="padding:8px 0;color:' + '${textColor}' + ';font-size:13px;font-family:monospace;"><strong>Ctrl+S</strong> / <strong>Cmd+S</strong></td><td style="padding:8px 0;color:#858585;font-size:12px;text-align:right;">Save CSS</td></tr><tr style="border-bottom:1px solid ' + '${borderColor}' + ';"><td style="padding:8px 0;color:' + '${textColor}' + ';font-size:13px;font-family:monospace;"><strong>Ctrl+F</strong> / <strong>Cmd+F</strong></td><td style="padding:8px 0;color:#858585;font-size:12px;text-align:right;">Find</td></tr><tr style="border-bottom:1px solid ' + '${borderColor}' + ';"><td style="padding:8px 0;color:' + '${textColor}' + ';font-size:13px;font-family:monospace;"><strong>Ctrl+H</strong> / <strong>Cmd+H</strong></td><td style="padding:8px 0;color:#858585;font-size:12px;text-align:right;">Find & Replace</td></tr><tr style="border-bottom:1px solid ' + '${borderColor}' + ';"><td style="padding:8px 0;color:' + '${textColor}' + ';font-size:13px;font-family:monospace;"><strong>Ctrl+/</strong></td><td style="padding:8px 0;color:#858585;font-size:12px;text-align:right;">Toggle Comment</td></tr><tr style="border-bottom:1px solid ' + '${borderColor}' + ';"><td style="padding:8px 0;color:' + '${textColor}' + ';font-size:13px;font-family:monospace;"><strong>Ctrl+Z</strong></td><td style="padding:8px 0;color:#858585;font-size:12px;text-align:right;">Undo</td></tr><tr style="border-bottom:1px solid ' + '${borderColor}' + ';"><td style="padding:8px 0;color:' + '${textColor}' + ';font-size:13px;font-family:monospace;"><strong>Ctrl+Y</strong></td><td style="padding:8px 0;color:#858585;font-size:12px;text-align:right;">Redo</td></tr><tr style="border-bottom:1px solid ' + '${borderColor}' + ';"><td style="padding:8px 0;color:' + '${textColor}' + ';font-size:13px;font-family:monospace;"><strong>Ctrl+A</strong></td><td style="padding:8px 0;color:#858585;font-size:12px;text-align:right;">Select All</td></tr><tr><td style="padding:8px 0;color:' + '${textColor}' + ';font-size:13px;font-family:monospace;"><strong>Alt+Up/Down</strong></td><td style="padding:8px 0;color:#858585;font-size:12px;text-align:right;">Move Line</td></tr></table></div><button onclick="this.parentElement.remove();" style="width:100%;padding:10px;background:' + '${btnBg}' + ';color:white;border:none;border-radius:4px;cursor:pointer;font-size:12px;font-weight:600;transition:background 0.2s;">Close</button>';
      document.body.appendChild(helpDiv);
    }

    function showAbout() {
      const aboutDiv = document.createElement('div');
      aboutDiv.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:' + '${bgColorSecondary}' + ';border:1px solid ' + '${borderColor}' + ';border-radius:8px;padding:24px;box-shadow:0 8px 32px rgba(0,0,0,0.8);z-index:10000;min-width:400px;color:' + '${textColor}' + ';font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;';
      aboutDiv.innerHTML = '<div style="text-align:center;margin-bottom:20px;"><h2 style="color:' + '${statusColor}' + ';margin:0 0 8px 0;">ReDesign</h2><p style="color:#858585;font-size:12px;margin:0;">Spotify CSS Editor v2.0</p></div><div style="margin-bottom:20px;line-height:1.6;font-size:13px;"><p style="margin-bottom:12px;">A modern, feature-rich CSS editor for Spicetify</p><p style="color:#858585;font-size:12px;margin-bottom:8px;">Features:</p><ul style="color:' + '${textColor}' + ';font-size:12px;padding-left:20px;margin:0;"><li>Live CSS editing</li><li>Multiple editor themes</li><li>Base16 & Catppuccin color schemes</li><li>Dark/Light/System UI themes</li><li>Auto-save & customization</li><li>Draggable & Resizable window</li><li>Syntax highlighting & auto-completion</li></ul></div><div style="margin-bottom:20px;padding-top:16px;border-top:1px solid ' + '${borderColor}' + ';"><p style="color:#858585;font-size:11px;margin:0 0 8px 0;">Based on spotify-css-editor by FlafyDev</p><p style="color:#858585;font-size:11px;margin:0 0 8px 0;">Enhanced by:</p><a href="https://github.com/kalashnikxvxiii" target="_blank" style="display:inline-flex;align-items:center;gap:6px;color:' + '${statusColor}' + ';text-decoration:none;font-size:12px;padding:6px 12px;background:' + '${bgColor}' + ';border-radius:4px;border:1px solid ' + '${borderColor}' + ';transition:all 0.2s;"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>kalashnikxvxiii</a></div><button onclick="this.parentElement.remove();" style="width:100%;padding:8px;background:' + '${btnBg}' + ';color:white;border:none;border-radius:4px;cursor:pointer;font-size:12px;transition:background 0.2s;">Close</button>';
      document.body.appendChild(aboutDiv);
    }

    function openSettings() {
      window.parent.postMessage({ type: 'OPEN_SETTINGS' }, '*');
    }
    initEditor();
  <\/script>
</body>
</html>`;
      this.cachedEditorHTML = html;
      this.cachedVersion = this.cacheVersion;
      this.cachedPalette = paletteValue;
      this.cachedUiTheme = uiThemeValue;
      return html;
    }
    render() {
      if (!this.state.visible) {
        return null;
      }
      if (this.state.minimized) {
        return /* @__PURE__ */ import_react2.default.createElement(
          "div",
          {
            style: {
              position: "fixed",
              top: `${this.state.minimizedY}px`,
              left: `${this.state.minimizedX}px`,
              width: "180px",
              height: "40px",
              background: "#252526",
              borderRadius: "6px",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.6)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 12px",
              cursor: this.state.isDragging ? "grabbing" : "grab",
              userSelect: "none"
            },
            onMouseDown: this.handleMouseDown
          },
          /* @__PURE__ */ import_react2.default.createElement("span", { style: { fontSize: "12px", fontWeight: 600, color: "#cccccc" } }, "ReDesign"),
          /* @__PURE__ */ import_react2.default.createElement("div", { style: { display: "flex", gap: "4px" } }, /* @__PURE__ */ import_react2.default.createElement(
            "button",
            {
              onClick: this.handleMaximize,
              style: {
                background: "#0e639c",
                color: "white",
                border: "none",
                padding: "4px 8px",
                borderRadius: "3px",
                cursor: "pointer",
                fontSize: "11px"
              }
            },
            "\u25A2"
          ), /* @__PURE__ */ import_react2.default.createElement(
            "button",
            {
              onClick: () => this.toggle(),
              style: {
                background: "#c5c5c5",
                color: "#1e1e1e",
                border: "none",
                padding: "4px 8px",
                borderRadius: "3px",
                cursor: "pointer",
                fontSize: "11px"
              }
            },
            "\u2715"
          ))
        );
      }
      const resizeHandleStyle = (direction) => ({
        position: "absolute",
        background: "transparent",
        zIndex: 10,
        ...direction.includes("n") && { top: 0, height: "8px", cursor: "ns-resize" },
        ...direction.includes("s") && { bottom: 0, height: "8px", cursor: "ns-resize" },
        ...direction.includes("w") && { left: 0, width: "8px", cursor: "ew-resize" },
        ...direction.includes("e") && { right: 0, width: "8px", cursor: "ew-resize" },
        ...direction === "nw" && { top: 0, left: 0, width: "16px", height: "16px", cursor: "nwse-resize" },
        ...direction === "ne" && { top: 0, right: 0, width: "16px", height: "16px", cursor: "nesw-resize" },
        ...direction === "sw" && { bottom: 0, left: 0, width: "16px", height: "16px", cursor: "nesw-resize" },
        ...direction === "se" && { bottom: 0, right: 0, width: "16px", height: "16px", cursor: "nwse-resize" },
        ...direction === "n" && { left: 0, right: 0 },
        ...direction === "s" && { left: 0, right: 0 },
        ...direction === "w" && { top: 0, bottom: 0 },
        ...direction === "e" && { top: 0, bottom: 0 }
      });
      return /* @__PURE__ */ import_react2.default.createElement("div", { style: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        background: "rgba(0, 0, 0, 0.3)",
        // Lighter backdrop
        pointerEvents: "none"
        // Don't block clicks on Spotify
      } }, /* @__PURE__ */ import_react2.default.createElement(
        "div",
        {
          ref: this.editorContainerRef,
          style: {
            position: "absolute",
            top: `${this.state.y}px`,
            left: `${this.state.x}px`,
            width: `${this.state.width}px`,
            height: `${this.state.height}px`,
            background: "#1e1e1e",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
            display: "flex",
            flexDirection: "column",
            pointerEvents: "auto"
            // Re-enable clicks on editor itself
          }
        },
        /* @__PURE__ */ import_react2.default.createElement("div", { style: resizeHandleStyle("n"), onMouseDown: (e) => this.handleResizeMouseDown(e, "n") }),
        /* @__PURE__ */ import_react2.default.createElement("div", { style: resizeHandleStyle("s"), onMouseDown: (e) => this.handleResizeMouseDown(e, "s") }),
        /* @__PURE__ */ import_react2.default.createElement("div", { style: resizeHandleStyle("w"), onMouseDown: (e) => this.handleResizeMouseDown(e, "w") }),
        /* @__PURE__ */ import_react2.default.createElement("div", { style: resizeHandleStyle("e"), onMouseDown: (e) => this.handleResizeMouseDown(e, "e") }),
        /* @__PURE__ */ import_react2.default.createElement("div", { style: resizeHandleStyle("nw"), onMouseDown: (e) => this.handleResizeMouseDown(e, "nw") }),
        /* @__PURE__ */ import_react2.default.createElement("div", { style: resizeHandleStyle("ne"), onMouseDown: (e) => this.handleResizeMouseDown(e, "ne") }),
        /* @__PURE__ */ import_react2.default.createElement("div", { style: resizeHandleStyle("sw"), onMouseDown: (e) => this.handleResizeMouseDown(e, "sw") }),
        /* @__PURE__ */ import_react2.default.createElement("div", { style: resizeHandleStyle("se"), onMouseDown: (e) => this.handleResizeMouseDown(e, "se") }),
        /* @__PURE__ */ import_react2.default.createElement(
          "div",
          {
            onMouseDown: this.handleMouseDown,
            style: {
              background: "#252526",
              borderBottom: "1px solid #3e3e42",
              padding: "8px 16px",
              cursor: this.state.isDragging ? "grabbing" : "grab",
              userSelect: "none",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }
          },
          /* @__PURE__ */ import_react2.default.createElement("span", { style: { fontSize: "14px", fontWeight: 600, color: "#cccccc" } }, "ReDesign"),
          /* @__PURE__ */ import_react2.default.createElement("div", { style: { display: "flex", gap: "4px" } }, /* @__PURE__ */ import_react2.default.createElement(
            "button",
            {
              onClick: this.handleMinimize,
              style: {
                background: "transparent",
                border: "1px solid #3e3e42",
                color: "#cccccc",
                padding: "4px 8px",
                borderRadius: "3px",
                cursor: "pointer",
                fontSize: "11px"
              }
            },
            "\u2212"
          ), /* @__PURE__ */ import_react2.default.createElement(
            "button",
            {
              onClick: () => this.toggle(),
              style: {
                background: "#c5c5c5",
                color: "#1e1e1e",
                border: "none",
                padding: "4px 8px",
                borderRadius: "3px",
                cursor: "pointer",
                fontSize: "12px"
              }
            },
            "\u2715"
          ))
        ),
        /* @__PURE__ */ import_react2.default.createElement(
          "iframe",
          {
            key: this.state.iframeKey,
            ref: this.iframeRef,
            srcDoc: this.getEditorHTML(),
            style: {
              width: "100%",
              height: "100%",
              border: "none",
              flex: 1,
              pointerEvents: this.state.isDragging || this.state.isResizing ? "none" : "auto"
            },
            title: "ReDesign Editor"
          }
        )
      ));
    }
  };
  var css_editor_iframe_default = CSSEditorIframe;
  return __toCommonJS(css_editor_iframe_exports);
})();
/*! Bundled license information:

object-assign/index.js:
  (*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  *)

react/cjs/react.production.min.js:
  (** @license React v17.0.2
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (** @license React v0.20.2
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (** @license React v17.0.2
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/

// Bootstrap the extension
(async function() {
  while (!Spicetify?.Platform || !Spicetify?.React || !Spicetify?.ReactDOM) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log("[ReDesign] Initializing extension...");

  const { React, ReactDOM } = Spicetify;
  const container = document.createElement('div');
  container.id = 'redesign-editor-container';
  document.body.appendChild(container);

  // ReDesignEditor.default is the exported component
  ReactDOM.render(React.createElement(ReDesignEditor.default), container);

  console.log("[ReDesign] Extension initialized successfully!");
})();

