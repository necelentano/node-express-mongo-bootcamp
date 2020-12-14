const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("test-file.txt", () => {
    console.log("I/O finished");
    console.log("-----------"); // all stuff below this separator go to event loop

    setTimeout(() => console.log("Timer 2 finished"), 0);
    setTimeout(() => console.log("Timer 3 finished"), 6000);
    setImmediate(() => console.log("Immediate 2 finished"));

    process.nextTick(() => console.log("Process.nextTick"));

    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Pasword 1 encrypted");
    })
    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Pasword 2 encrypted");
    })
    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Pasword 3 encrypted");
    })
    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Pasword 4 encrypted");
    })
    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Pasword 5 encrypted");
    })
    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Pasword 6 encrypted");
    })

})

console.log("Hello from top-level code");

// OUTPUT 

// Hello from top-level code 
// Timer 1 finished 
// Immediate 1 finished 
// I/O finished 
// ----------- 
// Process.nextTick 
// Immediate 2 finished 
// Timer 2 finished
// 5516 'Pasword 4 encrypted' 
// 5570 'Pasword 2 encrypted' 
// 5642 'Pasword 3 encrypted' 
// 5727 'Pasword 1 encrypted' 
// Timer 3 finished 
// 9510 'Pasword 5 encrypted' 
// 9569 'Pasword 6 encrypted'