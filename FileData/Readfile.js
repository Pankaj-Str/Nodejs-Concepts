const http = require('http');
const fs = require('fs');
const path  = require('path');

const filepath =path.join(__dirname,'p4n.txt');
const server = http.createServer((req,res)=> {
    // read file ...

    fs.readFile(filepath,'utf8',(err , data)=>{
        if(err){
            res.writeHead(500,{'Content-Type':'text/plain'});
            res.end('Error no file found');
        }else{
            res.writeHead(200,{'Content-Type':'text/plain'});
            res.end(data);
        }
    });
});

// start the server 
const port = 3000;
server.listen(port,()=>{
    console.log(`http://localhost:${port}`);
});
