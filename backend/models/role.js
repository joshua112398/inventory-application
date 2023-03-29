const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

RoleSchema.virtual('url').get(function() {
  return `/server/roles/${this._id}`;
});

module.exports = mongoose.model("Role", RoleSchema);