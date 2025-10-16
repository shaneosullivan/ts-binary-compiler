#ifndef BLOB_H
#define BLOB_H

#include <quickjs/quickjs.h>

// Initialize Blob class
void blob_init(JSContext* ctx);

// Create a Blob from data
JSValue blob_create(JSContext* ctx, const uint8_t* data, size_t size, const char* type);

// Blob constructor
JSValue js_blob_constructor(JSContext* ctx, JSValueConst new_target, int argc, JSValueConst* argv);

// Check if a value is a Blob
int blob_is_blob(JSContext* ctx, JSValueConst val);

// Get blob data (returns pointer and size - caller must not free)
const uint8_t* blob_get_data(JSContext* ctx, JSValueConst val, size_t* out_size);

#endif // BLOB_H
