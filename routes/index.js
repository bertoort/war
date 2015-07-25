var express = require('express');
var router = express.Router();
var game = require('../lib/war.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'War!!' });
});

module.exports = router;
