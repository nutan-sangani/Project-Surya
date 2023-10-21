const mongoose = require('mongoose');
const paginate = require('./plugins/paginate.plugin');

const userDataSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'User',
        index:true,
    },
    donated:{
        type:[mongoose.Types.ObjectId],
        required:true,
        ref:'Book',
        default:[],
    },
    requests:{
        type:[mongoose.Types.ObjectId],
        required:true,
        ref:'Request',
        default:[],
    },
});

userDataSchema.plugin(paginate);

const UserData = new mongoose.model('UserData',userDataSchema);

module.exports = UserData;
