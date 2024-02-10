// controllers/customerController.js
const Device = require("../models/device");
const Room = require("../models/room");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
const JWT_SECRET = "ALPHA";

exports.login = async (req, res) => {
  // Implementation for customer login
  const { email, password } = req.body;
  let success = false;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ success, error: "Please enter valid credintials" });
    }
    if (user.role === "admin") {
      return res.json({
        success,
        error: "Only customers can login here",
      });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.json({ success, error: "Please enter valid credintials" });
    }

    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message, success: false });
  }
};

exports.getDevices = async (req, res) => {
  const user = req.user;

  try {
    const devices = await Device.find({ alloted_to_user: user.id });
    res.json(devices);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message, success: false });
  }
};

exports.createRoom = async (req, res) => {
  const { room_id, device_id, room_name } = req.body;
  const user_id = req.user.id;

  try {
    const room = await Room.findOne({ room_id: room_id });
    if (room) {
      return res.json({ success: false, error: "Room already exists" });
    }
    const newRoom = await Room.create({
      room_id,
      user_id,
      device_id,
      room_name,
    });
    await newRoom.save();

    res.json({ success: true, message: "Room created successfully",newRoom:newRoom });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message, success: false });
  }
};

exports.controlDevice = async (req, res) => {
  try {
    const { device_id, light, fan, mis } = req.body;

    const device = await Device.findById(device_id);
    if (!device) {
      return res.status(404).json({ error: "Device not found",success:false });
    }

    device.state = { light, fan, mis };
    await device.save();

    res.json({ message: "Device state updated successfully",success:true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message, success: false });
  }
};

exports.getRooms = async (req, res) => {
  const user_id = req.user.id;
  try {
    const rooms = await Room.find({ user_id: user_id });
    res.json(rooms);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message, success: false });
  }
};

exports.getSingleDevice = async(req,res) => {
  const {device_id} = req.body;
  try{
    const device = await Device.findById(device_id);
    res.json(device);
  }
  catch(error){
    console.log(error);
    res.status(500).json({ error: error.message, success: false });
  }
}