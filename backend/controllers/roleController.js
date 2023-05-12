const Role = require('../models/role');
const { body, validationResult } = require("express-validator");

/* GET roles*/
exports.getRoles = async (req, res, next) => {
  try {
    const roles = await Role.find({})
      .sort({name: 1})
      .exec();
    
    return res.status(200).json(roles);
  }
  catch(err) {
    return next(err);
  }
};

/* POST to roles */
exports.createRole = [
  // Validate and sanitize fields
  body("name")
    .trim()
    .isLength({min: 1})
    .withMessage("Name must be specified")
    .isAlphanumeric("en-US", {ignore: " -'"})
    .withMessage("Name must contain only letters, numbers, or hyphens."),
  body("description")
    .trim()
    .isLength({min: 1})
    .withMessage("Description must be specified"),

  // Process fields
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      console.log(errors);
      
      // Return validation errors object to the client if errors exist
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }

      // Add character to database if no errors, return the newly created character as json
      const role = new Role({
        name: req.body.name,
        description: req.body.description,
      });
      await role.save();
      return res.status(200).json(role);
    }
    catch(err) {
      return next(err);
    }
  },
];

/* GET role details */
exports.getRoleDetail = async (req, res, next) => {
  try {
    const role = await Role.findOne({_id: req.params.id}).exec();
    if (role == null) {
      const error = {
        error: {
            value: req.params.id,
            msg: "Role not found",
        },
      };
      return res.status(404).json(error);
    }
    return res.status(200).json(role);
  }
  catch(err) {
    return next(err);
  }
};

/* UPDATE role */
exports.updateRole = [
  // Validate and sanitize fields
  body("name")
    .trim()
    .isLength({min: 1})
    .withMessage("Name must be specified")
    .isAlphanumeric("en-US", {ignore: " -'"})
    .withMessage("Name must contain only letters, numbers, or hyphens."),
  body("description")
    .trim()
    .isLength({min: 1})
    .withMessage("Description must be specified"),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      
      // Return validation errors object to the client if errors exist
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }

      // Find weapon to be updated
      const role = await Role.findOne({_id: req.params.id}).exec();
      if (role == null) {
        const error = {
          error: {
            value: req.params.id,
            msg: "Role not found",
          },
        };
        return res.status(404).json(error);
      }

      // Update fields
      role.name = req.body.name;
      role.description = req.body.description;
      await role.save();

      return res.status(200).json(role);
      
    } catch (err) {
      return next(err);
    }
  }
];

/* DELETE role*/
exports.deleteRole = async (req, res, next) => {
  try {
    const result = await Role.deleteOne({_id: req.params.id}).exec();
    if (result.deletedCount < 1) {
      const error = {
        error: {
          value: req.params.id,
          msg: "Role to be deleted was not found",
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