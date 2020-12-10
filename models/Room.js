const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  url: {
    type: String,
  },
});

module.exports = Room = mongoose.model("Room", RoomSchema);
