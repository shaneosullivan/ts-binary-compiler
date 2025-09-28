#include <quickjs/quickjs.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <curl/curl.h>

struct HttpResponse {
    char* data;
    size_t size;
};

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

static JSValue response_text(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)argc; (void)argv;
    JSValue responseData = JS_GetPropertyStr(ctx, this_val, "_data");
    if (JS_IsException(responseData)) return responseData;
    
    const char* data = JS_ToCString(ctx, responseData);
    JSValue result = JS_NewString(ctx, data);
    JS_FreeCString(ctx, data);
    JS_FreeValue(ctx, responseData);
    return result;
}

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

static JSValue js_fetch(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)this_val;
    if (argc < 1) {
        return JS_ThrowTypeError(ctx, "fetch requires at least 1 argument");
    }
    
    const char* url = JS_ToCString(ctx, argv[0]);
    if (!url) {
        return JS_EXCEPTION;
    }
    
    CURL* curl = curl_easy_init();
    if (!curl) {
        JS_FreeCString(ctx, url);
        return JS_ThrowInternalError(ctx, "Failed to initialize curl");
    }
    
    struct HttpResponse response = {0};
    
    curl_easy_setopt(curl, CURLOPT_URL, url);
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, (curl_write_callback)WriteCallback);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response);
    curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);
    curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
    
    CURLcode res = curl_easy_perform(curl);
    curl_easy_cleanup(curl);
    JS_FreeCString(ctx, url);
    
    if (res != CURLE_OK) {
        if (response.data) free(response.data);
        return JS_ThrowInternalError(ctx, "Fetch failed: %s", curl_easy_strerror(res));
    }
    
    JSValue responseObj = JS_NewObject(ctx);
    JSValue textFunc = JS_NewCFunction(ctx, response_text, "text", 0);
    
    JS_SetPropertyStr(ctx, responseObj, "text", textFunc);
    JS_SetPropertyStr(ctx, responseObj, "_data", JS_NewString(ctx, response.data ? response.data : ""));
    
    if (response.data) free(response.data);
    
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
    
    // Add fetch and console to global object
    JSValue global = JS_GetGlobalObject(ctx);
    JS_SetPropertyStr(ctx, global, "fetch", JS_NewCFunction(ctx, js_fetch, "fetch", 1));
    
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
    JS_FreeContext(ctx);
    JS_FreeRuntime(rt);
    curl_global_cleanup();
    
    return 0;
}