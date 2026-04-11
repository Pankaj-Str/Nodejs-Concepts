// import modules
const m = require('./c_m01');
const fs = require('fs');

m.info()
console.log(m.add(5, 3));
console.log(m.subtract(5, 3));
console.log(m.multiply(5, 3));

// Write to a file
fs.writeFileSync('hello.txt', 'Hello from Node.js!');