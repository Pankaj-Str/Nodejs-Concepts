const http = require('http');
const m = require('./c_m01');

// Create a server
const server = http.createServer((req, res) => {
    res.statusCode = 200;  // OK status
    res.setHeader('Content-Type', 'text/plain');
    //res.end('Hello, World! This is my first Node.js server.');
    let result = m.add(5, 3);
    res.end(result.toString());
});

// Listen on port 3000
server.listen(3000, '127.0.0.1', () => {
    console.log('Server running at http://127.0.0.1:3000/');
});


//https://github.com/Pankaj-Str/NodeJS-tutorial-codeswithpankaj/blob/main/Modules%20Package%20Manager%20and%20Creating%20a%20Web%20Server.md