var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Afficher le formulaire de contact */
router.get('/contact', function(req,res,next){
  res.render('contact_form', {titre: "Contact"});
});

/* Utiliser le middleware intégré body-parser pour analyser la requête POST */
var urlencodedParser = express.urlencoded({extended:false});

/* Recevoir les données et afficher la page */
router.post('/traitement', urlencodedParser, function(req,res,next){
  let lenom = req.body.nom;
  /* req.body.nom car dans le formulaire le champ Nom a la valeur "nom" pour son attribut name */
  let lemessage = req.body.msg;
  /* req.body.msg car dans le formulaire le champ Message a la valeur "msg" pour son attribut name */

  res.render('traiter_form', {titre: "Formulaire reçu", nom: lenom, msg: lemessage});
});

module.exports = router;
