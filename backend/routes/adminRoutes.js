// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const fetchuser = require("../middleware/fetchuser");

router.post("/registerCustomer", fetchuser, adminController.registerCustomer);
router.post("/create-device",fetchuser, adminController.createDevice);
router.put("/assign-device", fetchuser, adminController.assignDevice);
router.get("/customers", fetchuser, adminController.getAllCustomers);
router.get("/devices", fetchuser, adminController.getAllDevices);
router.post("/register", adminController.signup);
router.post("/Login", adminController.login);
router.post("/customer-details", adminController.getCustomerDetails);

module.exports = router;
