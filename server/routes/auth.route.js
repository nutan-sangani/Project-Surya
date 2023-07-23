const express = require("express");
// const jwt = require("jsonwebtoken");
// const passport = require("passport");
const router=express.Router();
const { AuthController } = require('../controller');

router.post('/register',AuthController.register);

router.post('/login',AuthController.login);

// router.get('/secret',auth(),function(req,res){
//     return res.send("this is our secret");
// });

// router.get('/plugin',AuthController.plugin);

module.exports = router;
