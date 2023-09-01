// ajout du module Express
const express = require('express');
// création de l'application
const app = express();

// ajout du module standard path (pas besoin de l'installer avec npm install)
const path = require('path');
// création d'un dossier appelé public qui contient des fichiers statiques
app.use(express.static(path.join(__dirname,'public')));

// === Définition des routes ===

// Page d'accueil
app.get('/', function(req,res){
    res.render('home.ejs');
});

// Produits
app.get('/produits', function(req,res){
    res.render('produits.ejs');
});

// Services
app.get('/services', function(req,res){
    res.render('services.ejs');
});

// A propos
app.get('/about', function(req,res){
    res.render('apropos.ejs');
});

// Erreur 404 : pages inconnues
app.use(function(req,res,next){
    res.status(404).render('404.ejs');
});

// === Démarrage et écoute du serveur sur le port 8080 ===
app.listen(8080);
console.log("Express est bien démarré sur le port 8080...");