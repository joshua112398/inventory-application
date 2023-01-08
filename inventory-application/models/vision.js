const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VisionSchema = new Schema({
  name: String,
  color: String,
});

module.exports = mongoose.model("Vision", VisionSchema);