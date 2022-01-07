const express = require('express');
const DB = require('../services/db')
const jwt = require('jsonwebtoken'); 
const { options } = require('mongoose/lib/utils');
const { version } = require('moment');
const { findOne } = require('mongoose/lib/model');
const cookieParser = require('cookie-parser')
const router = express.Router();
require('dotenv').config();

const app = express();
app.use(express.json())
app.use(cookieParser())

const dataBase = new DB

// routes are unprotected, you dont need a user to get to these routes

router.get('/', function(req, res, next) {
  
  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/home.html');

});
router.get('/home', function(req, res, next) {
  
  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/home.html');

});
router.get('/login', function(req, res, next) {
  
  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/login.html');

});
router.get('/menu', function(req, res, next) {
  
  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/menu.html');

});

router.get('/register', function(req, res, next) {
  
  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/register');
});

// protected routes. you'll need to login to access those routes 




router.get('/orders', verifyToken, function(req, res, next) {
  
  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/orders.html');
  
});
router.get('/index', verifyToken, function(req, res, next) {
  
  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/index.html');
  
});
router.get('/logged', verifyToken,function(req, res, next) {
 
  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/logged.html');
  
});
  



router.post('/register', (req,res)=> {
   dataBase.registerUser (req.body)
    res.redirect("/login")
});

router.post('/login', (req,res)=> {
  let email = req.body.email
  let password =req.body.password
    dataBase.checkPassword(email, password)
    .then( (user)=> {
      
     if (user ){

      jwt.sign(user.toString(),process.env.secretToken,(err,token)=>{
        if(err) {
          console.log(err)
        }
        else {
          console.log("it worked!")
          res.cookie("authorization",token, {httpOnly:true} )
          res.redirect("/logged")
        }
      })
    } 
    else{
    res.redirect("/login");
    }
  })
});



 function verifyToken(req, res, next) {
                         
   console.log("verifyToken")
   
   const bearerHeader= req.headers.cookie

   if(!bearerHeader){  return res.sendStatus(403)}
   
   const bearer = bearerHeader.split('=');
    const token = bearer[1];
    if(token==null){
      return res.sendStatus(403);
    }
    else {
    
    jwt.verify(token,process.env.secretToken,(err,user)=>{
      if(err){
        return res.sendStatus(403)
      }
      else{
        req.user = user
        next()
      }
    })
  };
};                        
  


module.exports = router;
