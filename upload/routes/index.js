var express = require('express');
var router = express.Router();

var formidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Envoi du formulaire d'upload */
router.post('/', function(req,res){
  /* Nouveau formulaire */
  var form = new formidable.IncomingForm();
  /* Définir la taille maximum (2 Mo) */
  form.maxFileSize = 2 * 1024 * 1024;
  /* Analyser le formulaire */
  form.parse(req);

  /* Filtrer sur les types MIME de données acceptées */
  fileTypes = ['image/jpeg', 'image/png', 'image/gif'];

  form.onPart = function(part) {
    /* Vérification du type de données envoyées dans le fichier */
    if (fileTypes.indexOf(part.mimetype) === -1) {
      form._error(new Error("Ce type de fichier n'est pas supporté : "+part.mimetype));
    }
  
    if (!part.originalFilename || fileTypes.indexOf(part.mimetype) !== -1) {
      form._handlePart(part);
    }
  }

  form.on('fileBegin', function(name,file){
    console.log("Fichier uploadé : " + file.originalFilename);
    /* On sauvegarde le fichier uploadé dans le répertoire 'uploads' */
    file.filepath = __dirname + '/../public/uploads/' + file.originalFilename;
    console.log(file.filepath);
  });

  /* Affichage des infos de l'upload dans la vue */
  form.on('file', function(name,file){
    /* Récup des données du fichier uploadé */
    console.log("Nom du fichier : " + file.originalFilename);
    console.log("Taille du fichier : " + file.size);
    console.log("Type de fichier : " + file.mimetype);

    /* Envoi des données au template */
    res.render('uploaded', {title:"Upload", nom: file.originalFilename, taille: file.size, type: file.mimetype});
  });

  /* Upload OK */
  form.on('end', function(){
    console.log('Upload OK !');
  });

  form.on('error', function(err){
    console.log('Erreur : '+err);
    console.log('Stack : ' + err.stack);

    res.render('error', {title: 'Erreur', message: "Une erreur s'est produite pendant l'upload", error: err});
  });
});

module.exports = router;
