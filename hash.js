// hash.js
const bcrypt = require('bcrypt');

async function run() {
  const password1 = 'Password123!';
  const password2 = 'admin123';

  const hash1 = await bcrypt.hash(password1, 10);
  const hash2 = await bcrypt.hash(password2, 10);

  console.log(`Hash for ${password1}: ${hash1}`);
  console.log(`Hash for ${password2}: ${hash2}`);
}

run();