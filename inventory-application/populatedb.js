const Character = require("./models/character");
const Role = require("./models/role");
const Vision = require("./models/vision");
const Weapon = require("./models/weapon");

var mongoose = require('mongoose');
var mongoDB = "mongodb+srv://Cluster45533:ek1lSmpJVXt+@cluster45533.da4m2y5.mongodb.net/character_inventory?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const characters = [];
const roles = [];
const visions = [];
const weapons = [];

const createRole = async function(name, description) {
  const roleDetail = {
    name,
    description,
  };
  
  const role = new Role(roleDetail);

  try {
    await role.save();
    console.log("New Role: " + role);
    roles.push(role);
  } 
  catch (err) {
    return handleError(err);
  }
};

const createWeapon = async function(name, description) {
  const weaponDetail = {
    name,
    description,
  };

  const weapon = new Weapon(weaponDetail);

  try {
    await weapon.save();
    console.log("New Weapon: " + weapon);
    weapons.push(weapon);
  }
  catch (err) {
    return handleError(err);
  }
};

const createVision = async function(name, color) {
  const visionDetail = {
    name,
    color,
  };

  const vision = new Vision(visionDetail);

  try {
    vision.save();
    console.log("New Vision: " + vision);
    visions.push(vision);
  }
  catch (err) {
    return handleError(err);
  }
};

const createCharacter = async function(name, title, vision, weapon, role, rating, amount) {
  const charDetail = {
    name,
    title,
    vision,
    role,
    rating,
    amount
  };
  // If char does have a weapon, set field to the weapon
  if (weapon != false) charDetail.weapon = weapon;
  
  const char = new Character(charDetail);

  try {
    await char.save();
    console.log("New Character: " + char);
    characters.push(char);
  }
  catch (err) {
    return handleError(err);
  }
};

(async function() {
  await Character.deleteMany({});
  await Vision.deleteMany({});
  await Role.deleteMany({});
  await Weapon.deleteMany({});
  await createRole("Main DPS", "Main DPS Description");
  await createRole("Sub DPS", "Sub DPS Description");
  await createRole("Shielder", "Shielder Description");
  await createRole("Buffer", "Buffer Description");
  await createRole("Healer", "Healer Description");
  await Promise.all([
    createVision("Anemo", "Blue Green"),
    createVision("Geo", "Gold"),
    createVision("Electro", "Purple"),
    createVision("Dendro", "Green"),
    createVision("")
  ]);
})();
