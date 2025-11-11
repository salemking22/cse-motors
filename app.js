const express = require('express');
const path = require('path');
const app = express();
const PORT = 5500;

// Load inventory routes
const inventoryRoute = require("./routes/inventoryRoute");

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Use inventory routes
app.use("/inv", inventoryRoute);

// Homepage route
app.get('/', (req, res) => {
  res.render('home'); // ✅ Updated to use your real homepage
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