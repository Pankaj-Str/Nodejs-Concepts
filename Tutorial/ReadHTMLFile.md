# Read an HTML File Using Node.js

In this tutorial, we will learn **step-by-step how to read an HTML file using Node.js**.

We will use Node.js's built-in **`fs` (File System)** module.

---

## 1. Create a Project Folder

Create a folder:

```text
node-html-reader
```

Open this folder in **VS Code**.

Your project will look like:

```text
node-html-reader/
│
├── index.js
└── index.html
```

---

## 2. Create an HTML File

Create `index.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>

    <h1>Hello from HTML</h1>
    <p>This is my first HTML file.</p>

</body>
</html>
```

---

## 3. Create a Node.js File

Create another file:

```text
index.js
```

---

## 4. Import the `fs` Module

Node.js provides a built-in module called **File System (`fs`)**.

Write:

```javascript
const fs = require("fs");
```

You don't need to install `fs` using npm.

---

## 5. Read the HTML File

Now use `readFile()`:

```javascript
const fs = require("fs");

fs.readFile("index.html", "utf8", (err, data) => {

    if (err) {
        console.log("Error reading file:", err);
        return;
    }

    console.log(data);

});
```

### Understand the code

```javascript
fs.readFile("index.html", "utf8", (err, data) => {
```

Here:

- `fs.readFile()` → reads a file
- `"index.html"` → file we want to read
- `"utf8"` → tells Node.js to read the file as text
- `err` → contains an error if something goes wrong
- `data` → contains the HTML content

---

## 6. Run the Program

Open the terminal inside VS Code.

Run:

```bash
node index.js
```

You should see:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>

    <h1>Hello from HTML</h1>
    <p>This is my first HTML file.</p>

</body>
</html>
```

So Node.js has successfully **read the HTML file**.

---

# 7. Complete Beginner Example

Here is the complete code:

```javascript
const fs = require("fs");

fs.readFile("index.html", "utf8", (err, data) => {

    if (err) {
        console.log("Unable to read HTML file");
        return;
    }

    console.log("HTML File Content:");
    console.log(data);

});
```

---

# 8. What Happens Internally?

Think of it like this:

```text
index.js
   |
   |  fs.readFile()
   ↓
index.html
   |
   |  HTML content
   ↓
data
   |
   ↓
console.log(data)
```

For example:

```html
<h1>Hello World</h1>
```

gets stored inside:

```javascript
data
```

Then:

```javascript
console.log(data);
```

prints it.

---

# 9. Handle File Not Found Error

Suppose your file doesn't exist:

```javascript
fs.readFile("abc.html", "utf8", (err, data) => {

    if (err) {
        console.log("File not found!");
        return;
    }

    console.log(data);

});
```

Output:

```text
File not found!
```

---

# 10. Using `readFileSync()`

Node.js also provides a synchronous version:

```javascript
const fs = require("fs");

const data = fs.readFileSync("index.html", "utf8");

console.log(data);
```

The difference is:

### `readFile()`

```javascript
fs.readFile()
```

Asynchronous — Node.js doesn't wait for the file operation to finish.

### `readFileSync()`

```javascript
fs.readFileSync()
```

Synchronous — Node.js waits until the file is completely read.

For beginners, you can first understand `readFile()` and then learn `readFileSync()`.

---

# 11. Modern Node.js Version

You can also use promises with `fs/promises`:

```javascript
const fs = require("fs/promises");

async function readHTML() {

    try {

        const data = await fs.readFile("index.html", "utf8");

        console.log(data);

    } catch (error) {

        console.log("Error:", error);

    }

}

readHTML();
```

This approach is very useful when you start learning **`async/await`**.

---

# 12. Beginner Practice

Try changing your `index.html` to:

```html
<!DOCTYPE html>
<html>
<body>

    <h1>Codes With Pankaj</h1>

    <h2>Node.js Tutorial</h2>

    <p>Learning Node.js step by step.</p>

</body>
</html>
```

Then run:

```bash
node index.js
```

You should get the complete HTML code in the terminal.

### Next step

After learning **reading an HTML file**, the natural Node.js lesson is:

**Read HTML → Create HTTP Server → Send HTML to Browser**

For example, visiting:

```text
http://localhost:3000
```

and seeing your `index.html` page in the browser.

---- 


## Project: Node.js + HTML Home Page

### Step 1: Create Project Folder

Create a folder:

```text
node-home-page
```

Open it in VS Code.

Create this structure:

```text
node-home-page/
│
├── server.js
└── index.html
```

---

# Step 2: Create `index.html`

Create a file named:

```text
index.html
```

Add this complete code:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Codes With Pankaj</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: #f5f7fa;
            color: #222;
        }

        /* Navbar */
        nav {
            background-color: #111827;
            padding: 20px 60px;

            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            color: white;
            font-size: 24px;
            font-weight: bold;
        }

        nav ul {
            display: flex;
            list-style: none;
            gap: 30px;
        }

        nav ul li a {
            color: white;
            text-decoration: none;
            font-size: 16px;
        }

        nav ul li a:hover {
            color: #38bdf8;
        }

        /* Hero Section */
        .hero {
            min-height: 500px;

            display: flex;
            justify-content: center;
            align-items: center;

            text-align: center;

            padding: 50px 20px;

            background: linear-gradient(
                135deg,
                #0f172a,
                #1e3a8a
            );

            color: white;
        }

        .hero h1 {
            font-size: 55px;
            margin-bottom: 20px;
        }

        .hero p {
            font-size: 20px;
            margin-bottom: 30px;
        }

        .btn {
            display: inline-block;

            background-color: #38bdf8;
            color: #111827;

            padding: 14px 30px;

            border-radius: 6px;

            text-decoration: none;

            font-weight: bold;
        }

        .btn:hover {
            background-color: white;
        }

        /* Courses */
        .courses {
            padding: 60px 10%;
            text-align: center;
        }

        .courses h2 {
            font-size: 35px;
            margin-bottom: 40px;
        }

        .course-container {
            display: flex;
            justify-content: center;
            gap: 25px;

            flex-wrap: wrap;
        }

        .course-card {
            background-color: white;

            width: 300px;

            padding: 30px;

            border-radius: 10px;

            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);

            text-align: left;
        }

        .course-card h3 {
            margin-bottom: 15px;
            font-size: 22px;
        }

        .course-card p {
            line-height: 1.6;
            margin-bottom: 20px;
        }

        /* Footer */
        footer {
            background-color: #111827;
            color: white;

            text-align: center;

            padding: 25px;
        }

        /* Mobile */
        @media (max-width: 768px) {

            nav {
                padding: 20px;
                flex-direction: column;
                gap: 15px;
            }

            nav ul {
                gap: 15px;
            }

            .hero h1 {
                font-size: 38px;
            }

            .hero p {
                font-size: 17px;
            }
        }
    </style>
</head>

<body>

    <!-- Navigation -->
    <nav>

        <div class="logo">
            Codes With Pankaj
        </div>

        <ul>
            <li>
                <a href="/">Home</a>
            </li>

            <li>
                <a href="#courses">Courses</a>
            </li>

            <li>
                <a href="#about">About</a>
            </li>

            <li>
                <a href="#contact">Contact</a>
            </li>
        </ul>

    </nav>


    <!-- Hero Section -->
    <section class="hero">

        <div>

            <h1>
                Learn Coding With Pankaj
            </h1>

            <p>
                Learn Python, Java, Data Science,
                Machine Learning and AI.
            </p>

            <a href="#courses" class="btn">
                Explore Courses
            </a>

        </div>

    </section>


    <!-- Courses Section -->
    <section class="courses" id="courses">

        <h2>
            Our Courses
        </h2>

        <div class="course-container">

            <!-- Course 1 -->
            <div class="course-card">

                <h3>
                    Python Programming
                </h3>

                <p>
                    Learn Python from beginner
                    to advanced level with practical examples.
                </p>

                <a href="#" class="btn">
                    Learn More
                </a>

            </div>


            <!-- Course 2 -->
            <div class="course-card">

                <h3>
                    Machine Learning
                </h3>

                <p>
                    Learn Machine Learning algorithms,
                    projects and real-world applications.
                </p>

                <a href="#" class="btn">
                    Learn More
                </a>

            </div>


            <!-- Course 3 -->
            <div class="course-card">

                <h3>
                    Data Science
                </h3>

                <p>
                    Learn NumPy, Pandas, Matplotlib,
                    Machine Learning and Data Analysis.
                </p>

                <a href="#" class="btn">
                    Learn More
                </a>

            </div>

        </div>

    </section>


    <!-- About Section -->
    <section class="courses" id="about">

        <h2>
            About Us
        </h2>

        <p>
            Codes With Pankaj is focused on making
            programming and technology easy to understand
            through practical learning.
        </p>

    </section>


    <!-- Contact Section -->
    <section class="courses" id="contact">

        <h2>
            Contact Us
        </h2>

        <p>
            Start your programming journey today.
        </p>

    </section>


    <!-- Footer -->
    <footer>

        <p>
            © 2026 Codes With Pankaj.
            All Rights Reserved.
        </p>

    </footer>

</body>

</html>
```

---

# Step 3: Create Node.js Server

Now create:

```text
server.js
```

Add this code:

```javascript
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

    console.log("Request received:", req.url);

    fs.readFile("index.html", "utf8", (err, data) => {

        if (err) {

            res.writeHead(500, {
                "Content-Type": "text/plain"
            });

            res.end("Error reading HTML file");

            return;
        }

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(data);

    });

});


server.listen(3000, () => {

    console.log("Server is running...");

    console.log(
        "Open http://localhost:3000 in your browser"
    );

});
```

---

# Step 4: Understand the Code

The first line:

```javascript
const http = require("http");
```

loads Node.js's built-in **HTTP module**.

We use it to create a web server.

---

Next:

```javascript
const fs = require("fs");
```

loads the **File System module**.

We need this because we want Node.js to read:

```text
index.html
```

---

# Step 5: Create the Server

This code creates our server:

```javascript
const server = http.createServer((req, res) => {

});
```

There are two important objects:

```text
req
↓
Request from browser

res
↓
Response sent to browser
```

For example, when you open:

```text
http://localhost:3000
```

the browser sends a request to Node.js.

---

# Step 6: Read HTML File

Inside the server we have:

```javascript
fs.readFile("index.html", "utf8", (err, data) => {

});
```

Node.js reads:

```text
index.html
```

The HTML content is stored inside:

```javascript
data
```

---

# Step 7: Handle Error

We check:

```javascript
if (err) {

    res.writeHead(500, {
        "Content-Type": "text/plain"
    });

    res.end("Error reading HTML file");

    return;
}
```

If Node.js cannot find or read the HTML file, the browser will receive:

```text
Error reading HTML file
```

---

# Step 8: Send HTML to Browser

This is very important:

```javascript
res.writeHead(200, {
    "Content-Type": "text/html"
});
```

We tell the browser:

> The response contains HTML.

Then:

```javascript
res.end(data);
```

sends our HTML file to the browser.

The complete flow is:

```text
Browser
   |
   | GET /
   ↓
Node.js Server
   |
   | fs.readFile()
   ↓
index.html
   |
   | HTML content
   ↓
res.end(data)
   |
   ↓
Browser
   |
   ↓
Home Page
```

---

# Step 9: Start the Server

Open the VS Code terminal.

Make sure you are inside:

```text
node-home-page
```

Run:

```bash
node server.js
```

You should see:

```text
Server is running...
Open http://localhost:3000 in your browser
```

---

# Step 10: Open Browser

Open:

```text
http://localhost:3000
```

You will see your **Codes With Pankaj Home Page**.

---

# Complete Project

Your final folder should be:

```text
node-home-page/
│
├── server.js
│
└── index.html
```

### `server.js`

```javascript
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

    console.log("Request received:", req.url);

    fs.readFile("index.html", "utf8", (err, data) => {

        if (err) {

            res.writeHead(500, {
                "Content-Type": "text/plain"
            });

            res.end("Error reading HTML file");

            return;
        }

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(data);

    });

});

server.listen(3000, () => {

    console.log("Server is running...");
    console.log("Open http://localhost:3000");

});
```

### `index.html`

Use the complete HTML code from Step 2.

---

## What You Have Learned

```text
1. Create Node.js project
        ↓
2. Create HTML file
        ↓
3. Import fs module
        ↓
4. Import http module
        ↓
5. Create HTTP server
        ↓
6. Read index.html
        ↓
7. Send HTML to browser
        ↓
8. Open localhost:3000
```

This is the basic foundation for building a **Node.js website**.

The next useful step is to turn this into a proper website with **`Home`, `About`, `Courses`, and `Contact` separate HTML pages**, and then use Node.js routing to open each page.
