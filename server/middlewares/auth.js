const passport = require("passport");
const { customError } = require("../utils");

const cb = (req,res,next) => (err,user,info) =>
{
    if(!user)
    {
        let err = new customError('INVALID_TOKEN',401,'LOGIN AGAIN','ERROR');
        next(err);
    }
    req.user=user;
    next();
}

const auth = () => (req,res,next) => {
        passport.authenticate('jwt',{session:false},cb(req,res,next))(req,res,next);
    };

module.exports = auth;