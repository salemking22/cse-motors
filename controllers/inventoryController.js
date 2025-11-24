const invModel = require('../models/inventory-model');
const utilities = require('../utilities');

// ✅ Management view
async function buildManagementView(req, res, next) {
  try {
    const nav = await utilities.getNav();
    res.render("inventory/management", {
      title: "Inventory Management",
      nav,
      message: req.flash("notice"),
    });
  } catch (error) {
    next(error);
  }
}

// ✅ Show add classification form
async function buildAddClassification(req, res, next) {
  try {
    const nav = await utilities.getNav();
    res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      message: req.flash("notice"),
    });
  } catch (error) {
    next(error);
  }
}

// ✅ Handle classification form submission
async function addClassification(req, res, next) {
  try {
    const { classification_name } = req.body;

    // Server-side validation
    if (!classification_name || !/^[A-Za-z]+$/.test(classification_name)) {
      req.flash("notice", "Invalid classification name. Letters only, no spaces or special characters.");
      const nav = await utilities.getNav();
      return res.render("inventory/add-classification", {
        title: "Add Classification",
        nav,
        message: req.flash("notice"),
      });
    }

    const result = await invModel.addClassification(classification_name);

    if (result) {
      req.flash("notice", "Classification added successfully!");
      res.redirect("/inv");
    } else {
      req.flash("notice", "Failed to add classification.");
      const nav = await utilities.getNav();
      res.render("inventory/add-classification", {
        title: "Add Classification",
        nav,
        message: req.flash("notice"),
      });
    }
  } catch (error) {
    next(error);
  }
}

// ✅ Show add vehicle form
async function buildAddVehicle(req, res, next) {
  try {
    const nav = await utilities.getNav();
    const classificationList = await utilities.buildClassificationList();
    res.render("inventory/add-vehicle", {
      title: "Add Vehicle",
      nav,
      classificationList,
      message: req.flash("notice"),
      vehicle: {}, // empty object for first load
    });
  } catch (error) {
    next(error);
  }
}

// ✅ Handle vehicle form submission
async function addVehicle(req, res, next) {
  try {
    const {
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
    } = req.body;

    // Server-side validation (basic example)
    if (!classification_id || !inv_make || !inv_model || !inv_year || !inv_price || !inv_miles) {
      req.flash("notice", "All required fields must be filled correctly.");
      const nav = await utilities.getNav();
      const classificationList = await utilities.buildClassificationList(classification_id);
      return res.render("inventory/add-vehicle", {
        title: "Add Vehicle",
        nav,
        classificationList,
        message: req.flash("notice"),
        vehicle: {
          classification_id,
          inv_make,
          inv_model,
          inv_year,
          inv_description,
          inv_image,
          inv_thumbnail,
          inv_price,
          inv_miles,
          inv_color,
        },
      });
    }

    const result = await invModel.addVehicle({
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
    });

    if (result) {
      req.flash("notice", "Vehicle added successfully!");
      res.redirect("/inv");
    } else {
      req.flash("notice", "Failed to add vehicle.");
      const nav = await utilities.getNav();
      const classificationList = await utilities.buildClassificationList(classification_id);
      res.render("inventory/add-vehicle", {
        title: "Add Vehicle",
        nav,
        classificationList,
        message: req.flash("notice"),
        vehicle: {
          classification_id,
          inv_make,
          inv_model,
          inv_year,
          inv_description,
          inv_image,
          inv_thumbnail,
          inv_price,
          inv_miles,
          inv_color,
        },
      });
    }
  } catch (error) {
    next(error);
  }
}

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
      showBackButton: true
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
      showBackButton: true
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  buildManagementView,
  buildAddClassification,
  addClassification,
  buildAddVehicle,
  addVehicle,
  buildByInventoryId,
  buildByClassificationId
};