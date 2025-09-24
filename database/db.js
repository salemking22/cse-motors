// database/db.js
const { Pool } = require('pg');

// PostgreSQL connection using Render cloud database
const pool = new Pool({
    connectionString: 'postgresql://cse_motors_db_finale2_user:t9dR7qkDdgcSAnvC2LKovQ0ehzg3Lgfb@dpg-d31s177diees7387k8cg-a.frankfurt-postgres.render.com/cse_motors_db_finale2',
    ssl: { rejectUnauthorized: false } // required for Render cloud PostgreSQL
});

// Optional: test the connection immediately
pool.connect((err, client, release) => {
    if (err) {
        console.error('PostgreSQL connection failed:', err.stack);
    } else {
        console.log('PostgreSQL connected successfully!');
    }
    release();
});

module.exports = pool;
