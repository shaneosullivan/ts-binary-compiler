console.log("\u{1F9EA} Starting Comprehensive Fetch API Test Suite");
console.log(`===============================================
`);
var c = "http://localhost:3000",
  r = [];
function a(e) {
  r.push(e);
  let s = e.success ? "\u2705" : "\u274C";
  console.log(`${s} ${e.name}: ${e.message}`),
    e.details && console.log("   Details:", JSON.stringify(e.details, null, 2));
}
function l() {
  console.log(`
\u{1F4CA} Test Summary:`),
    console.log("================");
  let e = r.filter((o) => o.success).length,
    s = r.length;
  console.log(`Passed: ${e}/${s} (${Math.round((e / s) * 100)}%)`);
  let t = r.filter((o) => !o.success);
  t.length > 0 &&
    (console.log(`
\u274C Failed Tests:`),
    t.forEach((o) => console.log(`   - ${o.name}: ${o.message}`)));
}
function n(e) {
  try {
    return JSON.parse(e);
  } catch {
    return { success: !1, message: "Invalid JSON response" };
  }
}
console.log("\u{1F50D} Test 1: Basic GET Request");
try {
  let e = fetch(`${c}/test`),
    s = e.status === 200 && e.ok,
    t = e.text(),
    o = n(t);
  a({
    name: "Basic GET",
    success: s && o.success,
    message: s ? "GET request successful" : `Failed with status ${e.status}`,
    details: { status: e.status, method: o.method },
  });
} catch (e) {
  a({ name: "Basic GET", success: !1, message: `Error: ${e.message}` });
}
console.log(`
\u{1F50D} Test 2: GET with Query Parameters`);
try {
  let e = fetch(`${c}/test/query?param1=value1&param2=value2&test=true`),
    s = n(e.text());
  a({
    name: "GET with Query Params",
    success: e.ok && s.success,
    message: s.message,
    details: s.query,
  });
} catch (e) {
  a({
    name: "GET with Query Params",
    success: !1,
    message: `Error: ${e.message}`,
  });
}
console.log(`
\u{1F50D} Test 3: POST with JSON Body`);
try {
  let e = { name: "John Doe", age: 30, email: "john@example.com", active: !0 },
    s = fetch(`${c}/test/json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "QuickJS-Test-Suite/1.0",
      },
      body: JSON.stringify(e),
    }),
    t = n(s.text());
  a({
    name: "POST JSON",
    success: s.ok && t.success,
    message: t.message,
    details: { sentData: e, receivedBody: t.body },
  });
} catch (e) {
  a({ name: "POST JSON", success: !1, message: `Error: ${e.message}` });
}
console.log(`
\u{1F50D} Test 4: PUT Request`);
try {
  let e = { id: 123, name: "Updated Resource", version: 2 },
    s = fetch(`${c}/test`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer test-token-123",
      },
      body: JSON.stringify(e),
    }),
    t = n(s.text());
  a({
    name: "PUT Request",
    success: s.ok && t.success,
    message: t.message,
    details: { method: t.method, hasAuth: !!t.headers.authorization },
  });
} catch (e) {
  a({ name: "PUT Request", success: !1, message: `Error: ${e.message}` });
}
console.log(`
\u{1F50D} Test 5: DELETE Request`);
try {
  let e = fetch(`${c}/test`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer delete-token-456",
        "User-Agent": "QuickJS-Delete-Test",
      },
    }),
    s = n(e.text());
  a({
    name: "DELETE Request",
    success: e.ok && s.success,
    message: s.message,
    details: { method: s.method },
  });
} catch (e) {
  a({ name: "DELETE Request", success: !1, message: `Error: ${e.message}` });
}
console.log(`
\u{1F50D} Test 6: PATCH Request`);
try {
  let e = { status: "active", lastModified: new Date().toISOString() },
    s = fetch(`${c}/test`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-Request-ID": "patch-test-789",
      },
      body: JSON.stringify(e),
    }),
    t = n(s.text());
  a({
    name: "PATCH Request",
    success: s.ok && t.success,
    message: t.message,
    details: { method: t.method, requestId: t.headers["x-request-id"] },
  });
} catch (e) {
  a({ name: "PATCH Request", success: !1, message: `Error: ${e.message}` });
}
console.log(`
\u{1F50D} Test 7: Custom Headers Validation`);
try {
  let e = fetch(`${c}/test/headers`, {
      headers: {
        "User-Agent": "QuickJS-Custom-Headers/1.0",
        "X-Custom-Header": "test-value-123",
        "X-API-Version": "v1",
        Accept: "application/json",
      },
    }),
    s = n(e.text());
  a({
    name: "Custom Headers",
    success: e.ok && s.success,
    message: s.message,
    details: s.data,
  });
} catch (e) {
  a({ name: "Custom Headers", success: !1, message: `Error: ${e.message}` });
}
console.log(`
\u{1F50D} Test 8: Response Status Codes`);
var u = [200, 201, 204, 400, 401, 404, 500];
for (let e of u)
  try {
    let s = fetch(`${c}/test/status/${e}`),
      t = n(s.text()),
      o = e >= 200 && e < 300;
    a({
      name: `Status ${e}`,
      success: s.status === e && t.success === o,
      message: `Returned status ${s.status}, expected ${e}`,
      details: { statusText: s.statusText, ok: s.ok },
    });
  } catch (s) {
    a({ name: `Status ${e}`, success: !1, message: `Error: ${s.message}` });
  }
console.log(`
\u{1F50D} Test 9: OPTIONS Request`);
try {
  let e = fetch(`${c}/test`, { method: "OPTIONS" }),
    s = n(e.text());
  a({
    name: "OPTIONS Request",
    success: e.ok && s.success,
    message: s.message,
    details: {
      allowHeader: e.headers.allow,
      corsHeaders: e.headers["access-control-allow-methods"],
    },
  });
} catch (e) {
  a({ name: "OPTIONS Request", success: !1, message: `Error: ${e.message}` });
}
console.log(`
\u{1F50D} Test 10: Comprehensive Validation`);
try {
  let e = {
      user: { id: 42, name: "Test User" },
      metadata: { version: "1.2.3", timestamp: Date.now() },
      settings: { notifications: !0, theme: "dark" },
      array: [1, 2, 3, "test", { nested: !0 }],
    },
    s = fetch(`${c}/test/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "QuickJS-Comprehensive-Test/1.0",
        Authorization: "Bearer comprehensive-test-token",
        "X-Test-Suite": "comprehensive",
        Accept: "application/json",
      },
      body: JSON.stringify(e),
    }),
    t = n(s.text());
  a({
    name: "Comprehensive Validation",
    success: s.ok && t.data.passedRequired,
    message: `${t.message} (Score: ${t.data.score}/${t.data.total})`,
    details: t.data.validations,
  });
} catch (e) {
  a({
    name: "Comprehensive Validation",
    success: !1,
    message: `Error: ${e.message}`,
  });
}
console.log(`
\u{1F50D} Test 11: Multiple Headers Test`);
try {
  let e = fetch(`${c}/test`, {
      method: "GET",
      headers: {
        "User-Agent": "QuickJS-Multi-Header-Test/1.0",
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        "X-Requested-With": "XMLHttpRequest",
        "X-API-Key": "test-api-key-123456789",
        "X-Client-Version": "1.0.0",
        "X-Platform": "QuickJS",
        "Custom-Header-1": "value1",
        "Custom-Header-2": "value2",
        "Custom-Header-3": "value3",
      },
    }),
    s = n(e.text()),
    t = Object.keys(s.headers).length;
  a({
    name: "Multiple Headers",
    success: e.ok && t >= 10,
    message: `Successfully sent ${t} headers`,
    details: {
      headerCount: t,
      hasCustomHeaders: !!s.headers["custom-header-1"],
    },
  });
} catch (e) {
  a({ name: "Multiple Headers", success: !1, message: `Error: ${e.message}` });
}
console.log(
  `
` + "=".repeat(50)
);
l();
console.log(`
\u{1F3AF} All fetch API tests completed!`);
