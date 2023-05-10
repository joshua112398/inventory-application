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

/* POST to characters */
const fields = [
  { name: 'img'},
  { name: 'thumbnail'}
];
router.post('/characters', uploadImage.fields(fields), characterController.createCharacter);

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
