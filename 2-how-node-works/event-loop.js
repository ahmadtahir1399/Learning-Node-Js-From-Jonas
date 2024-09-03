const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => console.log("timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));
fs.readFile("test-file.txt", () => {
  console.log("I/O finished");
  console.log("----------------------------------");
  setTimeout(() => console.log("timer 2 finished"), 3000);
  setTimeout(() => console.log("timer 3 finished"), 0);
  setImmediate(() => console.log("Immediate 2 finished"));

  process.nextTick(() => console.log("process.nextTick"));
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now() - start, "hi form crypto1")
  );
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now() - start, "hi form crypto2")
  );
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now() - start, "hi form crypto3")
  );
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now() - start, "hi form crypto4")
  );
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now() - start, "hi form crypto6")
  );
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now() - start, "hi form crypto5")
  );
  // crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
  //   console.log(Date.now() - start, "hi form crypto5")
  // );
});

console.log("hello from TLC");
