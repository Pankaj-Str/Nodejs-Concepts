fs = require('fs');

data = "This is the data to be written to the file.";

fs.writeFile('output.txt', data, (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log('Data successfully written to output.txt');
    }
});

