const Weapon = require("../models/weapon");
const Character = require("../models/character");
const { body, validationResult } = require("express-validator");

//////////////////////////
//// REST API METHODS ////
//////////////////////////

/* GET weapons*/
exports.getWeapons = async (req, res, next) => {
  try {
    const weapons = await Weapon.find({})
      .sort({name: 1})
      .exec();
    
    return res.status(200).json(weapons);
  }
  catch(err) {
    return next(err);
  }
};

/* POST to weapons */
exports.createWeapon = [
  // Validate and sanitize fields
  body("name")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Name must be specified")
    .isAlphanumeric("en-US", {ignore: " -'"})
    .withMessage("Name must contain only letters, numbers, or hyphens."),
  body("description")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Description must be specified"),

  // Process fields
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      
      // Return validation errors object to the client if errors exist
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }

      // Add character to database if no errors, return the newly created character as json
      const weapon = new Weapon({
        name: req.body.name,
        description: req.body.description,
      });
      await weapon.save();
      return res.status(200).json(weapon);
    }
    catch(err) {
      return next(err);
    }
  },
];

/* GET weapon details */
exports.getWeaponDetail = async (req, res, next) => {
  try {
    const weapon = await Weapon.findOne({_id: req.params.id}).exec();
    if (weapon == null) {
      const error = {
        error: {
            value: req.params.id,
            msg: "Weapon not found",
        },
      };
      return res.status(404).json(error);
    }
    return res.status(200).json(weapon);
  }
  catch(err) {
    return next(err);
  }
};

/* UPDATE weapon */
exports.updateWeapon = [
  // Validate and sanitize fields
  body("name")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Name must be specified")
    .isAlphanumeric("en-US", {ignore: " -'"})
    .withMessage("Name must contain only letters, numbers, or hyphens."),
  body("description")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Description must be specified"),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      
      // Return validation errors object to the client if errors exist
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }

      // Find weapon to be updated
      const weapon = await Weapon.findOne({_id: req.params.id}).exec();
      if (weapon == null) {
        const error = {
          error: {
            value: req.params.id,
            msg: "Weapon not found",
          },
        };
        return res.status(404).json(error);
      }

      // Update fields
      weapon.name = req.body.name;
      weapon.description = req.body.description;
      await weapon.save();
      
      return res.status(200).json(weapon);
      
    } catch (err) {
      return next(err);
    }
  }
];

/* DELETE weapon*/
exports.deleteWeapon = async (req, res, next) => {
  try {
    const result = await Weapon.deleteOne({_id: req.params.id}).exec();
    if (result.deletedCount < 1) {
      const error = {
        error: {
          value: req.params.id,
          msg: "Weapon to be deleted was not found",
        },
      };
      return res.status(404).json(error);
    }
    return res.status(200).json(result);
  }
  catch(err) {
    return next(err);
  }
}

///////////////////////////////////////
//// SERVER SIDE RENDERING METHODS ////
///////////////////////////////////////

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
  async (req, res, next) => {
    try {
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
      await weapon.save();
      res.redirect(weapon.url);
    }
    catch (err) {
      return next(err);
    }
  },
];

// Handles rendering of deletion page
exports.weaponDeleteGet = async (req, res, next) => {
  try {
    // Fetch the weapon corresponding to the id parameter. Throw error if not found
    const weapon = await Weapon.findOne({_id: req.params.id}).exec();
    if (weapon == null) {
      const err = new Error("Weapon not found");
      err.status = 404;
      return next(err);
    }

    // Fetch all characters that are assigned the vision that is to be deleted
    const characters = await Character.find({weapon: req.params.id}).sort({name: 1}).exec();

    // Render deletion page, show characters if characters with the vision exist so the user can
    // be asked to delete or update those characters before deleting the vision
    console.log(characters);
    res.render('weaponDelete', {
      title: 'Delete Weapon',
      characters: characters,
      weapon: weapon,
    });
  }
  catch (err) {
    return next(err);
  }
};

// Handles deletion of weapon and unassignment of said weapon from characters that had it equipped
exports.weaponDeletePost = async (req, res, next) => {
  try {
    const characters = await Character.find({weapon: req.params.id}).exec();
    characters.forEach((character) => {
      character.weapon = null;
    });

    // Make array of save() functions which all return a promise, then await Promise.all on it
    // so that they are saved concurrently
    const saveCharacters = characters.map((character) => {
      return character.save();
    });
    await Promise.all(saveCharacters);

    // Delete the weapon
    await Weapon.deleteOne({_id: req.params.id}).exec();

    // Redirect to weapons list page
    res.redirect('/server/weapons');
  }
  catch (err) {
    return next(err);
  }
}