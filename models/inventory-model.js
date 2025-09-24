const pool = require('../database/db'); // your PostgreSQL connection

// Get all vehicles
async function getAllVehicles() {
    try {
        const sql = `
            SELECT inv_id, inv_make, inv_model, inv_year, inv_price, inv_miles, inv_description, inv_image
            FROM inventory
            ORDER BY inv_id
        `;
        const result = await pool.query(sql);
        return result.rows;
    } catch (err) {
        throw new Error('Error fetching all vehicles: ' + err.message);
    }
}

// Get vehicle by ID
async function getVehicleById(inv_id) {
    try {
        const sql = 'SELECT * FROM inventory WHERE inv_id = $1';
        const result = await pool.query(sql, [inv_id]);
        return result.rows[0];
    } catch (err) {
        throw new Error('Error fetching vehicle: ' + err.message);
    }
}

module.exports = { getAllVehicles, getVehicleById };
