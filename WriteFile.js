//Writing a File Asynchronously using nodejs
var fs =  require('fs');
var content= "www.codeswithpankaj.com";
fs.writeFile('p4n.txt', content , (err) => {
	if (err) 
		throw err;
	console.log('It\'s saved!');
});