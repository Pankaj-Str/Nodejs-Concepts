const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

/* -------------------- MIDDLEWARE -------------------- */

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
    session({
        secret: 'password123',
        resave: false,
        saveUninitialized: false
    })
);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

/* -------------------- ROUTES -------------------- */

// Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'user' && password === 'pass') {
        req.session.user = username;
        return res.redirect('/dashboard');
    }

    res.send('Invalid credentials. <a href="/">Try again</a>');
});

// Dashboard (Protected)
app.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }

    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

/* -------------------- SERVER -------------------- */

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
