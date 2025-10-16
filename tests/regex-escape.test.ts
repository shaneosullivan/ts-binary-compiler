/**
 * Test to verify that regex patterns with backslashes are properly escaped
 * in the C string embedding process
 */

console.log("🧪 Starting Regex Escape Test Suite");
console.log("=====================================");

let passedTests = 0;
let totalTests = 0;

function test(name: string, fn: () => void) {
  totalTests++;
  console.log(`🔍 Test ${totalTests}: ${name}`);
  try {
    fn();
    passedTests++;
    console.log(`✅ ${name}: PASSED`);
  } catch (error) {
    console.log(`❌ ${name}: FAILED`);
    if (error instanceof Error) {
      console.log(`   Error: ${error.message}`);
    }
  }
}

// Test 1: Basic word boundary regex
test("Word boundary pattern \\W+", () => {
  const pattern = /\W+/;
  const result = "hello-world".split(pattern);
  if (result.length !== 2 || result[0] !== "hello" || result[1] !== "world") {
    throw new Error(`Expected ['hello', 'world'], got ${JSON.stringify(result)}`);
  }
  console.log(`   Pattern /\\W+/ correctly matched non-word characters`);
});

// Test 2: Digit pattern
test("Digit pattern \\d+", () => {
  const pattern = /\d+/;
  const result = "abc123def".match(pattern);
  if (!result || result[0] !== "123") {
    throw new Error(`Expected '123', got ${result?.[0]}`);
  }
  console.log(`   Pattern /\\d+/ correctly matched digits`);
});

// Test 3: Whitespace pattern
test("Whitespace pattern \\s+", () => {
  const pattern = /\s+/;
  const result = "hello   world".split(pattern);
  if (result.length !== 2 || result[0] !== "hello" || result[1] !== "world") {
    throw new Error(`Expected ['hello', 'world'], got ${JSON.stringify(result)}`);
  }
  console.log(`   Pattern /\\s+/ correctly matched whitespace`);
});

// Test 4: Word character pattern
test("Word character pattern \\w+", () => {
  const pattern = /\w+/g;
  const result = "hello-world 123".match(pattern);
  // Note: underscore _ is a word character in \w, so we use space to separate
  if (!result || result.length !== 3 || result[0] !== "hello" || result[1] !== "world" || result[2] !== "123") {
    throw new Error(`Expected ['hello', 'world', '123'], got ${JSON.stringify(result)}`);
  }
  console.log(`   Pattern /\\w+/g correctly matched word characters`);
});

// Test 5: Complex version pattern (from process.test.ts)
test("Version pattern v(\\d+)\\.(\\d+)", () => {
  const versionPattern = /v(\d+)\.(\d+)/;
  const version = "v20.0.0-quickjs";
  const match = version.match(versionPattern);
  if (!match || match[1] !== "20" || match[2] !== "0") {
    throw new Error(`Expected groups ['20', '0'], got ${JSON.stringify(match?.slice(1))}`);
  }
  console.log(`   Pattern /v(\\d+)\\.(\\d+)/ correctly parsed version`);
});

// Test 6: Escape sequence in string literal
test("Backslash in string literal", () => {
  const str = "path\\to\\file";
  // In JavaScript, "path\\to\\file" creates a string with single backslashes
  // Expected: p a t h \ t o \ f i l e = 12 characters
  if (str.length !== 12) {
    throw new Error(`String length wrong: expected 12, got ${str.length}`);
  }
  if (str[4] !== "\\" || str[7] !== "\\") {
    throw new Error(`Backslashes not at expected positions`);
  }
  console.log(`   String with backslashes preserved correctly (length: ${str.length})`);
});

// Test 7: Tab and newline escapes
test("Tab and newline escapes \\t and \\n", () => {
  const str = "hello\tworld\n";
  if (!str.includes("\t") || !str.includes("\n")) {
    throw new Error(`Tab or newline not found in string`);
  }
  console.log(`   Tab and newline escape sequences work correctly`);
});

// Test 8: Unicode escape
test("Unicode escape \\u0041", () => {
  const str = "\u0041BC";
  if (str !== "ABC") {
    throw new Error(`Expected 'ABC', got '${str}'`);
  }
  console.log(`   Unicode escape \\u0041 correctly produces 'A'`);
});

// Test 9: Hex escape
test("Hex escape \\x41", () => {
  const str = "\x41BC";
  if (str !== "ABC") {
    throw new Error(`Expected 'ABC', got '${str}'`);
  }
  console.log(`   Hex escape \\x41 correctly produces 'A'`);
});

// Test 10: Non-digit boundary
test("Non-digit boundary \\D+", () => {
  const pattern = /\D+/;
  const result = "123abc456".match(pattern);
  if (!result || result[0] !== "abc") {
    throw new Error(`Expected 'abc', got ${result?.[0]}`);
  }
  console.log(`   Pattern /\\D+/ correctly matched non-digits`);
});

console.log("📊 Test Summary:");
console.log("================");
console.log(`Passed: ${passedTests}/${totalTests} (${Math.round((passedTests / totalTests) * 100)}%)`);

if (passedTests === totalTests) {
  console.log("✅ All regex escape tests passed!");
} else {
  console.log(`❌ ${totalTests - passedTests} test(s) failed`);
  process.exit(1);
}
