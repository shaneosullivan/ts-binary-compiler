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

📋 **FormData API**
- Full FormData implementation for file uploads
- Methods: `append()`, `get()`, `set()`, `delete()`, `has()`
- Supports both string values and Blob/File objects
- Automatic multipart/form-data encoding with boundaries
- Seamless integration with Fetch API

⏱️ **Timer Functions**
- `setTimeout` / `clearTimeout`
- `setInterval` / `clearInterval`
- Proper event loop integration

⚙️ **Process Global**
- `process.env` - Environment variables
- `process.argv` - Command-line arguments
- `process.cwd()` - Current working directory
- `process.platform`, `process.arch`, `process.version`, `process.pid`
- `process.exit()` - Exit with status code

🔄 **Babel Transpilation**
- Automatic conversion of modern JavaScript to ES5
- Converts async/await to promise-based code
- Ensures QuickJS compatibility
- Write modern code, run compatible binaries
- See [BABEL-TRANSPILATION.md](BABEL-TRANSPILATION.md)

🚀 **Minimal Binary Size**
- ~641KB standalone binaries
- No external dependencies required
- Optimized with QuickJS

## Installation

### As a Global Command

```bash
npm install -g ts-binary-compiler
```

Then use the `tsbc` command from any directory:

```bash
tsbc main.ts
tsbc main.ts myapp
tsbc main.ts ./build/myapp
```

### As a Project Dependency

```bash
npm install --save-dev ts-binary-compiler
```

Then use via npm scripts:

```json
{
  "scripts": {
    "build": "tsbc src/main.ts dist/myapp"
  }
}
```

### Local Development

Clone the repository and install dependencies:

```bash
git clone <repo-url>
cd ts-binary-compiler
npm install
```

## Usage

### Using the CLI (tsbc command)

```bash
tsbc <input_file> [output_path]
```

**Examples:**
```bash
# Output to current directory
tsbc main.ts

# Output with custom name
tsbc main.ts myapp

# Output to specific directory
tsbc main.ts ./build/

# Output with specific path
tsbc main.ts ./build/myapp
```

### Using build.sh Directly

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

## Feature Validation

The build process automatically validates your code to ensure it only uses supported features.

### Supported Features

See [supported-features.json](supported-features.json) for the complete list of supported APIs, including:

- **Fetch API** - Full HTTP client (GET, POST, PUT, DELETE, etc.)
- **Blob API** - Binary data handling
- **FormData API** - Multipart form data for file uploads
- **Timers** - setTimeout, setInterval, clearTimeout, clearInterval
- **Promises** - Full async/await support
- **Standard JavaScript** - All ES2020 features, built-in objects (Array, Object, Math, JSON, etc.)

### Unsupported Features

The following Node.js modules are **not supported**:
- File system operations (`fs`, `path`)
- HTTP/HTTPS servers (`http`, `https`, `net`)
- Process operations (`child_process`, `cluster`, `worker_threads`)
- Node.js-specific APIs (`crypto`, `stream`, `buffer`, `events`, etc.)

If your code uses unsupported features, the build will fail with a helpful error message suggesting alternatives.

### Manual Validation

You can manually validate a bundle:

```bash
node validate-bundle.js path/to/bundle.js
```

## Project Structure

```
.
├── build.sh                    # Build script
├── validate-bundle.js          # Bundle validator for unsupported features
├── supported-features.json     # Complete list of supported APIs
├── lib/
│   ├── fetch-wrapper.ts        # Fetch API wrapper for QuickJS
│   └── quickjs.d.ts            # TypeScript definitions
├── quickjs/
│   ├── blob.c                  # Blob implementation
│   ├── blob.h                  # Blob header
│   ├── formdata.c              # FormData implementation
│   ├── formdata.h              # FormData header
│   ├── fetch_full.c            # Full fetch implementation
│   ├── fetch_async.c           # Async fetch implementation
│   ├── fetch_async.h           # Async fetch header
│   └── timers.c                # Timer implementation
└── tests/
    ├── execTests.ts                 # Test runner with wildcard support
    ├── blob.test.ts                 # Comprehensive Blob tests
    ├── formdata.test.ts             # Comprehensive FormData tests
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

// POST with FormData
const formData = new FormData();
formData.append('username', 'john');
formData.append('file', new Blob(['content'], { type: 'text/plain' }), 'file.txt');

const response = await fetch('https://api.example.com/upload', {
  method: 'POST',
  body: formData  // Content-Type automatically set with boundary
});
```

### FormData API

```typescript
// Create FormData
const formData = new FormData();

// Append string values
formData.append('name', 'John Doe');
formData.append('email', 'john@example.com');

// Append files/blobs
const blob = new Blob(['Hello, World!'], { type: 'text/plain' });
formData.append('file', blob, 'hello.txt');

// Other methods
formData.get('name');        // Returns 'John Doe'
formData.has('email');       // Returns true
formData.set('name', 'Jane'); // Replaces all 'name' entries
formData.delete('email');    // Removes 'email' entries

// Use with fetch
await fetch('/upload', {
  method: 'POST',
  body: formData  // Automatically serialized as multipart/form-data
});
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
