// app.js
const express = require('express');
const path = require('path');
const session = require('express-session');       // ✅ Session support
const flash = require('connect-flash');           // ✅ Flash messaging
const cookieParser = require('cookie-parser');    // ✅ Cookie parsing
const checkLogin = require('./utilities/checkLogin'); // ✅ Custom middleware
const jwt = require('jsonwebtoken');              // ✅ For test login route
require('dotenv').config();                       // ✅ Load .env variables

const app = express();
const PORT = 5500;

// ✅ Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// ✅ Session configuration
app.use(session({
  secret: process.env.JWT_SECRET || 'fallbackSecret', // use env secret
  resave: false,
  saveUninitialized: true,
}));

// ✅ Flash messaging middleware
app.use(flash());

// ✅ Cookie parser middleware
app.use(cookieParser());

// ✅ Apply login check middleware globally
app.use(checkLogin);

// ✅ Route imports (fixed names to match your files)
const inventoryRoute = require("./routes/inventoryRoute");     // ✅ matches your file
const accountRoute = require("./routes/account");         // ✅ matches your file

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Activate routes
app.use("/inv", inventoryRoute);
app.use("/account", accountRoute);

// ✅ Home route
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Welcome to CSE Motors',
    showBackButton: false
  });
});

// ✅ Temporary test login route (for testing JWT + header)
app.get('/test-login', (req, res) => {
  const fakeUser = { account_id: 1, first_name: "Cynthia", account_type: "Client" };
  const token = jwt.sign(fakeUser, process.env.JWT_SECRET || 'fallbackSecret', { expiresIn: '1h' });
  res.cookie('jwt', token, { httpOnly: true });
  res.redirect('/account/management'); // go straight to management page
});

// ✅ Logout route
app.get('/account/logout', (req, res) => {
  res.clearCookie('jwt');
  req.flash('notice', 'You have been logged out.');
  res.redirect('/');
});

// ✅ Intentional 500 error route (for footer link)
app.get('/trigger-error', (req, res) => {
  throw new Error("Intentional server error for testing");
});

// ✅ 404 Not Found handler
app.use((req, res, next) => {
  const error = new Error("Page not found");
  error.status = 404;
  next(error);
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500);
  res.render("error", {
    title: "Error",
    message: err.message,
    status: err.status || 500,
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});