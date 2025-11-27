// database.js
const { Pool } = require('pg');
require('dotenv').config();

// Create a new Pool instance
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // ✅ required for Render/Postgres cloud
  }
});

// Export the raw pool so models can use pool.query(...)
module.exports = pool;