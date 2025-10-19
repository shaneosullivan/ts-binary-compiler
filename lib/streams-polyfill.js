// Streams API polyfill for QuickJS
// Implements ReadableStream, WritableStream, and TransformStream

console.log('[Streams Polyfill] Loading web-streams-polyfill...');

// Import the web-streams-polyfill library which provides full Streams API support
// This is a mature, spec-compliant implementation
// We use the /polyfill/es5 export which is pre-transpiled to ES5
import 'web-streams-polyfill/polyfill/es5';

console.log('[Streams Polyfill] Streams API loaded successfully');

// Verify the APIs are available
if (typeof ReadableStream === 'undefined') {
  console.error('[Streams Polyfill] ERROR: ReadableStream not defined after polyfill!');
} else {
  console.log('[Streams Polyfill] ReadableStream available');
}

if (typeof WritableStream === 'undefined') {
  console.error('[Streams Polyfill] ERROR: WritableStream not defined after polyfill!');
} else {
  console.log('[Streams Polyfill] WritableStream available');
}

if (typeof TransformStream === 'undefined') {
  console.error('[Streams Polyfill] ERROR: TransformStream not defined after polyfill!');
} else {
  console.log('[Streams Polyfill] TransformStream available');
}

// Export to make it a module
export {};
