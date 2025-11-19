const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Detail by inventory id (URL example: /inv/detail/23)
router.get('/detail/:inventory_id', inventoryController.buildByInventoryId);

// Classification view by classification id (URL example: /inv/type/2)
router.get('/type/:classification_id', inventoryController.buildByClassificationId);

// ✅ Intentional error route for testing 500 error
router.get('/trigger-error', (req, res, next) => {
  next(new Error('Intentional error for testing'));
});

module.exports = router;