# TypeScript Binary Compiler

A powerful tool for compiling TypeScript/JavaScript files into standalone binaries powered by QuickJS, with full support for the Fetch API, Blob handling, and timer functions.

## Features

✨ **Full Fetch API Support**
- HTTP methods: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS
- Custom headers
- Request/Response body handling (JSON, text, binary, Blob)
- Status codes and error handling
- Powered by libcurl

🎯 **Blob API**
- Full Blob constructor support
- `blob.text()`, `blob.arrayBuffer()`, `blob.slice()`
- Proper MIME type handling
- Integration with Fetch API responses

⏱️ **Timer Functions**
- `setTimeout` / `clearTimeout`
- `setInterval` / `clearInterval`
- Proper event loop integration

🚀 **Minimal Binary Size**
- ~624KB standalone binaries
- No external dependencies required
- Optimized with QuickJS

## Installation

```bash
npm install
```

## Usage

### Build a Binary

```bash
./build.sh <input_file> [output_path]
```

**Examples:**
```bash
# Output to current directory
./build.sh main.ts

# Output with custom name
./build.sh main.ts myapp

# Output to specific directory
./build.sh main.ts ./build/

# Output with specific path
./build.sh main.ts ./build/myapp
```

### Run Example

```bash
./build.sh example/main.ts build/example
./build/example
```

## Testing

### Run All Tests

```bash
npm test
```

### Run Specific Tests

The test runner supports pattern matching to filter which tests to run:

```bash
# Run tests containing "fetch"
npm test -- fetch

# Run tests matching a wildcard pattern
npm test -- "*timer*"

# Run tests starting with "comprehensive"
npm test -- "comprehensive*"
```

### Show Help

```bash
bun tests/execTests.ts --help
```

### Available Test Files

- **tests/blob.test.ts** - Comprehensive Blob API tests (27 tests, 34 total assertions)
- **tests/fetch.test.ts** - Basic fetch API tests
- **tests/comprehensive-fetch.test.ts** - Full fetch API test suite (13 tests)
- **tests/timer.test.ts** - Timer function tests (5 tests)

## Project Structure

```
.
├── build.sh                    # Build script
├── example/
│   └── main.ts                 # Simple example demonstrating features
├── lib/
│   ├── fetch-wrapper.ts        # Fetch API wrapper for QuickJS
│   └── quickjs.d.ts            # TypeScript definitions
├── quickjs/
│   ├── blob.c                  # Blob implementation
│   ├── blob.h                  # Blob header
│   ├── fetch_full.c            # Full fetch implementation
│   └── timers.c                # Timer implementation
└── tests/
    ├── execTests.ts                 # Test runner with wildcard support
    ├── blob.test.ts                 # Comprehensive Blob tests
    ├── fetch.test.ts                # Basic fetch tests
    ├── comprehensive-fetch.test.ts  # Comprehensive fetch tests
    └── timer.test.ts                # Timer tests
```

## API Reference

### Fetch API

```typescript
// GET request
const response = await fetch('https://api.example.com/data');
const data = await response.json();

// POST with JSON
const response = await fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ key: 'value' }),
});

// Get response as Blob
const blob = await response.blob();
const text = await blob.text();
```

### Blob API

```typescript
// Create a Blob
const blob = new Blob(['Hello, World!'], { type: 'text/plain' });

// Blob properties
console.log(blob.size);  // 13
console.log(blob.type);  // 'text/plain'

// Blob methods
const text = await blob.text();
const buffer = await blob.arrayBuffer();
const slice = blob.slice(0, 5);
```

### Timer API

```typescript
// setTimeout
const timeoutId = setTimeout(() => {
  console.log('Executed after delay');
}, 1000);

clearTimeout(timeoutId);

// setInterval
let count = 0;
const intervalId = setInterval(() => {
  count++;
  if (count >= 5) {
    clearInterval(intervalId);
  }
}, 500);
```

## Requirements

- QuickJS (`brew install quickjs`)
- Node.js >= 18.0.0
- libcurl (usually pre-installed on macOS/Linux)

## License

MIT
