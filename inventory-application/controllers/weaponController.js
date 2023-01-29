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