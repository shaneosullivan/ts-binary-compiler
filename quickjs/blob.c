#include "blob.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/time.h>

// Blob opaque data structure
typedef struct {
    uint8_t* data;
    size_t size;
    char* type;
} BlobData;

// File opaque data structure (extends Blob)
typedef struct {
    BlobData blob;
    char* name;
    int64_t lastModified;
} FileData;

// Class ID for Blob
static JSClassID js_blob_class_id;

// Class ID for File
static JSClassID js_file_class_id;

// Finalizer for Blob - frees the allocated memory
static void js_blob_finalizer(JSRuntime* rt, JSValue val) {
    BlobData* blob = JS_GetOpaque(val, js_blob_class_id);
    if (blob) {
        if (blob->data) {
            js_free_rt(rt, blob->data);
        }
        if (blob->type) {
            js_free_rt(rt, blob->type);
        }
        js_free_rt(rt, blob);
    }
}

// Finalizer for File - frees the allocated memory
static void js_file_finalizer(JSRuntime* rt, JSValue val) {
    FileData* file = JS_GetOpaque(val, js_file_class_id);
    if (file) {
        if (file->blob.data) {
            js_free_rt(rt, file->blob.data);
        }
        if (file->blob.type) {
            js_free_rt(rt, file->blob.type);
        }
        if (file->name) {
            js_free_rt(rt, file->name);
        }
        js_free_rt(rt, file);
    }
}

// Blob class definition
static JSClassDef js_blob_class = {
    "Blob",
    .finalizer = js_blob_finalizer,
};

// File class definition
static JSClassDef js_file_class = {
    "File",
    .finalizer = js_file_finalizer,
};

// Blob.size getter
static JSValue js_blob_get_size(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)argc; (void)argv;
    BlobData* blob = JS_GetOpaque(this_val, js_blob_class_id);
    if (!blob) {
        return JS_EXCEPTION;
    }
    return JS_NewInt64(ctx, blob->size);
}

// Blob.type getter
static JSValue js_blob_get_type(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)argc; (void)argv;
    BlobData* blob = JS_GetOpaque(this_val, js_blob_class_id);
    if (!blob) {
        return JS_EXCEPTION;
    }
    return JS_NewString(ctx, blob->type ? blob->type : "");
}

// File.size getter (inherits from Blob)
static JSValue js_file_get_size(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)argc; (void)argv;
    FileData* file = JS_GetOpaque(this_val, js_file_class_id);
    if (!file) {
        return JS_EXCEPTION;
    }
    return JS_NewInt64(ctx, file->blob.size);
}

// File.type getter (inherits from Blob)
static JSValue js_file_get_type(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)argc; (void)argv;
    FileData* file = JS_GetOpaque(this_val, js_file_class_id);
    if (!file) {
        return JS_EXCEPTION;
    }
    return JS_NewString(ctx, file->blob.type ? file->blob.type : "");
}

// File.name getter
static JSValue js_file_get_name(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)argc; (void)argv;
    FileData* file = JS_GetOpaque(this_val, js_file_class_id);
    if (!file) {
        return JS_EXCEPTION;
    }
    return JS_NewString(ctx, file->name ? file->name : "");
}

// File.lastModified getter
static JSValue js_file_get_lastModified(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)argc; (void)argv;
    FileData* file = JS_GetOpaque(this_val, js_file_class_id);
    if (!file) {
        return JS_EXCEPTION;
    }
    return JS_NewInt64(ctx, file->lastModified);
}

// Blob.text() method - returns a Promise that resolves to a string
static JSValue js_blob_text(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)argc; (void)argv;
    BlobData* blob = JS_GetOpaque(this_val, js_blob_class_id);
    if (!blob) {
        return JS_EXCEPTION;
    }

    // Create the string value
    JSValue text = JS_NewStringLen(ctx, (const char*)blob->data, blob->size);

    // Get the Promise constructor
    JSValue global = JS_GetGlobalObject(ctx);
    JSValue promise_ctor = JS_GetPropertyStr(ctx, global, "Promise");

    // Get the resolve function
    JSValue resolve_fn = JS_GetPropertyStr(ctx, promise_ctor, "resolve");

    // Call Promise.resolve(text)
    JSValue promise = JS_Call(ctx, resolve_fn, promise_ctor, 1, &text);

    // Cleanup
    JS_FreeValue(ctx, text);
    JS_FreeValue(ctx, resolve_fn);
    JS_FreeValue(ctx, promise_ctor);
    JS_FreeValue(ctx, global);

    return promise;
}

// Blob.arrayBuffer() method - returns a Promise that resolves to an ArrayBuffer
static JSValue js_blob_arrayBuffer(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)argc; (void)argv;
    BlobData* blob = JS_GetOpaque(this_val, js_blob_class_id);
    if (!blob) {
        return JS_EXCEPTION;
    }

    // Create a copy of the data for the ArrayBuffer
    uint8_t* buffer_data = NULL;
    if (blob->size > 0) {
        buffer_data = js_malloc(ctx, blob->size);
        if (!buffer_data) {
            return JS_ThrowOutOfMemory(ctx);
        }
        memcpy(buffer_data, blob->data, blob->size);
    }

    // Create the ArrayBuffer
    JSValue arrayBuffer = JS_NewArrayBuffer(ctx, buffer_data, blob->size, NULL, NULL, 0);

    // Get the Promise constructor
    JSValue global = JS_GetGlobalObject(ctx);
    JSValue promise_ctor = JS_GetPropertyStr(ctx, global, "Promise");

    // Get the resolve function
    JSValue resolve_fn = JS_GetPropertyStr(ctx, promise_ctor, "resolve");

    // Call Promise.resolve(arrayBuffer)
    JSValue promise = JS_Call(ctx, resolve_fn, promise_ctor, 1, &arrayBuffer);

    // Cleanup
    JS_FreeValue(ctx, arrayBuffer);
    JS_FreeValue(ctx, resolve_fn);
    JS_FreeValue(ctx, promise_ctor);
    JS_FreeValue(ctx, global);

    return promise;
}

// Blob.slice() method - creates a new Blob with a subset of the data
static JSValue js_blob_slice(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    BlobData* blob = JS_GetOpaque(this_val, js_blob_class_id);
    if (!blob) {
        return JS_EXCEPTION;
    }

    int64_t start = 0;
    int64_t end = blob->size;
    const char* contentType = blob->type;

    // Parse start parameter
    if (argc > 0 && !JS_IsUndefined(argv[0])) {
        if (JS_ToInt64(ctx, &start, argv[0])) {
            return JS_EXCEPTION;
        }
        // Handle negative start
        if (start < 0) {
            start = blob->size + start;
            if (start < 0) start = 0;
        }
        if (start > (int64_t)blob->size) start = blob->size;
    }

    // Parse end parameter
    if (argc > 1 && !JS_IsUndefined(argv[1])) {
        if (JS_ToInt64(ctx, &end, argv[1])) {
            return JS_EXCEPTION;
        }
        // Handle negative end
        if (end < 0) {
            end = blob->size + end;
            if (end < 0) end = 0;
        }
        if (end > (int64_t)blob->size) end = blob->size;
    }

    // Parse contentType parameter
    if (argc > 2 && !JS_IsUndefined(argv[2])) {
        contentType = JS_ToCString(ctx, argv[2]);
        if (!contentType) {
            return JS_EXCEPTION;
        }
    }

    // Ensure start <= end
    if (start > end) start = end;

    size_t slice_size = end - start;

    // Create new Blob with sliced data
    JSValue new_blob = blob_create(ctx, blob->data + start, slice_size, contentType);

    // Free contentType if it was allocated
    if (argc > 2 && !JS_IsUndefined(argv[2])) {
        JS_FreeCString(ctx, contentType);
    }

    return new_blob;
}

// Blob constructor
JSValue js_blob_constructor(JSContext* ctx, JSValueConst new_target, int argc, JSValueConst* argv) {
    (void)new_target;

    // Default values
    const char* type = "";
    uint8_t* data = NULL;
    size_t total_size = 0;

    // Parse options object (second parameter)
    if (argc > 1 && JS_IsObject(argv[1])) {
        JSValue type_val = JS_GetPropertyStr(ctx, argv[1], "type");
        if (!JS_IsUndefined(type_val)) {
            type = JS_ToCString(ctx, type_val);
        }
        JS_FreeValue(ctx, type_val);
    }

    // Parse array of blob parts (first parameter)
    if (argc > 0 && JS_IsArray(ctx, argv[0])) {
        // First pass: calculate total size
        JSValue length_val = JS_GetPropertyStr(ctx, argv[0], "length");
        uint32_t length = 0;
        JS_ToUint32(ctx, &length, length_val);
        JS_FreeValue(ctx, length_val);

        for (uint32_t i = 0; i < length; i++) {
            JSValue item = JS_GetPropertyUint32(ctx, argv[0], i);

            if (JS_IsString(item)) {
                size_t len;
                JS_ToCStringLen(ctx, &len, item);
                total_size += len;
            }

            JS_FreeValue(ctx, item);
        }

        // Allocate data buffer
        if (total_size > 0) {
            data = js_malloc(ctx, total_size);
            if (!data) {
                if (type && *type) JS_FreeCString(ctx, type);
                return JS_ThrowOutOfMemory(ctx);
            }
        }

        // Second pass: copy data
        size_t offset = 0;
        for (uint32_t i = 0; i < length; i++) {
            JSValue item = JS_GetPropertyUint32(ctx, argv[0], i);

            if (JS_IsString(item)) {
                size_t len;
                const char* str = JS_ToCStringLen(ctx, &len, item);
                if (str && len > 0) {
                    memcpy(data + offset, str, len);
                    offset += len;
                    JS_FreeCString(ctx, str);
                }
            }

            JS_FreeValue(ctx, item);
        }
    }

    // Create the Blob
    JSValue blob = blob_create(ctx, data, total_size, type);

    // Free temporary data
    if (data) {
        js_free(ctx, data);
    }
    if (type && *type) {
        JS_FreeCString(ctx, type);
    }

    return blob;
}

// File.text() method - returns a Promise that resolves to a string
static JSValue js_file_text(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)argc; (void)argv;
    FileData* file = JS_GetOpaque(this_val, js_file_class_id);
    if (!file) {
        return JS_EXCEPTION;
    }

    // Create the string value
    JSValue text = JS_NewStringLen(ctx, (const char*)file->blob.data, file->blob.size);

    // Get the Promise constructor
    JSValue global = JS_GetGlobalObject(ctx);
    JSValue promise_ctor = JS_GetPropertyStr(ctx, global, "Promise");

    // Get the resolve function
    JSValue resolve_fn = JS_GetPropertyStr(ctx, promise_ctor, "resolve");

    // Call Promise.resolve(text)
    JSValue promise = JS_Call(ctx, resolve_fn, promise_ctor, 1, &text);

    // Cleanup
    JS_FreeValue(ctx, text);
    JS_FreeValue(ctx, resolve_fn);
    JS_FreeValue(ctx, promise_ctor);
    JS_FreeValue(ctx, global);

    return promise;
}

// File.arrayBuffer() method - returns a Promise that resolves to an ArrayBuffer
static JSValue js_file_arrayBuffer(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)argc; (void)argv;
    FileData* file = JS_GetOpaque(this_val, js_file_class_id);
    if (!file) {
        return JS_EXCEPTION;
    }

    // Create a copy of the data for the ArrayBuffer
    uint8_t* buffer_data = NULL;
    if (file->blob.size > 0) {
        buffer_data = js_malloc(ctx, file->blob.size);
        if (!buffer_data) {
            return JS_ThrowOutOfMemory(ctx);
        }
        memcpy(buffer_data, file->blob.data, file->blob.size);
    }

    JSValue array_buffer = JS_NewArrayBuffer(ctx, buffer_data, file->blob.size, NULL, NULL, 0);

    // Get Promise constructor
    JSValue global = JS_GetGlobalObject(ctx);
    JSValue promise_ctor = JS_GetPropertyStr(ctx, global, "Promise");

    // Get the resolve function
    JSValue resolve_fn = JS_GetPropertyStr(ctx, promise_ctor, "resolve");

    // Call Promise.resolve(array_buffer)
    JSValue promise = JS_Call(ctx, resolve_fn, promise_ctor, 1, &array_buffer);

    // Cleanup
    JS_FreeValue(ctx, array_buffer);
    JS_FreeValue(ctx, resolve_fn);
    JS_FreeValue(ctx, promise_ctor);
    JS_FreeValue(ctx, global);

    return promise;
}

// File constructor
static JSValue js_file_constructor(JSContext* ctx, JSValueConst new_target, int argc, JSValueConst* argv) {
    (void)new_target;

    if (argc < 2) {
        return JS_ThrowTypeError(ctx, "File constructor requires at least 2 arguments");
    }

    // Default values
    const char* type = "";
    const char* name = "";
    int64_t lastModified = 0; // Will be set to current time if not provided
    uint8_t* data = NULL;
    size_t total_size = 0;

    // Get name (second parameter)
    name = JS_ToCString(ctx, argv[1]);
    if (!name) {
        return JS_EXCEPTION;
    }

    // Parse options object (third parameter)
    if (argc > 2 && JS_IsObject(argv[2])) {
        JSValue type_val = JS_GetPropertyStr(ctx, argv[2], "type");
        if (!JS_IsUndefined(type_val)) {
            type = JS_ToCString(ctx, type_val);
        }
        JS_FreeValue(ctx, type_val);

        JSValue lastModified_val = JS_GetPropertyStr(ctx, argv[2], "lastModified");
        if (!JS_IsUndefined(lastModified_val)) {
            JS_ToInt64(ctx, &lastModified, lastModified_val);
        }
        JS_FreeValue(ctx, lastModified_val);
    }

    // If lastModified not provided, use current time in milliseconds
    if (lastModified == 0) {
        struct timeval tv;
        gettimeofday(&tv, NULL);
        lastModified = (int64_t)tv.tv_sec * 1000 + tv.tv_usec / 1000;
    }

    // Parse array of file parts (first parameter) - same as Blob
    if (argc > 0 && JS_IsArray(ctx, argv[0])) {
        // First pass: calculate total size
        JSValue length_val = JS_GetPropertyStr(ctx, argv[0], "length");
        uint32_t length = 0;
        JS_ToUint32(ctx, &length, length_val);
        JS_FreeValue(ctx, length_val);

        for (uint32_t i = 0; i < length; i++) {
            JSValue item = JS_GetPropertyUint32(ctx, argv[0], i);

            if (JS_IsString(item)) {
                size_t len;
                JS_ToCStringLen(ctx, &len, item);
                total_size += len;
            }

            JS_FreeValue(ctx, item);
        }

        // Allocate data buffer
        if (total_size > 0) {
            data = js_malloc(ctx, total_size);
            if (!data) {
                if (type && *type) JS_FreeCString(ctx, type);
                JS_FreeCString(ctx, name);
                return JS_ThrowOutOfMemory(ctx);
            }
        }

        // Second pass: copy data
        size_t offset = 0;
        for (uint32_t i = 0; i < length; i++) {
            JSValue item = JS_GetPropertyUint32(ctx, argv[0], i);

            if (JS_IsString(item)) {
                size_t len;
                const char* str = JS_ToCStringLen(ctx, &len, item);
                if (str && len > 0) {
                    memcpy(data + offset, str, len);
                    offset += len;
                    JS_FreeCString(ctx, str);
                }
            }

            JS_FreeValue(ctx, item);
        }
    }

    // Create the File
    JSRuntime* rt = JS_GetRuntime(ctx);

    // Allocate FileData structure
    FileData* file = js_mallocz(ctx, sizeof(FileData));
    if (!file) {
        if (data) js_free(ctx, data);
        if (type && *type) JS_FreeCString(ctx, type);
        JS_FreeCString(ctx, name);
        return JS_ThrowOutOfMemory(ctx);
    }

    // Set blob data
    if (total_size > 0 && data) {
        file->blob.data = data;
        data = NULL; // Ownership transferred
    } else {
        file->blob.data = NULL;
    }
    file->blob.size = total_size;

    // Set blob type
    if (type && *type) {
        size_t type_len = strlen(type);
        file->blob.type = js_malloc(ctx, type_len + 1);
        if (file->blob.type) {
            strcpy(file->blob.type, type);
        }
        JS_FreeCString(ctx, type);
    } else {
        file->blob.type = NULL;
    }

    // Set file name
    size_t name_len = strlen(name);
    file->name = js_malloc(ctx, name_len + 1);
    if (file->name) {
        strcpy(file->name, name);
    }
    JS_FreeCString(ctx, name);

    // Set lastModified
    file->lastModified = lastModified;

    // Create the JS object
    JSValue obj = JS_NewObjectClass(ctx, js_file_class_id);
    if (JS_IsException(obj)) {
        if (file->blob.data) js_free(ctx, file->blob.data);
        if (file->blob.type) js_free(ctx, file->blob.type);
        if (file->name) js_free(ctx, file->name);
        js_free(ctx, file);
        return obj;
    }

    JS_SetOpaque(obj, file);
    return obj;
}

// Initialize Blob class
void blob_init(JSContext* ctx) {
    JSRuntime* rt = JS_GetRuntime(ctx);

    // Create the Blob class
    JS_NewClassID(&js_blob_class_id);
    JS_NewClass(rt, js_blob_class_id, &js_blob_class);

    // Create Blob prototype
    JSValue proto = JS_NewObject(ctx);

    // Add methods to prototype
    JS_SetPropertyStr(ctx, proto, "text", JS_NewCFunction(ctx, js_blob_text, "text", 0));
    JS_SetPropertyStr(ctx, proto, "arrayBuffer", JS_NewCFunction(ctx, js_blob_arrayBuffer, "arrayBuffer", 0));
    JS_SetPropertyStr(ctx, proto, "slice", JS_NewCFunction(ctx, js_blob_slice, "slice", 3));

    // Add property getters
    JSValue size_getter = JS_NewCFunction(ctx, js_blob_get_size, "get size", 0);
    JSValue type_getter = JS_NewCFunction(ctx, js_blob_get_type, "get type", 0);

    JS_DefinePropertyGetSet(ctx, proto, JS_NewAtom(ctx, "size"), size_getter, JS_UNDEFINED, JS_PROP_CONFIGURABLE);
    JS_DefinePropertyGetSet(ctx, proto, JS_NewAtom(ctx, "type"), type_getter, JS_UNDEFINED, JS_PROP_CONFIGURABLE);

    // Set the prototype
    JS_SetClassProto(ctx, js_blob_class_id, proto);

    // Create Blob constructor
    JSValue constructor = JS_NewCFunction2(ctx, js_blob_constructor, "Blob", 2, JS_CFUNC_constructor, 0);
    JS_SetConstructor(ctx, constructor, proto);

    // Add Blob to global object
    JSValue global = JS_GetGlobalObject(ctx);
    JS_SetPropertyStr(ctx, global, "Blob", constructor);

    // Initialize File class (after Blob)
    // Create the File class
    JS_NewClassID(&js_file_class_id);
    JS_NewClass(rt, js_file_class_id, &js_file_class);

    // Create File prototype
    JSValue file_proto = JS_NewObject(ctx);

    // Add methods to File prototype
    JS_SetPropertyStr(ctx, file_proto, "text", JS_NewCFunction(ctx, js_file_text, "text", 0));
    JS_SetPropertyStr(ctx, file_proto, "arrayBuffer", JS_NewCFunction(ctx, js_file_arrayBuffer, "arrayBuffer", 0));

    // Add property getters for File
    JSValue file_size_getter = JS_NewCFunction(ctx, js_file_get_size, "get size", 0);
    JSValue file_type_getter = JS_NewCFunction(ctx, js_file_get_type, "get type", 0);
    JSValue file_name_getter = JS_NewCFunction(ctx, js_file_get_name, "get name", 0);
    JSValue file_lastModified_getter = JS_NewCFunction(ctx, js_file_get_lastModified, "get lastModified", 0);

    JS_DefinePropertyGetSet(ctx, file_proto, JS_NewAtom(ctx, "size"), file_size_getter, JS_UNDEFINED, JS_PROP_CONFIGURABLE);
    JS_DefinePropertyGetSet(ctx, file_proto, JS_NewAtom(ctx, "type"), file_type_getter, JS_UNDEFINED, JS_PROP_CONFIGURABLE);
    JS_DefinePropertyGetSet(ctx, file_proto, JS_NewAtom(ctx, "name"), file_name_getter, JS_UNDEFINED, JS_PROP_CONFIGURABLE);
    JS_DefinePropertyGetSet(ctx, file_proto, JS_NewAtom(ctx, "lastModified"), file_lastModified_getter, JS_UNDEFINED, JS_PROP_CONFIGURABLE);

    // Set the File prototype
    JS_SetClassProto(ctx, js_file_class_id, file_proto);

    // Create File constructor
    JSValue file_constructor = JS_NewCFunction2(ctx, js_file_constructor, "File", 3, JS_CFUNC_constructor, 0);
    JS_SetConstructor(ctx, file_constructor, file_proto);

    // Add File to global object
    JS_SetPropertyStr(ctx, global, "File", file_constructor);

    JS_FreeValue(ctx, global);
}

// Create a Blob from data
JSValue blob_create(JSContext* ctx, const uint8_t* data, size_t size, const char* type) {
    JSRuntime* rt = JS_GetRuntime(ctx);

    // Allocate BlobData structure
    BlobData* blob = js_mallocz(ctx, sizeof(BlobData));
    if (!blob) {
        return JS_ThrowOutOfMemory(ctx);
    }

    // Allocate and copy data
    if (size > 0 && data) {
        blob->data = js_malloc(ctx, size);
        if (!blob->data) {
            js_free(ctx, blob);
            return JS_ThrowOutOfMemory(ctx);
        }
        memcpy(blob->data, data, size);
    } else {
        blob->data = NULL;
    }

    blob->size = size;

    // Copy type string
    if (type && *type) {
        size_t type_len = strlen(type);
        blob->type = js_malloc(ctx, type_len + 1);
        if (!blob->type) {
            if (blob->data) js_free(ctx, blob->data);
            js_free(ctx, blob);
            return JS_ThrowOutOfMemory(ctx);
        }
        strcpy(blob->type, type);
    } else {
        blob->type = NULL;
    }

    // Create JS object
    JSValue obj = JS_NewObjectClass(ctx, js_blob_class_id);
    if (JS_IsException(obj)) {
        if (blob->data) js_free_rt(rt, blob->data);
        if (blob->type) js_free_rt(rt, blob->type);
        js_free_rt(rt, blob);
        return obj;
    }

    JS_SetOpaque(obj, blob);
    return obj;
}

// Check if a value is a Blob
int blob_is_blob(JSContext* ctx, JSValueConst val) {
    return JS_GetOpaque(val, js_blob_class_id) != NULL;
}

// Get blob data
const uint8_t* blob_get_data(JSContext* ctx, JSValueConst val, size_t* out_size) {
    BlobData* blob = JS_GetOpaque(val, js_blob_class_id);
    if (!blob) {
        if (out_size) *out_size = 0;
        return NULL;
    }

    if (out_size) *out_size = blob->size;
    return blob->data;
}
