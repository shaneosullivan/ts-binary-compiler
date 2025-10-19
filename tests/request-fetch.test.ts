// Test Request API integration with actual fetch calls
console.log('=== Request + Fetch Integration Test ===\n');

async function testRequestWithFetch() {
  // Test 1: Simple GET request using Request object
  console.log('Test 1: GET request using Request object');
  try {
    const request = new Request('https://httpbin.org/get');
    const response = await fetch(request);
    const data = await response.json();

    console.log('✅ GET request successful');
    console.log('   Status:', response.status);
    console.log('   URL from response:', data.url);
  } catch (error) {
    console.log('❌ GET request failed:', error);
  }

  // Test 2: POST request with JSON body using Request object
  console.log('\nTest 2: POST request with JSON body');
  try {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    const request = new Request('https://httpbin.org/post', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ message: 'Hello from Request!', test: true })
    });

    const response = await fetch(request);
    const data = await response.json();

    console.log('✅ POST request successful');
    console.log('   Status:', response.status);
    console.log('   Data received:', data.json);
  } catch (error) {
    console.log('❌ POST request failed:', error);
  }

  // Test 3: PUT request using Request object
  console.log('\nTest 3: PUT request using Request object');
  try {
    const request = new Request('https://httpbin.org/put', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Test-Header': 'test-value'
      },
      body: JSON.stringify({ updated: true })
    });

    const response = await fetch(request);
    const data = await response.json();

    console.log('✅ PUT request successful');
    console.log('   Status:', response.status);
    console.log('   Method:', data.json.updated);
  } catch (error) {
    console.log('❌ PUT request failed:', error);
  }

  // Test 4: Clone a Request and use it with fetch
  console.log('\nTest 4: Clone Request and use with fetch');
  try {
    const original = new Request('https://httpbin.org/get?test=original');
    const cloned = original.clone();

    const response = await fetch(cloned);
    const data = await response.json();

    console.log('✅ Cloned request successful');
    console.log('   Status:', response.status);
    console.log('   Args:', data.args);
  } catch (error) {
    console.log('❌ Cloned request failed:', error);
  }

  // Test 5: Create Request from another Request and modify
  console.log('\nTest 5: Derive Request from another and modify');
  try {
    const base = new Request('https://httpbin.org/get');
    const modified = new Request(base, {
      method: 'POST',
      headers: { 'X-Modified': 'true' }
    });

    // We're just testing the Request construction, not making the call
    // since httpbin.org/get doesn't accept POST
    console.log('✅ Derived and modified request created');
    console.log('   Base method:', base.method);
    console.log('   Modified method:', modified.method);
    console.log('   Base URL:', base.url);
    console.log('   Modified URL:', modified.url);
  } catch (error) {
    console.log('❌ Derive and modify failed:', error);
  }

  console.log('\n=== Request + Fetch Integration Tests Complete! ===');
}

testRequestWithFetch();
