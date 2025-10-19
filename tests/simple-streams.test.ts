// Simple Streams API demonstration
console.log("=== Simple Streams API Demo ===\n");

// Create a readable stream of numbers
const numberStream = new ReadableStream({
  start(controller) {
    for (let i = 1; i <= 5; i++) {
      controller.enqueue(i);
    }
    controller.close();
  },
});

// Create a transform stream that doubles numbers
const doubleTransform = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk * 2);
  },
});

// Collect results in a writable stream
const results: number[] = [];
const collector = new WritableStream({
  write(chunk) {
    results.push(chunk);
  },
});

// Chain the streams together
async function runDemo() {
  await numberStream.pipeThrough(doubleTransform).pipeTo(collector);

  console.log("Input numbers: 1, 2, 3, 4, 5");
  console.log("Doubled output:", results.join(", "));
  console.log("\n✅ Streams API working correctly!");
}

runDemo();

export {};
