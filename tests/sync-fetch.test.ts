// Test fetch without async/await
console.log('=== Synchronous Fetch Test ===\n');

console.log('Test 1: Call fetch and log promise');
try {
  console.log('Calling fetch...');
  const promise = fetch('https://httpbin.org/get');
  console.log('fetch returned');
  console.log('typeof promise:', typeof promise);
  console.log('promise:', promise);
  console.log('typeof promise.then:', typeof promise.then);

  if (promise && typeof promise.then === 'function') {
    console.log('Calling promise.then...');
    promise.then(
      (response) => {
        console.log('✅ Promise resolved! Status:', response.status);
      },
      (error) => {
        console.log('❌ Promise rejected:', error.message);
      }
    );
    console.log('promise.then() called successfully');
  } else {
    console.log('❌ Promise is not thenable');
  }
} catch (error) {
  console.log('❌ Exception:', error.message);
  console.log('Stack:', error.stack);
}

console.log('\nEnd of synchronous code');
