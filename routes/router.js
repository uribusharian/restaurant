const express = require('express');
const DB = require('../services/db')
const jwt = require('jsonwebtoken');
const { options } = require('mongoose/lib/utils');
const { version } = require('moment');
const { findOne } = require('mongoose/lib/model');
const cookieParser = require('cookie-parser');
const { clear } = require('mongoose/lib/helpers/specialProperties');
const { request } = require('express');
const router = express.Router();
require('dotenv').config();

const app = express();
app.use(express.json())
app.use(cookieParser())

const dataBase = new DB

// routes are unprotected, you dont need a user to get to these routes

router.get('/', function (req, res, next) {

  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/home.html');

});
router.get('/home', function (req, res, next) {

  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/home.html');

});
router.get('/login', function (req, res, next) {

  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/login.html');

});
router.get('/menu', function (req, res, next) {

  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/menu.html');

});

router.get('/register', function (req, res, next) {

  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/register');
});


// protected routes. you'll need to login to access those routes 



router.get('/admin', verifyToken, function (req, res, next) {

  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/admin.html');
});

router.get('/orders', verifyToken, function (req, res, next) {

  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/orders.html');

});

router.get('/userInfo', verifyToken, async function (req, res, next) {
  console.log("user info")
  const user = await dataBase.findOneUser(req.query.email)
  if (req.query.email == undefined)
    res.json({ username: "Guest" })
  else {
    try {
      res.json(user);
    }
    catch (e) {
      console.log(e);
      return { err: e.message }
    }

  }
});
router.post('/addDish', verifyToken, async function (req, res, next) {
  await dataBase.addDishToMenu(req.body)

  res.json(await dataBase.dynamicMenu());
});


router.get('/index', verifyToken, function (req, res, next) {

  res.sendFile('/home/uri/Desktop/NodeJS/final project/final project - solution/views/index.html');

});





router.post('/register',async (req, res) => {

  if (await dataBase.registerUser(req.body)==false){
    res.status(409).send("user exists")
  }
  else{

    res.redirect("/login")
  }    
});



router.post('/login', (req, res) => {
  console.log("login")
  let password = req.body.password
  let email = req.body.email
  dataBase.checkPassword(email, password)
    .then((user) => {

      if (user) {

        jwt.sign({ user }, process.env.secretToken, { expiresIn: "300s" }, (err, token) => {
          if (err) {
            res.redirect("/login");
          }
          else {

            res.cookie("authorization", token, { httpOnly: true, secure: true, maxAge: 300 * 1000 })
            res.cookie("email", email)
            res.redirect("/home")
          }
        })
      }
      else {
        res.redirect("/login");
      }
    })
});



function verifyToken(req, res, next) {
  const bearerHeader = req.headers.cookie

  if (!bearerHeader) { return res.redirect('/login') }
  const bearer = bearerHeader.split(';');

  let token
  for (i = 0; i < bearer.length; i++) {
    const cookie = bearer[i].split("=")

    if (cookie[0] === " authorization") {
      token = cookie[1]

      break
    }
  }


  if (token == null) {
    return res.redirect('/login');
  }
  else {
    jwt.verify(token, process.env.secretToken, (err, user) => {
      if (err) {
        return res.redirect('/login')
      }
      else {
        req.user = user
        next()
      }
    })
  };
};

router.get('/logout', (req, res) => {

  res.clearCookie("authorization")
  res.clearCookie("email")
  res.redirect("/login")
});

router.get('/menu2',async (req, res) => {
  res.json(await dataBase.dynamicMenu())

});


module.exports = router;