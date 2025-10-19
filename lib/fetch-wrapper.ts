// Fetch API wrapper for QuickJS environment
//
// IMPORTANT: This wrapper normalizes Request objects and provides compatibility shims.
// It calls __internalFetch__ which is the native C implementation exposed by fetch_full.c
//
// Background: The core-js Promise polyfill breaks QuickJS's JS_NewPromiseCapability(),
// so the C code was modified to create Promises manually using the JS Promise constructor.
// This allows Promise subclassing (required by OpenAI SDK) while maintaining fetch compatibility.

/// <reference path="./quickjs.d.ts" />

const _global = (globalThis as any);

// Create a wrapper that normalizes Request objects
_global.fetch = function (
  input: string | Request,
  init?: RequestInit
): Promise<Response> {
  // Handle different input types
  let url: string;
  let options: RequestInit | undefined;

  if (typeof input === "string") {
    url = input;
    options = init;
  } else if (input && typeof input === "object") {
    url = input.url || (input as any).href || String(input);

    if (input.method !== undefined) {
      options = {
        method: input.method,
        headers: input.headers,
        body: input.body,
        redirect: input.redirect,
        credentials: input.credentials,
        ...init,
      };
    } else {
      options = init;
    }
  } else {
    url = String(input);
    options = init;
  }

  // Call the C implementation
  return options
    ? _global.__internalFetch__(url, options)
    : _global.__internalFetch__(url);
};

// Implement Request class
if (typeof Request === "undefined") {
  class Request {
    url: string;
    method: string;
    headers: Headers;
    body: any;
    mode: string;
    credentials: string;
    cache: string;
    redirect: string;
    referrer: string;
    integrity: string;
    signal: AbortSignal | null;

    constructor(input: string | Request, init?: RequestInit) {
      if (typeof input === "string") {
        this.url = input;
      } else if (input instanceof Request) {
        this.url = input.url;
        this.method = input.method;
        this.headers = new Headers(input.headers);
        this.body = input.body;
        this.mode = input.mode;
        this.credentials = input.credentials;
        this.cache = input.cache;
        this.redirect = input.redirect;
        this.referrer = input.referrer;
        this.integrity = input.integrity;
        this.signal = input.signal;
      } else {
        this.url = String(input);
      }

      if (init) {
        if (init.method !== undefined) this.method = init.method;
        if (init.headers !== undefined) {
          this.headers =
            init.headers instanceof Headers
              ? init.headers
              : new Headers(init.headers as any);
        }
        if (init.body !== undefined) this.body = init.body;
        if (init.mode !== undefined) this.mode = init.mode;
        if (init.credentials !== undefined) this.credentials = init.credentials;
        if (init.cache !== undefined) this.cache = init.cache;
        if (init.redirect !== undefined) this.redirect = init.redirect;
        if (init.referrer !== undefined) this.referrer = init.referrer;
        if (init.integrity !== undefined) this.integrity = init.integrity;
        if (init.signal !== undefined) this.signal = init.signal as AbortSignal;
      }

      // Set defaults
      if (!this.method) this.method = "GET";
      if (!this.headers) this.headers = new Headers();
      if (!this.mode) this.mode = "cors";
      if (!this.credentials) this.credentials = "same-origin";
      if (!this.cache) this.cache = "default";
      if (!this.redirect) this.redirect = "follow";
      if (!this.referrer) this.referrer = "about:client";
      if (!this.integrity) this.integrity = "";
      if (this.signal === undefined) this.signal = null;
    }

    clone(): Request {
      return new Request(this);
    }
  }

  (globalThis as any).Request = Request;
}

// Stub implementation of AbortController and AbortSignal
if (typeof AbortController === "undefined") {
  class AbortSignal {
    aborted = false;
    reason: any = undefined;

    addEventListener(_type: string, _listener: any) {}
    removeEventListener(_type: string, _listener: any) {}
    dispatchEvent(_event: any): boolean {
      return true;
    }
  }

  (globalThis as any).AbortSignal = AbortSignal;

  class AbortController {
    signal: AbortSignal;

    constructor() {
      this.signal = new AbortSignal();
    }

    abort(_reason?: any) {
      this.signal.aborted = true;
      if (_reason !== undefined) {
        this.signal.reason = _reason;
      }
    }
  }

  (globalThis as any).AbortController = AbortController;
}

// Fix Headers iterators
if (typeof Headers !== "undefined") {
  const HeadersProto = (Headers as any).prototype;
  const originalEntries = HeadersProto.entries;
  const originalKeys = HeadersProto.keys;
  const originalValues = HeadersProto.values;

  function createIterator(array: any[]) {
    let index = 0;
    return {
      next() {
        if (index < array.length) {
          return { value: array[index++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }

  HeadersProto.entries = function () {
    const array = originalEntries.call(this);
    return createIterator(array);
  };

  HeadersProto.keys = function () {
    const array = originalKeys.call(this);
    return createIterator(array);
  };

  HeadersProto.values = function () {
    const array = originalValues.call(this);
    return createIterator(array);
  };

  HeadersProto[Symbol.iterator] = HeadersProto.entries;
}

// Add stubs for browser globals
if (typeof document === "undefined") {
  (globalThis as any).document = undefined;
}

if (typeof MessageChannel === "undefined") {
  class MessageChannel {
    port1: any;
    port2: any;

    constructor() {
      this.port1 = { postMessage: () => {}, onmessage: null };
      this.port2 = { postMessage: () => {}, onmessage: null };
    }
  }
  (globalThis as any).MessageChannel = MessageChannel;
}

if (typeof location === "undefined") {
  (globalThis as any).location = undefined;
}

export {};
