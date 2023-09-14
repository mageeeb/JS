var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact_form', { titre: 'contact' });
});
var urlencodedParser = express.urlencoded({extended:false});

router.post('/traitement',urlencodedParser ,function(req, res, next) {
  let lenom = req.body.nom;
  let lemessage = req.body.msg
  res.render('traiter_form', { titre: 'Formulaire reçu', nom:lenom,msg:lemessage });
});

module.exports = router;
