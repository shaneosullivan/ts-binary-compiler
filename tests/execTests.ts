// Test Execution Script
// =====================
// 1- Get a list of all test files in the current directory
// 2 - For each test file, compile it to a binary using the ts-binary-compiler
// 3 - Execute the compiled binary and capture the output
// 4 - Search the output for any errors or failed tests
// 5 - Report the results of each test file, indicating pass or fail status
//
// Usage:
//   npm run test              - Run all test files
//   npm run test fetch        - Run only files containing "fetch"
//   npm run test "*timer*"    - Run only files matching *timer*
//   npm run test --help       - Show this help

import * as fs from "fs";
import * as glob from "glob";
import * as http from "http";

const OUTPUT_DIR = "tests/output";
const TEST_SERVER_PORT = 3101;
const TEST_SERVER_HOST = "localhost";

// Parse command line arguments
const args = process.argv.slice(2);
const pattern = args[0];

// Function to check if test server is running
async function checkTestServer(): Promise<boolean> {
  return new Promise((resolve) => {
    const req = http.request(
      {
        hostname: TEST_SERVER_HOST,
        port: TEST_SERVER_PORT,
        path: "/",
        method: "GET",
        timeout: 2000,
      },
      (res) => {
        resolve(res.statusCode !== undefined);
      }
    );

    req.on("error", () => {
      resolve(false);
    });

    req.on("timeout", () => {
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

// Show help if requested
if (pattern === "--help" || pattern === "-h") {
  console.log(`
Test Execution Script
=====================

Usage:
  npm run test [pattern]

Arguments:
  pattern    Optional wildcard pattern to filter test files (default: run all tests)

Examples:
  npm run test                    Run all *.test.ts files
  npm run test fetch              Run files containing "fetch"
  npm run test "*timer*"          Run files matching *timer*
  npm run test "comprehensive*"   Run files starting with "comprehensive"

Notes:
  - Test files must end with .test.ts
  - Pattern matching is case-sensitive
  - Use quotes for patterns with wildcards
  - Some tests require a test server running on port ${TEST_SERVER_PORT}
`);
  process.exit(0);
}

// Build glob pattern for test files
let testPattern: string;
if (pattern) {
  // If pattern contains wildcards or path separators, use it directly
  if (pattern.includes("*") || pattern.includes("/")) {
    testPattern = `tests/**/${pattern}.test.ts`;
  } else {
    // Simple string match - look for files containing the pattern
    testPattern = `tests/**/*${pattern}*.test.ts`;
  }
} else {
  // No pattern - match all test files
  testPattern = "tests/**/*.test.ts";
}

const allTestFiles = glob.sync(testPattern);

if (allTestFiles.length === 0) {
  console.log(`❌ No test files found matching pattern: ${pattern || "all"}`);
  console.log(`   Pattern used: ${testPattern}`);
  console.log(`\n💡 Try running: npm run test --help`);
  process.exit(1);
}

console.log(`🔍 Found ${allTestFiles.length} test file(s)${pattern ? ` matching "${pattern}"` : ""}:`);
allTestFiles.forEach((file) => console.log(`   - ${file}`));
console.log("");

// Check if any of the test files need the test server
const needsTestServer = allTestFiles.some(
  (file) => file.includes("comprehensive-fetch")
);

// Main async function to run all tests
async function runTests() {
  // Check test server if needed
  if (needsTestServer) {
    console.log("🔍 Checking test server availability...");
    const serverRunning = await checkTestServer();

    if (!serverRunning) {
      console.log(`\n⚠️  WARNING: Test server not detected on http://${TEST_SERVER_HOST}:${TEST_SERVER_PORT}`);
      console.log(`   Some tests (comprehensive-fetch.test.ts) require a test server.`);
      console.log(`   These tests may fail or hang without the server running.\n`);
      console.log(`   To start the test server:`);
      console.log(`   1. Update your test server to listen on port ${TEST_SERVER_PORT}`);
      console.log(`   2. Start the server before running tests\n`);

      // Ask user if they want to continue
      const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const answer = await new Promise<string>((resolve) => {
        readline.question("Continue anyway? (y/N): ", resolve);
      });
      readline.close();

      if (answer.toLowerCase() !== "y" && answer.toLowerCase() !== "yes") {
        console.log("\n❌ Tests cancelled by user.");
        process.exit(1);
      }
    } else {
      console.log(`✅ Test server is running on port ${TEST_SERVER_PORT}\n`);
    }
  }

  // Create the tests/output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Track test results
  interface TestResult {
    file: string;
    passed: boolean;
    error?: string;
  }

  const results: TestResult[] = [];

  // Run each test file
  for (const testFile of allTestFiles) {
    console.log(`\n${"=".repeat(60)}`);
    console.log(`📝 Running: ${testFile}`);
    console.log("=".repeat(60));

    const exec = require("child_process").execSync;
    try {
      const testRootName = testFile.split("/").pop()?.replace(".test.ts", "");
      const outputBinary = `${OUTPUT_DIR}/${testRootName}`;

      const output = exec(
        `${__dirname}/../build.sh ${testFile} ${outputBinary}`,
        {
          encoding: "utf-8",
        }
      );
      console.log(output);

      if (output.includes("FAIL") || output.includes("Error")) {
        console.error(`\n❌ Tests failed in file: ${testFile}`);
        results.push({ file: testFile, passed: false });
      } else {
        console.log(`\n✅ All tests passed in file: ${testFile}`);
        results.push({ file: testFile, passed: true });
      }
    } catch (error: any) {
      console.error(`\n❌ Error executing tests in file: ${testFile}`);
      if (error.stdout) {
        console.error(error.stdout.toString());
      }
      if (error.stderr) {
        console.error(error.stderr.toString());
      }
      results.push({
        file: testFile,
        passed: false,
        error: error.message
      });
    }
  }

  // Print summary
  console.log(`\n${"=".repeat(60)}`);
  console.log("📊 Test Summary");
  console.log("=".repeat(60));

  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;
  const total = results.length;

  console.log(`\nTotal: ${total} | Passed: ${passed} | Failed: ${failed}`);

  if (passed === total) {
    console.log(`\n🎉 All tests passed!`);
  } else {
    console.log(`\n❌ Some tests failed:\n`);
    results
      .filter((r) => !r.passed)
      .forEach((r) => {
        console.log(`   ❌ ${r.file}`);
        if (r.error) {
          console.log(`      Error: ${r.error}`);
        }
      });
  }

  console.log("");

  // Exit with appropriate code
  process.exit(failed > 0 ? 1 : 0);
}

// Run the tests
runTests().catch((error) => {
  console.error("Fatal error running tests:", error);
  process.exit(1);
});
