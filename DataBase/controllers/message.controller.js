// on importe l'objet Message et la connection à la DB au travers du modèle
const Message = require("../models/message.model");

// import du module "moment.js" pour l'affichage des dates/heures
const moment = require('moment');

console.log("on passe dans controllers/message.controller.js");

// Créer et sauver un nouveau message
exports.create = (req, res) => {
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
                res.render('traiter_form', {titre: titrePage, nom: unMsg.nom, msg: unMsg.msg});
            }
        });
    }
};

// Lire tous les messages
exports.readAll = (req, res) => {
    console.log("GET Tous les messages");
    Message.readAll(function(err,data){
        if (err) {
            res.status(500).send({
                message: "Erreur pendant la lecture de tous les messages"
            });
        } else {
            console.log('Data = ', data);
            const titrePage = "Tableau des messages";
            moment.locale('fr');
            res.render('listeMessages', {titre: titrePage, donnees: data, moment: moment});
        }
    });
};

// Création d'un message
exports.newmsg = (req,res) => {
    console.log("Affichage du formulaire de création");
};

// Lire tous les messages
exports.list = (req,res) => {
    console.log("Affichage de la liste des messages");
    Message.readAll(function(err,data){
        if (err) {
            res.status(500).send({
                message: "Erreur pendant la lecture de tous les messages - list"
            });
        } else {
            const titrePage = "Liste détaillée des messages";
            moment.locale('fr');
            res.render('listePublique', {titre: titrePage, donnees: data, moment: moment});
        }
    });
};

// Lire un message en fonction de son id
exports.readById = (req,res) => {
    console.log("Affichage des détails du message " + req.params.id);

    Message.readById(req.params.id, (err, data) => {
        if (err) {
            if (err.type === "ERR_NOT_FOUND") {
                res.status(404).send({
                message: `Pas de message trouvé avec id ${req.params.id} - readById`
                });
            } else {
                res.status(500).send({
                message: "Une erreur s'est produite en cherchant le message avec l'id " + req.params.id + " - readById"
                });
            }
        } else {
            const titrePage = "Détails du message " + req.params.id;
            moment.locale('fr');
            res.render('detailsMessage', {titre: titrePage, donnees: data, moment: moment});
        }
    });
};

// Mettre à jour un message en fonction de son id
exports.updateById = (req,res) => {
    console.log("Récupérer les données actuelles du message " + req.params.id + " avant modification");

    Message.updateById(req.params.id, (err, data) => {
        if (err) {
            if (err.type === "ERR_NOT_FOUND") {
                res.status(404).send({
                message: `Pas de message trouvé avec id ${req.params.id} - updateById`
                });
            } else {
                res.status(500).send({
                message: "Une erreur s'est produite en cherchant le message avec l'id " + req.params.id + " - updateById"
                });
            }
        } else {
            const titrePage = "Modification du message " + req.params.id;
            res.render('editMessage', {titre: titrePage, donnees: data});
        }
    });
};

// Mettre à jour un message en fonction de son id
exports.update = (req,res) => {
    console.log("Mettre à jour les données modifiées");
    const titrePage = "Liste des messages";
    const lid= req.body.id;
    const lenom = req.body.nom;
    const lemessage = req.body.msg;

    // Valider le contenu de la requête (est-ce-que le formulaire a été rempli ?)
    if ((!req.body)||(lenom=="")||(lemessage=="")) {
        console.log("Le contenu ne peut pas être vide !");
        res.redirect('/messages/edit/' + req.body.id);   // retourner au formulaire
    } else {
        console.log(req.body);

        // Créer mon message avec le modèle
        const unMsg = new Message({
            nom: req.body.nom,
            msg: req.body.msg
        });

        Message.update(lid, unMsg, function(err, data){
            if (err) {
                res.status(500).send({
                    message: "Erreur pendant la modification du message"
                });
            } else {
                res.redirect('/messages/list');
            }
        });
    }
};

// Supprimer un message en fonction de son id
exports.deleteById = (req, res) => {
    console.log("Récupérer les données actuelles du message " + req.params.id + " avant suppression");

    Message.deleteById(req.params.id, (err, data) => {
        if (err) {
            if (err.type === "ERR_NOT_FOUND") {
                res.status(404).send({
                message: `Pas de message trouvé avec id ${req.params.id} - deleteById`
                });
            } else {
                res.status(500).send({
                message: "Une erreur s'est produite en cherchant le message avec l'id " + req.params.id + " - deleteById"
                });
            }
        } else {
            const titrePage = "Suppression du message " + req.params.id;
            res.render('confirmMessage', {titre: titrePage, donnees: data});
        }
    });

};

// Supprimer un message en fonction de son id
exports.delete = (req, res) => {
    console.log("Effacer le message après confirmation");

    const lid= req.body.id;

    // Valider le contenu de la requête
    if (!req.body) {
        console.log("Le contenu ne peut pas être vide !");
        res.redirect('/messages/confirm/' + req.body.id);   // retourner au formulaire
    } else {
        console.log(req.body);

        Message.delete(lid, function(err, data){
            if (err) {
                res.status(500).send({
                    message: "Erreur pendant la suppression du message"
                });
            } else {
                res.redirect('/messages/list');
            }
        });
    }
};
