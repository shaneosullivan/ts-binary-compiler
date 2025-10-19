// Test calling native fetch directly
console.log('=== Direct Native Fetch Test ===\n');

// Store reference to native fetch BEFORE fetch-wrapper loads
// This test will fail because fetch-wrapper loads first, but let's try anyway
const nativeFetch = (globalThis as any).fetch;

console.log('typeof nativeFetch:', typeof nativeFetch);
console.log('nativeFetch:', nativeFetch);

async function test() {
  try {
    console.log('\nTest: Calling fetch directly');
    console.log('About to call nativeFetch...');

    // Try calling with just URL
    const result = nativeFetch('https://httpbin.org/get');

    console.log('nativeFetch returned');
    console.log('typeof result:', typeof result);
    console.log('result:', result);

    if (result && typeof result.then === 'function') {
      console.log('result.then is a function, waiting...');
      const response = await result;
      console.log('✅ Success! Status:', response.status);
    } else {
      console.log('❌ Result is not a thenable');
    }
  } catch (error) {
    console.log('❌ Error:', error);
    console.log('Error message:', error.message);
    console.log('Error stack:', error.stack);
  }
}

test();
