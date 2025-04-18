# Read and process an HTML file in Node.js
To read and process an HTML file in Node.js, you can use the `fs` module to read the file and a library like `cheerio` to parse and interact with the HTML content. Here's a step-by-step example:

### 1. Install Required Package
Install `cheerio` to parse the HTML file.

```bash
npm install cheerio
```

### 2. Create and Read the HTML File
Assume you have an HTML file named `sample.html`:

**`sample.html`**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sample HTML</title>
</head>
<body>
    <h1>Welcome to Node.js</h1>
    <p>This is a sample HTML file.</p>
</body>
</html>
```

### 3. Read and Parse the HTML in Node.js

**`app.js`**
```javascript
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Define the path to the HTML file
const filePath = path.join(__dirname, 'index.html');

// Read the HTML file
fs.readFile(filePath, 'utf8', (err, html) => {
    if (err) {
        console.error('Error reading file:', err.message);
        return;
    }

    try {
        // Parse the HTML content
        const $ = cheerio.load(html);

        // Extract and log content
        const title = $('title').text() || 'No title found';
        const heading = $('h1').text() || 'No heading found';
        const paragraph = $('p').text() || 'No paragraph found';

        console.log('Title:', title);
        console.log('Heading:', heading);
        console.log('Paragraph:', paragraph);
    } catch (parseError) {
        console.error('Error parsing HTML:', parseError.message);
    }
});
```

### 4. Run the Script
Run the script using Node.js:

```bash
node app.js
```

### Output
```
Title: Sample HTML
Heading: Welcome to Node.js
Paragraph: This is a sample HTML file.
```

### Explanation
1. **`fs.readFile`**: Reads the HTML file as a string.
2. **`cheerio.load`**: Loads the HTML into Cheerio, which provides jQuery-like selectors for parsing and querying.
3. **Selectors (`$('selector')`)**: Extract elements from the HTML using CSS-like selectors. 

This method is flexible and works well for scraping or processing HTML content in Node.js.
