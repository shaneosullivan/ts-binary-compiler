// Comprehensive test suite for URL and URLSearchParams APIs

(async () => {
let totalTests = 0;
let passedTests = 0;

async function test(name: string, fn: () => void) {
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
// URL API Tests
// ==========================

await test("URL: Basic parsing", () => {
  const url = new URL("https://example.com:8080/path?foo=bar#section");
  if (url.protocol !== "https:") throw new Error(`Expected protocol 'https:', got '${url.protocol}'`);
  if (url.hostname !== "example.com") throw new Error(`Expected hostname 'example.com', got '${url.hostname}'`);
  if (url.port !== "8080") throw new Error(`Expected port '8080', got '${url.port}'`);
  if (url.pathname !== "/path") throw new Error(`Expected pathname '/path', got '${url.pathname}'`);
  if (url.search !== "?foo=bar") throw new Error(`Expected search '?foo=bar', got '${url.search}'`);
  if (url.hash !== "#section") throw new Error(`Expected hash '#section', got '${url.hash}'`);
});

await test("URL: With authentication", () => {
  const url = new URL("https://user:pass@example.com/path");
  if (url.username !== "user") throw new Error(`Expected username 'user', got '${url.username}'`);
  if (url.password !== "pass") throw new Error(`Expected password 'pass', got '${url.password}'`);
});

await test("URL: host property", () => {
  const url1 = new URL("https://example.com:8080/path");
  if (url1.host !== "example.com:8080") throw new Error(`Expected 'example.com:8080', got '${url1.host}'`);

  const url2 = new URL("https://example.com/path");
  if (url2.host !== "example.com") throw new Error(`Expected 'example.com', got '${url2.host}'`);
});

await test("URL: origin property", () => {
  const url = new URL("https://example.com:8080/path?foo=bar#section");
  if (url.origin !== "https://example.com:8080") {
    throw new Error(`Expected 'https://example.com:8080', got '${url.origin}'`);
  }
});

await test("URL: href property", () => {
  const url = new URL("https://example.com:8080/path?foo=bar#section");
  if (!url.href.includes("https://")) throw new Error("href should contain protocol");
  if (!url.href.includes("example.com")) throw new Error("href should contain hostname");
});

// ==========================
// URLSearchParams API Tests
// ==========================

await test("URLSearchParams: Parse query string", () => {
  const params = new URLSearchParams("foo=bar&baz=qux");
  if (params.get("foo") !== "bar") throw new Error(`Expected 'bar', got '${params.get("foo")}'`);
  if (params.get("baz") !== "qux") throw new Error(`Expected 'qux', got '${params.get("baz")}'`);
});

await test("URLSearchParams: URL encoding/decoding", () => {
  const params = new URLSearchParams("name=John+Doe&msg=Hello%20World");
  if (params.get("name") !== "John Doe") throw new Error(`Expected 'John Doe', got '${params.get("name")}'`);
  if (params.get("msg") !== "Hello World") throw new Error(`Expected 'Hello World', got '${params.get("msg")}'`);
});

await test("URLSearchParams: append() method", () => {
  const params = new URLSearchParams();
  params.append("key1", "value1");
  params.append("key2", "value2");

  if (params.get("key1") !== "value1") throw new Error("Failed to append key1");
  if (params.get("key2") !== "value2") throw new Error("Failed to append key2");
});

await test("URLSearchParams: toString() method", () => {
  const params = new URLSearchParams();
  params.append("foo", "bar");
  params.append("baz", "qux");

  const str = params.toString();
  if (!str.includes("foo=bar")) throw new Error("toString should contain foo=bar");
  if (!str.includes("baz=qux")) throw new Error("toString should contain baz=qux");
});

await test("URLSearchParams: Special characters encoding", () => {
  const params = new URLSearchParams();
  params.append("key", "value with spaces");
  params.append("special", "a&b=c");

  const str = params.toString();
  if (str.includes(" ")) throw new Error("Spaces should be encoded");
  if (str.includes("a&b=c")) throw new Error("& should be encoded");
});

await test("URLSearchParams: Get non-existent key", () => {
  const params = new URLSearchParams("foo=bar");
  const result = params.get("nonexistent");

  if (result !== null) throw new Error(`Expected null, got '${result}'`);
});

await test("URLSearchParams: Parse from URL", () => {
  const url = new URL("https://example.com/search?q=test&page=2&sort=date");
  const params = new URLSearchParams(url.search);

  if (params.get("q") !== "test") throw new Error(`Expected 'test', got '${params.get("q")}'`);
  if (params.get("page") !== "2") throw new Error(`Expected '2', got '${params.get("page")}'`);
  if (params.get("sort") !== "date") throw new Error(`Expected 'date', got '${params.get("sort")}'`);
});

await test("URLSearchParams: Empty initialization", () => {
  const params = new URLSearchParams();
  const str = params.toString();

  if (str !== "") throw new Error(`Expected empty string, got '${str}'`);
});

// ==========================
// Integration Tests
// ==========================

await test("Integration: URL + URLSearchParams", () => {
  const url = new URL("https://api.example.com/search");
  const params = new URLSearchParams();
  params.append("q", "javascript");
  params.append("limit", "10");

  const fullUrl = url.href + "?" + params.toString();
  if (!fullUrl.includes("q=javascript")) throw new Error("URL should include query parameter");
  if (!fullUrl.includes("limit=10")) throw new Error("URL should include limit parameter");
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
