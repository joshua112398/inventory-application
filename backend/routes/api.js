require("dotenv").config();
const express = require('express');
const characterController = require('../controllers/characterController');
const visionController = require('../controllers/visionController');
const weaponController = require('../controllers/weaponController');
const roleController = require('../controllers/roleController');
const path = require('path');
const router = express.Router();
// Set up multer for parsing MultiPart forms
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  region: process.env.AWS_BUCKET_REGION,
});

const s3Storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_BUCKET_NAME,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: (req, file, cb) => {
    cb(null, {fieldname: file.fieldname})
  },
  key: (req, file, cb) => {
    const fileName = Date.now() + "_" + file.fieldname;
    cb(null, fileName);
  }
});

const uploadImage = multer({
  storage: s3Storage,
  limits: {
    fileSize: 1024 * 1024 * 4 // 4mb file size
  }
})

/* REST API resources/routes */

/* GET characters*/
router.get('/characters', characterController.getCharacters);

const fields = [
  { name: 'img'},
  { name: 'thumbnail'}
];
/* POST to characters */
router.post('/characters', uploadImage.fields(fields), characterController.createCharacter);

/* UPDATE character */
router.put('/characters/:id', uploadImage.fields(fields), characterController.updateCharacter);

/* GET character details */
router.get('/characters/:id', characterController.getCharacterDetail);

/* DELETE character*/
router.delete('/characters/:id', characterController.deleteCharacter);

/* GET visions*/
router.get('/visions', visionController.getVisions);

/* POST to visions */
router.post('/visions', uploadImage.none(), visionController.createVision);

/* GET vision details */
router.get('/visions/:id', visionController.getVisionDetail);

/* UPDATE vision */
router.put('/visions/:id', uploadImage.none(), visionController.updateVision);

/* DELETE vision */
router.delete('/visions/:id', visionController.deleteVision);

/* GET weapons*/
router.get('/weapons', weaponController.getWeapons);

/* POST to weapons */
router.post('/weapons', uploadImage.none(), weaponController.createWeapon);

/* GET weapon details */
router.get('/weapons/:id', weaponController.getWeaponDetail);

/* UPDATE weapon */
router.put('/weapons/:id', uploadImage.none(), weaponController.updateWeapon);

/* DELETE weapon */
router.delete('/weapons/:id', weaponController.deleteWeapon);

/* GET roles*/
router.get('/roles', roleController.getRoles);

/* POST to roles */
router.post('/roles', uploadImage.none(), roleController.createRole);

/* GET role details */
router.get('/roles/:id', roleController.getRoleDetail);

/* UPDATE role */
router.put('/roles/:id', uploadImage.none(), roleController.updateRole);

/* DELETE role */
router.delete('/roles/:id', roleController.deleteRole);

module.exports = router; 
