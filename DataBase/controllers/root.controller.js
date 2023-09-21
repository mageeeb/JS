console.log("on passe dans controllers/root.controller.js");

exports.home = (req, res, next) => {
    res.render('index', { titre: 'Express' });
};

exports.form = (req, res, next) => {
    res.render('contact_form', {titre: "Contact"});
};

exports.traitement = (req, res, next) => {
    let lenom = req.body.nom;
    let lemessage = req.body.msg;
  
    res.render('traiter_form', {titre: "Formulaire reçu", nom: lenom, msg: lemessage});
};
