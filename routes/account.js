const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const checkLogin = require('../utilities/checkLogin'); // ✅ correct path

// ✅ Show login page
router.get('/login', accountController.buildLogin);

// ✅ Handle login form submission
router.post('/login', accountController.loginUser);

// ✅ Protected: Show account management page
router.get('/management', checkLogin, accountController.buildManagement);

// ✅ Protected: Show update form
router.get('/update/:accountId', checkLogin, accountController.buildUpdate);

// ✅ Protected: Handle account info update
router.post('/update-info', checkLogin, accountController.updateAccountInfo);

// ✅ Protected: Handle password change
router.post('/update-password', checkLogin, accountController.updatePassword);

// ✅ Logout route
router.get('/logout', accountController.logoutUser);

module.exports = router;