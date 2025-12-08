const db = require('../database');

// ✅ Create a new review
exports.create = async (inventoryId, accountId, rating, comment) => {
  const query = `
    INSERT INTO reviews (inventory_id, account_id, review_rating, review_text)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [inventoryId, accountId, rating, comment];
  const result = await db.query(query, values);
  return result.rows[0];
};

// ✅ Fetch reviews for a given vehicle
exports.findByVehicle = async (inventoryId) => {
  const query = `
    SELECT r.review_id, r.inventory_id, r.account_id, r.review_rating, r.review_text, r.review_date,
           a.account_firstname || ' ' || a.account_lastname AS reviewer_name
    FROM reviews r
    JOIN account a ON r.account_id = a.account_id
    WHERE r.inventory_id = $1
    ORDER BY r.review_date DESC;
  `;
  const result = await db.query(query, [inventoryId]);
  return result.rows;
};

// ✅ Fetch a single review by ID
exports.findById = async (reviewId) => {
  const query = `SELECT * FROM reviews WHERE review_id = $1`;
  const result = await db.query(query, [reviewId]);
  return result.rows[0];
};

// ✅ Update a review
exports.update = async (reviewId, rating, comment) => {
  const query = `
    UPDATE reviews
    SET review_rating = $1, review_text = $2
    WHERE review_id = $3
    RETURNING *;
  `;
  const values = [rating, comment, reviewId];
  const result = await db.query(query, values);
  return result.rows[0];
};

// ✅ Delete a review
exports.delete = async (reviewId) => {
  const query = `DELETE FROM reviews WHERE review_id = $1`;
  const result = await db.query(query, [reviewId]);
  return result.rowCount > 0;
};