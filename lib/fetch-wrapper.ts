// Fetch API wrapper for QuickJS environment
// The native fetch implementation now returns Promises directly with async response methods
// This module only needs to handle Request object normalization

/// <reference path="./quickjs.d.ts" />

// Store the original native fetch function
const originalNativeFetch = (globalThis as any).fetch;

// Create a wrapper that normalizes Request objects to url/options
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

  // Call the native fetch - it already returns a Promise
  return originalNativeFetch(url, options);
};

// Export empty object to make this a module
export {};
