var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

var Config = require('../environment'),
conf = new Config();

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: conf.TITLE });
});

router.get('/result', function(req, res, next) {
    res.render('result', { title: conf.TITLE });
});

router.post('/feedit', function(req, res, next) {
    var value = req.body.script;
    if (typeof value != 'string' || !value.length) return res.json({result: "error", message: "this is not a script."});
    if (value.length > 500) return res.json({result: "error", message: "script is too long."});
    try {
      var evalscript = new Function(value);
      //var script = '<script id="'+guid()+'">' + value + '</script>\n';
      var script = value.substr(-1) == ';' ? value + '\n' : value + ';\n';
      //fs.appendFile('./views/templates/userscripts.ejs', script, function(err) {
      fs.appendFile('./public/javascripts/userscripts.js', script, function(err) {
          if (err) {
              console.log(err);
              res.json({result: "error", message: "internal error, please try again later."});
              return;
          }

          res.json({result: "success", message: "Done!"});
      });
    } catch(err) {
      res.json({result: "error", message: err.message});
    }
});

module.exports = router;