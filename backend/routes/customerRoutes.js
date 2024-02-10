// routes/customerRoutes.js
const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const fetchuser = require("../middleware/fetchuser");

router.post("/login", customerController.login);
router.get("/devices", fetchuser, customerController.getDevices);
router.post("/create-room", fetchuser, customerController.createRoom);
router.put("/control-device",fetchuser, customerController.controlDevice);
router.get("/rooms", fetchuser, customerController.getRooms);
router.post("/single-device",fetchuser, customerController.getSingleDevice);

module.exports = router;
