// Comprehensive test suite for atob and btoa (base64 encoding/decoding)

(async () => {
let totalTests = 0;
let passedTests = 0;

function test(name: string, fn: () => void) {
  totalTests++;
  console.log(`🔍 Test ${totalTests}: ${name}`);
  try {
    fn();
    passedTests++;
    console.log(`✅ ${name}: PASSED\n`);
  } catch (error) {
    console.log(`❌ ${name}: FAILED`);
    if (error instanceof Error) {
      console.log(`   Error: ${error.message}\n`);
    }
  }
}

// ==========================
// btoa (binary to base64) Tests
// ==========================

test("btoa: Basic encoding", () => {
  const result = btoa("hello");
  if (result !== "aGVsbG8=") throw new Error(`Expected 'aGVsbG8=', got '${result}'`);
});

test("btoa: Empty string", () => {
  const result = btoa("");
  if (result !== "") throw new Error(`Expected empty string, got '${result}'`);
});

test("btoa: Single character", () => {
  const result = btoa("a");
  if (result !== "YQ==") throw new Error(`Expected 'YQ==', got '${result}'`);
});

test("btoa: Two characters", () => {
  const result = btoa("ab");
  if (result !== "YWI=") throw new Error(`Expected 'YWI=', got '${result}'`);
});

test("btoa: Three characters", () => {
  const result = btoa("abc");
  if (result !== "YWJj") throw new Error(`Expected 'YWJj', got '${result}'`);
});

test("btoa: Longer text", () => {
  const result = btoa("Hello, World!");
  if (result !== "SGVsbG8sIFdvcmxkIQ==") throw new Error(`Expected 'SGVsbG8sIFdvcmxkIQ==', got '${result}'`);
});

test("btoa: Special characters", () => {
  const result = btoa("a\nb\tc");
  // Check that it produces valid base64
  if (!/^[A-Za-z0-9+/]+=*$/.test(result)) {
    throw new Error(`Invalid base64 output: '${result}'`);
  }
});

test("btoa: Numbers as string", () => {
  const result = btoa("12345");
  if (result !== "MTIzNDU=") throw new Error(`Expected 'MTIzNDU=', got '${result}'`);
});

// ==========================
// atob (base64 to binary) Tests
// ==========================

test("atob: Basic decoding", () => {
  const result = atob("aGVsbG8=");
  if (result !== "hello") throw new Error(`Expected 'hello', got '${result}'`);
});

test("atob: Empty string", () => {
  const result = atob("");
  if (result !== "") throw new Error(`Expected empty string, got '${result}'`);
});

test("atob: Single character", () => {
  const result = atob("YQ==");
  if (result !== "a") throw new Error(`Expected 'a', got '${result}'`);
});

test("atob: Two characters", () => {
  const result = atob("YWI=");
  if (result !== "ab") throw new Error(`Expected 'ab', got '${result}'`);
});

test("atob: Three characters", () => {
  const result = atob("YWJj");
  if (result !== "abc") throw new Error(`Expected 'abc', got '${result}'`);
});

test("atob: Longer text", () => {
  const result = atob("SGVsbG8sIFdvcmxkIQ==");
  if (result !== "Hello, World!") throw new Error(`Expected 'Hello, World!', got '${result}'`);
});

test("atob: Numbers", () => {
  const result = atob("MTIzNDU=");
  if (result !== "12345") throw new Error(`Expected '12345', got '${result}'`);
});

// ==========================
// Round-trip Tests
// ==========================

test("Round-trip: btoa then atob simple", () => {
  const original = "hello";
  const encoded = btoa(original);
  const decoded = atob(encoded);
  if (decoded !== original) throw new Error(`Expected '${original}', got '${decoded}'`);
});

test("Round-trip: btoa then atob with spaces", () => {
  const original = "Hello World";
  const encoded = btoa(original);
  const decoded = atob(encoded);
  if (decoded !== original) throw new Error(`Expected '${original}', got '${decoded}'`);
});

test("Round-trip: btoa then atob with punctuation", () => {
  const original = "Hello, World! How are you?";
  const encoded = btoa(original);
  const decoded = atob(encoded);
  if (decoded !== original) throw new Error(`Expected '${original}', got '${decoded}'`);
});

test("Round-trip: btoa then atob with special chars", () => {
  const original = "Line1\nLine2\tTab";
  const encoded = btoa(original);
  const decoded = atob(encoded);
  if (decoded !== original) throw new Error(`Expected '${original}', got '${decoded}'`);
});

test("Round-trip: btoa then atob long text", () => {
  const original = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(5);
  const encoded = btoa(original);
  const decoded = atob(encoded);
  if (decoded !== original) throw new Error(`Long text round-trip failed`);
});

test("Round-trip: btoa then atob single char", () => {
  const original = "x";
  const encoded = btoa(original);
  const decoded = atob(encoded);
  if (decoded !== original) throw new Error(`Expected '${original}', got '${decoded}'`);
});

test("Round-trip: btoa then atob numbers", () => {
  const original = "0123456789";
  const encoded = btoa(original);
  const decoded = atob(encoded);
  if (decoded !== original) throw new Error(`Expected '${original}', got '${decoded}'`);
});

// ==========================
// Base64 Format Tests
// ==========================

test("btoa: Output is valid base64", () => {
  const result = btoa("test string");
  // Base64 should only contain A-Z, a-z, 0-9, +, /, and = for padding
  if (!/^[A-Za-z0-9+/]+=*$/.test(result)) {
    throw new Error(`Invalid base64 format: '${result}'`);
  }
});

test("btoa: Padding is correct for 1-byte input", () => {
  const result = btoa("a");
  // 1 byte should result in 2 padding characters
  if (!result.endsWith("==")) throw new Error(`Expected '==' padding, got '${result}'`);
});

test("btoa: Padding is correct for 2-byte input", () => {
  const result = btoa("ab");
  // 2 bytes should result in 1 padding character
  if (!result.endsWith("=")) throw new Error(`Expected '=' padding, got '${result}'`);
  if (result.endsWith("==")) throw new Error(`Too much padding: '${result}'`);
});

test("btoa: No padding for 3-byte input", () => {
  const result = btoa("abc");
  // 3 bytes should result in no padding
  if (result.includes("=")) throw new Error(`Unexpected padding: '${result}'`);
});

console.log(
  `\n📊 Test Results: ${passedTests}/${totalTests} tests passed (${Math.round(
    (passedTests / totalTests) * 100
  )}%)`
);

if (passedTests === totalTests) {
  console.log("🎉 All tests passed!");
  process.exit(0);
} else {
  console.log(`❌ ${totalTests - passedTests} test(s) failed`);
  process.exit(1);
}

})();
