#!/bin/bash

# Example build script that demonstrates how to use the ts-binary-compiler
# This script builds the example main.ts file

set -e

echo "🔨 Running example build..."
echo "=========================="

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Go to the parent directory (where build.sh is located)
cd "$SCRIPT_DIR/.."

# Build the example with different output options
echo ""
echo "Building example main.ts..."

# Option 1: Build to current directory with default name
# ./build.sh example/main.ts

# Option 2: Build to build directory
mkdir -p build

# Option 3: Build with custom name to build directory
./build.sh example/main.ts build/example

echo ""
echo "✅ Example build completed!"
echo "📍 Binary location: ./build/example"
echo ""
echo "🚀 Run the example with: ./build/example"