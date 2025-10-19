// Test plain fetch without Request object
console.log('=== Plain Fetch Test ===\n');

async function test() {
  try {
    console.log('Calling fetch with plain URL...');
    const response = await fetch('https://httpbin.org/get');
    console.log('✅ Fetch succeeded!');
    console.log('Response status:', response.status);
    console.log('Response.text type:', typeof response.text);

    const text = await response.text();
    console.log('✅ Response text received, length:', text.length);
  } catch (error) {
    console.log('❌ Error:', error);
  }
}

test();
