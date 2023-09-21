var express = require('express');
var router = express.Router();
//var bodyParser = require('body-parser');    // avant Express v4.16

const root = require("../controllers/root.controller.js");

console.log("on passe dans routes/index.js");

// Définition des routes pour gérer les pages à la racine
// Toutes les routes définies dans ce router commencent par l'URL : localhost:8080/

/* GET home page. */
router.get('/', root.home);

/* Afficher le formulaire de contact qui va envoyer les données */
router.get('/contact', root.form);

/* Utiliser le middleware intégré body-parser pour analyser la requête POST */
//var urlencodedParser = bodyParser.urlencoded({ extended: false });
var urlencodedParser = express.urlencoded({extended:false});

/* Recevoir les données et afficher la page */
router.post('/traitement', urlencodedParser, root.traitement);

module.exports = router;
