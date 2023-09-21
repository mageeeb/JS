var express = require('express');
var router = express.Router();
//var bodyParser = require('body-parser');    // avant Express v4.16

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Afficher le formulaire de contact qui va envoyer les données */
router.get('/contact', function(req, res, next) {
  res.render('contact_form', {titre: "Contact"});
});

/* Utiliser le middleware intégré body-parser pour analyser la requête POST */
//var urlencodedParser = bodyParser.urlencoded({ extended: false });
var urlencodedParser = express.urlencoded({extended:false});

/* Recevoir les données et afficher la page */
router.post('/traitement', urlencodedParser, function(req, res, next){
  let lenom = req.body.nom;
  let lemessage = req.body.msg;

  res.render('traiter_form', {titre: "Formulaire reçu", nom: lenom, msg: lemessage});
});

module.exports = router;
