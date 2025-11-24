const express = require('express');
const path = require('path');
const session = require('express-session'); // ✅ Add session support
const flash = require('connect-flash');     // ✅ Add flash messaging
const app = express();
const PORT = 5500;

// ✅ Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// ✅ Session configuration
app.use(session({
  secret: 'yourSecretKey', // replace with a secure secret
  resave: false,
  saveUninitialized: true,
}));

// ✅ Flash messaging middleware
app.use(flash());

// ✅ Corrected route import
const inventoryRoute = require("./routes/inventory");

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Activate inventory routes
app.use("/inv", inventoryRoute);

// Home route
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Welcome to CSE Motors',
    showBackButton: false
  });
});

// Intentional 500 error route (for footer link)
app.get('/trigger-error', (req, res) => {
  throw new Error("Intentional server error for testing");
});

// 404 Not Found handler
app.use((req, res, next) => {
  const error = new Error("Page not found");
  error.status = 404;
  next(error);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500);
  res.render("error", {
    title: "Error",
    message: err.message,
    status: err.status || 500,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});