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
    echo "  $0 main.ts ./build/           # Output to build directory"
    echo "  $0 main.ts ./build/myapp      # Output as './build/myapp'"
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
FULL_OUTPUT_PATH="$(pwd)/$OUTPUT_DIR/$OUTPUT_NAME"

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

# Install dependencies if needed
if [ ! -f "node_modules/.bin/tsc" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -f main.js main main-*

# Bundle TypeScript to JavaScript
echo "📝 Bundling $INPUT_FILE to JavaScript..."
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
npx esbuild "$INPUT_FILE" --bundle --minify --platform=neutral --inject:"$SCRIPT_DIR/lib/fetch-wrapper.ts" --outfile="$TEMP_DIR/bundle.js"

if [ ! -f "$TEMP_DIR/bundle.js" ]; then
    echo "❌ Failed to create bundle.js"
    exit 1
fi

# Build with our custom QuickJS + libcurl implementation
echo "🔧 Building QuickJS binary with full fetch API..."
cd quickjs


# Create bundle from main.ts
echo "📋 Creating JavaScript bundle..."
mkdir -p "$TEMP_DIR/generated"
BUNDLE_CONTENT=$(cat "$TEMP_DIR/bundle.js" | sed 's/"/\\"/g' | tr -d '\n')
cat > "$TEMP_DIR/generated/main_bundle.c" << EOF
#include <stdint.h>

const char* qjsc_bundle_string = "${BUNDLE_CONTENT}";
const uint32_t qjsc_bundle_size = $(wc -c < "$TEMP_DIR/bundle.js" | tr -d ' ');
EOF

# Build the binary
echo "⚙️  Compiling QuickJS + libcurl binary..."
gcc -O2 -Wall -Wextra -Wno-unused-parameter -I/opt/homebrew/include -o "$FULL_OUTPUT_PATH" \
    fetch_full.c "$TEMP_DIR/generated/main_bundle.c" \
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