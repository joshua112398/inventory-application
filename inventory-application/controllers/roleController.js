const Role = require('../models/role');

exports.roleList = async (req, res, next) => {
  const roles = await Role.find({}).sort({name: 1}).exec();
  res.render("roleList", {
    title: "Roles",
    roleList: roles,
  });
};