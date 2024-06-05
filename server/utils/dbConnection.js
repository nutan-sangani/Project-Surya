const mongoose = require("mongoose");
const { config } = require("../config");

const connect = ()=> {
    // console.log(config.mongodb.url);
    mongoose.connect(config.mongodb.url)
            .then(()=>console.log('mongoDb connected'))
            .catch((err)=>{
                console.log(config.mongodb.url);
                console.log(err)
            });
};

module.exports = connect;