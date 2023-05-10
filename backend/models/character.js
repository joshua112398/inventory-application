const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  vision: { type: Schema.Types.ObjectId, ref: "Vision", required: true },
  weapon: { type: Schema.Types.ObjectId, ref: "Weapon" },
  role: [{ type: Schema.Types.ObjectId, ref: "Role", required: true }],
  rating: { type: Number, required: true },
  amount: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  img: { type: String, required: true },
});

CharacterSchema.virtual('url').get(function() {
  return `/server/characters/${this._id}`;
});

module.exports = mongoose.model("Character", CharacterSchema);