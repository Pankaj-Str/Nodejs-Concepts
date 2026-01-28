# Step-by-Step Tutorial: Reading HTML Files with Node.js


## Setting Up Your Environment

Before we begin, make sure you have Node.js installed on your system.

1. **Install Node.js**:
   - Go to [nodejs.org](https://nodejs.org/) and download the LTS version
   - Follow the installation instructions for your operating system

2. **Verify Installation**:
   Open your terminal or command prompt and run:
   ```bash
   node -v
   npm -v
   ```
   These commands should display the installed versions of Node.js and npm.

3. **Create Your Project Directory**:
   ```bash
   mkdir node-html-reader
   cd node-html-reader
   ```

4. **Initialize Your Project**:
   ```bash
   npm init -y
   ```
   This creates a package.json file with default settings.

## Creating a Sample HTML File

Let's create a simple HTML file to work with:

1. Create a file named `index.html` in your project directory:
   ```bash
   touch index.html
   ```
   
2. Open the file in your preferred text editor and add the following content:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Sample HTML Page</title>
   </head>
   <body>
       <header>
           <h1>Welcome to My Website</h1>
           <nav>
               <ul>
                   <li><a href="/">Home</a></li>
                   <li><a href="/about">About</a></li>
                   <li><a href="/contact">Contact</a></li>
               </ul>
           </nav>
       </header>
       
       <main>
           <h2>About This Page</h2>
           <p>This is a sample HTML page for our Node.js tutorial.</p>
           <p>We will learn how to read and process this file using Node.js.</p>
           
           <div class="features">
               <h3>Key Features</h3>
               <ul>
                   <li>Easy to understand</li>
                   <li>Beginner friendly</li>
                   <li>Practical examples</li>
               </ul>
           </div>
       </main>
       
       <footer>
           <p>&copy; 2025 Your Name</p>
       </footer>
   </body>
   </html>
   ```



## Serving HTML Files via HTTP

Now let's create a simple web server that serves our HTML file:

1. Create a file named `server.js`:
   ```bash
   touch server.js
   ```

2. Add the following code:
   ```javascript
   const http = require('http');
   const fs = require('fs');
   const path = require('path');

   const server = http.createServer((req, res) => {
       // Respond only to the root URL or /index.html
       if (req.url === '/' || req.url === '/index.html') {
           fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, content) => {
               if (err) {
                   res.writeHead(500);
                   res.end(`Error loading HTML file: ${err.message}`);
                   return;
               }
               
               res.writeHead(200, { 'Content-Type': 'text/html' });
               res.end(content);
           });
       } else {
           res.writeHead(404);
           res.end('Page not found');
       }
   });

   const PORT = process.env.PORT || 3000;
   server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
   ```

3. Run the server:
   ```bash
   node server.js
   ```

4. Open your browser and navigate to `http://localhost:3000` to see your HTML page.


1. Install Cheerio:
   ```bash
   npm install cheerio
   ```





