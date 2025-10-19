// Simple test to verify Request works with fetch
console.log('=== Simple Request Test ===\n');

async function test() {
  try {
    console.log('Creating Request object...');
    const request = new Request('https://httpbin.org/get');
    console.log('Request created:', typeof request);
    console.log('Request URL:', request.url);
    console.log('Request method:', request.method);

    console.log('\nCalling fetch with Request...');
    console.log('typeof fetch:', typeof fetch);

    const response = await fetch(request);
    console.log('✅ Fetch succeeded!');
    console.log('Response status:', response.status);
    console.log('Response type:', typeof response);
    console.log('Response.text type:', typeof response.text);
    console.log('Response keys:', Object.keys(response));
    console.log('Response.text value:', response.text);

    const text = await response.text();
    console.log('✅ Response text received, length:', text.length);

  } catch (error) {
    console.log('❌ Error:', error);
    console.log('Error message:', error.message);
    console.log('Error stack:', error.stack);
  }
}

test();
