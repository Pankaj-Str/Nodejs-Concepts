
var fs = require("_fs");

var data = fs.readFileSync('p4n.txt');


console.log(data.toString());

console.log("Program Ended");