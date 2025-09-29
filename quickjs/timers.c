#include "timers.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/time.h>
#include <unistd.h>

// Timer structure for setTimeout and setInterval
struct Timer {
    int id;
    JSValue callback;
    JSContext* ctx;
    long long timeout_ms;
    long long created_time;
    long long last_execution_time;
    int executed;
    int is_interval;  // 0 for setTimeout, 1 for setInterval
    struct Timer* next;
};

// Global timer state
static struct Timer* timer_list = NULL;
static int next_timer_id = 1;

// Get current time in milliseconds
static long long get_current_time_ms() {
    struct timeval tv;
    gettimeofday(&tv, NULL);
    return (long long)tv.tv_sec * 1000 + tv.tv_usec / 1000;
}

// Add timer to the list
static void add_timer(struct Timer* timer) {
    timer->next = timer_list;
    timer_list = timer;
}

// Mark timer for removal instead of immediate removal
static void remove_timer(int timer_id) {
    struct Timer* timer = timer_list;
    while (timer) {
        if (timer->id == timer_id) {
            timer->executed = 1;  // Mark as executed so it gets cleaned up
            return;
        }
        timer = timer->next;
    }
}

// Initialize timer system
void timers_init(void) {
    timer_list = NULL;
    next_timer_id = 1;
}

// Check if there are active timers
int timers_has_active(void) {
    return timer_list != NULL;
}

// Execute pending timers
void timers_execute(void) {
    if (!timer_list) return;
    
    long long current_time = get_current_time_ms();
    struct Timer* timer = timer_list;
    
    // First pass: execute timers
    while (timer) {
        struct Timer* next_timer = timer->next; // Store next before potential modification
        int should_execute = 0;
        
        if (timer->is_interval) {
            // For intervals, check if enough time has passed since last execution
            if (timer->last_execution_time == 0) {
                // First execution - check against creation time
                should_execute = (current_time - timer->created_time >= timer->timeout_ms);
            } else {
                // Subsequent executions - check against last execution time
                should_execute = (current_time - timer->last_execution_time >= timer->timeout_ms);
            }
        } else {
            // For setTimeout, execute only once
            should_execute = (!timer->executed && (current_time - timer->created_time >= timer->timeout_ms));
        }
        
        if (should_execute) {
            // Call the JavaScript callback
            JSValue result = JS_Call(timer->ctx, timer->callback, JS_UNDEFINED, 0, NULL);
            if (JS_IsException(result)) {
                JSValue exception = JS_GetException(timer->ctx);
                const char* error = JS_ToCString(timer->ctx, exception);
                fprintf(stderr, "Timer callback error: %s\n", error ? error : "Unknown error");
                if (error) JS_FreeCString(timer->ctx, error);
                JS_FreeValue(timer->ctx, exception);
            }
            JS_FreeValue(timer->ctx, result);
            
            if (timer->is_interval) {
                // For intervals, update last execution time
                timer->last_execution_time = current_time;
            } else {
                // For setTimeout, mark as executed
                timer->executed = 1;
            }
        }
        timer = next_timer;
    }
    
    // Second pass: remove executed timers (both setTimeout and marked intervals)
    struct Timer** current = &timer_list;
    while (*current) {
        struct Timer* timer = *current;
        if (timer->executed) {
            *current = timer->next;
            JS_FreeValue(timer->ctx, timer->callback);
            free(timer);
        } else {
            current = &timer->next;
        }
    }
}

// Cleanup timer system
void timers_cleanup(JSContext* ctx) {
    while (timer_list) {
        struct Timer* timer = timer_list;
        timer_list = timer->next;
        JS_FreeValue(ctx, timer->callback);
        free(timer);
    }
}

// setTimeout implementation
JSValue js_setTimeout(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)this_val;
    
    
    if (argc < 2) {
        return JS_ThrowTypeError(ctx, "setTimeout requires 2 arguments");
    }
    
    if (!JS_IsFunction(ctx, argv[0])) {
        return JS_ThrowTypeError(ctx, "First argument must be a function");
    }
    
    int32_t timeout;
    if (JS_ToInt32(ctx, &timeout, argv[1])) {
        return JS_EXCEPTION;
    }
    
    if (timeout < 0) timeout = 0;
    
    
    struct Timer* timer = malloc(sizeof(struct Timer));
    if (!timer) {
        return JS_ThrowInternalError(ctx, "Failed to allocate timer");
    }
    
    timer->id = next_timer_id++;
    timer->callback = JS_DupValue(ctx, argv[0]);
    timer->ctx = ctx;
    timer->timeout_ms = timeout;
    timer->created_time = get_current_time_ms();
    timer->last_execution_time = 0;
    timer->executed = 0;
    timer->is_interval = 0;  // setTimeout is not an interval
    
    add_timer(timer);
    
    
    return JS_NewInt32(ctx, timer->id);
}

// clearTimeout implementation
JSValue js_clearTimeout(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)this_val;
    (void)ctx;
    
    if (argc < 1) {
        return JS_UNDEFINED;
    }
    
    int32_t timer_id;
    if (JS_ToInt32(ctx, &timer_id, argv[0])) {
        return JS_UNDEFINED;
    }
    
    remove_timer(timer_id);
    return JS_UNDEFINED;
}

// setInterval implementation
JSValue js_setInterval(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)this_val;
    
    if (argc < 2) {
        return JS_ThrowTypeError(ctx, "setInterval requires 2 arguments");
    }
    
    if (!JS_IsFunction(ctx, argv[0])) {
        return JS_ThrowTypeError(ctx, "First argument must be a function");
    }
    
    int32_t interval;
    if (JS_ToInt32(ctx, &interval, argv[1])) {
        return JS_EXCEPTION;
    }
    
    if (interval < 0) interval = 0;
    
    struct Timer* timer = malloc(sizeof(struct Timer));
    if (!timer) {
        return JS_ThrowInternalError(ctx, "Failed to allocate timer");
    }
    
    timer->id = next_timer_id++;
    timer->callback = JS_DupValue(ctx, argv[0]);
    timer->ctx = ctx;
    timer->timeout_ms = interval;
    timer->created_time = get_current_time_ms();
    timer->last_execution_time = 0;
    timer->executed = 0;
    timer->is_interval = 1;  // setInterval is an interval
    
    add_timer(timer);
    
    return JS_NewInt32(ctx, timer->id);
}

// clearInterval implementation (same as clearTimeout)
JSValue js_clearInterval(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)this_val;
    (void)ctx;
    
    if (argc < 1) {
        return JS_UNDEFINED;
    }
    
    int32_t timer_id;
    if (JS_ToInt32(ctx, &timer_id, argv[0])) {
        return JS_UNDEFINED;
    }
    
    remove_timer(timer_id);
    return JS_UNDEFINED;
}