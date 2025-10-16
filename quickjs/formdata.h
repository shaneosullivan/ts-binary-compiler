#ifndef FORMDATA_H
#define FORMDATA_H

#include <quickjs/quickjs.h>

// Initialize FormData class
void formdata_init(JSContext* ctx);

// Create a FormData object
JSValue formdata_create(JSContext* ctx);

// Check if a value is a FormData object
int formdata_is_formdata(JSContext* ctx, JSValueConst val);

// Get the multipart body and content-type from a FormData object
// Returns a struct with body and content_type (caller must free both)
typedef struct {
    char* body;
    size_t body_length;
    char* content_type;  // Includes boundary
} FormDataResult;

FormDataResult* formdata_serialize(JSContext* ctx, JSValueConst formdata_val);
void formdata_free_result(FormDataResult* result);

#endif // FORMDATA_H
