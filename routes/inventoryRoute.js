const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const checkLogin = require('../utilities/checkLogin');
const checkAccountType = require('../utilities/checkAccountType');

// ✅ Protected inventory management routes
router.get('/', checkLogin, checkAccountType, inventoryController.buildManagementView);
router.get('/add-classification', checkLogin, checkAccountType, inventoryController.buildAddClassification);
router.post('/add-classification', checkLogin, checkAccountType, inventoryController.addClassification);
router.get('/add-vehicle', checkLogin, checkAccountType, inventoryController.buildAddVehicle);
router.post('/add-vehicle', checkLogin, checkAccountType, inventoryController.addVehicle);

// ✅ Public inventory views
router.get('/detail/:inventory_id', inventoryController.buildByInventoryId);
router.get('/type/:classification_id', inventoryController.buildByClassificationId);

// ✅ Intentional error route for testing 500 error
router.get('/trigger-error', (req, res, next) => {
  next(new Error('Intentional error for testing'));
});

module.exports = router;