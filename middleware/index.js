const express = require('express');
const {request, response} = require("express");
const app = express();

//Définition du Middleware

const middleware = function (req,rep,next){
    console.log("Middleware affichant l'URL:", req.url);
    next();
}
//utilisation du middelware
app.use(middleware);
app.get('/', function(request, response){
    console.log("requete reçu...");
    response.send("hello world:middlewares");
});

app.get('/magib', function(request, response){
    console.log("vous avez demandé Magib...");
    response.send("Magib est là...");
});
app.listen(8080,function (){
    console.log("express : server en attente sur le port 8080");
})