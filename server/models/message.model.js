const mongoose = require('mongoose');
const paginate = require('./plugins/paginate.plugin');

const msgSchema = new mongoose.Schema({
    from:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'User',
    },
    to:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'User',
    },
    message:{
        type:String,
        required:true,
    }
},{timestamps:true});

msgSchema.plugin(paginate);

const Message = new mongoose.model('Message',msgSchema);

module.exports = Message;
