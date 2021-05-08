//Dependecies
//jshint esversion: 8
const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const passport = require('passport');
require('../../config/passport')(passport)

//imported variables
const {signupHandler,loginHandler,confirmUserHandler,signoutHandler, isAdmin,adminHandler,forgotPasswordHandler,resetPasswordHandler} = require('../../controllers/main/auth');
const {registerEvent} = require('../../controllers/main/event');
const {getUserById} = require('../../controllers/main/user');


//params
router.param("userId",getUserById);


//routes


// Public Post notprotected
// to get signup details of the user
router.post('/signup',[
    check("name")
    .isLength({ min: 4 })
    .withMessage("name should be at least 3 char")
    .isAlpha()
    .withMessage("Name should only contains A-Z"),
    check("email", "Please provide a valid email").isEmail(),
    check("phoneNumber")
    .isLength({ min: 10,max:10 })
    .withMessage("Phone number should be 10 char long")
    .isNumeric()
    .withMessage("phone number should be numeric"),
    check("plainPassword", "password should be at least 5 character long")
    .isLength({ min: 5 })
    ],signupHandler);


// Private Get notprotected
// To get the user to sign out
router.get("/signout", signoutHandler);

//public post  not protected
// to allow user to login
router.post('/login',[
    check("email", "Please provide a valid email")
    .isEmail(),
    check("plainPassword", "password should be at least 5 character long")
    .isLength({ min: 5 })
],loginHandler);


//Private get notprotected
// to allow email confiramtion
router.get('/confirmation/:userId',confirmUserHandler);

//private get protected 
//to redirect a user to admin panel
router.get('/admin',passport.authenticate('jwt',{session: false}),isAdmin,adminHandler);

router.get('/secure', passport.authenticate('jwt',{session: false}),  (req, res) => {
    res.json({
        username: req.user.name
    });
});



router.post('/forgotpassword',[
    check("email", "Please provide a valid email")
    .isEmail()],forgotPasswordHandler);

    
router.post('/resetpassword/:userId',[
    check("plainPassword", "password should be at least 5 character long")
    .isLength({ min: 5 })],resetPasswordHandler);
module.exports = router; 