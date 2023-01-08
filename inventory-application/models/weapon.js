const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WeaponSchema = new Schema({
  name: String,
  description: String,
})