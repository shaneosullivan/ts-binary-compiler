// Comprehensive test suite for Headers API

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
// Headers API Tests
// ==========================

test("Headers: Basic construction", () => {
  const headers = new Headers();
  if (typeof headers !== "object") throw new Error("Headers should be an object");
});

test("Headers: append() method", () => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("X-Custom", "value");

  const ct = headers.get("Content-Type");
  if (ct !== "application/json") throw new Error(`Expected 'application/json', got '${ct}'`);

  const custom = headers.get("X-Custom");
  if (custom !== "value") throw new Error(`Expected 'value', got '${custom}'`);
});

test("Headers: get() method", () => {
  const headers = new Headers();
  headers.append("Content-Type", "text/html");

  const value = headers.get("Content-Type");
  if (value !== "text/html") throw new Error(`Expected 'text/html', got '${value}'`);
});

test("Headers: get() non-existent header", () => {
  const headers = new Headers();
  const value = headers.get("NonExistent");

  if (value !== null) throw new Error(`Expected null, got '${value}'`);
});

test("Headers: has() method", () => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  if (!headers.has("Content-Type")) throw new Error("has() should return true for existing header");
  if (headers.has("NonExistent")) throw new Error("has() should return false for non-existent header");
});

test("Headers: set() method", () => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  const value = headers.get("Content-Type");
  if (value !== "application/json") throw new Error(`Expected 'application/json', got '${value}'`);

  // Set again - should replace
  headers.set("Content-Type", "text/html");
  const newValue = headers.get("Content-Type");
  if (newValue !== "text/html") throw new Error(`Expected 'text/html' after set, got '${newValue}'`);
});

test("Headers: delete() method", () => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("X-Custom", "value");

  if (!headers.has("Content-Type")) throw new Error("Header should exist before delete");

  headers.delete("Content-Type");

  if (headers.has("Content-Type")) throw new Error("Header should not exist after delete");
  if (!headers.has("X-Custom")) throw new Error("Other headers should still exist");
});

test("Headers: Case-insensitive header names", () => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  // Should be case-insensitive
  const lower = headers.get("content-type");
  const upper = headers.get("CONTENT-TYPE");
  const mixed = headers.get("Content-Type");

  if (lower !== "application/json") throw new Error("Lowercase lookup failed");
  if (upper !== "application/json") throw new Error("Uppercase lookup failed");
  if (mixed !== "application/json") throw new Error("Mixed case lookup failed");
});

test("Headers: append() combines values", () => {
  const headers = new Headers();
  headers.append("Accept", "text/html");
  headers.append("Accept", "application/json");

  const value = headers.get("Accept");
  // Should combine with comma separator
  if (!value || !value.includes("text/html")) throw new Error("First value missing");
  if (!value || !value.includes("application/json")) throw new Error("Second value missing");
  if (!value || !value.includes(",")) throw new Error("Values should be comma-separated");
});

test("Headers: set() vs append()", () => {
  const headers = new Headers();

  // append adds
  headers.append("X-Test", "value1");
  headers.append("X-Test", "value2");
  let value = headers.get("X-Test");
  if (!value || !value.includes(",")) throw new Error("append should combine values");

  // set replaces
  headers.set("X-Test", "value3");
  value = headers.get("X-Test");
  if (value !== "value3") throw new Error(`set should replace, got '${value}'`);
});

test("Headers: Multiple operations", () => {
  const headers = new Headers();

  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");
  headers.append("Accept", "text/html");
  headers.set("X-Custom-1", "value1");
  headers.set("X-Custom-2", "value2");
  headers.delete("X-Custom-1");

  if (headers.get("Content-Type") !== "application/json") throw new Error("Content-Type wrong");
  if (!headers.get("Accept")?.includes("application/json")) throw new Error("Accept missing first value");
  if (!headers.get("Accept")?.includes("text/html")) throw new Error("Accept missing second value");
  if (headers.has("X-Custom-1")) throw new Error("X-Custom-1 should be deleted");
  if (headers.get("X-Custom-2") !== "value2") throw new Error("X-Custom-2 wrong");
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
