const Vision = require("../models/vision");
const Character = require("../models/character");
const { body, validationResult } = require("express-validator");

exports.visionList = async (req, res, next) => {
  try {
    const visions = await Vision.find({}).sort({name: 1}).exec();
    res.render("visionList", {
      title: "Visions",
      visionList: visions,
    });
  }
  catch (err) {
    return next(err);
  }
};

exports.visionDetail = async (req, res, next) => {
  try {
    const vision = await Vision.findOne({_id: req.params.id}).exec();
    console.log(vision);
    // If vision is not found
    if (vision == null) {
      const err = new Error("Vision not found");
      err.status = 404;
      return next(err);
    }
    // Successfully found
    res.render("visionDetail", {
      title: vision.name,
      vision: vision,
    });
  }
  catch (err) {
    return next(err);
  }
};

exports.visionCreateGet = (req, res, next) => {
  // Render form with empty/default values
  res.render("visionCreate", {
    title: "Add a Vision",
    vision: {name: '', color: '#351764'},
    errors: null,
  });
};

exports.visionCreatePost = [
  // Validate and sanitize
  body("name")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Name must be specified.")
    .isAlphanumeric()
    .withMessage("Name must contain only letters and numbers."),
  // Process request
  (req, res, next) => {
    const errors = validationResult(req);

    // If there's errors, rerender form with sanitized values
    if (!errors.isEmpty()) {
      res.render("visionCreate", {
        title: "Add a Vision",
        vision: req.body,
        errors: errors.array(),
      });
      return;
    }

    // If no errors are present, create a Vision object with sanitized data
    const vision = new Vision({
      name: req.body.name,
      color: req.body.color,
    });
    vision.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect(vision.url);
    });
  },
];

// Handles rendering of deletion page
exports.visionDeleteGet = async (req, res, next) => {
  try {
    // Fetch the vision corresponding to the id parameter. Throw error if not found
    const vision = await Vision.findOne({_id: req.params.id}).exec();
    if (vision == null) {
      const err = new Error("Vision not found");
      err.status = 404;
      return next(err);
    }

    // Fetch all characters that are assigned the vision that is to be deleted
    const characters = await Character.find({vision: req.params.id}).sort({name: 1}).exec();

    // Render deletion page, show characters if characters with the vision exist so the user can
    // be asked to delete or update those characters before deleting the vision
    console.log(characters);
    res.render('visionDelete', {
      title: 'Delete Vision',
      characters: characters,
      vision: vision,
    });
  }
  catch (err) {
    return next(err);
  }
};

// Handles deleting vision off database
exports.visionDeletePost = async (req, res, next) => {
  try {
    // Delete the vision
    await Vision.deleteOne({_id: req.params.id}).exec();

    // Redirect to vision list page
    res.redirect('/server/visions');
  }
  catch (err) {
    return next(err);
  }
}