# Node.js Login & Logout System with MySQL


### 1. Prerequisites
- Node.js installed (v16+ recommended)
- MySQL installed and running
- Basic knowledge of JavaScript, Express, and SQL
- A code editor (VS Code recommended)

---

### 2. Project Setup

Create a new folder and initialize the project:

```bash
mkdir node-login-mysql
cd node-login-mysql
npm init -y
```

Install required dependencies:

```bash
npm install express mysql2 bcryptjs express-session ejs dotenv
npm install --save-dev nodemon
```

**Update `package.json` scripts:**

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

---

### 3. Database Setup (MySQL)

Create a database and table:

```sql
CREATE DATABASE node_auth;
USE node_auth;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 4. Project Structure

```
node-login-mysql/
├── views/
│   ├── login.ejs
│   ├── register.ejs
│   └── dashboard.ejs
├── .env
├── server.js
└── package.json
```

---

### 5. Environment Variables (`.env`)

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=node_auth

SESSION_SECRET=your_super_secret_key_123
PORT=3000
```

---

### 6. Main Server File (`server.js`)

```js
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ MySQL Connected!');
});

// Routes
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Register Page
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.send('Email already exists!');
        }
        return res.send('Error registering user');
      }
      res.redirect('/login');
    });
  } catch (err) {
    res.send('Server error');
  }
});

// Login Page
app.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }
  res.render('login');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) throw err;
    
    if (results.length === 0) {
      return res.send('User not found!');
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      req.session.user = { id: user.id, name: user.name, email: user.email };
      res.redirect('/dashboard');
    } else {
      res.send('Incorrect password!');
    }
  });
});

// Dashboard (Protected Route)
app.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('dashboard', { user: req.session.user });
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send('Error logging out');
    }
    res.redirect('/login');
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
```

---

### 7. EJS Views

**`views/register.ejs`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Register</title>
</head>
<body>
  <h2>Register</h2>
  <form method="POST" action="/register">
    <input type="text" name="name" placeholder="Name" required><br><br>
    <input type="email" name="email" placeholder="Email" required><br><br>
    <input type="password" name="password" placeholder="Password" required><br><br>
    <button type="submit">Register</button>
  </form>
  <p>Already have account? <a href="/login">Login</a></p>
</body>
</html>
```

**`views/login.ejs`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Login</title>
</head>
<body>
  <h2>Login</h2>
  <form method="POST" action="/login">
    <input type="email" name="email" placeholder="Email" required><br><br>
    <input type="password" name="password" placeholder="Password" required><br><br>
    <button type="submit">Login</button>
  </form>
  <p>Don't have account? <a href="/register">Register</a></p>
</body>
</html>
```

**`views/dashboard.ejs`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Dashboard</title>
</head>
<body>
  <h2>Welcome, <%= user.name %>!</h2>
  <p>Email: <%= user.email %></p>
  <a href="/logout">Logout</a>
</body>
</html>
```

---

### 8. Run the Application

```bash
npm run dev
```

Visit: `http://localhost:3000`

---



