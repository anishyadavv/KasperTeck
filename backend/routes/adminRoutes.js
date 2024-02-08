// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/register", adminController.registerCustomer);
router.post("/create-device", adminController.createDevice);
router.put("/assign-device", adminController.assignDevice);
router.get("/devices", adminController.getAllDevices);

module.exports = router;
