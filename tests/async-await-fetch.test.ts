/**
 * Test async/await with fetch API
 * Demonstrates modern async/await syntax instead of promise chains
 */

const BASE_URL = "http://localhost:3101";

async function main() {
  console.log("🧪 Async/Await Fetch Test Suite");
  console.log("================================\n");

  let passedTests = 0;
  let totalTests = 0;

  async function test(name: string, fn: () => Promise<void>) {
    totalTests++;
    console.log(`🔍 Test ${totalTests}: ${name}`);
    try {
      await fn();
      passedTests++;
      console.log(`✅ ${name}: PASSED\n`);
    } catch (error) {
      console.log(`❌ ${name}: FAILED`);
      if (error instanceof Error) {
        console.log(`   Error: ${error.message}\n`);
      }
    }
  }

  // Test 1: Simple GET request
  await test("Simple GET request", async () => {
    const response = await fetch(`${BASE_URL}/test`);

    if (!response) {
      throw new Error("No response received");
    }

    console.log(`   Status: ${response.status}`);
    console.log(`   Response type: ${typeof response}`);

    const text = await response.text();
    console.log(`   Response body: ${text}`);

    if (response.status !== 200) {
      throw new Error(`Expected status 200, got ${response.status}`);
    }
  });

  // Test 2: Parse JSON response
  await test("Parse JSON response", async () => {
    const response = await fetch(`${BASE_URL}/test`);
    const data = JSON.parse(await response.text());

    console.log(`   Parsed data: ${JSON.stringify(data)}`);

    if (!data.success) {
      throw new Error("Expected 'success' field in JSON");
    }

    if (!data.message) {
      throw new Error("Expected 'message' field in JSON");
    }

    console.log(`   Message: ${data.message}`);
  });

  // Test 3: POST request with JSON body
  await test("POST with JSON body", async () => {
    const payload = { name: "AsyncTest", value: 123 };

    const response = await fetch(`${BASE_URL}/test/json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    console.log(`   Response: ${responseText}`);

    const data = JSON.parse(responseText);

    if (!data.success) {
      throw new Error("POST request failed");
    }

    // Server echoes the body in the 'body' field, not 'receivedData'
    if (data.body.name !== "AsyncTest" || data.body.value !== 123) {
      throw new Error("Server didn't return correct data");
    }

    console.log(`   Verified: name=${data.body.name}, value=${data.body.value}`);
  });

  // Test 4: Multiple sequential requests
  await test("Multiple sequential requests", async () => {
    const urls = [
      `${BASE_URL}/test`,
      `${BASE_URL}/test/query?key=value`,
      `${BASE_URL}/test`,
    ];

    const results: number[] = [];

    for (const url of urls) {
      const response = await fetch(url);
      results.push(response.status);
      console.log(`   Fetched ${url}: ${response.status}`);
    }

    if (results.length !== 3) {
      throw new Error("Expected 3 results");
    }

    if (!results.every((status) => status === 200)) {
      throw new Error("Not all requests returned 200");
    }
  });

  // Test 5: Parallel requests with Promise.all
  await test("Parallel requests with Promise.all", async () => {
    const urls = [
      `${BASE_URL}/test`,
      `${BASE_URL}/test/headers`,
      `${BASE_URL}/test/query`,
    ];

    console.log("   Fetching 3 URLs in parallel...");

    const responses = await Promise.all(urls.map((url) => fetch(url)));

    console.log(`   Got ${responses.length} responses`);

    for (let i = 0; i < responses.length; i++) {
      console.log(`   Response ${i + 1}: ${responses[i].status}`);
      if (responses[i].status !== 200) {
        throw new Error(
          `Request ${i + 1} failed with status ${responses[i].status}`
        );
      }
    }
  });

  // Test 6: Error handling with try/catch
  await test("Error handling for invalid URL", async () => {
    try {
      const response = await fetch(`${BASE_URL}/nonexistent`);

      console.log(`   Response status: ${response.status}`);

      if (response.status !== 404) {
        throw new Error(`Expected 404, got ${response.status}`);
      }

      console.log("   Correctly handled 404 error");
    } catch (error) {
      // Re-throw if it's not the expected 404 handling
      if (error instanceof Error && error.message.includes("Expected 404")) {
        throw error;
      }
      console.log("   Caught error:", error);
    }
  });

  // Test 7: Custom headers
  await test("Custom headers", async () => {
    const response = await fetch(`${BASE_URL}/test/headers`, {
      method: "GET",
      headers: {
        "X-Custom-Header": "AsyncTest",
        "X-Test-Value": "42",
      },
    });

    const data = JSON.parse(await response.text());
    console.log(`   Headers echoed: ${JSON.stringify(data.headers)}`);

    const headers = data.headers;
    if (headers["x-custom-header"] !== "AsyncTest") {
      throw new Error("Custom header not received");
    }
  });

  // Test 8: Timeout with setTimeout and async
  await test("Delayed request simulation", async () => {
    console.log("   Starting delayed fetch...");

    await new Promise((resolve) => setTimeout(resolve, 100));

    const response = await fetch(`${BASE_URL}/test`);
    const text = await response.text();

    console.log("   Delayed fetch completed");

    if (!text) {
      throw new Error("No response body");
    }
  });

  // Test 9: Response properties
  await test("Check response properties", async () => {
    const response = await fetch(`${BASE_URL}/test`);

    console.log(`   Status: ${response.status}`);
    console.log(`   StatusText: ${response.statusText}`);
    console.log(`   OK: ${response.ok}`);
    console.log(`   Type: ${response.type}`);

    if (!response.ok) {
      throw new Error("Response not OK");
    }

    if (response.status !== 200) {
      throw new Error(`Expected status 200, got ${response.status}`);
    }
  });

  // Test 10: Large response body
  await test("Handle larger response", async () => {
    const response = await fetch(`${BASE_URL}/test/blob/large`);
    const text = await response.text();

    console.log(`   Response length: ${text.length} bytes`);

    if (text.length < 100) {
      throw new Error("Expected larger response");
    }
  });

  // Summary
  console.log("📊 Test Summary:");
  console.log("================");
  console.log(
    `Passed: ${passedTests}/${totalTests} (${Math.round(
      (passedTests / totalTests) * 100
    )}%)`
  );

  if (passedTests === totalTests) {
    console.log("✅ All async/await tests passed!");
  } else {
    console.log(`❌ ${totalTests - passedTests} test(s) failed`);
    process.exit(1);
  }
}

// Run the test suite
main().catch((error) => {
  console.error("Unhandled error in main:", error);
  process.exit(1);
});

export {};
