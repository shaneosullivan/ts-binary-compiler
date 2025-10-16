#!/usr/bin/env node

/**
 * Bundle Validator for ts-binary-compiler
 *
 * This script analyzes a bundled JavaScript file to detect:
 * 1. require() calls for Node.js modules
 * 2. import statements (if any remain after bundling)
 * 3. References to unsupported globals
 *
 * Exit codes:
 *   0 - All features are supported
 *   1 - Unsupported features detected
 */

const fs = require('fs');
const path = require('path');

// Load supported features configuration
const FEATURES_FILE = path.join(__dirname, 'supported-features.json');
const features = JSON.parse(fs.readFileSync(FEATURES_FILE, 'utf-8'));

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  bold: '\x1b[1m',
};

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

/**
 * Extract require() calls from the bundle
 */
function extractRequires(code) {
  const requires = new Set();

  // Match require("module") or require('module')
  const requireRegex = /require\s*\(\s*["']([^"']+)["']\s*\)/g;
  let match;

  while ((match = requireRegex.exec(code)) !== null) {
    const moduleName = match[1];
    // Only care about non-relative requires (Node modules)
    if (!moduleName.startsWith('.') && !moduleName.startsWith('/')) {
      requires.add(moduleName);
    }
  }

  return Array.from(requires);
}

/**
 * Extract import statements from the bundle
 */
function extractImports(code) {
  const imports = new Set();

  // Match: import ... from "module"
  const importRegex = /import\s+(?:[\w{},\s*]+\s+from\s+)?["']([^"']+)["']/g;
  let match;

  while ((match = importRegex.exec(code)) !== null) {
    const moduleName = match[1];
    // Only care about non-relative imports (Node modules)
    if (!moduleName.startsWith('.') && !moduleName.startsWith('/')) {
      imports.add(moduleName);
    }
  }

  return Array.from(imports);
}

/**
 * Check if a module is a built-in Node.js module or known unsupported package
 */
function checkModule(moduleName) {
  // Direct match in unsupported modules
  if (features.unsupportedModules[moduleName]) {
    return {
      supported: false,
      reason: features.unsupportedModules[moduleName]
    };
  }

  // Check if it's a scoped package or starts with an unsupported module
  const baseModule = moduleName.split('/')[0];
  if (features.unsupportedModules[baseModule]) {
    return {
      supported: false,
      reason: features.unsupportedModules[baseModule]
    };
  }

  // If not in unsupported list, assume it might be a bundled npm package
  // which could be fine if it doesn't use Node APIs
  return {
    supported: true,
    warning: `External package "${moduleName}" - ensure it doesn't use Node.js APIs`
  };
}

/**
 * Extract usage of global identifiers that might be unsupported
 */
function extractGlobalUsage(code) {
  const globalUsage = new Set();

  // Common unsupported Web APIs that users might try to use
  const potentialUnsupportedGlobals = [
    'URL', 'URLSearchParams', 'Headers', 'Request',
    'localStorage', 'sessionStorage', 'document', 'window',
    'WebSocket', 'EventSource', 'MessageChannel',
    'TextEncoder', 'TextDecoder', 'atob', 'btoa',
    'FileReader', 'File', 'crypto', 'performance',
    'navigator', 'location', 'history', 'XMLHttpRequest'
  ];

  potentialUnsupportedGlobals.forEach(globalName => {
    // Match: new GlobalName( or GlobalName. or GlobalName( but not as property access
    // Negative lookbehind to avoid matching obj.URL
    const patterns = [
      new RegExp(`(?<!\\.)\\bnew\\s+${globalName}\\s*\\(`, 'g'),
      new RegExp(`(?<!\\.)\\b${globalName}\\s*\\.`, 'g'),
      new RegExp(`(?<!\\.)\\b${globalName}\\s*\\(`, 'g')
    ];

    for (const pattern of patterns) {
      if (pattern.test(code)) {
        globalUsage.add(globalName);
        break;
      }
    }
  });

  return Array.from(globalUsage);
}

/**
 * Check if a global is supported
 */
function checkGlobal(globalName) {
  if (features.globals[globalName]) {
    return { supported: true };
  }

  // Provide specific error messages for common unsupported globals
  const unsupportedGlobals = {
    'Request': 'Request API is not fully implemented. Use fetch(url, options) instead.',
    'localStorage': 'localStorage is not available (no persistent storage)',
    'sessionStorage': 'sessionStorage is not available (no persistent storage)',
    'document': 'DOM APIs are not available (not a browser environment)',
    'window': 'window object is not available (not a browser environment)',
    'WebSocket': 'WebSocket is not implemented',
    'EventSource': 'EventSource (Server-Sent Events) is not implemented',
    'MessageChannel': 'MessageChannel is not implemented',
    'TextEncoder': 'TextEncoder is not yet implemented',
    'TextDecoder': 'TextDecoder is not yet implemented',
    'atob': 'atob (base64 decode) is not yet implemented',
    'btoa': 'btoa (base64 encode) is not yet implemented',
    'FileReader': 'FileReader is not available',
    'File': 'File API is not available. Use Blob instead.',
    'crypto': 'Web Crypto API is not available',
    'performance': 'Performance API is not available',
    'navigator': 'navigator object is not available',
    'location': 'location object is not available',
    'history': 'history object is not available',
    'XMLHttpRequest': 'XMLHttpRequest is not available. Use fetch() instead.'
  };

  return {
    supported: false,
    reason: unsupportedGlobals[globalName] || `${globalName} is not supported`
  };
}

/**
 * Validate the bundle
 */
function validateBundle(bundlePath) {
  console.log(colorize('\n🔍 Validating bundle...', 'blue'));
  console.log(`   Bundle: ${bundlePath}\n`);

  // Read the bundle
  if (!fs.existsSync(bundlePath)) {
    console.error(colorize(`❌ Error: Bundle file not found: ${bundlePath}`, 'red'));
    process.exit(1);
  }

  const code = fs.readFileSync(bundlePath, 'utf-8');

  // Extract all requires and imports
  const requires = extractRequires(code);
  const imports = extractImports(code);
  const allModules = [...new Set([...requires, ...imports])];

  // Extract global usage
  const globalUsage = extractGlobalUsage(code);

  if (allModules.length === 0 && globalUsage.length === 0) {
    console.log(colorize('✅ No external module imports detected', 'green'));
    console.log(colorize('✅ No unsupported globals detected', 'green'));
    console.log(colorize('✅ Bundle validation passed!\n', 'green'));
    return true;
  }

  let hasOutput = false;
  if (allModules.length > 0) {
    console.log(`📦 Found ${allModules.length} external module reference(s):\n`);
    hasOutput = true;
  }

  const unsupported = [];
  const unsupportedGlobals = [];
  const warnings = [];

  // Check each module
  allModules.forEach(moduleName => {
    const result = checkModule(moduleName);

    if (!result.supported) {
      unsupported.push({ module: moduleName, reason: result.reason });
      console.log(colorize(`   ❌ ${moduleName}`, 'red'));
      console.log(`      ${result.reason}`);
    } else if (result.warning) {
      warnings.push({ module: moduleName, warning: result.warning });
      console.log(colorize(`   ⚠️  ${moduleName}`, 'yellow'));
      console.log(`      ${result.warning}`);
    } else {
      console.log(colorize(`   ✅ ${moduleName}`, 'green'));
    }
  });

  // Check global usage
  if (globalUsage.length > 0) {
    if (hasOutput) console.log('');
    console.log(`🌐 Found ${globalUsage.length} potentially unsupported global(s):\n`);
    hasOutput = true;

    globalUsage.forEach(globalName => {
      const result = checkGlobal(globalName);

      if (!result.supported) {
        unsupportedGlobals.push({ global: globalName, reason: result.reason });
        console.log(colorize(`   ❌ ${globalName}`, 'red'));
        console.log(`      ${result.reason}`);
      } else {
        console.log(colorize(`   ✅ ${globalName}`, 'green'));
      }
    });
  }

  if (hasOutput) console.log('');

  // Report results
  if (unsupported.length > 0 || unsupportedGlobals.length > 0) {
    console.log(colorize('❌ VALIDATION FAILED', 'red'));
    console.log(colorize('━'.repeat(60), 'red'));
    console.log('');
    console.log('Your code uses unsupported features that are not available');
    console.log('in standalone QuickJS binaries.\n');

    if (unsupported.length > 0) {
      console.log(colorize('Unsupported modules:', 'bold'));
      unsupported.forEach(({ module, reason }) => {
        console.log(`  • ${colorize(module, 'red')}: ${reason}`);
      });
      console.log('');
    }

    if (unsupportedGlobals.length > 0) {
      console.log(colorize('Unsupported globals:', 'bold'));
      unsupportedGlobals.forEach(({ global, reason }) => {
        console.log(`  • ${colorize(global, 'red')}: ${reason}`);
      });
      console.log('');
    }

    console.log(colorize('What you CAN use:', 'bold'));
    console.log('  • Pure JavaScript/TypeScript computation');
    console.log('  • fetch() for HTTP requests (GET, POST, PUT, DELETE, etc.)');
    console.log('  • FormData for multipart form data');
    console.log('  • Blob API for binary data');
    console.log('  • setTimeout/setInterval for timers');
    console.log('  • Promise, async/await');
    console.log('  • JSON.parse/stringify');
    console.log('  • process.env, process.argv, process.exit()');
    console.log('  • All standard JavaScript built-ins (Array, Object, Math, etc.)');

    console.log('\n' + colorize('💡 Suggestions:', 'blue'));
    console.log('  • Remove file system operations (use fetch to load data from URLs)');
    console.log('  • Replace Node.js HTTP server with external server + fetch client');
    console.log('  • Use web-compatible APIs instead of Node.js-specific ones');
    console.log('  • Check supported-features.json for the complete list\n');

    return false;
  }

  if (warnings.length > 0) {
    console.log(colorize('⚠️  VALIDATION PASSED WITH WARNINGS', 'yellow'));
    console.log(colorize('━'.repeat(60), 'yellow'));
    console.log('');
    console.log('External packages detected. Make sure they:');
    console.log('  • Don\'t use Node.js-specific APIs (fs, http, process, etc.)');
    console.log('  • Are properly bundled by esbuild');
    console.log('  • Work in a browser-like environment\n');
  } else {
    console.log(colorize('✅ VALIDATION PASSED', 'green'));
    console.log(colorize('━'.repeat(60), 'green'));
    console.log('');
    console.log('All detected modules are supported!\n');
  }

  return true;
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log(`
${colorize('Bundle Validator for ts-binary-compiler', 'bold')}

Usage:
  node validate-bundle.js <bundle-path>

Arguments:
  bundle-path    Path to the bundled JavaScript file

Example:
  node validate-bundle.js /tmp/bundle.js

Exit Codes:
  0 - Validation passed (all features supported)
  1 - Validation failed (unsupported features detected)
`);
    process.exit(args[0] === '--help' || args[0] === '-h' ? 0 : 1);
  }

  const bundlePath = args[0];
  const isValid = validateBundle(bundlePath);

  process.exit(isValid ? 0 : 1);
}

module.exports = {
  validateBundle,
  extractRequires,
  extractImports,
  extractGlobalUsage,
  checkModule,
  checkGlobal
};
