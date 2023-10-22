const mongoose = require('mongoose');
const paginate = require('./plugins/paginate.plugin');

const chatRoomSchema = new mongoose.Schema({
    roomId:{
        type:String,
        required:true,
        index:true,
    },
    messages:{
        type:[mongoose.Types.ObjectId], //no need to enter sorted values, since nikalte waqt sort krlenge.
        required:true,
        ref:'Message',
        default:[],
    },
    isHidden:{
        type:Boolean,
        required:true,
        default:false,
    },
    messageCount:{
        type:Number,
        required:true,
        default:0,
    },
});

chatRoomSchema.plugin(paginate);

const ChatRoom = new mongoose.model('ChatRoom',chatRoomSchema);

module.exports = ChatRoom;
