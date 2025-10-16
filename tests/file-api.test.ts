// Comprehensive test suite for File API

(async () => {
let totalTests = 0;
let passedTests = 0;

function test(name: string, fn: () => void | Promise<void>) {
  totalTests++;
  console.log(`🔍 Test ${totalTests}: ${name}`);
  const result = fn();

  if (result instanceof Promise) {
    return result.then(() => {
      passedTests++;
      console.log(`✅ ${name}: PASSED\n`);
    }).catch((error) => {
      console.log(`❌ ${name}: FAILED`);
      if (error instanceof Error) {
        console.log(`   Error: ${error.message}\n`);
      }
    });
  } else {
    try {
      passedTests++;
      console.log(`✅ ${name}: PASSED\n`);
    } catch (error) {
      console.log(`❌ ${name}: FAILED`);
      if (error instanceof Error) {
        console.log(`   Error: ${error.message}\n`);
      }
    }
  }
}

// ==========================
// File Constructor Tests
// ==========================

await test("File: Basic construction with name", () => {
  const file = new File(["hello"], "test.txt");
  if (typeof file !== "object") throw new Error("File should be an object");
  if (!(file instanceof File)) throw new Error("Should be instance of File");
});

await test("File: name property", () => {
  const file = new File(["content"], "document.txt");
  if (file.name !== "document.txt") throw new Error(`Expected 'document.txt', got '${file.name}'`);
});

await test("File: size property", () => {
  const file = new File(["hello world"], "file.txt");
  if (file.size !== 11) throw new Error(`Expected size 11, got ${file.size}`);
});

await test("File: type property with options", () => {
  const file = new File(["content"], "file.txt", { type: "text/plain" });
  if (file.type !== "text/plain") throw new Error(`Expected 'text/plain', got '${file.type}'`);
});

await test("File: type property without options", () => {
  const file = new File(["content"], "file.txt");
  if (file.type !== "") throw new Error(`Expected empty type, got '${file.type}'`);
});

await test("File: lastModified property", () => {
  const file = new File(["content"], "file.txt");
  if (typeof file.lastModified !== "number") throw new Error("lastModified should be a number");
  if (file.lastModified <= 0) throw new Error("lastModified should be positive");
});

await test("File: lastModified with custom value", () => {
  const timestamp = 1234567890000;
  const file = new File(["content"], "file.txt", { lastModified: timestamp });
  if (file.lastModified !== timestamp) throw new Error(`Expected ${timestamp}, got ${file.lastModified}`);
});

await test("File: empty file", () => {
  const file = new File([], "empty.txt");
  if (file.size !== 0) throw new Error(`Expected size 0, got ${file.size}`);
  if (file.name !== "empty.txt") throw new Error(`Expected 'empty.txt', got '${file.name}'`);
});

await test("File: multiple parts", () => {
  const file = new File(["Hello", " ", "World"], "greeting.txt");
  if (file.size !== 11) throw new Error(`Expected size 11, got ${file.size}`);
});

// ==========================
// File Methods Tests
// ==========================

await test("File: text() method", async () => {
  const file = new File(["Hello, File!"], "message.txt");
  const text = await file.text();
  if (text !== "Hello, File!") throw new Error(`Expected 'Hello, File!', got '${text}'`);
});

await test("File: text() on empty file", async () => {
  const file = new File([], "empty.txt");
  const text = await file.text();
  if (text !== "") throw new Error(`Expected empty string, got '${text}'`);
});

await test("File: arrayBuffer() method", async () => {
  const file = new File(["test"], "data.bin");
  const buffer = await file.arrayBuffer();
  if (!(buffer instanceof ArrayBuffer)) throw new Error("Result should be ArrayBuffer");
  if (buffer.byteLength !== 4) throw new Error(`Expected byteLength 4, got ${buffer.byteLength}`);
});

await test("File: arrayBuffer() on empty file", async () => {
  const file = new File([], "empty.bin");
  const buffer = await file.arrayBuffer();
  if (!(buffer instanceof ArrayBuffer)) throw new Error("Result should be ArrayBuffer");
  if (buffer.byteLength !== 0) throw new Error(`Expected byteLength 0, got ${buffer.byteLength}`);
});

// ==========================
// File with Different Types
// ==========================

await test("File: JSON type", () => {
  const file = new File(['{"key": "value"}'], "data.json", { type: "application/json" });
  if (file.type !== "application/json") throw new Error(`Expected 'application/json', got '${file.type}'`);
});

await test("File: Image type", () => {
  const file = new File(["binary data"], "image.png", { type: "image/png" });
  if (file.type !== "image/png") throw new Error(`Expected 'image/png', got '${file.type}'`);
  if (file.name !== "image.png") throw new Error(`Expected 'image.png', got '${file.name}'`);
});

await test("File: PDF type", () => {
  const file = new File(["pdf content"], "document.pdf", { type: "application/pdf" });
  if (file.type !== "application/pdf") throw new Error(`Expected 'application/pdf', got '${file.type}'`);
});

// ==========================
// Edge Cases
// ==========================

await test("File: name with path separators", () => {
  const file = new File(["content"], "folder/subfolder/file.txt");
  // Name should be as provided - no path normalization in File API
  if (file.name !== "folder/subfolder/file.txt") throw new Error(`Expected 'folder/subfolder/file.txt', got '${file.name}'`);
});

await test("File: name with special characters", () => {
  const file = new File(["content"], "file (1).txt");
  if (file.name !== "file (1).txt") throw new Error(`Expected 'file (1).txt', got '${file.name}'`);
});

await test("File: very long content", () => {
  const longContent = "x".repeat(10000);
  const file = new File([longContent], "large.txt");
  if (file.size !== 10000) throw new Error(`Expected size 10000, got ${file.size}`);
});

// ==========================
// Integration Tests
// ==========================

await test("File: text() returns correct content", async () => {
  const original = "The quick brown fox jumps over the lazy dog";
  const file = new File([original], "pangram.txt", { type: "text/plain" });
  const text = await file.text();
  if (text !== original) throw new Error(`Content mismatch: expected '${original}', got '${text}'`);
});

await test("File: properties are all accessible", () => {
  const file = new File(["test content"], "test.txt", {
    type: "text/plain",
    lastModified: 9999999999999
  });

  if (file.name !== "test.txt") throw new Error("Name property failed");
  if (file.type !== "text/plain") throw new Error("Type property failed");
  if (file.size !== 12) throw new Error("Size property failed");
  if (file.lastModified !== 9999999999999) throw new Error("LastModified property failed");
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
