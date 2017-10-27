var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var index = require(path.join(__dirname, 'routes/index'));

var Config = require('./environment'),
conf = new Config();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
 // var err = new Error("404 error! " + req.url + ' Not Found');
 var err = "404 error! " + req.url + ' Not Found';
 console.log(err);
 res.sendStatus(404);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    if (err) console.log(err);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  if (err) console.log(err);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
