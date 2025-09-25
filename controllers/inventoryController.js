const inventoryModel = require('../models/inventory-model');

// Display all vehicles (Inventory List)
async function inventoryList(req, res, next) {
    try {
        const vehicles = await inventoryModel.getAllVehicles();

        // Normalize image paths for inventory list
        const normalizedVehicles = vehicles.map(vehicle => {
            let imageUrl = vehicle.inv_image;

            // Remove leading slash if present
            if (imageUrl && imageUrl.startsWith("/")) {
                imageUrl = imageUrl.substring(1);
            }

            // If no image, use placeholder
            if (!imageUrl) {
                imageUrl = "images/vehicles/default.jpg";
            }

            // Always prepend slash for correct URL
            vehicle.inv_image = "/" + imageUrl;

            return vehicle;
        });

        res.render('inventory/inventory-list', {
            title: 'Inventory',
            vehicles: normalizedVehicles
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

        // Normalize image path for single page
        let imageUrl = vehicle.inv_image;

        // Remove leading slash if present
        if (imageUrl && imageUrl.startsWith("/")) {
            imageUrl = imageUrl.substring(1);
        }

        // If no image, use placeholder
        if (!imageUrl) {
            imageUrl = "images/vehicles/default.jpg";
        }

        // Always prepend slash
        imageUrl = "/" + imageUrl;

        res.render('inventory/detail', {
            title: `${vehicle.inv_make} ${vehicle.inv_model}`,
            vehicle,
            imageUrl
        });

    } catch (err) {
        console.error(err); // log errors
        next(err);
    }
}

module.exports = { inventoryList, vehicleDetail };
