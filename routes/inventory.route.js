const express = require('express');
const router = express.Router();
const { vehicleDetail, inventoryList } = require('../controllers/inventoryController');

// Route to intentionally trigger 500 server error
router.get('/trigger-error', (req, res, next) => {
    try {
        throw new Error('Intentional 500 Error');
    } catch (err) {
        next(err);
    }
});

// Route to display all vehicles (inventory list)
router.get('/', inventoryList);       // handles /inventory
router.get('/:inv_id', vehicleDetail); // handles /inventory/22, etc.

module.exports = router;
