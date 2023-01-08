const moongoose = require("mongoose");

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: String,
  description: String,
});

module.exports = mongoose.model("Role", RoleSchema);