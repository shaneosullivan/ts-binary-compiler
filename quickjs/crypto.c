#include "crypto.h"
#include <quickjs/quickjs.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/time.h>
#include <time.h>

// Flag to track if /dev/urandom is available
static int urandom_available = -1; // -1 = not checked, 0 = unavailable, 1 = available

// Check if /dev/urandom is available
static int check_urandom() {
    if (urandom_available != -1) {
        return urandom_available;
    }

    int fd = open("/dev/urandom", O_RDONLY);
    if (fd >= 0) {
        close(fd);
        urandom_available = 1;
        return 1;
    }

    urandom_available = 0;
    return 0;
}

// Get random bytes from /dev/urandom
static int get_random_bytes_urandom(uint8_t* buffer, size_t length) {
    int fd = open("/dev/urandom", O_RDONLY);
    if (fd < 0) {
        return 0;
    }

    size_t total_read = 0;
    while (total_read < length) {
        ssize_t bytes_read = read(fd, buffer + total_read, length - total_read);
        if (bytes_read <= 0) {
            close(fd);
            return 0;
        }
        total_read += bytes_read;
    }

    close(fd);
    return 1;
}

// Fallback random number generator using time and other sources
// NOTE: This is NOT cryptographically secure, but reasonable for fallback
static void get_random_bytes_fallback(uint8_t* buffer, size_t length) {
    static int seeded = 0;

    if (!seeded) {
        // Seed with multiple sources of entropy
        struct timeval tv;
        gettimeofday(&tv, NULL);
        unsigned int seed = (unsigned int)(tv.tv_sec ^ tv.tv_usec ^ getpid());
        srand(seed);
        seeded = 1;
    }

    for (size_t i = 0; i < length; i++) {
        // Mix multiple rand() calls for better distribution
        buffer[i] = (uint8_t)((rand() ^ (rand() >> 8)) & 0xFF);
    }
}

// Get random bytes (tries /dev/urandom first, falls back if unavailable)
static void get_random_bytes(uint8_t* buffer, size_t length) {
    if (check_urandom()) {
        if (get_random_bytes_urandom(buffer, length)) {
            return;
        }
    }

    // Fallback to pseudo-random
    get_random_bytes_fallback(buffer, length);
}

// ============================================
// crypto.getRandomValues(typedArray)
// ============================================
static JSValue crypto_getRandomValues(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)this_val;

    if (argc < 1) {
        return JS_ThrowTypeError(ctx, "getRandomValues requires 1 argument");
    }

    // Check if it's a TypedArray
    JSValue buffer = JS_GetPropertyStr(ctx, argv[0], "buffer");
    if (JS_IsUndefined(buffer)) {
        JS_FreeValue(ctx, buffer);
        return JS_ThrowTypeError(ctx, "Argument must be a TypedArray");
    }

    // Get byteOffset and byteLength
    JSValue byte_offset_val = JS_GetPropertyStr(ctx, argv[0], "byteOffset");
    JSValue byte_length_val = JS_GetPropertyStr(ctx, argv[0], "byteLength");

    int32_t byte_offset = 0;
    int32_t byte_length = 0;
    JS_ToInt32(ctx, &byte_offset, byte_offset_val);
    JS_ToInt32(ctx, &byte_length, byte_length_val);

    JS_FreeValue(ctx, byte_offset_val);
    JS_FreeValue(ctx, byte_length_val);

    // Get the underlying ArrayBuffer
    size_t buffer_size;
    uint8_t* buffer_data = JS_GetArrayBuffer(ctx, &buffer_size, buffer);
    JS_FreeValue(ctx, buffer);

    if (!buffer_data) {
        return JS_ThrowTypeError(ctx, "Failed to get ArrayBuffer data");
    }

    // Check bounds
    if (byte_offset < 0 || byte_length < 0 ||
        (size_t)(byte_offset + byte_length) > buffer_size) {
        return JS_ThrowRangeError(ctx, "TypedArray bounds exceeded");
    }

    // Limit to 65536 bytes as per Web Crypto API spec
    if (byte_length > 65536) {
        return JS_ThrowRangeError(ctx, "TypedArray size exceeds 65536 bytes");
    }

    // Fill with random bytes
    get_random_bytes(buffer_data + byte_offset, byte_length);

    // Return the same TypedArray
    return JS_DupValue(ctx, argv[0]);
}

// ============================================
// crypto.randomUUID()
// Generates a RFC 4122 version 4 UUID
// ============================================
static JSValue crypto_randomUUID(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    (void)this_val;
    (void)argc;
    (void)argv;

    // Get 16 random bytes
    uint8_t bytes[16];
    get_random_bytes(bytes, 16);

    // Set version (4) and variant bits according to RFC 4122
    bytes[6] = (bytes[6] & 0x0F) | 0x40;  // Version 4 (0100xxxx)
    bytes[8] = (bytes[8] & 0x3F) | 0x80;  // Variant (10xxxxxx)

    // Format as UUID string: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    char uuid[37];
    snprintf(uuid, sizeof(uuid),
             "%02x%02x%02x%02x-%02x%02x-%02x%02x-%02x%02x-%02x%02x%02x%02x%02x%02x",
             bytes[0], bytes[1], bytes[2], bytes[3],
             bytes[4], bytes[5],
             bytes[6], bytes[7],
             bytes[8], bytes[9],
             bytes[10], bytes[11], bytes[12], bytes[13], bytes[14], bytes[15]);

    return JS_NewString(ctx, uuid);
}

// ============================================
// Initialize crypto API
// ============================================
void init_crypto_api(JSContext* ctx, JSValue global) {
    // Create crypto object
    JSValue crypto_obj = JS_NewObject(ctx);

    // Add methods to crypto object
    JS_SetPropertyStr(ctx, crypto_obj, "getRandomValues",
                      JS_NewCFunction(ctx, crypto_getRandomValues, "getRandomValues", 1));
    JS_SetPropertyStr(ctx, crypto_obj, "randomUUID",
                      JS_NewCFunction(ctx, crypto_randomUUID, "randomUUID", 0));

    // Add crypto to global object
    JS_SetPropertyStr(ctx, global, "crypto", crypto_obj);
}
