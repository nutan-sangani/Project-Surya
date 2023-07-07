const mongoose = require("mongoose");

const userSchema = {
    username : String,
    mobile : String,
    email : {
        type : String,
        required : true,
    },
    password : {
        type: String,
        required : true,
    },
};

const User = mongoose.model('User',userSchema);
module.exports = User;