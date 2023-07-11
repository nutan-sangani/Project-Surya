const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../models/user.model");
const { config } = require("./");

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwt.secret_key;

const jwtStrategy = new JwtStrategy(opts, async function(jwt_payload, done) {
    let user=null ;
    let err=null;
    await User.findOne({id: jwt_payload.sub})
              .then((found_item)=>user=found_item)
              .catch((error)=> err=error);
    if(err)
    {
        return done(err,false);
    }
    if(user)
        return done(null,user);
    else return done("user not found",false); //ie error nhi h and user bhi nhi h, means user exist hi nhi krta.
});

module.exports = jwtStrategy;
