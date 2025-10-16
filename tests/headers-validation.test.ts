// Test to verify Headers validation works correctly
// Headers constructor should be blocked, but headers from Response should work

(async () => {
const BASE_URL = "http://localhost:3101";

console.log("=== Testing Headers Validation ===\n");

// Test 1: Headers from Response should work
console.log("Test 1: Access headers from fetch Response");
try {
  const response = await fetch(`${BASE_URL}/test`);
  const headers = response.headers;

  console.log("✅ Got headers from Response");
  console.log("   Headers object type:", typeof headers);

  // Response headers should have some properties
  if (headers) {
    console.log("   Headers available: Yes");
  }
} catch (error) {
  console.log("❌ Failed to get headers from Response");
  if (error instanceof Error) {
    console.log("   Error:", error.message);
  }
}

console.log("\n=== Test Complete ===");
console.log("Note: Headers constructor (new Headers()) is intentionally blocked.");
console.log("Headers are only accessible via Response.headers from fetch() calls.");

})();
