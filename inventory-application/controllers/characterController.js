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

exports.characterList = async (req, res, next) => {
  try {
    const characters = await Character.find({})
      .sort({name: 1})
      .populate('vision')
      .populate('weapon')
      .populate('role')
      .exec();
    console.log(characters);
    res.render("characterList", {
      title: "Characters",
      characterList: characters,
    });
  }
  catch(err) {
    return next(err);
  }
};