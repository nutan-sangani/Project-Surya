const dotenv = require("dotenv");
const path = require("path");

const envFile = `../.env.${process.env.NODE_ENV}`;
dotenv.config({path: path.join(__dirname,envFile)});
console.log(path.join(__dirname,envFile));

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
};