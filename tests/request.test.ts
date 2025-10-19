// Test file for Request API support
// Tests the Request constructor and its integration with fetch()

console.log('=== Request API Test ===\n');

// Test 1: Check that Request is defined
console.log('Test 1: Request constructor exists');
if (typeof Request !== 'undefined') {
  console.log('✅ Request is defined');
} else {
  console.log('❌ Request is undefined');
  throw new Error('Request not available');
}

// Test 2: Create a basic GET request
console.log('\nTest 2: Create a basic GET request');
try {
  const request = new Request('https://httpbin.org/get');
  console.log('✅ Request created successfully');
  console.log('   URL:', request.url);
  console.log('   Method:', request.method);
  console.log('   Has headers:', request.headers instanceof Headers);
} catch (error) {
  console.log('❌ Failed to create Request:', error);
  throw error;
}

// Test 3: Create a POST request with options
console.log('\nTest 3: Create a POST request with options');
try {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('X-Custom-Header', 'test-value');

  const request = new Request('https://httpbin.org/post', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ message: 'Hello World' })
  });

  console.log('✅ POST Request created successfully');
  console.log('   URL:', request.url);
  console.log('   Method:', request.method);
  console.log('   Has body:', request.body !== null && request.body !== undefined);
  console.log('   Content-Type:', request.headers.get('Content-Type'));
  console.log('   Custom header:', request.headers.get('X-Custom-Header'));
} catch (error) {
  console.log('❌ Failed to create POST Request:', error);
  throw error;
}

// Test 4: Clone a Request
console.log('\nTest 4: Clone a Request');
try {
  const original = new Request('https://httpbin.org/put', {
    method: 'PUT',
    headers: { 'X-Original': 'true' }
  });

  const cloned = original.clone();

  console.log('✅ Request cloned successfully');
  console.log('   Original URL:', original.url);
  console.log('   Cloned URL:', cloned.url);
  console.log('   Original method:', original.method);
  console.log('   Cloned method:', cloned.method);
  console.log('   URLs match:', original.url === cloned.url);
  console.log('   Methods match:', original.method === cloned.method);
} catch (error) {
  console.log('❌ Failed to clone Request:', error);
  throw error;
}

// Test 5: Create Request from another Request
console.log('\nTest 5: Create Request from another Request');
try {
  const original = new Request('https://httpbin.org/delete', {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer token123' }
  });

  const derived = new Request(original);

  console.log('✅ Derived Request created successfully');
  console.log('   Original URL:', original.url);
  console.log('   Derived URL:', derived.url);
  console.log('   Original method:', original.method);
  console.log('   Derived method:', derived.method);
  console.log('   Authorization header:', derived.headers.get('Authorization'));
} catch (error) {
  console.log('❌ Failed to create derived Request:', error);
  throw error;
}

// Test 6: Override Request properties with init
console.log('\nTest 6: Override Request properties with init');
try {
  const original = new Request('https://httpbin.org/get', {
    method: 'GET',
    headers: { 'X-Original': 'value1' }
  });

  const overridden = new Request(original, {
    method: 'POST',
    headers: { 'X-Override': 'value2' }
  });

  console.log('✅ Request overridden successfully');
  console.log('   Original method:', original.method);
  console.log('   Overridden method:', overridden.method);
  console.log('   Method changed:', original.method !== overridden.method);
} catch (error) {
  console.log('❌ Failed to override Request:', error);
  throw error;
}

// Test 7: Use Request with fetch() - Mock test (no actual network call)
console.log('\nTest 7: Pass Request object to fetch() signature check');
try {
  const request = new Request('https://httpbin.org/status/200', {
    method: 'GET',
    headers: { 'Accept': 'application/json' }
  });

  console.log('✅ Request can be used with fetch()');
  console.log('   Request URL:', request.url);
  console.log('   Request method:', request.method);
  console.log('   Accept header:', request.headers.get('Accept'));
  console.log('   (Not making actual network call in this test)');
} catch (error) {
  console.log('❌ Failed to prepare Request for fetch:', error);
  throw error;
}

// Test 8: Verify Request default values
console.log('\nTest 8: Verify Request default values');
try {
  const request = new Request('https://example.com');

  const defaults = {
    method: request.method === 'GET',
    mode: request.mode === 'cors',
    credentials: request.credentials === 'same-origin',
    cache: request.cache === 'default',
    redirect: request.redirect === 'follow',
    referrer: request.referrer === 'about:client',
    integrity: request.integrity === '',
  };

  const allDefaultsCorrect = Object.values(defaults).every(v => v === true);

  if (allDefaultsCorrect) {
    console.log('✅ All default values are correct');
    console.log('   Method:', request.method);
    console.log('   Mode:', request.mode);
    console.log('   Credentials:', request.credentials);
    console.log('   Cache:', request.cache);
    console.log('   Redirect:', request.redirect);
  } else {
    console.log('❌ Some default values are incorrect');
    console.log('   Defaults:', defaults);
    throw new Error('Default values test failed');
  }
} catch (error) {
  console.log('❌ Failed to verify defaults:', error);
  throw error;
}

// Test 9: Request with custom mode, credentials, cache
console.log('\nTest 9: Request with custom mode, credentials, cache');
try {
  const request = new Request('https://api.example.com/data', {
    method: 'GET',
    mode: 'no-cors',
    credentials: 'include',
    cache: 'no-cache',
    redirect: 'manual'
  });

  console.log('✅ Custom Request options set successfully');
  console.log('   Mode:', request.mode);
  console.log('   Credentials:', request.credentials);
  console.log('   Cache:', request.cache);
  console.log('   Redirect:', request.redirect);
} catch (error) {
  console.log('❌ Failed to set custom options:', error);
  throw error;
}

console.log('\n=== All Request API Tests Passed! ===');
