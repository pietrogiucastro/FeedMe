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
    if (value.length > 500) return res.json({result: "error", message: "script is too long."});
    var script = '<script id="'+guid()+'">' + value + '</script>';
    fs.appendFile('./views/templates/userscripts.ejs', script, function(err) {
        if (err) {
            console.log(err);
            res.json({result: "error", message: "internal error, please try again later."});
            return;
        }

        res.json({result: "success", message: "Done!"});
    });
});

module.exports = router;