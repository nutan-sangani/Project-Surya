const express = require("express");
const mongoose = require("mongoose");
const { connect,errorHandler,customError } = require('./utils');
const morgan = require('morgan');
const fileUpload = require('express-fileupload'); //used for getting formData from frontend in readable format
const jwt = require("jsonwebtoken");
const cors = require("cors");
const passport = require("passport");
const moment = require("moment");
const jwtStrategy = require("./config/passport");
const cloudinary = require('cloudinary').v2;

const { config } = require("./config");
const User = require("./models/user.model");
const routes = require("./routes");
const httpStatus = require("http-status");
const { errorMiddleware } = require('./middlewares');

const socketServer = require('./socket.server.js');

const  app = express();

app.use(morgan("tiny"));

app.use(express.json());

app.use(fileUpload());

app.use(cors());
app.options("*",cors());

connect();

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use("/",routes);

app.use(errorHandler);

//when the route is not found and error is also not raised, it means that the api endpoint does not exist
app.use((req, res, next) => {
    next(new customError('NOT_FOUND',httpStatus.NOT_FOUND,'Enter a valid API endpoint','NOT_FOUND'));
});

app.use(errorMiddleware.errorConverter); //converts Error to customError.

app.use(errorMiddleware.customErrorHandler); //generates res for customError.

const server = app.listen(config.port,function(err){
    if(err) console.log(err);
    else console.log(`listening on port ${config.port}`);
});

// const io=new Server(server,{
//     pingTimeout: 60000,
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

socketServer(server);


// io.on('connection',function(socket){
//     console.log("jai shree ram");
//     socket.on('chat message',(msg)=>{
//         console.log("hey there");
//     });
// });

//got to learn lots of new things about middlewares, especially error handling middlewares

//the most important one is, ki index me middlewares jis order me hote h, ussi order me request flows through them, if koi middleware pehle
// hi uspe response nhi de deta toh. (yani app.use() ka order matters).
//ngrok http --host-header=rewrite 3000