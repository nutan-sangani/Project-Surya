const mongoose = require('mongoose');
const paginate = require('./plugins/paginate.plugin');

const requestSchema = new mongoose.Schema({
    book :{
        type : mongoose.Types.ObjectId,
        required:true,
        ref: 'books',
    },
    donor :{
        type: mongoose.Types.ObjectId,
        required:true,
        ref: 'users',
    },
    sender: {
        type: mongoose.Types.ObjectId,
        required : true,
        ref: 'users',
    },
    isAccepted : {
        type : Boolean,
        default : false,
    },
    isRejected : {
        type : Boolean,
        default : false,
    },
},{timestamps:true});

requestSchema.plugin(paginate);

const Request = new mongoose.model('Request',requestSchema);

module.exports = Request;
