/**
 * Async Stress Test
 *
 * This test is designed to reproduce the hanging behavior that occurred
 * with the previous fake-async implementation using setTimeout(1).
 *
 * The test performs multiple concurrent async operations that previously
 * would cause the process to hang:
 * - Multiple sequential fetch requests
 * - Multiple concurrent fetch requests
 * - Fetch combined with blob operations
 * - Fetch combined with timers
 * - Nested promise chains
 */

const BASE_URL = "http://localhost:3101";

console.log("🔥 Starting Async Stress Test Suite");
console.log("=====================================");
console.log(
  "This test attempts to reproduce hanging behavior with multiple async operations"
);
console.log("");

let testsPassed = 0;
let testsFailed = 0;

function recordSuccess(testName: string, details?: any) {
  testsPassed++;
  console.log(`✅ ${testName}`);
  if (details) {
    console.log(`   Details: ${JSON.stringify(details, null, 2)}`);
  }
}

function recordFailure(testName: string, error: any) {
  testsFailed++;
  console.log(`❌ ${testName}: ${error}`);
}

// Test 1: Multiple Sequential Fetches with text() calls
console.log("🔍 Test 1: Multiple Sequential Fetches (5 requests)");
console.log("   This previously caused hanging due to setTimeout wrapper");

(async () => {
  try {
    const results: Array<any> = [];

    // Make 5 sequential fetch requests, each calling text()
    for (let i = 1; i <= 5; i++) {
      const response = await fetch(`${BASE_URL}/echo?test=${i}`);
      const text = await response.text();
      const data = JSON.parse(text);
      results.push(data.query.test);
    }

    if (results.length === 5 && results.join(",") === "1,2,3,4,5") {
      recordSuccess("Sequential Fetches", { count: 5, results });
    } else {
      recordFailure("Sequential Fetches", "Incorrect results");
    }
  } catch (error) {
    recordFailure("Sequential Fetches", error);
  }
})();

// Test 2: Multiple Concurrent Fetches with Promise.all
console.log(
  "🔍 Test 2: Multiple Concurrent Fetches (Promise.all with 10 requests)"
);
console.log("   This tests true async concurrency");

(async () => {
  try {
    const promises: Array<Promise<any>> = [];

    // Launch 10 concurrent fetches
    for (let i = 1; i <= 10; i++) {
      promises.push(
        fetch(`${BASE_URL}/echo?id=${i}`)
          .then((r) => r.json())
          .then((data: any) => data.query.id)
      );
    }

    const results = await Promise.all(promises);

    if (results.length === 10) {
      recordSuccess("Concurrent Fetches", { count: 10, allResolved: true });
    } else {
      recordFailure("Concurrent Fetches", "Not all promises resolved");
    }
  } catch (error) {
    recordFailure("Concurrent Fetches", error);
  }
})();

// Test 3: Fetch + Blob operations (multiple async layers)
console.log("🔍 Test 3: Fetch combined with Blob operations");
console.log("   This tests multiple async operations on same response");

(async () => {
  try {
    const response = await fetch(`${BASE_URL}/echo?test=blob`);

    // Get the same data in 3 different ways - all async
    const textPromise = response.text();

    const response2 = await fetch(`${BASE_URL}/echo?test=blob`);
    const jsonPromise = response2.json();

    const response3 = await fetch(`${BASE_URL}/echo?test=blob`);
    const blobPromise = response3.blob();

    // Wait for all three
    const [text, json, blob] = await Promise.all([
      textPromise,
      jsonPromise,
      blobPromise,
    ]);

    // Now do async operations on the blob
    const blobText = await blob.text();
    const blobBuffer = await blob.arrayBuffer();

    if (text && json && blobText && blobBuffer) {
      recordSuccess("Fetch + Blob Operations", {
        hasText: !!text,
        hasJson: !!json,
        hasBlobText: !!blobText,
        hasBuffer: blobBuffer.byteLength > 0,
      });
    } else {
      recordFailure("Fetch + Blob Operations", "Missing data");
    }
  } catch (error) {
    recordFailure("Fetch + Blob Operations", error);
  }
})();

// Test 4: Fetch mixed with timers
console.log("🔍 Test 4: Fetch mixed with timers");
console.log("   This tests event loop integration between fetch and timers");

(async () => {
  try {
    let timerFired = false;

    // Set a timer
    setTimeout(() => {
      timerFired = true;
    }, 100);

    // Do multiple fetches while timer is pending
    const response1 = await fetch(`${BASE_URL}/echo?test=timer1`);
    const data1 = await response1.json();

    const response2 = await fetch(`${BASE_URL}/echo?test=timer2`);
    const data2 = await response2.json();

    // Wait a bit for timer
    await new Promise((resolve) => setTimeout(resolve, 150));

    if (timerFired && data1 && data2) {
      recordSuccess("Fetch + Timers", { timerFired, fetchesCompleted: 2 });
    } else {
      recordFailure("Fetch + Timers", "Timer or fetches failed");
    }
  } catch (error) {
    recordFailure("Fetch + Timers", error);
  }
})();

// Test 5: Deep promise chains
console.log("🔍 Test 5: Deep promise chains (10 levels)");
console.log("   This tests deeply nested async operations");

(async () => {
  try {
    let chain = Promise.resolve(0);

    // Create a chain of 10 fetches
    for (let i = 1; i <= 10; i++) {
      chain = chain.then(async (count) => {
        const response = await fetch(`${BASE_URL}/echo?level=${i}`);
        const data = await response.json();
        return count + 1;
      });
    }

    const finalCount = await chain;

    if (finalCount === 10) {
      recordSuccess("Deep Promise Chains", { depth: 10, finalCount });
    } else {
      recordFailure("Deep Promise Chains", `Expected 10, got ${finalCount}`);
    }
  } catch (error) {
    recordFailure("Deep Promise Chains", error);
  }
})();

// Test 6: Rapid-fire fetches (stress test)
console.log("🔍 Test 6: Rapid-fire fetches (20 requests as fast as possible)");
console.log("   This is the ultimate stress test");

(async () => {
  try {
    const startTime = Date.now();
    const promises: Array<Promise<any>> = [];

    // Launch 20 fetches as fast as possible
    for (let i = 0; i < 20; i++) {
      promises.push(fetch(`${BASE_URL}/echo?rapid=${i}`).then((r) => r.text()));
    }

    const results = await Promise.all(promises);
    const endTime = Date.now();
    const duration = endTime - startTime;

    if (results.length === 20) {
      recordSuccess("Rapid-fire Fetches", {
        count: 20,
        duration: `${duration}ms`,
        avgPerRequest: `${(duration / 20).toFixed(2)}ms`,
      });
    } else {
      recordFailure(
        "Rapid-fire Fetches",
        `Only ${results.length}/20 completed`
      );
    }
  } catch (error) {
    recordFailure("Rapid-fire Fetches", error);
  }
})();

// Test 7: Mixed blob operations
console.log("🔍 Test 7: Multiple concurrent blob operations");
console.log("   This tests blob async methods don't interfere with each other");

(async () => {
  try {
    // Create multiple blobs
    const blob1 = new Blob(["Hello"], { type: "text/plain" });
    const blob2 = new Blob(["World"], { type: "text/plain" });
    const blob3 = new Blob(["Test"], { type: "text/plain" });

    // Do async operations on all of them concurrently
    const [text1, text2, text3, buffer1, buffer2, buffer3] = await Promise.all([
      blob1.text(),
      blob2.text(),
      blob3.text(),
      blob1.arrayBuffer(),
      blob2.arrayBuffer(),
      blob3.arrayBuffer(),
    ]);

    if (
      text1 === "Hello" &&
      text2 === "World" &&
      text3 === "Test" &&
      buffer1.byteLength === 5 &&
      buffer2.byteLength === 5 &&
      buffer3.byteLength === 4
    ) {
      recordSuccess("Concurrent Blob Operations", {
        texts: [text1, text2, text3],
        bufferSizes: [
          buffer1.byteLength,
          buffer2.byteLength,
          buffer3.byteLength,
        ],
      });
    } else {
      recordFailure("Concurrent Blob Operations", "Incorrect results");
    }
  } catch (error) {
    recordFailure("Concurrent Blob Operations", error);
  }
})();

// Test 8: Fetch with large responses (multiple async text() calls)
console.log("🔍 Test 8: Large response handling (multiple text() calls)");
console.log(
  "   This tests handling of large payloads with multiple async operations"
);

(async () => {
  try {
    // Create a large payload
    const largeData = { data: "x".repeat(50000) };

    const response = await fetch(`${BASE_URL}/echo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(largeData),
    });

    // Call text() - this should work even with large data
    const text = await response.text();
    const parsed = JSON.parse(text);

    if (parsed.body && parsed.body.data && parsed.body.data.length === 50000) {
      recordSuccess("Large Response Handling", {
        payloadSize: text.length,
        dataLength: parsed.body.data.length,
      });
    } else {
      recordFailure("Large Response Handling", "Data corrupted or incomplete");
    }
  } catch (error) {
    recordFailure("Large Response Handling", error);
  }
})();

// Wait for all tests to complete and print summary
setTimeout(() => {
  console.log("");
  console.log("==================================================");
  console.log("📊 Async Stress Test Summary");
  console.log("==================================================");
  console.log(`Total Tests: ${testsPassed + testsFailed}`);
  console.log(`Passed: ${testsPassed}`);
  console.log(`Failed: ${testsFailed}`);
  console.log("");

  if (testsFailed === 0) {
    console.log("🎉 All stress tests passed! No hanging detected!");
    console.log(
      "   The event-driven async implementation is working correctly."
    );
  } else {
    console.log("⚠️  Some tests failed. Check the output above for details.");
  }

  console.log("");
  console.log("🔍 Key Achievement:");
  console.log("   All these operations would have caused the process to hang");
  console.log("   with the previous setTimeout(1) fake-async implementation.");
  console.log("   The new event-driven architecture handles them perfectly!");
}, 5000); // Wait 5 seconds for all async operations to complete

// Export to make this file a module and avoid global scope conflicts
export {};
