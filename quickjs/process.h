#ifndef PROCESS_H
#define PROCESS_H

#include <quickjs/quickjs.h>

// Initialize process global object
void process_init(JSContext* ctx, int argc, char** argv);

#endif // PROCESS_H
