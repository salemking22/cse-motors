const inventoryModel = require('../models/inventory-model'); // your database/model functions

// Display all vehicles (Inventory List)
async function inventoryList(req, res, next) {
    try {
        const vehicles = await inventoryModel.getAllVehicles(); // adjust based on your model function
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
        const vehicle = await inventoryModel.getVehicleById(inv_id); // adjust based on your model
        if (!vehicle) {
            return res.status(404).render('errors/404', {
                title: 'Vehicle Not Found',
                message: 'No vehicle found with this ID.'
            });
        }
        res.render('inventory/detail', {
            title: `${vehicle.make} ${vehicle.model}`,
            vehicle
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { inventoryList, vehicleDetail };
