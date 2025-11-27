// testConnection.js
const db = require('./database');

(async () => {
  try {
    const result = await db.any('SELECT NOW()'); // simple query
    console.log('✅ Connected to DB, current time:', result[0].now);
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  }
})();