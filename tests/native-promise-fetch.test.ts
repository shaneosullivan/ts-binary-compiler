// Test fetch with native QuickJS Promise (no core-js polyfill)
console.log('=== Native Promise Fetch Test ===\n');

console.log('Test 1: Simple async fetch');
async function test1() {
  try {
    console.log('[TEST1] About to call fetch');
    const response = await fetch('https://httpbin.org/get');
    console.log('[TEST1] ✅ Fetch succeeded, status:', response.status);
    return true;
  } catch (error) {
    console.log('[TEST1] ❌ Error:', error.message);
    console.log('[TEST1] Stack:', error.stack);
    return false;
  }
}

console.log('\nTest 2: Synchronous promise chaining');
function test2() {
  try {
    console.log('[TEST2] Calling fetch synchronously');
    const promise = fetch('https://httpbin.org/get');
    console.log('[TEST2] typeof promise:', typeof promise);
    console.log('[TEST2] typeof promise.then:', typeof promise.then);

    promise.then(
      (response) => {
        console.log('[TEST2] ✅ Promise resolved! Status:', response.status);
      },
      (error) => {
        console.log('[TEST2] ❌ Promise rejected:', error.message);
      }
    );

    console.log('[TEST2] promise.then() called');
    return true;
  } catch (error) {
    console.log('[TEST2] ❌ Exception:', error.message);
    return false;
  }
}

console.log('\nTest 3: Two sequential fetches');
async function test3() {
  try {
    console.log('[TEST3] First fetch');
    const response1 = await fetch('https://httpbin.org/get');
    console.log('[TEST3] First fetch succeeded, status:', response1.status);

    console.log('[TEST3] Second fetch');
    const response2 = await fetch('https://httpbin.org/get');
    console.log('[TEST3] ✅ Second fetch succeeded, status:', response2.status);
    return true;
  } catch (error) {
    console.log('[TEST3] ❌ Error:', error.message);
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('\n=== Starting Tests ===\n');

  const result1 = await test1();
  console.log('Test 1 result:', result1 ? 'PASS' : 'FAIL');

  test2();  // This one doesn't await

  const result3 = await test3();
  console.log('Test 3 result:', result3 ? 'PASS' : 'FAIL');

  console.log('\n=== Tests Complete ===');
}

runAllTests();
