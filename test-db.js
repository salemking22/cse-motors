// test-db.js
const pool = require('./database/db');

async function testConnection() {
    try {
        const result = await pool.query('SELECT 1 + 1 AS result');
        console.log('DB connected! Test query result:', result.rows[0].result);
    } catch (err) {
        console.error('DB connection failed:', err); // log full error
    }
}

testConnection();
