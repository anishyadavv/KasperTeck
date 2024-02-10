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
    try{
      const user = await User.findOne({email:email});
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
    }
    catch(error){
      console.log(error);
      res.status(500).json({error:error.message,success:false});
    }
};

exports.getDevices = async (req, res) => {
  // Implementation for getting devices for a customer
  const user = req.user;

  try{
    const devices = await Device.find({alloted_to_user:user.id});
    res.json(devices);
  }
  catch(error){
    console.log(error);
    res.status(500).json({ error: error.message, success: false });
  }

};

exports.createRoom = async (req, res) => {
  // Implementation for creating a room
  const { room_id, device_id, room_name} = req.body;
  const user_id = req.user.id;

  try{
    const room = await Room.findOne({room_id: room_id});
    if(room){
      res.json({success:false, error: "Room already exists"});
    }
    
    const newRoom = await Room.create({
      room_id,
      user_id,
      device_id,
      room_name,
    });
    await newRoom.save();

    res.json(newRoom);

  }
  catch(error){
     console.log(error);
     res.status(500).json({ error: error.message, success: false });
  }
};

exports.controlDevice = async (req, res) => {
  // Implementation for controlling device
};
