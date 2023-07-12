const express = require("express");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router=express.Router();
const { config } = require("../config");
const auth = require("../middlewares/auth");
const {User} = require("../models");
const { AuthController } = require('../controller');

router.post('/register',AuthController.register);

router.post('/login',AuthController.login);

router.get('/secret',auth(),function(req,res){
    return res.send("this is our secret");
});

module.exports = router;
