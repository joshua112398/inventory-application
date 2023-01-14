var express = require('express');
var router = express.Router();

/* GET home page, which is redirected to the characters page */
router.get('/', function(req, res, next) {
  res.redirect('/characters');
});

/* GET characters page */
router.get('/characters', function (req, res, next) {
  res.send("Characters Page: Not Implemented");
});

/* GET character detail page */
router.get('/characters/:characterId', function (req, res, next) {
  res.send("Character Detail Page: Not Implemented");
});

/* GET visions page */
router.get('/visions', function (req, res, next) {
  res.send("Visions Page: Not Implemented");
});

/* GET weapons page */
router.get('/weapons', function (req, res, next) {
  res.send("Weapons Page: Not Implemented");
});

/* GET roles page */
router.get('/roles', function (req, res, next) {
  res.send("Roles Page: Not Implemented");
});

module.exports = router;
