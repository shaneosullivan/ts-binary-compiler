#ifndef ENCODING_H
#define ENCODING_H

#include <quickjs/quickjs.h>

// Initialize TextEncoder, TextDecoder, atob, and btoa APIs in the global scope
void init_encoding_api(JSContext* ctx, JSValue global);

#endif // ENCODING_H
