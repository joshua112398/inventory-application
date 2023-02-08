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
  res.render("visionCreate", {
    title: "Add a Vision",
  })
};