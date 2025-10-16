#ifndef CRYPTO_H
#define CRYPTO_H

#include <quickjs/quickjs.h>

// Initialize crypto API in the global scope
void init_crypto_api(JSContext* ctx, JSValue global);

#endif // CRYPTO_H
