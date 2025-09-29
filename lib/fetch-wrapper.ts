// Fetch API wrapper for QuickJS environment
// This module provides a standard Promise-based fetch implementation
// that wraps the synchronous QuickJS fetch function

/// <reference path="./quickjs.d.ts" />

// Store the original synchronous fetch function if it exists
const originalSyncFetch = (globalThis as any).fetch;

// Create a wrapper that converts the synchronous QuickJS fetch to Promise-based
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

  // Use setTimeout to simulate async behavior - now supported in QuickJS
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Call the original synchronous QuickJS fetch function
        const syncResponse = originalSyncFetch(url, options);

        // Create a Promise-wrapped response
        const response: Response = {
          status: syncResponse.status,
          statusText: syncResponse.statusText,
          ok: syncResponse.ok,
          headers: syncResponse.headers as any, // Headers can be simplified for QuickJS
          redirected: false,
          type: "basic" as ResponseType,
          url: url,
          body: null, // QuickJS doesn't support ReadableStream
          bodyUsed: false,
          text(): Promise<string> {
            return Promise.resolve(syncResponse.text());
          },
          json(): Promise<any> {
            // Get the text first to check if it's empty
            const text = syncResponse.text();
            if (!text || !text.trim()) {
              return Promise.resolve(null);
            }
            try {
              return Promise.resolve(syncResponse.json());
            } catch (error) {
              // Handle empty or invalid JSON responses
              return Promise.reject(new Error("Response body is not valid JSON"));
            }
          },
          arrayBuffer(): Promise<ArrayBuffer> {
            const text = syncResponse.text();
            const encoder = new TextEncoder();
            return Promise.resolve(encoder.encode(text).buffer);
          },
          blob(): Promise<Blob> {
            // QuickJS doesn't have Blob, return a minimal implementation
            return Promise.resolve({
              size: syncResponse.text().length,
              type: "text/plain",
            } as any);
          },
          formData(): Promise<FormData> {
            // QuickJS doesn't have FormData, throw an error
            return Promise.reject(
              new Error("FormData not supported in QuickJS environment")
            );
          },
          bytes: (() => {
            const text = syncResponse.text();
            const encoder = new TextEncoder();
            return Promise.resolve(encoder.encode(text) as any);
          }) as any,
          clone(): Response {
            // Return a shallow clone
            return { ...response } as Response;
          },
        };

        resolve(response);
      } catch (error) {
        reject(error);
      }
    }, 1);
  });
};

// Export empty object to make this a module
export {};
