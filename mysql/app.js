var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');  // pas besoin de ce router car pas de gestion des utilisateurs
var messagesRouter = require('./routes/messages');  // ce router gère les opérations sur les messages

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);     // pas besoin de ce router car pas de gestion des utilisateurs
app.use('/messages', messagesRouter);   // ce router regroupe les URL pointant vers des méthodes de gestion des messages

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');    // modification de la page affichant les messages d'erreur
  res.render('error', {titre:"Erreur", message:"Une erreur s'est produite", error:err, active:""});
});

module.exports = app;