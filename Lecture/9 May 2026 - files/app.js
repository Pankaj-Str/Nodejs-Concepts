const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: './uploads/', // Directory to save uploaded files
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer with storage options
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000000000 }, // Optional: Set file size limit
}).single('file'); // 'file' should match the name attribute in your HTML form

// Serve HTML form for file upload
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle file upload
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      res.send('Error uploading file.');
    } else {
      if (req.file) {
        res.send('File uploaded!');
      } else {
        res.send('No file selected.');
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});