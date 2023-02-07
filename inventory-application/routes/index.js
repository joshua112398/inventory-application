const express = require('express');
const characterController = require('../controllers/characterController');
const visionController = require('../controllers/visionController');
const weaponController = require('../controllers/weaponController');
const roleController = require('../controllers/roleController');
const router = express.Router();

/* GET home page, which is redirected to the characters page */
router.get('/', characterController.index);

/* GET characters page */
router.get('/characters', characterController.characterList);

/* GET character detail page */
router.get('/characters/:id', characterController.characterDetail);

/* GET character create page */
router.get('/characters/create', function (req, res, next) {
  res.send("Character Create Page: Not Implemented");
});

/* POST character create */
router.post('/characters/create', function (req, res, next) {
  res.send("Character Create Post: Not Implemented");
});

/* GET visions page */
router.get('/visions', visionController.visionList);

/* GET vision detail page */
router.get('/visions/:id', visionController.visionDetail);

/* GET weapons page */
router.get('/weapons', weaponController.weaponList);

/* GET weapon detail page */
router.get('/weapons/:id', weaponController.weaponDetail);

/* GET roles page */
router.get('/roles', roleController.roleList);

/* GET role detail page */
router.get('/roles/:id', roleController.roleDetail);

module.exports = router;
