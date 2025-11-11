const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");

// Route to show vehicle detail
router.get("/detail/:invId", invController.buildDetailView);

module.exports = router;