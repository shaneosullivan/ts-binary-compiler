// Comprehensive debugging tests for fetch issue
console.log('=== Debug Fetch Tests ===\n');

// Test 1: Single fetch call (baseline)
console.log('Test 1: Single fetch call');
async function test1() {
  try {
    console.log('[TEST1] About to call fetch');
    const response = await fetch('https://httpbin.org/get');
    console.log('[TEST1] ✅ Fetch succeeded, status:', response.status);
    return true;
  } catch (error) {
    console.log('[TEST1] ❌ Error:', error.message);
    return false;
  }
}

// Test 2: Two sequential fetch calls
console.log('\nTest 2: Two sequential fetch calls');
async function test2() {
  try {
    console.log('[TEST2] First fetch');
    const response1 = await fetch('https://httpbin.org/get');
    console.log('[TEST2] First fetch succeeded, status:', response1.status);

    console.log('[TEST2] Second fetch');
    const response2 = await fetch('https://httpbin.org/get');
    console.log('[TEST2] ✅ Second fetch succeeded, status:', response2.status);
    return true;
  } catch (error) {
    console.log('[TEST2] ❌ Error:', error.message);
    console.log('[TEST2] Stack:', error.stack);
    return false;
  }
}

// Test 3: Fetch with response.text() call
console.log('\nTest 3: Fetch with response.text()');
async function test3() {
  try {
    console.log('[TEST3] Calling fetch');
    const response = await fetch('https://httpbin.org/get');
    console.log('[TEST3] Fetch succeeded, about to call text()');
    console.log('[TEST3] response.text type:', typeof response.text);
    console.log('[TEST3] response.text value:', response.text);

    const text = await response.text();
    console.log('[TEST3] ✅ text() succeeded, length:', text.length);
    return true;
  } catch (error) {
    console.log('[TEST3] ❌ Error:', error.message);
    console.log('[TEST3] Stack:', error.stack);
    return false;
  }
}

// Test 4: Fetch with explicit undefined options
console.log('\nTest 4: Fetch with explicit undefined options');
async function test4() {
  try {
    console.log('[TEST4] Calling fetch with undefined options');
    const response = await fetch('https://httpbin.org/get', undefined);
    console.log('[TEST4] ✅ Fetch succeeded, status:', response.status);
    return true;
  } catch (error) {
    console.log('[TEST4] ❌ Error:', error.message);
    return false;
  }
}

// Test 5: Fetch with empty options object
console.log('\nTest 5: Fetch with empty options object');
async function test5() {
  try {
    console.log('[TEST5] Calling fetch with {}');
    const response = await fetch('https://httpbin.org/get', {});
    console.log('[TEST5] ✅ Fetch succeeded, status:', response.status);
    return true;
  } catch (error) {
    console.log('[TEST5] ❌ Error:', error.message);
    return false;
  }
}

// Test 6: Fetch with method option
console.log('\nTest 6: Fetch with method option');
async function test6() {
  try {
    console.log('[TEST6] Calling fetch with method: GET');
    const response = await fetch('https://httpbin.org/get', { method: 'GET' });
    console.log('[TEST6] ✅ Fetch succeeded, status:', response.status);
    return true;
  } catch (error) {
    console.log('[TEST6] ❌ Error:', error.message);
    return false;
  }
}

// Run all tests sequentially
async function runAllTests() {
  console.log('\n=== Starting Tests ===\n');

  const result1 = await test1();
  console.log('Test 1 result:', result1 ? 'PASS' : 'FAIL');

  const result2 = await test2();
  console.log('Test 2 result:', result2 ? 'PASS' : 'FAIL');

  const result3 = await test3();
  console.log('Test 3 result:', result3 ? 'PASS' : 'FAIL');

  const result4 = await test4();
  console.log('Test 4 result:', result4 ? 'PASS' : 'FAIL');

  const result5 = await test5();
  console.log('Test 5 result:', result5 ? 'PASS' : 'FAIL');

  const result6 = await test6();
  console.log('Test 6 result:', result6 ? 'PASS' : 'FAIL');

  console.log('\n=== Tests Complete ===');
}

runAllTests();
