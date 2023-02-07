const Weapon = require("../models/weapon");

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
}

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
}