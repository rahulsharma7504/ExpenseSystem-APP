const express=require('express');

const router=express();
const cors=require('cors');
router.use(cors());
const session = require('express-session');
const config=require('../Config/config')



router.use(session({
    secret: config.key, // Secret key for session encryption (change this)
    resave: false,
    saveUninitialized: false
  }));

const UserController=require('../Controller/userController')


router.post('/register',UserController.RegisterUser)


    
router.post('/login',UserController.LoginUser)


module.exports = router

