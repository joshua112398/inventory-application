const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  name: String,
  title: String,
  vision: { type: Schema.Types.ObjectId, ref: "Vision" },
  weaponType: { type: Schema.Types.ObjectId, ref: "Weapon" },
  role: [{ type: Schema.Types.ObjectId, ref: "Role" }],
  rating: Number,
  amount: Number,
});

module.exports = mongoose.model("Character", CharacterSchema);