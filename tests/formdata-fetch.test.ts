// @ts-nocheck
/// <reference path="../lib/quickjs.d.ts" />

console.log("🧪 Starting FormData + Fetch Integration Test Suite");
console.log("====================================================\n");

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
  // Test 1: POST FormData with only string fields
  console.log("🔍 Test 1: POST FormData with string fields only");
  try {
    const formData = new FormData();
    formData.append("name", "Alice Smith");
    formData.append("email", "alice@example.com");
    formData.append("message", "Hello from FormData test!");

    const response = await fetch(`${BASE_URL}/test/form`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    const success = response.status === 200 && data.success;

    logTest({
      name: "FormData string fields",
      success: success,
      message: success ? data.message : `Failed: ${data.message}`,
      details: {
        status: response.status,
        receivedFields: data.body,
        contentType: response.headers["content-type"]
      }
    });
  } catch (error: any) {
    logTest({
      name: "FormData string fields",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  // Test 2: POST FormData with single file
  console.log("\n🔍 Test 2: POST FormData with single file");
  try {
    const formData = new FormData();
    const fileContent = "This is a test file with some content.\nLine 2\nLine 3";
    const blob = new Blob([fileContent], { type: "text/plain" });

    formData.append("username", "FileUploader");
    formData.append("file", blob, "testfile.txt");

    const response = await fetch(`${BASE_URL}/test/upload`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    const success = response.status === 200 &&
                   data.success &&
                   data.data &&
                   data.data.filename === "testfile.txt" &&
                   data.data.size === fileContent.length;

    logTest({
      name: "FormData single file upload",
      success: success,
      message: success ? `File uploaded: ${data.data.filename}` : "Upload failed",
      details: {
        status: response.status,
        uploadedFile: data.data,
        expectedSize: fileContent.length,
        actualSize: data.data ? data.data.size : 0
      }
    });
  } catch (error: any) {
    logTest({
      name: "FormData single file upload",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  // Test 3: POST FormData with multiple files
  console.log("\n🔍 Test 3: POST FormData with multiple files");
  try {
    const formData = new FormData();
    const file1 = new Blob(["File 1 content"], { type: "text/plain" });
    const file2 = new Blob(["File 2 content"], { type: "text/plain" });

    formData.append("files", file1, "file1.txt");
    formData.append("files", file2, "file2.txt");
    formData.append("description", "Multiple file upload test");

    const response = await fetch(`${BASE_URL}/test/multi-upload`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    const success = response.status === 200 &&
                   data.success &&
                   data.data &&
                   data.data.files &&
                   data.data.files.length === 2;

    logTest({
      name: "FormData multiple files",
      success: success,
      message: success ? `${data.data.files.length} files uploaded` : "Upload failed",
      details: {
        status: response.status,
        filesUploaded: data.data ? data.data.files : [],
        formFields: data.data ? data.data.formFields : {}
      }
    });
  } catch (error: any) {
    logTest({
      name: "FormData multiple files",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  // Test 4: POST FormData with mixed fields and files
  console.log("\n🔍 Test 4: POST FormData with mixed fields and files");
  try {
    const formData = new FormData();

    // Add text fields
    formData.append("title", "Mixed Content Test");
    formData.append("author", "Test Author");
    formData.append("category", "Testing");

    // Add files
    const doc = new Blob(["Document content here"], { type: "text/plain" });
    const data = new Blob(['{"key":"value"}'], { type: "application/json" });

    formData.append("file1", doc, "document.txt");
    formData.append("file2", data, "data.json");

    const response = await fetch(`${BASE_URL}/test/formdata-mixed`, {
      method: "POST",
      body: formData
    });

    const responseData = await response.json();
    const hasFields = responseData.data &&
                      responseData.data.fields &&
                      Object.keys(responseData.data.fields).length === 3;
    const hasFiles = responseData.data &&
                     responseData.data.files &&
                     Object.keys(responseData.data.files).length === 2;
    const success = response.status === 200 && hasFields && hasFiles;

    logTest({
      name: "FormData mixed content",
      success: success,
      message: success ? "Mixed content uploaded successfully" : "Upload failed",
      details: {
        status: response.status,
        textFields: responseData.data ? responseData.data.fields : {},
        files: responseData.data ? Object.keys(responseData.data.files) : []
      }
    });
  } catch (error: any) {
    logTest({
      name: "FormData mixed content",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  // Test 5: FormData with large text file
  console.log("\n🔍 Test 5: FormData with large text file");
  try {
    const formData = new FormData();

    // Create a larger file (10KB)
    const largeContent = "x".repeat(10 * 1024);
    const largeBlob = new Blob([largeContent], { type: "text/plain" });

    formData.append("file", largeBlob, "large.txt");
    formData.append("size", "10KB");

    const response = await fetch(`${BASE_URL}/test/upload`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    const success = response.status === 200 &&
                   data.success &&
                   data.data &&
                   data.data.size === largeContent.length;

    logTest({
      name: "FormData large file",
      success: success,
      message: success ? `Large file uploaded (${data.data.size} bytes)` : "Upload failed",
      details: {
        status: response.status,
        expectedSize: largeContent.length,
        actualSize: data.data ? data.data.size : 0
      }
    });
  } catch (error: any) {
    logTest({
      name: "FormData large file",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  // Test 6: FormData with special characters in values
  console.log("\n🔍 Test 6: FormData with special characters");
  try {
    const formData = new FormData();
    formData.append("name", "User with special chars: @#$%^&*()");
    formData.append("message", "Multi\nLine\nText\nWith\nNewlines");
    formData.append("emoji", "Hello 😀 World 🌍!");

    const content = "File with special chars: @#$%\nAnd newlines\nАnd unicode: Привет";
    const blob = new Blob([content], { type: "text/plain" });
    formData.append("file", blob, "special-chars.txt");

    const response = await fetch(`${BASE_URL}/test/formdata-mixed`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    const success = response.status === 200 && data.success;

    logTest({
      name: "FormData special characters",
      success: success,
      message: success ? "Special characters handled correctly" : "Failed",
      details: {
        status: response.status,
        fields: data.data ? data.data.fields : {}
      }
    });
  } catch (error: any) {
    logTest({
      name: "FormData special characters",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  // Test 7: FormData with different MIME types
  console.log("\n🔍 Test 7: FormData with different MIME types");
  try {
    const formData = new FormData();

    const textBlob = new Blob(["Text file"], { type: "text/plain" });
    const jsonBlob = new Blob(['{"test": true}'], { type: "application/json" });
    const htmlBlob = new Blob(["<html><body>HTML</body></html>"], { type: "text/html" });

    formData.append("file1", textBlob, "text.txt");
    formData.append("file2", jsonBlob, "data.json");
    formData.append("file", htmlBlob, "page.html");

    const response = await fetch(`${BASE_URL}/test/formdata-mixed`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    const success = response.status === 200 &&
                   data.success &&
                   data.data &&
                   data.data.files &&
                   Object.keys(data.data.files).length === 3;

    logTest({
      name: "FormData different MIME types",
      success: success,
      message: success ? "Multiple MIME types handled correctly" : "Failed",
      details: {
        status: response.status,
        filesReceived: data.data && data.data.files ?
          Object.entries(data.data.files).map(([name, files]) => ({
            field: name,
            count: files.length,
            mimeTypes: files.map(f => f.mimetype)
          })) : []
      }
    });
  } catch (error: any) {
    logTest({
      name: "FormData different MIME types",
      success: false,
      message: `Error: ${error.message}`
    });
  }

  // Test 8: Verify Content-Type header is automatically set
  console.log("\n🔍 Test 8: Verify automatic Content-Type header");
  try {
    const formData = new FormData();
    formData.append("test", "value");

    const response = await fetch(`${BASE_URL}/test/form`, {
      method: "POST",
      body: formData
      // Note: NOT manually setting Content-Type - it should be automatic
    });

    const data = await response.json();
    const contentType = data.headers ? data.headers["content-type"] : "";
    const hasMultipart = contentType.includes("multipart/form-data");
    const hasBoundary = contentType.includes("boundary=");
    const success = response.status === 200 && hasMultipart && hasBoundary;

    logTest({
      name: "Automatic Content-Type header",
      success: success,
      message: success ? "Content-Type set automatically with boundary" : "Content-Type not set correctly",
      details: {
        contentType: contentType,
        hasMultipart: hasMultipart,
        hasBoundary: hasBoundary
      }
    });
  } catch (error: any) {
    logTest({
      name: "Automatic Content-Type header",
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
