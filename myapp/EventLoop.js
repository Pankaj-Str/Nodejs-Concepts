const fs = require('fs');


// Function to simulate an asynchronous I/O operation (reading a file)

function readFileAsync(filename, callback) {

  fs.readFile(filename, 'utf8', (error, data) => {

    if (error) {

      callback(error);

    } else {

      callback(null, data);

    }

  });

}


// Timer 1

console.log('Timer 1: Started');

setTimeout(() => {

  console.log('Timer 1: Expired');

}, 1000);


// Timer 2

console.log('Timer 2: Started');

setTimeout(() => {

  console.log('Timer 2: Expired');

}, 1000);


// Asynchronous file read

const filename = 'p4n.txt';

console.log('File read: Started');

readFileAsync(filename, (error, content) => {

  if (error) {

    console.error(`File read: Error - ${error.message}`);

  } else {

    console.log(`File read: Content - ${content}`);

  }

});