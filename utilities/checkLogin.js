// utilities/checkLogin.js
const jwt = require('jsonwebtoken');

function checkLogin(req, res, next) {
  const token = req.cookies.jwt;
  console.log("🔍 JWT token:", token); // log the raw token for debugging

  if (!token) {
    console.log("⚠️ No JWT token found.");
    res.locals.loggedIn = false;
    res.locals.account = null;
    res.locals.firstName = null; // fallback when not logged in
    return next(); // allow access to public routes
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ JWT decoded:", decoded); // log the payload

    // Inject account data into res.locals for views
    res.locals.loggedIn = true;
    res.locals.account = decoded;
    res.locals.firstName = decoded.first_name || "Guest"; // ✅ header will use this

    next();
  } catch (err) {
    console.error("❌ JWT verification failed:", err.message);

    // If expired, clear cookie and redirect to login
    if (err.name === 'TokenExpiredError') {
      res.clearCookie('jwt');
      req.flash('notice', 'Session expired. Please log in again.');
      return res.redirect('/account/login');
    }

    // Other JWT errors (invalid token, tampering, etc.)
    res.locals.loggedIn = false;
    res.locals.account = null;
    res.locals.firstName = null;
    req.flash('notice', 'Invalid session. Please log in again.');
    res.clearCookie('jwt');
    return res.redirect('/account/login');
  }
}

module.exports = checkLogin;