var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Framework Express' });
});

/* Page ABOUT */
router.get('/about', function(req, res, next) {
  res.render('apropos', { title: 'A propos' });
});

module.exports = router;
