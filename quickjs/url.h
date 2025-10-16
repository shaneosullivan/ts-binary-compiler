#ifndef URL_H
#define URL_H

#include <quickjs/quickjs.h>

// Initialize URL and URLSearchParams APIs in the global scope
void init_url_api(JSContext* ctx, JSValue global);

#endif // URL_H
