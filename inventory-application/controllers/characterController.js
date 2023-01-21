const mongoose = require("mongoose");
const Character = require("../models/character");
const Role = require("../models/role");
const Vision = require("../models/vision");
const Weapon = require("../models/weapon");

exports.index = async (req, res, next) => {
  res.render("index", {
    title: "Vision.gg",
  });
};