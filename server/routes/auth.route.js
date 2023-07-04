const express = require("express");
const router=express.Router();

router.post("/register",async function(req,res){
    const user = await User.insertMany({username:req.body.name,
    email:req.body.email,
    password:req.body.password})
    .catch((err) => console.log(err));
    const expires = moment().add(
        25,
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

router.get('/secret',passport.authenticate('jwt',{session:false}),function(req,res){
    console.log(res,req);
    res.send("thjis is our secret");
});

module.exports = router;