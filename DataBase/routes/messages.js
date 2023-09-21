var express = require('express');
var router = express.Router();

const messages = require("../controllers/message.controller.js");

console.log("on passe dans routes/messages.js");

// Définition des routes pour gérer les messages
// Toutes les routes définies dans ce router commencent par l'URL : localhost:8080/messages

// Récupération de tous les messages : ReadAll
// URL => localhost:8080/messages/
router.get('/', messages.readAll);

// Création d'un message
// Enregistrement du nouveau message
// URL => localhost:8080/messages/create
router.post('/create', messages.create);

// Création d'un message
// Affichage du formulaire de création
// URL => localhost:8080/messages/newmsg
router.get('/newmsg', messages.newmsg);

// Lire tous les messages
// Affichage de la liste des messages
// URL => localhost:8080/messages/list
router.get('/list', messages.list);

// Lire un message en fonction de son id
// Affichage des détails d'un message
// URL => localhost:8080/messages/read/:id
router.get('/read/:id', messages.readById);

// Mettre à jour un message en fonction de son id
// Récupérer les données actuelles du message
// URL => localhost:8080/messages/edit/:id
router.get('/edit/:id', messages.updateById);

// Mettre à jour un message en fonction de son id
// Sauvegarder les nouvelles données modifiées
// URL => localhost:8080/messages/update/:id
router.post('/update/:id', messages.update);

// Supprimer un message en fonction de son id
// Récupérer les données actuelles du message
// URL => localhost:8080/messages/confirm/:id
router.get('/confirm/:id', messages.deleteById);

// Supprimer un message en fonction de son id
// Effacer le message après confirmation
// URL => localhost:8080/messages/delete/:id
router.post('/delete/:id', messages.delete);

module.exports = router;