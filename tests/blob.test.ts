// @ts-nocheck
/// <reference path="../lib/quickjs.d.ts" />

console.log("🧪 Starting Comprehensive Blob API Test Suite");
console.log("==============================================\n");

// Test configuration
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
  console.log(
    `Passed: ${passed}/${total} (${Math.round((passed / total) * 100)}%)`
  );

  const failed = results.filter((r) => !r.success);
  if (failed.length > 0) {
    console.log("\n❌ Failed Tests:");
    failed.forEach((f) => console.log(`   - ${f.name}: ${f.message}`));
  }
}

// Main async function to run all tests
async function runBlobTests() {
  // ========================================
  // SECTION 1: Blob Constructor Tests
  // ========================================
  console.log("📦 SECTION 1: Blob Constructor Tests");
  console.log("=====================================\n");

  // Test 1: Basic Blob construction with single string
  console.log("🔍 Test 1: Basic Blob Construction (Single String)");
  try {
    const blob = new Blob(["Hello, World!"]);
    logTest({
      name: "Basic Blob Construction",
      success: blob.size === 13 && blob.type === "",
      message: `Created blob with size ${blob.size}`,
      details: { size: blob.size, type: blob.type },
    });
  } catch (error: any) {
    logTest({
      name: "Basic Blob Construction",
      success: false,
      message: `Error: ${error.message}`,
    });
  }

  // Test 2: Blob with type option
  console.log("\n🔍 Test 2: Blob with Type Option");
  try {
    const blob = new Blob(["test content"], { type: "text/plain" });
    logTest({
      name: "Blob with Type",
      success: blob.size === 12 && blob.type === "text/plain",
      message: `Created blob with type: ${blob.type}`,
      details: { size: blob.size, type: blob.type },
    });
  } catch (error: any) {
    logTest({
      name: "Blob with Type",
      success: false,
      message: `Error: ${error.message}`,
    });
  }

  // Test 3: Blob with multiple parts
  console.log("\n🔍 Test 3: Blob with Multiple Parts");
  try {
    const blob = new Blob(["Hello, ", "World", "!"], { type: "text/plain" });
    const expectedSize = "Hello, World!".length;
    logTest({
      name: "Blob Multiple Parts",
      success: blob.size === expectedSize,
      message: `Created blob from ${3} parts with total size ${blob.size}`,
      details: { size: blob.size, expectedSize, type: blob.type },
    });
  } catch (error: any) {
    logTest({
      name: "Blob Multiple Parts",
      success: false,
      message: `Error: ${error.message}`,
    });
  }

  // Test 4: Empty Blob
  console.log("\n🔍 Test 4: Empty Blob");
  try {
    const blob = new Blob([]);
    logTest({
      name: "Empty Blob",
      success: blob.size === 0,
      message: `Created empty blob with size ${blob.size}`,
      details: { size: blob.size, type: blob.type },
    });
  } catch (error: any) {
    logTest({
      name: "Empty Blob",
      success: false,
      message: `Error: ${error.message}`,
    });
  }

  // Test 5: Blob with empty string
  console.log("\n🔍 Test 5: Blob with Empty String");
  try {
    const blob = new Blob([""], { type: "text/plain" });
    logTest({
      name: "Blob Empty String",
      success: blob.size === 0 && blob.type === "text/plain",
      message: `Created blob from empty string`,
      details: { size: blob.size, type: blob.type },
    });
  } catch (error: any) {
    logTest({
      name: "Blob Empty String",
      success: false,
      message: `Error: ${error.message}`,
    });
  }

  // Test 6: Blob with various MIME types
  console.log("\n🔍 Test 6: Blob with Various MIME Types");
  const mimeTypes = [
    "text/html",
    "application/json",
    "application/octet-stream",
    "image/png",
  ];
  for (const mimeType of mimeTypes) {
    try {
      const blob = new Blob(["test"], { type: mimeType });
      logTest({
        name: `Blob MIME Type: ${mimeType}`,
        success: blob.type === mimeType,
        message: `Created blob with MIME type ${mimeType}`,
        details: { type: blob.type },
      });
    } catch (error: any) {
      logTest({
        name: `Blob MIME Type: ${mimeType}`,
        success: false,
        message: `Error: ${error.message}`,
      });
    }
  }

  // ========================================
  // SECTION 2: Blob Property Tests
  // ========================================
  console.log("\n\n📏 SECTION 2: Blob Property Tests");
  console.log("==================================\n");

  // Test 7: Size property accuracy
  console.log("🔍 Test 7: Size Property Accuracy");
  const testStrings = ["a", "ab", "abc", "abcd", "Hello, World!"];
  for (const str of testStrings) {
    try {
      const blob = new Blob([str]);
      logTest({
        name: `Size for "${str}"`,
        success: blob.size === str.length,
        message: `Size ${blob.size} matches expected ${str.length}`,
        details: { actual: blob.size, expected: str.length },
      });
    } catch (error: any) {
      logTest({
        name: `Size for "${str}"`,
        success: false,
        message: `Error: ${error.message}`,
      });
    }
  }

  // Test 8: Type property immutability
  console.log("\n🔍 Test 8: Type Property Immutability");
  try {
    const blob = new Blob(["test"], { type: "text/plain" });
    const originalType = blob.type;
    // Try to change type (should not be possible)
    try {
      (blob as any).type = "application/json";
    } catch (e) {
      // Expected to fail in strict mode
    }
    logTest({
      name: "Type Immutability",
      success: blob.type === originalType,
      message: `Type remains ${blob.type} after modification attempt`,
      details: { type: blob.type, originalType },
    });
  } catch (error: any) {
    logTest({
      name: "Type Immutability",
      success: false,
      message: `Error: ${error.message}`,
    });
  }

  // ========================================
  // SECTION 3: Blob.text() Method Tests
  // ========================================
  console.log("\n\n📝 SECTION 3: Blob.text() Method Tests");
  console.log("=======================================\n");

  // Test 9: Basic text() method
  console.log("🔍 Test 9: Basic text() Method");
  try {
    const content = "Hello, Blob!";
    const blob = new Blob([content], { type: "text/plain" });
    const text = await blob.text();
    logTest({
      name: "Blob text() Basic",
      success: text === content,
      message: `Retrieved text: "${text}"`,
      details: { retrieved: text, expected: content, match: text === content },
    });
  } catch (error: any) {
    logTest({
      name: "Blob text() Basic",
      success: false,
      message: `Error: ${error.message}`,
    });
  }

  // Test 10: text() with empty blob
  console.log("\n🔍 Test 10: text() with Empty Blob");
  try {
    const blob = new Blob([]);
    const text = await blob.text();
    logTest({
      name: "Blob text() Empty",
      success: text === "",
      message: `Retrieved empty text: "${text}"`,
      details: { text, length: text.length },
    });
  } catch (error: any) {
    logTest({
      name: "Blob text() Empty",
      success: false,
      message: `Error: ${error.message}`,
    });
  }

  // Test 11: text() with multi-part blob
  console.log("\n🔍 Test 11: text() with Multi-part Blob");
  try {
    const parts = ["First", " ", "Second", " ", "Third"];
    const blob = new Blob(parts);
    const text = await blob.text();
    const expected = "First Second Third";
    logTest({
      name: "Blob text() Multi-part",
      success: text === expected,
      message: `Concatenated ${parts.length} parts correctly`,
      details: { retrieved: text, expected, match: text === expected },
    });
  } catch (error: any) {
    logTest({
      name: "Blob text() Multi-part",
      success: false,
      message: `Error: ${error.message}`,
    });
  }

  // Test 12: text() returns Promise
  console.log("\n🔍 Test 12: text() Returns Promise");
  try {
    const blob = new Blob(["test"]);
    const result = blob.text();
    const isPromise = result instanceof Promise;
    await result; // Consume the promise
    logTest({
      name: "Blob text() Promise",
      success: isPromise,
      message: `text() returns a Promise: ${isPromise}`,
      details: { isPromise, type: typeof result },
    });
  } catch (error: any) {
    logTest({
      name: "Blob text() Promise",
      success: false,
      message: `Error: ${error.message}`,
    });
  }

  // ========================================
  // SECTION 4: Blob.arrayBuffer() Method Tests
  // ========================================
  console.log("\n\n🔢 SECTION 4: Blob.arrayBuffer() Method Tests");
  console.log("==============================================\n");

  // Test 13: Basic arrayBuffer() method
  console.log("🔍 Test 13: Basic arrayBuffer() Method");
  try {
    const content = "ABC";
    const blob = new Blob([content]);
    const buffer = await blob.arrayBuffer();
    logTest({
      name: "Blob arrayBuffer() Basic",
      success: buffer.byteLength === content.length,
      message: `Retrieved buffer with ${buffer.byteLength} bytes`,
      details: { byteLength: buffer.byteLength, expected: content.length },
    });
  } catch (error: any) {
    logTest({
      name: "Blob arrayBuffer() Basic",
      success: false,
      message: `Error: ${error.message}`,
    });
  }

  // Test 14: arrayBuffer() with empty blob
  console.log("\n🔍 Test 14: arrayBuffer() with Empty Blob");
  try {
    const blob = new Blob([]);
    const buffer = await blob.arrayBuffer();
    logTest({
      name: "Blob arrayBuffer() Empty",
      success: buffer.byteLength === 0,
      message: `Retrieved empty buffer`,
      details: { byteLength: buffer.byteLength },
    });
  } catch (error: any) {
    logTest({
      name: "Blob arrayBuffer() Empty",
      success: false,
      message: `Error: ${error.message}`,
    });
  }

  // Test 15: arrayBuffer() returns Promise
  console.log("\n🔍 Test 15: arrayBuffer() Returns Promise");
  try {
    const blob = new Blob(["test"]);
    const result = blob.arrayBuffer();
    const isPromise = result instanceof Promise;
    await result; // Consume the promise
    logTest({
      name: "Blob arrayBuffer() Promise",
      success: isPromise,
      message: `arrayBuffer() returns a Promise: ${isPromise}`,
      details: { isPromise, type: typeof result },
    });
  } catch (error: any) {
    logTest({
      name: "Blob arrayBuffer() Promise",
      success: false,
      message: `Error: ${error.message}`,
    });
  }

  // Test 16: arrayBuffer() content verification
  console.log("\n🔍 Test 16: arrayBuffer() Content Verification");
  try {
    const content = "Test123";
    const blob = new Blob([content]);
    const buffer = await blob.arrayBuffer();
    const text = await blob.text();
    logTest({
      name: "Blob arrayBuffer() Content",
      success: buffer.byteLength === text.length,
      message: `Buffer size matches text length`,
      details: { bufferSize: buffer.byteLength, textLength: text.length },
    });
  } catch (error: any) {
    logTest({
      name: "Blob arrayBuffer() Content",
      success: false,
      message: `Error: ${error.message}`,
    });
  }

  // ========================================
  // SECTION 5: Blob.slice() Method Tests
  // ========================================
  console.log("\n\n✂️  SECTION 5: Blob.slice() Method Tests");
  console.log("=========================================\n");

  // Test 17: Basic slice() method
  console.log("🔍 Test 17: Basic slice() Method");
  try {
    const content = "0123456789";
    const blob = new Blob([content]);
    const sliced = blob.slice(2, 5);
    const text = await sliced.text();
    logTest({
      name: "Blob slice() Basic",
      success: text === "234" && sliced.size === 3,
      message: `Sliced blob(2, 5): "${text}"`,
      details: { text, size: sliced.size, expected: "234" },
    });
  } catch (error: any) {
    logTest({
      name: "Blob slice() Basic",
      success: false,
      message: `Error: ${error.message}`,
    });
  }

  // Test 18: slice() from start
  console.log("\n🔍 Test 18: slice() from Start");
  try {
    const content = "Hello, World!";
    const blob = new Blob([content]);
    const sliced = blob.slice(0, 5);
    const text = await sliced.text();
    logTest({
      name: "Blob slice() Start",
      success: text === "Hello",
      message: `Sliced blob(0, 5): "${text}"`,
      details: { text, expected: "Hello" },
    });
  } catch (error: any) {
    logTest({
      name: "Blob slice() Start",
      success: false,
      message: `Error: ${error.message}`,
    });
  }

  // Test 19: slice() to end
  console.log("\n🔍 Test 19: slice() to End");
  try {
    const content = "Hello, World!";
    const blob = new Blob([content]);
    const sliced = blob.slice(7);
    const text = await sliced.text();
    logTest({
      name: "Blob slice() End",
      success: text === "World!",
      message: `Sliced blob(7): "${text}"`,
      details: { text, expected: "World!" },
    });
  } catch (error: any) {
    logTest({
      name: "Blob slice() End",
      success: false,
      message: `Error: ${error.message}`,
    });
  }

  // Test 20: slice() with negative indices
  console.log("\n🔍 Test 20: slice() with Negative Indices");
  try {
    const content = "0123456789";
    const blob = new Blob([content]);
    const sliced = blob.slice(-3, -1);
    const text = await sliced.text();
    logTest({
      name: "Blob slice() Negative",
      success: text === "78",
      message: `Sliced blob(-3, -1): "${text}"`,
      details: { text, expected: "78" },
    });
  } catch (error: any) {
    logTest({
      name: "Blob slice() Negative",
      success: false,
      message: `Error: ${error.message}`,
    });
  }

  // Test 21: slice() with custom content type
  console.log("\n🔍 Test 21: slice() with Custom Content Type");
  try {
    const blob = new Blob(["test content"], { type: "text/plain" });
    const sliced = blob.slice(0, 4, "application/custom");
    logTest({
      name: "Blob slice() Custom Type",
      success: sliced.type === "application/custom" && sliced.size === 4,
      message: `Sliced blob has type: ${sliced.type}`,
      details: { type: sliced.type, size: sliced.size },
    });
  } catch (error: any) {
    logTest({
      name: "Blob slice() Custom Type",
      success: false,
      message: `Error: ${error.message}`,
    });
  }

  // Test 22: slice() entire blob
  console.log("\n🔍 Test 22: slice() Entire Blob");
  try {
    const content = "Complete";
    const blob = new Blob([content]);
    const sliced = blob.slice();
    const text = await sliced.text();
    logTest({
      name: "Blob slice() Entire",
      success: text === content && sliced.size === blob.size,
      message: `Sliced entire blob: "${text}"`,
      details: { text, size: sliced.size, originalSize: blob.size },
    });
  } catch (error: any) {
    logTest({
      name: "Blob slice() Entire",
      success: false,
      message: `Error: ${error.message}`,
    });
  }

  // Test 23: slice() beyond bounds
  console.log("\n🔍 Test 23: slice() Beyond Bounds");
  try {
    const content = "Short";
    const blob = new Blob([content]);
    const sliced = blob.slice(0, 100);
    const text = await sliced.text();
    logTest({
      name: "Blob slice() Beyond Bounds",
      success: text === content,
      message: `Slicing beyond bounds returns full content: "${text}"`,
      details: { text, requestedEnd: 100, actualSize: sliced.size },
    });
  } catch (error: any) {
    logTest({
      name: "Blob slice() Beyond Bounds",
      success: false,
      message: `Error: ${error.message}`,
    });
  }

  // ========================================
  // SECTION 6: Edge Cases and Error Handling
  // ========================================
  console.log("\n\n⚠️  SECTION 6: Edge Cases and Error Handling");
  console.log("============================================\n");

  // Test 24: Very large blob
  console.log("🔍 Test 24: Large Blob");
  try {
    const largeContent = "x".repeat(10000);
    const blob = new Blob([largeContent]);
    logTest({
      name: "Large Blob",
      success: blob.size === 10000,
      message: `Created large blob with size ${blob.size}`,
      details: { size: blob.size, expected: 10000 },
    });
  } catch (error: any) {
    logTest({
      name: "Large Blob",
      success: false,
      message: `Error: ${error.message}`,
    });
  }

  // Test 25: Multiple consecutive operations
  console.log("\n🔍 Test 25: Multiple Consecutive Operations");
  try {
    const blob = new Blob(["Test Data"]);
    const text1 = await blob.text();
    const text2 = await blob.text();
    const buffer = await blob.arrayBuffer();
    const slice = blob.slice(0, 4);
    const sliceText = await slice.text();

    logTest({
      name: "Multiple Operations",
      success:
        text1 === text2 &&
        text1 === "Test Data" &&
        buffer.byteLength === 9 &&
        sliceText === "Test",
      message: `All operations successful`,
      details: {
        text1,
        text2,
        bufferSize: buffer.byteLength,
        sliceText,
      },
    });
  } catch (error: any) {
    logTest({
      name: "Multiple Operations",
      success: false,
      message: `Error: ${error.message}`,
    });
  }

  // Test 26: Blob slice chain
  console.log("\n🔍 Test 26: Blob Slice Chain");
  try {
    const content = "0123456789ABCDEF";
    const blob = new Blob([content]);
    const slice1 = blob.slice(5, 15);
    const slice2 = slice1.slice(2, 7);
    const text = await slice2.text();

    logTest({
      name: "Blob Slice Chain",
      success: text === "789AB",
      message: `Chained slices result: "${text}"`,
      details: { text, expected: "789AB" },
    });
  } catch (error: any) {
    logTest({
      name: "Blob Slice Chain",
      success: false,
      message: `Error: ${error.message}`,
    });
  }

  // Test 27: Special characters in Blob
  console.log("\n🔍 Test 27: Special Characters in Blob");
  try {
    const specialContent = "Hello\n\t\r!@#$%^&*()";
    const blob = new Blob([specialContent]);
    const text = await blob.text();
    logTest({
      name: "Special Characters",
      success: text === specialContent,
      message: `Special characters preserved`,
      details: { original: specialContent, retrieved: text },
    });
  } catch (error: any) {
    logTest({
      name: "Special Characters",
      success: false,
      message: `Error: ${error.message}`,
    });
  }

  // Final Summary
  console.log("\n" + "=".repeat(60));
  logSummary();
  console.log("\n🎯 All Blob API tests completed!");
}

// Run the tests
runBlobTests().catch((error) => {
  console.error("Test execution failed:", error);
});

export {};
