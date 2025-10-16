/**
 * Fetch Blob Response Test Suite
 *
 * This test suite verifies that fetch can properly return blob responses
 * and that the blob methods work correctly on fetch responses.
 */

const BASE_URL = "http://localhost:3101";

console.log("🧪 Starting Fetch Blob Response Test Suite");
console.log("============================================");
console.log("");

let testsPassed = 0;
let testsFailed = 0;
const failedTests: string[] = [];

function recordSuccess(testName: string, details?: any) {
  testsPassed++;
  console.log(`✅ ${testName}`);
  if (details) {
    console.log(`   Details: ${JSON.stringify(details, null, 2)}`);
  }
}

function recordFailure(testName: string, error: any) {
  testsFailed++;
  failedTests.push(`${testName}: ${error}`);
  console.log(`❌ ${testName}: ${error}`);
}

// Test 1: Basic text blob
console.log("🔍 Test 1: Fetch text as blob");

(async () => {
  try {
    const response = await fetch(`${BASE_URL}/test/blob/text`);
    const blob = await response.blob();

    if (blob.size > 0 && blob.type.startsWith("text/plain")) {
      const text = await blob.text();
      if (text.includes("Hello from blob endpoint")) {
        recordSuccess("Text Blob", {
          size: blob.size,
          type: blob.type,
          textPreview: text.substring(0, 30) + "..."
        });
      } else {
        recordFailure("Text Blob", "Incorrect text content");
      }
    } else {
      recordFailure("Text Blob", `Invalid blob: size=${blob.size}, type=${blob.type}`);
    }
  } catch (error) {
    recordFailure("Text Blob", error);
  }
})();

// Test 2: Binary blob
console.log("🔍 Test 2: Fetch binary data as blob");

(async () => {
  try {
    const response = await fetch(`${BASE_URL}/test/blob/binary`);
    const blob = await response.blob();

    if (blob.size === 12 && blob.type === "application/octet-stream") {
      const buffer = await blob.arrayBuffer();
      const text = await blob.text();

      if (buffer.byteLength === 12 && text === "Hello Binary") {
        recordSuccess("Binary Blob", {
          size: blob.size,
          type: blob.type,
          bufferSize: buffer.byteLength,
          text: text
        });
      } else {
        recordFailure("Binary Blob", "Content mismatch");
      }
    } else {
      recordFailure("Binary Blob", `Invalid blob: size=${blob.size}, type=${blob.type}`);
    }
  } catch (error) {
    recordFailure("Binary Blob", error);
  }
})();

// Test 3: Image blob (fake PNG)
console.log("🔍 Test 3: Fetch image as blob");

(async () => {
  try {
    const response = await fetch(`${BASE_URL}/test/blob/image`);
    const blob = await response.blob();

    if (blob.size > 8 && blob.type === "image/png") {
      const buffer = await blob.arrayBuffer();
      const view = new Uint8Array(buffer);

      // Check PNG signature (first 8 bytes)
      const isPNG = view[0] === 0x89 && view[1] === 0x50 && view[2] === 0x4E && view[3] === 0x47;

      if (isPNG) {
        recordSuccess("Image Blob", {
          size: blob.size,
          type: blob.type,
          hasPNGSignature: true,
          firstBytes: Array.from(view.slice(0, 8))
        });
      } else {
        recordFailure("Image Blob", "Invalid PNG signature");
      }
    } else {
      recordFailure("Image Blob", `Invalid blob: size=${blob.size}, type=${blob.type}`);
    }
  } catch (error) {
    recordFailure("Image Blob", error);
  }
})();

// Test 4: JSON as blob
console.log("🔍 Test 4: Fetch JSON as blob");

(async () => {
  try {
    const response = await fetch(`${BASE_URL}/test/blob/json`);
    const blob = await response.blob();

    if (blob.size > 0 && blob.type.startsWith("application/json")) {
      const text = await blob.text();
      const json = JSON.parse(text);

      if (json.message && json.value === 42) {
        recordSuccess("JSON Blob", {
          size: blob.size,
          type: blob.type,
          json: json
        });
      } else {
        recordFailure("JSON Blob", "Invalid JSON content");
      }
    } else {
      recordFailure("JSON Blob", `Invalid blob: size=${blob.size}, type=${blob.type}`);
    }
  } catch (error) {
    recordFailure("JSON Blob", error);
  }
})();

// Test 5: Empty blob
console.log("🔍 Test 5: Fetch empty blob");

(async () => {
  try {
    const response = await fetch(`${BASE_URL}/test/blob/empty`);
    const blob = await response.blob();

    if (blob.size === 0) {
      const text = await blob.text();
      const buffer = await blob.arrayBuffer();

      if (text === "" && buffer.byteLength === 0) {
        recordSuccess("Empty Blob", {
          size: blob.size,
          type: blob.type,
          textLength: text.length,
          bufferSize: buffer.byteLength
        });
      } else {
        recordFailure("Empty Blob", "Empty blob should have no content");
      }
    } else {
      recordFailure("Empty Blob", `Expected size 0, got ${blob.size}`);
    }
  } catch (error) {
    recordFailure("Empty Blob", error);
  }
})();

// Test 6: Large blob (100KB)
console.log("🔍 Test 6: Fetch large blob (100KB)");

(async () => {
  try {
    const response = await fetch(`${BASE_URL}/test/blob/large`);
    const blob = await response.blob();

    const expectedSize = 100 * 1024; // 100KB
    if (blob.size === expectedSize) {
      const buffer = await blob.arrayBuffer();
      const view = new Uint8Array(buffer);

      // Verify pattern (should be 0-255 repeating)
      let patternCorrect = true;
      for (let i = 0; i < Math.min(1000, view.length); i++) {
        if (view[i] !== i % 256) {
          patternCorrect = false;
          break;
        }
      }

      if (patternCorrect) {
        recordSuccess("Large Blob", {
          size: blob.size,
          expectedSize: expectedSize,
          patternVerified: true
        });
      } else {
        recordFailure("Large Blob", "Data pattern verification failed");
      }
    } else {
      recordFailure("Large Blob", `Expected size ${expectedSize}, got ${blob.size}`);
    }
  } catch (error) {
    recordFailure("Large Blob", error);
  }
})();

// Test 7: Blob slice on fetch response
console.log("🔍 Test 7: Slice blob from fetch response");

(async () => {
  try {
    const response = await fetch(`${BASE_URL}/test/blob/binary`);
    const blob = await response.blob();

    // Slice the blob (bytes 0-5 should be "Hello ")
    const slice1 = blob.slice(0, 6);
    const text1 = await slice1.text();

    // Slice the blob (bytes 6-12 should be "Binary")
    const slice2 = blob.slice(6, 12);
    const text2 = await slice2.text();

    if (text1 === "Hello " && text2 === "Binary") {
      recordSuccess("Blob Slice from Fetch", {
        originalSize: blob.size,
        slice1: { size: slice1.size, text: text1 },
        slice2: { size: slice2.size, text: text2 }
      });
    } else {
      recordFailure("Blob Slice from Fetch", `Incorrect slices: "${text1}" + "${text2}"`);
    }
  } catch (error) {
    recordFailure("Blob Slice from Fetch", error);
  }
})();

// Test 8: Multiple blob operations on same response
console.log("🔍 Test 8: Multiple operations on blob from fetch");

(async () => {
  try {
    const response = await fetch(`${BASE_URL}/test/blob/text`);
    const blob = await response.blob();

    // Perform multiple async operations on the same blob
    const [text, buffer, slice] = await Promise.all([
      blob.text(),
      blob.arrayBuffer(),
      blob.slice(0, 5).text()
    ]);

    if (text.length > 0 && buffer.byteLength === blob.size && slice === "Hello") {
      recordSuccess("Multiple Blob Operations", {
        textLength: text.length,
        bufferSize: buffer.byteLength,
        sliceText: slice,
        allCorrect: true
      });
    } else {
      recordFailure("Multiple Blob Operations", "One or more operations failed");
    }
  } catch (error) {
    recordFailure("Multiple Blob Operations", error);
  }
})();

// Test 9: Concurrent blob fetches
console.log("🔍 Test 9: Concurrent blob fetches with Promise.all");

(async () => {
  try {
    const [resp1, resp2, resp3] = await Promise.all([
      fetch(`${BASE_URL}/test/blob/text`),
      fetch(`${BASE_URL}/test/blob/binary`),
      fetch(`${BASE_URL}/test/blob/json`)
    ]);

    const [blob1, blob2, blob3] = await Promise.all([
      resp1.blob(),
      resp2.blob(),
      resp3.blob()
    ]);

    const [text1, text2, text3] = await Promise.all([
      blob1.text(),
      blob2.text(),
      blob3.text()
    ]);

    if (
      text1.includes("Hello from blob") &&
      text2 === "Hello Binary" &&
      JSON.parse(text3).value === 42
    ) {
      recordSuccess("Concurrent Blob Fetches", {
        blob1Size: blob1.size,
        blob2Size: blob2.size,
        blob3Size: blob3.size,
        allCorrect: true
      });
    } else {
      recordFailure("Concurrent Blob Fetches", "One or more blobs have incorrect content");
    }
  } catch (error) {
    recordFailure("Concurrent Blob Fetches", error);
  }
})();

// Test 10: Blob content-type preservation
console.log("🔍 Test 10: Verify content-type is preserved in blob");

(async () => {
  try {
    const tests = [
      { url: `${BASE_URL}/test/blob/text`, expectedType: "text/plain" },
      { url: `${BASE_URL}/test/blob/binary`, expectedType: "application/octet-stream" },
      { url: `${BASE_URL}/test/blob/image`, expectedType: "image/png" },
      { url: `${BASE_URL}/test/blob/json`, expectedType: "application/json" }
    ];

    const results = await Promise.all(
      tests.map(async (test) => {
        const response = await fetch(test.url);
        const blob = await response.blob();
        return {
          url: test.url,
          expected: test.expectedType,
          actual: blob.type,
          match: blob.type.startsWith(test.expectedType)
        };
      })
    );

    const allMatch = results.every(r => r.match);

    if (allMatch) {
      recordSuccess("Content-Type Preservation", {
        tested: results.length,
        results: results
      });
    } else {
      recordFailure("Content-Type Preservation", "Some content-types don't match");
    }
  } catch (error) {
    recordFailure("Content-Type Preservation", error);
  }
})();

// Wait for all tests to complete and print summary
setTimeout(() => {
  console.log("");
  console.log("==================================================");
  console.log("📊 Test Summary:");
  console.log("================");
  console.log(`Passed: ${testsPassed}/${testsPassed + testsFailed} (${testsPassed + testsFailed === 0 ? 0 : Math.round(testsPassed / (testsPassed + testsFailed) * 100)}%)`);

  if (testsFailed > 0) {
    console.log(`❌ Failed Tests:`);
    failedTests.forEach(test => console.log(`   - ${test}`));
  }

  console.log("🎯 All fetch blob response tests completed!");
}, 3000); // Wait 3 seconds for all async operations to complete

// Export to make this file a module and avoid global scope conflicts
export {};
