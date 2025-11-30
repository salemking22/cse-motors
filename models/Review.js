const db = require('../database');

// ✅ Create a new review
exports.create = async (vehicleId, userId, rating, comment) => {
  const query = `
    INSERT INTO reviews (vehicle_id, user_id, rating, comment)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [vehicleId, userId, rating, comment];
  const result = await db.query(query, values);
  return result.rows[0];
};

// ✅ Fetch reviews for a given vehicle
exports.findByVehicle = async (vehicleId) => {
  const query = `
    SELECT r.id AS review_id, r.vehicle_id, r.user_id, r.rating, r.comment, r.created_at,
           a.account_firstname || ' ' || a.account_lastname AS reviewer_name
    FROM reviews r
    JOIN account a ON r.user_id = a.account_id
    WHERE r.vehicle_id = $1
    ORDER BY r.created_at DESC;
  `;
  const result = await db.query(query, [vehicleId]);
  return result.rows;
};

// ✅ Fetch a single review by ID
exports.findById = async (reviewId) => {
  const query = `SELECT * FROM reviews WHERE id = $1`;
  const result = await db.query(query, [reviewId]);
  return result.rows[0];
};

// ✅ Update a review
exports.update = async (reviewId, rating, comment) => {
  const query = `
    UPDATE reviews
    SET rating = $1, comment = $2
    WHERE id = $3
    RETURNING *;
  `;
  const values = [rating, comment, reviewId];
  const result = await db.query(query, values);
  return result.rows[0];
};

// ✅ Delete a review
exports.delete = async (reviewId) => {
  const query = `DELETE FROM reviews WHERE id = $1`;
  const result = await db.query(query, [reviewId]);
  return result.rowCount > 0;
};