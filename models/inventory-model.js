// models/inventory-model.js
const pool = require('../database'); // your configured pg Pool

// ✅ Get a single vehicle by its ID
async function getVehicleById(inventory_id) {
  try {
    const sql = `
      SELECT inventory_id, inv_make, inv_model, inv_year, inv_price, inv_miles,
             inv_description, inv_image, inv_thumbnail, inv_color, classification_id
      FROM inventory
      WHERE inventory_id = $1;
    `;
    const values = [inventory_id];
    const result = await pool.query(sql, values);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

// ✅ Get all vehicles by classification ID
async function getInventoryByClassificationId(classification_id) {
  try {
    const sql = `
      SELECT inventory_id, inv_make, inv_model, inv_year, inv_price, inv_image
      FROM inventory
      WHERE classification_id = $1
      ORDER BY inv_make, inv_model;
    `;
    const result = await pool.query(sql, [classification_id]);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getVehicleById,
  getInventoryByClassificationId,
};