#include "encoding.h"
#include <quickjs/quickjs.h>
#include <string.h>
#include <stdlib.h>

// Base64 encoding table
static const char base64_chars[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

// Base64 decoding table
static int base64_decode_table[256];
static int base64_table_initialized = 0;

static void init_base64_decode_table() {
    if (base64_table_initialized) return;

    memset(base64_decode_table, -1, sizeof(base64_decode_table));
    for (int i = 0; i < 64; i++) {
        base64_decode_table[(unsigned char)base64_chars[i]] = i;
    }
    base64_decode_table[(unsigned char)'='] = 0;
    base64_table_initialized = 1;
}

// Base64 encode function
static char* base64_encode(const unsigned char* data, size_t input_length, size_t* output_length) {
    *output_length = 4 * ((input_length + 2) / 3);
    char* encoded = (char*)malloc(*output_length + 1);
    if (!encoded) return NULL;

    size_t i, j;
    for (i = 0, j = 0; i < input_length;) {
        uint32_t octet_a = i < input_length ? data[i++] : 0;
        uint32_t octet_b = i < input_length ? data[i++] : 0;
        uint32_t octet_c = i < input_length ? data[i++] : 0;

        uint32_t triple = (octet_a << 16) + (octet_b << 8) + octet_c;

        encoded[j++] = base64_chars[(triple >> 18) & 0x3F];
        encoded[j++] = base64_chars[(triple >> 12) & 0x3F];
        encoded[j++] = base64_chars[(triple >> 6) & 0x3F];
        encoded[j++] = base64_chars[triple & 0x3F];
    }

    // Add padding
    int padding = (3 - (input_length % 3)) % 3;
    for (int p = 0; p < padding; p++) {
        encoded[*output_length - 1 - p] = '=';
    }

    encoded[*output_length] = '\0';
    return encoded;
}

// Base64 decode function
static unsigned char* base64_decode(const char* data, size_t input_length, size_t* output_length) {
    init_base64_decode_table();

    if (input_length % 4 != 0) return NULL;

    *output_length = input_length / 4 * 3;
    if (data[input_length - 1] == '=') (*output_length)--;
    if (data[input_length - 2] == '=') (*output_length)--;

    unsigned char* decoded = (unsigned char*)malloc(*output_length + 1);
    if (!decoded) return NULL;

    size_t i, j;
    for (i = 0, j = 0; i < input_length;) {
        uint32_t sextet_a = data[i] == '=' ? 0 : base64_decode_table[(unsigned char)data[i]]; i++;
        uint32_t sextet_b = data[i] == '=' ? 0 : base64_decode_table[(unsigned char)data[i]]; i++;
        uint32_t sextet_c = data[i] == '=' ? 0 : base64_decode_table[(unsigned char)data[i]]; i++;
        uint32_t sextet_d = data[i] == '=' ? 0 : base64_decode_table[(unsigned char)data[i]]; i++;

        uint32_t triple = (sextet_a << 18) + (sextet_b << 12) + (sextet_c << 6) + sextet_d;

        if (j < *output_length) decoded[j++] = (triple >> 16) & 0xFF;
        if (j < *output_length) decoded[j++] = (triple >> 8) & 0xFF;
        if (j < *output_length) decoded[j++] = triple & 0xFF;
    }

    decoded[*output_length] = '\0';
    return decoded;
}

// ============================================
// atob (base64 string to binary string)
// ============================================
static JSValue js_atob(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    if (argc < 1) {
        return JS_ThrowTypeError(ctx, "atob requires 1 argument");
    }

    const char* encoded = JS_ToCString(ctx, argv[0]);
    if (!encoded) {
        return JS_EXCEPTION;
    }

    size_t input_length = strlen(encoded);
    size_t output_length;
    unsigned char* decoded = base64_decode(encoded, input_length, &output_length);
    JS_FreeCString(ctx, encoded);

    if (!decoded) {
        return JS_ThrowTypeError(ctx, "Invalid base64 string");
    }

    JSValue result = JS_NewStringLen(ctx, (const char*)decoded, output_length);
    free(decoded);

    return result;
}

// ============================================
// btoa (binary string to base64)
// ============================================
static JSValue js_btoa(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    if (argc < 1) {
        return JS_ThrowTypeError(ctx, "btoa requires 1 argument");
    }

    size_t input_length;
    const char* input = JS_ToCStringLen(ctx, &input_length, argv[0]);
    if (!input) {
        return JS_EXCEPTION;
    }

    size_t output_length;
    char* encoded = base64_encode((const unsigned char*)input, input_length, &output_length);
    JS_FreeCString(ctx, input);

    if (!encoded) {
        return JS_ThrowTypeError(ctx, "Failed to encode base64");
    }

    JSValue result = JS_NewString(ctx, encoded);
    free(encoded);

    return result;
}

// ============================================
// TextEncoder.encode() - UTF-8 encoding
// ============================================
static JSValue text_encoder_encode(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    if (argc < 1) {
        return JS_ThrowTypeError(ctx, "encode requires 1 argument");
    }

    size_t str_len;
    const char* str = JS_ToCStringLen(ctx, &str_len, argv[0]);
    if (!str) {
        return JS_EXCEPTION;
    }

    // Create a Uint8Array with the UTF-8 bytes
    JSValue array_buffer = JS_NewArrayBufferCopy(ctx, (const uint8_t*)str, str_len);
    if (JS_IsException(array_buffer)) {
        JS_FreeCString(ctx, str);
        return JS_EXCEPTION;
    }

    // Create Uint8Array from ArrayBuffer
    JSValue global = JS_GetGlobalObject(ctx);
    JSValue uint8_array_ctor = JS_GetPropertyStr(ctx, global, "Uint8Array");
    JS_FreeValue(ctx, global);

    JSValue args[1] = { array_buffer };
    JSValue result = JS_CallConstructor(ctx, uint8_array_ctor, 1, args);

    JS_FreeValue(ctx, uint8_array_ctor);
    JS_FreeValue(ctx, array_buffer);
    JS_FreeCString(ctx, str);

    return result;
}

// ============================================
// TextEncoder constructor
// ============================================
static JSValue text_encoder_constructor(JSContext* ctx, JSValueConst new_target, int argc, JSValueConst* argv) {
    JSValue obj = JS_NewObject(ctx);

    // Add encoding property (always UTF-8)
    JS_SetPropertyStr(ctx, obj, "encoding", JS_NewString(ctx, "utf-8"));

    // Add encode method
    JS_SetPropertyStr(ctx, obj, "encode", JS_NewCFunction(ctx, text_encoder_encode, "encode", 1));

    return obj;
}

// ============================================
// TextDecoder.decode() - UTF-8 decoding
// ============================================
static JSValue text_decoder_decode(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    if (argc < 1) {
        // Return empty string if no argument
        return JS_NewString(ctx, "");
    }

    // Check if it's a TypedArray or ArrayBuffer
    size_t byte_length;
    uint8_t* data = NULL;

    // Try to get ArrayBuffer
    JSValue buffer = JS_GetPropertyStr(ctx, argv[0], "buffer");
    if (!JS_IsUndefined(buffer)) {
        // It's a TypedArray, get the buffer
        data = JS_GetArrayBuffer(ctx, &byte_length, buffer);
        JS_FreeValue(ctx, buffer);

        if (!data) {
            // Try to get byteOffset and byteLength for proper slicing
            JSValue byte_offset_val = JS_GetPropertyStr(ctx, argv[0], "byteOffset");
            JSValue byte_length_val = JS_GetPropertyStr(ctx, argv[0], "byteLength");

            int32_t byte_offset = 0;
            JS_ToInt32(ctx, &byte_offset, byte_offset_val);
            JS_ToInt32(ctx, (int32_t*)&byte_length, byte_length_val);

            JS_FreeValue(ctx, byte_offset_val);
            JS_FreeValue(ctx, byte_length_val);

            // Get buffer again and adjust pointer
            buffer = JS_GetPropertyStr(ctx, argv[0], "buffer");
            size_t full_length;
            uint8_t* full_data = JS_GetArrayBuffer(ctx, &full_length, buffer);
            JS_FreeValue(ctx, buffer);

            if (full_data) {
                data = full_data + byte_offset;
            }
        }
    } else {
        // Try direct ArrayBuffer
        data = JS_GetArrayBuffer(ctx, &byte_length, argv[0]);
    }

    if (!data) {
        return JS_ThrowTypeError(ctx, "Argument must be a TypedArray or ArrayBuffer");
    }

    // Create string from UTF-8 bytes
    JSValue result = JS_NewStringLen(ctx, (const char*)data, byte_length);

    return result;
}

// ============================================
// TextDecoder constructor
// ============================================
static JSValue text_decoder_constructor(JSContext* ctx, JSValueConst new_target, int argc, JSValueConst* argv) {
    JSValue obj = JS_NewObject(ctx);

    // Get encoding parameter (default to UTF-8)
    const char* encoding = "utf-8";
    if (argc > 0) {
        encoding = JS_ToCString(ctx, argv[0]);
        if (!encoding) encoding = "utf-8";
    }

    // Add encoding property
    JS_SetPropertyStr(ctx, obj, "encoding", JS_NewString(ctx, encoding));

    if (argc > 0) {
        JS_FreeCString(ctx, encoding);
    }

    // Add decode method
    JS_SetPropertyStr(ctx, obj, "decode", JS_NewCFunction(ctx, text_decoder_decode, "decode", 1));

    return obj;
}

// ============================================
// Initialize all encoding APIs
// ============================================
void init_encoding_api(JSContext* ctx, JSValue global) {
    // Register atob and btoa
    JS_SetPropertyStr(ctx, global, "atob", JS_NewCFunction(ctx, js_atob, "atob", 1));
    JS_SetPropertyStr(ctx, global, "btoa", JS_NewCFunction(ctx, js_btoa, "btoa", 1));

    // Register TextEncoder
    JSValue text_encoder_ctor = JS_NewCFunction2(ctx, text_encoder_constructor, "TextEncoder", 0, JS_CFUNC_constructor, 0);
    JS_SetPropertyStr(ctx, global, "TextEncoder", text_encoder_ctor);

    // Register TextDecoder
    JSValue text_decoder_ctor = JS_NewCFunction2(ctx, text_decoder_constructor, "TextDecoder", 1, JS_CFUNC_constructor, 0);
    JS_SetPropertyStr(ctx, global, "TextDecoder", text_decoder_ctor);
}
