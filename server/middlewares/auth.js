const passport = require("passport");

const auth = () => (req,res,next) => {
        passport.authenticate('jwt',{session:false})(req,res,next);
    };

module.exports = auth;