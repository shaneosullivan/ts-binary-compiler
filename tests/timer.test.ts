// @ts-nocheck
/// <reference path="../lib/quickjs.d.ts" />

console.log("🧪 Starting Timer API Test Suite");
console.log("==================================\n");

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

async function runTimerTests() {
  // Test 1: setInterval and clearInterval Tests
  console.log("🔍 Test 1: Timer Functions (setInterval/clearInterval)");
  let intervalCount = 0;
  const maxIntervalRuns = 3;

  const intervalId = setInterval(() => {
    intervalCount++;
    console.log(`Interval execution #${intervalCount}`);

    if (intervalCount >= maxIntervalRuns) {
      clearInterval(intervalId);
      console.log("Interval cleared after 3 executions");

      logTest({
        name: "setInterval/clearInterval",
        success: intervalCount === maxIntervalRuns,
        message: `Interval executed ${intervalCount} times and was properly cleared`,
        details: { executions: intervalCount, maxExpected: maxIntervalRuns },
      });
    }
  }, 100);

  // Test 2: Multiple Intervals
  console.log("\n🔍 Test 2: Multiple Concurrent Intervals");
  let fastCount = 0;
  let slowCount = 0;

  const fastInterval = setInterval(() => {
    fastCount++;
    console.log(`Fast interval: ${fastCount}`);
    if (fastCount >= 5) {
      clearInterval(fastInterval);
    }
  }, 50);

  const slowInterval = setInterval(() => {
    slowCount++;
    console.log(`Slow interval: ${slowCount}`);
    if (slowCount >= 3) {
      clearInterval(slowInterval);

      logTest({
        name: "Multiple Intervals",
        success: fastCount >= 5 && slowCount >= 3,
        message: `Fast: ${fastCount}/5, Slow: ${slowCount}/3 executions`,
        details: { fastExecutions: fastCount, slowExecutions: slowCount },
      });
    }
  }, 150);

  // Test 3: setTimeout and setInterval Mix
  console.log("\n🔍 Test 3: Mixed setTimeout and setInterval");
  let mixedResults: string[] = [];

  setTimeout(() => {
    mixedResults.push("timeout-1");
    console.log("Timeout 1 executed (100ms)");
  }, 100);

  const mixInterval = setInterval(() => {
    mixedResults.push("interval");
    console.log("Mixed interval executed");

    if (mixedResults.length >= 4) {
      clearInterval(mixInterval);

      setTimeout(() => {
        mixedResults.push("timeout-2");
        console.log("Final timeout executed (50ms)");

        logTest({
          name: "Mixed Timers",
          success: mixedResults.length === 5,
          message: "Mixed setTimeout and setInterval execution completed",
          details: { executionOrder: mixedResults },
        });
      }, 50);
    }
  }, 75);

  // Test 4: setInterval Edge Cases
  console.log("\n🔍 Test 4: setInterval Edge Cases");
  let edgeCaseResults: string[] = [];

  // Test zero delay interval
  const zeroDelayInterval = setInterval(() => {
    edgeCaseResults.push("zero-delay");
    if (edgeCaseResults.filter(r => r === "zero-delay").length >= 3) {
      clearInterval(zeroDelayInterval);
    }
  }, 0);

  // Test clearing interval immediately
  const immediateInterval = setInterval(() => {
    edgeCaseResults.push("should-not-execute");
  }, 100);
  clearInterval(immediateInterval); // Clear before it can execute

  // Test very short interval
  let shortCount = 0;
  const shortInterval = setInterval(() => {
    shortCount++;
    edgeCaseResults.push("short");
    if (shortCount >= 2) {
      clearInterval(shortInterval);
    }
  }, 1);

  setTimeout(() => {
    const zeroDelayCount = edgeCaseResults.filter(r => r === "zero-delay").length;
    const shortDelayCount = edgeCaseResults.filter(r => r === "short").length;
    const shouldNotExecuteCount = edgeCaseResults.filter(r => r === "should-not-execute").length;

    logTest({
      name: "setInterval Edge Cases",
      success: zeroDelayCount >= 3 && shortDelayCount >= 2 && shouldNotExecuteCount === 0,
      message: `Zero delay: ${zeroDelayCount}, Short: ${shortDelayCount}, Cleared: ${shouldNotExecuteCount}`,
      details: {
        zeroDelayExecutions: zeroDelayCount,
        shortDelayExecutions: shortDelayCount,
        clearedImmediatelyExecutions: shouldNotExecuteCount,
        allResults: edgeCaseResults
      },
    });
  }, 400);

  // Test 5: setInterval Cleanup Test
  console.log("\n🔍 Test 5: setInterval Cleanup and Memory Management");
  let cleanupResults: number[] = [];
  let activeIntervals: number[] = [];

  // Create multiple intervals and clear them all
  for (let i = 0; i < 5; i++) {
    const intervalId = setInterval(() => {
      cleanupResults.push(i);
      // Each interval runs once then gets cleared
      clearInterval(intervalId);
    }, 50 + (i * 10)); // Stagger the intervals
    activeIntervals.push(intervalId);
  }

  setTimeout(() => {
    logTest({
      name: "setInterval Cleanup",
      success: cleanupResults.length === 5 && new Set(cleanupResults).size === 5,
      message: `All ${cleanupResults.length} intervals executed and cleaned up`,
      details: {
        executionResults: cleanupResults.sort(),
        uniqueExecutions: new Set(cleanupResults).size,
        intervalIds: activeIntervals
      },
    });
  }, 500);

  // Wait for all timer tests to complete before showing summary
  setTimeout(() => {
    // Final Summary
    console.log("\n" + "=".repeat(50));
    logSummary();
    console.log("\n🎯 All timer tests completed!");
  }, 1500);
}

// Run the tests
runTimerTests().catch((error) => {
  console.error("Test execution failed:", error);
});

export {};
