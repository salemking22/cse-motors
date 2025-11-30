const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const checkLogin = require('./utilities/checkLogin');
const jwt = require('jsonwebtoken');
const methodOverride = require('method-override'); // still fine to keep
require('dotenv').config();

const app = express();
const PORT = 5500;

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.JWT_SECRET || 'fallbackSecret',
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());
app.use(cookieParser());
app.use(checkLogin);
app.use(methodOverride('_method')); // safe to leave, even if not used

// ✅ Route imports
const inventoryRoute = require("./routes/inventoryRoute");
const accountRoute = require("./routes/account");
const reviewsController = require("./controllers/reviewsController");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Activate routes
app.use("/inv", inventoryRoute);
app.use("/account", accountRoute);

// ✅ Review create route (only add reviews now)
app.post('/vehicles/:vehicleId/reviews', reviewsController.addReview);

// ✅ Home route
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Welcome to CSE Motors',
    showBackButton: false
  });
});

// ... rest unchanged (test-login, logout, error handlers)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});