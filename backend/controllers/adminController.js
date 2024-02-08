// controllers/adminController.js
const Device = require("../models/device");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");

const JWT_SECRET = "ALPHA";
exports.signup = async (req, res) => {
  let success = false;

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ success, error: "sorry user exists already!!!" });
    }

    const salt = await bcrypt.genSalt(10);
    const securePass = await bcrypt.hash(req.body.password, salt);

    const userData = await User.create({
      password: securePass,
      email: req.body.email,
      role: "admin",
    });
    const data = {
      user: {
        id: userData.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("some error occured");
  }
};

exports.login = async (req,res) => {
   const { email, password } = req.body;
   let success = false;
   try {
     const user = await User.findOne({ email });
     if (!user) {
       return res.json({ success, error: "Please enter valid credintials" });
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
     console.log(error.message);
     res.status(500).send("some error occured");
   }
}


exports.registerCustomer = async (req, res) => {
  // Implementation for registering customer
  let success = false;

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ success, error: "sorry user exists already!!!" });
    }

    const salt = await bcrypt.genSalt(10);
    const securePass = await bcrypt.hash(req.body.password, salt);

    const userData = await User.create({
      password: securePass,
      email: req.body.email,
      role: "customer",
    });
    const data = {
      user: {
        id: userData.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("some error occured");
  }
};

exports.createDevice = async (req, res) => {
  // Implementation for creating device
  try {
    const { device_id } = req.body;
    const existingDevice = await Device.findOne({ device_id });

    if (existingDevice) {
      return res.status(400).json({ message: "Device ID already exists" });
    }

    const newDevice = new Device(req.body);
    await newDevice.save();

    res.status(201).json({ message: "Device created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.assignDevice = async (req, res) => {
  // Implementation for assigning device
  try {
    const { device_id, user_id } = req.body;

    const device = await Device.findById(device_id);
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }

    device.alloted_to_user = user_id;
    await device.save();

    res.json({ message: "Device assigned successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllDevices = async (req, res) => {
  // Implementation for getting all devices
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
