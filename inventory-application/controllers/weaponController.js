const Weapon = require("../models/weapon");
const { body, validationResult } = require("express-validator");

exports.weaponList = async (req, res, next) => {
  try {
    const weapons = await Weapon.find({}).sort({name: 1}).exec();
    res.render("weaponList", {
      title: "Weapons",
      weaponList: weapons,
    });
  }
  catch(err) {
    return next(err);
  }
};

exports.weaponDetail = async (req, res, next) => {
  try {
    const weapon = await Weapon.findOne({_id: req.params.id}).exec();
    // if weapon is not in database
    if (weapon == null) {
      const err = new Error("Weapon not found");
      err.status = 404;
      return next(err);
    }
    // if successful, then render
    res.render("weaponDetail", {
      title: weapon.name,
      weapon: weapon,
    });
  }
  catch(err) {
    return next(err);
  }
};

exports.weaponCreateGet = async (req, res, next) => {
  res.render("weaponCreate", {
    title: "Add New Weapon",
    weapon: {name: '', description: ''},
    errors: null,
  });
};

exports.weaponCreatePost = [
  body("name")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Name must be specified")
    .isAlphanumeric()
    .withMessage("Name must contain only numbers and letters"),
  body("description")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Description must be specified"),
  
  // Process form
  (req, res, next) => {
    const errors = validationResult(req);
    // If errors exist, then rerender form with inputted values
    if (!errors.isEmpty()) {
      res.render("weaponCreate", {
        title: "Add New Weapon",
        weapon: req.body,
        errors: errors.array(),
      });
    }
    // If no errors, then add weapon to database and render weapon detail page
    const weapon = new Weapon({
      name: req.body.name,
      description: req.body.description,
    });
    weapon.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect(weapon.url);
    });
  },
];