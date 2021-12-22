var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/' ||'home'.toLowerCase(), function(req, res, next) {
  
  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/home.html');

});

router.get('/index'.toLowerCase(), function(req, res, next) {
  
  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/index.html');

});

router.get('/login'.toLowerCase(), function(req, res, next) {
  
  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/login.html');

});

router.get('/menu'.toLowerCase(), function(req, res, next) {
  
  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/menu.html');

});

router.get('/order'.toLowerCase(), function(req, res, next) {
  
  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/order.html');
  
});
  
router.get('/register'.toLowerCase(), function(req, res, next) {
  
  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/register.html');
});

module.exports = router;
