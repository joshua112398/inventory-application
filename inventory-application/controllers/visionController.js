const Vision = require("../models/vision");

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