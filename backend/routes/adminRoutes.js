// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/registerCustomer", adminController.registerCustomer);
router.post("/create-device", adminController.createDevice);
router.put("/assign-device", adminController.assignDevice);
router.get("/devices", adminController.getAllDevices);
router.post("/register", adminController.signup);
router.post("/Login", adminController.login);

module.exports = router;
