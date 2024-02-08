// routes/customerRoutes.js
const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.post("/login", customerController.login);
router.get("/devices", customerController.getDevices);
router.post("/create-room", customerController.createRoom);
router.put("/control-device", customerController.controlDevice);

module.exports = router;
