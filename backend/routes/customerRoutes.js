// routes/customerRoutes.js
const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const fetchuser = require("../middleware/fetchuser");

router.post("/login", customerController.login);
router.get("/devices", fetchuser, customerController.getDevices);
router.post("/create-room", fetchuser, customerController.createRoom);
router.put("/control-device", customerController.controlDevice);

module.exports = router;
