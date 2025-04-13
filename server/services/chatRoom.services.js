const { ChatRoom } = require('../models');

const deleteExtraMessages = async(chatRoomId) => { //called when msg > 150 only. (so we will have to delete 51 msg).
    try{
        const roomData = await ChatRoom.findOne({roomId:chatRoomId});
        const msg = roomData.messages;
        const allowedMsg = new Array[100];
        let count=0;
        let messageOverFlowLimit = 51;
        let i=0;
        msg.forEach((message) => {
            count=count+1;
            if(count>messageOverFlowLimit && i<100)
            {
                allowedMsg[i]=message;
                i=i+1;
            }
        });
        const ack = await ChatRoom.findOneAndUpdate({roomId:chatRoomId},{$set:{messages:allowedMsg,messageCount:100}},{returnOriginal:false});
        return ack;
    }
    catch(err){
        throw new Error(err);
    }
};


const SERVICES = {
    checkIfChatRoomExists : async(chatRoomId) => {
        try{
            const data = await ChatRoom.findOne({roomId:chatRoomId});
            if(data!=null) return true;
            return false;
        }
        catch(err)
        {
            throw new Error(err);
        }
    },

    createChatRoom : async(chatRoomId) => {
        try{
            const chatRoom = await ChatRoom.create({roomId:chatRoomId,messageCount:0});
            return chatRoom;
        }
        catch(err)
        {
            throw new Error(err);
        }
    },

    getChatRoom : async(chatRoomId) => {
        try
        {
            const chatRoom = await ChatRoom.findOne({roomId:chatRoomId}).populate({path:'messages'});
            return chatRoom;
        }
        catch(err)
        {
            throw new Error(err);
        }
    },

    addMessageToChatRoom : async(messageId,chatRoomId) => {
        try{
            let ack = await ChatRoom.findOneAndUpdate({roomId:chatRoomId},{$push:{messages:messageId},$inc: { messageCount: 1 }},{upsert:true,new:true},{returnOriginal:false});
            if(ack.messageCount>150)
            {
                ack = await deleteExtraMessages(chatRoomId);
            }
            return ack;
        }
        catch(err)
        {
            throw new Error(err);
        }
    },

};

module.exports = SERVICES;

//things to be added here,
//1. add msg to chatRoom (if chatroom is already there).
//2. create a chatRoom (when CR does not exist).
//3. delete chatRoom (make it invisible).
//4. get all messages from the chatroom.
//5. check if more than 120 msg's and if yes than delete 20 msg's (checking to be done with fetched msg from 4).

//Deletion k liye rule, agr 100+ pe 1 delete, toh ye expensive operation bar bar krna padega, usse acha, 
//set limit to 150, than jese hi 150+ msg hote, toh 50 msg's delete krde. (ie something like reduction in capacity in vector).
//and show in frontend that only 100 msg will be stored.
