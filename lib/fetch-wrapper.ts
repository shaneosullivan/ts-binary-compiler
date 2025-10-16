// Fetch API wrapper for QuickJS environment
// The native fetch implementation now returns Promises directly with async response methods
// This module only needs to handle Request object normalization

/// <reference path="./quickjs.d.ts" />

// NOTE: Promise polyfill (core-js) is loaded before this file in build.sh

// CRITICAL: Store the native fetch BEFORE overwriting it
// The C code has already set globalThis.fetch by the time this module loads
const originalNativeFetch = (globalThis as any).fetch;

// Verify we captured the native function
if (typeof originalNativeFetch !== "function") {
  throw new Error(
    "fetch-wrapper: Native fetch not found! The C runtime must initialize fetch before the bundle runs."
  );
}

// Create a wrapper that normalizes Request objects and ensures Promises from JavaScript
// This is critical because the native fetch returns QuickJS native Promises which don't support subclassing
(globalThis as any).fetch = function (
  input: string | Request,
  init?: RequestInit
): Promise<Response> {
  // Handle different input types: string, Request object, or URL object
  let url: string;
  if (typeof input === "string") {
    url = input;
  } else if (input && typeof input === "object") {
    // Check if it's a Request object or URL object
    url = input.url || (input as any).href || String(input);
  } else {
    url = String(input);
  }
  const options =
    typeof input === "string"
      ? init
      : {
          method: input.method,
          headers: input.headers,
          ...init,
        };

  // Create a JavaScript Promise that wraps the native fetch
  // This ensures the Promise is created with the JavaScript Promise constructor (core-js)
  // rather than QuickJS's native Promise which doesn't support subclassing
  const jsPromise = new Promise<Response>((resolve, reject) => {
    try {
      const nativePromise = originalNativeFetch(url, options);

      // Chain the native promise to our JavaScript promise
      // Use a simple .then() call - don't try to be clever
      nativePromise.then(resolve, reject);
    } catch (error) {
      reject(error);
    }
  });

  return jsPromise;
};

// Stub implementation of AbortController and AbortSignal
// These are used by many SDKs for canceling requests
if (typeof AbortController === 'undefined') {
  class AbortSignal {
    aborted = false;
    reason: any = undefined;

    addEventListener(_type: string, _listener: any) {}
    removeEventListener(_type: string, _listener: any) {}
    dispatchEvent(_event: any): boolean { return true; }
  }

  (globalThis as any).AbortSignal = AbortSignal;

  class AbortController {
    signal: AbortSignal;

    constructor() {
      this.signal = new AbortSignal();
    }

    abort(_reason?: any) {
      // Stub - doesn't actually abort anything
      this.signal.aborted = true;
      if (_reason !== undefined) {
        this.signal.reason = _reason;
      }
    }
  }

  (globalThis as any).AbortController = AbortController;
}

// Fix Headers iterators - the C implementation returns arrays, but they need to be proper iterators
// This wraps the native methods to return iterator objects with next()
if (typeof Headers !== 'undefined') {
  const HeadersProto = (Headers as any).prototype;

  // Store original methods from C
  const originalEntries = HeadersProto.entries;
  const originalKeys = HeadersProto.keys;
  const originalValues = HeadersProto.values;

  // Helper to create an iterator from an array
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
      }
    };
  }

  // Override entries() to return proper iterator
  HeadersProto.entries = function() {
    const array = originalEntries.call(this);
    return createIterator(array);
  };

  // Override keys() to return proper iterator
  HeadersProto.keys = function() {
    const array = originalKeys.call(this);
    return createIterator(array);
  };

  // Override values() to return proper iterator
  HeadersProto.values = function() {
    const array = originalValues.call(this);
    return createIterator(array);
  };

  // Symbol.iterator should use entries
  HeadersProto[Symbol.iterator] = HeadersProto.entries;
}

// Export empty object to make this a module
export {};
