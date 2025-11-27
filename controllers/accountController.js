const pool = require('../database'); // use raw pool now
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Show login form
const buildLogin = (req, res) => {
  res.render('account/login', {
    title: 'Login',
    errors: null,
    notice: req.flash('notice')
  });
};

// Handle login form submission
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT account_id, account_firstname, account_lastname, account_email, account_password, account_type FROM account WHERE account_email=$1',
      [email]
    );
    const account = result.rows[0] || null;

    if (!account) {
      req.flash('notice', 'Email not found.');
      return res.redirect('/account/login');
    }

    const match = await bcrypt.compare(password, account.account_password);
    if (!match) {
      req.flash('notice', 'Incorrect password.');
      return res.redirect('/account/login');
    }

    // ✅ Create JWT
    const token = jwt.sign(
      {
        account_id: account.account_id,
        first_name: account.account_firstname,
        account_type: account.account_type
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // ✅ Set cookie with expiry
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 3600000 // 1 hour in ms
    });

    res.redirect('/account/management');
  } catch (err) {
    console.error('❌ Login failed:', err.message);
    req.flash('notice', 'Login failed. Please try again.');
    res.redirect('/account/login');
  }
};

// Show account management view
const buildManagement = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT account_id, account_firstname, account_lastname, account_email, account_type FROM account WHERE account_id = $1',
      [res.locals.account?.account_id]
    );
    const accountData = result.rows[0] || null;

    res.render('account/management', {
      title: 'Account Management',
      notice: req.flash('notice'),
      accountData
    });
  } catch (err) {
    console.error('❌ Failed to load management view:', err.message);
    req.flash('notice', 'Unable to load account management.');
    res.redirect('/account/login');
  }
};

// Show account update view
const buildUpdate = async (req, res) => {
  const accountId = req.params.accountId;
  try {
    const result = await pool.query(
      'SELECT account_id, account_firstname, account_lastname, account_email, account_type FROM account WHERE account_id = $1',
      [accountId]
    );
    const accountData = result.rows[0] || null;

    res.render('account/update', {
      title: 'Update Account Information',
      notice: req.flash('notice'),
      errors: null,
      accountData
    });
  } catch (err) {
    console.error('❌ Failed to load update view:', err.message);
    req.flash('notice', 'Unable to load update form.');
    res.redirect('/account/management');
  }
};

// ✅ Handle account info update
const updateAccountInfo = async (req, res) => {
  const { first_name, last_name, email, account_id } = req.body;

  try {
    await pool.query(
      'UPDATE account SET account_firstname=$1, account_lastname=$2, account_email=$3 WHERE account_id=$4',
      [first_name, last_name, email, account_id]
    );

    req.flash('notice', 'Account information updated successfully.');
    res.redirect('/account/management');
  } catch (err) {
    console.error('❌ Account info update failed:', err.message);
    req.flash('notice', 'Update failed. Please try again.');
    res.redirect(`/account/update/${account_id}`);
  }
};

// ✅ Handle password update
const updatePassword = async (req, res) => {
  const { password, account_id } = req.body;

  try {
    if (!password || password.trim() === '') {
      req.flash('notice', 'Password cannot be empty.');
      return res.redirect(`/account/update/${account_id}`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'UPDATE account SET account_password=$1 WHERE account_id=$2',
      [hashedPassword, account_id]
    );

    req.flash('notice', 'Password updated successfully.');
    res.redirect('/account/management');
  } catch (err) {
    console.error('❌ Password update failed:', err.message);
    req.flash('notice', 'Password update failed. Please try again.');
    res.redirect(`/account/update/${account_id}`);
  }
};

// ✅ Logout route
const logoutUser = (req, res) => {
  res.clearCookie('jwt'); // Clears the login token
  req.flash('notice', 'You have been logged out.');
  res.redirect('/account/login');
};

module.exports = {
  buildLogin,
  loginUser,
  buildManagement,
  buildUpdate,
  updateAccountInfo,
  updatePassword,
  logoutUser
};