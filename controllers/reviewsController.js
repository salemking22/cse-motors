const Review = require('../models/Review');
const jwt = require('jsonwebtoken');

async function addReview(req, res, next) {
  try {
    // ✅ Prefer inventory_id from body, fallback to route param
    const vehicleId = parseInt(req.body.inventory_id || req.params.vehicleId, 10);
    const { rating, comment } = req.body;

    // ✅ Decode JWT from cookie to get userId
    let userId = null;
    if (req.cookies.jwt) {
      try {
        const decoded = jwt.verify(
          req.cookies.jwt,
          process.env.JWT_SECRET || 'fallbackSecret'
        );
        userId = decoded.account_id;
      } catch (err) {
        console.error("JWT decode error:", err);
        req.flash("notice", "Invalid login session. Please log in again.");
        return res.redirect(`/account/login`);
      }
    }

    // ✅ Basic validation
    if (!vehicleId || !userId || !rating || rating < 1 || rating > 5 || !comment.trim()) {
      req.flash("notice", "Please provide a valid rating (1–5) and comment.");
      return res.redirect(`/inv/detail/${vehicleId}`);
    }

    // ✅ Save review
    await Review.create(vehicleId, userId, rating, comment);

    // ✅ Success message
    req.flash("notice", "Review submitted successfully!");
    res.redirect(`/inv/detail/${vehicleId}`);
  } catch (error) {
    console.error("Review submission error:", error);
    req.flash("notice", "Failed to submit review. Please try again.");
    res.redirect(`/inv/detail/${req.body.inventory_id || req.params.vehicleId}`);
  }
}

module.exports = { addReview };