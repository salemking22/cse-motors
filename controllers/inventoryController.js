const { getVehicleById, getAllVehicles } = require('../models/inventory-model');

// Vehicle detail page
async function vehicleDetail(req, res, next) {
    const inv_id = req.params.inv_id;

    try {
        const vehicle = await getVehicleById(inv_id);
        if (!vehicle) {
            return res.status(404).render('errors/404', {
                title: 'Page Not Found',
                message: 'Vehicle not found.'
            });
        }

        res.render('inventory/vehicle-detail', {
            title: `${vehicle.inv_make} ${vehicle.inv_model}`,
            vehicle
        });
    } catch (error) {
        next(error);
    }
}

// Inventory list page
async function inventoryList(req, res, next) {
    try {
        const vehicles = await getAllVehicles();
        res.render('inventory/inventory-list', {
            title: 'Inventory',
            vehicles
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { vehicleDetail, inventoryList };
