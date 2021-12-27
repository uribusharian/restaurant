var express = require('express');
const DB = require('../services/db')
var router = express.Router();


  const dataBase = new DB

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/home.html');

});
router.get('/home', function(req, res, next) {
  
  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/home.html');

});

router.get('/index', function(req, res, next) {
  
  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/index.html');

});

router.get('/login', function(req, res, next) {
  
  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/login.html');

});

router.get('/menu', function(req, res, next) {
  
  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/menu.html');

});

router.get('/order', function(req, res, next) {
  
  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/order');
  
});
  
router.get('/register', function(req, res, next) {
  
  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/register');
});

router.get('/', (req, res)=>{
  res.render('views/register'), {
      viewTitle : "Insert User"
    };
});

router.post('/register', (req,res)=> {
   dataBase.registerUser (req.body)
    res.redirect("/");
});

  router.post('/login', (req,res)=> {
    let email = (req.body.email)
    let password = (req.body.password)
    
    
     dataBase.checkPassword(email, password).then( (value)=> {
       
   
     if (value==true ){
    res.redirect("/homelogged.html")
    console.log("it worked!")
  }
  else{
    res.redirect("/login");
    
  }}
  )});



module.exports = router;
