const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const httpStatus = require('http-status');
const User = require("../models/user.model");
const { customError } = require('../utils');
const { config } = require("./");

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwt.secret_key;

const jwtStrategy = new JwtStrategy(opts, async function(jwt_payload, done) {
    let user=null ;
    let err=null;
    await User.findOne({_id: jwt_payload.sub})
              .then((found_item)=>user=found_item)
              .catch((error)=> err=error);
    if(err)
    {
        return done(err,false);
    }
    if(user)
        return done(null,user);
    else
    {
        const error = new customError('USER_NOT_FOUND_ERROR',httpStatus.NOT_FOUND,'User may have been deleted, try registering again','USER_NOT_FOUND')
        return done(error,false); //ie error nhi h and user bhi nhi h, means user exist hi nhi krta.
    } 
});

module.exports = jwtStrategy;
