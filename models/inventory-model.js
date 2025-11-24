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

// ✅ Get all classifications (for dropdowns and nav)
async function getClassifications() {
  try {
    const sql = `
      SELECT classification_id, classification_name
      FROM classification
      ORDER BY classification_name;
    `;
    const result = await pool.query(sql);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

// ✅ Insert a new classification
async function addClassification(classification_name) {
  try {
    const sql = "INSERT INTO classification (classification_name) VALUES ($1)";
    const result = await pool.query(sql, [classification_name]);
    return result.rowCount; // returns 1 if successful
  } catch (error) {
    console.error("Error inserting classification:", error);
    return null;
  }
}

// ✅ Insert a new vehicle
async function addVehicle(vehicleData) {
  try {
    const sql = `
      INSERT INTO inventory (
        classification_id, inv_make, inv_model, inv_year, inv_description,
        inv_image, inv_thumbnail, inv_price, inv_miles, inv_color
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    `;
    const values = [
      vehicleData.classification_id,
      vehicleData.inv_make,
      vehicleData.inv_model,
      vehicleData.inv_year,
      vehicleData.inv_description,
      vehicleData.inv_image || "/images/no-image.png",
      vehicleData.inv_thumbnail || "/images/no-image-thumb.png",
      vehicleData.inv_price,
      vehicleData.inv_miles,
      vehicleData.inv_color,
    ];
    const result = await pool.query(sql, values);
    return result.rowCount; // returns 1 if successful
  } catch (error) {
    console.error("Error inserting vehicle:", error);
    return null;
  }
}

module.exports = {
  getVehicleById,
  getInventoryByClassificationId,
  getClassifications,
  addClassification,
  addVehicle
};