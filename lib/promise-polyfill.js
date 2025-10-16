// Promise polyfill for QuickJS using core-js
// QuickJS's native Promise doesn't support subclassing, so we use core-js

// Import core-js Promise - this will set up Promise on the global object
// We use the 'features' path which provides the full implementation
import 'core-js/features/promise';

// Log that polyfill loaded
console.log('[Promise Polyfill] Core-js Promise loaded - supports subclassing');

// Export to make it a module
export {};
