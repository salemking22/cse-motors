const invModel = require('../models/inventory-model');
const utilities = require('../utilities');

// ✅ Detail view by inventory ID
async function buildByInventoryId(req, res, next) {
  const inventoryId = parseInt(req.params.inventory_id, 10);
  if (!Number.isInteger(inventoryId) || inventoryId <= 0) {
    const error = new Error('Invalid inventory ID');
    error.status = 400;
    return next(error);
  }

  try {
    const vehicle = await invModel.getVehicleById(inventoryId);
    if (!vehicle) {
      const error = new Error('Vehicle not found');
      error.status = 404;
      throw error;
    }

    const html = utilities.buildVehicleDetailHTML(vehicle);
    res.render('inventory/detail', {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      html,
      showBackButton: true // ✅ Enables back button on detail view
    });
  } catch (error) {
    next(error);
  }
}

// ✅ Classification view by classification ID
async function buildByClassificationId(req, res, next) {
  try {
    const classificationId = parseInt(req.params.classification_id, 10);
    if (!Number.isInteger(classificationId) || classificationId <= 0) {
      const error = new Error('Invalid classification ID');
      error.status = 400;
      return next(error);
    }

    const data = await invModel.getInventoryByClassificationId(classificationId);
    if (!data || data.length === 0) {
      const error = new Error('No vehicles found for this classification');
      error.status = 404;
      throw error;
    }

    const grid = utilities.buildClassificationGrid(data);
    const nav = await utilities.getNav();
    res.render('inventory/classification', {
      title: "Vehicles",
      nav,
      grid,
      showBackButton: true // ✅ Enables back button on classification view
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  buildByInventoryId,
  buildByClassificationId
};