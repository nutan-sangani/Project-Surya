const express = require("express");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router=express.Router();
const { config } = require("../config");
const auth = require("../middlewares/auth");
const {User} = require("../models");

router.post("/register",async function(req,res){
    console.log(req.body);
    const user = await User.insertMany({username:req.body.name,
    email:req.body.email,
    password:req.body.password})
    .catch((err) => console.log(err));
    const expires = moment().add(
        config.jwt.expiration_minute,
        'minutes',
      );
    const userId = user._id;
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
      };
      const tokens =await jwt.sign(payload,config.jwt.secret_key );
      res.status(200).send({user,tokens});
});

router.get('/secret',auth(),function(req,res){
    res.send("thjis is our secret");
});



module.exports = router;