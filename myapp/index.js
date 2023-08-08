// index.js

const express = require('../node_modules/express');

const app = express();

const port = 3000;


app.get('/', (req, res) => {

  res.send('Hello, World!');

});


app.listen(port, () => {

  console.log(`Server is running on http://localhost:${port}`);

});