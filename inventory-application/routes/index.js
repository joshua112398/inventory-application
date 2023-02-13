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

/* POST character create */
router.get('/characters/create', characterController.characterCreateGet);

/* GET character detail page */
router.get('/characters/:id', characterController.characterDetail);

/* POST character create page */
router.post('/characters/create', function (req, res, next) {
  res.send("Character Create Page: Not Implemented");
});

/* GET visions page */
router.get('/visions', visionController.visionList);

/* GET vision create form page */
router.get('/visions/create', visionController.visionCreateGet);

/* POST vision create form page */
router.post('/visions/create', visionController.visionCreatePost);

/* GET vision detail page */
router.get('/visions/:id', visionController.visionDetail);

/* GET weapons page */
router.get('/weapons', weaponController.weaponList);

/* GET weapon create form page */
router.get('/weapons/create', weaponController.weaponCreateGet);

/* GET weapon detail page */
router.get('/weapons/:id', weaponController.weaponDetail);

/* GET roles page */
router.get('/roles', roleController.roleList);

/* GET role create form page */
router.get('/roles/create', roleController.roleCreateGet);

/* GET role detail page */
router.get('/roles/:id', roleController.roleDetail);

module.exports = router;
