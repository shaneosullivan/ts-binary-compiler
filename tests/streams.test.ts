// Test file for Streams API support
// Tests ReadableStream, WritableStream, and TransformStream

console.log("=== Streams API Test ===\n");

// Test 1: Check that ReadableStream is defined
console.log("Test 1: ReadableStream constructor exists");
if (typeof ReadableStream !== "undefined") {
  console.log("✅ ReadableStream is defined");
} else {
  console.log("❌ ReadableStream is undefined");
  throw new Error("ReadableStream not available");
}

// Test 2: Check that WritableStream is defined
console.log("\nTest 2: WritableStream constructor exists");
if (typeof WritableStream !== "undefined") {
  console.log("✅ WritableStream is defined");
} else {
  console.log("❌ WritableStream is undefined");
  throw new Error("WritableStream not available");
}

// Test 3: Check that TransformStream is defined
console.log("\nTest 3: TransformStream constructor exists");
if (typeof TransformStream !== "undefined") {
  console.log("✅ TransformStream is defined");
} else {
  console.log("❌ TransformStream is undefined");
  throw new Error("TransformStream not available");
}

// Test 4: Create a basic ReadableStream
console.log("\nTest 4: Create a basic ReadableStream");
try {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue("chunk 1");
      controller.enqueue("chunk 2");
      controller.enqueue("chunk 3");
      controller.close();
    },
  });
  console.log("✅ ReadableStream created successfully");
  console.log("   Stream type:", typeof stream);
  console.log("   Has getReader:", typeof stream.getReader === "function");
} catch (error) {
  console.log("❌ Failed to create ReadableStream:", error);
  throw error;
}

// Test 5: Read from a ReadableStream
console.log("\nTest 5: Read from a ReadableStream");
async function testReadableStream() {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue("Hello");
      controller.enqueue(" ");
      controller.enqueue("World");
      controller.close();
    },
  });

  const reader = stream.getReader();
  const chunks: string[] = [];

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    const result = chunks.join("");
    if (result === "Hello World") {
      console.log("✅ Successfully read from stream:", result);
    } else {
      console.log("❌ Unexpected result:", result);
      throw new Error("ReadableStream read test failed");
    }
  } finally {
    reader.releaseLock();
  }
}

// Test 6: Create a WritableStream
console.log("\nTest 6: Create a WritableStream");
async function testWritableStream() {
  const chunks: string[] = [];

  const stream = new WritableStream({
    write(chunk) {
      chunks.push(chunk);
    },
    close() {
      console.log("   WritableStream closed");
    },
  });

  const writer = stream.getWriter();

  try {
    await writer.write("Line 1");
    await writer.write("Line 2");
    await writer.write("Line 3");
    await writer.close();

    if (chunks.length === 3 && chunks[0] === "Line 1") {
      console.log("✅ WritableStream works correctly");
      console.log("   Chunks written:", chunks);
    } else {
      console.log("❌ WritableStream test failed");
      throw new Error("WritableStream test failed");
    }
  } catch (error) {
    console.log("❌ WritableStream error:", error);
    throw error;
  }
}

// Test 7: Create a TransformStream
console.log("\nTest 7: Create a TransformStream");
async function testTransformStream() {
  // Create a transform stream that uppercases text
  const transform = new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(chunk.toUpperCase());
    },
  });

  // Create a readable stream
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue("hello");
      controller.enqueue("world");
      controller.close();
    },
  });

  // Pipe through the transform
  const transformed = readable.pipeThrough(transform);
  const reader = transformed.getReader();

  const results: string[] = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      results.push(value);
    }

    if (results[0] === "HELLO" && results[1] === "WORLD") {
      console.log("✅ TransformStream works correctly");
      console.log("   Transformed:", results);
    } else {
      console.log("❌ TransformStream test failed");
      console.log("   Got:", results);
      throw new Error("TransformStream test failed");
    }
  } finally {
    reader.releaseLock();
  }
}

// Test 8: Pipe a ReadableStream to a WritableStream
console.log("\nTest 8: Pipe ReadableStream to WritableStream");
async function testPiping() {
  const chunks: string[] = [];

  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue("A");
      controller.enqueue("B");
      controller.enqueue("C");
      controller.close();
    },
  });

  const writable = new WritableStream({
    write(chunk) {
      chunks.push(chunk);
    },
  });

  await readable.pipeTo(writable);

  if (chunks.length === 3 && chunks.join("") === "ABC") {
    console.log("✅ Piping works correctly");
    console.log("   Result:", chunks);
  } else {
    console.log("❌ Piping test failed");
    throw new Error("Piping test failed");
  }
}

// Test 9: Test that streams work with async iteration
console.log("\nTest 9: Test async iteration over ReadableStream");
async function testAsyncIteration() {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(1);
      controller.enqueue(2);
      controller.enqueue(3);
      controller.close();
    },
  });

  const results: number[] = [];

  // ReadableStream should be async iterable
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      results.push(value);
    }

    if (results.length === 3 && results[0] === 1 && results[2] === 3) {
      console.log("✅ Async iteration works");
      console.log("   Values:", results);
    } else {
      console.log("❌ Async iteration test failed");
      throw new Error("Async iteration test failed");
    }
  } finally {
    reader.releaseLock();
  }
}

// Run all async tests
async function runTests() {
  try {
    await testReadableStream();
    await testWritableStream();
    await testTransformStream();
    await testPiping();
    await testAsyncIteration();

    console.log("\n=== All Streams API Tests Passed! ===");
  } catch (error) {
    console.log("\n=== Streams API Tests Failed ===");
    console.error(error);
    throw error;
  }
}

runTests();

export {};
