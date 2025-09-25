const inventoryModel = require('../models/inventory-model');

// Display all vehicles (Inventory List)
async function inventoryList(req, res, next) {
    try {
        const vehicles = await inventoryModel.getAllVehicles();
        res.render('inventory/inventory-list', {
            title: 'Inventory',
            vehicles
        });
    } catch (err) {
        next(err);
    }
}

// Display single vehicle detail
async function vehicleDetail(req, res, next) {
    try {
        const inv_id = req.params.inv_id;
        const vehicle = await inventoryModel.getVehicleById(inv_id);

        if (!vehicle) {
            return res.status(404).render('errors/404', {
                title: 'Vehicle Not Found',
                message: 'No vehicle found with this ID.'
            });
        }

        // 👉 Pass the vehicle object directly
        res.render('inventory/detail', {
            title: `${vehicle.inv_make} ${vehicle.inv_model}`,
            vehicle
        });

    } catch (err) {
        console.error(err);
        next(err);
    }
}

module.exports = { inventoryList, vehicleDetail };
