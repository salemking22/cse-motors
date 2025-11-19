const express = require('express');
const path = require('path');
const app = express();
const PORT = 5500;

// ✅ Corrected route import
const inventoryRoute = require("./routes/inventory");

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Activate inventory routes
app.use("/inv", inventoryRoute);

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