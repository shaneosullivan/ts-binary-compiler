const _excluded = ["tool_choice", "stream"],
  _excluded2 = ["choices"],
  _excluded3 = ["delta", "finish_reason", "index", "logprobs"],
  _excluded4 = ["content", "refusal"],
  _excluded5 = ["content", "refusal", "function_call", "role", "tool_calls"],
  _excluded6 = ["index", "id", "type", "function"],
  _excluded7 = ["id", "choices", "created", "model", "system_fingerprint"],
  _excluded8 = ["message", "finish_reason", "index", "logprobs"],
  _excluded9 = ["content", "function_call", "tool_calls"],
  _excluded0 = ["function", "type", "id"],
  _excluded1 = ["arguments", "name"],
  _excluded10 = ["thread_id"],
  _excluded11 = ["thread_id", "run_id"],
  _excluded12 = ["thread_id"],
  _excluded13 = ["include"],
  _excluded14 = ["thread_id"],
  _excluded15 = ["thread_id"],
  _excluded16 = ["include"],
  _excluded17 = ["conversation_id"],
  _excluded18 = ["eval_id"],
  _excluded19 = ["vector_store_id"],
  _excluded20 = ["vector_store_id"],
  _excluded21 = ["baseURL", "apiKey", "organization", "project", "webhookSecret"],
  _excluded22 = ["signal", "method"];
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n2 = 0, F = function F() {}; return { s: F, n: function n() { return _n2 >= r.length ? { done: !0 } : { done: !1, value: r[_n2++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _awaitAsyncGenerator(e) { return new _OverloadYield(e, 0); }
function _wrapAsyncGenerator(e) { return function () { return new AsyncGenerator(e.apply(this, arguments)); }; }
function AsyncGenerator(e) { var r, t; function resume(r, t) { try { var n = e[r](t), o = n.value, u = o instanceof _OverloadYield; Promise.resolve(u ? o.v : o).then(function (t) { if (u) { var i = "return" === r ? "return" : "next"; if (!o.k || t.done) return resume(i, t); t = e[i](t).value; } settle(n.done ? "return" : "normal", t); }, function (e) { resume("throw", e); }); } catch (e) { settle("throw", e); } } function settle(e, n) { switch (e) { case "return": r.resolve({ value: n, done: !0 }); break; case "throw": r.reject(n); break; default: r.resolve({ value: n, done: !1 }); } (r = r.next) ? resume(r.key, r.arg) : t = null; } this._invoke = function (e, n) { return new Promise(function (o, u) { var i = { key: e, arg: n, resolve: o, reject: u, next: null }; t ? t = t.next = i : (r = t = i, resume(e, n)); }); }, "function" != typeof e.return && (this.return = void 0); }
AsyncGenerator.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function () { return this; }, AsyncGenerator.prototype.next = function (e) { return this._invoke("next", e); }, AsyncGenerator.prototype.throw = function (e) { return this._invoke("throw", e); }, AsyncGenerator.prototype.return = function (e) { return this._invoke("return", e); };
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function _asyncIterator(r) { var n, t, o, e = 2; for ("undefined" != typeof Symbol && (t = Symbol.asyncIterator, o = Symbol.iterator); e--;) { if (t && null != (n = r[t])) return n.call(r); if (o && null != (n = r[o])) return new AsyncFromSyncIterator(n.call(r)); t = "@@asyncIterator", o = "@@iterator"; } throw new TypeError("Object is not async iterable"); }
function AsyncFromSyncIterator(r) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var n = r.done; return Promise.resolve(r.value).then(function (r) { return { value: r, done: n }; }); } return AsyncFromSyncIterator = function AsyncFromSyncIterator(r) { this.s = r, this.n = r.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, return: function _return(r) { var n = this.s.return; return void 0 === n ? Promise.resolve({ value: r, done: !0 }) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); }, throw: function _throw(r) { var n = this.s.return; return void 0 === n ? Promise.reject(r) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(r); }
const originalNativeFetch = globalThis.fetch;
if (typeof originalNativeFetch !== "function") {
  throw new Error("fetch-wrapper: Native fetch not found! The C runtime must initialize fetch before the bundle runs.");
}
globalThis.fetch = function (input, init) {
  const url = typeof input === "string" ? input : input.url;
  const options = typeof input === "string" ? init : _objectSpread({
    method: input.method,
    headers: input.headers
  }, init);
  return originalNativeFetch(url, options);
};
function _(s, e, t, r, n) {
  if (r === "m") throw new TypeError("Private method is not writable");
  if (r === "a" && !n) throw new TypeError("Private accessor was defined without a setter");
  if (typeof e == "function" ? s !== e || !n : !e.has(s)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return r === "a" ? n.call(s, t) : n ? n.value = t : e.set(s, t), t;
}
function a(s, e, t, r) {
  if (t === "a" && !r) throw new TypeError("Private accessor was defined without a getter");
  if (typeof e == "function" ? s !== e || !r : !e.has(s)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return t === "m" ? r : t === "a" ? r.call(s) : r ? r.value : e.get(s);
}
var _Dr = function Dr() {
  let s = globalThis.crypto;
  if (s !== null && s !== void 0 && s.randomUUID) return _Dr = s.randomUUID.bind(s), s.randomUUID();
  let e = new Uint8Array(1),
    t = s ? () => s.getRandomValues(e)[0] : () => Math.random() * 255 & 255;
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, r => (+r ^ t() & 15 >> +r / 4).toString(16));
};
function Wt(s) {
  return typeof s == "object" && s !== null && ("name" in s && s.name === "AbortError" || "message" in s && String(s.message).includes("FetchRequestCanceledException"));
}
var qt = s => {
  if (s instanceof Error) return s;
  if (typeof s == "object" && s !== null) {
    try {
      if (Object.prototype.toString.call(s) === "[object Error]") {
        let e = new Error(s.message, s.cause ? {
          cause: s.cause
        } : {});
        return s.stack && (e.stack = s.stack), s.cause && !e.cause && (e.cause = s.cause), s.name && (e.name = s.name), e;
      }
    } catch (_unused) {}
    try {
      return new Error(JSON.stringify(s));
    } catch (_unused2) {}
  }
  return new Error(s);
};
var g = class extends Error {},
  T = class s extends g {
    constructor(e, t, r, n) {
      super(`${s.makeMessage(e, t, r)}`), this.status = e, this.headers = n, this.requestID = n === null || n === void 0 ? void 0 : n.get("x-request-id"), this.error = t;
      let o = t;
      this.code = o === null || o === void 0 ? void 0 : o.code, this.param = o === null || o === void 0 ? void 0 : o.param, this.type = o === null || o === void 0 ? void 0 : o.type;
    }
    static makeMessage(e, t, r) {
      let n = t !== null && t !== void 0 && t.message ? typeof t.message == "string" ? t.message : JSON.stringify(t.message) : t ? JSON.stringify(t) : r;
      return e && n ? `${e} ${n}` : e ? `${e} status code (no body)` : n || "(no status code or body)";
    }
    static generate(e, t, r, n) {
      if (!e || !n) return new de({
        message: r,
        cause: qt(t)
      });
      let o = t === null || t === void 0 ? void 0 : t.error;
      return e === 400 ? new Ze(e, o, r, n) : e === 401 ? new et(e, o, r, n) : e === 403 ? new tt(e, o, r, n) : e === 404 ? new rt(e, o, r, n) : e === 409 ? new st(e, o, r, n) : e === 422 ? new nt(e, o, r, n) : e === 429 ? new ot(e, o, r, n) : e >= 500 ? new it(e, o, r, n) : new s(e, o, r, n);
    }
  },
  $ = class extends T {
    constructor({
      message: e
    } = {}) {
      super(void 0, void 0, e || "Request was aborted.", void 0);
    }
  },
  de = class extends T {
    constructor({
      message: e,
      cause: t
    }) {
      super(void 0, void 0, e || "Connection error.", void 0), t && (this.cause = t);
    }
  },
  pe = class extends de {
    constructor({
      message: e
    } = {}) {
      super({
        message: e !== null && e !== void 0 ? e : "Request timed out."
      });
    }
  },
  Ze = class extends T {},
  et = class extends T {},
  tt = class extends T {},
  rt = class extends T {},
  st = class extends T {},
  nt = class extends T {},
  ot = class extends T {},
  it = class extends T {},
  at = class extends g {
    constructor() {
      super("Could not parse response content as the length limit was reached");
    }
  },
  lt = class extends g {
    constructor() {
      super("Could not parse response content as the request was rejected by the content filter");
    }
  },
  Y = class extends Error {
    constructor(e) {
      super(e);
    }
  };
var Tn = /^[a-z][a-z0-9+.-]*:/i,
  Es = s => Tn.test(s),
  D = s => (D = Array.isArray, D(s)),
  Wr = D;
function qr(s) {
  return typeof s != "object" ? {} : s !== null && s !== void 0 ? s : {};
}
function Os(s) {
  if (!s) return !0;
  for (let e in s) return !1;
  return !0;
}
function vs(s, e) {
  return Object.prototype.hasOwnProperty.call(s, e);
}
function Ht(s) {
  return s != null && typeof s == "object" && !Array.isArray(s);
}
var $s = (s, e) => {
  if (typeof e != "number" || !Number.isInteger(e)) throw new g(`${s} must be an integer`);
  if (e < 0) throw new g(`${s} must be a positive integer`);
  return e;
};
var ks = s => {
  try {
    return JSON.parse(s);
  } catch (_unused3) {
    return;
  }
};
var Z = s => new Promise(e => setTimeout(e, s));
var me = "6.4.0";
var Ms = () => typeof window < "u" && typeof window.document < "u" && typeof navigator < "u";
function Fn() {
  return typeof Deno < "u" && Deno.build != null ? "deno" : typeof EdgeRuntime < "u" ? "edge" : Object.prototype.toString.call(typeof globalThis.process < "u" ? globalThis.process : 0) === "[object process]" ? "node" : "unknown";
}
var Nn = () => {
  var _Deno$version$deno, _Deno$version, _globalThis$process$p, _globalThis$process$a, _globalThis$process$v;
  let s = Fn();
  if (s === "deno") return {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": me,
    "X-Stainless-OS": Fs(Deno.build.os),
    "X-Stainless-Arch": Ts(Deno.build.arch),
    "X-Stainless-Runtime": "deno",
    "X-Stainless-Runtime-Version": typeof Deno.version == "string" ? Deno.version : (_Deno$version$deno = (_Deno$version = Deno.version) === null || _Deno$version === void 0 ? void 0 : _Deno$version.deno) !== null && _Deno$version$deno !== void 0 ? _Deno$version$deno : "unknown"
  };
  if (typeof EdgeRuntime < "u") return {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": me,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": `other:${EdgeRuntime}`,
    "X-Stainless-Runtime": "edge",
    "X-Stainless-Runtime-Version": globalThis.process.version
  };
  if (s === "node") return {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": me,
    "X-Stainless-OS": Fs((_globalThis$process$p = globalThis.process.platform) !== null && _globalThis$process$p !== void 0 ? _globalThis$process$p : "unknown"),
    "X-Stainless-Arch": Ts((_globalThis$process$a = globalThis.process.arch) !== null && _globalThis$process$a !== void 0 ? _globalThis$process$a : "unknown"),
    "X-Stainless-Runtime": "node",
    "X-Stainless-Runtime-Version": (_globalThis$process$v = globalThis.process.version) !== null && _globalThis$process$v !== void 0 ? _globalThis$process$v : "unknown"
  };
  let e = Mn();
  return e ? {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": me,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": `browser:${e.browser}`,
    "X-Stainless-Runtime-Version": e.version
  } : {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": me,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": "unknown",
    "X-Stainless-Runtime-Version": "unknown"
  };
};
function Mn() {
  if (typeof navigator > "u" || !navigator) return null;
  let s = [{
    key: "edge",
    pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
  }, {
    key: "ie",
    pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
  }, {
    key: "ie",
    pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/
  }, {
    key: "chrome",
    pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
  }, {
    key: "firefox",
    pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
  }, {
    key: "safari",
    pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/
  }];
  for (var _i3 = 0, _s2 = s; _i3 < _s2.length; _i3++) {
    let _s2$_i = _s2[_i3],
      e = _s2$_i.key,
      t = _s2$_i.pattern;
    let r = t.exec(navigator.userAgent);
    if (r) {
      let n = r[1] || 0,
        o = r[2] || 0,
        i = r[3] || 0;
      return {
        browser: e,
        version: `${n}.${o}.${i}`
      };
    }
  }
  return null;
}
var Ts = s => s === "x32" ? "x32" : s === "x86_64" || s === "x64" ? "x64" : s === "arm" ? "arm" : s === "aarch64" || s === "arm64" ? "arm64" : s ? `other:${s}` : "unknown",
  Fs = s => (s = s.toLowerCase(), s.includes("ios") ? "iOS" : s === "android" ? "Android" : s === "darwin" ? "MacOS" : s === "win32" ? "Windows" : s === "freebsd" ? "FreeBSD" : s === "openbsd" ? "OpenBSD" : s === "linux" ? "Linux" : s ? `Other:${s}` : "Unknown"),
  Ns,
  Ls = () => Ns !== null && Ns !== void 0 ? Ns : Ns = Nn();
function Bs() {
  if (typeof fetch < "u") return fetch;
  throw new Error("`fetch` is not defined as a global; Either pass `fetch` to the client, `new OpenAI({ fetch })` or polyfill the global, `globalThis.fetch = fetch`");
}
function Hr(...s) {
  let e = globalThis.ReadableStream;
  if (typeof e > "u") throw new Error("`ReadableStream` is not defined as a global; You will need to polyfill it, `globalThis.ReadableStream = ReadableStream`");
  return new e(...s);
}
function ur(s) {
  let e = Symbol.asyncIterator in s ? s[Symbol.asyncIterator]() : s[Symbol.iterator]();
  return Hr({
    start() {},
    pull(t) {
      return _asyncToGenerator(function* () {
        let _yield$e$next = yield e.next(),
          r = _yield$e$next.done,
          n = _yield$e$next.value;
        r ? t.close() : t.enqueue(n);
      })();
    },
    cancel() {
      return _asyncToGenerator(function* () {
        var _e$return;
        yield (_e$return = e.return) === null || _e$return === void 0 ? void 0 : _e$return.call(e);
      })();
    }
  });
}
function Jr(s) {
  if (s[Symbol.asyncIterator]) return s;
  let e = s.getReader();
  return {
    next() {
      return _asyncToGenerator(function* () {
        try {
          let t = yield e.read();
          return t !== null && t !== void 0 && t.done && e.releaseLock(), t;
        } catch (t) {
          throw e.releaseLock(), t;
        }
      })();
    },
    return() {
      return _asyncToGenerator(function* () {
        let t = e.cancel();
        return e.releaseLock(), yield t, {
          done: !0,
          value: void 0
        };
      })();
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
function js(_x4) {
  return _js.apply(this, arguments);
}
function _js() {
  _js = _asyncToGenerator(function* (s) {
    if (s === null || typeof s != "object") return;
    if (s[Symbol.asyncIterator]) {
      var _s$Symbol$asyncIterat, _s$Symbol$asyncIterat2;
      yield (_s$Symbol$asyncIterat = (_s$Symbol$asyncIterat2 = s[Symbol.asyncIterator]()).return) === null || _s$Symbol$asyncIterat === void 0 ? void 0 : _s$Symbol$asyncIterat.call(_s$Symbol$asyncIterat2);
      return;
    }
    let e = s.getReader(),
      t = e.cancel();
    e.releaseLock(), yield t;
  });
  return _js.apply(this, arguments);
}
var Us = ({
  headers: s,
  body: e
}) => ({
  bodyHeaders: {
    "content-type": "application/json"
  },
  body: JSON.stringify(e)
});
var fr = "RFC3986",
  Xr = s => String(s),
  hr = {
    RFC1738: s => String(s).replace(/%20/g, "+"),
    RFC3986: Xr
  },
  Kr = "RFC1738";
var dr = (s, e) => {
    var _Object$hasOwn;
    return dr = (_Object$hasOwn = Object.hasOwn) !== null && _Object$hasOwn !== void 0 ? _Object$hasOwn : Function.prototype.call.bind(Object.prototype.hasOwnProperty), dr(s, e);
  },
  ee = (() => {
    let s = [];
    for (let e = 0; e < 256; ++e) s.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
    return s;
  })();
var Vr = 1024,
  Ds = (s, e, t, r, n) => {
    if (s.length === 0) return s;
    let o = s;
    if (typeof s == "symbol" ? o = Symbol.prototype.toString.call(s) : typeof s != "string" && (o = String(s)), t === "iso-8859-1") return escape(o).replace(/%u[0-9a-f]{4}/gi, function (l) {
      return "%26%23" + parseInt(l.slice(2), 16) + "%3B";
    });
    let i = "";
    for (let l = 0; l < o.length; l += Vr) {
      let h = o.length >= Vr ? o.slice(l, l + Vr) : o,
        m = [];
      for (let b = 0; b < h.length; ++b) {
        let p = h.charCodeAt(b);
        if (p === 45 || p === 46 || p === 95 || p === 126 || p >= 48 && p <= 57 || p >= 65 && p <= 90 || p >= 97 && p <= 122 || n === Kr && (p === 40 || p === 41)) {
          m[m.length] = h.charAt(b);
          continue;
        }
        if (p < 128) {
          m[m.length] = ee[p];
          continue;
        }
        if (p < 2048) {
          m[m.length] = ee[192 | p >> 6] + ee[128 | p & 63];
          continue;
        }
        if (p < 55296 || p >= 57344) {
          m[m.length] = ee[224 | p >> 12] + ee[128 | p >> 6 & 63] + ee[128 | p & 63];
          continue;
        }
        b += 1, p = 65536 + ((p & 1023) << 10 | h.charCodeAt(b) & 1023), m[m.length] = ee[240 | p >> 18] + ee[128 | p >> 12 & 63] + ee[128 | p >> 6 & 63] + ee[128 | p & 63];
      }
      i += m.join("");
    }
    return i;
  };
function Ws(s) {
  return !s || typeof s != "object" ? !1 : !!(s.constructor && s.constructor.isBuffer && s.constructor.isBuffer(s));
}
function Gr(s, e) {
  if (D(s)) {
    let t = [];
    for (let r = 0; r < s.length; r += 1) t.push(e(s[r]));
    return t;
  }
  return e(s);
}
var Hs = {
    brackets(s) {
      return String(s) + "[]";
    },
    comma: "comma",
    indices(s, e) {
      return String(s) + "[" + e + "]";
    },
    repeat(s) {
      return String(s);
    }
  },
  Js = function Js(s, e) {
    Array.prototype.push.apply(s, D(e) ? e : [e]);
  },
  qs,
  F = {
    addQueryPrefix: !1,
    allowDots: !1,
    allowEmptyArrays: !1,
    arrayFormat: "indices",
    charset: "utf-8",
    charsetSentinel: !1,
    delimiter: "&",
    encode: !0,
    encodeDotInKeys: !1,
    encoder: Ds,
    encodeValuesOnly: !1,
    format: fr,
    formatter: Xr,
    indices: !1,
    serializeDate(s) {
      return (qs !== null && qs !== void 0 ? qs : qs = Function.prototype.call.bind(Date.prototype.toISOString))(s);
    },
    skipNulls: !1,
    strictNullHandling: !1
  };
function jn(s) {
  return typeof s == "string" || typeof s == "number" || typeof s == "boolean" || typeof s == "symbol" || typeof s == "bigint";
}
var Qr = {};
function Xs(s, e, t, r, n, o, i, l, h, m, b, p, w, f, P, x, O, S) {
  let y = s,
    M = S,
    R = 0,
    H = !1;
  for (; (M = M.get(Qr)) !== void 0 && !H;) {
    let v = M.get(s);
    if (R += 1, typeof v < "u") {
      if (v === R) throw new RangeError("Cyclic object value");
      H = !0;
    }
    typeof M.get(Qr) > "u" && (R = 0);
  }
  if (typeof m == "function" ? y = m(e, y) : y instanceof Date ? y = w === null || w === void 0 ? void 0 : w(y) : t === "comma" && D(y) && (y = Gr(y, function (v) {
    return v instanceof Date ? w === null || w === void 0 ? void 0 : w(v) : v;
  })), y === null) {
    if (o) return h && !x ? h(e, F.encoder, O, "key", f) : e;
    y = "";
  }
  if (jn(y) || Ws(y)) {
    if (h) {
      let v = x ? e : h(e, F.encoder, O, "key", f);
      return [(P === null || P === void 0 ? void 0 : P(v)) + "=" + (P === null || P === void 0 ? void 0 : P(h(y, F.encoder, O, "value", f)))];
    }
    return [(P === null || P === void 0 ? void 0 : P(e)) + "=" + (P === null || P === void 0 ? void 0 : P(String(y)))];
  }
  let W = [];
  if (typeof y > "u") return W;
  let C;
  if (t === "comma" && D(y)) x && h && (y = Gr(y, h)), C = [{
    value: y.length > 0 ? y.join(",") || null : void 0
  }];else if (D(m)) C = m;else {
    let v = Object.keys(y);
    C = b ? v.sort(b) : v;
  }
  let L = l ? String(e).replace(/\./g, "%2E") : String(e),
    B = r && D(y) && y.length === 1 ? L + "[]" : L;
  if (n && D(y) && y.length === 0) return B + "[]";
  for (let v = 0; v < C.length; ++v) {
    let k = C[v],
      Rs = typeof k == "object" && typeof k.value < "u" ? k.value : y[k];
    if (i && Rs === null) continue;
    let Ur = p && l ? k.replace(/\./g, "%2E") : k,
      $n = D(y) ? typeof t == "function" ? t(B, Ur) : B : B + (p ? "." + Ur : "[" + Ur + "]");
    S.set(s, R);
    let Cs = new WeakMap();
    Cs.set(Qr, S), Js(W, Xs(Rs, $n, t, r, n, o, i, l, t === "comma" && x && D(y) ? null : h, m, b, p, w, f, P, x, O, Cs));
  }
  return W;
}
function Un(s = F) {
  if (typeof s.allowEmptyArrays < "u" && typeof s.allowEmptyArrays != "boolean") throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
  if (typeof s.encodeDotInKeys < "u" && typeof s.encodeDotInKeys != "boolean") throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
  if (s.encoder !== null && typeof s.encoder < "u" && typeof s.encoder != "function") throw new TypeError("Encoder has to be a function.");
  let e = s.charset || F.charset;
  if (typeof s.charset < "u" && s.charset !== "utf-8" && s.charset !== "iso-8859-1") throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  let t = fr;
  if (typeof s.format < "u") {
    if (!dr(hr, s.format)) throw new TypeError("Unknown format option provided.");
    t = s.format;
  }
  let r = hr[t],
    n = F.filter;
  (typeof s.filter == "function" || D(s.filter)) && (n = s.filter);
  let o;
  if (s.arrayFormat && s.arrayFormat in Hs ? o = s.arrayFormat : "indices" in s ? o = s.indices ? "indices" : "repeat" : o = F.arrayFormat, "commaRoundTrip" in s && typeof s.commaRoundTrip != "boolean") throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  let i = typeof s.allowDots > "u" ? s.encodeDotInKeys ? !0 : F.allowDots : !!s.allowDots;
  return {
    addQueryPrefix: typeof s.addQueryPrefix == "boolean" ? s.addQueryPrefix : F.addQueryPrefix,
    allowDots: i,
    allowEmptyArrays: typeof s.allowEmptyArrays == "boolean" ? !!s.allowEmptyArrays : F.allowEmptyArrays,
    arrayFormat: o,
    charset: e,
    charsetSentinel: typeof s.charsetSentinel == "boolean" ? s.charsetSentinel : F.charsetSentinel,
    commaRoundTrip: !!s.commaRoundTrip,
    delimiter: typeof s.delimiter > "u" ? F.delimiter : s.delimiter,
    encode: typeof s.encode == "boolean" ? s.encode : F.encode,
    encodeDotInKeys: typeof s.encodeDotInKeys == "boolean" ? s.encodeDotInKeys : F.encodeDotInKeys,
    encoder: typeof s.encoder == "function" ? s.encoder : F.encoder,
    encodeValuesOnly: typeof s.encodeValuesOnly == "boolean" ? s.encodeValuesOnly : F.encodeValuesOnly,
    filter: n,
    format: t,
    formatter: r,
    serializeDate: typeof s.serializeDate == "function" ? s.serializeDate : F.serializeDate,
    skipNulls: typeof s.skipNulls == "boolean" ? s.skipNulls : F.skipNulls,
    sort: typeof s.sort == "function" ? s.sort : null,
    strictNullHandling: typeof s.strictNullHandling == "boolean" ? s.strictNullHandling : F.strictNullHandling
  };
}
function zr(s, e = {}) {
  let t = s,
    r = Un(e),
    n,
    o;
  typeof r.filter == "function" ? (o = r.filter, t = o("", t)) : D(r.filter) && (o = r.filter, n = o);
  let i = [];
  if (typeof t != "object" || t === null) return "";
  let l = Hs[r.arrayFormat],
    h = l === "comma" && r.commaRoundTrip;
  n || (n = Object.keys(t)), r.sort && n.sort(r.sort);
  let m = new WeakMap();
  for (let w = 0; w < n.length; ++w) {
    let f = n[w];
    r.skipNulls && t[f] === null || Js(i, Xs(t[f], f, l, h, r.allowEmptyArrays, r.strictNullHandling, r.skipNulls, r.encodeDotInKeys, r.encode ? r.encoder : null, r.filter, r.sort, r.allowDots, r.serializeDate, r.format, r.formatter, r.encodeValuesOnly, r.charset, m));
  }
  let b = i.join(r.delimiter),
    p = r.addQueryPrefix === !0 ? "?" : "";
  return r.charsetSentinel && (r.charset === "iso-8859-1" ? p += "utf8=%26%2310003%3B&" : p += "utf8=%E2%9C%93&"), b.length > 0 ? p + b : "";
}
function Gs(s) {
  let e = 0;
  var _iterator15 = _createForOfIteratorHelper(s),
    _step15;
  try {
    for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
      let n = _step15.value;
      e += n.length;
    }
  } catch (err) {
    _iterator15.e(err);
  } finally {
    _iterator15.f();
  }
  let t = new Uint8Array(e),
    r = 0;
  var _iterator16 = _createForOfIteratorHelper(s),
    _step16;
  try {
    for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
      let n = _step16.value;
      t.set(n, r), r += n.length;
    }
  } catch (err) {
    _iterator16.e(err);
  } finally {
    _iterator16.f();
  }
  return t;
}
var Ks;
function ct(s) {
  let e;
  return (Ks !== null && Ks !== void 0 ? Ks : (e = new globalThis.TextEncoder(), Ks = e.encode.bind(e)))(s);
}
var Vs;
function Yr(s) {
  let e;
  return (Vs !== null && Vs !== void 0 ? Vs : (e = new globalThis.TextDecoder(), Vs = e.decode.bind(e)))(s);
}
var J,
  X,
  ve = class {
    constructor() {
      J.set(this, void 0), X.set(this, void 0), _(this, J, new Uint8Array(), "f"), _(this, X, null, "f");
    }
    decode(e) {
      if (e == null) return [];
      let t = e instanceof ArrayBuffer ? new Uint8Array(e) : typeof e == "string" ? ct(e) : e;
      _(this, J, Gs([a(this, J, "f"), t]), "f");
      let r = [],
        n;
      for (; (n = Wn(a(this, J, "f"), a(this, X, "f"))) != null;) {
        if (n.carriage && a(this, X, "f") == null) {
          _(this, X, n.index, "f");
          continue;
        }
        if (a(this, X, "f") != null && (n.index !== a(this, X, "f") + 1 || n.carriage)) {
          r.push(Yr(a(this, J, "f").subarray(0, a(this, X, "f") - 1))), _(this, J, a(this, J, "f").subarray(a(this, X, "f")), "f"), _(this, X, null, "f");
          continue;
        }
        let o = a(this, X, "f") !== null ? n.preceding - 1 : n.preceding,
          i = Yr(a(this, J, "f").subarray(0, o));
        r.push(i), _(this, J, a(this, J, "f").subarray(n.index), "f"), _(this, X, null, "f");
      }
      return r;
    }
    flush() {
      return a(this, J, "f").length ? this.decode(`
`) : [];
    }
  };
J = new WeakMap(), X = new WeakMap();
ve.NEWLINE_CHARS = new Set([`
`, "\r"]);
ve.NEWLINE_REGEXP = /\r\n|[\n\r]/g;
function Wn(s, e) {
  for (let n = e !== null && e !== void 0 ? e : 0; n < s.length; n++) {
    if (s[n] === 10) return {
      preceding: n,
      index: n + 1,
      carriage: !1
    };
    if (s[n] === 13) return {
      preceding: n,
      index: n + 1,
      carriage: !0
    };
  }
  return null;
}
function Qs(s) {
  for (let r = 0; r < s.length - 1; r++) {
    if (s[r] === 10 && s[r + 1] === 10 || s[r] === 13 && s[r + 1] === 13) return r + 2;
    if (s[r] === 13 && s[r + 1] === 10 && r + 3 < s.length && s[r + 2] === 13 && s[r + 3] === 10) return r + 4;
  }
  return -1;
}
var mr = {
    off: 0,
    error: 200,
    warn: 300,
    info: 400,
    debug: 500
  },
  Zr = (s, e, t) => {
    if (s) {
      if (vs(mr, s)) return s;
      E(t).warn(`${e} was set to ${JSON.stringify(s)}, expected one of ${JSON.stringify(Object.keys(mr))}`);
    }
  };
function Jt() {}
function pr(s, e, t) {
  return !e || mr[s] > mr[t] ? Jt : e[s].bind(e);
}
var qn = {
    error: Jt,
    warn: Jt,
    info: Jt,
    debug: Jt
  },
  zs = new WeakMap();
function E(s) {
  var _s$logLevel;
  let e = s.logger,
    t = (_s$logLevel = s.logLevel) !== null && _s$logLevel !== void 0 ? _s$logLevel : "off";
  if (!e) return qn;
  let r = zs.get(e);
  if (r && r[0] === t) return r[1];
  let n = {
    error: pr("error", e, t),
    warn: pr("warn", e, t),
    info: pr("info", e, t),
    debug: pr("debug", e, t)
  };
  return zs.set(e, [t, n]), n;
}
var oe = s => (s.options && (s.options = _objectSpread({}, s.options), delete s.options.headers), s.headers && (s.headers = Object.fromEntries((s.headers instanceof Headers ? [...s.headers] : Object.entries(s.headers)).map(([e, t]) => [e, e.toLowerCase() === "authorization" || e.toLowerCase() === "cookie" || e.toLowerCase() === "set-cookie" ? "***" : t]))), "retryOfRequestLogID" in s && (s.retryOfRequestLogID && (s.retryOf = s.retryOfRequestLogID), delete s.retryOfRequestLogID), s);
var Xt,
  te = class s {
    constructor(e, t, r) {
      this.iterator = e, Xt.set(this, void 0), this.controller = t, _(this, Xt, r, "f");
    }
    static fromSSEResponse(e, t, r) {
      let n = !1,
        o = r ? E(r) : console;
      function i() {
        return _i.apply(this, arguments);
      }
      function _i() {
        _i = _wrapAsyncGenerator(function* () {
          if (n) throw new g("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
          n = !0;
          let l = !1;
          try {
            var _iteratorAbruptCompletion = false;
            var _didIteratorError = false;
            var _iteratorError;
            try {
              for (var _iterator = _asyncIterator(Hn(e, t)), _step; _iteratorAbruptCompletion = !(_step = yield _awaitAsyncGenerator(_iterator.next())).done; _iteratorAbruptCompletion = false) {
                let h = _step.value;
                {
                  if (!l) {
                    if (h.data.startsWith("[DONE]")) {
                      l = !0;
                      continue;
                    }
                    if (h.event === null || !h.event.startsWith("thread.")) {
                      let m;
                      try {
                        m = JSON.parse(h.data);
                      } catch (b) {
                        throw o.error("Could not parse message into JSON:", h.data), o.error("From chunk:", h.raw), b;
                      }
                      if (m && m.error) throw new T(void 0, m.error, void 0, e.headers);
                      yield m;
                    } else {
                      let m;
                      try {
                        m = JSON.parse(h.data);
                      } catch (b) {
                        throw console.error("Could not parse message into JSON:", h.data), console.error("From chunk:", h.raw), b;
                      }
                      if (h.event == "error") throw new T(void 0, m.error, m.message, void 0);
                      yield {
                        event: h.event,
                        data: m
                      };
                    }
                  }
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (_iteratorAbruptCompletion && _iterator.return != null) {
                  yield _awaitAsyncGenerator(_iterator.return());
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
            l = !0;
          } catch (h) {
            if (Wt(h)) return;
            throw h;
          } finally {
            l || t.abort();
          }
        });
        return _i.apply(this, arguments);
      }
      return new s(i, t, r);
    }
    static fromReadableStream(e, t, r) {
      let n = !1;
      function o() {
        return _o.apply(this, arguments);
      }
      function _o() {
        _o = _wrapAsyncGenerator(function* () {
          let l = new ve(),
            h = Jr(e);
          var _iteratorAbruptCompletion2 = false;
          var _didIteratorError2 = false;
          var _iteratorError2;
          try {
            for (var _iterator2 = _asyncIterator(h), _step2; _iteratorAbruptCompletion2 = !(_step2 = yield _awaitAsyncGenerator(_iterator2.next())).done; _iteratorAbruptCompletion2 = false) {
              let m = _step2.value;
              {
                var _iterator17 = _createForOfIteratorHelper(l.decode(m)),
                  _step17;
                try {
                  for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
                    let b = _step17.value;
                    yield b;
                  }
                } catch (err) {
                  _iterator17.e(err);
                } finally {
                  _iterator17.f();
                }
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (_iteratorAbruptCompletion2 && _iterator2.return != null) {
                yield _awaitAsyncGenerator(_iterator2.return());
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
          var _iterator18 = _createForOfIteratorHelper(l.flush()),
            _step18;
          try {
            for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
              let m = _step18.value;
              yield m;
            }
          } catch (err) {
            _iterator18.e(err);
          } finally {
            _iterator18.f();
          }
        });
        return _o.apply(this, arguments);
      }
      function i() {
        return _i2.apply(this, arguments);
      }
      function _i2() {
        _i2 = _wrapAsyncGenerator(function* () {
          if (n) throw new g("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
          n = !0;
          let l = !1;
          try {
            var _iteratorAbruptCompletion3 = false;
            var _didIteratorError3 = false;
            var _iteratorError3;
            try {
              for (var _iterator3 = _asyncIterator(o()), _step3; _iteratorAbruptCompletion3 = !(_step3 = yield _awaitAsyncGenerator(_iterator3.next())).done; _iteratorAbruptCompletion3 = false) {
                let h = _step3.value;
                {
                  l || h && (yield JSON.parse(h));
                }
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (_iteratorAbruptCompletion3 && _iterator3.return != null) {
                  yield _awaitAsyncGenerator(_iterator3.return());
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }
            l = !0;
          } catch (h) {
            if (Wt(h)) return;
            throw h;
          } finally {
            l || t.abort();
          }
        });
        return _i2.apply(this, arguments);
      }
      return new s(i, t, r);
    }
    [(Xt = new WeakMap(), Symbol.asyncIterator)]() {
      return this.iterator();
    }
    tee() {
      let e = [],
        t = [],
        r = this.iterator(),
        n = o => ({
          next: () => {
            if (o.length === 0) {
              let i = r.next();
              e.push(i), t.push(i);
            }
            return o.shift();
          }
        });
      return [new s(() => n(e), this.controller, a(this, Xt, "f")), new s(() => n(t), this.controller, a(this, Xt, "f"))];
    }
    toReadableStream() {
      let e = this,
        t;
      return Hr({
        start() {
          return _asyncToGenerator(function* () {
            t = e[Symbol.asyncIterator]();
          })();
        },
        pull(r) {
          return _asyncToGenerator(function* () {
            try {
              let _yield$t$next = yield t.next(),
                n = _yield$t$next.value,
                o = _yield$t$next.done;
              if (o) return r.close();
              let i = ct(JSON.stringify(n) + `
`);
              r.enqueue(i);
            } catch (n) {
              r.error(n);
            }
          })();
        },
        cancel() {
          return _asyncToGenerator(function* () {
            var _t$return, _t2;
            yield (_t$return = (_t2 = t).return) === null || _t$return === void 0 ? void 0 : _t$return.call(_t2);
          })();
        }
      });
    }
  };
function Hn(_x, _x2) {
  return _Hn.apply(this, arguments);
}
function _Hn() {
  _Hn = _wrapAsyncGenerator(function* (s, e) {
    if (!s.body) throw e.abort(), typeof globalThis.navigator < "u" && globalThis.navigator.product === "ReactNative" ? new g("The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api") : new g("Attempted to iterate over a response with no body");
    let t = new es(),
      r = new ve(),
      n = Jr(s.body);
    var _iteratorAbruptCompletion4 = false;
    var _didIteratorError4 = false;
    var _iteratorError4;
    try {
      for (var _iterator4 = _asyncIterator(Jn(n)), _step4; _iteratorAbruptCompletion4 = !(_step4 = yield _awaitAsyncGenerator(_iterator4.next())).done; _iteratorAbruptCompletion4 = false) {
        let o = _step4.value;
        {
          var _iterator19 = _createForOfIteratorHelper(r.decode(o)),
            _step19;
          try {
            for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
              let i = _step19.value;
              let l = t.decode(i);
              l && (yield l);
            }
          } catch (err) {
            _iterator19.e(err);
          } finally {
            _iterator19.f();
          }
        }
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (_iteratorAbruptCompletion4 && _iterator4.return != null) {
          yield _awaitAsyncGenerator(_iterator4.return());
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }
    var _iterator20 = _createForOfIteratorHelper(r.flush()),
      _step20;
    try {
      for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
        let o = _step20.value;
        let i = t.decode(o);
        i && (yield i);
      }
    } catch (err) {
      _iterator20.e(err);
    } finally {
      _iterator20.f();
    }
  });
  return _Hn.apply(this, arguments);
}
function Jn(_x3) {
  return _Jn.apply(this, arguments);
}
function _Jn() {
  _Jn = _wrapAsyncGenerator(function* (s) {
    let e = new Uint8Array();
    var _iteratorAbruptCompletion5 = false;
    var _didIteratorError5 = false;
    var _iteratorError5;
    try {
      for (var _iterator5 = _asyncIterator(s), _step5; _iteratorAbruptCompletion5 = !(_step5 = yield _awaitAsyncGenerator(_iterator5.next())).done; _iteratorAbruptCompletion5 = false) {
        let t = _step5.value;
        {
          if (t == null) continue;
          let r = t instanceof ArrayBuffer ? new Uint8Array(t) : typeof t == "string" ? ct(t) : t,
            n = new Uint8Array(e.length + r.length);
          n.set(e), n.set(r, e.length), e = n;
          let o;
          for (; (o = Qs(e)) !== -1;) yield e.slice(0, o), e = e.slice(o);
        }
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (_iteratorAbruptCompletion5 && _iterator5.return != null) {
          yield _awaitAsyncGenerator(_iterator5.return());
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }
    e.length > 0 && (yield e);
  });
  return _Jn.apply(this, arguments);
}
var es = class {
  constructor() {
    this.event = null, this.data = [], this.chunks = [];
  }
  decode(e) {
    if (e.endsWith("\r") && (e = e.substring(0, e.length - 1)), !e) {
      if (!this.event && !this.data.length) return null;
      let o = {
        event: this.event,
        data: this.data.join(`
`),
        raw: this.chunks
      };
      return this.event = null, this.data = [], this.chunks = [], o;
    }
    if (this.chunks.push(e), e.startsWith(":")) return null;
    let _Xn = Xn(e, ":"),
      _Xn2 = _slicedToArray(_Xn, 3),
      t = _Xn2[0],
      r = _Xn2[1],
      n = _Xn2[2];
    return n.startsWith(" ") && (n = n.substring(1)), t === "event" ? this.event = n : t === "data" && this.data.push(n), null;
  }
};
function Xn(s, e) {
  let t = s.indexOf(e);
  return t !== -1 ? [s.substring(0, t), e, s.substring(t + e.length)] : [s, "", ""];
}
function gr(_x5, _x6) {
  return _gr.apply(this, arguments);
}
function _gr() {
  _gr = _asyncToGenerator(function* (s, e) {
    let t = e.response,
      r = e.requestLogID,
      n = e.retryOfRequestLogID,
      o = e.startTime,
      i = yield _asyncToGenerator(function* () {
        var _t$headers$get;
        if (e.options.stream) return E(s).debug("response", t.status, t.url, t.headers, t.body), e.options.__streamClass ? e.options.__streamClass.fromSSEResponse(t, e.controller, s) : te.fromSSEResponse(t, e.controller, s);
        if (t.status === 204) return null;
        if (e.options.__binaryResponse) return t;
        let h = (_t$headers$get = t.headers.get("content-type")) === null || _t$headers$get === void 0 || (_t$headers$get = _t$headers$get.split(";")[0]) === null || _t$headers$get === void 0 ? void 0 : _t$headers$get.trim();
        if (h !== null && h !== void 0 && h.includes("application/json") || h !== null && h !== void 0 && h.endsWith("+json")) {
          let p = yield t.json();
          return ts(p, t);
        }
        return yield t.text();
      })();
    return E(s).debug(`[${r}] response parsed`, oe({
      retryOfRequestLogID: n,
      url: t.url,
      status: t.status,
      body: i,
      durationMs: Date.now() - o
    })), i;
  });
  return _gr.apply(this, arguments);
}
function ts(s, e) {
  return !s || typeof s != "object" || Array.isArray(s) ? s : Object.defineProperty(s, "_request_id", {
    value: e.headers.get("x-request-id"),
    enumerable: !1
  });
}
var Kt,
  $e = class s extends Promise {
    constructor(e, t, r = gr) {
      console.log("[APIPromise] constructor called"), super(n => {
        console.log("[APIPromise] super resolve called with null"), n(null);
      }), this.responsePromise = t, this.parseResponse = r, Kt.set(this, void 0), _(this, Kt, e, "f"), console.log("[APIPromise] constructor complete, responsePromise:", typeof t);
    }
    _thenUnwrap(e) {
      var _this4 = this;
      return new s(a(this, Kt, "f"), this.responsePromise, /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(function* (t, r) {
          return ts(e(yield _this4.parseResponse(t, r), r), r.response);
        });
        return function (_x7, _x8) {
          return _ref.apply(this, arguments);
        };
      }());
    }
    asResponse() {
      return this.responsePromise.then(e => e.response);
    }
    withResponse() {
      var _this5 = this;
      return _asyncToGenerator(function* () {
        let _yield$Promise$all = yield Promise.all([_this5.parse(), _this5.asResponse()]),
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2),
          e = _yield$Promise$all2[0],
          t = _yield$Promise$all2[1];
        return {
          data: e,
          response: t,
          request_id: t.headers.get("x-request-id")
        };
      })();
    }
    parse() {
      return console.log("[APIPromise] parse() called, parsedPromise exists:", !!this.parsedPromise), this.parsedPromise || (console.log("[APIPromise] Creating parsedPromise from responsePromise"), this.parsedPromise = this.responsePromise.then(e => (console.log("[APIPromise] responsePromise resolved, calling parseResponse"), this.parseResponse(a(this, Kt, "f"), e))).then(e => (console.log("[APIPromise] parseResponse completed"), e)).catch(e => {
        throw console.log("[APIPromise] Error in parse chain:", e), e;
      })), this.parsedPromise;
    }
    then(e, t) {
      return console.log("[APIPromise] then() called"), this.parse().then(e, t);
    }
    catch(e) {
      return console.log("[APIPromise] catch() called"), this.parse().catch(e);
    }
    finally(e) {
      return console.log("[APIPromise] finally() called"), this.parse().finally(e);
    }
  };
Kt = new WeakMap();
var _r,
  Vt = class {
    constructor(e, t, r, n) {
      _r.set(this, void 0), _(this, _r, e, "f"), this.options = n, this.response = t, this.body = r;
    }
    hasNextPage() {
      return this.getPaginatedItems().length ? this.nextPageRequestOptions() != null : !1;
    }
    getNextPage() {
      var _this6 = this;
      return _asyncToGenerator(function* () {
        let e = _this6.nextPageRequestOptions();
        if (!e) throw new g("No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.");
        return yield a(_this6, _r, "f").requestAPIList(_this6.constructor, e);
      })();
    }
    iterPages() {
      var _this = this;
      return _wrapAsyncGenerator(function* () {
        let e = _this;
        for (yield e; e.hasNextPage();) e = yield _awaitAsyncGenerator(e.getNextPage()), yield e;
      })();
    }
    [(_r = new WeakMap(), Symbol.asyncIterator)]() {
      var _this2 = this;
      return _wrapAsyncGenerator(function* () {
        var _iteratorAbruptCompletion6 = false;
        var _didIteratorError6 = false;
        var _iteratorError6;
        try {
          for (var _iterator6 = _asyncIterator(_this2.iterPages()), _step6; _iteratorAbruptCompletion6 = !(_step6 = yield _awaitAsyncGenerator(_iterator6.next())).done; _iteratorAbruptCompletion6 = false) {
            let e = _step6.value;
            {
              var _iterator21 = _createForOfIteratorHelper(e.getPaginatedItems()),
                _step21;
              try {
                for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
                  let t = _step21.value;
                  yield t;
                }
              } catch (err) {
                _iterator21.e(err);
              } finally {
                _iterator21.f();
              }
            }
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (_iteratorAbruptCompletion6 && _iterator6.return != null) {
              yield _awaitAsyncGenerator(_iterator6.return());
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }
      })();
    }
  },
  Gt = class extends $e {
    constructor(e, t, r) {
      super(e, t, /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(function* (n, o) {
          return new r(n, o.response, yield gr(n, o), o.options);
        });
        return function (_x9, _x0) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
    [Symbol.asyncIterator]() {
      var _this3 = this;
      return _wrapAsyncGenerator(function* () {
        let e = yield _awaitAsyncGenerator(_this3);
        var _iteratorAbruptCompletion7 = false;
        var _didIteratorError7 = false;
        var _iteratorError7;
        try {
          for (var _iterator7 = _asyncIterator(e), _step7; _iteratorAbruptCompletion7 = !(_step7 = yield _awaitAsyncGenerator(_iterator7.next())).done; _iteratorAbruptCompletion7 = false) {
            let t = _step7.value;
            {
              yield t;
            }
          }
        } catch (err) {
          _didIteratorError7 = true;
          _iteratorError7 = err;
        } finally {
          try {
            if (_iteratorAbruptCompletion7 && _iterator7.return != null) {
              yield _awaitAsyncGenerator(_iterator7.return());
            }
          } finally {
            if (_didIteratorError7) {
              throw _iteratorError7;
            }
          }
        }
      })();
    }
  },
  re = class extends Vt {
    constructor(e, t, r, n) {
      super(e, t, r, n), this.data = r.data || [], this.object = r.object;
    }
    getPaginatedItems() {
      var _this$data;
      return (_this$data = this.data) !== null && _this$data !== void 0 ? _this$data : [];
    }
    nextPageRequestOptions() {
      return null;
    }
  },
  I = class extends Vt {
    constructor(e, t, r, n) {
      super(e, t, r, n), this.data = r.data || [], this.has_more = r.has_more || !1;
    }
    getPaginatedItems() {
      var _this$data2;
      return (_this$data2 = this.data) !== null && _this$data2 !== void 0 ? _this$data2 : [];
    }
    hasNextPage() {
      return this.has_more === !1 ? !1 : super.hasNextPage();
    }
    nextPageRequestOptions() {
      var _e2;
      let e = this.getPaginatedItems(),
        t = (_e2 = e[e.length - 1]) === null || _e2 === void 0 ? void 0 : _e2.id;
      return t ? _objectSpread(_objectSpread({}, this.options), {}, {
        query: _objectSpread(_objectSpread({}, qr(this.options.query)), {}, {
          after: t
        })
      }) : null;
    }
  },
  ie = class extends Vt {
    constructor(e, t, r, n) {
      super(e, t, r, n), this.data = r.data || [], this.has_more = r.has_more || !1, this.last_id = r.last_id || "";
    }
    getPaginatedItems() {
      var _this$data3;
      return (_this$data3 = this.data) !== null && _this$data3 !== void 0 ? _this$data3 : [];
    }
    hasNextPage() {
      return this.has_more === !1 ? !1 : super.hasNextPage();
    }
    nextPageRequestOptions() {
      let e = this.last_id;
      return e ? _objectSpread(_objectSpread({}, this.options), {}, {
        query: _objectSpread(_objectSpread({}, qr(this.options.query)), {}, {
          after: e
        })
      }) : null;
    }
  };
var ns = () => {
  if (typeof File > "u") {
    var _s$versions;
    let s = globalThis.process,
      e = typeof (s === null || s === void 0 || (_s$versions = s.versions) === null || _s$versions === void 0 ? void 0 : _s$versions.node) == "string" && parseInt(s.versions.node.split(".")) < 20;
    throw new Error("`File` is not defined as a global, which is required for file uploads." + (e ? " Update to Node 20 LTS or newer, or set `globalThis.File` to `import('node:buffer').File`." : ""));
  }
};
function ut(s, e, t) {
  return ns(), new File(s, e !== null && e !== void 0 ? e : "unknown_file", t);
}
function Qt(s) {
  return (typeof s == "object" && s !== null && ("name" in s && s.name && String(s.name) || "url" in s && s.url && String(s.url) || "filename" in s && s.filename && String(s.filename) || "path" in s && s.path && String(s.path)) || "").split(/[\\/]/).pop() || void 0;
}
var yr = s => s != null && typeof s == "object" && typeof s[Symbol.asyncIterator] == "function",
  zt = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(function* (s, e) {
      return rs(s.body) ? _objectSpread(_objectSpread({}, s), {}, {
        body: yield Zs(s.body, e)
      }) : s;
    });
    return function zt(_x1, _x10) {
      return _ref3.apply(this, arguments);
    };
  }(),
  K = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(function* (s, e) {
      return _objectSpread(_objectSpread({}, s), {}, {
        body: yield Zs(s.body, e)
      });
    });
    return function K(_x11, _x12) {
      return _ref4.apply(this, arguments);
    };
  }(),
  Ys = new WeakMap();
function Vn(s) {
  let e = typeof s == "function" ? s : s.fetch,
    t = Ys.get(e);
  if (t) return t;
  let r = _asyncToGenerator(function* () {
    try {
      let n = "Response" in e ? e.Response : (yield e("data:,")).constructor,
        o = new FormData();
      return o.toString() !== (yield new n(o).text());
    } catch (_unused4) {
      return !0;
    }
  })();
  return Ys.set(e, r), r;
}
var Zs = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(function* (s, e) {
      if (!(yield Vn(e))) throw new TypeError("The provided fetch function does not support file uploads with the current global FormData class.");
      let t = new FormData();
      return yield Promise.all(Object.entries(s || {}).map(([r, n]) => _ss(t, r, n))), t;
    });
    return function Zs(_x13, _x14) {
      return _ref6.apply(this, arguments);
    };
  }(),
  en = s => s instanceof Blob && "name" in s,
  Gn = s => typeof s == "object" && s !== null && (s instanceof Response || yr(s) || en(s)),
  rs = s => {
    if (Gn(s)) return !0;
    if (Array.isArray(s)) return s.some(rs);
    if (s && typeof s == "object") {
      for (let e in s) if (rs(s[e])) return !0;
    }
    return !1;
  },
  _ss = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(function* (s, e, t) {
      if (t !== void 0) {
        if (t == null) throw new TypeError(`Received null for "${e}"; to pass null in FormData, you must use the string 'null'`);
        if (typeof t == "string" || typeof t == "number" || typeof t == "boolean") s.append(e, String(t));else if (t instanceof Response) s.append(e, ut([yield t.blob()], Qt(t)));else if (yr(t)) s.append(e, ut([yield new Response(ur(t)).blob()], Qt(t)));else if (en(t)) s.append(e, t, Qt(t));else if (Array.isArray(t)) yield Promise.all(t.map(r => _ss(s, e + "[]", r)));else if (typeof t == "object") yield Promise.all(Object.entries(t).map(([r, n]) => _ss(s, `${e}[${r}]`, n)));else throw new TypeError(`Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${t} instead`);
      }
    });
    return function ss(_x15, _x16, _x17) {
      return _ref7.apply(this, arguments);
    };
  }();
var tn = s => s != null && typeof s == "object" && typeof s.size == "number" && typeof s.type == "string" && typeof s.text == "function" && typeof s.slice == "function" && typeof s.arrayBuffer == "function",
  Qn = s => s != null && typeof s == "object" && typeof s.name == "string" && typeof s.lastModified == "number" && tn(s),
  zn = s => s != null && typeof s == "object" && typeof s.url == "string" && typeof s.blob == "function";
function br(_x18, _x19, _x20) {
  return _br.apply(this, arguments);
}
function _br() {
  _br = _asyncToGenerator(function* (s, e, t) {
    var _t10;
    if (ns(), s = yield s, Qn(s)) return s instanceof File ? s : ut([yield s.arrayBuffer()], s.name);
    if (zn(s)) {
      let n = yield s.blob();
      return e || (e = new URL(s.url).pathname.split(/[\\/]/).pop()), ut(yield os(n), e, t);
    }
    let r = yield os(s);
    if (e || (e = Qt(s)), !((_t10 = t) !== null && _t10 !== void 0 && _t10.type)) {
      let n = r.find(o => typeof o == "object" && "type" in o && o.type);
      typeof n == "string" && (t = _objectSpread(_objectSpread({}, t), {}, {
        type: n
      }));
    }
    return ut(r, e, t);
  });
  return _br.apply(this, arguments);
}
function os(_x21) {
  return _os.apply(this, arguments);
}
function _os() {
  _os = _asyncToGenerator(function* (s) {
    let e = [];
    if (typeof s == "string" || ArrayBuffer.isView(s) || s instanceof ArrayBuffer) e.push(s);else if (tn(s)) e.push(s instanceof Blob ? s : yield s.arrayBuffer());else if (yr(s)) {
      var _iteratorAbruptCompletion8 = false;
      var _didIteratorError8 = false;
      var _iteratorError8;
      try {
        for (var _iterator8 = _asyncIterator(s), _step8; _iteratorAbruptCompletion8 = !(_step8 = yield _iterator8.next()).done; _iteratorAbruptCompletion8 = false) {
          let t = _step8.value;
          {
            e.push(...(yield os(t)));
          }
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (_iteratorAbruptCompletion8 && _iterator8.return != null) {
            yield _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }
    } else {
      var _s$constructor;
      let t = s === null || s === void 0 || (_s$constructor = s.constructor) === null || _s$constructor === void 0 ? void 0 : _s$constructor.name;
      throw new Error(`Unexpected data type: ${typeof s}${t ? `; constructor: ${t}` : ""}${Yn(s)}`);
    }
    return e;
  });
  return _os.apply(this, arguments);
}
function Yn(s) {
  return typeof s != "object" || s === null ? "" : `; props: [${Object.getOwnPropertyNames(s).map(t => `"${t}"`).join(", ")}]`;
}
var u = class {
  constructor(e) {
    this._client = e;
  }
};
function sn(s) {
  return s.replace(/[^A-Za-z0-9\-._~!$&'()*+,;=:@]+/g, encodeURIComponent);
}
var rn = Object.freeze(Object.create(null)),
  eo = (s = sn) => function (t, ...r) {
    if (t.length === 1) return t[0];
    let n = !1,
      o = [],
      i = t.reduce((b, p, w) => {
        var _Object$getPrototypeO, _Object$getPrototypeO2, _f$hasOwnProperty;
        /[?#]/.test(p) && (n = !0);
        let f = r[w],
          P = (n ? encodeURIComponent : s)("" + f);
        return w !== r.length && (f == null || typeof f == "object" && f.toString === ((_Object$getPrototypeO = Object.getPrototypeOf((_Object$getPrototypeO2 = Object.getPrototypeOf((_f$hasOwnProperty = f.hasOwnProperty) !== null && _f$hasOwnProperty !== void 0 ? _f$hasOwnProperty : rn)) !== null && _Object$getPrototypeO2 !== void 0 ? _Object$getPrototypeO2 : rn)) === null || _Object$getPrototypeO === void 0 ? void 0 : _Object$getPrototypeO.toString)) && (P = f + "", o.push({
          start: b.length + p.length,
          length: P.length,
          error: `Value of type ${Object.prototype.toString.call(f).slice(8, -1)} is not a valid path parameter`
        })), b + p + (w === r.length ? "" : P);
      }, ""),
      l = i.split(/[?#]/, 1)[0],
      h = /(?<=^|\/)(?:\.|%2e){1,2}(?=\/|$)/gi,
      m;
    for (; (m = h.exec(l)) !== null;) o.push({
      start: m.index,
      length: m[0].length,
      error: `Value "${m[0]}" can't be safely passed as a path parameter`
    });
    if (o.sort((b, p) => b.start - p.start), o.length > 0) {
      let b = 0,
        p = o.reduce((w, f) => {
          let P = " ".repeat(f.start - b),
            x = "^".repeat(f.length);
          return b = f.start + f.length, w + P + x;
        }, "");
      throw new g(`Path parameters result in path with invalid segments:
${o.map(w => w.error).join(`
`)}
${i}
${p}`);
    }
    return i;
  },
  c = eo(sn);
var ke = class extends u {
  list(e, t = {}, r) {
    return this._client.getAPIList(c`/chat/completions/${e}/messages`, I, _objectSpread({
      query: t
    }, r));
  }
};
function Yt(s) {
  return s !== void 0 && "function" in s && s.function !== void 0;
}
function Zt(s) {
  return (s === null || s === void 0 ? void 0 : s.$brand) === "auto-parseable-response-format";
}
function Te(s) {
  return (s === null || s === void 0 ? void 0 : s.$brand) === "auto-parseable-tool";
}
function nn(s, e) {
  return !e || !is(e) ? _objectSpread(_objectSpread({}, s), {}, {
    choices: s.choices.map(t => (an(t.message.tool_calls), _objectSpread(_objectSpread({}, t), {}, {
      message: _objectSpread(_objectSpread({}, t.message), {}, {
        parsed: null
      }, t.message.tool_calls ? {
        tool_calls: t.message.tool_calls
      } : void 0)
    })))
  }) : er(s, e);
}
function er(s, e) {
  let t = s.choices.map(r => {
    var _r$message$tool_calls, _r$message$tool_calls2;
    if (r.finish_reason === "length") throw new at();
    if (r.finish_reason === "content_filter") throw new lt();
    return an(r.message.tool_calls), _objectSpread(_objectSpread({}, r), {}, {
      message: _objectSpread(_objectSpread(_objectSpread({}, r.message), r.message.tool_calls ? {
        tool_calls: (_r$message$tool_calls = (_r$message$tool_calls2 = r.message.tool_calls) === null || _r$message$tool_calls2 === void 0 ? void 0 : _r$message$tool_calls2.map(n => no(e, n))) !== null && _r$message$tool_calls !== void 0 ? _r$message$tool_calls : void 0
      } : void 0), {}, {
        parsed: r.message.content && !r.message.refusal ? so(e, r.message.content) : null
      })
    });
  });
  return _objectSpread(_objectSpread({}, s), {}, {
    choices: t
  });
}
function so(s, e) {
  var _s$response_format, _s$response_format2;
  return ((_s$response_format = s.response_format) === null || _s$response_format === void 0 ? void 0 : _s$response_format.type) !== "json_schema" ? null : ((_s$response_format2 = s.response_format) === null || _s$response_format2 === void 0 ? void 0 : _s$response_format2.type) === "json_schema" ? "$parseRaw" in s.response_format ? s.response_format.$parseRaw(e) : JSON.parse(e) : null;
}
function no(s, e) {
  var _s$tools;
  let t = (_s$tools = s.tools) === null || _s$tools === void 0 ? void 0 : _s$tools.find(r => {
    var _r$function;
    return Yt(r) && ((_r$function = r.function) === null || _r$function === void 0 ? void 0 : _r$function.name) === e.function.name;
  });
  return _objectSpread(_objectSpread({}, e), {}, {
    function: _objectSpread(_objectSpread({}, e.function), {}, {
      parsed_arguments: Te(t) ? t.$parseRaw(e.function.arguments) : t !== null && t !== void 0 && t.function.strict ? JSON.parse(e.function.arguments) : null
    })
  });
}
function on(s, e) {
  var _s$tools2;
  if (!s || !("tools" in s) || !s.tools) return !1;
  let t = (_s$tools2 = s.tools) === null || _s$tools2 === void 0 ? void 0 : _s$tools2.find(r => {
    var _r$function2;
    return Yt(r) && ((_r$function2 = r.function) === null || _r$function2 === void 0 ? void 0 : _r$function2.name) === e.function.name;
  });
  return Yt(t) && (Te(t) || (t === null || t === void 0 ? void 0 : t.function.strict) || !1);
}
function is(s) {
  var _s$tools$some, _s$tools3;
  return Zt(s.response_format) ? !0 : (_s$tools$some = (_s$tools3 = s.tools) === null || _s$tools3 === void 0 ? void 0 : _s$tools3.some(e => Te(e) || e.type === "function" && e.function.strict === !0)) !== null && _s$tools$some !== void 0 ? _s$tools$some : !1;
}
function an(s) {
  var _iterator22 = _createForOfIteratorHelper(s || []),
    _step22;
  try {
    for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
      let e = _step22.value;
      if (e.type !== "function") throw new g(`Currently only \`function\` tool calls are supported; Received \`${e.type}\``);
    }
  } catch (err) {
    _iterator22.e(err);
  } finally {
    _iterator22.f();
  }
}
function ln(s) {
  var _iterator23 = _createForOfIteratorHelper(s !== null && s !== void 0 ? s : []),
    _step23;
  try {
    for (_iterator23.s(); !(_step23 = _iterator23.n()).done;) {
      let e = _step23.value;
      if (e.type !== "function") throw new g(`Currently only \`function\` tool types support auto-parsing; Received \`${e.type}\``);
      if (e.function.strict !== !0) throw new g(`The \`${e.function.name}\` tool is not marked with \`strict: true\`. Only strict function tools can be auto-parsed`);
    }
  } catch (err) {
    _iterator23.e(err);
  } finally {
    _iterator23.f();
  }
}
var ft = s => (s === null || s === void 0 ? void 0 : s.role) === "assistant",
  as = s => (s === null || s === void 0 ? void 0 : s.role) === "tool";
var ls,
  wr,
  xr,
  tr,
  rr,
  Ar,
  sr,
  ae,
  nr,
  Ir,
  Pr,
  ht,
  cn,
  ge = class {
    constructor() {
      ls.add(this), this.controller = new AbortController(), wr.set(this, void 0), xr.set(this, () => {}), tr.set(this, () => {}), rr.set(this, void 0), Ar.set(this, () => {}), sr.set(this, () => {}), ae.set(this, {}), nr.set(this, !1), Ir.set(this, !1), Pr.set(this, !1), ht.set(this, !1), _(this, wr, new Promise((e, t) => {
        _(this, xr, e, "f"), _(this, tr, t, "f");
      }), "f"), _(this, rr, new Promise((e, t) => {
        _(this, Ar, e, "f"), _(this, sr, t, "f");
      }), "f"), a(this, wr, "f").catch(() => {}), a(this, rr, "f").catch(() => {});
    }
    _run(e) {
      setTimeout(() => {
        e().then(() => {
          this._emitFinal(), this._emit("end");
        }, a(this, ls, "m", cn).bind(this));
      }, 0);
    }
    _connected() {
      this.ended || (a(this, xr, "f").call(this), this._emit("connect"));
    }
    get ended() {
      return a(this, nr, "f");
    }
    get errored() {
      return a(this, Ir, "f");
    }
    get aborted() {
      return a(this, Pr, "f");
    }
    abort() {
      this.controller.abort();
    }
    on(e, t) {
      return (a(this, ae, "f")[e] || (a(this, ae, "f")[e] = [])).push({
        listener: t
      }), this;
    }
    off(e, t) {
      let r = a(this, ae, "f")[e];
      if (!r) return this;
      let n = r.findIndex(o => o.listener === t);
      return n >= 0 && r.splice(n, 1), this;
    }
    once(e, t) {
      return (a(this, ae, "f")[e] || (a(this, ae, "f")[e] = [])).push({
        listener: t,
        once: !0
      }), this;
    }
    emitted(e) {
      return new Promise((t, r) => {
        _(this, ht, !0, "f"), e !== "error" && this.once("error", r), this.once(e, t);
      });
    }
    done() {
      var _this7 = this;
      return _asyncToGenerator(function* () {
        _(_this7, ht, !0, "f"), yield a(_this7, rr, "f");
      })();
    }
    _emit(e, ...t) {
      if (a(this, nr, "f")) return;
      e === "end" && (_(this, nr, !0, "f"), a(this, Ar, "f").call(this));
      let r = a(this, ae, "f")[e];
      if (r && (a(this, ae, "f")[e] = r.filter(n => !n.once), r.forEach(({
        listener: n
      }) => n(...t))), e === "abort") {
        let n = t[0];
        !a(this, ht, "f") && !(r !== null && r !== void 0 && r.length) && Promise.reject(n), a(this, tr, "f").call(this, n), a(this, sr, "f").call(this, n), this._emit("end");
        return;
      }
      if (e === "error") {
        let n = t[0];
        !a(this, ht, "f") && !(r !== null && r !== void 0 && r.length) && Promise.reject(n), a(this, tr, "f").call(this, n), a(this, sr, "f").call(this, n), this._emit("end");
      }
    }
    _emitFinal() {}
  };
wr = new WeakMap(), xr = new WeakMap(), tr = new WeakMap(), rr = new WeakMap(), Ar = new WeakMap(), sr = new WeakMap(), ae = new WeakMap(), nr = new WeakMap(), Ir = new WeakMap(), Pr = new WeakMap(), ht = new WeakMap(), ls = new WeakSet(), cn = function cn(e) {
  if (_(this, Ir, !0, "f"), e instanceof Error && e.name === "AbortError" && (e = new $()), e instanceof $) return _(this, Pr, !0, "f"), this._emit("abort", e);
  if (e instanceof g) return this._emit("error", e);
  if (e instanceof Error) {
    let t = new g(e.message);
    return t.cause = e, this._emit("error", t);
  }
  return this._emit("error", new g(String(e)));
};
function un(s) {
  return typeof s.parse == "function";
}
var q,
  cs,
  Sr,
  us,
  fs,
  hs,
  fn,
  hn,
  oo = 10,
  dt = class extends ge {
    constructor() {
      super(...arguments), q.add(this), this._chatCompletions = [], this.messages = [];
    }
    _addChatCompletion(e) {
      var _e$choices$;
      this._chatCompletions.push(e), this._emit("chatCompletion", e);
      let t = (_e$choices$ = e.choices[0]) === null || _e$choices$ === void 0 ? void 0 : _e$choices$.message;
      return t && this._addMessage(t), e;
    }
    _addMessage(e, t = !0) {
      if ("content" in e || (e.content = null), this.messages.push(e), t) {
        if (this._emit("message", e), as(e) && e.content) this._emit("functionToolCallResult", e.content);else if (ft(e) && e.tool_calls) {
          var _iterator24 = _createForOfIteratorHelper(e.tool_calls),
            _step24;
          try {
            for (_iterator24.s(); !(_step24 = _iterator24.n()).done;) {
              let r = _step24.value;
              r.type === "function" && this._emit("functionToolCall", r.function);
            }
          } catch (err) {
            _iterator24.e(err);
          } finally {
            _iterator24.f();
          }
        }
      }
    }
    finalChatCompletion() {
      var _this8 = this;
      return _asyncToGenerator(function* () {
        yield _this8.done();
        let e = _this8._chatCompletions[_this8._chatCompletions.length - 1];
        if (!e) throw new g("stream ended without producing a ChatCompletion");
        return e;
      })();
    }
    finalContent() {
      var _this9 = this;
      return _asyncToGenerator(function* () {
        return yield _this9.done(), a(_this9, q, "m", cs).call(_this9);
      })();
    }
    finalMessage() {
      var _this0 = this;
      return _asyncToGenerator(function* () {
        return yield _this0.done(), a(_this0, q, "m", Sr).call(_this0);
      })();
    }
    finalFunctionToolCall() {
      var _this1 = this;
      return _asyncToGenerator(function* () {
        return yield _this1.done(), a(_this1, q, "m", us).call(_this1);
      })();
    }
    finalFunctionToolCallResult() {
      var _this10 = this;
      return _asyncToGenerator(function* () {
        return yield _this10.done(), a(_this10, q, "m", fs).call(_this10);
      })();
    }
    totalUsage() {
      var _this11 = this;
      return _asyncToGenerator(function* () {
        return yield _this11.done(), a(_this11, q, "m", hs).call(_this11);
      })();
    }
    allChatCompletions() {
      return [...this._chatCompletions];
    }
    _emitFinal() {
      let e = this._chatCompletions[this._chatCompletions.length - 1];
      e && this._emit("finalChatCompletion", e);
      let t = a(this, q, "m", Sr).call(this);
      t && this._emit("finalMessage", t);
      let r = a(this, q, "m", cs).call(this);
      r && this._emit("finalContent", r);
      let n = a(this, q, "m", us).call(this);
      n && this._emit("finalFunctionToolCall", n);
      let o = a(this, q, "m", fs).call(this);
      o != null && this._emit("finalFunctionToolCallResult", o), this._chatCompletions.some(i => i.usage) && this._emit("totalUsage", a(this, q, "m", hs).call(this));
    }
    _createChatCompletion(e, t, r) {
      var _this12 = this;
      return _asyncToGenerator(function* () {
        let n = r === null || r === void 0 ? void 0 : r.signal;
        n && (n.aborted && _this12.controller.abort(), n.addEventListener("abort", () => _this12.controller.abort())), a(_this12, q, "m", fn).call(_this12, t);
        let o = yield e.chat.completions.create(_objectSpread(_objectSpread({}, t), {}, {
          stream: !1
        }), _objectSpread(_objectSpread({}, r), {}, {
          signal: _this12.controller.signal
        }));
        return _this12._connected(), _this12._addChatCompletion(er(o, t));
      })();
    }
    _runChatCompletion(e, t, r) {
      var _this13 = this;
      return _asyncToGenerator(function* () {
        var _iterator25 = _createForOfIteratorHelper(t.messages),
          _step25;
        try {
          for (_iterator25.s(); !(_step25 = _iterator25.n()).done;) {
            let n = _step25.value;
            _this13._addMessage(n, !1);
          }
        } catch (err) {
          _iterator25.e(err);
        } finally {
          _iterator25.f();
        }
        return yield _this13._createChatCompletion(e, t, r);
      })();
    }
    _runTools(e, t, r) {
      var _this14 = this;
      return _asyncToGenerator(function* () {
        var _o$function;
        let n = "tool",
          _t$tool_choice = t.tool_choice,
          o = _t$tool_choice === void 0 ? "auto" : _t$tool_choice,
          i = t.stream,
          l = _objectWithoutProperties(t, _excluded),
          h = typeof o != "string" && o.type === "function" && (o === null || o === void 0 || (_o$function = o.function) === null || _o$function === void 0 ? void 0 : _o$function.name),
          _ref8 = r || {},
          _ref8$maxChatCompleti = _ref8.maxChatCompletions,
          m = _ref8$maxChatCompleti === void 0 ? oo : _ref8$maxChatCompleti,
          b = t.tools.map(f => {
            if (Te(f)) {
              if (!f.$callback) throw new g("Tool given to `.runTools()` that does not have an associated function");
              return {
                type: "function",
                function: {
                  function: f.$callback,
                  name: f.function.name,
                  description: f.function.description || "",
                  parameters: f.function.parameters,
                  parse: f.$parseRaw,
                  strict: !0
                }
              };
            }
            return f;
          }),
          p = {};
        var _iterator26 = _createForOfIteratorHelper(b),
          _step26;
        try {
          for (_iterator26.s(); !(_step26 = _iterator26.n()).done;) {
            let f = _step26.value;
            f.type === "function" && (p[f.function.name || f.function.function.name] = f.function);
          }
        } catch (err) {
          _iterator26.e(err);
        } finally {
          _iterator26.f();
        }
        let w = "tools" in t ? b.map(f => f.type === "function" ? {
          type: "function",
          function: {
            name: f.function.name || f.function.function.name,
            parameters: f.function.parameters,
            description: f.function.description,
            strict: f.function.strict
          }
        } : f) : void 0;
        var _iterator27 = _createForOfIteratorHelper(t.messages),
          _step27;
        try {
          for (_iterator27.s(); !(_step27 = _iterator27.n()).done;) {
            let f = _step27.value;
            _this14._addMessage(f, !1);
          }
        } catch (err) {
          _iterator27.e(err);
        } finally {
          _iterator27.f();
        }
        for (let f = 0; f < m; ++f) {
          var _yield$_this14$_creat, _x$tool_calls;
          let x = (_yield$_this14$_creat = (yield _this14._createChatCompletion(e, _objectSpread(_objectSpread({}, l), {}, {
            tool_choice: o,
            tools: w,
            messages: [..._this14.messages]
          }), r)).choices[0]) === null || _yield$_this14$_creat === void 0 ? void 0 : _yield$_this14$_creat.message;
          if (!x) throw new g("missing message in ChatCompletion response");
          if (!((_x$tool_calls = x.tool_calls) !== null && _x$tool_calls !== void 0 && _x$tool_calls.length)) return;
          var _iterator28 = _createForOfIteratorHelper(x.tool_calls),
            _step28;
          try {
            for (_iterator28.s(); !(_step28 = _iterator28.n()).done;) {
              let O = _step28.value;
              if (O.type !== "function") continue;
              let S = O.id,
                _O$function = O.function,
                y = _O$function.name,
                M = _O$function.arguments,
                R = p[y];
              if (R) {
                if (h && h !== y) {
                  let L = `Invalid tool_call: ${JSON.stringify(y)}. ${JSON.stringify(h)} requested. Please try again`;
                  _this14._addMessage({
                    role: n,
                    tool_call_id: S,
                    content: L
                  });
                  continue;
                }
              } else {
                let L = `Invalid tool_call: ${JSON.stringify(y)}. Available options are: ${Object.keys(p).map(B => JSON.stringify(B)).join(", ")}. Please try again`;
                _this14._addMessage({
                  role: n,
                  tool_call_id: S,
                  content: L
                });
                continue;
              }
              let H;
              try {
                H = un(R) ? yield R.parse(M) : M;
              } catch (L) {
                let B = L instanceof Error ? L.message : String(L);
                _this14._addMessage({
                  role: n,
                  tool_call_id: S,
                  content: B
                });
                continue;
              }
              let W = yield R.function(H, _this14),
                C = a(_this14, q, "m", hn).call(_this14, W);
              if (_this14._addMessage({
                role: n,
                tool_call_id: S,
                content: C
              }), h) return;
            }
          } catch (err) {
            _iterator28.e(err);
          } finally {
            _iterator28.f();
          }
        }
      })();
    }
  };
q = new WeakSet(), cs = function cs() {
  var _a$call$content;
  return (_a$call$content = a(this, q, "m", Sr).call(this).content) !== null && _a$call$content !== void 0 ? _a$call$content : null;
}, Sr = function Sr() {
  let e = this.messages.length;
  for (; e-- > 0;) {
    var _t$content, _t$refusal;
    let t = this.messages[e];
    if (ft(t)) return _objectSpread(_objectSpread({}, t), {}, {
      content: (_t$content = t.content) !== null && _t$content !== void 0 ? _t$content : null,
      refusal: (_t$refusal = t.refusal) !== null && _t$refusal !== void 0 ? _t$refusal : null
    });
  }
  throw new g("stream ended without producing a ChatCompletionMessage with role=assistant");
}, us = function us() {
  for (let e = this.messages.length - 1; e >= 0; e--) {
    var _t$tool_calls, _t$tool_calls$filter$;
    let t = this.messages[e];
    if (ft(t) && t !== null && t !== void 0 && (_t$tool_calls = t.tool_calls) !== null && _t$tool_calls !== void 0 && _t$tool_calls.length) return (_t$tool_calls$filter$ = t.tool_calls.filter(r => r.type === "function").at(-1)) === null || _t$tool_calls$filter$ === void 0 ? void 0 : _t$tool_calls$filter$.function;
  }
}, fs = function fs() {
  for (let e = this.messages.length - 1; e >= 0; e--) {
    let t = this.messages[e];
    if (as(t) && t.content != null && typeof t.content == "string" && this.messages.some(r => {
      var _r$tool_calls;
      return r.role === "assistant" && ((_r$tool_calls = r.tool_calls) === null || _r$tool_calls === void 0 ? void 0 : _r$tool_calls.some(n => n.type === "function" && n.id === t.tool_call_id));
    })) return t.content;
  }
}, hs = function hs() {
  let e = {
    completion_tokens: 0,
    prompt_tokens: 0,
    total_tokens: 0
  };
  var _iterator29 = _createForOfIteratorHelper(this._chatCompletions),
    _step29;
  try {
    for (_iterator29.s(); !(_step29 = _iterator29.n()).done;) {
      let t = _step29.value.usage;
      t && (e.completion_tokens += t.completion_tokens, e.prompt_tokens += t.prompt_tokens, e.total_tokens += t.total_tokens);
    }
  } catch (err) {
    _iterator29.e(err);
  } finally {
    _iterator29.f();
  }
  return e;
}, fn = function fn(e) {
  if (e.n != null && e.n > 1) throw new g("ChatCompletion convenience helpers only support n=1 at this time. To use n>1, please use chat.completions.create() directly.");
}, hn = function hn(e) {
  return typeof e == "string" ? e : e === void 0 ? "undefined" : JSON.stringify(e);
};
var or = class s extends dt {
  static runTools(e, t, r) {
    let n = new s(),
      o = _objectSpread(_objectSpread({}, r), {}, {
        headers: _objectSpread(_objectSpread({}, r === null || r === void 0 ? void 0 : r.headers), {}, {
          "X-Stainless-Helper-Method": "runTools"
        })
      });
    return n._run(() => n._runTools(e, t, o)), n;
  }
  _addMessage(e, t = !0) {
    super._addMessage(e, t), ft(e) && e.content && this._emit("content", e.content);
  }
};
var j = {
    STR: 1,
    NUM: 2,
    ARR: 4,
    OBJ: 8,
    NULL: 16,
    BOOL: 32,
    NAN: 64,
    INFINITY: 128,
    MINUS_INFINITY: 256,
    INF: 384,
    SPECIAL: 496,
    ATOM: 499,
    COLLECTION: 12,
    ALL: 511
  },
  ds = class extends Error {},
  ps = class extends Error {};
function io(s, e = j.ALL) {
  if (typeof s != "string") throw new TypeError(`expecting str, got ${typeof s}`);
  if (!s.trim()) throw new Error(`${s} is empty`);
  return ao(s.trim(), e);
}
var ao = (s, e) => {
    let t = s.length,
      r = 0,
      n = w => {
        throw new ds(`${w} at position ${r}`);
      },
      o = w => {
        throw new ps(`${w} at position ${r}`);
      },
      i = () => (p(), r >= t && n("Unexpected end of input"), s[r] === '"' ? l() : s[r] === "{" ? h() : s[r] === "[" ? m() : s.substring(r, r + 4) === "null" || j.NULL & e && t - r < 4 && "null".startsWith(s.substring(r)) ? (r += 4, null) : s.substring(r, r + 4) === "true" || j.BOOL & e && t - r < 4 && "true".startsWith(s.substring(r)) ? (r += 4, !0) : s.substring(r, r + 5) === "false" || j.BOOL & e && t - r < 5 && "false".startsWith(s.substring(r)) ? (r += 5, !1) : s.substring(r, r + 8) === "Infinity" || j.INFINITY & e && t - r < 8 && "Infinity".startsWith(s.substring(r)) ? (r += 8, 1 / 0) : s.substring(r, r + 9) === "-Infinity" || j.MINUS_INFINITY & e && 1 < t - r && t - r < 9 && "-Infinity".startsWith(s.substring(r)) ? (r += 9, -1 / 0) : s.substring(r, r + 3) === "NaN" || j.NAN & e && t - r < 3 && "NaN".startsWith(s.substring(r)) ? (r += 3, NaN) : b()),
      l = () => {
        let w = r,
          f = !1;
        for (r++; r < t && (s[r] !== '"' || f && s[r - 1] === "\\");) f = s[r] === "\\" ? !f : !1, r++;
        if (s.charAt(r) == '"') try {
          return JSON.parse(s.substring(w, ++r - Number(f)));
        } catch (P) {
          o(String(P));
        } else if (j.STR & e) try {
          return JSON.parse(s.substring(w, r - Number(f)) + '"');
        } catch (_unused5) {
          return JSON.parse(s.substring(w, s.lastIndexOf("\\")) + '"');
        }
        n("Unterminated string literal");
      },
      h = () => {
        r++, p();
        let w = {};
        try {
          for (; s[r] !== "}";) {
            if (p(), r >= t && j.OBJ & e) return w;
            let f = l();
            p(), r++;
            try {
              let P = i();
              Object.defineProperty(w, f, {
                value: P,
                writable: !0,
                enumerable: !0,
                configurable: !0
              });
            } catch (P) {
              if (j.OBJ & e) return w;
              throw P;
            }
            p(), s[r] === "," && r++;
          }
        } catch (_unused6) {
          if (j.OBJ & e) return w;
          n("Expected '}' at end of object");
        }
        return r++, w;
      },
      m = () => {
        r++;
        let w = [];
        try {
          for (; s[r] !== "]";) w.push(i()), p(), s[r] === "," && r++;
        } catch (_unused7) {
          if (j.ARR & e) return w;
          n("Expected ']' at end of array");
        }
        return r++, w;
      },
      b = () => {
        if (r === 0) {
          s === "-" && j.NUM & e && n("Not sure what '-' is");
          try {
            return JSON.parse(s);
          } catch (f) {
            if (j.NUM & e) try {
              return s[s.length - 1] === "." ? JSON.parse(s.substring(0, s.lastIndexOf("."))) : JSON.parse(s.substring(0, s.lastIndexOf("e")));
            } catch (_unused8) {}
            o(String(f));
          }
        }
        let w = r;
        for (s[r] === "-" && r++; s[r] && !",]}".includes(s[r]);) r++;
        r == t && !(j.NUM & e) && n("Unterminated number literal");
        try {
          return JSON.parse(s.substring(w, r));
        } catch (_unused9) {
          s.substring(w, r) === "-" && j.NUM & e && n("Not sure what '-' is");
          try {
            return JSON.parse(s.substring(w, s.lastIndexOf("e")));
          } catch (P) {
            o(String(P));
          }
        }
      },
      p = () => {
        for (; r < t && ` 
\r	`.includes(s[r]);) r++;
      };
    return i();
  },
  ms = s => io(s, j.ALL ^ j.NUM);
var N,
  le,
  pt,
  _e,
  gs,
  Rr,
  _s,
  ys,
  bs,
  Cr,
  ws,
  dn,
  Fe = class s extends dt {
    constructor(e) {
      super(), N.add(this), le.set(this, void 0), pt.set(this, void 0), _e.set(this, void 0), _(this, le, e, "f"), _(this, pt, [], "f");
    }
    get currentChatCompletionSnapshot() {
      return a(this, _e, "f");
    }
    static fromReadableStream(e) {
      let t = new s(null);
      return t._run(() => t._fromReadableStream(e)), t;
    }
    static createChatCompletion(e, t, r) {
      let n = new s(t);
      return n._run(() => n._runChatCompletion(e, _objectSpread(_objectSpread({}, t), {}, {
        stream: !0
      }), _objectSpread(_objectSpread({}, r), {}, {
        headers: _objectSpread(_objectSpread({}, r === null || r === void 0 ? void 0 : r.headers), {}, {
          "X-Stainless-Helper-Method": "stream"
        })
      }))), n;
    }
    _createChatCompletion(e, t, r) {
      var _superprop_get_createChatCompletion = () => super._createChatCompletion,
        _this15 = this;
      return _asyncToGenerator(function* () {
        var _o$controller$signal;
        _superprop_get_createChatCompletion();
        let n = r === null || r === void 0 ? void 0 : r.signal;
        n && (n.aborted && _this15.controller.abort(), n.addEventListener("abort", () => _this15.controller.abort())), a(_this15, N, "m", gs).call(_this15);
        let o = yield e.chat.completions.create(_objectSpread(_objectSpread({}, t), {}, {
          stream: !0
        }), _objectSpread(_objectSpread({}, r), {}, {
          signal: _this15.controller.signal
        }));
        _this15._connected();
        var _iteratorAbruptCompletion9 = false;
        var _didIteratorError9 = false;
        var _iteratorError9;
        try {
          for (var _iterator9 = _asyncIterator(o), _step9; _iteratorAbruptCompletion9 = !(_step9 = yield _iterator9.next()).done; _iteratorAbruptCompletion9 = false) {
            let i = _step9.value;
            {
              a(_this15, N, "m", _s).call(_this15, i);
            }
          }
        } catch (err) {
          _didIteratorError9 = true;
          _iteratorError9 = err;
        } finally {
          try {
            if (_iteratorAbruptCompletion9 && _iterator9.return != null) {
              yield _iterator9.return();
            }
          } finally {
            if (_didIteratorError9) {
              throw _iteratorError9;
            }
          }
        }
        if ((_o$controller$signal = o.controller.signal) !== null && _o$controller$signal !== void 0 && _o$controller$signal.aborted) throw new $();
        return _this15._addChatCompletion(a(_this15, N, "m", Cr).call(_this15));
      })();
    }
    _fromReadableStream(e, t) {
      var _this16 = this;
      return _asyncToGenerator(function* () {
        var _n$controller$signal;
        let r = t === null || t === void 0 ? void 0 : t.signal;
        r && (r.aborted && _this16.controller.abort(), r.addEventListener("abort", () => _this16.controller.abort())), a(_this16, N, "m", gs).call(_this16), _this16._connected();
        let n = te.fromReadableStream(e, _this16.controller),
          o;
        var _iteratorAbruptCompletion0 = false;
        var _didIteratorError0 = false;
        var _iteratorError0;
        try {
          for (var _iterator0 = _asyncIterator(n), _step0; _iteratorAbruptCompletion0 = !(_step0 = yield _iterator0.next()).done; _iteratorAbruptCompletion0 = false) {
            let i = _step0.value;
            {
              o && o !== i.id && _this16._addChatCompletion(a(_this16, N, "m", Cr).call(_this16)), a(_this16, N, "m", _s).call(_this16, i), o = i.id;
            }
          }
        } catch (err) {
          _didIteratorError0 = true;
          _iteratorError0 = err;
        } finally {
          try {
            if (_iteratorAbruptCompletion0 && _iterator0.return != null) {
              yield _iterator0.return();
            }
          } finally {
            if (_didIteratorError0) {
              throw _iteratorError0;
            }
          }
        }
        if ((_n$controller$signal = n.controller.signal) !== null && _n$controller$signal !== void 0 && _n$controller$signal.aborted) throw new $();
        return _this16._addChatCompletion(a(_this16, N, "m", Cr).call(_this16));
      })();
    }
    [(le = new WeakMap(), pt = new WeakMap(), _e = new WeakMap(), N = new WeakSet(), gs = function gs() {
      this.ended || _(this, _e, void 0, "f");
    }, Rr = function Rr(t) {
      let r = a(this, pt, "f")[t.index];
      return r || (r = {
        content_done: !1,
        refusal_done: !1,
        logprobs_content_done: !1,
        logprobs_refusal_done: !1,
        done_tool_calls: new Set(),
        current_tool_call_index: null
      }, a(this, pt, "f")[t.index] = r, r);
    }, _s = function _s(t) {
      if (this.ended) return;
      let r = a(this, N, "m", dn).call(this, t);
      this._emit("chunk", t, r);
      var _iterator30 = _createForOfIteratorHelper(t.choices),
        _step30;
      try {
        for (_iterator30.s(); !(_step30 = _iterator30.n()).done;) {
          var _o$message, _o$message2, _o$message3, _o$message4, _n$logprobs, _o$message5, _n$logprobs2, _o$logprobs$content, _o$logprobs, _n$logprobs3, _o$message6, _n$logprobs4, _o$logprobs$refusal, _o$logprobs2, _n$delta$tool_calls, _n$delta$tool_calls2;
          let n = _step30.value;
          let o = r.choices[n.index];
          n.delta.content != null && ((_o$message = o.message) === null || _o$message === void 0 ? void 0 : _o$message.role) === "assistant" && (_o$message2 = o.message) !== null && _o$message2 !== void 0 && _o$message2.content && (this._emit("content", n.delta.content, o.message.content), this._emit("content.delta", {
            delta: n.delta.content,
            snapshot: o.message.content,
            parsed: o.message.parsed
          })), n.delta.refusal != null && ((_o$message3 = o.message) === null || _o$message3 === void 0 ? void 0 : _o$message3.role) === "assistant" && (_o$message4 = o.message) !== null && _o$message4 !== void 0 && _o$message4.refusal && this._emit("refusal.delta", {
            delta: n.delta.refusal,
            snapshot: o.message.refusal
          }), ((_n$logprobs = n.logprobs) === null || _n$logprobs === void 0 ? void 0 : _n$logprobs.content) != null && ((_o$message5 = o.message) === null || _o$message5 === void 0 ? void 0 : _o$message5.role) === "assistant" && this._emit("logprobs.content.delta", {
            content: (_n$logprobs2 = n.logprobs) === null || _n$logprobs2 === void 0 ? void 0 : _n$logprobs2.content,
            snapshot: (_o$logprobs$content = (_o$logprobs = o.logprobs) === null || _o$logprobs === void 0 ? void 0 : _o$logprobs.content) !== null && _o$logprobs$content !== void 0 ? _o$logprobs$content : []
          }), ((_n$logprobs3 = n.logprobs) === null || _n$logprobs3 === void 0 ? void 0 : _n$logprobs3.refusal) != null && ((_o$message6 = o.message) === null || _o$message6 === void 0 ? void 0 : _o$message6.role) === "assistant" && this._emit("logprobs.refusal.delta", {
            refusal: (_n$logprobs4 = n.logprobs) === null || _n$logprobs4 === void 0 ? void 0 : _n$logprobs4.refusal,
            snapshot: (_o$logprobs$refusal = (_o$logprobs2 = o.logprobs) === null || _o$logprobs2 === void 0 ? void 0 : _o$logprobs2.refusal) !== null && _o$logprobs$refusal !== void 0 ? _o$logprobs$refusal : []
          });
          let i = a(this, N, "m", Rr).call(this, o);
          o.finish_reason && (a(this, N, "m", bs).call(this, o), i.current_tool_call_index != null && a(this, N, "m", ys).call(this, o, i.current_tool_call_index));
          var _iterator31 = _createForOfIteratorHelper((_n$delta$tool_calls = n.delta.tool_calls) !== null && _n$delta$tool_calls !== void 0 ? _n$delta$tool_calls : []),
            _step31;
          try {
            for (_iterator31.s(); !(_step31 = _iterator31.n()).done;) {
              let l = _step31.value;
              i.current_tool_call_index !== l.index && (a(this, N, "m", bs).call(this, o), i.current_tool_call_index != null && a(this, N, "m", ys).call(this, o, i.current_tool_call_index)), i.current_tool_call_index = l.index;
            }
          } catch (err) {
            _iterator31.e(err);
          } finally {
            _iterator31.f();
          }
          var _iterator32 = _createForOfIteratorHelper((_n$delta$tool_calls2 = n.delta.tool_calls) !== null && _n$delta$tool_calls2 !== void 0 ? _n$delta$tool_calls2 : []),
            _step32;
          try {
            for (_iterator32.s(); !(_step32 = _iterator32.n()).done;) {
              var _o$message$tool_calls, _h$function, _l$function$arguments, _l$function;
              let l = _step32.value;
              let h = (_o$message$tool_calls = o.message.tool_calls) === null || _o$message$tool_calls === void 0 ? void 0 : _o$message$tool_calls[l.index];
              (h === null || h === void 0 ? void 0 : h.type) && ((h === null || h === void 0 ? void 0 : h.type) === "function" ? this._emit("tool_calls.function.arguments.delta", {
                name: (_h$function = h.function) === null || _h$function === void 0 ? void 0 : _h$function.name,
                index: l.index,
                arguments: h.function.arguments,
                parsed_arguments: h.function.parsed_arguments,
                arguments_delta: (_l$function$arguments = (_l$function = l.function) === null || _l$function === void 0 ? void 0 : _l$function.arguments) !== null && _l$function$arguments !== void 0 ? _l$function$arguments : ""
              }) : (h !== null && h !== void 0 && h.type, void 0));
            }
          } catch (err) {
            _iterator32.e(err);
          } finally {
            _iterator32.f();
          }
        }
      } catch (err) {
        _iterator30.e(err);
      } finally {
        _iterator30.f();
      }
    }, ys = function ys(t, r) {
      var _t$message$tool_calls;
      if (a(this, N, "m", Rr).call(this, t).done_tool_calls.has(r)) return;
      let o = (_t$message$tool_calls = t.message.tool_calls) === null || _t$message$tool_calls === void 0 ? void 0 : _t$message$tool_calls[r];
      if (!o) throw new Error("no tool call snapshot");
      if (!o.type) throw new Error("tool call snapshot missing `type`");
      if (o.type === "function") {
        var _a;
        let i = (_a = a(this, le, "f")) === null || _a === void 0 || (_a = _a.tools) === null || _a === void 0 ? void 0 : _a.find(l => Yt(l) && l.function.name === o.function.name);
        this._emit("tool_calls.function.arguments.done", {
          name: o.function.name,
          index: r,
          arguments: o.function.arguments,
          parsed_arguments: Te(i) ? i.$parseRaw(o.function.arguments) : i !== null && i !== void 0 && i.function.strict ? JSON.parse(o.function.arguments) : null
        });
      } else o.type;
    }, bs = function bs(t) {
      var _t$logprobs, _t$logprobs2;
      let r = a(this, N, "m", Rr).call(this, t);
      if (t.message.content && !r.content_done) {
        r.content_done = !0;
        let n = a(this, N, "m", ws).call(this);
        this._emit("content.done", {
          content: t.message.content,
          parsed: n ? n.$parseRaw(t.message.content) : null
        });
      }
      t.message.refusal && !r.refusal_done && (r.refusal_done = !0, this._emit("refusal.done", {
        refusal: t.message.refusal
      })), (_t$logprobs = t.logprobs) !== null && _t$logprobs !== void 0 && _t$logprobs.content && !r.logprobs_content_done && (r.logprobs_content_done = !0, this._emit("logprobs.content.done", {
        content: t.logprobs.content
      })), ((_t$logprobs2 = t.logprobs) === null || _t$logprobs2 === void 0 ? void 0 : _t$logprobs2.refusal) && !r.logprobs_refusal_done && (r.logprobs_refusal_done = !0, this._emit("logprobs.refusal.done", {
        refusal: t.logprobs.refusal
      }));
    }, Cr = function Cr() {
      if (this.ended) throw new g("stream has ended, this shouldn't happen");
      let t = a(this, _e, "f");
      if (!t) throw new g("request ended without sending any chunks");
      return _(this, _e, void 0, "f"), _(this, pt, [], "f"), lo(t, a(this, le, "f"));
    }, ws = function ws() {
      var _a2;
      let t = (_a2 = a(this, le, "f")) === null || _a2 === void 0 ? void 0 : _a2.response_format;
      return Zt(t) ? t : null;
    }, dn = function dn(t) {
      var r, n, o, i;
      let l = a(this, _e, "f"),
        h = t.choices,
        m = _objectWithoutProperties(t, _excluded2);
      l ? Object.assign(l, m) : l = _(this, _e, _objectSpread(_objectSpread({}, m), {}, {
        choices: []
      }), "f");
      var _iterator33 = _createForOfIteratorHelper(t.choices),
        _step33;
      try {
        for (_iterator33.s(); !(_step33 = _iterator33.n()).done;) {
          var _o$arguments;
          let _ref9 = _step33.value;
          let b = _ref9.delta,
            p = _ref9.finish_reason,
            w = _ref9.index,
            _ref9$logprobs = _ref9.logprobs,
            f = _ref9$logprobs === void 0 ? null : _ref9$logprobs,
            P = _objectWithoutProperties(_ref9, _excluded3);
          let x = l.choices[w];
          if (x || (x = l.choices[w] = _objectSpread({
            finish_reason: p,
            index: w,
            message: {},
            logprobs: f
          }, P)), f) if (!x.logprobs) x.logprobs = Object.assign({}, f);else {
            var _r$content, _n$refusal;
            let W = f.content,
              C = f.refusal,
              L = _objectWithoutProperties(f, _excluded4);
            Object.assign(x.logprobs, L), W && ((_r$content = (r = x.logprobs).content) !== null && _r$content !== void 0 ? _r$content : r.content = [], x.logprobs.content.push(...W)), C && ((_n$refusal = (n = x.logprobs).refusal) !== null && _n$refusal !== void 0 ? _n$refusal : n.refusal = [], x.logprobs.refusal.push(...C));
          }
          if (p && (x.finish_reason = p, a(this, le, "f") && is(a(this, le, "f")))) {
            if (p === "length") throw new at();
            if (p === "content_filter") throw new lt();
          }
          if (Object.assign(x, P), !b) continue;
          let O = b.content,
            S = b.refusal,
            y = b.function_call,
            M = b.role,
            R = b.tool_calls,
            H = _objectWithoutProperties(b, _excluded5);
          if (Object.assign(x.message, H), S && (x.message.refusal = (x.message.refusal || "") + S), M && (x.message.role = M), y && (x.message.function_call ? (y.name && (x.message.function_call.name = y.name), y.arguments && ((_o$arguments = (o = x.message.function_call).arguments) !== null && _o$arguments !== void 0 ? _o$arguments : o.arguments = "", x.message.function_call.arguments += y.arguments)) : x.message.function_call = y), O && (x.message.content = (x.message.content || "") + O, !x.message.refusal && a(this, N, "m", ws).call(this) && (x.message.parsed = ms(x.message.content))), R) {
            x.message.tool_calls || (x.message.tool_calls = []);
            var _iterator34 = _createForOfIteratorHelper(R),
              _step34;
            try {
              for (_iterator34.s(); !(_step34 = _iterator34.n()).done;) {
                var _i$W, _k$function, _B$name;
                let _ref0 = _step34.value;
                let W = _ref0.index,
                  C = _ref0.id,
                  L = _ref0.type,
                  B = _ref0.function,
                  v = _objectWithoutProperties(_ref0, _excluded6);
                let k = (_i$W = (i = x.message.tool_calls)[W]) !== null && _i$W !== void 0 ? _i$W : i[W] = {};
                Object.assign(k, v), C && (k.id = C), L && (k.type = L), B && ((_k$function = k.function) !== null && _k$function !== void 0 ? _k$function : k.function = {
                  name: (_B$name = B.name) !== null && _B$name !== void 0 ? _B$name : "",
                  arguments: ""
                }), B !== null && B !== void 0 && B.name && (k.function.name = B.name), (B === null || B === void 0 ? void 0 : B.arguments) && (k.function.arguments += B.arguments, on(a(this, le, "f"), k) && (k.function.parsed_arguments = ms(k.function.arguments)));
              }
            } catch (err) {
              _iterator34.e(err);
            } finally {
              _iterator34.f();
            }
          }
        }
      } catch (err) {
        _iterator33.e(err);
      } finally {
        _iterator33.f();
      }
      return l;
    }, Symbol.asyncIterator)]() {
      var _this17 = this;
      let e = [],
        t = [],
        r = !1;
      return this.on("chunk", n => {
        let o = t.shift();
        o ? o.resolve(n) : e.push(n);
      }), this.on("end", () => {
        r = !0;
        for (var _i4 = 0, _t3 = t; _i4 < _t3.length; _i4++) {
          let n = _t3[_i4];
          n.resolve(void 0);
        }
        t.length = 0;
      }), this.on("abort", n => {
        r = !0;
        for (var _i5 = 0, _t4 = t; _i5 < _t4.length; _i5++) {
          let o = _t4[_i5];
          o.reject(n);
        }
        t.length = 0;
      }), this.on("error", n => {
        r = !0;
        for (var _i6 = 0, _t5 = t; _i6 < _t5.length; _i6++) {
          let o = _t5[_i6];
          o.reject(n);
        }
        t.length = 0;
      }), {
        next: function () {
          var _next2 = _asyncToGenerator(function* () {
            return e.length ? {
              value: e.shift(),
              done: !1
            } : r ? {
              value: void 0,
              done: !0
            } : new Promise((o, i) => t.push({
              resolve: o,
              reject: i
            })).then(o => o ? {
              value: o,
              done: !1
            } : {
              value: void 0,
              done: !0
            });
          });
          function next() {
            return _next2.apply(this, arguments);
          }
          return next;
        }(),
        return: function () {
          var _return2 = _asyncToGenerator(function* () {
            return _this17.abort(), {
              value: void 0,
              done: !0
            };
          });
          function _return() {
            return _return2.apply(this, arguments);
          }
          return _return;
        }()
      };
    }
    toReadableStream() {
      return new te(this[Symbol.asyncIterator].bind(this), this.controller).toReadableStream();
    }
  };
function lo(s, e) {
  let t = s.id,
    r = s.choices,
    n = s.created,
    o = s.model,
    i = s.system_fingerprint,
    l = _objectWithoutProperties(s, _excluded7),
    h = _objectSpread(_objectSpread({}, l), {}, {
      id: t,
      choices: r.map(_ref1 => {
        var _m$refusal2, _m$refusal3;
        let m = _ref1.message,
          b = _ref1.finish_reason,
          p = _ref1.index,
          w = _ref1.logprobs,
          f = _objectWithoutProperties(_ref1, _excluded8);
        if (!b) throw new g(`missing finish_reason for choice ${p}`);
        let _m$content = m.content,
          P = _m$content === void 0 ? null : _m$content,
          x = m.function_call,
          O = m.tool_calls,
          S = _objectWithoutProperties(m, _excluded9),
          y = m.role;
        if (!y) throw new g(`missing role for choice ${p}`);
        if (x) {
          var _m$refusal;
          let M = x.arguments,
            R = x.name;
          if (M == null) throw new g(`missing function_call.arguments for choice ${p}`);
          if (!R) throw new g(`missing function_call.name for choice ${p}`);
          return _objectSpread(_objectSpread({}, f), {}, {
            message: {
              content: P,
              function_call: {
                arguments: M,
                name: R
              },
              role: y,
              refusal: (_m$refusal = m.refusal) !== null && _m$refusal !== void 0 ? _m$refusal : null
            },
            finish_reason: b,
            index: p,
            logprobs: w
          });
        }
        return O ? _objectSpread(_objectSpread({}, f), {}, {
          index: p,
          finish_reason: b,
          logprobs: w,
          message: _objectSpread(_objectSpread({}, S), {}, {
            role: y,
            content: P,
            refusal: (_m$refusal2 = m.refusal) !== null && _m$refusal2 !== void 0 ? _m$refusal2 : null,
            tool_calls: O.map((M, R) => {
              let H = M.function,
                W = M.type,
                C = M.id,
                L = _objectWithoutProperties(M, _excluded0),
                _ref10 = H || {},
                B = _ref10.arguments,
                v = _ref10.name,
                k = _objectWithoutProperties(_ref10, _excluded1);
              if (C == null) throw new g(`missing choices[${p}].tool_calls[${R}].id
${Er(s)}`);
              if (W == null) throw new g(`missing choices[${p}].tool_calls[${R}].type
${Er(s)}`);
              if (v == null) throw new g(`missing choices[${p}].tool_calls[${R}].function.name
${Er(s)}`);
              if (B == null) throw new g(`missing choices[${p}].tool_calls[${R}].function.arguments
${Er(s)}`);
              return _objectSpread(_objectSpread({}, L), {}, {
                id: C,
                type: W,
                function: _objectSpread(_objectSpread({}, k), {}, {
                  name: v,
                  arguments: B
                })
              });
            })
          })
        }) : _objectSpread(_objectSpread({}, f), {}, {
          message: _objectSpread(_objectSpread({}, S), {}, {
            content: P,
            role: y,
            refusal: (_m$refusal3 = m.refusal) !== null && _m$refusal3 !== void 0 ? _m$refusal3 : null
          }),
          finish_reason: b,
          index: p,
          logprobs: w
        });
      }),
      created: n,
      model: o,
      object: "chat.completion"
    }, i ? {
      system_fingerprint: i
    } : {});
  return nn(h, e);
}
function Er(s) {
  return JSON.stringify(s);
}
var ir = class s extends Fe {
  static fromReadableStream(e) {
    let t = new s(null);
    return t._run(() => t._fromReadableStream(e)), t;
  }
  static runTools(e, t, r) {
    let n = new s(t),
      o = _objectSpread(_objectSpread({}, r), {}, {
        headers: _objectSpread(_objectSpread({}, r === null || r === void 0 ? void 0 : r.headers), {}, {
          "X-Stainless-Helper-Method": "runTools"
        })
      });
    return n._run(() => n._runTools(e, t, o)), n;
  }
};
var ce = class extends u {
  constructor() {
    super(...arguments), this.messages = new ke(this._client);
  }
  create(e, t) {
    var _e$stream;
    return this._client.post("/chat/completions", _objectSpread(_objectSpread({
      body: e
    }, t), {}, {
      stream: (_e$stream = e.stream) !== null && _e$stream !== void 0 ? _e$stream : !1
    }));
  }
  retrieve(e, t) {
    return this._client.get(c`/chat/completions/${e}`, t);
  }
  update(e, t, r) {
    return this._client.post(c`/chat/completions/${e}`, _objectSpread({
      body: t
    }, r));
  }
  list(e = {}, t) {
    return this._client.getAPIList("/chat/completions", I, _objectSpread({
      query: e
    }, t));
  }
  delete(e, t) {
    return this._client.delete(c`/chat/completions/${e}`, t);
  }
  parse(e, t) {
    return ln(e.tools), this._client.chat.completions.create(e, _objectSpread(_objectSpread({}, t), {}, {
      headers: _objectSpread(_objectSpread({}, t === null || t === void 0 ? void 0 : t.headers), {}, {
        "X-Stainless-Helper-Method": "chat.completions.parse"
      })
    }))._thenUnwrap(r => er(r, e));
  }
  runTools(e, t) {
    return e.stream ? ir.runTools(this._client, e, t) : or.runTools(this._client, e, t);
  }
  stream(e, t) {
    return Fe.createChatCompletion(this._client, e, t);
  }
};
ce.Messages = ke;
var ye = class extends u {
  constructor() {
    super(...arguments), this.completions = new ce(this._client);
  }
};
ye.Completions = ce;
var pn = Symbol("brand.privateNullableHeaders");
function* uo(s) {
  if (!s) return;
  if (pn in s) {
    let r = s.values,
      n = s.nulls;
    yield* r.entries();
    var _iterator35 = _createForOfIteratorHelper(n),
      _step35;
    try {
      for (_iterator35.s(); !(_step35 = _iterator35.n()).done;) {
        let o = _step35.value;
        yield [o, null];
      }
    } catch (err) {
      _iterator35.e(err);
    } finally {
      _iterator35.f();
    }
    return;
  }
  let e = !1,
    t;
  s instanceof Headers ? t = s.entries() : Wr(s) ? t = s : (e = !0, t = Object.entries(s !== null && s !== void 0 ? s : {}));
  var _iterator36 = _createForOfIteratorHelper(t),
    _step36;
  try {
    for (_iterator36.s(); !(_step36 = _iterator36.n()).done;) {
      let r = _step36.value;
      let n = r[0];
      if (typeof n != "string") throw new TypeError("expected header name to be a string");
      let o = Wr(r[1]) ? r[1] : [r[1]],
        i = !1;
      var _iterator37 = _createForOfIteratorHelper(o),
        _step37;
      try {
        for (_iterator37.s(); !(_step37 = _iterator37.n()).done;) {
          let l = _step37.value;
          l !== void 0 && (e && !i && (i = !0, yield [n, null]), yield [n, l]);
        }
      } catch (err) {
        _iterator37.e(err);
      } finally {
        _iterator37.f();
      }
    }
  } catch (err) {
    _iterator36.e(err);
  } finally {
    _iterator36.f();
  }
}
var d = s => {
  let e = new Headers(),
    t = new Set();
  var _iterator38 = _createForOfIteratorHelper(s),
    _step38;
  try {
    for (_iterator38.s(); !(_step38 = _iterator38.n()).done;) {
      let r = _step38.value;
      let n = new Set();
      var _iterator39 = _createForOfIteratorHelper(uo(r)),
        _step39;
      try {
        for (_iterator39.s(); !(_step39 = _iterator39.n()).done;) {
          let _step39$value = _slicedToArray(_step39.value, 2),
            o = _step39$value[0],
            i = _step39$value[1];
          let l = o.toLowerCase();
          n.has(l) || (e.delete(o), n.add(l)), i === null ? (e.delete(o), t.add(l)) : (e.append(o, i), t.delete(l));
        }
      } catch (err) {
        _iterator39.e(err);
      } finally {
        _iterator39.f();
      }
    }
  } catch (err) {
    _iterator38.e(err);
  } finally {
    _iterator38.f();
  }
  return {
    [pn]: !0,
    values: e,
    nulls: t
  };
};
var mt = class extends u {
  create(e, t) {
    return this._client.post("/audio/speech", _objectSpread(_objectSpread({
      body: e
    }, t), {}, {
      headers: d([{
        Accept: "application/octet-stream"
      }, t === null || t === void 0 ? void 0 : t.headers]),
      __binaryResponse: !0
    }));
  }
};
var gt = class extends u {
  create(e, t) {
    var _e$stream2;
    return this._client.post("/audio/transcriptions", K(_objectSpread(_objectSpread({
      body: e
    }, t), {}, {
      stream: (_e$stream2 = e.stream) !== null && _e$stream2 !== void 0 ? _e$stream2 : !1,
      __metadata: {
        model: e.model
      }
    }), this._client));
  }
};
var _t = class extends u {
  create(e, t) {
    return this._client.post("/audio/translations", K(_objectSpread(_objectSpread({
      body: e
    }, t), {}, {
      __metadata: {
        model: e.model
      }
    }), this._client));
  }
};
var se = class extends u {
  constructor() {
    super(...arguments), this.transcriptions = new gt(this._client), this.translations = new _t(this._client), this.speech = new mt(this._client);
  }
};
se.Transcriptions = gt;
se.Translations = _t;
se.Speech = mt;
var Ne = class extends u {
  create(e, t) {
    return this._client.post("/batches", _objectSpread({
      body: e
    }, t));
  }
  retrieve(e, t) {
    return this._client.get(c`/batches/${e}`, t);
  }
  list(e = {}, t) {
    return this._client.getAPIList("/batches", I, _objectSpread({
      query: e
    }, t));
  }
  cancel(e, t) {
    return this._client.post(c`/batches/${e}/cancel`, t);
  }
};
var yt = class extends u {
  create(e, t) {
    return this._client.post("/assistants", _objectSpread(_objectSpread({
      body: e
    }, t), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, t === null || t === void 0 ? void 0 : t.headers])
    }));
  }
  retrieve(e, t) {
    return this._client.get(c`/assistants/${e}`, _objectSpread(_objectSpread({}, t), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, t === null || t === void 0 ? void 0 : t.headers])
    }));
  }
  update(e, t, r) {
    return this._client.post(c`/assistants/${e}`, _objectSpread(_objectSpread({
      body: t
    }, r), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
  list(e = {}, t) {
    return this._client.getAPIList("/assistants", I, _objectSpread(_objectSpread({
      query: e
    }, t), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, t === null || t === void 0 ? void 0 : t.headers])
    }));
  }
  delete(e, t) {
    return this._client.delete(c`/assistants/${e}`, _objectSpread(_objectSpread({}, t), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, t === null || t === void 0 ? void 0 : t.headers])
    }));
  }
};
var bt = class extends u {
  create(e, t) {
    return this._client.post("/realtime/sessions", _objectSpread(_objectSpread({
      body: e
    }, t), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, t === null || t === void 0 ? void 0 : t.headers])
    }));
  }
};
var wt = class extends u {
  create(e, t) {
    return this._client.post("/realtime/transcription_sessions", _objectSpread(_objectSpread({
      body: e
    }, t), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, t === null || t === void 0 ? void 0 : t.headers])
    }));
  }
};
var be = class extends u {
  constructor() {
    super(...arguments), this.sessions = new bt(this._client), this.transcriptionSessions = new wt(this._client);
  }
};
be.Sessions = bt;
be.TranscriptionSessions = wt;
var xt = class extends u {
  create(e, t) {
    return this._client.post("/chatkit/sessions", _objectSpread(_objectSpread({
      body: e
    }, t), {}, {
      headers: d([{
        "OpenAI-Beta": "chatkit_beta=v1"
      }, t === null || t === void 0 ? void 0 : t.headers])
    }));
  }
  cancel(e, t) {
    return this._client.post(c`/chatkit/sessions/${e}/cancel`, _objectSpread(_objectSpread({}, t), {}, {
      headers: d([{
        "OpenAI-Beta": "chatkit_beta=v1"
      }, t === null || t === void 0 ? void 0 : t.headers])
    }));
  }
};
var At = class extends u {
  retrieve(e, t) {
    return this._client.get(c`/chatkit/threads/${e}`, _objectSpread(_objectSpread({}, t), {}, {
      headers: d([{
        "OpenAI-Beta": "chatkit_beta=v1"
      }, t === null || t === void 0 ? void 0 : t.headers])
    }));
  }
  list(e = {}, t) {
    return this._client.getAPIList("/chatkit/threads", ie, _objectSpread(_objectSpread({
      query: e
    }, t), {}, {
      headers: d([{
        "OpenAI-Beta": "chatkit_beta=v1"
      }, t === null || t === void 0 ? void 0 : t.headers])
    }));
  }
  delete(e, t) {
    return this._client.delete(c`/chatkit/threads/${e}`, _objectSpread(_objectSpread({}, t), {}, {
      headers: d([{
        "OpenAI-Beta": "chatkit_beta=v1"
      }, t === null || t === void 0 ? void 0 : t.headers])
    }));
  }
  listItems(e, t = {}, r) {
    return this._client.getAPIList(c`/chatkit/threads/${e}/items`, ie, _objectSpread(_objectSpread({
      query: t
    }, r), {}, {
      headers: d([{
        "OpenAI-Beta": "chatkit_beta=v1"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
};
var we = class extends u {
  constructor() {
    super(...arguments), this.sessions = new xt(this._client), this.threads = new At(this._client);
  }
  uploadFile(e, t) {
    return this._client.post("/chatkit/files", zt(_objectSpread(_objectSpread({
      body: e
    }, t), {}, {
      headers: d([{
        "OpenAI-Beta": "chatkit_beta=v1"
      }, t === null || t === void 0 ? void 0 : t.headers])
    }), this._client));
  }
};
we.Sessions = xt;
we.Threads = At;
var It = class extends u {
  create(e, t, r) {
    return this._client.post(c`/threads/${e}/messages`, _objectSpread(_objectSpread({
      body: t
    }, r), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
  retrieve(e, t, r) {
    let n = t.thread_id;
    return this._client.get(c`/threads/${n}/messages/${e}`, _objectSpread(_objectSpread({}, r), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
  update(e, t, r) {
    let n = t.thread_id,
      o = _objectWithoutProperties(t, _excluded10);
    return this._client.post(c`/threads/${n}/messages/${e}`, _objectSpread(_objectSpread({
      body: o
    }, r), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
  list(e, t = {}, r) {
    return this._client.getAPIList(c`/threads/${e}/messages`, I, _objectSpread(_objectSpread({
      query: t
    }, r), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
  delete(e, t, r) {
    let n = t.thread_id;
    return this._client.delete(c`/threads/${n}/messages/${e}`, _objectSpread(_objectSpread({}, r), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
};
var Pt = class extends u {
  retrieve(e, t, r) {
    let n = t.thread_id,
      o = t.run_id,
      i = _objectWithoutProperties(t, _excluded11);
    return this._client.get(c`/threads/${n}/runs/${o}/steps/${e}`, _objectSpread(_objectSpread({
      query: i
    }, r), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
  list(e, t, r) {
    let n = t.thread_id,
      o = _objectWithoutProperties(t, _excluded12);
    return this._client.getAPIList(c`/threads/${n}/runs/${e}/steps`, I, _objectSpread(_objectSpread({
      query: o
    }, r), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
};
var mn = s => {
  if (typeof Buffer < "u") {
    let e = Buffer.from(s, "base64");
    return Array.from(new Float32Array(e.buffer, e.byteOffset, e.length / Float32Array.BYTES_PER_ELEMENT));
  } else {
    let e = atob(s),
      t = e.length,
      r = new Uint8Array(t);
    for (let n = 0; n < t; n++) r[n] = e.charCodeAt(n);
    return Array.from(new Float32Array(r.buffer));
  }
};
var xe = s => {
  var _globalThis$process$e, _globalThis$process$e2, _globalThis$Deno$env, _globalThis$Deno$env$;
  if (typeof globalThis.process < "u") return (_globalThis$process$e = (_globalThis$process$e2 = globalThis.process.env) === null || _globalThis$process$e2 === void 0 || (_globalThis$process$e2 = _globalThis$process$e2[s]) === null || _globalThis$process$e2 === void 0 ? void 0 : _globalThis$process$e2.trim()) !== null && _globalThis$process$e !== void 0 ? _globalThis$process$e : void 0;
  if (typeof globalThis.Deno < "u") return (_globalThis$Deno$env = globalThis.Deno.env) === null || _globalThis$Deno$env === void 0 || (_globalThis$Deno$env$ = _globalThis$Deno$env.get) === null || _globalThis$Deno$env$ === void 0 || (_globalThis$Deno$env$ = _globalThis$Deno$env$.call(_globalThis$Deno$env, s)) === null || _globalThis$Deno$env$ === void 0 ? void 0 : _globalThis$Deno$env$.trim();
};
var U,
  Le,
  xs,
  ne,
  Or,
  G,
  Be,
  St,
  Me,
  kr,
  V,
  vr,
  $r,
  cr,
  ar,
  lr,
  gn,
  _n,
  yn,
  bn,
  wn,
  xn,
  An,
  ue = class extends ge {
    constructor() {
      super(...arguments), U.add(this), xs.set(this, []), ne.set(this, {}), Or.set(this, {}), G.set(this, void 0), Be.set(this, void 0), St.set(this, void 0), Me.set(this, void 0), kr.set(this, void 0), V.set(this, void 0), vr.set(this, void 0), $r.set(this, void 0), cr.set(this, void 0);
    }
    [(xs = new WeakMap(), ne = new WeakMap(), Or = new WeakMap(), G = new WeakMap(), Be = new WeakMap(), St = new WeakMap(), Me = new WeakMap(), kr = new WeakMap(), V = new WeakMap(), vr = new WeakMap(), $r = new WeakMap(), cr = new WeakMap(), U = new WeakSet(), Symbol.asyncIterator)]() {
      var _this18 = this;
      let e = [],
        t = [],
        r = !1;
      return this.on("event", n => {
        let o = t.shift();
        o ? o.resolve(n) : e.push(n);
      }), this.on("end", () => {
        r = !0;
        for (var _i7 = 0, _t6 = t; _i7 < _t6.length; _i7++) {
          let n = _t6[_i7];
          n.resolve(void 0);
        }
        t.length = 0;
      }), this.on("abort", n => {
        r = !0;
        for (var _i8 = 0, _t7 = t; _i8 < _t7.length; _i8++) {
          let o = _t7[_i8];
          o.reject(n);
        }
        t.length = 0;
      }), this.on("error", n => {
        r = !0;
        for (var _i9 = 0, _t8 = t; _i9 < _t8.length; _i9++) {
          let o = _t8[_i9];
          o.reject(n);
        }
        t.length = 0;
      }), {
        next: function () {
          var _next3 = _asyncToGenerator(function* () {
            return e.length ? {
              value: e.shift(),
              done: !1
            } : r ? {
              value: void 0,
              done: !0
            } : new Promise((o, i) => t.push({
              resolve: o,
              reject: i
            })).then(o => o ? {
              value: o,
              done: !1
            } : {
              value: void 0,
              done: !0
            });
          });
          function next() {
            return _next3.apply(this, arguments);
          }
          return next;
        }(),
        return: function () {
          var _return3 = _asyncToGenerator(function* () {
            return _this18.abort(), {
              value: void 0,
              done: !0
            };
          });
          function _return() {
            return _return3.apply(this, arguments);
          }
          return _return;
        }()
      };
    }
    static fromReadableStream(e) {
      let t = new Le();
      return t._run(() => t._fromReadableStream(e)), t;
    }
    _fromReadableStream(e, t) {
      var _this19 = this;
      return _asyncToGenerator(function* () {
        var _n$controller$signal2;
        let r = t === null || t === void 0 ? void 0 : t.signal;
        r && (r.aborted && _this19.controller.abort(), r.addEventListener("abort", () => _this19.controller.abort())), _this19._connected();
        let n = te.fromReadableStream(e, _this19.controller);
        var _iteratorAbruptCompletion1 = false;
        var _didIteratorError1 = false;
        var _iteratorError1;
        try {
          for (var _iterator1 = _asyncIterator(n), _step1; _iteratorAbruptCompletion1 = !(_step1 = yield _iterator1.next()).done; _iteratorAbruptCompletion1 = false) {
            let o = _step1.value;
            {
              a(_this19, U, "m", ar).call(_this19, o);
            }
          }
        } catch (err) {
          _didIteratorError1 = true;
          _iteratorError1 = err;
        } finally {
          try {
            if (_iteratorAbruptCompletion1 && _iterator1.return != null) {
              yield _iterator1.return();
            }
          } finally {
            if (_didIteratorError1) {
              throw _iteratorError1;
            }
          }
        }
        if ((_n$controller$signal2 = n.controller.signal) !== null && _n$controller$signal2 !== void 0 && _n$controller$signal2.aborted) throw new $();
        return _this19._addRun(a(_this19, U, "m", lr).call(_this19));
      })();
    }
    toReadableStream() {
      return new te(this[Symbol.asyncIterator].bind(this), this.controller).toReadableStream();
    }
    static createToolAssistantStream(e, t, r, n) {
      let o = new Le();
      return o._run(() => o._runToolAssistantStream(e, t, r, _objectSpread(_objectSpread({}, n), {}, {
        headers: _objectSpread(_objectSpread({}, n === null || n === void 0 ? void 0 : n.headers), {}, {
          "X-Stainless-Helper-Method": "stream"
        })
      }))), o;
    }
    _createToolAssistantStream(e, t, r, n) {
      var _this20 = this;
      return _asyncToGenerator(function* () {
        var _l$controller$signal;
        let o = n === null || n === void 0 ? void 0 : n.signal;
        o && (o.aborted && _this20.controller.abort(), o.addEventListener("abort", () => _this20.controller.abort()));
        let i = _objectSpread(_objectSpread({}, r), {}, {
            stream: !0
          }),
          l = yield e.submitToolOutputs(t, i, _objectSpread(_objectSpread({}, n), {}, {
            signal: _this20.controller.signal
          }));
        _this20._connected();
        var _iteratorAbruptCompletion10 = false;
        var _didIteratorError10 = false;
        var _iteratorError10;
        try {
          for (var _iterator10 = _asyncIterator(l), _step10; _iteratorAbruptCompletion10 = !(_step10 = yield _iterator10.next()).done; _iteratorAbruptCompletion10 = false) {
            let h = _step10.value;
            {
              a(_this20, U, "m", ar).call(_this20, h);
            }
          }
        } catch (err) {
          _didIteratorError10 = true;
          _iteratorError10 = err;
        } finally {
          try {
            if (_iteratorAbruptCompletion10 && _iterator10.return != null) {
              yield _iterator10.return();
            }
          } finally {
            if (_didIteratorError10) {
              throw _iteratorError10;
            }
          }
        }
        if ((_l$controller$signal = l.controller.signal) !== null && _l$controller$signal !== void 0 && _l$controller$signal.aborted) throw new $();
        return _this20._addRun(a(_this20, U, "m", lr).call(_this20));
      })();
    }
    static createThreadAssistantStream(e, t, r) {
      let n = new Le();
      return n._run(() => n._threadAssistantStream(e, t, _objectSpread(_objectSpread({}, r), {}, {
        headers: _objectSpread(_objectSpread({}, r === null || r === void 0 ? void 0 : r.headers), {}, {
          "X-Stainless-Helper-Method": "stream"
        })
      }))), n;
    }
    static createAssistantStream(e, t, r, n) {
      let o = new Le();
      return o._run(() => o._runAssistantStream(e, t, r, _objectSpread(_objectSpread({}, n), {}, {
        headers: _objectSpread(_objectSpread({}, n === null || n === void 0 ? void 0 : n.headers), {}, {
          "X-Stainless-Helper-Method": "stream"
        })
      }))), o;
    }
    currentEvent() {
      return a(this, vr, "f");
    }
    currentRun() {
      return a(this, $r, "f");
    }
    currentMessageSnapshot() {
      return a(this, G, "f");
    }
    currentRunStepSnapshot() {
      return a(this, cr, "f");
    }
    finalRunSteps() {
      var _this21 = this;
      return _asyncToGenerator(function* () {
        return yield _this21.done(), Object.values(a(_this21, ne, "f"));
      })();
    }
    finalMessages() {
      var _this22 = this;
      return _asyncToGenerator(function* () {
        return yield _this22.done(), Object.values(a(_this22, Or, "f"));
      })();
    }
    finalRun() {
      var _this23 = this;
      return _asyncToGenerator(function* () {
        if (yield _this23.done(), !a(_this23, Be, "f")) throw Error("Final run was not received.");
        return a(_this23, Be, "f");
      })();
    }
    _createThreadAssistantStream(e, t, r) {
      var _this24 = this;
      return _asyncToGenerator(function* () {
        var _i$controller$signal;
        let n = r === null || r === void 0 ? void 0 : r.signal;
        n && (n.aborted && _this24.controller.abort(), n.addEventListener("abort", () => _this24.controller.abort()));
        let o = _objectSpread(_objectSpread({}, t), {}, {
            stream: !0
          }),
          i = yield e.createAndRun(o, _objectSpread(_objectSpread({}, r), {}, {
            signal: _this24.controller.signal
          }));
        _this24._connected();
        var _iteratorAbruptCompletion11 = false;
        var _didIteratorError11 = false;
        var _iteratorError11;
        try {
          for (var _iterator11 = _asyncIterator(i), _step11; _iteratorAbruptCompletion11 = !(_step11 = yield _iterator11.next()).done; _iteratorAbruptCompletion11 = false) {
            let l = _step11.value;
            {
              a(_this24, U, "m", ar).call(_this24, l);
            }
          }
        } catch (err) {
          _didIteratorError11 = true;
          _iteratorError11 = err;
        } finally {
          try {
            if (_iteratorAbruptCompletion11 && _iterator11.return != null) {
              yield _iterator11.return();
            }
          } finally {
            if (_didIteratorError11) {
              throw _iteratorError11;
            }
          }
        }
        if ((_i$controller$signal = i.controller.signal) !== null && _i$controller$signal !== void 0 && _i$controller$signal.aborted) throw new $();
        return _this24._addRun(a(_this24, U, "m", lr).call(_this24));
      })();
    }
    _createAssistantStream(e, t, r, n) {
      var _this25 = this;
      return _asyncToGenerator(function* () {
        var _l$controller$signal2;
        let o = n === null || n === void 0 ? void 0 : n.signal;
        o && (o.aborted && _this25.controller.abort(), o.addEventListener("abort", () => _this25.controller.abort()));
        let i = _objectSpread(_objectSpread({}, r), {}, {
            stream: !0
          }),
          l = yield e.create(t, i, _objectSpread(_objectSpread({}, n), {}, {
            signal: _this25.controller.signal
          }));
        _this25._connected();
        var _iteratorAbruptCompletion12 = false;
        var _didIteratorError12 = false;
        var _iteratorError12;
        try {
          for (var _iterator12 = _asyncIterator(l), _step12; _iteratorAbruptCompletion12 = !(_step12 = yield _iterator12.next()).done; _iteratorAbruptCompletion12 = false) {
            let h = _step12.value;
            {
              a(_this25, U, "m", ar).call(_this25, h);
            }
          }
        } catch (err) {
          _didIteratorError12 = true;
          _iteratorError12 = err;
        } finally {
          try {
            if (_iteratorAbruptCompletion12 && _iterator12.return != null) {
              yield _iterator12.return();
            }
          } finally {
            if (_didIteratorError12) {
              throw _iteratorError12;
            }
          }
        }
        if ((_l$controller$signal2 = l.controller.signal) !== null && _l$controller$signal2 !== void 0 && _l$controller$signal2.aborted) throw new $();
        return _this25._addRun(a(_this25, U, "m", lr).call(_this25));
      })();
    }
    static accumulateDelta(e, t) {
      for (var _i0 = 0, _Object$entries = Object.entries(t); _i0 < _Object$entries.length; _i0++) {
        let _Object$entries$_i = _slicedToArray(_Object$entries[_i0], 2),
          r = _Object$entries$_i[0],
          n = _Object$entries$_i[1];
        if (!e.hasOwnProperty(r)) {
          e[r] = n;
          continue;
        }
        let o = e[r];
        if (o == null) {
          e[r] = n;
          continue;
        }
        if (r === "index" || r === "type") {
          e[r] = n;
          continue;
        }
        if (typeof o == "string" && typeof n == "string") o += n;else if (typeof o == "number" && typeof n == "number") o += n;else if (Ht(o) && Ht(n)) o = this.accumulateDelta(o, n);else if (Array.isArray(o) && Array.isArray(n)) {
          if (o.every(i => typeof i == "string" || typeof i == "number")) {
            o.push(...n);
            continue;
          }
          var _iterator40 = _createForOfIteratorHelper(n),
            _step40;
          try {
            for (_iterator40.s(); !(_step40 = _iterator40.n()).done;) {
              let i = _step40.value;
              if (!Ht(i)) throw new Error(`Expected array delta entry to be an object but got: ${i}`);
              let l = i.index;
              if (l == null) throw console.error(i), new Error("Expected array delta entry to have an `index` property");
              if (typeof l != "number") throw new Error(`Expected array delta entry \`index\` property to be a number but got ${l}`);
              let h = o[l];
              h == null ? o.push(i) : o[l] = this.accumulateDelta(h, i);
            }
          } catch (err) {
            _iterator40.e(err);
          } finally {
            _iterator40.f();
          }
          continue;
        } else throw Error(`Unhandled record type: ${r}, deltaValue: ${n}, accValue: ${o}`);
        e[r] = o;
      }
      return e;
    }
    _addRun(e) {
      return e;
    }
    _threadAssistantStream(e, t, r) {
      var _this26 = this;
      return _asyncToGenerator(function* () {
        return yield _this26._createThreadAssistantStream(t, e, r);
      })();
    }
    _runAssistantStream(e, t, r, n) {
      var _this27 = this;
      return _asyncToGenerator(function* () {
        return yield _this27._createAssistantStream(t, e, r, n);
      })();
    }
    _runToolAssistantStream(e, t, r, n) {
      var _this28 = this;
      return _asyncToGenerator(function* () {
        return yield _this28._createToolAssistantStream(t, e, r, n);
      })();
    }
  };
Le = ue, ar = function ar(e) {
  if (!this.ended) switch (_(this, vr, e, "f"), a(this, U, "m", yn).call(this, e), e.event) {
    case "thread.created":
      break;
    case "thread.run.created":
    case "thread.run.queued":
    case "thread.run.in_progress":
    case "thread.run.requires_action":
    case "thread.run.completed":
    case "thread.run.incomplete":
    case "thread.run.failed":
    case "thread.run.cancelling":
    case "thread.run.cancelled":
    case "thread.run.expired":
      a(this, U, "m", An).call(this, e);
      break;
    case "thread.run.step.created":
    case "thread.run.step.in_progress":
    case "thread.run.step.delta":
    case "thread.run.step.completed":
    case "thread.run.step.failed":
    case "thread.run.step.cancelled":
    case "thread.run.step.expired":
      a(this, U, "m", _n).call(this, e);
      break;
    case "thread.message.created":
    case "thread.message.in_progress":
    case "thread.message.delta":
    case "thread.message.completed":
    case "thread.message.incomplete":
      a(this, U, "m", gn).call(this, e);
      break;
    case "error":
      throw new Error("Encountered an error event in event processing - errors should be processed earlier");
    default:
  }
}, lr = function lr() {
  if (this.ended) throw new g("stream has ended, this shouldn't happen");
  if (!a(this, Be, "f")) throw Error("Final run has not been received");
  return a(this, Be, "f");
}, gn = function gn(e) {
  let _a$call = a(this, U, "m", wn).call(this, e, a(this, G, "f")),
    _a$call2 = _slicedToArray(_a$call, 2),
    t = _a$call2[0],
    r = _a$call2[1];
  _(this, G, t, "f"), a(this, Or, "f")[t.id] = t;
  var _iterator41 = _createForOfIteratorHelper(r),
    _step41;
  try {
    for (_iterator41.s(); !(_step41 = _iterator41.n()).done;) {
      let n = _step41.value;
      let o = t.content[n.index];
      (o === null || o === void 0 ? void 0 : o.type) == "text" && this._emit("textCreated", o.text);
    }
  } catch (err) {
    _iterator41.e(err);
  } finally {
    _iterator41.f();
  }
  switch (e.event) {
    case "thread.message.created":
      this._emit("messageCreated", e.data);
      break;
    case "thread.message.in_progress":
      break;
    case "thread.message.delta":
      if (this._emit("messageDelta", e.data.delta, t), e.data.delta.content) {
        var _iterator42 = _createForOfIteratorHelper(e.data.delta.content),
          _step42;
        try {
          for (_iterator42.s(); !(_step42 = _iterator42.n()).done;) {
            let n = _step42.value;
            if (n.type == "text" && n.text) {
              let o = n.text,
                i = t.content[n.index];
              if (i && i.type == "text") this._emit("textDelta", o, i.text);else throw Error("The snapshot associated with this text delta is not text or missing");
            }
            if (n.index != a(this, St, "f")) {
              if (a(this, Me, "f")) switch (a(this, Me, "f").type) {
                case "text":
                  this._emit("textDone", a(this, Me, "f").text, a(this, G, "f"));
                  break;
                case "image_file":
                  this._emit("imageFileDone", a(this, Me, "f").image_file, a(this, G, "f"));
                  break;
              }
              _(this, St, n.index, "f");
            }
            _(this, Me, t.content[n.index], "f");
          }
        } catch (err) {
          _iterator42.e(err);
        } finally {
          _iterator42.f();
        }
      }
      break;
    case "thread.message.completed":
    case "thread.message.incomplete":
      if (a(this, St, "f") !== void 0) {
        let n = e.data.content[a(this, St, "f")];
        if (n) switch (n.type) {
          case "image_file":
            this._emit("imageFileDone", n.image_file, a(this, G, "f"));
            break;
          case "text":
            this._emit("textDone", n.text, a(this, G, "f"));
            break;
        }
      }
      a(this, G, "f") && this._emit("messageDone", e.data), _(this, G, void 0, "f");
  }
}, _n = function _n(e) {
  let t = a(this, U, "m", bn).call(this, e);
  switch (_(this, cr, t, "f"), e.event) {
    case "thread.run.step.created":
      this._emit("runStepCreated", e.data);
      break;
    case "thread.run.step.delta":
      let r = e.data.delta;
      if (r.step_details && r.step_details.type == "tool_calls" && r.step_details.tool_calls && t.step_details.type == "tool_calls") {
        var _iterator43 = _createForOfIteratorHelper(r.step_details.tool_calls),
          _step43;
        try {
          for (_iterator43.s(); !(_step43 = _iterator43.n()).done;) {
            let o = _step43.value;
            o.index == a(this, kr, "f") ? this._emit("toolCallDelta", o, t.step_details.tool_calls[o.index]) : (a(this, V, "f") && this._emit("toolCallDone", a(this, V, "f")), _(this, kr, o.index, "f"), _(this, V, t.step_details.tool_calls[o.index], "f"), a(this, V, "f") && this._emit("toolCallCreated", a(this, V, "f")));
          }
        } catch (err) {
          _iterator43.e(err);
        } finally {
          _iterator43.f();
        }
      }
      this._emit("runStepDelta", e.data.delta, t);
      break;
    case "thread.run.step.completed":
    case "thread.run.step.failed":
    case "thread.run.step.cancelled":
    case "thread.run.step.expired":
      _(this, cr, void 0, "f"), e.data.step_details.type == "tool_calls" && a(this, V, "f") && (this._emit("toolCallDone", a(this, V, "f")), _(this, V, void 0, "f")), this._emit("runStepDone", e.data, t);
      break;
    case "thread.run.step.in_progress":
      break;
  }
}, yn = function yn(e) {
  a(this, xs, "f").push(e), this._emit("event", e);
}, bn = function bn(e) {
  switch (e.event) {
    case "thread.run.step.created":
      return a(this, ne, "f")[e.data.id] = e.data, e.data;
    case "thread.run.step.delta":
      let t = a(this, ne, "f")[e.data.id];
      if (!t) throw Error("Received a RunStepDelta before creation of a snapshot");
      let r = e.data;
      if (r.delta) {
        let n = Le.accumulateDelta(t, r.delta);
        a(this, ne, "f")[e.data.id] = n;
      }
      return a(this, ne, "f")[e.data.id];
    case "thread.run.step.completed":
    case "thread.run.step.failed":
    case "thread.run.step.cancelled":
    case "thread.run.step.expired":
    case "thread.run.step.in_progress":
      a(this, ne, "f")[e.data.id] = e.data;
      break;
  }
  if (a(this, ne, "f")[e.data.id]) return a(this, ne, "f")[e.data.id];
  throw new Error("No snapshot available");
}, wn = function wn(e, t) {
  let r = [];
  switch (e.event) {
    case "thread.message.created":
      return [e.data, r];
    case "thread.message.delta":
      if (!t) throw Error("Received a delta with no existing snapshot (there should be one from message creation)");
      let n = e.data;
      if (n.delta.content) {
        var _iterator44 = _createForOfIteratorHelper(n.delta.content),
          _step44;
        try {
          for (_iterator44.s(); !(_step44 = _iterator44.n()).done;) {
            let o = _step44.value;
            if (o.index in t.content) {
              let i = t.content[o.index];
              t.content[o.index] = a(this, U, "m", xn).call(this, o, i);
            } else t.content[o.index] = o, r.push(o);
          }
        } catch (err) {
          _iterator44.e(err);
        } finally {
          _iterator44.f();
        }
      }
      return [t, r];
    case "thread.message.in_progress":
    case "thread.message.completed":
    case "thread.message.incomplete":
      if (t) return [t, r];
      throw Error("Received thread message event with no existing snapshot");
  }
  throw Error("Tried to accumulate a non-message event");
}, xn = function xn(e, t) {
  return Le.accumulateDelta(t, e);
}, An = function An(e) {
  switch (_(this, $r, e.data, "f"), e.event) {
    case "thread.run.created":
      break;
    case "thread.run.queued":
      break;
    case "thread.run.in_progress":
      break;
    case "thread.run.requires_action":
    case "thread.run.cancelled":
    case "thread.run.failed":
    case "thread.run.completed":
    case "thread.run.expired":
    case "thread.run.incomplete":
      _(this, Be, e.data, "f"), a(this, V, "f") && (this._emit("toolCallDone", a(this, V, "f")), _(this, V, void 0, "f"));
      break;
    case "thread.run.cancelling":
      break;
  }
};
var je = class extends u {
  constructor() {
    super(...arguments), this.steps = new Pt(this._client);
  }
  create(e, t, r) {
    var _t$stream;
    let n = t.include,
      o = _objectWithoutProperties(t, _excluded13);
    return this._client.post(c`/threads/${e}/runs`, _objectSpread(_objectSpread({
      query: {
        include: n
      },
      body: o
    }, r), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, r === null || r === void 0 ? void 0 : r.headers]),
      stream: (_t$stream = t.stream) !== null && _t$stream !== void 0 ? _t$stream : !1
    }));
  }
  retrieve(e, t, r) {
    let n = t.thread_id;
    return this._client.get(c`/threads/${n}/runs/${e}`, _objectSpread(_objectSpread({}, r), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
  update(e, t, r) {
    let n = t.thread_id,
      o = _objectWithoutProperties(t, _excluded14);
    return this._client.post(c`/threads/${n}/runs/${e}`, _objectSpread(_objectSpread({
      body: o
    }, r), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
  list(e, t = {}, r) {
    return this._client.getAPIList(c`/threads/${e}/runs`, I, _objectSpread(_objectSpread({
      query: t
    }, r), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
  cancel(e, t, r) {
    let n = t.thread_id;
    return this._client.post(c`/threads/${n}/runs/${e}/cancel`, _objectSpread(_objectSpread({}, r), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
  createAndPoll(e, t, r) {
    var _this29 = this;
    return _asyncToGenerator(function* () {
      let n = yield _this29.create(e, t, r);
      return yield _this29.poll(n.id, {
        thread_id: e
      }, r);
    })();
  }
  createAndStream(e, t, r) {
    return ue.createAssistantStream(e, this._client.beta.threads.runs, t, r);
  }
  poll(e, t, r) {
    var _this30 = this;
    return _asyncToGenerator(function* () {
      var _r$pollIntervalMs$toS, _r$pollIntervalMs;
      let n = d([r === null || r === void 0 ? void 0 : r.headers, {
        "X-Stainless-Poll-Helper": "true",
        "X-Stainless-Custom-Poll-Interval": (_r$pollIntervalMs$toS = r === null || r === void 0 || (_r$pollIntervalMs = r.pollIntervalMs) === null || _r$pollIntervalMs === void 0 ? void 0 : _r$pollIntervalMs.toString()) !== null && _r$pollIntervalMs$toS !== void 0 ? _r$pollIntervalMs$toS : void 0
      }]);
      for (;;) {
        let _yield$_this30$retrie = yield _this30.retrieve(e, t, _objectSpread(_objectSpread({}, r), {}, {
            headers: _objectSpread(_objectSpread({}, r === null || r === void 0 ? void 0 : r.headers), n)
          })).withResponse(),
          o = _yield$_this30$retrie.data,
          i = _yield$_this30$retrie.response;
        switch (o.status) {
          case "queued":
          case "in_progress":
          case "cancelling":
            let l = 5e3;
            if (r !== null && r !== void 0 && r.pollIntervalMs) l = r.pollIntervalMs;else {
              let h = i.headers.get("openai-poll-after-ms");
              if (h) {
                let m = parseInt(h);
                isNaN(m) || (l = m);
              }
            }
            yield Z(l);
            break;
          case "requires_action":
          case "incomplete":
          case "cancelled":
          case "completed":
          case "failed":
          case "expired":
            return o;
        }
      }
    })();
  }
  stream(e, t, r) {
    return ue.createAssistantStream(e, this._client.beta.threads.runs, t, r);
  }
  submitToolOutputs(e, t, r) {
    var _t$stream2;
    let n = t.thread_id,
      o = _objectWithoutProperties(t, _excluded15);
    return this._client.post(c`/threads/${n}/runs/${e}/submit_tool_outputs`, _objectSpread(_objectSpread({
      body: o
    }, r), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, r === null || r === void 0 ? void 0 : r.headers]),
      stream: (_t$stream2 = t.stream) !== null && _t$stream2 !== void 0 ? _t$stream2 : !1
    }));
  }
  submitToolOutputsAndPoll(e, t, r) {
    var _this31 = this;
    return _asyncToGenerator(function* () {
      let n = yield _this31.submitToolOutputs(e, t, r);
      return yield _this31.poll(n.id, t, r);
    })();
  }
  submitToolOutputsStream(e, t, r) {
    return ue.createToolAssistantStream(e, this._client.beta.threads.runs, t, r);
  }
};
je.Steps = Pt;
var Ae = class extends u {
  constructor() {
    super(...arguments), this.runs = new je(this._client), this.messages = new It(this._client);
  }
  create(e = {}, t) {
    return this._client.post("/threads", _objectSpread(_objectSpread({
      body: e
    }, t), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, t === null || t === void 0 ? void 0 : t.headers])
    }));
  }
  retrieve(e, t) {
    return this._client.get(c`/threads/${e}`, _objectSpread(_objectSpread({}, t), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, t === null || t === void 0 ? void 0 : t.headers])
    }));
  }
  update(e, t, r) {
    return this._client.post(c`/threads/${e}`, _objectSpread(_objectSpread({
      body: t
    }, r), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
  delete(e, t) {
    return this._client.delete(c`/threads/${e}`, _objectSpread(_objectSpread({}, t), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, t === null || t === void 0 ? void 0 : t.headers])
    }));
  }
  createAndRun(e, t) {
    var _e$stream3;
    return this._client.post("/threads/runs", _objectSpread(_objectSpread({
      body: e
    }, t), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, t === null || t === void 0 ? void 0 : t.headers]),
      stream: (_e$stream3 = e.stream) !== null && _e$stream3 !== void 0 ? _e$stream3 : !1
    }));
  }
  createAndRunPoll(e, t) {
    var _this32 = this;
    return _asyncToGenerator(function* () {
      let r = yield _this32.createAndRun(e, t);
      return yield _this32.runs.poll(r.id, {
        thread_id: r.thread_id
      }, t);
    })();
  }
  createAndRunStream(e, t) {
    return ue.createThreadAssistantStream(e, this._client.beta.threads, t);
  }
};
Ae.Runs = je;
Ae.Messages = It;
var Q = class extends u {
  constructor() {
    super(...arguments), this.realtime = new be(this._client), this.chatkit = new we(this._client), this.assistants = new yt(this._client), this.threads = new Ae(this._client);
  }
};
Q.Realtime = be;
Q.ChatKit = we;
Q.Assistants = yt;
Q.Threads = Ae;
var Ue = class extends u {
  create(e, t) {
    var _e$stream4;
    return this._client.post("/completions", _objectSpread(_objectSpread({
      body: e
    }, t), {}, {
      stream: (_e$stream4 = e.stream) !== null && _e$stream4 !== void 0 ? _e$stream4 : !1
    }));
  }
};
var Rt = class extends u {
  retrieve(e, t, r) {
    let n = t.container_id;
    return this._client.get(c`/containers/${n}/files/${e}/content`, _objectSpread(_objectSpread({}, r), {}, {
      headers: d([{
        Accept: "application/binary"
      }, r === null || r === void 0 ? void 0 : r.headers]),
      __binaryResponse: !0
    }));
  }
};
var De = class extends u {
  constructor() {
    super(...arguments), this.content = new Rt(this._client);
  }
  create(e, t, r) {
    return this._client.post(c`/containers/${e}/files`, K(_objectSpread({
      body: t
    }, r), this._client));
  }
  retrieve(e, t, r) {
    let n = t.container_id;
    return this._client.get(c`/containers/${n}/files/${e}`, r);
  }
  list(e, t = {}, r) {
    return this._client.getAPIList(c`/containers/${e}/files`, I, _objectSpread({
      query: t
    }, r));
  }
  delete(e, t, r) {
    let n = t.container_id;
    return this._client.delete(c`/containers/${n}/files/${e}`, _objectSpread(_objectSpread({}, r), {}, {
      headers: d([{
        Accept: "*/*"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
};
De.Content = Rt;
var Ie = class extends u {
  constructor() {
    super(...arguments), this.files = new De(this._client);
  }
  create(e, t) {
    return this._client.post("/containers", _objectSpread({
      body: e
    }, t));
  }
  retrieve(e, t) {
    return this._client.get(c`/containers/${e}`, t);
  }
  list(e = {}, t) {
    return this._client.getAPIList("/containers", I, _objectSpread({
      query: e
    }, t));
  }
  delete(e, t) {
    return this._client.delete(c`/containers/${e}`, _objectSpread(_objectSpread({}, t), {}, {
      headers: d([{
        Accept: "*/*"
      }, t === null || t === void 0 ? void 0 : t.headers])
    }));
  }
};
Ie.Files = De;
var Ct = class extends u {
  create(e, t, r) {
    let n = t.include,
      o = _objectWithoutProperties(t, _excluded16);
    return this._client.post(c`/conversations/${e}/items`, _objectSpread({
      query: {
        include: n
      },
      body: o
    }, r));
  }
  retrieve(e, t, r) {
    let n = t.conversation_id,
      o = _objectWithoutProperties(t, _excluded17);
    return this._client.get(c`/conversations/${n}/items/${e}`, _objectSpread({
      query: o
    }, r));
  }
  list(e, t = {}, r) {
    return this._client.getAPIList(c`/conversations/${e}/items`, ie, _objectSpread({
      query: t
    }, r));
  }
  delete(e, t, r) {
    let n = t.conversation_id;
    return this._client.delete(c`/conversations/${n}/items/${e}`, r);
  }
};
var Pe = class extends u {
  constructor() {
    super(...arguments), this.items = new Ct(this._client);
  }
  create(e = {}, t) {
    return this._client.post("/conversations", _objectSpread({
      body: e
    }, t));
  }
  retrieve(e, t) {
    return this._client.get(c`/conversations/${e}`, t);
  }
  update(e, t, r) {
    return this._client.post(c`/conversations/${e}`, _objectSpread({
      body: t
    }, r));
  }
  delete(e, t) {
    return this._client.delete(c`/conversations/${e}`, t);
  }
};
Pe.Items = Ct;
var We = class extends u {
  create(e, t) {
    let r = !!e.encoding_format,
      n = r ? e.encoding_format : "base64";
    r && E(this._client).debug("embeddings/user defined encoding_format:", e.encoding_format);
    let o = this._client.post("/embeddings", _objectSpread({
      body: _objectSpread(_objectSpread({}, e), {}, {
        encoding_format: n
      })
    }, t));
    return r ? o : (E(this._client).debug("embeddings/decoding base64 embeddings from base64"), o._thenUnwrap(i => (i && i.data && i.data.forEach(l => {
      let h = l.embedding;
      l.embedding = mn(h);
    }), i)));
  }
};
var Et = class extends u {
  retrieve(e, t, r) {
    let n = t.eval_id,
      o = t.run_id;
    return this._client.get(c`/evals/${n}/runs/${o}/output_items/${e}`, r);
  }
  list(e, t, r) {
    let n = t.eval_id,
      o = _objectWithoutProperties(t, _excluded18);
    return this._client.getAPIList(c`/evals/${n}/runs/${e}/output_items`, I, _objectSpread({
      query: o
    }, r));
  }
};
var qe = class extends u {
  constructor() {
    super(...arguments), this.outputItems = new Et(this._client);
  }
  create(e, t, r) {
    return this._client.post(c`/evals/${e}/runs`, _objectSpread({
      body: t
    }, r));
  }
  retrieve(e, t, r) {
    let n = t.eval_id;
    return this._client.get(c`/evals/${n}/runs/${e}`, r);
  }
  list(e, t = {}, r) {
    return this._client.getAPIList(c`/evals/${e}/runs`, I, _objectSpread({
      query: t
    }, r));
  }
  delete(e, t, r) {
    let n = t.eval_id;
    return this._client.delete(c`/evals/${n}/runs/${e}`, r);
  }
  cancel(e, t, r) {
    let n = t.eval_id;
    return this._client.post(c`/evals/${n}/runs/${e}`, r);
  }
};
qe.OutputItems = Et;
var Se = class extends u {
  constructor() {
    super(...arguments), this.runs = new qe(this._client);
  }
  create(e, t) {
    return this._client.post("/evals", _objectSpread({
      body: e
    }, t));
  }
  retrieve(e, t) {
    return this._client.get(c`/evals/${e}`, t);
  }
  update(e, t, r) {
    return this._client.post(c`/evals/${e}`, _objectSpread({
      body: t
    }, r));
  }
  list(e = {}, t) {
    return this._client.getAPIList("/evals", I, _objectSpread({
      query: e
    }, t));
  }
  delete(e, t) {
    return this._client.delete(c`/evals/${e}`, t);
  }
};
Se.Runs = qe;
var He = class extends u {
  create(e, t) {
    return this._client.post("/files", K(_objectSpread({
      body: e
    }, t), this._client));
  }
  retrieve(e, t) {
    return this._client.get(c`/files/${e}`, t);
  }
  list(e = {}, t) {
    return this._client.getAPIList("/files", I, _objectSpread({
      query: e
    }, t));
  }
  delete(e, t) {
    return this._client.delete(c`/files/${e}`, t);
  }
  content(e, t) {
    return this._client.get(c`/files/${e}/content`, _objectSpread(_objectSpread({}, t), {}, {
      headers: d([{
        Accept: "application/binary"
      }, t === null || t === void 0 ? void 0 : t.headers]),
      __binaryResponse: !0
    }));
  }
  waitForProcessing(_x22) {
    var _this33 = this;
    return _asyncToGenerator(function* (e, {
      pollInterval: t = 5e3,
      maxWait: r = 1800 * 1e3
    } = {}) {
      let n = new Set(["processed", "error", "deleted"]),
        o = Date.now(),
        i = yield _this33.retrieve(e);
      for (; !i.status || !n.has(i.status);) if (yield Z(t), i = yield _this33.retrieve(e), Date.now() - o > r) throw new pe({
        message: `Giving up on waiting for file ${e} to finish processing after ${r} milliseconds.`
      });
      return i;
    }).apply(this, arguments);
  }
};
var Ot = class extends u {};
var vt = class extends u {
  run(e, t) {
    return this._client.post("/fine_tuning/alpha/graders/run", _objectSpread({
      body: e
    }, t));
  }
  validate(e, t) {
    return this._client.post("/fine_tuning/alpha/graders/validate", _objectSpread({
      body: e
    }, t));
  }
};
var Je = class extends u {
  constructor() {
    super(...arguments), this.graders = new vt(this._client);
  }
};
Je.Graders = vt;
var $t = class extends u {
  create(e, t, r) {
    return this._client.getAPIList(c`/fine_tuning/checkpoints/${e}/permissions`, re, _objectSpread({
      body: t,
      method: "post"
    }, r));
  }
  retrieve(e, t = {}, r) {
    return this._client.get(c`/fine_tuning/checkpoints/${e}/permissions`, _objectSpread({
      query: t
    }, r));
  }
  delete(e, t, r) {
    let n = t.fine_tuned_model_checkpoint;
    return this._client.delete(c`/fine_tuning/checkpoints/${n}/permissions/${e}`, r);
  }
};
var Xe = class extends u {
  constructor() {
    super(...arguments), this.permissions = new $t(this._client);
  }
};
Xe.Permissions = $t;
var kt = class extends u {
  list(e, t = {}, r) {
    return this._client.getAPIList(c`/fine_tuning/jobs/${e}/checkpoints`, I, _objectSpread({
      query: t
    }, r));
  }
};
var Ke = class extends u {
  constructor() {
    super(...arguments), this.checkpoints = new kt(this._client);
  }
  create(e, t) {
    return this._client.post("/fine_tuning/jobs", _objectSpread({
      body: e
    }, t));
  }
  retrieve(e, t) {
    return this._client.get(c`/fine_tuning/jobs/${e}`, t);
  }
  list(e = {}, t) {
    return this._client.getAPIList("/fine_tuning/jobs", I, _objectSpread({
      query: e
    }, t));
  }
  cancel(e, t) {
    return this._client.post(c`/fine_tuning/jobs/${e}/cancel`, t);
  }
  listEvents(e, t = {}, r) {
    return this._client.getAPIList(c`/fine_tuning/jobs/${e}/events`, I, _objectSpread({
      query: t
    }, r));
  }
  pause(e, t) {
    return this._client.post(c`/fine_tuning/jobs/${e}/pause`, t);
  }
  resume(e, t) {
    return this._client.post(c`/fine_tuning/jobs/${e}/resume`, t);
  }
};
Ke.Checkpoints = kt;
var z = class extends u {
  constructor() {
    super(...arguments), this.methods = new Ot(this._client), this.jobs = new Ke(this._client), this.checkpoints = new Xe(this._client), this.alpha = new Je(this._client);
  }
};
z.Methods = Ot;
z.Jobs = Ke;
z.Checkpoints = Xe;
z.Alpha = Je;
var Tt = class extends u {};
var Re = class extends u {
  constructor() {
    super(...arguments), this.graderModels = new Tt(this._client);
  }
};
Re.GraderModels = Tt;
var Ve = class extends u {
  createVariation(e, t) {
    return this._client.post("/images/variations", K(_objectSpread({
      body: e
    }, t), this._client));
  }
  edit(e, t) {
    var _e$stream5;
    return this._client.post("/images/edits", K(_objectSpread(_objectSpread({
      body: e
    }, t), {}, {
      stream: (_e$stream5 = e.stream) !== null && _e$stream5 !== void 0 ? _e$stream5 : !1
    }), this._client));
  }
  generate(e, t) {
    var _e$stream6;
    return this._client.post("/images/generations", _objectSpread(_objectSpread({
      body: e
    }, t), {}, {
      stream: (_e$stream6 = e.stream) !== null && _e$stream6 !== void 0 ? _e$stream6 : !1
    }));
  }
};
var Ge = class extends u {
  retrieve(e, t) {
    return this._client.get(c`/models/${e}`, t);
  }
  list(e) {
    return this._client.getAPIList("/models", re, e);
  }
  delete(e, t) {
    return this._client.delete(c`/models/${e}`, t);
  }
};
var Qe = class extends u {
  create(e, t) {
    return this._client.post("/moderations", _objectSpread({
      body: e
    }, t));
  }
};
var Ft = class extends u {
  accept(e, t, r) {
    return this._client.post(c`/realtime/calls/${e}/accept`, _objectSpread(_objectSpread({
      body: t
    }, r), {}, {
      headers: d([{
        Accept: "*/*"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
  hangup(e, t) {
    return this._client.post(c`/realtime/calls/${e}/hangup`, _objectSpread(_objectSpread({}, t), {}, {
      headers: d([{
        Accept: "*/*"
      }, t === null || t === void 0 ? void 0 : t.headers])
    }));
  }
  refer(e, t, r) {
    return this._client.post(c`/realtime/calls/${e}/refer`, _objectSpread(_objectSpread({
      body: t
    }, r), {}, {
      headers: d([{
        Accept: "*/*"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
  reject(e, t = {}, r) {
    return this._client.post(c`/realtime/calls/${e}/reject`, _objectSpread(_objectSpread({
      body: t
    }, r), {}, {
      headers: d([{
        Accept: "*/*"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
};
var Nt = class extends u {
  create(e, t) {
    return this._client.post("/realtime/client_secrets", _objectSpread({
      body: e
    }, t));
  }
};
var fe = class extends u {
  constructor() {
    super(...arguments), this.clientSecrets = new Nt(this._client), this.calls = new Ft(this._client);
  }
};
fe.ClientSecrets = Nt;
fe.Calls = Ft;
function In(s, e) {
  return !e || !Wo(e) ? _objectSpread(_objectSpread({}, s), {}, {
    output_parsed: null,
    output: s.output.map(t => t.type === "function_call" ? _objectSpread(_objectSpread({}, t), {}, {
      parsed_arguments: null
    }) : t.type === "message" ? _objectSpread(_objectSpread({}, t), {}, {
      content: t.content.map(r => _objectSpread(_objectSpread({}, r), {}, {
        parsed: null
      }))
    }) : t)
  }) : As(s, e);
}
function As(s, e) {
  let t = s.output.map(n => {
      if (n.type === "function_call") return _objectSpread(_objectSpread({}, n), {}, {
        parsed_arguments: Jo(e, n)
      });
      if (n.type === "message") {
        let o = n.content.map(i => i.type === "output_text" ? _objectSpread(_objectSpread({}, i), {}, {
          parsed: Do(e, i.text)
        }) : i);
        return _objectSpread(_objectSpread({}, n), {}, {
          content: o
        });
      }
      return n;
    }),
    r = Object.assign({}, s, {
      output: t
    });
  return Object.getOwnPropertyDescriptor(s, "output_text") || Tr(r), Object.defineProperty(r, "output_parsed", {
    enumerable: !0,
    get() {
      var _iterator45 = _createForOfIteratorHelper(r.output),
        _step45;
      try {
        for (_iterator45.s(); !(_step45 = _iterator45.n()).done;) {
          let n = _step45.value;
          if (n.type === "message") {
            var _iterator46 = _createForOfIteratorHelper(n.content),
              _step46;
            try {
              for (_iterator46.s(); !(_step46 = _iterator46.n()).done;) {
                let o = _step46.value;
                if (o.type === "output_text" && o.parsed !== null) return o.parsed;
              }
            } catch (err) {
              _iterator46.e(err);
            } finally {
              _iterator46.f();
            }
          }
        }
      } catch (err) {
        _iterator45.e(err);
      } finally {
        _iterator45.f();
      }
      return null;
    }
  }), r;
}
function Do(s, e) {
  var _s$text, _s$text2, _s$text3;
  return ((_s$text = s.text) === null || _s$text === void 0 || (_s$text = _s$text.format) === null || _s$text === void 0 ? void 0 : _s$text.type) !== "json_schema" ? null : "$parseRaw" in ((_s$text2 = s.text) === null || _s$text2 === void 0 ? void 0 : _s$text2.format) ? ((_s$text3 = s.text) === null || _s$text3 === void 0 ? void 0 : _s$text3.format).$parseRaw(e) : JSON.parse(e);
}
function Wo(s) {
  var _s$text4;
  return !!Zt((_s$text4 = s.text) === null || _s$text4 === void 0 ? void 0 : _s$text4.format);
}
function qo(s) {
  return (s === null || s === void 0 ? void 0 : s.$brand) === "auto-parseable-tool";
}
function Ho(s, e) {
  return s.find(t => t.type === "function" && t.name === e);
}
function Jo(s, e) {
  var _s$tools4;
  let t = Ho((_s$tools4 = s.tools) !== null && _s$tools4 !== void 0 ? _s$tools4 : [], e.name);
  return _objectSpread(_objectSpread(_objectSpread({}, e), e), {}, {
    parsed_arguments: qo(t) ? t.$parseRaw(e.arguments) : t !== null && t !== void 0 && t.strict ? JSON.parse(e.arguments) : null
  });
}
function Tr(s) {
  let e = [];
  var _iterator47 = _createForOfIteratorHelper(s.output),
    _step47;
  try {
    for (_iterator47.s(); !(_step47 = _iterator47.n()).done;) {
      let t = _step47.value;
      if (t.type === "message") {
        var _iterator48 = _createForOfIteratorHelper(t.content),
          _step48;
        try {
          for (_iterator48.s(); !(_step48 = _iterator48.n()).done;) {
            let r = _step48.value;
            r.type === "output_text" && e.push(r.text);
          }
        } catch (err) {
          _iterator48.e(err);
        } finally {
          _iterator48.f();
        }
      }
    }
  } catch (err) {
    _iterator47.e(err);
  } finally {
    _iterator47.f();
  }
  s.output_text = e.join("");
}
var Mt,
  Fr,
  Ce,
  Nr,
  Pn,
  Sn,
  Rn,
  Cn,
  Mr = class s extends ge {
    constructor(e) {
      super(), Mt.add(this), Fr.set(this, void 0), Ce.set(this, void 0), Nr.set(this, void 0), _(this, Fr, e, "f");
    }
    static createResponse(e, t, r) {
      let n = new s(t);
      return n._run(() => n._createOrRetrieveResponse(e, t, _objectSpread(_objectSpread({}, r), {}, {
        headers: _objectSpread(_objectSpread({}, r === null || r === void 0 ? void 0 : r.headers), {}, {
          "X-Stainless-Helper-Method": "stream"
        })
      }))), n;
    }
    _createOrRetrieveResponse(e, t, r) {
      var _this34 = this;
      return _asyncToGenerator(function* () {
        var _t$starting_after, _o$controller$signal2;
        let n = r === null || r === void 0 ? void 0 : r.signal;
        n && (n.aborted && _this34.controller.abort(), n.addEventListener("abort", () => _this34.controller.abort())), a(_this34, Mt, "m", Pn).call(_this34);
        let o,
          i = null;
        "response_id" in t ? (o = yield e.responses.retrieve(t.response_id, {
          stream: !0
        }, _objectSpread(_objectSpread({}, r), {}, {
          signal: _this34.controller.signal,
          stream: !0
        })), i = (_t$starting_after = t.starting_after) !== null && _t$starting_after !== void 0 ? _t$starting_after : null) : o = yield e.responses.create(_objectSpread(_objectSpread({}, t), {}, {
          stream: !0
        }), _objectSpread(_objectSpread({}, r), {}, {
          signal: _this34.controller.signal
        })), _this34._connected();
        var _iteratorAbruptCompletion13 = false;
        var _didIteratorError13 = false;
        var _iteratorError13;
        try {
          for (var _iterator13 = _asyncIterator(o), _step13; _iteratorAbruptCompletion13 = !(_step13 = yield _iterator13.next()).done; _iteratorAbruptCompletion13 = false) {
            let l = _step13.value;
            {
              a(_this34, Mt, "m", Sn).call(_this34, l, i);
            }
          }
        } catch (err) {
          _didIteratorError13 = true;
          _iteratorError13 = err;
        } finally {
          try {
            if (_iteratorAbruptCompletion13 && _iterator13.return != null) {
              yield _iterator13.return();
            }
          } finally {
            if (_didIteratorError13) {
              throw _iteratorError13;
            }
          }
        }
        if ((_o$controller$signal2 = o.controller.signal) !== null && _o$controller$signal2 !== void 0 && _o$controller$signal2.aborted) throw new $();
        return a(_this34, Mt, "m", Rn).call(_this34);
      })();
    }
    [(Fr = new WeakMap(), Ce = new WeakMap(), Nr = new WeakMap(), Mt = new WeakSet(), Pn = function Pn() {
      this.ended || _(this, Ce, void 0, "f");
    }, Sn = function Sn(t, r) {
      if (this.ended) return;
      let n = (i, l) => {
          (r == null || l.sequence_number > r) && this._emit(i, l);
        },
        o = a(this, Mt, "m", Cn).call(this, t);
      switch (n("event", t), t.type) {
        case "response.output_text.delta":
          {
            let i = o.output[t.output_index];
            if (!i) throw new g(`missing output at index ${t.output_index}`);
            if (i.type === "message") {
              let l = i.content[t.content_index];
              if (!l) throw new g(`missing content at index ${t.content_index}`);
              if (l.type !== "output_text") throw new g(`expected content to be 'output_text', got ${l.type}`);
              n("response.output_text.delta", _objectSpread(_objectSpread({}, t), {}, {
                snapshot: l.text
              }));
            }
            break;
          }
        case "response.function_call_arguments.delta":
          {
            let i = o.output[t.output_index];
            if (!i) throw new g(`missing output at index ${t.output_index}`);
            i.type === "function_call" && n("response.function_call_arguments.delta", _objectSpread(_objectSpread({}, t), {}, {
              snapshot: i.arguments
            }));
            break;
          }
        default:
          n(t.type, t);
          break;
      }
    }, Rn = function Rn() {
      if (this.ended) throw new g("stream has ended, this shouldn't happen");
      let t = a(this, Ce, "f");
      if (!t) throw new g("request ended without sending any events");
      _(this, Ce, void 0, "f");
      let r = Xo(t, a(this, Fr, "f"));
      return _(this, Nr, r, "f"), r;
    }, Cn = function Cn(t) {
      let r = a(this, Ce, "f");
      if (!r) {
        if (t.type !== "response.created") throw new g(`When snapshot hasn't been set yet, expected 'response.created' event, got ${t.type}`);
        return r = _(this, Ce, t.response, "f"), r;
      }
      switch (t.type) {
        case "response.output_item.added":
          {
            r.output.push(t.item);
            break;
          }
        case "response.content_part.added":
          {
            let n = r.output[t.output_index];
            if (!n) throw new g(`missing output at index ${t.output_index}`);
            let o = n.type,
              i = t.part;
            o === "message" && i.type !== "reasoning_text" ? n.content.push(i) : o === "reasoning" && i.type === "reasoning_text" && (n.content || (n.content = []), n.content.push(i));
            break;
          }
        case "response.output_text.delta":
          {
            let n = r.output[t.output_index];
            if (!n) throw new g(`missing output at index ${t.output_index}`);
            if (n.type === "message") {
              let o = n.content[t.content_index];
              if (!o) throw new g(`missing content at index ${t.content_index}`);
              if (o.type !== "output_text") throw new g(`expected content to be 'output_text', got ${o.type}`);
              o.text += t.delta;
            }
            break;
          }
        case "response.function_call_arguments.delta":
          {
            let n = r.output[t.output_index];
            if (!n) throw new g(`missing output at index ${t.output_index}`);
            n.type === "function_call" && (n.arguments += t.delta);
            break;
          }
        case "response.reasoning_text.delta":
          {
            let n = r.output[t.output_index];
            if (!n) throw new g(`missing output at index ${t.output_index}`);
            if (n.type === "reasoning") {
              var _n$content;
              let o = (_n$content = n.content) === null || _n$content === void 0 ? void 0 : _n$content[t.content_index];
              if (!o) throw new g(`missing content at index ${t.content_index}`);
              if (o.type !== "reasoning_text") throw new g(`expected content to be 'reasoning_text', got ${o.type}`);
              o.text += t.delta;
            }
            break;
          }
        case "response.completed":
          {
            _(this, Ce, t.response, "f");
            break;
          }
      }
      return r;
    }, Symbol.asyncIterator)]() {
      var _this35 = this;
      let e = [],
        t = [],
        r = !1;
      return this.on("event", n => {
        let o = t.shift();
        o ? o.resolve(n) : e.push(n);
      }), this.on("end", () => {
        r = !0;
        for (var _i1 = 0, _t9 = t; _i1 < _t9.length; _i1++) {
          let n = _t9[_i1];
          n.resolve(void 0);
        }
        t.length = 0;
      }), this.on("abort", n => {
        r = !0;
        for (var _i10 = 0, _t0 = t; _i10 < _t0.length; _i10++) {
          let o = _t0[_i10];
          o.reject(n);
        }
        t.length = 0;
      }), this.on("error", n => {
        r = !0;
        for (var _i11 = 0, _t1 = t; _i11 < _t1.length; _i11++) {
          let o = _t1[_i11];
          o.reject(n);
        }
        t.length = 0;
      }), {
        next: function () {
          var _next4 = _asyncToGenerator(function* () {
            return e.length ? {
              value: e.shift(),
              done: !1
            } : r ? {
              value: void 0,
              done: !0
            } : new Promise((o, i) => t.push({
              resolve: o,
              reject: i
            })).then(o => o ? {
              value: o,
              done: !1
            } : {
              value: void 0,
              done: !0
            });
          });
          function next() {
            return _next4.apply(this, arguments);
          }
          return next;
        }(),
        return: function () {
          var _return4 = _asyncToGenerator(function* () {
            return _this35.abort(), {
              value: void 0,
              done: !0
            };
          });
          function _return() {
            return _return4.apply(this, arguments);
          }
          return _return;
        }()
      };
    }
    finalResponse() {
      var _this36 = this;
      return _asyncToGenerator(function* () {
        yield _this36.done();
        let e = a(_this36, Nr, "f");
        if (!e) throw new g("stream ended without producing a ChatCompletion");
        return e;
      })();
    }
  };
function Xo(s, e) {
  return In(s, e);
}
var Lt = class extends u {
  list(e, t = {}, r) {
    return this._client.getAPIList(c`/responses/${e}/input_items`, I, _objectSpread({
      query: t
    }, r));
  }
};
var Ee = class extends u {
  constructor() {
    super(...arguments), this.inputItems = new Lt(this._client);
  }
  create(e, t) {
    var _e$stream7;
    return this._client.post("/responses", _objectSpread(_objectSpread({
      body: e
    }, t), {}, {
      stream: (_e$stream7 = e.stream) !== null && _e$stream7 !== void 0 ? _e$stream7 : !1
    }))._thenUnwrap(r => ("object" in r && r.object === "response" && Tr(r), r));
  }
  retrieve(e, t = {}, r) {
    var _t$stream3;
    return this._client.get(c`/responses/${e}`, _objectSpread(_objectSpread({
      query: t
    }, r), {}, {
      stream: (_t$stream3 = t === null || t === void 0 ? void 0 : t.stream) !== null && _t$stream3 !== void 0 ? _t$stream3 : !1
    }))._thenUnwrap(n => ("object" in n && n.object === "response" && Tr(n), n));
  }
  delete(e, t) {
    return this._client.delete(c`/responses/${e}`, _objectSpread(_objectSpread({}, t), {}, {
      headers: d([{
        Accept: "*/*"
      }, t === null || t === void 0 ? void 0 : t.headers])
    }));
  }
  parse(e, t) {
    return this._client.responses.create(e, t)._thenUnwrap(r => As(r, e));
  }
  stream(e, t) {
    return Mr.createResponse(this._client, e, t);
  }
  cancel(e, t) {
    return this._client.post(c`/responses/${e}/cancel`, t);
  }
};
Ee.InputItems = Lt;
var Bt = class extends u {
  create(e, t, r) {
    return this._client.post(c`/uploads/${e}/parts`, K(_objectSpread({
      body: t
    }, r), this._client));
  }
};
var Oe = class extends u {
  constructor() {
    super(...arguments), this.parts = new Bt(this._client);
  }
  create(e, t) {
    return this._client.post("/uploads", _objectSpread({
      body: e
    }, t));
  }
  cancel(e, t) {
    return this._client.post(c`/uploads/${e}/cancel`, t);
  }
  complete(e, t, r) {
    return this._client.post(c`/uploads/${e}/complete`, _objectSpread({
      body: t
    }, r));
  }
};
Oe.Parts = Bt;
var En = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(function* (s) {
    let e = yield Promise.allSettled(s),
      t = e.filter(n => n.status === "rejected");
    if (t.length) {
      var _iterator49 = _createForOfIteratorHelper(t),
        _step49;
      try {
        for (_iterator49.s(); !(_step49 = _iterator49.n()).done;) {
          let n = _step49.value;
          console.error(n.reason);
        }
      } catch (err) {
        _iterator49.e(err);
      } finally {
        _iterator49.f();
      }
      throw new Error(`${t.length} promise(s) failed - see the above errors`);
    }
    let r = [];
    var _iterator50 = _createForOfIteratorHelper(e),
      _step50;
    try {
      for (_iterator50.s(); !(_step50 = _iterator50.n()).done;) {
        let n = _step50.value;
        n.status === "fulfilled" && r.push(n.value);
      }
    } catch (err) {
      _iterator50.e(err);
    } finally {
      _iterator50.f();
    }
    return r;
  });
  return function En(_x23) {
    return _ref11.apply(this, arguments);
  };
}();
var jt = class extends u {
  create(e, t, r) {
    return this._client.post(c`/vector_stores/${e}/file_batches`, _objectSpread(_objectSpread({
      body: t
    }, r), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
  retrieve(e, t, r) {
    let n = t.vector_store_id;
    return this._client.get(c`/vector_stores/${n}/file_batches/${e}`, _objectSpread(_objectSpread({}, r), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
  cancel(e, t, r) {
    let n = t.vector_store_id;
    return this._client.post(c`/vector_stores/${n}/file_batches/${e}/cancel`, _objectSpread(_objectSpread({}, r), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
  createAndPoll(e, t, r) {
    var _this37 = this;
    return _asyncToGenerator(function* () {
      let n = yield _this37.create(e, t);
      return yield _this37.poll(e, n.id, r);
    })();
  }
  listFiles(e, t, r) {
    let n = t.vector_store_id,
      o = _objectWithoutProperties(t, _excluded19);
    return this._client.getAPIList(c`/vector_stores/${n}/file_batches/${e}/files`, I, _objectSpread(_objectSpread({
      query: o
    }, r), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
  poll(e, t, r) {
    var _this38 = this;
    return _asyncToGenerator(function* () {
      var _r$pollIntervalMs$toS2, _r$pollIntervalMs2;
      let n = d([r === null || r === void 0 ? void 0 : r.headers, {
        "X-Stainless-Poll-Helper": "true",
        "X-Stainless-Custom-Poll-Interval": (_r$pollIntervalMs$toS2 = r === null || r === void 0 || (_r$pollIntervalMs2 = r.pollIntervalMs) === null || _r$pollIntervalMs2 === void 0 ? void 0 : _r$pollIntervalMs2.toString()) !== null && _r$pollIntervalMs$toS2 !== void 0 ? _r$pollIntervalMs$toS2 : void 0
      }]);
      for (;;) {
        let _yield$_this38$retrie = yield _this38.retrieve(t, {
            vector_store_id: e
          }, _objectSpread(_objectSpread({}, r), {}, {
            headers: n
          })).withResponse(),
          o = _yield$_this38$retrie.data,
          i = _yield$_this38$retrie.response;
        switch (o.status) {
          case "in_progress":
            let l = 5e3;
            if (r !== null && r !== void 0 && r.pollIntervalMs) l = r.pollIntervalMs;else {
              let h = i.headers.get("openai-poll-after-ms");
              if (h) {
                let m = parseInt(h);
                isNaN(m) || (l = m);
              }
            }
            yield Z(l);
            break;
          case "failed":
          case "cancelled":
          case "completed":
            return o;
        }
      }
    })();
  }
  uploadAndPoll(_x24, _x25, _x26) {
    var _this39 = this;
    return _asyncToGenerator(function* (e, {
      files: t,
      fileIds: r = []
    }, n) {
      var _n$maxConcurrency;
      if (t == null || t.length == 0) throw new Error("No `files` provided to process. If you've already uploaded files you should use `.createAndPoll()` instead");
      let o = (_n$maxConcurrency = n === null || n === void 0 ? void 0 : n.maxConcurrency) !== null && _n$maxConcurrency !== void 0 ? _n$maxConcurrency : 5,
        i = Math.min(o, t.length),
        l = _this39._client,
        h = t.values(),
        m = [...r];
      function b(_x27) {
        return _b.apply(this, arguments);
      }
      function _b() {
        _b = _asyncToGenerator(function* (w) {
          var _iterator51 = _createForOfIteratorHelper(w),
            _step51;
          try {
            for (_iterator51.s(); !(_step51 = _iterator51.n()).done;) {
              let f = _step51.value;
              let P = yield l.files.create({
                file: f,
                purpose: "assistants"
              }, n);
              m.push(P.id);
            }
          } catch (err) {
            _iterator51.e(err);
          } finally {
            _iterator51.f();
          }
        });
        return _b.apply(this, arguments);
      }
      let p = Array(i).fill(h).map(b);
      return yield En(p), yield _this39.createAndPoll(e, {
        file_ids: m
      });
    }).apply(this, arguments);
  }
};
var Ut = class extends u {
  create(e, t, r) {
    return this._client.post(c`/vector_stores/${e}/files`, _objectSpread(_objectSpread({
      body: t
    }, r), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
  retrieve(e, t, r) {
    let n = t.vector_store_id;
    return this._client.get(c`/vector_stores/${n}/files/${e}`, _objectSpread(_objectSpread({}, r), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
  update(e, t, r) {
    let n = t.vector_store_id,
      o = _objectWithoutProperties(t, _excluded20);
    return this._client.post(c`/vector_stores/${n}/files/${e}`, _objectSpread(_objectSpread({
      body: o
    }, r), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
  list(e, t = {}, r) {
    return this._client.getAPIList(c`/vector_stores/${e}/files`, I, _objectSpread(_objectSpread({
      query: t
    }, r), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
  delete(e, t, r) {
    let n = t.vector_store_id;
    return this._client.delete(c`/vector_stores/${n}/files/${e}`, _objectSpread(_objectSpread({}, r), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
  createAndPoll(e, t, r) {
    var _this40 = this;
    return _asyncToGenerator(function* () {
      let n = yield _this40.create(e, t, r);
      return yield _this40.poll(e, n.id, r);
    })();
  }
  poll(e, t, r) {
    var _this41 = this;
    return _asyncToGenerator(function* () {
      var _r$pollIntervalMs$toS3, _r$pollIntervalMs3;
      let n = d([r === null || r === void 0 ? void 0 : r.headers, {
        "X-Stainless-Poll-Helper": "true",
        "X-Stainless-Custom-Poll-Interval": (_r$pollIntervalMs$toS3 = r === null || r === void 0 || (_r$pollIntervalMs3 = r.pollIntervalMs) === null || _r$pollIntervalMs3 === void 0 ? void 0 : _r$pollIntervalMs3.toString()) !== null && _r$pollIntervalMs$toS3 !== void 0 ? _r$pollIntervalMs$toS3 : void 0
      }]);
      for (;;) {
        let o = yield _this41.retrieve(t, {
            vector_store_id: e
          }, _objectSpread(_objectSpread({}, r), {}, {
            headers: n
          })).withResponse(),
          i = o.data;
        switch (i.status) {
          case "in_progress":
            let l = 5e3;
            if (r !== null && r !== void 0 && r.pollIntervalMs) l = r.pollIntervalMs;else {
              let h = o.response.headers.get("openai-poll-after-ms");
              if (h) {
                let m = parseInt(h);
                isNaN(m) || (l = m);
              }
            }
            yield Z(l);
            break;
          case "failed":
          case "completed":
            return i;
        }
      }
    })();
  }
  upload(e, t, r) {
    var _this42 = this;
    return _asyncToGenerator(function* () {
      let n = yield _this42._client.files.create({
        file: t,
        purpose: "assistants"
      }, r);
      return _this42.create(e, {
        file_id: n.id
      }, r);
    })();
  }
  uploadAndPoll(e, t, r) {
    var _this43 = this;
    return _asyncToGenerator(function* () {
      let n = yield _this43.upload(e, t, r);
      return yield _this43.poll(e, n.id, r);
    })();
  }
  content(e, t, r) {
    let n = t.vector_store_id;
    return this._client.getAPIList(c`/vector_stores/${n}/files/${e}/content`, re, _objectSpread(_objectSpread({}, r), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
};
var he = class extends u {
  constructor() {
    super(...arguments), this.files = new Ut(this._client), this.fileBatches = new jt(this._client);
  }
  create(e, t) {
    return this._client.post("/vector_stores", _objectSpread(_objectSpread({
      body: e
    }, t), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, t === null || t === void 0 ? void 0 : t.headers])
    }));
  }
  retrieve(e, t) {
    return this._client.get(c`/vector_stores/${e}`, _objectSpread(_objectSpread({}, t), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, t === null || t === void 0 ? void 0 : t.headers])
    }));
  }
  update(e, t, r) {
    return this._client.post(c`/vector_stores/${e}`, _objectSpread(_objectSpread({
      body: t
    }, r), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
  list(e = {}, t) {
    return this._client.getAPIList("/vector_stores", I, _objectSpread(_objectSpread({
      query: e
    }, t), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, t === null || t === void 0 ? void 0 : t.headers])
    }));
  }
  delete(e, t) {
    return this._client.delete(c`/vector_stores/${e}`, _objectSpread(_objectSpread({}, t), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, t === null || t === void 0 ? void 0 : t.headers])
    }));
  }
  search(e, t, r) {
    return this._client.getAPIList(c`/vector_stores/${e}/search`, re, _objectSpread(_objectSpread({
      body: t,
      method: "post"
    }, r), {}, {
      headers: d([{
        "OpenAI-Beta": "assistants=v2"
      }, r === null || r === void 0 ? void 0 : r.headers])
    }));
  }
};
he.Files = Ut;
he.FileBatches = jt;
var ze = class extends u {
  create(e, t) {
    return this._client.post("/videos", zt(_objectSpread({
      body: e
    }, t), this._client));
  }
  retrieve(e, t) {
    return this._client.get(c`/videos/${e}`, t);
  }
  list(e = {}, t) {
    return this._client.getAPIList("/videos", ie, _objectSpread({
      query: e
    }, t));
  }
  delete(e, t) {
    return this._client.delete(c`/videos/${e}`, t);
  }
  downloadContent(e, t = {}, r) {
    return this._client.get(c`/videos/${e}/content`, _objectSpread(_objectSpread({
      query: t
    }, r), {}, {
      headers: d([{
        Accept: "application/binary"
      }, r === null || r === void 0 ? void 0 : r.headers]),
      __binaryResponse: !0
    }));
  }
  remix(e, t, r) {
    return this._client.post(c`/videos/${e}/remix`, zt(_objectSpread({
      body: t
    }, r), this._client));
  }
};
var Dt,
  On,
  Lr,
  Ye = class extends u {
    constructor() {
      super(...arguments), Dt.add(this);
    }
    unwrap(_x28, _x29) {
      var _this44 = this;
      return _asyncToGenerator(function* (e, t, r = _this44._client.webhookSecret, n = 300) {
        return yield _this44.verifySignature(e, t, r, n), JSON.parse(e);
      }).apply(this, arguments);
    }
    verifySignature(_x30, _x31) {
      var _this45 = this;
      return _asyncToGenerator(function* (e, t, r = _this45._client.webhookSecret, n = 300) {
        if (typeof crypto > "u" || typeof crypto.subtle.importKey != "function" || typeof crypto.subtle.verify != "function") throw new Error("Webhook signature verification is only supported when the `crypto` global is defined");
        a(_this45, Dt, "m", On).call(_this45, r);
        let o = d([t]).values,
          i = a(_this45, Dt, "m", Lr).call(_this45, o, "webhook-signature"),
          l = a(_this45, Dt, "m", Lr).call(_this45, o, "webhook-timestamp"),
          h = a(_this45, Dt, "m", Lr).call(_this45, o, "webhook-id"),
          m = parseInt(l, 10);
        if (isNaN(m)) throw new Y("Invalid webhook timestamp format");
        let b = Math.floor(Date.now() / 1e3);
        if (b - m > n) throw new Y("Webhook timestamp is too old");
        if (m > b + n) throw new Y("Webhook timestamp is too new");
        let p = i.split(" ").map(x => x.startsWith("v1,") ? x.substring(3) : x),
          w = r.startsWith("whsec_") ? Buffer.from(r.replace("whsec_", ""), "base64") : Buffer.from(r, "utf-8"),
          f = h ? `${h}.${l}.${e}` : `${l}.${e}`,
          P = yield crypto.subtle.importKey("raw", w, {
            name: "HMAC",
            hash: "SHA-256"
          }, !1, ["verify"]);
        var _iterator52 = _createForOfIteratorHelper(p),
          _step52;
        try {
          for (_iterator52.s(); !(_step52 = _iterator52.n()).done;) {
            let x = _step52.value;
            try {
              let O = Buffer.from(x, "base64");
              if (yield crypto.subtle.verify("HMAC", P, O, new TextEncoder().encode(f))) return;
            } catch (_unused0) {
              continue;
            }
          }
        } catch (err) {
          _iterator52.e(err);
        } finally {
          _iterator52.f();
        }
        throw new Y("The given webhook signature does not match the expected signature");
      }).apply(this, arguments);
    }
  };
Dt = new WeakSet(), On = function On(e) {
  if (typeof e != "string" || e.length === 0) throw new Error("The webhook secret must either be set using the env var, OPENAI_WEBHOOK_SECRET, on the client class, OpenAI({ webhookSecret: '123' }), or passed to this function");
}, Lr = function Lr(e, t) {
  if (!e) throw new Error("Headers are required");
  let r = e.get(t);
  if (r == null) throw new Error(`Missing required header: ${t}`);
  return r;
};
var Is,
  Ps,
  Br,
  vn,
  A = class {
    constructor(_ref12 = {}) {
      var _xe, _xe2, _xe3, _l$timeout, _l$logger, _ref13, _Zr, _l$maxRetries, _l$fetch;
      let _ref12$baseURL = _ref12.baseURL,
        e = _ref12$baseURL === void 0 ? xe("OPENAI_BASE_URL") : _ref12$baseURL,
        _ref12$apiKey = _ref12.apiKey,
        t = _ref12$apiKey === void 0 ? xe("OPENAI_API_KEY") : _ref12$apiKey,
        _ref12$organization = _ref12.organization,
        r = _ref12$organization === void 0 ? (_xe = xe("OPENAI_ORG_ID")) !== null && _xe !== void 0 ? _xe : null : _ref12$organization,
        _ref12$project = _ref12.project,
        n = _ref12$project === void 0 ? (_xe2 = xe("OPENAI_PROJECT_ID")) !== null && _xe2 !== void 0 ? _xe2 : null : _ref12$project,
        _ref12$webhookSecret = _ref12.webhookSecret,
        o = _ref12$webhookSecret === void 0 ? (_xe3 = xe("OPENAI_WEBHOOK_SECRET")) !== null && _xe3 !== void 0 ? _xe3 : null : _ref12$webhookSecret,
        i = _objectWithoutProperties(_ref12, _excluded21);
      if (Is.add(this), Br.set(this, void 0), this.completions = new Ue(this), this.chat = new ye(this), this.embeddings = new We(this), this.files = new He(this), this.images = new Ve(this), this.audio = new se(this), this.moderations = new Qe(this), this.models = new Ge(this), this.fineTuning = new z(this), this.graders = new Re(this), this.vectorStores = new he(this), this.webhooks = new Ye(this), this.beta = new Q(this), this.batches = new Ne(this), this.uploads = new Oe(this), this.responses = new Ee(this), this.realtime = new fe(this), this.conversations = new Pe(this), this.evals = new Se(this), this.containers = new Ie(this), this.videos = new ze(this), t === void 0) throw new g("Missing credentials. Please pass an `apiKey`, or set the `OPENAI_API_KEY` environment variable.");
      let l = _objectSpread(_objectSpread({
        apiKey: t,
        organization: r,
        project: n,
        webhookSecret: o
      }, i), {}, {
        baseURL: e || "https://api.openai.com/v1"
      });
      if (!l.dangerouslyAllowBrowser && Ms()) throw new g(`It looks like you're running in a browser-like environment.

This is disabled by default, as it risks exposing your secret API credentials to attackers.
If you understand the risks and have appropriate mitigations in place,
you can set the \`dangerouslyAllowBrowser\` option to \`true\`, e.g.,

new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety
`);
      this.baseURL = l.baseURL, this.timeout = (_l$timeout = l.timeout) !== null && _l$timeout !== void 0 ? _l$timeout : Ps.DEFAULT_TIMEOUT, this.logger = (_l$logger = l.logger) !== null && _l$logger !== void 0 ? _l$logger : console;
      let h = "warn";
      this.logLevel = h, this.logLevel = (_ref13 = (_Zr = Zr(l.logLevel, "ClientOptions.logLevel", this)) !== null && _Zr !== void 0 ? _Zr : Zr(xe("OPENAI_LOG"), "process.env['OPENAI_LOG']", this)) !== null && _ref13 !== void 0 ? _ref13 : h, this.fetchOptions = l.fetchOptions, this.maxRetries = (_l$maxRetries = l.maxRetries) !== null && _l$maxRetries !== void 0 ? _l$maxRetries : 2, this.fetch = (_l$fetch = l.fetch) !== null && _l$fetch !== void 0 ? _l$fetch : Bs(), _(this, Br, Us, "f"), this._options = l, this.apiKey = typeof t == "string" ? t : "Missing Key", this.organization = r, this.project = n, this.webhookSecret = o;
    }
    withOptions(e) {
      return new this.constructor(_objectSpread(_objectSpread({}, this._options), {}, {
        baseURL: this.baseURL,
        maxRetries: this.maxRetries,
        timeout: this.timeout,
        logger: this.logger,
        logLevel: this.logLevel,
        fetch: this.fetch,
        fetchOptions: this.fetchOptions,
        apiKey: this.apiKey,
        organization: this.organization,
        project: this.project,
        webhookSecret: this.webhookSecret
      }, e));
    }
    defaultQuery() {
      return this._options.defaultQuery;
    }
    validateHeaders({
      values: e,
      nulls: t
    }) {}
    authHeaders(e) {
      var _this46 = this;
      return _asyncToGenerator(function* () {
        return d([{
          Authorization: `Bearer ${_this46.apiKey}`
        }]);
      })();
    }
    stringifyQuery(e) {
      return zr(e, {
        arrayFormat: "brackets"
      });
    }
    getUserAgent() {
      return `${this.constructor.name}/JS ${me}`;
    }
    defaultIdempotencyKey() {
      return `stainless-node-retry-${_Dr()}`;
    }
    makeStatusError(e, t, r, n) {
      return T.generate(e, t, r, n);
    }
    _callApiKey() {
      var _this47 = this;
      return _asyncToGenerator(function* () {
        let e = _this47._options.apiKey;
        if (typeof e != "function") return !1;
        let t;
        try {
          t = yield e();
        } catch (r) {
          throw r instanceof g ? r : new g(`Failed to get token from 'apiKey' function: ${r.message}`, {
            cause: r
          });
        }
        if (typeof t != "string" || !t) throw new g(`Expected 'apiKey' function argument to return a string but it returned ${t}`);
        return _this47.apiKey = t, !0;
      })();
    }
    buildURL(e, t, r) {
      let n = !a(this, Is, "m", vn).call(this) && r || this.baseURL,
        o = Es(e) ? new URL(e) : new URL(n + (n.endsWith("/") && e.startsWith("/") ? e.slice(1) : e)),
        i = this.defaultQuery();
      return Os(i) || (t = _objectSpread(_objectSpread({}, i), t)), typeof t == "object" && t && !Array.isArray(t) && (o.search = this.stringifyQuery(t)), o.toString();
    }
    prepareOptions(e) {
      var _this48 = this;
      return _asyncToGenerator(function* () {
        yield _this48._callApiKey();
      })();
    }
    prepareRequest(_x32, _x33) {
      return _asyncToGenerator(function* (e, {
        url: t,
        options: r
      }) {}).apply(this, arguments);
    }
    get(e, t) {
      return this.methodRequest("get", e, t);
    }
    post(e, t) {
      return this.methodRequest("post", e, t);
    }
    patch(e, t) {
      return this.methodRequest("patch", e, t);
    }
    put(e, t) {
      return this.methodRequest("put", e, t);
    }
    delete(e, t) {
      return this.methodRequest("delete", e, t);
    }
    methodRequest(e, t, r) {
      return this.request(Promise.resolve(r).then(n => _objectSpread({
        method: e,
        path: t
      }, n)));
    }
    request(e, t = null) {
      return new $e(this, this.makeRequest(e, t, void 0));
    }
    makeRequest(e, t, r) {
      var _this49 = this;
      return _asyncToGenerator(function* () {
        var _n$maxRetries, _n$signal;
        let n = yield e,
          o = (_n$maxRetries = n.maxRetries) !== null && _n$maxRetries !== void 0 ? _n$maxRetries : _this49.maxRetries;
        t == null && (t = o), yield _this49.prepareOptions(n);
        let _yield$_this49$buildR = yield _this49.buildRequest(n, {
            retryCount: o - t
          }),
          i = _yield$_this49$buildR.req,
          l = _yield$_this49$buildR.url,
          h = _yield$_this49$buildR.timeout;
        yield _this49.prepareRequest(i, {
          url: l,
          options: n
        });
        let m = "log_" + (Math.random() * (1 << 24) | 0).toString(16).padStart(6, "0"),
          b = r === void 0 ? "" : `, retryOf: ${r}`,
          p = Date.now();
        if (E(_this49).debug(`[${m}] sending request`, oe({
          retryOfRequestLogID: r,
          method: n.method,
          url: l,
          options: n,
          headers: i.headers
        })), (_n$signal = n.signal) !== null && _n$signal !== void 0 && _n$signal.aborted) throw new $();
        let w = new AbortController(),
          f = yield _this49.fetchWithTimeout(l, i, h, w).catch(qt),
          P = Date.now();
        if (f instanceof globalThis.Error) {
          var _n$signal2;
          let S = `retrying, ${t} attempts remaining`;
          if ((_n$signal2 = n.signal) !== null && _n$signal2 !== void 0 && _n$signal2.aborted) throw new $();
          let y = Wt(f) || /timed? ?out/i.test(String(f) + ("cause" in f ? String(f.cause) : ""));
          if (t) return E(_this49).info(`[${m}] connection ${y ? "timed out" : "failed"} - ${S}`), E(_this49).debug(`[${m}] connection ${y ? "timed out" : "failed"} (${S})`, oe({
            retryOfRequestLogID: r,
            url: l,
            durationMs: P - p,
            message: f.message
          })), _this49.retryRequest(n, t, r !== null && r !== void 0 ? r : m);
          throw E(_this49).info(`[${m}] connection ${y ? "timed out" : "failed"} - error; no more retries left`), E(_this49).debug(`[${m}] connection ${y ? "timed out" : "failed"} (error; no more retries left)`, oe({
            retryOfRequestLogID: r,
            url: l,
            durationMs: P - p,
            message: f.message
          })), y ? new pe() : new de({
            cause: f
          });
        }
        let x = [...f.headers.entries()].filter(([S]) => S === "x-request-id").map(([S, y]) => ", " + S + ": " + JSON.stringify(y)).join(""),
          O = `[${m}${b}${x}] ${i.method} ${l} ${f.ok ? "succeeded" : "failed"} with status ${f.status} in ${P - p}ms`;
        if (!f.ok) {
          let S = yield _this49.shouldRetry(f);
          if (t && S) {
            let C = `retrying, ${t} attempts remaining`;
            return yield js(f.body), E(_this49).info(`${O} - ${C}`), E(_this49).debug(`[${m}] response error (${C})`, oe({
              retryOfRequestLogID: r,
              url: f.url,
              status: f.status,
              headers: f.headers,
              durationMs: P - p
            })), _this49.retryRequest(n, t, r !== null && r !== void 0 ? r : m, f.headers);
          }
          let y = S ? "error; no more retries left" : "error; not retryable";
          E(_this49).info(`${O} - ${y}`);
          let M = yield f.text().catch(C => qt(C).message),
            R = ks(M),
            H = R ? void 0 : M;
          throw E(_this49).debug(`[${m}] response error (${y})`, oe({
            retryOfRequestLogID: r,
            url: f.url,
            status: f.status,
            headers: f.headers,
            message: H,
            durationMs: Date.now() - p
          })), _this49.makeStatusError(f.status, R, H, f.headers);
        }
        return E(_this49).info(O), E(_this49).debug(`[${m}] response start`, oe({
          retryOfRequestLogID: r,
          url: f.url,
          status: f.status,
          headers: f.headers,
          durationMs: P - p
        })), {
          response: f,
          options: n,
          controller: w,
          requestLogID: m,
          retryOfRequestLogID: r,
          startTime: p
        };
      })();
    }
    getAPIList(e, t, r) {
      return this.requestAPIList(t, _objectSpread({
        method: "get",
        path: e
      }, r));
    }
    requestAPIList(e, t) {
      let r = this.makeRequest(t, null, void 0);
      return new Gt(this, r, e);
    }
    fetchWithTimeout(e, t, r, n) {
      var _this50 = this;
      return _asyncToGenerator(function* () {
        let _ref14 = t || {},
          o = _ref14.signal,
          i = _ref14.method,
          l = _objectWithoutProperties(_ref14, _excluded22);
        o && o.addEventListener("abort", () => n.abort());
        let h = setTimeout(() => n.abort(), r),
          m = globalThis.ReadableStream && l.body instanceof globalThis.ReadableStream || typeof l.body == "object" && l.body !== null && Symbol.asyncIterator in l.body,
          b = _objectSpread(_objectSpread({
            signal: n.signal
          }, m ? {
            duplex: "half"
          } : {}), {}, {
            method: "GET"
          }, l);
        i && (b.method = i.toUpperCase());
        try {
          return yield _this50.fetch.call(void 0, e, b);
        } finally {
          clearTimeout(h);
        }
      })();
    }
    shouldRetry(e) {
      return _asyncToGenerator(function* () {
        let t = e.headers.get("x-should-retry");
        return t === "true" ? !0 : t === "false" ? !1 : e.status === 408 || e.status === 409 || e.status === 429 || e.status >= 500;
      })();
    }
    retryRequest(e, t, r, n) {
      var _this51 = this;
      return _asyncToGenerator(function* () {
        let o,
          i = n === null || n === void 0 ? void 0 : n.get("retry-after-ms");
        if (i) {
          let h = parseFloat(i);
          Number.isNaN(h) || (o = h);
        }
        let l = n === null || n === void 0 ? void 0 : n.get("retry-after");
        if (l && !o) {
          let h = parseFloat(l);
          Number.isNaN(h) ? o = Date.parse(l) - Date.now() : o = h * 1e3;
        }
        if (!(o && 0 <= o && o < 60 * 1e3)) {
          var _e$maxRetries;
          let h = (_e$maxRetries = e.maxRetries) !== null && _e$maxRetries !== void 0 ? _e$maxRetries : _this51.maxRetries;
          o = _this51.calculateDefaultRetryTimeoutMillis(t, h);
        }
        return yield Z(o), _this51.makeRequest(e, t - 1, r);
      })();
    }
    calculateDefaultRetryTimeoutMillis(e, t) {
      let o = t - e,
        i = Math.min(.5 * Math.pow(2, o), 8),
        l = 1 - Math.random() * .25;
      return i * l * 1e3;
    }
    buildRequest(_x34) {
      var _this52 = this;
      return _asyncToGenerator(function* (e, {
        retryCount: t = 0
      } = {}) {
        var _r$timeout, _this52$fetchOptions, _r$fetchOptions;
        let r = _objectSpread({}, e),
          n = r.method,
          o = r.path,
          i = r.query,
          l = r.defaultBaseURL,
          h = _this52.buildURL(o, i, l);
        "timeout" in r && $s("timeout", r.timeout), r.timeout = (_r$timeout = r.timeout) !== null && _r$timeout !== void 0 ? _r$timeout : _this52.timeout;
        let _this52$buildBody = _this52.buildBody({
            options: r
          }),
          m = _this52$buildBody.bodyHeaders,
          b = _this52$buildBody.body,
          p = yield _this52.buildHeaders({
            options: e,
            method: n,
            bodyHeaders: m,
            retryCount: t
          });
        return {
          req: _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({
            method: n,
            headers: p
          }, r.signal && {
            signal: r.signal
          }), globalThis.ReadableStream && b instanceof globalThis.ReadableStream && {
            duplex: "half"
          }), b && {
            body: b
          }), (_this52$fetchOptions = _this52.fetchOptions) !== null && _this52$fetchOptions !== void 0 ? _this52$fetchOptions : {}), (_r$fetchOptions = r.fetchOptions) !== null && _r$fetchOptions !== void 0 ? _r$fetchOptions : {}),
          url: h,
          timeout: r.timeout
        };
      }).apply(this, arguments);
    }
    buildHeaders(_x35) {
      var _this53 = this;
      return _asyncToGenerator(function* ({
        options: e,
        method: t,
        bodyHeaders: r,
        retryCount: n
      }) {
        let o = {};
        _this53.idempotencyHeader && t !== "get" && (e.idempotencyKey || (e.idempotencyKey = _this53.defaultIdempotencyKey()), o[_this53.idempotencyHeader] = e.idempotencyKey);
        let i = d([o, _objectSpread(_objectSpread(_objectSpread({
          Accept: "application/json",
          "User-Agent": _this53.getUserAgent(),
          "X-Stainless-Retry-Count": String(n)
        }, e.timeout ? {
          "X-Stainless-Timeout": String(Math.trunc(e.timeout / 1e3))
        } : {}), Ls()), {}, {
          "OpenAI-Organization": _this53.organization,
          "OpenAI-Project": _this53.project
        }), yield _this53.authHeaders(e), _this53._options.defaultHeaders, r, e.headers]);
        return _this53.validateHeaders(i), i.values;
      }).apply(this, arguments);
    }
    buildBody({
      options: {
        body: e,
        headers: t
      }
    }) {
      if (!e) return {
        bodyHeaders: void 0,
        body: void 0
      };
      let r = d([t]);
      return ArrayBuffer.isView(e) || e instanceof ArrayBuffer || e instanceof DataView || typeof e == "string" && r.values.has("content-type") || globalThis.Blob && e instanceof globalThis.Blob || e instanceof FormData || e instanceof URLSearchParams || globalThis.ReadableStream && e instanceof globalThis.ReadableStream ? {
        bodyHeaders: void 0,
        body: e
      } : typeof e == "object" && (Symbol.asyncIterator in e || Symbol.iterator in e && "next" in e && typeof e.next == "function") ? {
        bodyHeaders: void 0,
        body: ur(e)
      } : a(this, Br, "f").call(this, {
        body: e,
        headers: r
      });
    }
  };
Ps = A, Br = new WeakMap(), Is = new WeakSet(), vn = function vn() {
  return this.baseURL !== "https://api.openai.com/v1";
};
A.OpenAI = Ps;
A.DEFAULT_TIMEOUT = 6e5;
A.OpenAIError = g;
A.APIError = T;
A.APIConnectionError = de;
A.APIConnectionTimeoutError = pe;
A.APIUserAbortError = $;
A.NotFoundError = rt;
A.ConflictError = st;
A.RateLimitError = ot;
A.BadRequestError = Ze;
A.AuthenticationError = et;
A.InternalServerError = it;
A.PermissionDeniedError = tt;
A.UnprocessableEntityError = nt;
A.InvalidWebhookSignatureError = Y;
A.toFile = br;
A.Completions = Ue;
A.Chat = ye;
A.Embeddings = We;
A.Files = He;
A.Images = Ve;
A.Audio = se;
A.Moderations = Qe;
A.Models = Ge;
A.FineTuning = z;
A.Graders = Re;
A.VectorStores = he;
A.Webhooks = Ye;
A.Beta = Q;
A.Batches = Ne;
A.Uploads = Oe;
A.Responses = Ee;
A.Realtime = fe;
A.Conversations = Pe;
A.Evals = Se;
A.Containers = Ie;
A.Videos = ze;
function Yo(_x36, _x37) {
  return _Yo.apply(this, arguments);
}
function _Yo() {
  _Yo = _asyncToGenerator(function* (s, e) {
    try {
      var _n$choices$0$message;
      console.log("Asking Question:", s), console.log("typeof fetch:", typeof fetch), console.log("fetch is:", fetch);
      let t = new A({
        apiKey: e
      });
      console.log("About to call create");
      let r = t.chat.completions.create({
        model: "gpt-4o",
        messages: [{
          role: "user",
          content: s
        }],
        stream: !1
      });
      console.log("Promise created, type:", typeof r), console.log("Has then:", typeof r.then), r.then(o => {
        var _o$choices$0$message;
        console.log("Promise resolved!"), console.log(`
Answer:`, (_o$choices$0$message = o.choices[0].message) === null || _o$choices$0$message === void 0 ? void 0 : _o$choices$0$message.content);
      }, o => {
        console.error("Promise rejected:", o);
      }), console.log("Waiting for promise...");
      let n = yield r;
      console.log("await completed"), console.log(`
Answer:`, (_n$choices$0$message = n.choices[0].message) === null || _n$choices$0$message === void 0 ? void 0 : _n$choices$0$message.content);
    } catch (t) {
      console.error("Error asking question:", t);
    }
  });
  return _Yo.apply(this, arguments);
}
function Zo(_x38, _x39) {
  return _Zo.apply(this, arguments);
}
function _Zo() {
  _Zo = _asyncToGenerator(function* (s, e) {
    try {
      console.log("Asking Question (Streaming):", s);
      let r = yield new A({
        apiKey: e
      }).chat.completions.create({
        model: "gpt-4o",
        messages: [{
          role: "user",
          content: s
        }],
        stream: !0
      });
      console.log(`
Answer: `);
      var _iteratorAbruptCompletion14 = false;
      var _didIteratorError14 = false;
      var _iteratorError14;
      try {
        for (var _iterator14 = _asyncIterator(r), _step14; _iteratorAbruptCompletion14 = !(_step14 = yield _iterator14.next()).done; _iteratorAbruptCompletion14 = false) {
          let n = _step14.value;
          {
            var _n$choices$;
            let o = (_n$choices$ = n.choices[0]) === null || _n$choices$ === void 0 || (_n$choices$ = _n$choices$.delta) === null || _n$choices$ === void 0 ? void 0 : _n$choices$.content;
            o && process.stdout.write(o);
          }
        }
      } catch (err) {
        _didIteratorError14 = true;
        _iteratorError14 = err;
      } finally {
        try {
          if (_iteratorAbruptCompletion14 && _iterator14.return != null) {
            yield _iterator14.return();
          }
        } finally {
          if (_didIteratorError14) {
            throw _iteratorError14;
          }
        }
      }
      console.log(`

Stream complete`);
    } catch (t) {
      console.error("Error asking streaming question:", t);
    }
  });
  return _Zo.apply(this, arguments);
}
var ei = process.argv.slice(2),
  jr = "",
  Ss = "plain";
var _iterator53 = _createForOfIteratorHelper(ei),
  _step53;
try {
  for (_iterator53.s(); !(_step53 = _iterator53.n()).done;) {
    let s = _step53.value;
    if (s.startsWith("openaikey=")) jr = s.substring(10);else if (s.startsWith("type=")) {
      let e = s.substring(5);
      e === "plain" || e === "streaming" ? Ss = e : (console.error(`Invalid type: ${e}. Must be 'plain' or 'streaming'`), process.exit(1));
    }
  }
} catch (err) {
  _iterator53.e(err);
} finally {
  _iterator53.f();
}
jr || (console.error("Usage: main openaikey=<your-api-key> [type=plain|streaming]"), process.exit(1));
_asyncToGenerator(function* () {
  console.log(`Starting async function... (mode: ${Ss})`), Ss === "streaming" ? yield Zo("What is the meaning of life?", jr) : yield Yo("What is the meaning of life?", jr), console.log(`
Finished asking question`);
})().then(() => {
  console.log("Promise resolved successfully");
}).catch(s => {
  console.error("Promise rejected:", s);
});
