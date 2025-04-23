## how to **connect Node.js with a MySQL database** with a **complete example**. 
---

## 🔧 Prerequisites

- Node.js installed on your system.
- MySQL installed and running.
- A MySQL database created.

---

## ✅ Step 1: Create a New Node.js Project

Open your terminal and run:

```bash
mkdir node-mysql-demo
cd node-mysql-demo
npm init -y
```

This will create a `package.json` file.

---

## ✅ Step 2: Install MySQL Package

```bash
npm install mysql
```

---

## ✅ Step 3: Create a MySQL Database

Login to MySQL and run the following:

```sql
CREATE DATABASE testdb;

USE testdb;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);
```

You now have a `testdb` database with a `users` table.

---

## ✅ Step 4: Create the Connection Script

Create a file called `db.js`:

```js
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // replace with your MySQL username
  password: '',      // replace with your MySQL password
  database: 'testdb' // name of your database
});

// Connect
db.connect((err) => {
  if (err) {
    console.log('Database connection failed:', err.message);
    return;
  }
  console.log('Connected to MySQL database!');
});

module.exports = db;
```

---

## ✅ Step 5: Create Main App File

Create `app.js`:

```js
const db = require('./db');

// Insert a new user
const user = { name: 'John Doe', email: 'john@example.com' };

const sql = 'INSERT INTO users SET ?';

db.query(sql, user, (err, result) => {
  if (err) throw err;
  console.log('User inserted with ID:', result.insertId);
});
```

---

## ✅ Step 6: Run the Application

```bash
node app.js
```

You should see:

```
Connected to MySQL database!
User inserted with ID: 1
```

---

## ✅ Step 7: Query the Users Table (Optional)

Add this to the bottom of `app.js` to fetch all users:

```js
db.query('SELECT * FROM users', (err, results) => {
  if (err) throw err;
  console.log('Users:', results);
});
```

---

## ✅ Final Notes

- Always handle database credentials securely using `.env` in production.
- Consider using `mysql2` or `sequelize` for advanced features or promise support.

---

