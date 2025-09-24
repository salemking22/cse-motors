const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // required for Render
});

pool.connect((err, client, release) => {
    if (err) {
        console.error('PostgreSQL connection failed:', err.stack);
    } else {
        console.log('PostgreSQL connected successfully!');
    }
    release();
});

module.exports = pool;
