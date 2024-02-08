// Room schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  room_id: { type: String, required: true },
  user_id: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  device_id: { type: Schema.Types.ObjectId, ref: "Device", required: true },
  room_name: { type: String, required: true },
});

module.exports = mongoose.model("Room", roomSchema);
