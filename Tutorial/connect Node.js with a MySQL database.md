
# 🔌 How to Connect Node.js with MySQL: A Complete In-Depth Tutorial

Node.js is a powerful JavaScript runtime for building fast and scalable backend applications. MySQL, on the other hand, is a popular open-source relational database. Connecting these two technologies opens up countless opportunities to build robust and data-driven applications.

In this comprehensive guide, we’ll walk you through connecting Node.js with MySQL from scratch, using real-world code examples, error handling, and optimization tips.

---

## 📚 Table of Contents

1. Prerequisites
2. Why MySQL and Node.js?
3. Installing MySQL and Setting Up the Database
4. Creating a Node.js Project
5. Installing Required Packages
6. Connecting Node.js to MySQL
7. Performing CRUD Operations
8. Handling Authentication Errors (MySQL 8+ Fix)
9. Best Practices
10. Conclusion

---

## ✅ 1. Prerequisites

Before we dive into the code, ensure you have the following installed:

- **Node.js** (v12+ recommended): [Download here](https://nodejs.org/)
- **MySQL Server**: [Download here](https://dev.mysql.com/downloads/mysql/)
- **MySQL Workbench or CLI** (optional for database management)

---

## 💡 2. Why Use Node.js with MySQL?

- Node.js offers **non-blocking I/O** for better performance.
- MySQL is a **mature and reliable relational database**.
- Easy integration using packages like `mysql` or `mysql2`.
- Great stack for small to medium web apps, dashboards, admin panels, and more.

---

## 🛠️ 3. Installing MySQL and Creating a Database

### Step 1: Open your MySQL CLI or MySQL Workbench.

### Step 2: Create a new database and table:

```sql
CREATE DATABASE testdb;

USE testdb;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);
```

---

## 📦 4. Create a Node.js Project

Open your terminal and run the following:

```bash
mkdir node-mysql-demo
cd node-mysql-demo
npm init -y
```

This creates a new Node.js project with a default `package.json`.

---

## 📥 5. Installing Required Packages

For MySQL 8+, the `mysql2` package is recommended as it supports modern authentication protocols.

```bash
npm install mysql2
```

---

## 🔗 6. Connecting Node.js to MySQL

### Create a file named `db.js`:

```js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // Replace with your MySQL username
  password: '',        // Replace with your MySQL password
  database: 'testdb'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }
  console.log('Connected to MySQL database!');
});

module.exports = db;
```

This script sets up a reusable connection object you can import in other files.

---

## ✍️ 7. Performing CRUD Operations

### Create a file `app.js`:

```js
const db = require('./db');

// Create a new user
const newUser = { name: 'John Doe', email: 'john@example.com' };

db.query('INSERT INTO users SET ?', newUser, (err, result) => {
  if (err) throw err;
  console.log('User inserted with ID:', result.insertId);

  // Fetch all users
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    console.log('All Users:', results);
  });
});
```

This script demonstrates both inserting and fetching data.

---

## 🧱 8. Fixing Common MySQL Authentication Error

When using MySQL 8+, you might see this error:

```
ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server
```

### 🔧 Solution: Change the authentication plugin

Log in to MySQL and run:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
```

Alternatively, create a new user with native authentication:

```sql
CREATE USER 'nodeuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
GRANT ALL PRIVILEGES ON testdb.* TO 'nodeuser'@'localhost';
```

Update your `db.js` with the new credentials.

---

## 🧠 9. Best Practices

Here are a few things to keep in mind for production apps:

- Use `.env` files for credentials using `dotenv` package.
- Handle connection pooling using `mysql2.createPool()`.
- Always validate user input to avoid SQL injection.
- Use async/await or Promises for better control flow.
- Consider using ORM tools like Sequelize for complex apps.

---

## 🎉 10. Conclusion

Connecting Node.js with MySQL opens doors to full-stack web development with a solid backend. You’ve now learned:

- How to set up a Node.js + MySQL project
- Insert and fetch data from a MySQL table
- Resolve MySQL authentication issues
- Apply best practices for building scalable apps

---

