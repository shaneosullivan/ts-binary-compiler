// Comprehensive test of fetch API with Request objects

console.log('=== Comprehensive Fetch API Test ===\n');

async function runTests() {
  let passed = 0;
  let failed = 0;

  // Test 1: Plain string fetch
  console.log('Test 1: Plain string fetch');
  try {
    const response = await fetch('https://httpbin.org/get');
    if (response.status === 200) {
      console.log('✅ Test 1 PASSED\n');
      passed++;
    } else {
      console.log('❌ Test 1 FAILED: Wrong status code\n');
      failed++;
    }
  } catch (error) {
    console.log('❌ Test 1 FAILED:', error.message, '\n');
    failed++;
  }

  // Test 2: Fetch with options
  console.log('Test 2: Fetch with POST options');
  try {
    const response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ test: 'data' }),
    });
    if (response.status === 200) {
      console.log('✅ Test 2 PASSED\n');
      passed++;
    } else {
      console.log('❌ Test 2 FAILED: Wrong status code\n');
      failed++;
    }
  } catch (error) {
    console.log('❌ Test 2 FAILED:', error.message, '\n');
    failed++;
  }

  // Test 3: Fetch with Request object (string URL)
  console.log('Test 3: Fetch with Request object (string URL)');
  try {
    const req = new Request('https://httpbin.org/get');
    const response = await fetch(req);
    if (response.status === 200) {
      console.log('✅ Test 3 PASSED\n');
      passed++;
    } else {
      console.log('❌ Test 3 FAILED: Wrong status code\n');
      failed++;
    }
  } catch (error) {
    console.log('❌ Test 3 FAILED:', error.message, '\n');
    failed++;
  }

  // Test 4: Fetch with Request object (with options)
  console.log('Test 4: Fetch with Request object (with options)');
  try {
    const req = new Request('https://httpbin.org/post', {
      method: 'POST',
      headers: {
        'X-Custom-Header': 'test-value',
      },
      body: 'test body',
    });
    const response = await fetch(req);
    if (response.status === 200) {
      console.log('✅ Test 4 PASSED\n');
      passed++;
    } else {
      console.log('❌ Test 4 FAILED: Wrong status code\n');
      failed++;
    }
  } catch (error) {
    console.log('❌ Test 4 FAILED:', error.message, '\n');
    failed++;
  }

  // Test 5: Fetch with Request object and override init
  console.log('Test 5: Fetch with Request object and override init');
  try {
    const req = new Request('https://httpbin.org/get', {
      method: 'GET',
    });
    const response = await fetch(req, {
      headers: {
        'X-Override-Header': 'override-value',
      },
    });
    if (response.status === 200) {
      console.log('✅ Test 5 PASSED\n');
      passed++;
    } else {
      console.log('❌ Test 5 FAILED: Wrong status code\n');
      failed++;
    }
  } catch (error) {
    console.log('❌ Test 5 FAILED:', error.message, '\n');
    failed++;
  }

  // Summary
  console.log('\n=== Test Summary ===');
  console.log(`Total: ${passed + failed}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);

  if (failed === 0) {
    console.log('\n🎉 All tests passed!');
  } else {
    console.log(`\n❌ ${failed} test(s) failed`);
  }
}

runTests();
