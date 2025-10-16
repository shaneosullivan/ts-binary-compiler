// Test for Promise subclassing pattern that breaks fetch
// Based on openai-node's APIPromise pattern

(async () => {
const BASE_URL = "http://localhost:3101";

// Subclass Promise similar to openai-node's APIPromise
class CustomPromise<T> extends Promise<T> {
  private parsedPromise: Promise<T> | undefined;

  constructor(private responsePromise: Promise<T>) {
    // Call super with a resolver that resolves to null
    super((resolve) => {
      resolve(null as any);
    });
  }

  private parse(): Promise<T> {
    if (!this.parsedPromise) {
      this.parsedPromise = this.responsePromise;
    }
    return this.parsedPromise;
  }

  override then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2> {
    return this.parse().then(onfulfilled, onrejected);
  }

  override catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | PromiseLike<TResult>)
      | undefined
      | null
  ): Promise<T | TResult> {
    return this.parse().catch(onrejected);
  }

  override finally(onfinally?: (() => void) | undefined | null): Promise<T> {
    return this.parse().finally(onfinally);
  }
}

let totalTests = 0;
let passedTests = 0;

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

// Test 1: Regular Promise (control test)
await test("Regular Promise with fetch", async () => {
  const response = await fetch(`${BASE_URL}/test`);
  if (response.status !== 200) {
    throw new Error(`Expected status 200, got ${response.status}`);
  }
  const text = await response.text();
  if (!text || text.length === 0) {
    throw new Error("Expected non-empty response body");
  }
});

// Test 2: Wrapped in CustomPromise (should expose the bug)
await test("CustomPromise wrapping fetch", async () => {
  const fetchPromise = fetch(`${BASE_URL}/test`);
  const customPromise = new CustomPromise(fetchPromise);

  const response = await customPromise;
  if (response.status !== 200) {
    throw new Error(`Expected status 200, got ${response.status}`);
  }
  const text = await response.text();
  if (!text || text.length === 0) {
    throw new Error("Expected non-empty response body");
  }
});

// Test 3: CustomPromise with .then()
await test("CustomPromise with .then() chaining", async () => {
  const fetchPromise = fetch(`${BASE_URL}/test`);
  const customPromise = new CustomPromise(fetchPromise);

  const text = await customPromise.then((response) => {
    if (response.status !== 200) {
      throw new Error(`Expected status 200, got ${response.status}`);
    }
    return response.text();
  });

  if (!text || text.length === 0) {
    throw new Error("Expected non-empty response body");
  }
});

// Test 4: CustomPromise with .catch()
await test("CustomPromise with .catch() handling", async () => {
  const fetchPromise = fetch(`${BASE_URL}/test`);
  const customPromise = new CustomPromise(fetchPromise);

  try {
    const response = await customPromise.catch((error) => {
      throw new Error(`Fetch failed: ${error.message}`);
    });

    if (response.status !== 200) {
      throw new Error(`Expected status 200, got ${response.status}`);
    }
  } catch (error) {
    // This is expected if fetch fails
    console.log("   Caught expected error");
  }
});

// Test 5: CustomPromise with .finally()
await test("CustomPromise with .finally()", async () => {
  let finallyCalled = false;

  const fetchPromise = fetch(`${BASE_URL}/test`);
  const customPromise = new CustomPromise(fetchPromise);

  const response = await customPromise.finally(() => {
    finallyCalled = true;
  });

  if (!finallyCalled) {
    throw new Error("finally() was not called");
  }

  if (response.status !== 200) {
    throw new Error(`Expected status 200, got ${response.status}`);
  }
});

// Test 6: Nested CustomPromise
await test("Nested CustomPromise wrapping", async () => {
  const fetchPromise = fetch(`${BASE_URL}/test`);
  const customPromise1 = new CustomPromise(fetchPromise);
  const customPromise2 = new CustomPromise(customPromise1);

  const response = await customPromise2;
  if (response.status !== 200) {
    throw new Error(`Expected status 200, got ${response.status}`);
  }
});

// Test 7: CustomPromise with multiple .then() chains
await test("CustomPromise with multiple .then() chains", async () => {
  const fetchPromise = fetch(`${BASE_URL}/test`);
  const customPromise = new CustomPromise(fetchPromise);

  const result = await customPromise
    .then((response) => response.status)
    .then((status) => {
      if (status !== 200) {
        throw new Error(`Expected status 200, got ${status}`);
      }
      return status;
    })
    .then((status) => status * 2);

  if (result !== 400) {
    throw new Error(`Expected 400, got ${result}`);
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
