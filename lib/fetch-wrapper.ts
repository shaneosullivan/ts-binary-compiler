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
  const url = typeof input === "string" ? input : input.url;
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
      // The native promise's .then() will be called, but we immediately
      // resolve/reject our JS promise with the result
      const nativeThen = nativePromise.then;
      nativeThen.call(nativePromise, resolve, reject);
    } catch (error) {
      reject(error);
    }
  });

  return jsPromise;
};

// Export empty object to make this a module
export {};
