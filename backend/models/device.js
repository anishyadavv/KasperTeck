// Device schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
  device_id: { type: String, required: true },
  alloted_to_user: { type: Schema.Types.ObjectId, ref: "User" },
  state: {
    light: { type: Number, default: 0 },
    fan: { type: Number, default: 0 },
    mis: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model("Device", deviceSchema);
