#include "process.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

// Get current working directory
static JSValue process_cwd(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)this_val;
    (void)argc;
    (void)argv;

    char cwd[4096];
    if (getcwd(cwd, sizeof(cwd)) != NULL) {
        return JS_NewString(ctx, cwd);
    } else {
        return JS_ThrowInternalError(ctx, "Failed to get current working directory");
    }
}

// Exit the process
static JSValue process_exit(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)this_val;
    (void)ctx;

    int exit_code = 0;
    if (argc > 0) {
        JS_ToInt32(ctx, &exit_code, argv[0]);
    }

    exit(exit_code);
    return JS_UNDEFINED; // Never reached
}

// Initialize process global object
void process_init(JSContext* ctx, int argc, char** argv) {
    JSValue process = JS_NewObject(ctx);

    // process.env - environment variables
    JSValue env = JS_NewObject(ctx);
    extern char** environ;

    if (environ) {
        for (char** env_ptr = environ; *env_ptr != NULL; env_ptr++) {
            char* env_var = *env_ptr;
            char* equals = strchr(env_var, '=');

            if (equals) {
                size_t key_len = equals - env_var;
                char* key = malloc(key_len + 1);
                if (key) {
                    memcpy(key, env_var, key_len);
                    key[key_len] = '\0';

                    char* value = equals + 1;
                    JS_SetPropertyStr(ctx, env, key, JS_NewString(ctx, value));
                    free(key);
                }
            }
        }
    }

    JS_SetPropertyStr(ctx, process, "env", env);

    // process.argv - command line arguments
    JSValue argv_array = JS_NewArray(ctx);

    // argv[0] is typically the executable path
    JS_SetPropertyUint32(ctx, argv_array, 0, JS_NewString(ctx, "quickjs"));

    // Add any additional arguments (if we want to support them in the future)
    for (int i = 0; i < argc; i++) {
        JS_SetPropertyUint32(ctx, argv_array, i + 1, JS_NewString(ctx, argv[i]));
    }

    JS_SetPropertyStr(ctx, process, "argv", argv_array);

    // process.cwd() - get current working directory
    JS_SetPropertyStr(ctx, process, "cwd", JS_NewCFunction(ctx, process_cwd, "cwd", 0));

    // process.exit() - exit the process
    JS_SetPropertyStr(ctx, process, "exit", JS_NewCFunction(ctx, process_exit, "exit", 1));

    // process.platform - operating system platform
#ifdef __APPLE__
    JS_SetPropertyStr(ctx, process, "platform", JS_NewString(ctx, "darwin"));
#elif defined(__linux__)
    JS_SetPropertyStr(ctx, process, "platform", JS_NewString(ctx, "linux"));
#elif defined(_WIN32) || defined(_WIN64)
    JS_SetPropertyStr(ctx, process, "platform", JS_NewString(ctx, "win32"));
#else
    JS_SetPropertyStr(ctx, process, "platform", JS_NewString(ctx, "unknown"));
#endif

    // process.arch - processor architecture
#if defined(__x86_64__) || defined(_M_X64)
    JS_SetPropertyStr(ctx, process, "arch", JS_NewString(ctx, "x64"));
#elif defined(__aarch64__) || defined(_M_ARM64)
    JS_SetPropertyStr(ctx, process, "arch", JS_NewString(ctx, "arm64"));
#elif defined(__i386__) || defined(_M_IX86)
    JS_SetPropertyStr(ctx, process, "arch", JS_NewString(ctx, "x86"));
#elif defined(__arm__) || defined(_M_ARM)
    JS_SetPropertyStr(ctx, process, "arch", JS_NewString(ctx, "arm"));
#else
    JS_SetPropertyStr(ctx, process, "arch", JS_NewString(ctx, "unknown"));
#endif

    // process.version - Node.js compatible version string
    JS_SetPropertyStr(ctx, process, "version", JS_NewString(ctx, "v20.0.0-quickjs"));

    // process.pid - process ID
    JS_SetPropertyStr(ctx, process, "pid", JS_NewInt32(ctx, getpid()));

    // Add process to global object
    JSValue global = JS_GetGlobalObject(ctx);
    JS_SetPropertyStr(ctx, global, "process", process);
    JS_FreeValue(ctx, global);
}
