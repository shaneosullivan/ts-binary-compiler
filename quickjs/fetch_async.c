#include "fetch_async.h"
#include "blob.h"
#include <curl/curl.h>
#include <string.h>
#include <stdlib.h>

// Structure to hold response data
typedef struct {
    char* data;
    size_t size;
    size_t capacity;
} ResponseBuffer;

// Structure to hold a pending fetch request
typedef struct FetchRequest {
    CURL* curl_handle;
    ResponseBuffer response_body;
    ResponseBuffer response_headers;
    JSContext* ctx;
    JSValue resolve_func;
    JSValue reject_func;
    char* url;
    long http_code;
    struct FetchRequest* next;
} FetchRequest;

// Global state
static CURLM* multi_handle = NULL;
static FetchRequest* pending_requests = NULL;

// Callback for writing response body data
static size_t write_callback(void* contents, size_t size, size_t nmemb, void* userp) {
    size_t realsize = size * nmemb;
    ResponseBuffer* buf = (ResponseBuffer*)userp;

    // Expand buffer if needed
    if (buf->size + realsize + 1 > buf->capacity) {
        size_t new_capacity = buf->capacity == 0 ? 4096 : buf->capacity * 2;
        while (new_capacity < buf->size + realsize + 1) {
            new_capacity *= 2;
        }
        char* new_data = realloc(buf->data, new_capacity);
        if (!new_data) {
            return 0; // Out of memory
        }
        buf->data = new_data;
        buf->capacity = new_capacity;
    }

    memcpy(buf->data + buf->size, contents, realsize);
    buf->size += realsize;
    buf->data[buf->size] = '\0';

    return realsize;
}

// Callback for writing response headers
static size_t header_callback(void* contents, size_t size, size_t nmemb, void* userp) {
    return write_callback(contents, size, nmemb, userp);
}

// Initialize the async fetch system
void fetch_async_init(JSContext* ctx) {
    if (!multi_handle) {
        multi_handle = curl_multi_init();
    }
}

// Cleanup the async fetch system
void fetch_async_cleanup(void) {
    // Clean up all pending requests
    while (pending_requests) {
        FetchRequest* req = pending_requests;
        pending_requests = req->next;

        if (req->curl_handle) {
            curl_multi_remove_handle(multi_handle, req->curl_handle);
            curl_easy_cleanup(req->curl_handle);
        }

        free(req->response_body.data);
        free(req->response_headers.data);
        free(req->url);

        // Free JS values
        JS_FreeValue(req->ctx, req->resolve_func);
        JS_FreeValue(req->ctx, req->reject_func);

        free(req);
    }

    if (multi_handle) {
        curl_multi_cleanup(multi_handle);
        multi_handle = NULL;
    }
}

// Parse headers into a JavaScript object
static JSValue parse_headers(JSContext* ctx, const char* header_str) {
    JSValue headers_obj = JS_NewObject(ctx);
    if (!header_str || !*header_str) {
        return headers_obj;
    }

    char* headers_copy = strdup(header_str);
    if (!headers_copy) {
        return headers_obj;
    }

    char* line = strtok(headers_copy, "\r\n");
    while (line) {
        // Skip the status line (HTTP/1.1 200 OK)
        if (strncmp(line, "HTTP/", 5) != 0) {
            char* colon = strchr(line, ':');
            if (colon) {
                *colon = '\0';
                char* key = line;
                char* value = colon + 1;

                // Trim leading whitespace from value
                while (*value == ' ' || *value == '\t') {
                    value++;
                }

                // Convert key to lowercase
                for (char* p = key; *p; p++) {
                    if (*p >= 'A' && *p <= 'Z') {
                        *p = *p + 32;
                    }
                }

                JS_SetPropertyStr(ctx, headers_obj, key, JS_NewString(ctx, value));
            }
        }
        line = strtok(NULL, "\r\n");
    }

    free(headers_copy);
    return headers_obj;
}

// Response method implementations
static JSValue response_text_async(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)argc; (void)argv;

    JSValue body_data = JS_GetPropertyStr(ctx, this_val, "__body_data__");
    JSValue body_size_val = JS_GetPropertyStr(ctx, this_val, "__body_size__");

    uint64_t body_size = 0;
    JS_ToIndex(ctx, &body_size, body_size_val);

    const char* body_ptr = NULL;
    if (!JS_IsNull(body_data)) {
        int64_t ptr_val;
        JS_ToInt64(ctx, &ptr_val, body_data);
        body_ptr = (const char*)(uintptr_t)ptr_val;
    }

    JSValue text_val;
    if (body_size > 0 && body_ptr) {
        text_val = JS_NewStringLen(ctx, body_ptr, (size_t)body_size);
    } else {
        text_val = JS_NewString(ctx, "");
    }

    JS_FreeValue(ctx, body_data);
    JS_FreeValue(ctx, body_size_val);

    // Wrap in resolved promise
    JSValue global = JS_GetGlobalObject(ctx);
    JSValue promise_ctor = JS_GetPropertyStr(ctx, global, "Promise");
    JSValue resolve_func = JS_GetPropertyStr(ctx, promise_ctor, "resolve");
    JSValue argv_arr[1] = { text_val };
    JSValue promise = JS_Call(ctx, resolve_func, promise_ctor, 1, argv_arr);
    JS_FreeValue(ctx, global);
    JS_FreeValue(ctx, promise_ctor);
    JS_FreeValue(ctx, resolve_func);
    JS_FreeValue(ctx, text_val);

    return promise;
}

static JSValue response_json_async(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)argc; (void)argv;

    JSValue body_data = JS_GetPropertyStr(ctx, this_val, "__body_data__");
    JSValue body_size_val = JS_GetPropertyStr(ctx, this_val, "__body_size__");

    uint64_t body_size = 0;
    JS_ToIndex(ctx, &body_size, body_size_val);

    const char* body_ptr = NULL;
    if (!JS_IsNull(body_data)) {
        int64_t ptr_val;
        JS_ToInt64(ctx, &ptr_val, body_data);
        body_ptr = (const char*)(uintptr_t)ptr_val;
    }

    JSValue global = JS_GetGlobalObject(ctx);
    JSValue json_val;
    if (body_size > 0 && body_ptr) {
        JSValue text = JS_NewStringLen(ctx, body_ptr, (size_t)body_size);
        JSValue json_obj = JS_GetPropertyStr(ctx, global, "JSON");
        JSValue parse_func = JS_GetPropertyStr(ctx, json_obj, "parse");
        JSValue argv_arr[1] = { text };
        json_val = JS_Call(ctx, parse_func, json_obj, 1, argv_arr);
        JS_FreeValue(ctx, text);
        JS_FreeValue(ctx, json_obj);
        JS_FreeValue(ctx, parse_func);
    } else {
        json_val = JS_NULL;
    }

    JS_FreeValue(ctx, body_data);
    JS_FreeValue(ctx, body_size_val);

    // Wrap in resolved promise
    JSValue promise_ctor = JS_GetPropertyStr(ctx, global, "Promise");
    JSValue resolve_func = JS_GetPropertyStr(ctx, promise_ctor, "resolve");
    JSValue argv_arr2[1] = { json_val };
    JSValue promise = JS_Call(ctx, resolve_func, promise_ctor, 1, argv_arr2);
    JS_FreeValue(ctx, global);
    JS_FreeValue(ctx, promise_ctor);
    JS_FreeValue(ctx, resolve_func);
    JS_FreeValue(ctx, json_val);

    return promise;
}

static JSValue response_blob_async(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)argc; (void)argv;

    JSValue body_data = JS_GetPropertyStr(ctx, this_val, "__body_data__");
    JSValue body_size_val = JS_GetPropertyStr(ctx, this_val, "__body_size__");
    JSValue headers_obj = JS_GetPropertyStr(ctx, this_val, "headers");

    uint64_t body_size = 0;
    JS_ToIndex(ctx, &body_size, body_size_val);

    const uint8_t* body_ptr = NULL;
    if (!JS_IsNull(body_data)) {
        int64_t ptr_val;
        JS_ToInt64(ctx, &ptr_val, body_data);
        body_ptr = (const uint8_t*)(uintptr_t)ptr_val;
    }

    // Get content-type from headers
    const char* content_type = "application/octet-stream";
    const char* content_type_allocated = NULL;
    if (JS_IsObject(headers_obj)) {
        JSValue ct_val = JS_GetPropertyStr(ctx, headers_obj, "content-type");
        if (!JS_IsUndefined(ct_val)) {
            content_type_allocated = JS_ToCString(ctx, ct_val);
            if (content_type_allocated) {
                content_type = content_type_allocated;
            }
        }
        JS_FreeValue(ctx, ct_val);
    }

    // Create blob
    JSValue blob_val = blob_create(ctx, body_ptr, (size_t)body_size, content_type);

    if (content_type_allocated) {
        JS_FreeCString(ctx, content_type_allocated);
    }

    JS_FreeValue(ctx, body_data);
    JS_FreeValue(ctx, body_size_val);
    JS_FreeValue(ctx, headers_obj);

    // Wrap in resolved promise
    JSValue global = JS_GetGlobalObject(ctx);
    JSValue promise_ctor = JS_GetPropertyStr(ctx, global, "Promise");
    JSValue resolve_func = JS_GetPropertyStr(ctx, promise_ctor, "resolve");
    JSValue argv_arr[1] = { blob_val };
    JSValue promise = JS_Call(ctx, resolve_func, promise_ctor, 1, argv_arr);
    JS_FreeValue(ctx, global);
    JS_FreeValue(ctx, promise_ctor);
    JS_FreeValue(ctx, resolve_func);
    JS_FreeValue(ctx, blob_val);

    return promise;
}

// Create a response object
static JSValue create_response_object(JSContext* ctx, FetchRequest* req) {
    JSValue response_obj = JS_NewObject(ctx);

    // Set status
    JS_SetPropertyStr(ctx, response_obj, "status", JS_NewInt32(ctx, req->http_code));

    // Set ok
    int ok = req->http_code >= 200 && req->http_code < 300;
    JS_SetPropertyStr(ctx, response_obj, "ok", JS_NewBool(ctx, ok));

    // Set statusText
    const char* status_text = "OK";
    if (req->http_code >= 400) {
        status_text = "Error";
    }
    JS_SetPropertyStr(ctx, response_obj, "statusText", JS_NewString(ctx, status_text));

    // Parse and set headers
    JSValue headers_obj = parse_headers(ctx, req->response_headers.data);
    JS_SetPropertyStr(ctx, response_obj, "headers", headers_obj);

    // Store the response body data
    char* body_copy = NULL;
    size_t body_size = 0;
    if (req->response_body.size > 0) {
        body_copy = malloc(req->response_body.size);
        if (body_copy) {
            memcpy(body_copy, req->response_body.data, req->response_body.size);
            body_size = req->response_body.size;
        }
    }

    // Add text() method
    JSValue text_func = JS_NewCFunction(ctx, response_text_async, "text", 0);
    JS_SetPropertyStr(ctx, response_obj, "text", text_func);

    // Add json() method
    JSValue json_func = JS_NewCFunction(ctx, response_json_async, "json", 0);
    JS_SetPropertyStr(ctx, response_obj, "json", json_func);

    // Add blob() method
    JSValue blob_func = JS_NewCFunction(ctx, response_blob_async, "blob", 0);
    JS_SetPropertyStr(ctx, response_obj, "blob", blob_func);

    // Store body data as internal properties (store pointer as int64)
    if (body_copy) {
        JS_SetPropertyStr(ctx, response_obj, "__body_data__", JS_NewInt64(ctx, (int64_t)(uintptr_t)body_copy));
        JS_SetPropertyStr(ctx, response_obj, "__body_size__", JS_NewInt64(ctx, body_size));
    } else {
        JS_SetPropertyStr(ctx, response_obj, "__body_data__", JS_NULL);
        JS_SetPropertyStr(ctx, response_obj, "__body_size__", JS_NewInt32(ctx, 0));
    }

    return response_obj;
}

// Process pending fetch requests (called from event loop)
void fetch_async_process(JSContext* ctx) {
    if (!multi_handle) {
        return;
    }

    int still_running = 0;
    curl_multi_perform(multi_handle, &still_running);

    // Check for completed transfers
    CURLMsg* msg;
    int msgs_left;
    while ((msg = curl_multi_info_read(multi_handle, &msgs_left))) {
        if (msg->msg == CURLMSG_DONE) {
            CURL* curl_handle = msg->easy_handle;
            CURLcode result = msg->data.result;

            // Find the corresponding request
            FetchRequest* req = pending_requests;
            FetchRequest* prev = NULL;
            while (req) {
                if (req->curl_handle == curl_handle) {
                    break;
                }
                prev = req;
                req = req->next;
            }

            if (req) {
                // Remove from pending list
                if (prev) {
                    prev->next = req->next;
                } else {
                    pending_requests = req->next;
                }

                // Get HTTP response code
                curl_easy_getinfo(curl_handle, CURLINFO_RESPONSE_CODE, &req->http_code);

                if (result == CURLE_OK) {
                    // Create response object
                    JSValue response = create_response_object(ctx, req);

                    // Call resolve function
                    JSValue ret = JS_Call(ctx, req->resolve_func, JS_UNDEFINED, 1, &response);
                    JS_FreeValue(ctx, ret);
                    JS_FreeValue(ctx, response);
                } else {
                    // Create error
                    const char* error_msg = curl_easy_strerror(result);
                    JSValue error = JS_NewError(ctx);
                    JS_SetPropertyStr(ctx, error, "message", JS_NewString(ctx, error_msg));

                    // Call reject function
                    JSValue ret = JS_Call(ctx, req->reject_func, JS_UNDEFINED, 1, &error);
                    JS_FreeValue(ctx, ret);
                    JS_FreeValue(ctx, error);
                }

                // Cleanup
                curl_multi_remove_handle(multi_handle, curl_handle);
                curl_easy_cleanup(curl_handle);
                free(req->response_body.data);
                free(req->response_headers.data);
                free(req->url);
                JS_FreeValue(ctx, req->resolve_func);
                JS_FreeValue(ctx, req->reject_func);
                free(req);
            }
        }
    }
}

// Check if there are active fetch requests
int fetch_async_has_active(void) {
    return pending_requests != NULL;
}

// JavaScript fetch function (returns Promise)
JSValue js_fetch_async(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    if (argc < 1) {
        return JS_ThrowTypeError(ctx, "fetch requires at least 1 argument");
    }

    // Get URL
    const char* url = JS_ToCString(ctx, argv[0]);
    if (!url) {
        return JS_EXCEPTION;
    }

    // Create fetch request
    FetchRequest* req = (FetchRequest*)calloc(1, sizeof(FetchRequest));
    if (!req) {
        JS_FreeCString(ctx, url);
        return JS_ThrowOutOfMemory(ctx);
    }

    req->url = strdup(url);
    req->ctx = ctx;
    JS_FreeCString(ctx, url);

    // Initialize response buffers
    req->response_body.data = NULL;
    req->response_body.size = 0;
    req->response_body.capacity = 0;
    req->response_headers.data = NULL;
    req->response_headers.size = 0;
    req->response_headers.capacity = 0;

    // Create curl handle
    req->curl_handle = curl_easy_init();
    if (!req->curl_handle) {
        free(req->url);
        free(req);
        return JS_ThrowInternalError(ctx, "Failed to initialize curl");
    }

    // Set curl options
    curl_easy_setopt(req->curl_handle, CURLOPT_URL, req->url);
    curl_easy_setopt(req->curl_handle, CURLOPT_WRITEFUNCTION, write_callback);
    curl_easy_setopt(req->curl_handle, CURLOPT_WRITEDATA, &req->response_body);
    curl_easy_setopt(req->curl_handle, CURLOPT_HEADERFUNCTION, header_callback);
    curl_easy_setopt(req->curl_handle, CURLOPT_HEADERDATA, &req->response_headers);
    curl_easy_setopt(req->curl_handle, CURLOPT_FOLLOWLOCATION, 1L);

    // Handle options (method, headers, body)
    if (argc >= 2 && JS_IsObject(argv[1])) {
        JSValue options = argv[1];

        // Method
        JSValue method_val = JS_GetPropertyStr(ctx, options, "method");
        if (!JS_IsUndefined(method_val)) {
            const char* method = JS_ToCString(ctx, method_val);
            if (method) {
                curl_easy_setopt(req->curl_handle, CURLOPT_CUSTOMREQUEST, method);
                JS_FreeCString(ctx, method);
            }
        }
        JS_FreeValue(ctx, method_val);

        // Headers
        JSValue headers_val = JS_GetPropertyStr(ctx, options, "headers");
        if (JS_IsObject(headers_val)) {
            struct curl_slist* headers = NULL;
            JSPropertyEnum* props;
            uint32_t prop_count;
            if (JS_GetOwnPropertyNames(ctx, &props, &prop_count, headers_val, JS_GPN_STRING_MASK | JS_GPN_ENUM_ONLY) == 0) {
                for (uint32_t i = 0; i < prop_count; i++) {
                    JSValue key = JS_AtomToString(ctx, props[i].atom);
                    JSValue val = JS_GetProperty(ctx, headers_val, props[i].atom);

                    const char* key_str = JS_ToCString(ctx, key);
                    const char* val_str = JS_ToCString(ctx, val);

                    if (key_str && val_str) {
                        char* header = (char*)malloc(strlen(key_str) + strlen(val_str) + 3);
                        sprintf(header, "%s: %s", key_str, val_str);
                        headers = curl_slist_append(headers, header);
                        free(header);
                    }

                    JS_FreeCString(ctx, key_str);
                    JS_FreeCString(ctx, val_str);
                    JS_FreeValue(ctx, key);
                    JS_FreeValue(ctx, val);
                }
                js_free(ctx, props);
            }

            if (headers) {
                curl_easy_setopt(req->curl_handle, CURLOPT_HTTPHEADER, headers);
            }
        }
        JS_FreeValue(ctx, headers_val);

        // Body
        JSValue body_val = JS_GetPropertyStr(ctx, options, "body");
        if (!JS_IsUndefined(body_val)) {
            const char* body = JS_ToCString(ctx, body_val);
            if (body) {
                curl_easy_setopt(req->curl_handle, CURLOPT_POSTFIELDS, body);
                // Note: We're not freeing body here because curl needs it during the request
                // This is a potential memory leak that should be fixed
            }
        }
        JS_FreeValue(ctx, body_val);
    }

    // Create promise - JS_NewPromiseCapability returns an array [promise, resolve, reject]
    JSValue resolving_funcs[2];
    JSValue promise = JS_NewPromiseCapability(ctx, resolving_funcs);

    // Store resolve and reject functions
    req->resolve_func = JS_DupValue(ctx, resolving_funcs[0]);
    req->reject_func = JS_DupValue(ctx, resolving_funcs[1]);

    // Free the temporary array values
    JS_FreeValue(ctx, resolving_funcs[0]);
    JS_FreeValue(ctx, resolving_funcs[1]);

    // Add to pending list
    req->next = pending_requests;
    pending_requests = req;

    // Add to multi handle
    curl_multi_add_handle(multi_handle, req->curl_handle);

    return promise;
}
