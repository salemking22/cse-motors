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

        // Encode the image filename so spaces and special characters work
        const imageUrl = `/images/vehicles/${encodeURIComponent(vehicle.inv_image)}`;

        // Pass the vehicle object and encoded image URL to EJS
        res.render('inventory/detail', {
            title: `${vehicle.inv_make} ${vehicle.inv_model}`,
            vehicle,
            imageUrl
        });

    } catch (err) {
        console.error(err); // Log for debugging on Render
        next(err); // Pass to 500 error handler
    }
}

module.exports = { inventoryList, vehicleDetail };
