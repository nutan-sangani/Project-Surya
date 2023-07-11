const mongoose = require("mongoose");
const { config } = require("../config");

const connect = ()=> {
    mongoose.connect(config.mongodb.url)
            .then(()=>console.log('mongoDb connected'))
            .catch((err)=>console.log(err));
};

module.exports = connect;