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
//router.get('/visions', visionController.getVisions);

/* POST to visions */
//router.post('/visions', visionController.createVision);

/* GET vision details */
//router.get('/visions/:id', visionController.getVisionDetail);

/* DELETE vision */
//router.delete('/visions/:id', visionController.deleteVision);

/* GET weapons*/
//router.get('/weapons', visionController.getWeapons);

/* POST to weapons */
//router.post('/weapons', visionController.createWeapon);

/* GET weapon details */
//router.get('/weapons/:id', visionController.getWeaponDetail);

/* DELETE weapon */
//router.delete('/weapons/:id', visionController.deleteWeapon);

/* GET roles*/
//router.get('/roles', visionController.getRoles);

/* POST to roles */
//router.post('/roles', visionController.createRole);

/* GET role details */
//router.get('/roles/:id', visionController.getRoleDetail);

/* DELETE role */
//router.delete('/roles/:id', visionController.deleteRole);

module.exports = router; 
