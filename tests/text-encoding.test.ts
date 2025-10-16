// Comprehensive test suite for TextEncoder and TextDecoder APIs

(async () => {
let totalTests = 0;
let passedTests = 0;

function test(name: string, fn: () => void) {
  totalTests++;
  console.log(`🔍 Test ${totalTests}: ${name}`);
  try {
    fn();
    passedTests++;
    console.log(`✅ ${name}: PASSED\n`);
  } catch (error) {
    console.log(`❌ ${name}: FAILED`);
    if (error instanceof Error) {
      console.log(`   Error: ${error.message}\n`);
    }
  }
}

// ==========================
// TextEncoder Tests
// ==========================

test("TextEncoder: Basic construction", () => {
  const encoder = new TextEncoder();
  if (typeof encoder !== "object") throw new Error("TextEncoder should be an object");
});

test("TextEncoder: encoding property", () => {
  const encoder = new TextEncoder();
  if (encoder.encoding !== "utf-8") throw new Error(`Expected 'utf-8', got '${encoder.encoding}'`);
});

test("TextEncoder: encode() simple ASCII", () => {
  const encoder = new TextEncoder();
  const result = encoder.encode("hello");

  if (!(result instanceof Uint8Array)) throw new Error("Result should be Uint8Array");
  if (result.length !== 5) throw new Error(`Expected length 5, got ${result.length}`);
  if (result[0] !== 104) throw new Error(`Expected 104 for 'h', got ${result[0]}`);
  if (result[1] !== 101) throw new Error(`Expected 101 for 'e', got ${result[1]}`);
  if (result[2] !== 108) throw new Error(`Expected 108 for 'l', got ${result[2]}`);
  if (result[3] !== 108) throw new Error(`Expected 108 for 'l', got ${result[3]}`);
  if (result[4] !== 111) throw new Error(`Expected 111 for 'o', got ${result[4]}`);
});

test("TextEncoder: encode() empty string", () => {
  const encoder = new TextEncoder();
  const result = encoder.encode("");

  if (!(result instanceof Uint8Array)) throw new Error("Result should be Uint8Array");
  if (result.length !== 0) throw new Error(`Expected length 0, got ${result.length}`);
});

test("TextEncoder: encode() UTF-8 characters", () => {
  const encoder = new TextEncoder();
  const result = encoder.encode("Hello 世界");

  if (!(result instanceof Uint8Array)) throw new Error("Result should be Uint8Array");
  // "Hello " = 6 bytes, "世" = 3 bytes, "界" = 3 bytes = 12 total
  if (result.length !== 12) throw new Error(`Expected length 12, got ${result.length}`);
});

test("TextEncoder: encode() emoji", () => {
  const encoder = new TextEncoder();
  const result = encoder.encode("🎉");

  if (!(result instanceof Uint8Array)) throw new Error("Result should be Uint8Array");
  // Emoji is typically 4 bytes in UTF-8
  if (result.length !== 4) throw new Error(`Expected length 4, got ${result.length}`);
});

test("TextEncoder: encode() special characters", () => {
  const encoder = new TextEncoder();
  const result = encoder.encode("a\nb\tc");

  if (!(result instanceof Uint8Array)) throw new Error("Result should be Uint8Array");
  // a(1) + \n(1) + b(1) + \t(1) + c(1) = 5
  if (result.length !== 5) throw new Error(`Expected length 5, got ${result.length}`);
  if (result[0] !== 97) throw new Error(`Expected 97 for 'a', got ${result[0]}`);
  if (result[1] !== 10) throw new Error(`Expected 10 for newline, got ${result[1]}`);
  if (result[2] !== 98) throw new Error(`Expected 98 for 'b', got ${result[2]}`);
  if (result[3] !== 9) throw new Error(`Expected 9 for tab, got ${result[3]}`);
  if (result[4] !== 99) throw new Error(`Expected 99 for 'c', got ${result[4]}`);
});

// ==========================
// TextDecoder Tests
// ==========================

test("TextDecoder: Basic construction", () => {
  const decoder = new TextDecoder();
  if (typeof decoder !== "object") throw new Error("TextDecoder should be an object");
});

test("TextDecoder: encoding property", () => {
  const decoder = new TextDecoder();
  if (decoder.encoding !== "utf-8") throw new Error(`Expected 'utf-8', got '${decoder.encoding}'`);
});

test("TextDecoder: decode() simple ASCII", () => {
  const decoder = new TextDecoder();
  const bytes = new Uint8Array([104, 101, 108, 108, 111]); // "hello"
  const result = decoder.decode(bytes);

  if (result !== "hello") throw new Error(`Expected 'hello', got '${result}'`);
});

test("TextDecoder: decode() empty array", () => {
  const decoder = new TextDecoder();
  const bytes = new Uint8Array([]);
  const result = decoder.decode(bytes);

  if (result !== "") throw new Error(`Expected empty string, got '${result}'`);
});

test("TextDecoder: decode() UTF-8 characters", () => {
  const decoder = new TextDecoder();
  // UTF-8 bytes for "Hello 世界"
  const bytes = new Uint8Array([72, 101, 108, 108, 111, 32, 228, 184, 150, 231, 149, 140]);
  const result = decoder.decode(bytes);

  if (result !== "Hello 世界") throw new Error(`Expected 'Hello 世界', got '${result}'`);
});

test("TextDecoder: decode() special characters", () => {
  const decoder = new TextDecoder();
  const bytes = new Uint8Array([97, 10, 98, 9, 99]); // "a\nb\tc"
  const result = decoder.decode(bytes);

  if (result !== "a\nb\tc") throw new Error(`Expected 'a\\nb\\tc', got '${result}'`);
});

// ==========================
// Round-trip Tests
// ==========================

test("Round-trip: encode then decode ASCII", () => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const original = "Hello, World!";
  const encoded = encoder.encode(original);
  const decoded = decoder.decode(encoded);

  if (decoded !== original) throw new Error(`Expected '${original}', got '${decoded}'`);
});

test("Round-trip: encode then decode UTF-8", () => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const original = "Hello 世界 🎉";
  const encoded = encoder.encode(original);
  const decoded = decoder.decode(encoded);

  if (decoded !== original) throw new Error(`Expected '${original}', got '${decoded}'`);
});

test("Round-trip: encode then decode special chars", () => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const original = "Line1\nLine2\tTab\rReturn";
  const encoded = encoder.encode(original);
  const decoded = decoder.decode(encoded);

  if (decoded !== original) throw new Error(`Expected '${original}', got '${decoded}'`);
});

test("Round-trip: encode then decode empty string", () => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const original = "";
  const encoded = encoder.encode(original);
  const decoded = decoder.decode(encoded);

  if (decoded !== original) throw new Error(`Expected empty string, got '${decoded}'`);
});

test("Round-trip: encode then decode long text", () => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const original = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(10);
  const encoded = encoder.encode(original);
  const decoded = decoder.decode(encoded);

  if (decoded !== original) throw new Error(`Long text round-trip failed`);
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
