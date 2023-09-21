const sql = require("./db.js");

console.log("on passe dans models/message.model.js")

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

// Méthode pour lire un message dans la DB, en fonction de son ID
Message.readById = function(id, resultat) {
    sql.query("SELECT * FROM messages WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("Erreur Message.readById : ", err);
        resultat(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Message.readById - message trouvé : ", res[0]);
        resultat(null, res[0]);
        return;
      }
  
      // Pas de message trouvé avec cet ID
      resultat({ type: "ERR_NOT_FOUND" }, null);
    });
};  

// Méthode pour récupérer un message dans la DB, en fonction de son ID, afin de le modifier
Message.updateById = function(id, resultat) {
  sql.query("SELECT * FROM messages WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("Erreur Message.updateById : ", err);
      resultat(err, null);
      return;
    }

    if (res.length) {
      console.log("Message.updateById - message trouvé : ", res[0]);
      resultat(null, res[0]);
      return;
    }

    // Pas de message trouvé avec cet ID
    resultat({ type: "ERR_NOT_FOUND" }, null);
  });
};  

// Méthode pour modifier un message dans la DB, en fonction de son ID
Message.update = (id, msg, resultat) => {
    console.log(msg);
    sql.query("UPDATE messages SET nom= ?, message= ? WHERE id = ?", [msg.nom, msg.msg, id], (err, res) => {
        if (err) {
          console.log("Erreur Message.update : ", err);
          resultat(err, null);
          return;
        }
  
        if (res.affectedRows == 0) {
          // Pas de message trouvé avec cet ID
          resultat({ type: "ERR_NOT_FOUND" }, null);
          return;
        }
  
        console.log("Message.update - message mis à jour : ", { id: id, ...msg });
        resultat(null, { id: id, ...msg });
    });
};    

// Méthode pour récupérer un message dans la DB, en fonction de son ID, afin de le supprimer
Message.deleteById = function(id, resultat) {
  sql.query("SELECT * FROM messages WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("Erreur Message.deleteById : ", err);
      resultat(err, null);
      return;
    }

    if (res.length) {
      console.log("Message.deleteById - message trouvé : ", res[0]);
      resultat(null, res[0]);
      return;
    }

    // Pas de message trouvé avec cet ID
    resultat({ type: "ERR_NOT_FOUND" }, null);
  });
};  

// Méthode pour supprimer un message dans la DB, en fonction de son ID
Message.delete = (id, resultat) => {
  sql.query("DELETE FROM messages WHERE id = ?", [id], (err, res) => {
      if (err) {
        console.log("Erreur Message.delete : ", err);
        resultat(err, null);
        return;
      }

      console.log("RES="+res);

      if (res.affectedRows == 0) {
        // Pas de message trouvé avec cet ID
        resultat({ type: "ERR_NOT_FOUND" }, null);
        return;
      }

      console.log("Message.delete - message " + id + " supprimé");
      resultat(null, res);
  });
};    


module.exports = Message;

