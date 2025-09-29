#ifndef TIMERS_H
#define TIMERS_H

#include <quickjs/quickjs.h>

// Initialize timer system
void timers_init(void);

// Cleanup timer system
void timers_cleanup(JSContext* ctx);

// Execute pending timers
void timers_execute(void);

// Check if there are active timers
int timers_has_active(void);

// JavaScript timer functions
JSValue js_setTimeout(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv);
JSValue js_clearTimeout(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv);
JSValue js_setInterval(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv);
JSValue js_clearInterval(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv);

#endif // TIMERS_H