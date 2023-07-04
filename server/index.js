const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const moment = require("moment");
const jwtStrategy = require("./config/passport");
const User = require("./models/user.model");
const routes = require("./routes");

const  app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/BookForAll")
       .then(()=> console.log("connected to db"))
       .catch((err) => console.log(err));

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use("/",routes);

app.listen(5000,function(err){
    if(err) console.log(err);
    else console.log("listening on port 5000");
});