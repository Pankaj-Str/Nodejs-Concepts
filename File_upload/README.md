# Create a file upload functionality using Node.js, 
you can use the Express.js framework along with a middleware like Multer for handling file uploads. Here's a basic example to get you started:

1. Install required packages:

```bash
npm install express multer
```

2. Create your Node.js application (e.g., `app.js`):

```javascript
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer with storage options
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Optional: Set file size limit
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
```

3. Create an HTML file (e.g., `index.html`) for your file upload form:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>File Upload</title>
</head>
<body>
  <h1>File Upload Example</h1>
  <form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="file">
    <input type="submit" value="Upload">
  </form>
</body>
</html>
```

4. Run your Node.js application:

```bash
node app.js
```

Visit `http://localhost:3000` in your browser and test the file upload functionality. Files will be stored in the `uploads` directory. Adjust paths and configurations based on your project requirements.