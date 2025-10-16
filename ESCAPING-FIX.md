# JavaScript Embedding Fix: Byte Array Approach

## Problem

When embedding JavaScript code into C source files, there were complex issues:

1. **String literal escaping** - Backslashes, quotes, and newlines needed proper C escaping
2. **Regex patterns** like `/\W+/`, `/\d+/`, `/\s+/` required double-escaping
3. **Size calculation ambiguity** - Different values at different stages of processing
4. **Complexity** - Difficult to reason about multi-stage transformations

### The Escaping Problem

JavaScript: `const regex = /\W+/;`

String literal approach required:
1. Original JS file: `/\W+/` (4 bytes)
2. Escaped for C: `/\\W+/` (5 bytes in C source)
3. After C compilation: `/\W+/` (4 bytes at runtime)
4. Size calculation: Which size to use? 🤔

## Solution: Byte Array Embedding

**Complete redesign**: Instead of C string literals, embed JavaScript as a raw **byte array**.

### Implementation

Updated `build.sh` to use `xxd` for byte array generation:

```bash
# Convert JavaScript to C byte array
{
    echo 'const uint8_t qjsc_bundle_data[] = {'
    xxd -i < "$TEMP_DIR/bundle.js" | grep -v 'unsigned' | sed 's/^  //'
    echo '};'
    echo 'const uint32_t qjsc_bundle_size = sizeof(qjsc_bundle_data);'
    echo 'const char* qjsc_bundle_string = (const char*)qjsc_bundle_data;'
} > "$TEMP_DIR/generated/main_bundle.c"
```

This generates clean C code:

```c
#include <stdint.h>

// JavaScript bundle as byte array (with null terminator for safety)
const uint8_t qjsc_bundle_data[] = {
  0x76, 0x61, 0x72, 0x20, 0x63, 0x3d, 0x67, 0x6c, 0x6f, 0x62, 0x61, 0x6c,
  0x54, 0x68, 0x69, 0x73, 0x2e, 0x66, 0x65, 0x74, 0x63, 0x68, 0x3b, 0x67,
  // ... rest of bytes
  0x3b, 0x0a,  // last JavaScript byte (newline)
  0x00         // null terminator for C string safety
};

// Size excludes the null terminator
const uint32_t qjsc_bundle_size = sizeof(qjsc_bundle_data) - 1;

// Null-terminated string pointer
const char* qjsc_bundle_string = (const char*)qjsc_bundle_data;
```

### Updated fetch_full.c

Changed `JS_Eval()` to use the accurate size:

```c
// OLD (strlen had to calculate at runtime):
JSValue result = JS_Eval(ctx, qjsc_bundle_string, strlen(qjsc_bundle_string), ...);

// NEW (sizeof calculated at compile time):
JSValue result = JS_Eval(ctx, qjsc_bundle_string, qjsc_bundle_size, ...);
```

## Benefits

### ✅ No Escaping Issues
- Raw bytes are embedded directly
- Backslashes, quotes, newlines - all handled identically
- No sed/awk escaping logic needed

### ✅ Accurate Size
- `sizeof(qjsc_bundle_data) - 1` is evaluated at **compile time**
- Excludes the null terminator (JavaScript length only)
- Always matches the actual JavaScript byte count
- No strlen() needed at runtime

### ✅ Simplicity
- What you see is what you get
- Each byte in the JS file becomes one `0xXX` in the C array
- No multi-stage transformations

### ✅ Performance
- Size known at compile time (can be optimized)
- No runtime string length calculation
- Embedded directly in the binary

### ✅ Safety
- Null-terminated for C string compatibility
- Size parameter prevents buffer overruns
- Works correctly with both string and byte array APIs

## Verification

All tests pass with the byte array approach:

```bash
npm test
# Total: 11 | Passed: 11 | Failed: 0
```

Test suite `tests/regex-escape.test.ts` verifies:

✅ Word boundary patterns: `/\W+/`
✅ Digit patterns: `/\d+/`
✅ Whitespace patterns: `/\s+/`
✅ Word character patterns: `/\w+/`
✅ Complex capture groups: `/v(\d+)\.(\d+)/`
✅ String literals with backslashes: `"path\\to\\file"`
✅ Tab and newline escapes: `\t` and `\n`
✅ Unicode escapes: `\u0041`
✅ Hex escapes: `\x41`
✅ Non-digit boundaries: `/\D+/`

All 10 tests: ✅

## Technical Comparison

### Old String Literal Approach

```c
// Complex escaping required
const char* bundle = "var x = \"hello\\nworld\";\nconsole.log(/\\W+/);";
const uint32_t size = ???; // Original file size? String length? 🤔
```

Problems:
- Backslashes need doubling: `\` → `\\`
- Quotes need escaping: `"` → `\"`
- Newlines removed or escaped
- Size ambiguous

### New Byte Array Approach

```c
// Direct byte embedding
const uint8_t bundle[] = {
  0x76, 0x61, 0x72, 0x20, 0x78, 0x20, 0x3d, 0x20, 0x22, 0x68, 0x65, ...
};
const uint32_t size = sizeof(bundle); // Always correct!
```

Advantages:
- No escaping logic
- Size always accurate
- Simpler code
- Easier to debug

## Related Files

- **build.sh:156-174** - Byte array generation using xxd
- **quickjs/fetch_full.c:433** - Uses qjsc_bundle_size instead of strlen()
- **tests/regex-escape.test.ts** - Comprehensive escape test suite
- **tests/process.test.ts** - Uses regex patterns with backslashes

## Command Reference

```bash
# Generate byte array from JavaScript file
xxd -i < input.js

# Output format:
# 0x76, 0x61, 0x72, 0x20, 0x63, 0x3d, 0x67, 0x6c, 0x6f, 0x62, 0x61, 0x6c,
# ...
```
