const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VisionSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
});

VisionSchema.virtual('url').get(function() {
  return `/visions/${this._id}`;
});

module.exports = mongoose.model("Vision", VisionSchema);