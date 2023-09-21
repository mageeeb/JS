var express = require('express');
var router = express.Router();

// on importe l'objet Message et la connection à la DB au travers du modèle
const Message = require("../models/message.model");

// import du module "moment.js" pour l'affichage des dates/heures
const moment = require('moment');

// Définition des routes pour gérer les messages
// Toutes les routes définies dans ce router commencent par l'URL : localhost:8080/messages

// Récupération de tous les messages : ReadAll
// URL => localhost:8080/messages/
router.get('/', function(req,res){
    console.log("GET Tous les messages");
    Message.readAll(function(err,data){
        if (err) {
            res.status(500).send({
                message: "Erreur pendant la lecture de tous les messages"
            });
        } else {
            console.log('Data = ', data);
            const titrePage = "Liste des messages";
            moment.locale('fr');
            res.render('listeMessages', {titre: titrePage, donnees: data, moment: moment});
        }
    });
});

// Création d'un message : Create
// URL => localhost:8080/messages/create
router.post('/create', function(req,res){
    console.log("POST Créer un message");
    const titrePage = "Formulaire reçu";
    const lenom = req.body.nom;
    const lemessage = req.body.msg;

    // Valider le contenu de la requête (est-ce-que le formulaire a été rempli ?)
    if ((!req.body)||(lenom=="")||(lemessage=="")) {
        console.log("Le contenu ne peut pas être vide !");
        res.redirect('/contact_form');   // retourner au formulaire
    } else {
        console.log(req.body);
        // Créer mon message avec le modèle
        const unMsg = new Message({
            nom: req.body.nom,
            msg: req.body.msg
        });

        Message.create(unMsg, function(err, data){
            if (err) {
                res.status(500).send({
                    message: "Erreur pendant la création du message"
                });
            } else {
                console.log('Data = ', data);
                res.render('traiter_form', {titre: titrePage, nom: unMsg.nom, msg: unMsg.msg, active:""});
            }
        });
    }
});

module.exports = router;