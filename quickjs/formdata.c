#include "formdata.h"
#include "blob.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

// FormData entry structure
typedef struct FormDataEntry {
    char* name;
    char* value;              // For string values
    JSValue blob_value;       // For Blob/File values
    int is_blob;
    char* filename;           // Optional filename for blobs
    struct FormDataEntry* next;
} FormDataEntry;

// FormData opaque data structure
typedef struct {
    FormDataEntry* entries;
    char* boundary;
} FormDataData;

// Class ID for FormData
static JSClassID js_formdata_class_id = 0;

// Generate a random boundary string
static char* generate_boundary(JSContext* ctx) {
    static const char charset[] = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    char* boundary = js_malloc(ctx, 48);
    if (!boundary) return NULL;

    strcpy(boundary, "----WebKitFormBoundary");

    // Generate random characters
    srand(time(NULL));
    for (int i = 22; i < 38; i++) {
        boundary[i] = charset[rand() % (sizeof(charset) - 1)];
    }
    boundary[38] = '\0';

    return boundary;
}

// Finalizer for FormData - frees the allocated memory
static void js_formdata_finalizer(JSRuntime* rt, JSValue val) {
    FormDataData* formdata = JS_GetOpaque(val, js_formdata_class_id);
    if (formdata) {
        // Free all entries
        FormDataEntry* entry = formdata->entries;
        while (entry) {
            FormDataEntry* next = entry->next;

            if (entry->name) js_free_rt(rt, entry->name);
            if (entry->value) js_free_rt(rt, entry->value);
            if (entry->filename) js_free_rt(rt, entry->filename);
            if (entry->is_blob) {
                JS_FreeValueRT(rt, entry->blob_value);
            }

            js_free_rt(rt, entry);
            entry = next;
        }

        if (formdata->boundary) js_free_rt(rt, formdata->boundary);
        js_free_rt(rt, formdata);
    }
}

// FormData class definition
static JSClassDef js_formdata_class = {
    "FormData",
    .finalizer = js_formdata_finalizer,
};

// FormData.append(name, value) or FormData.append(name, blob, filename)
static JSValue js_formdata_append(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    if (argc < 2) {
        return JS_ThrowTypeError(ctx, "FormData.append requires at least 2 arguments");
    }

    FormDataData* formdata = JS_GetOpaque(this_val, js_formdata_class_id);
    if (!formdata) {
        return JS_EXCEPTION;
    }

    const char* name = JS_ToCString(ctx, argv[0]);
    if (!name) {
        return JS_EXCEPTION;
    }

    // Create new entry
    FormDataEntry* entry = js_malloc(ctx, sizeof(FormDataEntry));
    if (!entry) {
        JS_FreeCString(ctx, name);
        return JS_ThrowOutOfMemory(ctx);
    }

    entry->name = js_strdup(ctx, name);
    entry->value = NULL;
    entry->blob_value = JS_UNDEFINED;
    entry->is_blob = 0;
    entry->filename = NULL;
    entry->next = NULL;

    JS_FreeCString(ctx, name);

    // Check if second argument is a Blob
    if (blob_is_blob(ctx, argv[1])) {
        entry->is_blob = 1;
        entry->blob_value = JS_DupValue(ctx, argv[1]);

        // Get filename if provided (3rd argument)
        if (argc >= 3 && !JS_IsUndefined(argv[2])) {
            const char* filename = JS_ToCString(ctx, argv[2]);
            if (filename) {
                entry->filename = js_strdup(ctx, filename);
                JS_FreeCString(ctx, filename);
            }
        }

        // Default filename if not provided
        if (!entry->filename) {
            entry->filename = js_strdup(ctx, "blob");
        }
    } else {
        // String value
        const char* value = JS_ToCString(ctx, argv[1]);
        if (!value) {
            js_free(ctx, entry->name);
            js_free(ctx, entry);
            return JS_EXCEPTION;
        }
        entry->value = js_strdup(ctx, value);
        JS_FreeCString(ctx, value);
    }

    // Append to list
    if (!formdata->entries) {
        formdata->entries = entry;
    } else {
        FormDataEntry* last = formdata->entries;
        while (last->next) {
            last = last->next;
        }
        last->next = entry;
    }

    return JS_UNDEFINED;
}

// FormData.delete(name)
static JSValue js_formdata_delete(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    if (argc < 1) {
        return JS_ThrowTypeError(ctx, "FormData.delete requires 1 argument");
    }

    FormDataData* formdata = JS_GetOpaque(this_val, js_formdata_class_id);
    if (!formdata) {
        return JS_EXCEPTION;
    }

    const char* name = JS_ToCString(ctx, argv[0]);
    if (!name) {
        return JS_EXCEPTION;
    }

    FormDataEntry** current = &formdata->entries;
    while (*current) {
        FormDataEntry* entry = *current;
        if (strcmp(entry->name, name) == 0) {
            *current = entry->next;

            // Free entry
            if (entry->name) js_free(ctx, entry->name);
            if (entry->value) js_free(ctx, entry->value);
            if (entry->filename) js_free(ctx, entry->filename);
            if (entry->is_blob) {
                JS_FreeValue(ctx, entry->blob_value);
            }
            js_free(ctx, entry);
        } else {
            current = &entry->next;
        }
    }

    JS_FreeCString(ctx, name);
    return JS_UNDEFINED;
}

// FormData.get(name)
static JSValue js_formdata_get(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    if (argc < 1) {
        return JS_ThrowTypeError(ctx, "FormData.get requires 1 argument");
    }

    FormDataData* formdata = JS_GetOpaque(this_val, js_formdata_class_id);
    if (!formdata) {
        return JS_EXCEPTION;
    }

    const char* name = JS_ToCString(ctx, argv[0]);
    if (!name) {
        return JS_EXCEPTION;
    }

    FormDataEntry* entry = formdata->entries;
    while (entry) {
        if (strcmp(entry->name, name) == 0) {
            JS_FreeCString(ctx, name);

            if (entry->is_blob) {
                return JS_DupValue(ctx, entry->blob_value);
            } else {
                return JS_NewString(ctx, entry->value);
            }
        }
        entry = entry->next;
    }

    JS_FreeCString(ctx, name);
    return JS_NULL;
}

// FormData.has(name)
static JSValue js_formdata_has(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    if (argc < 1) {
        return JS_ThrowTypeError(ctx, "FormData.has requires 1 argument");
    }

    FormDataData* formdata = JS_GetOpaque(this_val, js_formdata_class_id);
    if (!formdata) {
        return JS_EXCEPTION;
    }

    const char* name = JS_ToCString(ctx, argv[0]);
    if (!name) {
        return JS_EXCEPTION;
    }

    FormDataEntry* entry = formdata->entries;
    while (entry) {
        if (strcmp(entry->name, name) == 0) {
            JS_FreeCString(ctx, name);
            return JS_NewBool(ctx, 1);
        }
        entry = entry->next;
    }

    JS_FreeCString(ctx, name);
    return JS_NewBool(ctx, 0);
}

// FormData.set(name, value) or FormData.set(name, blob, filename)
static JSValue js_formdata_set(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    if (argc < 2) {
        return JS_ThrowTypeError(ctx, "FormData.set requires at least 2 arguments");
    }

    // Delete all existing entries with this name
    js_formdata_delete(ctx, this_val, 1, argv);

    // Append new entry
    return js_formdata_append(ctx, this_val, argc, argv);
}

// FormData constructor
static JSValue js_formdata_constructor(JSContext* ctx, JSValueConst new_target, int argc, JSValueConst* argv) {
    (void)new_target;
    (void)argc;
    (void)argv;

    return formdata_create(ctx);
}

// Initialize FormData class
void formdata_init(JSContext* ctx) {
    JSRuntime* rt = JS_GetRuntime(ctx);

    // Create the FormData class (only once)
    if (js_formdata_class_id == 0) {
        JS_NewClassID(&js_formdata_class_id);
        JS_NewClass(rt, js_formdata_class_id, &js_formdata_class);
    }

    // Create FormData prototype
    JSValue proto = JS_NewObject(ctx);

    // Add methods to prototype
    JS_SetPropertyStr(ctx, proto, "append", JS_NewCFunction(ctx, js_formdata_append, "append", 3));
    JS_SetPropertyStr(ctx, proto, "delete", JS_NewCFunction(ctx, js_formdata_delete, "delete", 1));
    JS_SetPropertyStr(ctx, proto, "get", JS_NewCFunction(ctx, js_formdata_get, "get", 1));
    JS_SetPropertyStr(ctx, proto, "has", JS_NewCFunction(ctx, js_formdata_has, "has", 1));
    JS_SetPropertyStr(ctx, proto, "set", JS_NewCFunction(ctx, js_formdata_set, "set", 3));

    // Set the prototype
    JS_SetClassProto(ctx, js_formdata_class_id, proto);

    // Create FormData constructor
    JSValue constructor = JS_NewCFunction2(ctx, js_formdata_constructor, "FormData", 0, JS_CFUNC_constructor, 0);
    JS_SetConstructor(ctx, constructor, proto);

    // Add FormData to global object
    JSValue global = JS_GetGlobalObject(ctx);
    JS_SetPropertyStr(ctx, global, "FormData", constructor);
    JS_FreeValue(ctx, global);
}

// Create a FormData object
JSValue formdata_create(JSContext* ctx) {
    // Allocate FormDataData structure
    FormDataData* formdata = js_mallocz(ctx, sizeof(FormDataData));
    if (!formdata) {
        return JS_ThrowOutOfMemory(ctx);
    }

    formdata->entries = NULL;
    formdata->boundary = generate_boundary(ctx);

    if (!formdata->boundary) {
        js_free(ctx, formdata);
        return JS_ThrowOutOfMemory(ctx);
    }

    // Create JS object
    JSValue obj = JS_NewObjectClass(ctx, js_formdata_class_id);
    if (JS_IsException(obj)) {
        js_free(ctx, formdata->boundary);
        js_free(ctx, formdata);
        return obj;
    }

    JS_SetOpaque(obj, formdata);
    return obj;
}

// Check if a value is a FormData object
int formdata_is_formdata(JSContext* ctx, JSValueConst val) {
    return JS_GetOpaque(val, js_formdata_class_id) != NULL;
}

// Serialize FormData to multipart/form-data format
FormDataResult* formdata_serialize(JSContext* ctx, JSValueConst formdata_val) {
    FormDataData* formdata = JS_GetOpaque(formdata_val, js_formdata_class_id);
    if (!formdata) {
        return NULL;
    }

    FormDataResult* result = malloc(sizeof(FormDataResult));
    if (!result) {
        return NULL;
    }

    // Build content-type with boundary
    result->content_type = malloc(strlen("multipart/form-data; boundary=") + strlen(formdata->boundary) + 1);
    if (!result->content_type) {
        free(result);
        return NULL;
    }
    sprintf(result->content_type, "multipart/form-data; boundary=%s", formdata->boundary);

    // Calculate total size needed
    size_t total_size = 0;
    FormDataEntry* entry = formdata->entries;

    while (entry) {
        // Boundary line
        total_size += strlen("--") + strlen(formdata->boundary) + strlen("\r\n");

        // Content-Disposition header
        total_size += strlen("Content-Disposition: form-data; name=\"\"") + strlen(entry->name) + strlen("\r\n");

        if (entry->is_blob) {
            // Add filename if present
            if (entry->filename) {
                total_size += strlen("; filename=\"\"") + strlen(entry->filename);
            }
            total_size += strlen("\r\n");

            // Content-Type header for blob
            JSValue type_val = JS_GetPropertyStr(ctx, entry->blob_value, "type");
            const char* type = JS_ToCString(ctx, type_val);
            const char* content_type = (type && *type) ? type : "application/octet-stream";
            total_size += strlen("Content-Type: ") + strlen(content_type) + strlen("\r\n");
            if (type) JS_FreeCString(ctx, type);
            JS_FreeValue(ctx, type_val);

            total_size += strlen("\r\n");

            // Blob data size
            JSValue size_val = JS_GetPropertyStr(ctx, entry->blob_value, "size");
            int64_t blob_size = 0;
            JS_ToInt64(ctx, &blob_size, size_val);
            JS_FreeValue(ctx, size_val);
            total_size += blob_size;
        } else {
            // String value
            total_size += strlen("\r\n\r\n");
            total_size += strlen(entry->value);
        }

        total_size += strlen("\r\n");
        entry = entry->next;
    }

    // Final boundary
    total_size += strlen("--") + strlen(formdata->boundary) + strlen("--\r\n");

    // Allocate body buffer
    result->body = malloc(total_size + 1);
    if (!result->body) {
        free(result->content_type);
        free(result);
        return NULL;
    }

    // Build the body
    char* ptr = result->body;
    entry = formdata->entries;

    while (entry) {
        // Boundary
        ptr += sprintf(ptr, "--%s\r\n", formdata->boundary);

        // Content-Disposition
        ptr += sprintf(ptr, "Content-Disposition: form-data; name=\"%s\"", entry->name);

        if (entry->is_blob) {
            if (entry->filename) {
                ptr += sprintf(ptr, "; filename=\"%s\"", entry->filename);
            }
            ptr += sprintf(ptr, "\r\n");

            // Content-Type
            JSValue type_val = JS_GetPropertyStr(ctx, entry->blob_value, "type");
            const char* type = JS_ToCString(ctx, type_val);
            const char* content_type = (type && *type) ? type : "application/octet-stream";
            ptr += sprintf(ptr, "Content-Type: %s\r\n\r\n", content_type);
            if (type) JS_FreeCString(ctx, type);
            JS_FreeValue(ctx, type_val);

            // Get blob data directly
            size_t blob_size = 0;
            const uint8_t* blob_data = blob_get_data(ctx, entry->blob_value, &blob_size);

            if (blob_data && blob_size > 0) {
                memcpy(ptr, blob_data, blob_size);
                ptr += blob_size;
            }
        } else {
            // String value
            ptr += sprintf(ptr, "\r\n\r\n%s", entry->value);
        }

        ptr += sprintf(ptr, "\r\n");
        entry = entry->next;
    }

    // Final boundary
    ptr += sprintf(ptr, "--%s--\r\n", formdata->boundary);

    result->body_length = ptr - result->body;

    return result;
}

// Free FormDataResult
void formdata_free_result(FormDataResult* result) {
    if (result) {
        if (result->body) free(result->body);
        if (result->content_type) free(result->content_type);
        free(result);
    }
}
