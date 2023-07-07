const express = require("express");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const router=express.Router();
const auth = require("../middlewares/auth");
const {User} = require("../models");
const passport = require("passport");

router.post("/register",async function(req,res){
    console.log(req.body);
    const user = await User.insertMany({username:req.body.name,
    email:req.body.email,
    password:req.body.password})
    .catch((err) => console.log(err));
    const expires = moment().add(
        2000,
        'minutes',
      );
    const userId = user._id;
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
      };
      const tokens =await jwt.sign(payload, "my_website_secret");
      res.status(200).send({user,tokens});
});

router.get('/secret',auth(),function(req,res){
    res.send("thjis is our secret");
});

module.exports = router;