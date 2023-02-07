const Role = require('../models/role');

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