console.log("Test 1: Simple fetch");

const url = "http://localhost:3101/json";

fetch(url)
  .then((response) => {
    console.log("Got response:", response.status);
    console.log("Response type:", typeof response);
    console.log("Has text method:", typeof response.text);
    return response.text();
  })
  .then((text) => {
    console.log("Got text:", text);
  })
  .catch((error) => {
    console.log("Error:", error);
  });
