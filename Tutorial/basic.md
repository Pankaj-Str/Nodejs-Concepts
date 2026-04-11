
# **Step 1: Install Node.js (One-time setup)**

1. Go to the official website: [https://nodejs.org](https://nodejs.org)
2. Download the **LTS** version (Recommended for beginners).
3. Run the installer (just click “Next” → “Next” → “Finish”).
4. Verify it’s installed:
   - Open **Command Prompt** (Windows) or **Terminal** (Mac/Linux)
   - Type these commands and press Enter:

```bash
node --version
npm --version
```

You should see version numbers (example: `v20.x.x` and `10.x.x`). If yes → you’re ready! 🎉

---

### **Step 2: Create Your Project Folder**

1. Open Command Prompt / Terminal
2. Create a new folder and go inside it:

```bash
mkdir my-first-node-server
cd my-first-node-server
```

---

### **Step 3: Initialize the Project**

Run this command:

```bash
npm init -y
```

This creates a `package.json` file (it’s like the ID card of your project).

---

### **Step 4: Install Express (The easiest way to build servers)**

Run this command:

```bash
npm install express
```

Now you have everything you need!

---

### **Step 5: Create the Server File**

Create a new file called **`server.js`** in your folder.

**Copy and paste this code into `server.js`:**

```js
// server.js
const express = require('express');

// Create the server
const app = express();

// Middleware to understand JSON data (very useful later)
app.use(express.json());

// === ROUTES (what your server can do) ===

// 1. Home route
app.get('/', (req, res) => {
  res.send('Hello World! 🎉 Your first Node.js server is working!');
});

// 2. About page
app.get('/about', (req, res) => {
  res.send('This is a simple Node.js server made for beginners!');
});

// 3. API example - return JSON
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'Rahul' },
    { id: 2, name: 'Priya' }
  ];
  res.json(users);
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
  console.log('Open your browser and visit that link!');
});
```

---

### **Step 6: Run Your Server**

In the terminal, run:

```bash
node server.js
```

You should see:
```
🚀 Server is running at http://localhost:3000
Open your browser and visit that link!
```

---

### **Step 7: Test It!**

Open your browser and go to these URLs:

- `http://localhost:3000` → You will see “Hello World!”
- `http://localhost:3000/about`
- `http://localhost:3000/api/users`

All working? Congratulations! You just built your first Node.js server! 🎊

---

### **Bonus: Make Development Easier (Recommended)**

Install **nodemon** so the server restarts automatically when you save changes:

```bash
npm install --save-dev nodemon
```

Then update your `package.json` (open it and change the `"scripts"` section):

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

Now run the server with:

```bash
npm run dev
```

---

### **Quick Summary of Files You Have Now**

```
my-first-node-server/
├── node_modules/          ← (auto created)
├── package.json
├── package-lock.json
└── server.js              ← Your main file
```

---

### **Next Steps (What you can learn after this)**

1. How to connect to a database (MongoDB)
2. How to handle POST requests (forms)
3. How to make a full REST API
4. How to deploy your server for free (Render.com or Railway.app)

