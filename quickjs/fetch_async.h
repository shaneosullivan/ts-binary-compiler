#ifndef FETCH_ASYNC_H
#define FETCH_ASYNC_H

#include <quickjs/quickjs.h>

// Initialize the async fetch system
void fetch_async_init(JSContext* ctx);

// Cleanup the async fetch system
void fetch_async_cleanup(void);

// Process pending fetch requests (called from event loop)
void fetch_async_process(JSContext* ctx);

// Check if there are active fetch requests
int fetch_async_has_active(void);

// JavaScript fetch function (returns Promise)
JSValue js_fetch_async(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv);

#endif // FETCH_ASYNC_H
