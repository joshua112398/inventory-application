const mongoose = require("mongoose");
const character = require("../models/character");
const Character = require("../models/character");
const Role = require("../models/role");
const Vision = require("../models/vision");
const Weapon = require("../models/weapon");
const { body, validationResult } = require("express-validator");

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
    // Successfully found, so render. Undefined weapons are dealt with on the front end
    res.render("characterDetail", {
      title: character.name,
      character: character,
      weapon: character.weapon,
    });
  }
  catch(err) {
    return next(err);
  }
};

exports.characterCreateGet = async (req, res, next) => {
  try {
    // Fetch all available visions/weapons/roles to render them as options in the form
    const visions = await Vision.find({})
      .sort({name: 1})
      .exec();
    const weapons = await Weapon.find({})
      .sort({name: 1})
      .exec();
    const roles = await Role.find({})
      .sort({name: 1})
      .exec();
    // Render form
    res.render("characterCreate", {
      title: "Add a Character",
      character: {name: "", title: "", vision: {}, weapon: {}, role: {}, rating:0, amount:0},
      visions: visions,
      weapons: weapons,
      roles: roles,
      errors: null,
    });
  }
  catch(err) {
    return next(err);
  }
};

exports.characterCreatePost = [
  // Validate and sanitize fields
  body("name")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Name must be specified")
    .isAlphanumeric()
    .withMessage("Name must contain only letters and numbers."),
  body("title")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Title must be specified")
    .isAlphanumeric()
    .withMessage("Name must contain only letters and numbers."),

  // Process fields
  (req, res, next) => {
    const errors = validationResult(req);
    
    // Rerender form if there are errors during validation/sanitization
    if (!errors.isEmpty()) {
      res.render("characterCreate", {
        title: "Add a Character",
        character: req.body,
        errors: errors.array(),
      });
      return;
    }

    // Add role to database and render role detail if no errors
    const character = new Character({
      name: req.body.name,
      title: req.body.title,
      vision: req.body.vision._id,
    });
    character.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect(role.url);
    });
  },
];