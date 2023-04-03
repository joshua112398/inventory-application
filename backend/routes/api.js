const express = require('express');
const characterController = require('../controllers/characterController');
const visionController = require('../controllers/visionController');
const weaponController = require('../controllers/weaponController');
const roleController = require('../controllers/roleController');
const router = express.Router();

/* REST API resources/routes */

/* GET characters*/
router.get('/characters', characterController.getCharacters);

/* POST to characters */
router.post('/characters', characterController.createCharacter);

/* GET character details */
router.get('/characters/:id', characterController.getCharacterDetail);

/* DELETE character*/
router.delete('/characters/:id', characterController.deleteCharacter);

/* GET visions*/
router.get('/visions', visionController.getVisions);

/* POST to visions */
router.post('/visions', visionController.createVision);

/* GET vision details */
router.get('/visions/:id', visionController.getVisionDetail);

/* DELETE vision */
router.delete('/visions/:id', visionController.deleteVision);

/* GET weapons*/
router.get('/weapons', weaponController.getWeapons);

/* POST to weapons */
router.post('/weapons', weaponController.createWeapon);

/* GET weapon details */
router.get('/weapons/:id', weaponController.getWeaponDetail);

/* DELETE weapon */
router.delete('/weapons/:id', weaponController.deleteWeapon);

/* GET roles*/
router.get('/roles', roleController.getRoles);

/* POST to roles */
router.post('/roles', roleController.createRole);

/* GET role details */
router.get('/roles/:id', roleController.getRoleDetail);

/* DELETE role */
router.delete('/roles/:id', roleController.deleteRole);

module.exports = router; 
