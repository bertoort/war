var express = require('express');
var router = express.Router();
var game = require('../lib/war.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'game simulator' });
});

router.post('/', function(req, res, next) {
  res.redirect('/');
});

router.get('/stats', function(req, res, next) {
  res.render('stats', { title: 'statistical analysis' });
});

router.post('/stats', function(req, res, next) {
  res.redirect('stats');
});

module.exports = router;
