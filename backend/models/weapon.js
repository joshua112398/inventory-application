const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WeaponSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

WeaponSchema.virtual('url').get(function() {
  return `/weapons/${this._id}`;
});

module.exports = mongoose.model("Weapon", WeaponSchema);