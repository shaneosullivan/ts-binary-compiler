// @ts-nocheck
/// <reference path="../lib/quickjs.d.ts" />

console.log("🧪 Starting Process Global Test Suite");
console.log("=====================================\n");

interface TestResult {
  name: string;
  success: boolean;
  message: string;
  details?: any;
}

const results: TestResult[] = [];

function logTest(result: TestResult) {
  results.push(result);
  const icon = result.success ? "✅" : "❌";
  console.log(`${icon} ${result.name}: ${result.message}`);
  if (result.details) {
    console.log(`   Details:`, JSON.stringify(result.details, null, 2));
  }
}

function logSummary() {
  console.log("\n📊 Test Summary:");
  console.log("================");
  const passed = results.filter((r) => r.success).length;
  const total = results.length;
  console.log(`Passed: ${passed}/${total} (${Math.round((passed / total) * 100)}%)`);

  const failed = results.filter((r) => !r.success);
  if (failed.length > 0) {
    console.log("\n❌ Failed Tests:");
    failed.forEach((f) => console.log(`   - ${f.name}: ${f.message}`));
  }
}

function runTests() {
  // Test 1: process global exists
  console.log("🔍 Test 1: process global exists");
  try {
    const exists = typeof process !== "undefined";
    logTest({
      name: "process global exists",
      success: exists,
      message: exists ? "process global is defined" : "process global is undefined"
    });
  } catch (error: any) {
    logTest({
      name: "process global exists",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  // Test 2: process.env exists and is an object
  console.log("\n🔍 Test 2: process.env exists");
  try {
    const exists = typeof process.env !== "undefined";
    const isObject = typeof process.env === "object";
    const success = exists && isObject;

    logTest({
      name: "process.env exists",
      success: success,
      message: success ? "process.env is an object" : "process.env is not properly defined",
      details: {
        type: typeof process.env,
        envVarCount: Object.keys(process.env).length
      }
    });
  } catch (error: any) {
    logTest({
      name: "process.env exists",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  // Test 3: Can read environment variables
  console.log("\n🔍 Test 3: Read environment variables");
  try {
    // PATH should exist on most systems
    const hasPath = "PATH" in process.env;
    const hasHome = "HOME" in process.env || "USERPROFILE" in process.env;

    logTest({
      name: "Read environment variables",
      success: hasPath || hasHome,
      message: hasPath || hasHome ? "Can read environment variables" : "Cannot read environment variables",
      details: {
        hasPath: hasPath,
        hasHome: hasHome,
        sampleVars: Object.keys(process.env).slice(0, 5)
      }
    });
  } catch (error: any) {
    logTest({
      name: "Read environment variables",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  // Test 4: process.argv exists
  console.log("\n🔍 Test 4: process.argv exists");
  try {
    const exists = Array.isArray(process.argv);
    const hasExecutable = exists && process.argv.length > 0;

    logTest({
      name: "process.argv exists",
      success: exists && hasExecutable,
      message: exists ? `process.argv has ${process.argv.length} items` : "process.argv is not an array",
      details: {
        isArray: exists,
        length: exists ? process.argv.length : 0,
        argv: process.argv
      }
    });
  } catch (error: any) {
    logTest({
      name: "process.argv exists",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  // Test 5: process.cwd() works
  console.log("\n🔍 Test 5: process.cwd()");
  try {
    const cwd = process.cwd();
    const isString = typeof cwd === "string";
    const hasLength = isString && cwd.length > 0;

    logTest({
      name: "process.cwd()",
      success: isString && hasLength,
      message: isString ? `Current directory: ${cwd}` : "process.cwd() did not return a string",
      details: {
        cwd: cwd,
        type: typeof cwd
      }
    });
  } catch (error: any) {
    logTest({
      name: "process.cwd()",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  // Test 6: process.platform exists
  console.log("\n🔍 Test 6: process.platform");
  try {
    const platform = process.platform;
    const validPlatforms = ["darwin", "linux", "win32", "unknown"];
    const isValid = typeof platform === "string" && validPlatforms.includes(platform);

    logTest({
      name: "process.platform",
      success: isValid,
      message: isValid ? `Platform: ${platform}` : `Invalid platform: ${platform}`,
      details: {
        platform: platform,
        type: typeof platform
      }
    });
  } catch (error: any) {
    logTest({
      name: "process.platform",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  // Test 7: process.arch exists
  console.log("\n🔍 Test 7: process.arch");
  try {
    const arch = process.arch;
    const validArchs = ["x64", "arm64", "x86", "arm", "unknown"];
    const isValid = typeof arch === "string" && validArchs.includes(arch);

    logTest({
      name: "process.arch",
      success: isValid,
      message: isValid ? `Architecture: ${arch}` : `Invalid architecture: ${arch}`,
      details: {
        arch: arch,
        type: typeof arch
      }
    });
  } catch (error: any) {
    logTest({
      name: "process.arch",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  // Test 8: process.version exists
  console.log("\n🔍 Test 8: process.version");
  try {
    const version = process.version;
    const isString = typeof version === "string";
    const hasV = isString && version.startsWith("v");

    logTest({
      name: "process.version",
      success: isString && hasV,
      message: isString ? `Version: ${version}` : "process.version is not a string",
      details: {
        version: version,
        type: typeof version
      }
    });
  } catch (error: any) {
    logTest({
      name: "process.version",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  // Test 9: process.pid exists
  console.log("\n🔍 Test 9: process.pid");
  try {
    const pid = process.pid;
    const isNumber = typeof pid === "number";
    const isPositive = isNumber && pid > 0;

    logTest({
      name: "process.pid",
      success: isNumber && isPositive,
      message: isNumber ? `Process ID: ${pid}` : "process.pid is not a number",
      details: {
        pid: pid,
        type: typeof pid
      }
    });
  } catch (error: any) {
    logTest({
      name: "process.pid",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  // Test 10: process.exit is a function (but don't call it!)
  console.log("\n🔍 Test 10: process.exit exists");
  try {
    const isFunction = typeof process.exit === "function";

    logTest({
      name: "process.exit exists",
      success: isFunction,
      message: isFunction ? "process.exit is a function" : "process.exit is not a function",
      details: {
        type: typeof process.exit
      }
    });
  } catch (error: any) {
    logTest({
      name: "process.exit exists",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  // Test 11: Can access specific environment variable
  console.log("\n🔍 Test 11: Access specific env variable");
  try {
    // Get any environment variable that exists
    const envKeys = Object.keys(process.env);
    if (envKeys.length > 0) {
      const testKey = envKeys[0];
      const testValue = process.env[testKey];
      const canAccess = typeof testValue === "string";

      logTest({
        name: "Access specific env variable",
        success: canAccess,
        message: canAccess ? `Can access ${testKey}` : "Cannot access environment variable",
        details: {
          key: testKey,
          valueType: typeof testValue,
          valueLength: canAccess ? testValue.length : 0
        }
      });
    } else {
      logTest({
        name: "Access specific env variable",
        success: false,
        message: "No environment variables available"
      });
    }
  } catch (error: any) {
    logTest({
      name: "Access specific env variable",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  logSummary();
}

// Run tests
runTests();
