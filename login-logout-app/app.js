const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
var fs=require('fs');

const app = express();
const port = 3000;

// Set up the session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Sample user data for demonstration purposes
const users = [
  {
    username: 'user1',
    password: '$2b$10$jToz2QR1f0q30oN8PIfDNOdj0vmXYy61/vBNK0YPJ7dsXn4aAnxxq' // Hashed password for 'password1'
  },
  // Add more users if needed
];

// Helper function to check if the entered password matches the hashed password
function verifyPassword(enteredPassword, hashedPassword) {
  return bcrypt.compareSync(enteredPassword, hashedPassword);
}

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Routes
app.get('/', isAuthenticated, (req, res) => {
  res.send('You are logged in!');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);

  if (user && verifyPassword(password, user.password)) {
    req.session.isAuthenticated = true;
    res.redirect('/');
  } else {
    res.send('Invalid username or password.');
  }
});

app.get('/logout', (req, res) => {
  req.session.isAuthenticated = false;
  res.redirect('/login');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
