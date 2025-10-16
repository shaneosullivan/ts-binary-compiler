// Comprehensive test suite for crypto API (getRandomValues and randomUUID)

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
// crypto.randomUUID() Tests
// ==========================

test("randomUUID: Returns a string", () => {
  const uuid = crypto.randomUUID();
  if (typeof uuid !== "string") throw new Error(`Expected string, got ${typeof uuid}`);
});

test("randomUUID: Has correct length", () => {
  const uuid = crypto.randomUUID();
  // UUID format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (36 chars)
  if (uuid.length !== 36) throw new Error(`Expected length 36, got ${uuid.length}`);
});

test("randomUUID: Has correct format", () => {
  const uuid = crypto.randomUUID();
  // Check format with regex: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
  if (!uuidRegex.test(uuid)) throw new Error(`Invalid UUID format: ${uuid}`);
});

test("randomUUID: Has dashes in correct positions", () => {
  const uuid = crypto.randomUUID();
  if (uuid[8] !== "-") throw new Error("Missing dash at position 8");
  if (uuid[13] !== "-") throw new Error("Missing dash at position 13");
  if (uuid[18] !== "-") throw new Error("Missing dash at position 18");
  if (uuid[23] !== "-") throw new Error("Missing dash at position 23");
});

test("randomUUID: Version 4 marker", () => {
  const uuid = crypto.randomUUID();
  // Character at position 14 should be '4' for version 4 UUID
  if (uuid[14] !== "4") throw new Error(`Expected version 4, got ${uuid[14]} in ${uuid}`);
});

test("randomUUID: Variant marker", () => {
  const uuid = crypto.randomUUID();
  // Character at position 19 should be 8, 9, a, or b for RFC 4122 variant
  const variantChar = uuid[19];
  if (!["8", "9", "a", "b"].includes(variantChar)) {
    throw new Error(`Invalid variant marker: ${variantChar} in ${uuid}`);
  }
});

test("randomUUID: Generates unique values", () => {
  const uuid1 = crypto.randomUUID();
  const uuid2 = crypto.randomUUID();
  if (uuid1 === uuid2) throw new Error("Generated duplicate UUIDs");
});

test("randomUUID: Multiple calls produce different UUIDs", () => {
  const uuids = new Set<string>();
  for (let i = 0; i < 10; i++) {
    uuids.add(crypto.randomUUID());
  }
  if (uuids.size !== 10) throw new Error(`Expected 10 unique UUIDs, got ${uuids.size}`);
});

// ==========================
// crypto.getRandomValues() Tests
// ==========================

test("getRandomValues: Works with Uint8Array", () => {
  const array = new Uint8Array(10);
  const result = crypto.getRandomValues(array);
  if (!(result instanceof Uint8Array)) throw new Error("Result should be Uint8Array");
  if (result !== array) throw new Error("Should return same array");
});

test("getRandomValues: Fills array with values", () => {
  const array = new Uint8Array(10);
  // Fill with zeros first
  array.fill(0);
  crypto.getRandomValues(array);

  // Check that at least some values are non-zero
  let hasNonZero = false;
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== 0) {
      hasNonZero = true;
      break;
    }
  }
  if (!hasNonZero) throw new Error("Array should have some non-zero values");
});

test("getRandomValues: Values are in valid byte range", () => {
  const array = new Uint8Array(20);
  crypto.getRandomValues(array);

  for (let i = 0; i < array.length; i++) {
    if (array[i] < 0 || array[i] > 255) {
      throw new Error(`Value ${array[i]} at index ${i} is out of byte range`);
    }
  }
});

test("getRandomValues: Works with empty array", () => {
  const array = new Uint8Array(0);
  const result = crypto.getRandomValues(array);
  if (result.length !== 0) throw new Error("Empty array should stay empty");
});

test("getRandomValues: Works with single byte", () => {
  const array = new Uint8Array(1);
  crypto.getRandomValues(array);
  if (typeof array[0] !== "number") throw new Error("Should fill single byte");
});

test("getRandomValues: Generates different values", () => {
  const array1 = new Uint8Array(16);
  const array2 = new Uint8Array(16);

  crypto.getRandomValues(array1);
  crypto.getRandomValues(array2);

  // Arrays should be different (extremely unlikely to be identical)
  let identical = true;
  for (let i = 0; i < 16; i++) {
    if (array1[i] !== array2[i]) {
      identical = false;
      break;
    }
  }

  if (identical) throw new Error("Two random arrays should not be identical");
});

test("getRandomValues: Works with larger arrays", () => {
  const array = new Uint8Array(1000);
  const result = crypto.getRandomValues(array);
  if (result.length !== 1000) throw new Error(`Expected length 1000, got ${result.length}`);

  // Check for some distribution (not all same value)
  const firstValue = array[0];
  let allSame = true;
  for (let i = 1; i < array.length; i++) {
    if (array[i] !== firstValue) {
      allSame = false;
      break;
    }
  }
  if (allSame) throw new Error("All values should not be the same");
});

test("getRandomValues: Respects array bounds", () => {
  const array = new Uint8Array(50);
  crypto.getRandomValues(array);

  // Check that exactly 50 values were set
  if (array.length !== 50) throw new Error(`Expected 50 values, got ${array.length}`);
});

// ==========================
// Integration Tests
// ==========================

test("crypto object exists", () => {
  if (typeof crypto === "undefined") throw new Error("crypto object should exist");
  if (typeof crypto !== "object") throw new Error("crypto should be an object");
});

test("crypto.randomUUID is a function", () => {
  if (typeof crypto.randomUUID !== "function") {
    throw new Error("crypto.randomUUID should be a function");
  }
});

test("crypto.getRandomValues is a function", () => {
  if (typeof crypto.getRandomValues !== "function") {
    throw new Error("crypto.getRandomValues should be a function");
  }
});

test("UUID format is consistent", () => {
  // Generate multiple UUIDs and verify they all have same format
  for (let i = 0; i < 5; i++) {
    const uuid = crypto.randomUUID();
    if (uuid.length !== 36) throw new Error(`UUID ${i} has wrong length`);
    if (uuid[14] !== "4") throw new Error(`UUID ${i} missing version marker`);
    if (!["8", "9", "a", "b"].includes(uuid[19])) {
      throw new Error(`UUID ${i} has invalid variant`);
    }
  }
});

test("Random values have reasonable distribution", () => {
  const array = new Uint8Array(1000);
  crypto.getRandomValues(array);

  // Count zeros - should be around 1000/256 ≈ 4, allow 0-15 for randomness
  let zeroCount = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === 0) zeroCount++;
  }

  if (zeroCount > 50) {
    throw new Error(`Too many zeros: ${zeroCount} out of 1000 (expected ~4)`);
  }
});

test("getRandomValues with Uint16Array", () => {
  const array = new Uint16Array(10);
  const result = crypto.getRandomValues(array);
  if (!(result instanceof Uint16Array)) throw new Error("Result should be Uint16Array");

  // Check values are in 16-bit range
  for (let i = 0; i < array.length; i++) {
    if (array[i] < 0 || array[i] > 65535) {
      throw new Error(`Value ${array[i]} is out of 16-bit range`);
    }
  }
});

test("getRandomValues with Uint32Array", () => {
  const array = new Uint32Array(10);
  const result = crypto.getRandomValues(array);
  if (!(result instanceof Uint32Array)) throw new Error("Result should be Uint32Array");

  // Check values are numbers
  for (let i = 0; i < array.length; i++) {
    if (typeof array[i] !== "number") {
      throw new Error(`Value at index ${i} should be a number`);
    }
  }
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
