const express = require('express');
const router = express.Router();
const { inventoryList, vehicleDetail } = require('../controllers/inventoryController');

router.get('/trigger-error', (req, res, next) => {
    try {
        throw new Error('Intentional 500 Error');
    } catch (err) {
        next(err);
    }
});

router.get('/', inventoryList);
router.get('/:inv_id', vehicleDetail);

module.exports = router;
