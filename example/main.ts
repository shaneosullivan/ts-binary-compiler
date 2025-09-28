// @ts-nocheck
/// <reference path="../lib/quickjs.d.ts" />

console.log("🧪 Starting Comprehensive Fetch API Test Suite");
console.log("===============================================\n");

const BASE_URL = "http://localhost:3000";

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
  const passed = results.filter(r => r.success).length;
  const total = results.length;
  console.log(`Passed: ${passed}/${total} (${Math.round((passed/total) * 100)}%)`);
  
  const failed = results.filter(r => !r.success);
  if (failed.length > 0) {
    console.log("\n❌ Failed Tests:");
    failed.forEach(f => console.log(`   - ${f.name}: ${f.message}`));
  }
}

// Helper function to safely parse JSON response
function safeParseJSON(text: string): any {
  try {
    return JSON.parse(text);
  } catch (error) {
    return { success: false, message: "Invalid JSON response" };
  }
}

// Main async function to run all tests
async function runTests() {

// Test 1: Basic GET Request
console.log("🔍 Test 1: Basic GET Request");
try {
  const response = await fetch(`${BASE_URL}/test`);
  const isSuccess = response.status === 200 && response.ok;
  const data = await response.text();
  const parsedData = safeParseJSON(data);
  
  logTest({
    name: "Basic GET",
    success: isSuccess && parsedData.success,
    message: isSuccess ? "GET request successful" : `Failed with status ${response.status}`,
    details: { status: response.status, method: parsedData.method }
  });
} catch (error: any) {
  logTest({
    name: "Basic GET",
    success: false,
    message: `Error: ${error.message}`
  });
}

// Test 2: GET with Query Parameters
console.log("\n🔍 Test 2: GET with Query Parameters");
try {
  const response = await fetch(`${BASE_URL}/test/query?param1=value1&param2=value2&test=true`);
  const data = JSON.parse(await response.text());
  
  logTest({
    name: "GET with Query Params",
    success: response.ok && data.success,
    message: data.message,
    details: data.query
  });
} catch (error: any) {
  logTest({
    name: "GET with Query Params", 
    success: false,
    message: `Error: ${error.message}`
  });
}

// Test 3: POST with JSON Body
console.log("\n🔍 Test 3: POST with JSON Body");
try {
  const postData = { name: "John Doe", age: 30, email: "john@example.com", active: true };
  const response = await fetch(`${BASE_URL}/test/json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "QuickJS-Test-Suite/1.0"
    },
    body: JSON.stringify(postData)
  });
  
  const data = JSON.parse(await response.text());
  
  logTest({
    name: "POST JSON",
    success: response.ok && data.success,
    message: data.message,
    details: { sentData: postData, receivedBody: data.body }
  });
} catch (error: any) {
  logTest({
    name: "POST JSON",
    success: false,
    message: `Error: ${error.message}`
  });
}

// Test 4: PUT Request
console.log("\n🔍 Test 4: PUT Request");
try {
  const putData = { id: 123, name: "Updated Resource", version: 2 };
  const response = await fetch(`${BASE_URL}/test`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer test-token-123"
    },
    body: JSON.stringify(putData)
  });
  
  const data = JSON.parse(await response.text());
  
  logTest({
    name: "PUT Request",
    success: response.ok && data.success,
    message: data.message,
    details: { method: data.method, hasAuth: !!data.headers.authorization }
  });
} catch (error: any) {
  logTest({
    name: "PUT Request",
    success: false,
    message: `Error: ${error.message}`
  });
}

// Test 5: DELETE Request
console.log("\n🔍 Test 5: DELETE Request");
try {
  const response = await fetch(`${BASE_URL}/test`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer delete-token-456",
      "User-Agent": "QuickJS-Delete-Test"
    }
  });
  
  const data = JSON.parse(await response.text());
  
  logTest({
    name: "DELETE Request",
    success: response.ok && data.success,
    message: data.message,
    details: { method: data.method }
  });
} catch (error: any) {
  logTest({
    name: "DELETE Request",
    success: false,
    message: `Error: ${error.message}`
  });
}

// Test 6: PATCH Request
console.log("\n🔍 Test 6: PATCH Request");
try {
  const patchData = { status: "active", lastModified: new Date().toISOString() };
  const response = await fetch(`${BASE_URL}/test`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-Request-ID": "patch-test-789"
    },
    body: JSON.stringify(patchData)
  });
  
  const data = JSON.parse(await response.text());
  
  logTest({
    name: "PATCH Request",
    success: response.ok && data.success,
    message: data.message,
    details: { method: data.method, requestId: data.headers['x-request-id'] }
  });
} catch (error: any) {
  logTest({
    name: "PATCH Request",
    success: false,
    message: `Error: ${error.message}`
  });
}

// Test 7: Custom Headers Validation
console.log("\n🔍 Test 7: Custom Headers Validation");
try {
  const response = await fetch(`${BASE_URL}/test/headers`, {
    headers: {
      "User-Agent": "QuickJS-Custom-Headers/1.0",
      "X-Custom-Header": "test-value-123",
      "X-API-Version": "v1",
      "Accept": "application/json"
    }
  });
  
  const data = JSON.parse(await response.text());
  
  logTest({
    name: "Custom Headers",
    success: response.ok && data.success,
    message: data.message,
    details: data.data
  });
} catch (error: any) {
  logTest({
    name: "Custom Headers",
    success: false,
    message: `Error: ${error.message}`
  });
}

// Test 8: Response Status Codes
console.log("\n🔍 Test 8: Response Status Codes");
const statusCodes = [200, 201, 204, 400, 401, 404, 500];

for (const statusCode of statusCodes) {
  try {
    const response = await fetch(`${BASE_URL}/test/status/${statusCode}`);
    const data = JSON.parse(await response.text());
    const expectedSuccess = statusCode >= 200 && statusCode < 300;
    
    logTest({
      name: `Status ${statusCode}`,
      success: response.status === statusCode && data.success === expectedSuccess,
      message: `Returned status ${response.status}, expected ${statusCode}`,
      details: { statusText: response.statusText, ok: response.ok }
    });
  } catch (error: any) {
    logTest({
      name: `Status ${statusCode}`,
      success: false,
      message: `Error: ${error.message}`
    });
  }
}

// Test 9: OPTIONS Request (CORS Preflight)
console.log("\n🔍 Test 9: OPTIONS Request");
try {
  const response = await fetch(`${BASE_URL}/test`, {
    method: "OPTIONS"
  });
  
  const data = JSON.parse(await response.text());
  
  logTest({
    name: "OPTIONS Request",
    success: response.ok && data.success,
    message: data.message,
    details: { 
      allowHeader: response.headers['allow'],
      corsHeaders: response.headers['access-control-allow-methods']
    }
  });
} catch (error: any) {
  logTest({
    name: "OPTIONS Request",
    success: false,
    message: `Error: ${error.message}`
  });
}

// Test 10: Comprehensive Validation Test
console.log("\n🔍 Test 10: Comprehensive Validation");
try {
  const complexData = {
    user: { id: 42, name: "Test User" },
    metadata: { version: "1.2.3", timestamp: Date.now() },
    settings: { notifications: true, theme: "dark" },
    array: [1, 2, 3, "test", { nested: true }]
  };
  
  const response = await fetch(`${BASE_URL}/test/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "QuickJS-Comprehensive-Test/1.0",
      "Authorization": "Bearer comprehensive-test-token",
      "X-Test-Suite": "comprehensive",
      "Accept": "application/json"
    },
    body: JSON.stringify(complexData)
  });
  
  const data = JSON.parse(await response.text());
  
  logTest({
    name: "Comprehensive Validation",
    success: response.ok && data.data.passedRequired,
    message: `${data.message} (Score: ${data.data.score}/${data.data.total})`,
    details: data.data.validations
  });
} catch (error: any) {
  logTest({
    name: "Comprehensive Validation",
    success: false,
    message: `Error: ${error.message}`
  });
}

// Test 11: Error Handling
console.log("\n🔍 Test 11: Error Handling");
const errorTypes = ["400", "401", "404", "500"];

for (const errorType of errorTypes) {
  try {
    const response = await fetch(`${BASE_URL}/test/error/${errorType}`);
    const data = JSON.parse(await response.text());
    const expectedStatus = parseInt(errorType);
    
    logTest({
      name: `Error ${errorType}`,
      success: response.status === expectedStatus && !data.success,
      message: `Error ${errorType} handled correctly`,
      details: { status: response.status, message: data.message }
    });
  } catch (error: any) {
    logTest({
      name: `Error ${errorType}`,
      success: false,
      message: `Error: ${error.message}`
    });
  }
}

// Test 12: Large Payload Test
console.log("\n🔍 Test 12: Large Payload Test");
try {
  // Create a large JSON payload
  const largeArray = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
    description: `This is a test item with ID ${i} created for large payload testing`,
    metadata: { index: i, even: i % 2 === 0, timestamp: Date.now() }
  }));
  
  const largePayload = {
    items: largeArray,
    totalCount: largeArray.length,
    metadata: { testType: "large-payload", size: "1000 items" }
  };
  
  const response = await fetch(`${BASE_URL}/test`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(largePayload)
  });
  
  const data = JSON.parse(await response.text());
  
  logTest({
    name: "Large Payload",
    success: response.ok && data.success,
    message: `Large payload (${JSON.stringify(largePayload).length} bytes) sent successfully`,
    details: { payloadSize: JSON.stringify(largePayload).length }
  });
} catch (error: any) {
  logTest({
    name: "Large Payload",
    success: false,
    message: `Error: ${error.message}`
  });
}

// Test 13: Multiple Headers Test
console.log("\n🔍 Test 13: Multiple Headers Test");
try {
  const response = await fetch(`${BASE_URL}/test`, {
    method: "GET",
    headers: {
      "User-Agent": "QuickJS-Multi-Header-Test/1.0",
      "Accept": "application/json, text/plain, */*",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      "Cache-Control": "no-cache",
      "Pragma": "no-cache",
      "X-Requested-With": "XMLHttpRequest",
      "X-API-Key": "test-api-key-123456789",
      "X-Client-Version": "1.0.0",
      "X-Platform": "QuickJS",
      "Custom-Header-1": "value1",
      "Custom-Header-2": "value2",
      "Custom-Header-3": "value3"
    }
  });
  
  const data = JSON.parse(await response.text());
  const headerCount = Object.keys(data.headers).length;
  
  logTest({
    name: "Multiple Headers",
    success: response.ok && headerCount >= 10,
    message: `Successfully sent ${headerCount} headers`,
    details: { headerCount, hasCustomHeaders: !!(data.headers['custom-header-1']) }
  });
} catch (error: any) {
  logTest({
    name: "Multiple Headers",
    success: false,
    message: `Error: ${error.message}`
  });
}

// Final Summary
console.log("\n" + "=".repeat(50));
logSummary();
console.log("\n🎯 All fetch API tests completed!");

}

// Run the tests
runTests().catch(error => {
  console.error("Test execution failed:", error);
});

export {};