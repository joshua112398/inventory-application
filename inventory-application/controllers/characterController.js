const mongoose = require("mongoose");
const character = require("../models/character");
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

exports.characterDetail = async (req, res, next) => {
  try {
    const character = await Character.findOne({_id: req.params.id})
      .populate("vision")
      .populate("role")
      .populate("weapon")
      .exec();
    // If no results found
    if (character == null) {
      const err = new Error("Character not found");
      err.status = 404;
      return next(err);
    }
    // Check if character has a weapon
    let charWeapon = (character.weapon == null) ? "None" : character.weapon.name;
    // Successfully found, so render
    res.render("characterDetail", {
      title: character.name,
      character: character,
      weapon: charWeapon,
    });
  }
  catch(err) {
    return next(err);
  }
};

exports.characterCreateGet = async (req, res, next) => {
  try {
    const visions = await Vision.find({})
      .sort({name: 1})
      .exec();
    const weapons = await Weapon.find({})
      .sort({name: 1})
      .exec();
    const roles = await Role.find({})
      .sort({name: 1})
      .exec();
    res.render("characterCreate", {
      title: "Add a Character",
      visions: visions,
      weapons: weapons,
      roles: roles,
    });
  }
  catch(err) {
    return next(err);
  }
};