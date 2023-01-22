const express = require('express');
const characterController = require('../controllers/characterController');
const router = express.Router();

/* GET home page, which is redirected to the characters page */
router.get('/', characterController.index);

/* GET characters page */
router.get('/characters', characterController.characterList);

/* GET character detail page */
router.get('/characters/:characterId', function (req, res, next) {
  res.send("Character Detail Page: Not Implemented");
});

/* GET character create page */
router.get('/characters/create', function (req, res, next) {
  res.send("Character Create Page: Not Implemented");
});

/* POST character create */
router.post('/characters/create', function (req, res, next) {
  res.send("Character Create Post: Not Implemented");
});

/* GET visions page */
router.get('/visions', function (req, res, next) {
  res.send("Visions Page: Not Implemented");
});

/* GET vision detail page */
router.get('/visions/:visionId', function (req, res, next) {
  res.send("Vision Detail Page: Not Implemented");
});

/* GET weapons page */
router.get('/weapons', function (req, res, next) {
  res.send("Weapons Page: Not Implemented");
});

/* GET weapon detail page */
router.get('/weapons/:weaponId', function (req, res, next) {
  res.send("Weapon Detail Page: Not Implemented");
});

/* GET roles page */
router.get('/roles', function (req, res, next) {
  res.send("Roles Page: Not Implemented");
});

module.exports = router;
