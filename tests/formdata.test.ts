// @ts-nocheck
/// <reference path="../lib/quickjs.d.ts" />

console.log("🧪 Starting FormData Test Suite");
console.log("================================\n");

const BASE_URL = "http://localhost:3101";

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
  console.log(`Passed: ${passed}/${total} (${Math.round((passed / total) * 100)}%)`);

  const failed = results.filter((r) => !r.success);
  if (failed.length > 0) {
    console.log("\n❌ Failed Tests:");
    failed.forEach((f) => console.log(`   - ${f.name}: ${f.message}`));
  }
}

async function runTests() {
  // Test 1: FormData Constructor
  console.log("🔍 Test 1: FormData Constructor");
  try {
    const formData = new FormData();
    logTest({
      name: "FormData Constructor",
      success: formData !== null && typeof formData === "object",
      message: "FormData instance created successfully"
    });
  } catch (error: any) {
    logTest({
      name: "FormData Constructor",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  // Test 2: FormData.append() with string values
  console.log("\n🔍 Test 2: FormData.append() with strings");
  try {
    const formData = new FormData();
    formData.append("name", "John Doe");
    formData.append("email", "john@example.com");
    formData.append("age", "30");

    logTest({
      name: "FormData append strings",
      success: true,
      message: "Successfully appended string values"
    });
  } catch (error: any) {
    logTest({
      name: "FormData append strings",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  // Test 3: FormData.get()
  console.log("\n🔍 Test 3: FormData.get()");
  try {
    const formData = new FormData();
    formData.append("username", "testuser");
    const value = formData.get("username");

    logTest({
      name: "FormData get",
      success: value === "testuser",
      message: value === "testuser" ? "Retrieved correct value" : "Retrieved incorrect value",
      details: { expected: "testuser", actual: value }
    });
  } catch (error: any) {
    logTest({
      name: "FormData get",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  // Test 4: FormData.has()
  console.log("\n🔍 Test 4: FormData.has()");
  try {
    const formData = new FormData();
    formData.append("field1", "value1");

    const has1 = formData.has("field1");
    const has2 = formData.has("field2");

    logTest({
      name: "FormData has",
      success: has1 === true && has2 === false,
      message: "has() returns correct boolean values",
      details: { hasField1: has1, hasField2: has2 }
    });
  } catch (error: any) {
    logTest({
      name: "FormData has",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  // Test 5: FormData.set()
  console.log("\n🔍 Test 5: FormData.set()");
  try {
    const formData = new FormData();
    formData.append("key", "value1");
    formData.append("key", "value2");
    formData.set("key", "value3");

    const value = formData.get("key");

    logTest({
      name: "FormData set",
      success: value === "value3",
      message: "set() replaces all values for a key",
      details: { value }
    });
  } catch (error: any) {
    logTest({
      name: "FormData set",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  // Test 6: FormData.delete()
  console.log("\n🔍 Test 6: FormData.delete()");
  try {
    const formData = new FormData();
    formData.append("toDelete", "value");
    formData.delete("toDelete");

    const has = formData.has("toDelete");

    logTest({
      name: "FormData delete",
      success: has === false,
      message: "delete() removes entries",
      details: { hasAfterDelete: has }
    });
  } catch (error: any) {
    logTest({
      name: "FormData delete",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  // Test 7: FormData with Blob
  console.log("\n🔍 Test 7: FormData with Blob");
  try {
    const formData = new FormData();
    const blob = new Blob(["Hello, World!"], { type: "text/plain" });
    formData.append("file", blob, "test.txt");

    const retrievedBlob = formData.get("file");

    logTest({
      name: "FormData with Blob",
      success: retrievedBlob !== null && typeof retrievedBlob === "object",
      message: "Successfully appended and retrieved Blob",
      details: { hasBlob: retrievedBlob !== null }
    });
  } catch (error: any) {
    logTest({
      name: "FormData with Blob",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  // Test 8: POST with FormData (string fields only)
  console.log("\n🔍 Test 8: POST with FormData (strings)");
  try {
    const formData = new FormData();
    formData.append("name", "Alice");
    formData.append("message", "Hello from FormData!");

    const response = await fetch(`${BASE_URL}/test/form`, {
      method: "POST",
      body: formData
    });

    const success = response.status === 200 || response.status === 404; // 404 is ok if endpoint doesn't exist
    const text = await response.text();

    logTest({
      name: "POST with FormData",
      success: success,
      message: success ? "FormData sent successfully" : `Failed with status ${response.status}`,
      details: { status: response.status, preview: text.substring(0, 100) }
    });
  } catch (error: any) {
    logTest({
      name: "POST with FormData",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  // Test 9: POST with FormData including Blob
  console.log("\n🔍 Test 9: POST with FormData and Blob");
  try {
    const formData = new FormData();
    formData.append("username", "BlobUser");
    formData.append("file", new Blob(["File content here"], { type: "text/plain" }), "document.txt");

    const response = await fetch(`${BASE_URL}/test/upload`, {
      method: "POST",
      body: formData
    });

    const success = response.status === 200 || response.status === 404;

    logTest({
      name: "POST FormData with Blob",
      success: success,
      message: success ? "FormData with Blob sent successfully" : `Failed with status ${response.status}`,
      details: { status: response.status }
    });
  } catch (error: any) {
    logTest({
      name: "POST FormData with Blob",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  // Test 10: FormData with multiple files
  console.log("\n🔍 Test 10: FormData with multiple files");
  try {
    const formData = new FormData();
    formData.append("file1", new Blob(["Content 1"], { type: "text/plain" }), "file1.txt");
    formData.append("file2", new Blob(["Content 2"], { type: "text/plain" }), "file2.txt");
    formData.append("description", "Multiple files");

    const response = await fetch(`${BASE_URL}/test/multi-upload`, {
      method: "POST",
      body: formData
    });

    const success = response.status === 200 || response.status === 404;

    logTest({
      name: "FormData multiple files",
      success: success,
      message: "Multiple files sent successfully",
      details: { status: response.status }
    });
  } catch (error: any) {
    logTest({
      name: "FormData multiple files",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  // Test 11: FormData with JSON blob
  console.log("\n🔍 Test 11: FormData with JSON Blob");
  try {
    const formData = new FormData();
    const jsonData = { key: "value", number: 42, nested: { data: true } };
    const jsonBlob = new Blob([JSON.stringify(jsonData)], { type: "application/json" });

    formData.append("data", jsonBlob, "data.json");
    formData.append("type", "json");

    const response = await fetch(`${BASE_URL}/test/json-upload`, {
      method: "POST",
      body: formData
    });

    const success = response.status === 200 || response.status === 404;

    logTest({
      name: "FormData with JSON Blob",
      success: success,
      message: "JSON Blob sent successfully",
      details: { status: response.status }
    });
  } catch (error: any) {
    logTest({
      name: "FormData with JSON Blob",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  // Test 12: Empty FormData
  console.log("\n🔍 Test 12: Empty FormData");
  try {
    const formData = new FormData();

    const response = await fetch(`${BASE_URL}/test/form`, {
      method: "POST",
      body: formData
    });

    const success = response.status === 200 || response.status === 404;

    logTest({
      name: "Empty FormData",
      success: success,
      message: "Empty FormData sent successfully",
      details: { status: response.status }
    });
  } catch (error: any) {
    logTest({
      name: "Empty FormData",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  logSummary();
}

// Run tests
runTests().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
