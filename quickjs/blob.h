#ifndef BLOB_H
#define BLOB_H

#include <quickjs/quickjs.h>

// Initialize Blob class
void blob_init(JSContext* ctx);

// Create a Blob from data
JSValue blob_create(JSContext* ctx, const uint8_t* data, size_t size, const char* type);

// Blob constructor
JSValue js_blob_constructor(JSContext* ctx, JSValueConst new_target, int argc, JSValueConst* argv);

#endif // BLOB_H
