# Backslash Escaping Fix

## Problem

When embedding JavaScript code into C string literals in `build.sh`, backslashes were not being properly escaped. This caused issues with:

1. **Regex patterns** like `/\W+/`, `/\d+/`, `/\s+/` where the backslashes are meaningful
2. **String literals** containing backslashes like `"path\\to\\file"`
3. **Escape sequences** in JavaScript being corrupted when converted to C

### Example Issue

JavaScript regex: `/\W+(\d+)\.(\d+)/`

Old C embedding: `const char* str = "/\W+(\d+)\.(\d+)/";` ❌ WRONG
- The `\W` becomes just `W` (invalid escape sequence)
- The `\d` becomes just `d`

Correct C embedding: `const char* str = "/\\W+(\\d+)\\.(\\d+)/";` ✅ CORRECT
- Each `\` in JavaScript becomes `\\` in the C string literal
- The C compiler interprets `\\` as a single backslash

## Solution

Updated `build.sh` line 156 to escape backslashes **before** escaping quotes:

```bash
# OLD (incorrect):
BUNDLE_CONTENT=$(cat "$TEMP_DIR/bundle.js" | sed 's/"/\\"/g' | tr -d '\n')

# NEW (correct):
BUNDLE_CONTENT=$(cat "$TEMP_DIR/bundle.js" | sed 's/\\/\\\\/g' | sed 's/"/\\"/g' | tr -d '\n')
```

### Why order matters:

1. First `sed 's/\\/\\\\/g'` - Convert every `\` to `\\`
2. Then `sed 's/"/\\"/g'` - Convert every `"` to `\"`

If we did quotes first, we'd accidentally double-escape the backslashes we add for quotes.

## Verification

Created comprehensive test suite in `tests/regex-escape.test.ts` that verifies:

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

All 10 tests pass: ✅

## Related Files

- **build.sh:156** - Fixed escaping logic
- **tests/regex-escape.test.ts** - Comprehensive test suite
- **tests/simple-backslash.test.ts** - Debugging test
- **tests/process.test.ts** - Uses regex patterns with backslashes
- **tests/process-exit.test.ts** - Tests `process.exit()`

## Technical Details

### C String Literal Rules

In C, backslashes are escape characters:
- `\n` = newline
- `\t` = tab
- `\"` = double quote
- `\\` = literal backslash

To get a single backslash in the final string, you need `\\` in the C source.

### JavaScript String Rules

In JavaScript, backslashes are also escape characters:
- `\n` = newline
- `\t` = tab
- `\"` = double quote
- `\\` = literal backslash

### Double Escaping

When embedding JavaScript strings into C strings, we get **double escaping**:

| JavaScript Source | JavaScript String Value | C Source Needed | C String Value |
|------------------|------------------------|-----------------|----------------|
| `"path\\to\\file"` | `path\to\file` (12 chars) | `"path\\\\to\\\\file"` | `path\to\file` |
| `/\W+/` | `/\W+/` | `/\\W+/` | `/\W+/` |
| `"\n"` | newline | `"\\n"` | newline |

The sed command handles this transformation automatically now.
