# Babel Transpilation

The ts-binary-compiler uses Babel to transpile modern JavaScript features to ES5-compatible code that works reliably with QuickJS.

## Why Transpilation?

QuickJS has limited support for newer JavaScript features. Babel automatically converts:

- **async/await** → Promise-based code with generators
- **Spread operators** → Manual property assignment
- **Optional chaining** → Explicit null checks
- **Nullish coalescing** → Ternary operators
- **Other ES6+ features** → ES5 equivalents

## Configuration

The Babel configuration is in [.babelrc.json](.babelrc.json):

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "6"
        },
        "modules": false,
        "useBuiltIns": false,
        "exclude": [
          "transform-regenerator"
        ]
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "regenerator": true,
        "helpers": false
      }
    ]
  ]
}
```

### Key Settings:

- **targets: node 6** - Ensures very old JavaScript compatibility
- **modules: false** - Preserves ES module syntax for esbuild
- **regenerator: true** - Converts async/await to generator-based promises
- **helpers: false** - Inlines Babel helpers instead of requiring @babel/runtime

## Build Pipeline

The build process has these stages:

1. **Bundling** (esbuild)
   - Bundles TypeScript/JavaScript
   - Minifies code
   - Injects fetch wrapper

2. **Transpilation** (Babel) ⭐ NEW
   - Converts modern syntax to ES5
   - Adds polyfill helpers inline
   - Ensures QuickJS compatibility

3. **Validation**
   - Checks for unsupported modules
   - Validates globals

4. **C Byte Array**
   - Embeds as raw bytes
   - Adds null terminator
   - Calculates size

5. **Compilation**
   - Compiles with QuickJS + libcurl
   - Links everything together
   - Creates standalone binary

## Example: Async/Await Transformation

### Before Babel (Modern JavaScript):

```javascript
async function fetchData() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
```

### After Babel (ES5 Compatible):

```javascript
function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }
      function _next(value) { step("next", value); }
      function _throw(err) { step("throw", err); }
      _next(undefined);
    });
  };
}

var fetchData = _asyncToGenerator(function* () {
  var response = yield fetch(url);
  var data = yield response.json();
  return data;
});
```

## Testing

All tests pass with Babel transpilation:

```bash
npm test
# Total: 12 | Passed: 12 | Failed: 0
```

Tests include:
- ✅ async/await with fetch
- ✅ Promise.all parallel execution
- ✅ Sequential async operations
- ✅ Error handling with try/catch
- ✅ Modern JavaScript features

## Dependencies

```json
{
  "@babel/core": "^7.x",
  "@babel/cli": "^7.x",
  "@babel/preset-env": "^7.x",
  "@babel/plugin-transform-runtime": "^7.x",
  "@babel/runtime": "^7.x"
}
```

Install with:
```bash
npm install
```

## Disabling Babel (Not Recommended)

If you need to disable Babel transpilation, comment out the transpilation step in [build.sh](build.sh#L139-156):

```bash
# # Transpile with Babel to convert async/await and other modern features
# echo "🔄 Transpiling with Babel to ES5 compatible code..."
# BABEL_BIN="$SCRIPT_DIR/node_modules/.bin/babel"
# # ... rest of babel code
```

**Warning**: Without Babel, modern JavaScript features may not work in QuickJS.

## Troubleshooting

### Build fails with "Babel not found"

```bash
npm install
```

### Transpiled code is too large

Babel adds polyfill helpers. To reduce size:
1. Use fewer async/await functions
2. Avoid spread operators
3. Write in simpler JavaScript

### Runtime errors after transpilation

Check that the original code works:
```bash
node ~/.ts-binary-compiler/bundle.js
```

If Node.js works but the binary doesn't, it's likely a QuickJS limitation, not a Babel issue.

## Benefits

✅ **Compatibility** - Works with older QuickJS versions
✅ **Reliability** - Converts problematic syntax automatically
✅ **Modern Code** - Write async/await in source, run generators in binary
✅ **Automatic** - No manual code changes needed
✅ **Tested** - All test suites pass with transpilation

## See Also

- [Babel Documentation](https://babeljs.io/docs/)
- [@babel/preset-env](https://babeljs.io/docs/babel-preset-env)
- [QuickJS Documentation](https://bellard.org/quickjs/)
