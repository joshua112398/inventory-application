const Role = require('../models/role');
const { body, validationResult } = require("express-validator");

exports.roleList = async (req, res, next) => {
  try {
    const roles = await Role.find({}).sort({name: 1}).exec();
    res.render("roleList", {
      title: "Roles",
      roleList: roles,
    });
  }
  catch(err) {
    return next(err);
  }
};

exports.roleDetail = async (req, res, next) => {
  try {
    const role = await Role.findOne({_id: req.params.id}).exec();
    if (role == null) {
      const err = new Error("Role not found");
      err.status = 404;
      return next(err);
    }
    res.render("roleDetail", {
      title: role.name,
      role: role,
    });
  }
  catch(err) {
    return next(err);
  }
}

exports.roleCreateGet = async (req, res, next) => {
  res.render("roleCreate", {
    title: "Create a Role",
    role: {name: '', description: ''},
    errors: null,
  });
};

exports.roleCreatePost = [
  // Validate and sanitize fields
  body("name")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Name must be specified")
    .isAlphanumeric()
    .withMessage("Name must contain only letters and numbers."),
  body("description")
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage("Description must be specified"),

  (req, res, next) => {
    const errors = validationResult(req);
    // Rerender form if there are errors during validation/sanitization
    if (!errors.isEmpty()) {
      res.render("roleCreate", {
        title: "Create a Role",
        role: req.body,
        errors: errors.array(),
      });
      return;
    }

    // Add role to database and render role detail if no errors
    const role = new Role({
      name: req.body.name,
      description: req.body.description,
    });
    role.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect(role.url);
    });
  },
];