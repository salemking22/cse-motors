const invModel = require("../models/inventoryModel");
const utilities = require("../utilities");

async function buildDetailView(req, res, next) {
  try {
    const invId = parseInt(req.params.invId);
    const vehicleData = await invModel.getVehicleById(invId);

    if (!vehicleData) {
      return next(new Error("Vehicle not found"));
    }

    const html = utilities.buildVehicleDetailHTML(vehicleData);
    res.render("inventory/detail", {
      title: `${vehicleData.inv_make} ${vehicleData.inv_model}`,
      content: html,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { buildDetailView };