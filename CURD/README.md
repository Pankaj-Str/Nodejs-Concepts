# CRUD operations in mongodb

CRUD (Create, Read, Update, Delete) operations in MongoDB using Node.js involves interacting with the database using the MongoDB driver or an Object-Document Mapping (ODM) library like Mongoose. Here's a basic guide on how to perform CRUD operations in MongoDB using Node.js and Mongoose:

### Install Dependencies:

First, make sure you have Node.js and MongoDB installed. Then, install the required dependencies:

```bash
npm install mongoose
```

### Connect to MongoDB:

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

### Define a Schema:

A schema defines the structure of your data in MongoDB.

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});
const User = mongoose.model('User', userSchema);
```

### CRUD Operations:

1. **Create (Insert)**:

```javascript
const newUser = new User({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
});
newUser.save((err, user) => {
  if (err) {
    console.error(err);
  } else {
    console.log('User added:', user);
  }
});
```

2. **Read (Find)**:

```javascript
User.find({}, (err, users) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Users:', users);
  }
});
```

3. **Update**:

```javascript
User.updateOne(
  { _id: 'your-user-id' },
  { $set: { age: 31 } },
  (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Updated:', result);
    }
  }
);
```

4. **Delete**:

```javascript
User.deleteOne({ _id: 'your-user-id' }, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('User deleted');
  }
});
```

### Close the Connection:

```javascript
mongoose.connection.close();
```

Remember to replace `'mongodb://localhost/mydatabase'` with your MongoDB connection string and adjust the schema and field names according to your data structure.

This is a basic example. Mongoose provides a more powerful way to work with MongoDB by offering additional features like validation, middleware, and queries. Always refer to the official documentation for both MongoDB and Mongoose for more advanced use cases and best practices.


 # Here's a step-by-step example of how to create a basic Node.js application that performs CRUD operations using MongoDB and the Mongoose library:

 Certainly! Here's a step-by-step example of how to create a basic Node.js application that performs CRUD operations using MongoDB and the Mongoose library:

### Step 1: Set Up the Project

1. Create a new directory for your project and navigate into it:

```bash
mkdir node-mongodb-crud
cd node-mongodb-crud
```

2. Initialize a new Node.js project and install the required dependencies:

```bash
npm init -y
npm install express mongoose body-parser
```

### Step 2: Create the Server and Connect to MongoDB

Create a file named `app.js` in your project directory and add the following code:

```javascript
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### Step 3: Define a Model and Routes

Create a `models` directory in your project and add a file named `user.js` with the following code:

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

module.exports = mongoose.model('User', userSchema);
```

Now, create a `routes` directory and add a file named `users.js` with the following code:

```javascript
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a user by ID
router.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'age'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
```

### Step 4: Use the Routes

Update the `app.js` file to use the routes:

```javascript
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users'); // Import the user routes

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Use the user routes
app.use(userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### Step 5: Test the CRUD Operations

1. Start your MongoDB server: Run `mongod` in a separate terminal window.
2. Start your Node.js server: Run `node app.js` in your project directory.
3. Use tools like Postman or your browser to send HTTP requests to test the CRUD operations.

- Create a user: Send a POST request to `http://localhost:3000/users` with JSON data.
- Read all users: Send a GET request to `http://localhost:3000/users`.
- Read a user by ID: Send a GET request to `http://localhost:3000/users/:id`.
- Update a user by ID: Send a PATCH request to `http://localhost:3000/users/:id` with JSON data.
- Delete a user by ID: Send a DELETE request to `http://localhost:3000/users/:id`.

Remember to replace `:id` with the actual user ID when testing.

This example provides a basic implementation of CRUD operations using Express and MongoDB with Mongoose. Depending on your project's requirements, you can expand and customize these operations and add features like validation, authentication, and more.
