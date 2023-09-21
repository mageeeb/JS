const sql = require("./db.js");

console.log("Je passe dans models/message.model.js")

// Constructeur
const Message = function(lemessage) {
    this.nom = lemessage.nom;
    this.msg = lemessage.msg;
    this.date_creation = new Date();
};

// Méthode pour créer un message et le sauvegarder dans la base de données
// newMsg : l'objet Message à créer et sauver dans la DB
// resultat : la réponse du serveur de DB quand je fais l'insertion (OK ou erreur)
Message.create = function(newMsg, resultat){
    sql.query("INSERT INTO messages(nom,message) VALUES (?,?)", [newMsg.nom, newMsg.msg], function(err,res){
        // si on a une erreur lors de l'insertion, on reçoit les données dans err
        // sinon, si tout se passe bien, on reçoit les données dans res
        if (err) {
            console.log("Erreur Message.create : ", err);
            resultat(err,null);
            return;
        }
        console.log("Réponse Message.create : ", res);
        resultat(null,res);
    });
};

// Méthode pour lire tous les messages dans la DB
Message.readAll = function(resultat) {
    sql.query("SELECT * FROM messages ORDER BY datemessage DESC", function(err,res){
        // Si erreur dans la lecture des données
        if (err) {
            console.log("Erreur Message.readAll : ", err);
            resultat(err,null);
            return;
        }
        // Si données reçues
        console.log("Réponse Message.readAll : ", res);
        resultat(null,res);
    });
};

module.exports = Message;
