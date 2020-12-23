// console.log(arguments);
// console.log(require("module").wrapper);


// modules.exports
const C = require("./test-module-1");
const calc1 = new C();
console.log(calc1.add(2, 5));

// exports
// const calc2 = require("./test-module-2");
const { add, multiply, divide} = require("./test-module-2");
console.log(multiply(2, 5));

// caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();

// caching example output

// Hello from the module 3
// Log this from beautiful text 😍
// Log this from beautiful text 😍 this and below came from cache
// Log this from beautiful text 😍