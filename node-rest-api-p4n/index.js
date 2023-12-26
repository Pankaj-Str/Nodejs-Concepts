// node-rest-api-p4n/index.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Update MongoDB connection options
mongoose.connect('mongodb://localhost:27017/rest-api-demo');

// Use routes
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
