const mongoose = require('mongoose');
const paginate = require('./plugins/paginate.plugin');

const userDataSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'User',
    },
    donated:{
        types:[mongoose.Types.ObjectId],
        default:[],
        ref:'Book',
    },
    requests:{
        types:[mongoose.Types.ObjectId],
        default:[],
        ref:'Request',
    },
});

userDataSchema.plugin(paginate);

const UserData = mongoose.model('userData',userDataSchema);

module.exports = UserData;
