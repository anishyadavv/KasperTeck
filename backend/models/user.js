// Customer model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, requird: true },
});

module.exports = mongoose.model("User", userSchema);
