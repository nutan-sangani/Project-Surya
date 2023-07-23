const mongoose = require('mongoose');
const paginate = require('./plugins/paginate.plugin');

const requestSchema = new mongoose.Schema({
    book :{
        type : mongoose.Types.ObjectId,
        required:true,
        ref: 'books',
    },
    contact_info : {
        type:String,
        required:false,
        default:'Not Provided',
    },
    institute :{
        type:String,
        required:true,
    },
    location :{
        type:String,
        required:false,
        default:'Not Provided',
    },
    city :{
        type:String,
        required:true,
    },
    proof:{
        type:String,
        required:true,
    },
    donor :{
        type: mongoose.Types.ObjectId,
        required:true,
        ref: 'users',
    },
    message : {
        type: String,
        required:false,
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
