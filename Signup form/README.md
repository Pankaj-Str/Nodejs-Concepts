# Example of a signup form built with HTML5 and styled with CSS3. 
### For the backend, we'll use Express.js to handle form submissions, and we'll use MongoDB to store user information.

### Step 1: Set Up the Project

1. Create a new directory for your project and navigate into it:

```bash
mkdir signup-form
cd signup-form
```

2. Initialize a new Node.js project and install the required dependencies:

```bash
npm init -y
npm install express mongoose body-parser ejs
```

### Step 2: Create the HTML Form

Create a file named `index.html` in your project directory and add the following code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="styles.css">
  <title>Signup Form</title>
</head>
<body>
  <div class="container">
    <h1>Signup Form</h1>
    <form action="/signup" method="POST">
      <input type="text" name="username" placeholder="Username" required>
      <input type="email" name="email" placeholder="Email" required>
      <input type="password" name="password" placeholder="Password" required>
      <button type="submit">Sign Up</button>
    </form>
  </div>
</body>
</html>
```

### Step 3: Create the CSS Styles

Create a file named `styles.css` in your project directory and add the following CSS to style the form:

```css
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f4;
}

.container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
```

### Step 4: Create the Express Backend

Create a file named `app.js` in your project directory and add the following code:

```javascript
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Set up MongoDB connection
mongoose.connect('mongodb://localhost/signup-form', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Define the user schema and model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle signup form submissions
app.post('/signup', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.redirect('/');
  } catch (error) {
    res.status(400).send(error);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### Step 5: Run the Application

1. Start your MongoDB server: Run `mongod` in a separate terminal window.
2. Start your Node.js server: Run `node app.js` in your project directory.
3. Open your web browser and navigate to `http://localhost:3000` to access the signup form.

Users who submit the form will have their information saved to the MongoDB database. You can extend this example by adding validation, error handling, user authentication, and more features as needed.

Please note that this is a simplified example for educational purposes. In a real-world scenario, you would need to implement proper validation, security measures, and error handling to ensure a secure and reliable application.
