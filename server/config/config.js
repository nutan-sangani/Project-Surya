// const dotenv = require("dotenv");
// const path = require("path");

// const envFile = `../.env.${process.env.NODE_ENV}`;
// dotenv.config({path: path.join(__dirname,envFile)});

require('dotenv').config();

module.exports = {
    jwt:{
        secret_key:process.env.JWT_SECRET_KEY,
        expiration_minute:process.env.JWT_EXPIRATION_MINUTES
    },
    mongodb:{
        env:process.env.NODE_ENV,
        url:process.env.MONGO_DB_URL,
    },
    port:process.env.PORT,
    cloudinary:{
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    },
    cors:{
        origin:process.env.ORIGIN,
    },
    pingTimeout: process.env.PINGTO,
};