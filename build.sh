#!/bin/bash
set -e

# Configurable build script for ts-binary-compiler
# 
# Usage: ./build.sh <input_file> [output_path]
#
# Arguments:
#   input_file   - TypeScript file to compile (required)
#   output_path  - Output file or directory (optional, defaults to current directory)
#                  If directory: uses input filename without extension
#                  If file: uses exact path
#                  On Windows: adds .exe extension if not specified
#
# Environment variables:
#   TEMP_DIR     - Directory for temporary artifacts (default: ~/.ts-binary-compiler)
#
# Examples:
#   ./build.sh main.ts                           # Output: ./main (or ./main.exe on Windows)
#   ./build.sh main.ts myapp                     # Output: ./myapp (or ./myapp.exe on Windows)
#   ./build.sh main.ts ./build/                  # Output: ./build/main (or ./build/main.exe on Windows)
#   ./build.sh main.ts ./build/myapp             # Output: ./build/myapp

# Check for required input file argument
if [ $# -eq 0 ]; then
    echo "❌ Error: Input file is required"
    echo ""
    echo "Usage: $0 <input_file> [output_path]"
    echo ""
    echo "Examples:"
    echo "  $0 main.ts                    # Output to current directory"
    echo "  $0 main.ts myapp              # Output as 'myapp'"
    echo "  $0 main.ts ./build/           # Output to build directory (recommended for test files)"
    echo "  $0 main.ts ./build/myapp      # Output as './build/myapp'"
    echo ""
    echo "Note: Test binaries should be output to ./build/ to keep the repository root clean."
    exit 1
fi

INPUT_FILE="$1"
OUTPUT_PATH="$2"

# Validate input file exists
if [ ! -f "$INPUT_FILE" ]; then
    echo "❌ Error: Input file '$INPUT_FILE' not found"
    exit 1
fi

# Extract filename without extension for default naming
INPUT_BASENAME=$(basename "$INPUT_FILE" .ts)

# Determine output path
if [ -z "$OUTPUT_PATH" ]; then
    # No output path specified, use current directory
    OUTPUT_DIR="."
    OUTPUT_NAME="$INPUT_BASENAME"
elif [ -d "$OUTPUT_PATH" ] || [[ "$OUTPUT_PATH" == */ ]]; then
    # Output path is a directory
    OUTPUT_DIR="$OUTPUT_PATH"
    OUTPUT_NAME="$INPUT_BASENAME"
else
    # Output path includes filename
    OUTPUT_DIR=$(dirname "$OUTPUT_PATH")
    OUTPUT_NAME=$(basename "$OUTPUT_PATH")
fi

# Add .exe extension on Windows if not already present
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" || "$OSTYPE" == "cygwin" ]]; then
    if [[ "$OUTPUT_NAME" != *.exe ]]; then
        OUTPUT_NAME="$OUTPUT_NAME.exe"
    fi
fi

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Set full output path (make it absolute)
if [[ "$OUTPUT_DIR" == /* ]]; then
    # OUTPUT_DIR is already absolute
    FULL_OUTPUT_PATH="$OUTPUT_DIR/$OUTPUT_NAME"
else
    # OUTPUT_DIR is relative, make it absolute
    FULL_OUTPUT_PATH="$(pwd)/$OUTPUT_DIR/$OUTPUT_NAME"
fi

echo "🚀 Building QuickJS standalone binary with full fetch API..."
echo "========================================================="
echo "📄 Input file: $INPUT_FILE"
echo "📍 Output path: $FULL_OUTPUT_PATH"

# Set configurable temp directory (default: ~/.ts-binary-compiler)
TEMP_DIR=${TEMP_DIR:-"$HOME/.ts-binary-compiler"}

# Clean and create temp directory
echo "🧹 Cleaning temporary directory..."
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"

# Check if QuickJS is available
if ! command -v qjsc &> /dev/null; then
    echo "❌ QuickJS not found!"
    echo "📦 Install QuickJS with: brew install quickjs"
    echo "   or compile from source: https://bellard.org/quickjs/"
    exit 1
fi

# Determine package root directory FIRST (moved from later in the script)
if [ -n "$TSBC_PACKAGE_ROOT" ]; then
    SCRIPT_DIR="$TSBC_PACKAGE_ROOT"
else
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
fi

# Check for dependencies in package directory (not current directory)
if [ ! -f "$SCRIPT_DIR/node_modules/.bin/tsc" ]; then
    echo "📦 Installing dependencies in $SCRIPT_DIR..."
    (cd "$SCRIPT_DIR" && npm install)
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -f main.js main main-*

# Bundle TypeScript to JavaScript
echo "📝 Bundling $INPUT_FILE to JavaScript..."

# Use esbuild from the package's node_modules
ESBUILD_BIN="$SCRIPT_DIR/node_modules/.bin/esbuild"
if [ ! -f "$ESBUILD_BIN" ]; then
    # Try npx as fallback
    ESBUILD_BIN="npx esbuild"
fi

$ESBUILD_BIN "$INPUT_FILE" --bundle --minify --platform=neutral --outfile="$TEMP_DIR/bundle-raw.js"

if [ ! -f "$TEMP_DIR/bundle-raw.js" ]; then
    echo "❌ Failed to create bundle"
    exit 1
fi

# Compile fetch wrapper to JavaScript
echo "🔗 Preparing fetch wrapper..."
$ESBUILD_BIN "$SCRIPT_DIR/lib/fetch-wrapper.ts" --format=esm --outfile="$TEMP_DIR/fetch-wrapper.js"

# Prepend fetch wrapper to the bundle
# This ensures the wrapper captures the native fetch correctly
{
    cat "$TEMP_DIR/fetch-wrapper.js"
    echo ""
    cat "$TEMP_DIR/bundle-raw.js"
} > "$TEMP_DIR/bundle.js"

rm "$TEMP_DIR/bundle-raw.js" "$TEMP_DIR/fetch-wrapper.js"

# Transpile with Babel to convert async/await and other modern features
echo "🔄 Transpiling with Babel to ES5 compatible code..."
BABEL_BIN="$SCRIPT_DIR/node_modules/.bin/babel"
if [ ! -f "$BABEL_BIN" ]; then
    echo "❌ Babel not found. Run: npm install"
    exit 1
fi

# Transpile the bundle
$BABEL_BIN "$TEMP_DIR/bundle.js" --out-file "$TEMP_DIR/bundle-transpiled.js" --config-file "$SCRIPT_DIR/.babelrc.json"

if [ ! -f "$TEMP_DIR/bundle-transpiled.js" ]; then
    echo "❌ Failed to transpile bundle.js"
    exit 1
fi

# Replace the original bundle with the transpiled version
mv "$TEMP_DIR/bundle-transpiled.js" "$TEMP_DIR/bundle.js"

# Validate the bundle for unsupported features
echo "🔍 Validating bundle for unsupported features..."
if ! node "$SCRIPT_DIR/validate-bundle.js" "$TEMP_DIR/bundle.js"; then
    echo ""
    echo "💡 Tip: Check supported-features.json for a complete list of supported APIs"
    exit 1
fi

# Build with our custom QuickJS + libcurl implementation
echo "🔧 Building QuickJS binary with full fetch API..."
cd "$SCRIPT_DIR/quickjs"


# Create bundle from main.ts
echo "📋 Creating JavaScript bundle..."
mkdir -p "$TEMP_DIR/generated"

# Convert JavaScript bundle to C byte array (no escaping issues!)
# This approach embeds the raw bytes, avoiding all string literal escaping confusion
{
    echo '#include <stdint.h>'
    echo ''
    echo '// JavaScript bundle as byte array (with null terminator for safety)'
    echo 'const uint8_t qjsc_bundle_data[] = {'

    # Convert to comma-separated hex bytes: 0x41, 0x42, ...
    # Using xxd for cleaner output, 12 bytes per line
    # Add trailing comma to last line if missing, then add null terminator
    xxd -i < "$TEMP_DIR/bundle.js" | grep -v 'unsigned' | sed 's/^  //' | sed '$ s/$/,/'

    # Add null terminator for C string safety
    echo '0x00'

    echo '};'
    echo ''
    echo "// Size excludes the null terminator"
    echo "const uint32_t qjsc_bundle_size = sizeof(qjsc_bundle_data) - 1;"
    echo ''
    echo '// Null-terminated string pointer'
    echo 'const char* qjsc_bundle_string = (const char*)qjsc_bundle_data;'
} > "$TEMP_DIR/generated/main_bundle.c"

# Build the binary
echo "⚙️  Compiling QuickJS + libcurl binary..."
gcc -O2 -Wall -Wextra -Wno-unused-parameter -I/opt/homebrew/include -o "$FULL_OUTPUT_PATH" \
    fetch_full.c timers.c blob.c formdata.c fetch_async.c process.c "$TEMP_DIR/generated/main_bundle.c" \
    -L/opt/homebrew/Cellar/quickjs/2025-09-13-2/lib/quickjs \
    -lquickjs -lcurl

# Strip the binary
strip "$FULL_OUTPUT_PATH"

cd ..

# Check if build succeeded
if [ -f "$FULL_OUTPUT_PATH" ]; then
    SIZE=$(ls -lh "$FULL_OUTPUT_PATH" | awk '{print $5}')
    echo ""
    echo "✅ QuickJS binary created successfully!"
    echo "📊 Binary size: ${SIZE}"
    echo "📍 Location: $FULL_OUTPUT_PATH"
    echo ""
    echo "🎯 Features:"
    echo "  • Full fetch API (GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS)"
    echo "  • Custom headers support"
    echo "  • Request/Response body handling (JSON, text, binary)"
    echo "  • Status codes and error handling"
    echo "  • libcurl-powered HTTP client"
    echo "  • Built-in console.log support"
    echo ""
    echo "🚀 Test it with: $FULL_OUTPUT_PATH"
else
    echo "❌ Failed to create binary"
    exit 1
fi


echo ""
echo "🎉 Build complete! QuickJS is the optimal choice for minimal binaries."