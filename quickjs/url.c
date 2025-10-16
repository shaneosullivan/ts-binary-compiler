// URL and URLSearchParams API implementation for QuickJS
// Provides web-compatible URL parsing and manipulation

#include <quickjs/quickjs.h>
#include <string.h>
#include <stdlib.h>
#include <ctype.h>

// Forward declarations
static JSValue url_search_params_append(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv);
static JSValue url_search_params_get(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv);
static JSValue url_search_params_to_string(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv);
static JSValue headers_append(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv);
static JSValue headers_get(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv);
static JSValue headers_has(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv);
static JSValue headers_set(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv);
static JSValue headers_delete(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv);

// URL parser state
typedef struct {
    char* href;
    char* protocol;
    char* hostname;
    char* port;
    char* pathname;
    char* search;
    char* hash;
    char* username;
    char* password;
} URLComponents;

// Free URL components
static void free_url_components(URLComponents* url) {
    if (!url) return;
    free(url->href);
    free(url->protocol);
    free(url->hostname);
    free(url->port);
    free(url->pathname);
    free(url->search);
    free(url->hash);
    free(url->username);
    free(url->password);
    free(url);
}

// Helper to duplicate string
static char* safe_strdup(const char* str) {
    if (!str) return NULL;
    return strdup(str);
}

// URL encode a string
static char* url_encode(const char* str) {
    if (!str) return NULL;

    size_t len = strlen(str);
    char* encoded = malloc(len * 3 + 1); // Worst case: every char becomes %XX
    if (!encoded) return NULL;

    char* out = encoded;
    for (size_t i = 0; i < len; i++) {
        unsigned char c = str[i];
        // Unreserved characters: A-Z a-z 0-9 - _ . ~
        if (isalnum(c) || c == '-' || c == '_' || c == '.' || c == '~') {
            *out++ = c;
        } else if (c == ' ') {
            *out++ = '+';
        } else {
            sprintf(out, "%%%02X", c);
            out += 3;
        }
    }
    *out = '\0';
    return encoded;
}

// URL decode a string
static char* url_decode(const char* str) {
    if (!str) return NULL;

    size_t len = strlen(str);
    char* decoded = malloc(len + 1);
    if (!decoded) return NULL;

    char* out = decoded;
    for (size_t i = 0; i < len; i++) {
        if (str[i] == '+') {
            *out++ = ' ';
        } else if (str[i] == '%' && i + 2 < len) {
            int value;
            if (sscanf(&str[i + 1], "%2x", &value) == 1) {
                *out++ = (char)value;
                i += 2;
            } else {
                *out++ = str[i];
            }
        } else {
            *out++ = str[i];
        }
    }
    *out = '\0';
    return decoded;
}

// Parse a URL string into components
static URLComponents* parse_url(const char* url_string, const char* base_url) {
    if (!url_string) return NULL;

    URLComponents* url = calloc(1, sizeof(URLComponents));
    if (!url) return NULL;

    // For now, implement basic parsing
    // TODO: Handle relative URLs with base_url

    char* working = strdup(url_string);
    if (!working) {
        free(url);
        return NULL;
    }

    char* ptr = working;
    char* start = ptr;

    // Parse protocol (scheme)
    char* protocol_end = strstr(ptr, "://");
    if (protocol_end) {
        *protocol_end = '\0';
        url->protocol = malloc(strlen(ptr) + 2);
        sprintf(url->protocol, "%s:", ptr);
        ptr = protocol_end + 3; // Skip ://
    } else {
        url->protocol = strdup("");
    }

    // Parse username:password@hostname:port
    char* at_sign = strchr(ptr, '@');
    char* slash = strchr(ptr, '/');
    char* question = strchr(ptr, '?');
    char* hash_sign = strchr(ptr, '#');

    // Find the end of the authority section
    char* authority_end = ptr + strlen(ptr);
    if (slash && slash < authority_end) authority_end = slash;
    if (question && question < authority_end) authority_end = question;
    if (hash_sign && hash_sign < authority_end) authority_end = hash_sign;

    // Parse username and password if present
    if (at_sign && at_sign < authority_end) {
        *at_sign = '\0';
        char* colon = strchr(ptr, ':');
        if (colon && colon < at_sign) {
            *colon = '\0';
            url->username = safe_strdup(ptr);
            url->password = safe_strdup(colon + 1);
        } else {
            url->username = safe_strdup(ptr);
            url->password = strdup("");
        }
        ptr = at_sign + 1;
    } else {
        url->username = strdup("");
        url->password = strdup("");
    }

    // Parse hostname and port
    start = ptr;
    char saved_char = *authority_end;
    *authority_end = '\0';

    char* colon = strchr(ptr, ':');
    if (colon) {
        *colon = '\0';
        url->hostname = safe_strdup(ptr);
        url->port = safe_strdup(colon + 1);
    } else {
        url->hostname = safe_strdup(ptr);
        url->port = strdup("");
    }

    *authority_end = saved_char;
    ptr = authority_end;

    // Parse pathname
    if (*ptr == '/') {
        start = ptr;
        char* end = ptr + strlen(ptr);
        if (question && question < end) end = question;
        if (hash_sign && hash_sign < end) end = hash_sign;

        saved_char = *end;
        *end = '\0';
        url->pathname = safe_strdup(ptr);
        *end = saved_char;
        ptr = end;
    } else {
        url->pathname = strdup("/");
    }

    // Parse search (query string)
    if (*ptr == '?') {
        start = ptr;
        char* end = ptr + strlen(ptr);
        if (hash_sign && hash_sign < end) end = hash_sign;

        saved_char = *end;
        *end = '\0';
        url->search = safe_strdup(ptr);
        *end = saved_char;
        ptr = end;
    } else {
        url->search = strdup("");
    }

    // Parse hash (fragment)
    if (*ptr == '#') {
        url->hash = safe_strdup(ptr);
    } else {
        url->hash = strdup("");
    }

    // Build href
    size_t href_len = strlen(url->protocol) + 2 +
                     strlen(url->username) + 1 + strlen(url->password) + 1 +
                     strlen(url->hostname) + 1 + strlen(url->port) +
                     strlen(url->pathname) + strlen(url->search) + strlen(url->hash) + 10;
    url->href = malloc(href_len);

    char* h = url->href;
    h += sprintf(h, "%s//", url->protocol);
    if (url->username && *url->username) {
        h += sprintf(h, "%s", url->username);
        if (url->password && *url->password) {
            h += sprintf(h, ":%s", url->password);
        }
        h += sprintf(h, "@");
    }
    h += sprintf(h, "%s", url->hostname);
    if (url->port && *url->port) {
        h += sprintf(h, ":%s", url->port);
    }
    h += sprintf(h, "%s%s%s", url->pathname, url->search, url->hash);

    free(working);
    return url;
}

// URL constructor: new URL(url, base)
static JSValue url_constructor(JSContext* ctx, JSValueConst new_target, int argc, JSValueConst* argv) {
    if (argc < 1) {
        return JS_ThrowTypeError(ctx, "URL constructor requires at least 1 argument");
    }

    const char* url_string = JS_ToCString(ctx, argv[0]);
    if (!url_string) {
        return JS_EXCEPTION;
    }

    const char* base_url = NULL;
    if (argc >= 2 && !JS_IsUndefined(argv[1])) {
        base_url = JS_ToCString(ctx, argv[1]);
    }

    URLComponents* url = parse_url(url_string, base_url);
    JS_FreeCString(ctx, url_string);
    if (base_url) JS_FreeCString(ctx, base_url);

    if (!url) {
        return JS_ThrowTypeError(ctx, "Invalid URL");
    }

    // Create the URL object
    JSValue obj = JS_NewObject(ctx);

    // Set properties
    JS_SetPropertyStr(ctx, obj, "href", JS_NewString(ctx, url->href));
    JS_SetPropertyStr(ctx, obj, "protocol", JS_NewString(ctx, url->protocol));
    JS_SetPropertyStr(ctx, obj, "hostname", JS_NewString(ctx, url->hostname));
    JS_SetPropertyStr(ctx, obj, "port", JS_NewString(ctx, url->port));
    JS_SetPropertyStr(ctx, obj, "pathname", JS_NewString(ctx, url->pathname));
    JS_SetPropertyStr(ctx, obj, "search", JS_NewString(ctx, url->search));
    JS_SetPropertyStr(ctx, obj, "hash", JS_NewString(ctx, url->hash));
    JS_SetPropertyStr(ctx, obj, "username", JS_NewString(ctx, url->username));
    JS_SetPropertyStr(ctx, obj, "password", JS_NewString(ctx, url->password));

    // Build origin
    char origin[1024];
    snprintf(origin, sizeof(origin), "%s//%s%s%s",
             url->protocol,
             url->hostname,
             (url->port && *url->port) ? ":" : "",
             (url->port && *url->port) ? url->port : "");
    JS_SetPropertyStr(ctx, obj, "origin", JS_NewString(ctx, origin));

    // Build host (hostname:port)
    char host[512];
    if (url->port && *url->port) {
        snprintf(host, sizeof(host), "%s:%s", url->hostname, url->port);
    } else {
        snprintf(host, sizeof(host), "%s", url->hostname);
    }
    JS_SetPropertyStr(ctx, obj, "host", JS_NewString(ctx, host));

    free_url_components(url);
    return obj;
}

// URLSearchParams constructor
static JSValue url_search_params_constructor(JSContext* ctx, JSValueConst new_target, int argc, JSValueConst* argv) {
    JSValue obj = JS_NewObject(ctx);

    // Internal storage: array of [key, value] pairs
    JSValue params = JS_NewArray(ctx);
    JS_SetPropertyStr(ctx, obj, "__params__", params);

    if (argc > 0 && !JS_IsUndefined(argv[0])) {
        const char* init = JS_ToCString(ctx, argv[0]);
        if (init) {
            // Parse query string
            char* working = strdup(init);
            if (working) {
                // Skip leading '?' if present
                char* ptr = working;
                if (*ptr == '?') ptr++;

                char* pair = strtok(ptr, "&");
                int index = 0;
                while (pair) {
                    char* eq = strchr(pair, '=');
                    if (eq) {
                        *eq = '\0';
                        char* key = url_decode(pair);
                        char* value = url_decode(eq + 1);

                        if (key && value) {
                            JSValue entry = JS_NewArray(ctx);
                            JS_SetPropertyUint32(ctx, entry, 0, JS_NewString(ctx, key));
                            JS_SetPropertyUint32(ctx, entry, 1, JS_NewString(ctx, value));
                            JS_SetPropertyUint32(ctx, params, index++, entry);
                        }

                        free(key);
                        free(value);
                    }
                    pair = strtok(NULL, "&");
                }
                free(working);
            }
            JS_FreeCString(ctx, init);
        }
    }

    // Add methods to instance
    JS_SetPropertyStr(ctx, obj, "append", JS_NewCFunction(ctx, url_search_params_append, "append", 2));
    JS_SetPropertyStr(ctx, obj, "get", JS_NewCFunction(ctx, url_search_params_get, "get", 1));
    JS_SetPropertyStr(ctx, obj, "toString", JS_NewCFunction(ctx, url_search_params_to_string, "toString", 0));

    return obj;
}

// URLSearchParams.prototype.append(name, value)
static JSValue url_search_params_append(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    if (argc < 2) {
        return JS_ThrowTypeError(ctx, "append requires 2 arguments");
    }

    JSValue params = JS_GetPropertyStr(ctx, this_val, "__params__");
    if (JS_IsException(params)) return params;

    const char* name = JS_ToCString(ctx, argv[0]);
    const char* value = JS_ToCString(ctx, argv[1]);

    if (name && value) {
        // Get current length
        JSValue len_val = JS_GetPropertyStr(ctx, params, "length");
        uint32_t len = 0;
        JS_ToUint32(ctx, &len, len_val);
        JS_FreeValue(ctx, len_val);

        // Append new entry
        JSValue entry = JS_NewArray(ctx);
        JS_SetPropertyUint32(ctx, entry, 0, JS_NewString(ctx, name));
        JS_SetPropertyUint32(ctx, entry, 1, JS_NewString(ctx, value));
        JS_SetPropertyUint32(ctx, params, len, entry);
    }

    if (name) JS_FreeCString(ctx, name);
    if (value) JS_FreeCString(ctx, value);
    JS_FreeValue(ctx, params);

    return JS_UNDEFINED;
}

// URLSearchParams.prototype.get(name)
static JSValue url_search_params_get(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    if (argc < 1) {
        return JS_ThrowTypeError(ctx, "get requires 1 argument");
    }

    JSValue params = JS_GetPropertyStr(ctx, this_val, "__params__");
    if (JS_IsException(params)) return params;

    const char* name = JS_ToCString(ctx, argv[0]);
    if (!name) {
        JS_FreeValue(ctx, params);
        return JS_EXCEPTION;
    }

    // Get length
    JSValue len_val = JS_GetPropertyStr(ctx, params, "length");
    uint32_t len = 0;
    JS_ToUint32(ctx, &len, len_val);
    JS_FreeValue(ctx, len_val);

    // Find first matching entry
    JSValue result = JS_NULL;
    for (uint32_t i = 0; i < len; i++) {
        JSValue entry = JS_GetPropertyUint32(ctx, params, i);
        JSValue key = JS_GetPropertyUint32(ctx, entry, 0);

        const char* key_str = JS_ToCString(ctx, key);
        if (key_str && strcmp(key_str, name) == 0) {
            result = JS_GetPropertyUint32(ctx, entry, 1);
            JS_FreeCString(ctx, key_str);
            JS_FreeValue(ctx, key);
            JS_FreeValue(ctx, entry);
            break;
        }

        if (key_str) JS_FreeCString(ctx, key_str);
        JS_FreeValue(ctx, key);
        JS_FreeValue(ctx, entry);
    }

    JS_FreeCString(ctx, name);
    JS_FreeValue(ctx, params);

    return result;
}

// URLSearchParams.prototype.toString()
static JSValue url_search_params_to_string(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    JSValue params = JS_GetPropertyStr(ctx, this_val, "__params__");
    if (JS_IsException(params)) return params;

    // Get length
    JSValue len_val = JS_GetPropertyStr(ctx, params, "length");
    uint32_t len = 0;
    JS_ToUint32(ctx, &len, len_val);
    JS_FreeValue(ctx, len_val);

    // Build query string
    char* result = malloc(4096); // TODO: Dynamic sizing
    if (!result) {
        JS_FreeValue(ctx, params);
        return JS_ThrowOutOfMemory(ctx);
    }

    char* ptr = result;
    *ptr = '\0';

    for (uint32_t i = 0; i < len; i++) {
        if (i > 0) {
            ptr += sprintf(ptr, "&");
        }

        JSValue entry = JS_GetPropertyUint32(ctx, params, i);
        JSValue key_val = JS_GetPropertyUint32(ctx, entry, 0);
        JSValue value_val = JS_GetPropertyUint32(ctx, entry, 1);

        const char* key = JS_ToCString(ctx, key_val);
        const char* value = JS_ToCString(ctx, value_val);

        if (key && value) {
            char* encoded_key = url_encode(key);
            char* encoded_value = url_encode(value);

            if (encoded_key && encoded_value) {
                ptr += sprintf(ptr, "%s=%s", encoded_key, encoded_value);
            }

            free(encoded_key);
            free(encoded_value);
        }

        if (key) JS_FreeCString(ctx, key);
        if (value) JS_FreeCString(ctx, value);
        JS_FreeValue(ctx, key_val);
        JS_FreeValue(ctx, value_val);
        JS_FreeValue(ctx, entry);
    }

    JSValue ret = JS_NewString(ctx, result);
    free(result);
    JS_FreeValue(ctx, params);

    return ret;
}

// ========================================
// Headers API Implementation
// ========================================

// Headers constructor
static JSValue headers_constructor(JSContext* ctx, JSValueConst new_target, int argc, JSValueConst* argv) {
    // Create object with proper prototype chain
    JSValue proto = JS_GetPropertyStr(ctx, new_target, "prototype");
    JSValue obj = JS_NewObjectProtoClass(ctx, proto, 0);
    JS_FreeValue(ctx, proto);

    // Internal storage: object with header names as keys (lowercase)
    JSValue headers_map = JS_NewObject(ctx);
    JS_SetPropertyStr(ctx, obj, "__headers__", headers_map);

    // If init object/array provided
    if (argc > 0 && !JS_IsUndefined(argv[0])) {
        // TODO: Support initialization from object or array
        // For now, just create empty
    }

    // Methods are now on the prototype, not on each instance

    return obj;
}

// Convert header name to lowercase
static char* normalize_header_name(const char* name) {
    if (!name) return NULL;
    char* normalized = strdup(name);
    if (!normalized) return NULL;

    for (char* p = normalized; *p; p++) {
        *p = tolower((unsigned char)*p);
    }
    return normalized;
}

// Headers.prototype.append(name, value)
static JSValue headers_append(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    if (argc < 2) {
        return JS_ThrowTypeError(ctx, "append requires 2 arguments");
    }

    JSValue headers_map = JS_GetPropertyStr(ctx, this_val, "__headers__");
    if (JS_IsException(headers_map)) return headers_map;

    const char* name = JS_ToCString(ctx, argv[0]);
    const char* value = JS_ToCString(ctx, argv[1]);

    if (name && value) {
        char* norm_name = normalize_header_name(name);
        if (norm_name) {
            // Get existing value
            JSValue existing = JS_GetPropertyStr(ctx, headers_map, norm_name);

            if (JS_IsUndefined(existing)) {
                // First value for this header
                JS_SetPropertyStr(ctx, headers_map, norm_name, JS_NewString(ctx, value));
            } else {
                // Append with comma separator
                const char* existing_str = JS_ToCString(ctx, existing);
                if (existing_str) {
                    size_t new_len = strlen(existing_str) + strlen(value) + 3;
                    char* combined = malloc(new_len);
                    if (combined) {
                        snprintf(combined, new_len, "%s, %s", existing_str, value);
                        JS_SetPropertyStr(ctx, headers_map, norm_name, JS_NewString(ctx, combined));
                        free(combined);
                    }
                    JS_FreeCString(ctx, existing_str);
                }
            }

            JS_FreeValue(ctx, existing);
            free(norm_name);
        }
    }

    if (name) JS_FreeCString(ctx, name);
    if (value) JS_FreeCString(ctx, value);
    JS_FreeValue(ctx, headers_map);

    return JS_UNDEFINED;
}

// Headers.prototype.get(name)
static JSValue headers_get(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    if (argc < 1) {
        return JS_ThrowTypeError(ctx, "get requires 1 argument");
    }

    JSValue headers_map = JS_GetPropertyStr(ctx, this_val, "__headers__");
    if (JS_IsException(headers_map)) return headers_map;

    const char* name = JS_ToCString(ctx, argv[0]);
    JSValue result = JS_NULL;

    if (name) {
        char* norm_name = normalize_header_name(name);
        if (norm_name) {
            result = JS_GetPropertyStr(ctx, headers_map, norm_name);
            if (JS_IsUndefined(result)) {
                JS_FreeValue(ctx, result);
                result = JS_NULL;
            }
            free(norm_name);
        }
        JS_FreeCString(ctx, name);
    }

    JS_FreeValue(ctx, headers_map);
    return result;
}

// Headers.prototype.has(name)
static JSValue headers_has(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    if (argc < 1) {
        return JS_ThrowTypeError(ctx, "has requires 1 argument");
    }

    JSValue headers_map = JS_GetPropertyStr(ctx, this_val, "__headers__");
    if (JS_IsException(headers_map)) return headers_map;

    const char* name = JS_ToCString(ctx, argv[0]);
    int has = 0;

    if (name) {
        char* norm_name = normalize_header_name(name);
        if (norm_name) {
            JSValue val = JS_GetPropertyStr(ctx, headers_map, norm_name);
            has = !JS_IsUndefined(val);
            JS_FreeValue(ctx, val);
            free(norm_name);
        }
        JS_FreeCString(ctx, name);
    }

    JS_FreeValue(ctx, headers_map);
    return JS_NewBool(ctx, has);
}

// Headers.prototype.set(name, value)
static JSValue headers_set(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    if (argc < 2) {
        return JS_ThrowTypeError(ctx, "set requires 2 arguments");
    }

    JSValue headers_map = JS_GetPropertyStr(ctx, this_val, "__headers__");
    if (JS_IsException(headers_map)) return headers_map;

    const char* name = JS_ToCString(ctx, argv[0]);
    const char* value = JS_ToCString(ctx, argv[1]);

    if (name && value) {
        char* norm_name = normalize_header_name(name);
        if (norm_name) {
            JS_SetPropertyStr(ctx, headers_map, norm_name, JS_NewString(ctx, value));
            free(norm_name);
        }
    }

    if (name) JS_FreeCString(ctx, name);
    if (value) JS_FreeCString(ctx, value);
    JS_FreeValue(ctx, headers_map);

    return JS_UNDEFINED;
}

// Headers.prototype.delete(name)
static JSValue headers_delete(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    if (argc < 1) {
        return JS_ThrowTypeError(ctx, "delete requires 1 argument");
    }

    JSValue headers_map = JS_GetPropertyStr(ctx, this_val, "__headers__");
    if (JS_IsException(headers_map)) return headers_map;

    const char* name = JS_ToCString(ctx, argv[0]);

    if (name) {
        char* norm_name = normalize_header_name(name);
        if (norm_name) {
            JSAtom atom = JS_NewAtom(ctx, norm_name);
            JS_DeleteProperty(ctx, headers_map, atom, 0);
            JS_FreeAtom(ctx, atom);
            free(norm_name);
        }
        JS_FreeCString(ctx, name);
    }

    JS_FreeValue(ctx, headers_map);
    return JS_UNDEFINED;
}

// Initialize URL and URLSearchParams APIs
void init_url_api(JSContext* ctx, JSValue global) {
    // Create URL constructor
    JSValue url_ctor = JS_NewCFunction2(ctx, url_constructor, "URL", 2, JS_CFUNC_constructor, 0);
    JS_SetPropertyStr(ctx, global, "URL", url_ctor);

    // Create URLSearchParams constructor
    JSValue usp_ctor = JS_NewCFunction2(ctx, url_search_params_constructor, "URLSearchParams", 1, JS_CFUNC_constructor, 0);
    JSValue usp_proto = JS_NewObject(ctx);

    JS_SetPropertyStr(ctx, usp_proto, "append", JS_NewCFunction(ctx, url_search_params_append, "append", 2));
    JS_SetPropertyStr(ctx, usp_proto, "get", JS_NewCFunction(ctx, url_search_params_get, "get", 1));
    JS_SetPropertyStr(ctx, usp_proto, "toString", JS_NewCFunction(ctx, url_search_params_to_string, "toString", 0));

    JS_SetPropertyStr(ctx, usp_ctor, "prototype", usp_proto);
    JS_SetPropertyStr(ctx, global, "URLSearchParams", usp_ctor);

    // Create Headers constructor
    JSValue headers_ctor = JS_NewCFunction2(ctx, headers_constructor, "Headers", 1, JS_CFUNC_constructor, 0);
    JSValue headers_proto = JS_NewObject(ctx);

    // Add Headers prototype methods
    JS_SetPropertyStr(ctx, headers_proto, "append", JS_NewCFunction(ctx, headers_append, "append", 2));
    JS_SetPropertyStr(ctx, headers_proto, "get", JS_NewCFunction(ctx, headers_get, "get", 1));
    JS_SetPropertyStr(ctx, headers_proto, "has", JS_NewCFunction(ctx, headers_has, "has", 1));
    JS_SetPropertyStr(ctx, headers_proto, "set", JS_NewCFunction(ctx, headers_set, "set", 2));
    JS_SetPropertyStr(ctx, headers_proto, "delete", JS_NewCFunction(ctx, headers_delete, "delete", 1));

    JS_SetPropertyStr(ctx, headers_ctor, "prototype", headers_proto);
    JS_SetPropertyStr(ctx, global, "Headers", headers_ctor);
}
