#include <quickjs/quickjs.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <curl/curl.h>
#include <unistd.h>
#include "timers.h"
#include "blob.h"

// Enhanced response structure with headers and status
struct HttpResponse {
    char* data;
    size_t size;
    char* headers;
    size_t header_size;
    long status_code;
    char* status_text;
};


// Write callback for response body
static size_t WriteCallback(void* contents, size_t size, size_t nmemb, struct HttpResponse* response) {
    size_t totalSize = size * nmemb;
    char* ptr = realloc(response->data, response->size + totalSize + 1);
    if (!ptr) {
        printf("Not enough memory (realloc returned NULL)\n");
        return 0;
    }
    
    response->data = ptr;
    memcpy(&(response->data[response->size]), contents, totalSize);
    response->size += totalSize;
    response->data[response->size] = 0;
    
    return totalSize;
}

// Header callback for response headers
static size_t HeaderCallback(char* buffer, size_t size, size_t nitems, struct HttpResponse* response) {
    size_t totalSize = size * nitems;
    char* ptr = realloc(response->headers, response->header_size + totalSize + 1);
    if (!ptr) {
        return 0;
    }
    
    response->headers = ptr;
    memcpy(&(response->headers[response->header_size]), buffer, totalSize);
    response->header_size += totalSize;
    response->headers[response->header_size] = 0;
    
    return totalSize;
}

// Parse status text from HTTP status code
static const char* getStatusText(long status_code) {
    switch (status_code) {
        case 200: return "OK";
        case 201: return "Created";
        case 204: return "No Content";
        case 400: return "Bad Request";
        case 401: return "Unauthorized";
        case 403: return "Forbidden";
        case 404: return "Not Found";
        case 405: return "Method Not Allowed";
        case 500: return "Internal Server Error";
        case 502: return "Bad Gateway";
        case 503: return "Service Unavailable";
        default: return "Unknown";
    }
}

// Response methods
static JSValue response_text(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)argc; (void)argv;
    JSValue responseData = JS_GetPropertyStr(ctx, this_val, "_data");
    if (JS_IsException(responseData)) return responseData;
    
    const char* data = JS_ToCString(ctx, responseData);
    JSValue result = JS_NewString(ctx, data ? data : "");
    if (data) JS_FreeCString(ctx, data);
    JS_FreeValue(ctx, responseData);
    return result;
}

static JSValue response_json(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)argc; (void)argv;
    JSValue responseData = JS_GetPropertyStr(ctx, this_val, "_data");
    if (JS_IsException(responseData)) return responseData;
    
    const char* data = JS_ToCString(ctx, responseData);
    JSValue result = JS_UNDEFINED;
    if (data && strlen(data) > 0) {
        result = JS_ParseJSON(ctx, data, strlen(data), "<response>");
        if (JS_IsException(result)) {
            JS_FreeValue(ctx, result);
            result = JS_ThrowSyntaxError(ctx, "Invalid JSON in response");
        }
    } else {
        // For empty responses (like 204 No Content), return null instead of throwing error
        result = JS_NULL;
    }
    
    if (data) JS_FreeCString(ctx, data);
    JS_FreeValue(ctx, responseData);
    return result;
}

static JSValue response_arrayBuffer(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)argc; (void)argv;
    JSValue responseData = JS_GetPropertyStr(ctx, this_val, "_data");
    if (JS_IsException(responseData)) return responseData;

    const char* data = JS_ToCString(ctx, responseData);
    JSValue result = JS_UNDEFINED;
    if (data) {
        size_t len = strlen(data);
        result = JS_NewArrayBuffer(ctx, (uint8_t*)data, len, NULL, NULL, 0);
    } else {
        result = JS_NewArrayBuffer(ctx, NULL, 0, NULL, NULL, 0);
    }

    if (data) JS_FreeCString(ctx, data);
    JS_FreeValue(ctx, responseData);
    return result;
}

static JSValue response_blob(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)argc; (void)argv;
    JSValue responseData = JS_GetPropertyStr(ctx, this_val, "_data");
    if (JS_IsException(responseData)) return responseData;

    // Get content type from headers
    JSValue headers_obj = JS_GetPropertyStr(ctx, this_val, "headers");
    const char* content_type = "text/plain";
    const char* content_type_allocated = NULL;

    if (JS_IsObject(headers_obj)) {
        JSValue content_type_val = JS_GetPropertyStr(ctx, headers_obj, "content-type");
        if (!JS_IsUndefined(content_type_val)) {
            content_type_allocated = JS_ToCString(ctx, content_type_val);
            if (content_type_allocated) {
                content_type = content_type_allocated;
            }
        }
        JS_FreeValue(ctx, content_type_val);
    }
    JS_FreeValue(ctx, headers_obj);

    const char* data = JS_ToCString(ctx, responseData);
    JSValue blob = JS_UNDEFINED;

    if (data) {
        size_t len = strlen(data);
        blob = blob_create(ctx, (const uint8_t*)data, len, content_type);
        JS_FreeCString(ctx, data);
    } else {
        blob = blob_create(ctx, NULL, 0, content_type);
    }

    // Free content type if it was allocated
    if (content_type_allocated) {
        JS_FreeCString(ctx, content_type_allocated);
    }

    JS_FreeValue(ctx, responseData);
    return blob;
}

// Console log implementation
static JSValue js_console_log(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)this_val;
    for (int i = 0; i < argc; i++) {
        const char* str = JS_ToCString(ctx, argv[i]);
        if (str) {
            printf("%s", str);
            if (i < argc - 1) printf(" ");
            JS_FreeCString(ctx, str);
        }
    }
    printf("\n");
    return JS_UNDEFINED;
}




// Main fetch implementation
static JSValue js_fetch(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)this_val;
    if (argc < 1) {
        return JS_ThrowTypeError(ctx, "fetch requires at least 1 argument");
    }
    
    const char* url = JS_ToCString(ctx, argv[0]);
    if (!url) {
        return JS_EXCEPTION;
    }
    
    
    // Parse options object
    const char* method = "GET";
    const char* body = NULL;
    JSValue headers_obj = JS_UNDEFINED;
    
    if (argc > 1 && JS_IsObject(argv[1])) {
        // Get method
        JSValue method_val = JS_GetPropertyStr(ctx, argv[1], "method");
        if (!JS_IsUndefined(method_val)) {
            const char* temp_method = JS_ToCString(ctx, method_val);
            if (temp_method) {
                method = temp_method;
            }
        }
        JS_FreeValue(ctx, method_val);
        
        // Get body
        JSValue body_val = JS_GetPropertyStr(ctx, argv[1], "body");
        if (!JS_IsUndefined(body_val)) {
            body = JS_ToCString(ctx, body_val);
        }
        JS_FreeValue(ctx, body_val);
        
        // Get headers
        headers_obj = JS_GetPropertyStr(ctx, argv[1], "headers");
    }
    
    CURL* curl = curl_easy_init();
    if (!curl) {
        JS_FreeCString(ctx, url);
        if (strcmp(method, "GET") != 0) JS_FreeCString(ctx, method);
        if (body) JS_FreeCString(ctx, body);
        JS_FreeValue(ctx, headers_obj);
        return JS_ThrowInternalError(ctx, "Failed to initialize curl");
    }
    
    struct HttpResponse response = {0};
    
    // Basic curl setup
    curl_easy_setopt(curl, CURLOPT_URL, url);
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response);
    curl_easy_setopt(curl, CURLOPT_HEADERFUNCTION, HeaderCallback);
    curl_easy_setopt(curl, CURLOPT_HEADERDATA, &response);
    curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);
    curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
    curl_easy_setopt(curl, CURLOPT_USERAGENT, "QuickJS-Fetch/1.0");
    
    // Set HTTP method
    if (strcasecmp(method, "POST") == 0) {
        curl_easy_setopt(curl, CURLOPT_POST, 1L);
    } else if (strcasecmp(method, "PUT") == 0) {
        curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "PUT");
    } else if (strcasecmp(method, "DELETE") == 0) {
        curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "DELETE");
    } else if (strcasecmp(method, "PATCH") == 0) {
        curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "PATCH");
    } else if (strcasecmp(method, "HEAD") == 0) {
        curl_easy_setopt(curl, CURLOPT_NOBODY, 1L);
    } else if (strcasecmp(method, "OPTIONS") == 0) {
        curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "OPTIONS");
    }
    
    // Set request body
    if (body && strlen(body) > 0) {
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, body);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDSIZE, strlen(body));
    }
    
    // Set headers
    struct curl_slist* header_list = NULL;
    if (JS_IsObject(headers_obj)) {
        JSPropertyEnum* tab;
        uint32_t len;
        if (JS_GetOwnPropertyNames(ctx, &tab, &len, headers_obj, JS_GPN_STRING_MASK) == 0) {
            for (uint32_t i = 0; i < len; i++) {
                JSValue key = JS_AtomToString(ctx, tab[i].atom);
                JSValue val = JS_GetProperty(ctx, headers_obj, tab[i].atom);
                
                const char* header_name = JS_ToCString(ctx, key);
                const char* header_value = JS_ToCString(ctx, val);
                
                if (header_name && header_value) {
                    char* header_line = malloc(strlen(header_name) + strlen(header_value) + 4);
                    sprintf(header_line, "%s: %s", header_name, header_value);
                    header_list = curl_slist_append(header_list, header_line);
                    free(header_line);
                }
                
                if (header_name) JS_FreeCString(ctx, header_name);
                if (header_value) JS_FreeCString(ctx, header_value);
                JS_FreeValue(ctx, key);
                JS_FreeValue(ctx, val);
            }
            js_free(ctx, tab);
        }
    }
    
    if (header_list) {
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, header_list);
    }
    
    // Perform request
    CURLcode res = curl_easy_perform(curl);
    
    // Get status code
    curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &response.status_code);
    response.status_text = strdup(getStatusText(response.status_code));
    
    // Cleanup curl
    if (header_list) curl_slist_free_all(header_list);
    curl_easy_cleanup(curl);
    
    // Cleanup JS strings
    JS_FreeCString(ctx, url);
    if (method && strcasecmp(method, "GET") != 0) JS_FreeCString(ctx, method);
    if (body) JS_FreeCString(ctx, body);
    JS_FreeValue(ctx, headers_obj);
    
    if (res != CURLE_OK) {
        if (response.data) free(response.data);
        if (response.headers) free(response.headers);
        if (response.status_text) free(response.status_text);
        char error_msg[256];
        snprintf(error_msg, sizeof(error_msg), "Fetch failed: %s", curl_easy_strerror(res));
        return JS_ThrowInternalError(ctx, "%s", error_msg);
    }
    
    // Create response object
    JSValue responseObj = JS_NewObject(ctx);
    
    // Add response methods
    JS_SetPropertyStr(ctx, responseObj, "text", JS_NewCFunction(ctx, response_text, "text", 0));
    JS_SetPropertyStr(ctx, responseObj, "json", JS_NewCFunction(ctx, response_json, "json", 0));
    JS_SetPropertyStr(ctx, responseObj, "arrayBuffer", JS_NewCFunction(ctx, response_arrayBuffer, "arrayBuffer", 0));
    JS_SetPropertyStr(ctx, responseObj, "blob", JS_NewCFunction(ctx, response_blob, "blob", 0));
    
    // Add response properties
    JS_SetPropertyStr(ctx, responseObj, "status", JS_NewInt32(ctx, response.status_code));
    JS_SetPropertyStr(ctx, responseObj, "statusText", JS_NewString(ctx, response.status_text));
    JS_SetPropertyStr(ctx, responseObj, "ok", JS_NewBool(ctx, response.status_code >= 200 && response.status_code < 300));
    JS_SetPropertyStr(ctx, responseObj, "_data", JS_NewString(ctx, response.data ? response.data : ""));
    
    // Parse and add response headers
    JSValue headers_response = JS_NewObject(ctx);
    if (response.headers) {
        char* headers_copy = strdup(response.headers);
        char* line = strtok(headers_copy, "\r\n");
        while (line != NULL) {
            char* colon = strchr(line, ':');
            if (colon) {
                *colon = '\0';
                char* header_name = line;
                char* header_value = colon + 1;
                
                // Trim whitespace
                while (*header_value == ' ') header_value++;
                
                JS_SetPropertyStr(ctx, headers_response, header_name, JS_NewString(ctx, header_value));
            }
            line = strtok(NULL, "\r\n");
        }
        free(headers_copy);
    }
    JS_SetPropertyStr(ctx, responseObj, "headers", headers_response);
    
    // Cleanup
    if (response.data) free(response.data);
    if (response.headers) free(response.headers);
    if (response.status_text) free(response.status_text);
    
    return responseObj;
}

extern const char* qjsc_bundle_string;
extern const uint32_t qjsc_bundle_size;

int main(int argc, char** argv) {
    (void)argc; (void)argv;
    curl_global_init(CURL_GLOBAL_DEFAULT);
    
    JSRuntime* rt = JS_NewRuntime();
    if (!rt) {
        fprintf(stderr, "Failed to create JS runtime\n");
        return 1;
    }
    
    JSContext* ctx = JS_NewContext(rt);
    if (!ctx) {
        fprintf(stderr, "Failed to create JS context\n");
        JS_FreeRuntime(rt);
        return 1;
    }
    
    // Initialize timer system
    timers_init();

    // Initialize Blob class
    blob_init(ctx);

    // Add fetch and console to global object
    JSValue global = JS_GetGlobalObject(ctx);
    JS_SetPropertyStr(ctx, global, "fetch", JS_NewCFunction(ctx, js_fetch, "fetch", 2));
    
    // Add setTimeout and clearTimeout functions
    JS_SetPropertyStr(ctx, global, "setTimeout", JS_NewCFunction(ctx, js_setTimeout, "setTimeout", 2));
    JS_SetPropertyStr(ctx, global, "clearTimeout", JS_NewCFunction(ctx, js_clearTimeout, "clearTimeout", 1));
    
    // Add setInterval and clearInterval functions
    JS_SetPropertyStr(ctx, global, "setInterval", JS_NewCFunction(ctx, js_setInterval, "setInterval", 2));
    JS_SetPropertyStr(ctx, global, "clearInterval", JS_NewCFunction(ctx, js_clearInterval, "clearInterval", 1));
    
    // Add console object with log method
    JSValue console_obj = JS_NewObject(ctx);
    JS_SetPropertyStr(ctx, console_obj, "log", JS_NewCFunction(ctx, js_console_log, "log", 1));
    JS_SetPropertyStr(ctx, global, "console", console_obj);
    
    JS_FreeValue(ctx, global);
    
    // Execute bundled JS
    JSValue result = JS_Eval(ctx, qjsc_bundle_string, strlen(qjsc_bundle_string), "<bundle>", JS_EVAL_TYPE_GLOBAL);
    
    if (JS_IsException(result)) {
        JSValue exception = JS_GetException(ctx);
        const char* error = JS_ToCString(ctx, exception);
        fprintf(stderr, "JS Error: %s\n", error);
        JS_FreeCString(ctx, error);
        JS_FreeValue(ctx, exception);
    }
    
    JS_FreeValue(ctx, result);
    
    // Run timer event loop with job queue execution
    while (timers_has_active()) {
        timers_execute();
        
        // Execute ALL pending jobs (promises) - keep going until none are left
        JSContext* ctx_ptr = NULL;
        while (JS_ExecutePendingJob(JS_GetRuntime(ctx), &ctx_ptr) > 0) {
            // Keep processing jobs until none are left
        }
        
        // Check for any job execution errors
        if (JS_ExecutePendingJob(JS_GetRuntime(ctx), &ctx_ptr) < 0) {
            JSValue exception = JS_GetException(ctx_ptr ? ctx_ptr : ctx);
            const char* error = JS_ToCString(ctx, exception);
            fprintf(stderr, "Promise rejection: %s\n", error ? error : "Unknown error");
            if (error) JS_FreeCString(ctx, error);
            JS_FreeValue(ctx, exception);
        }
        
        if (timers_has_active()) {
            usleep(1000); // Sleep for 1ms to prevent busy waiting
        }
    }
    
    // Continue executing any remaining jobs even after timers are done
    JSContext* ctx_ptr = NULL;
    while (JS_ExecutePendingJob(JS_GetRuntime(ctx), &ctx_ptr) > 0) {
        // Keep executing jobs until none are pending
    }
    
    // Clean up any remaining timers
    timers_cleanup(ctx);
    
    // Run garbage collection before freeing context
    JS_RunGC(JS_GetRuntime(ctx));
    
    JS_FreeContext(ctx);
    JS_FreeRuntime(rt);
    curl_global_cleanup();
    
    return 0;
}