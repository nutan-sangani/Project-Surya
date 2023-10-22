const mongoose = require('mongoose');
const { CHATROOMSERVICE, MESSAGESERVICE, USERDATASERVICE } = require('../services');
const httpStatus = require('http-status');
const { getRes } = require('../utils/responseTemplate');


const CONTROLLER = {
    getAllChatAvailable : async(req,res,next) => {
        try{
            let page = req.query.page;
            let data=null;
            switch(page)
            {
                case "BOOKS":
                    {
                        const data = await USERDATASERVICE.getAcceptedBookUsers(req.user._id);
                        return res.status(httpStatus.OK).send(getRes(1,data,null,"CHATS FETCHED SUCCESSFULLY"));
                        break;
                    }
                    case "REQUESTS" :
                    {
                        const data = await USERDATASERVICE.getAcceptedRequests(req.user._id);
                        return res.status(httpStatus.OK).send(getRes(1,data,null,"CHATS FETCHED SUCCESSFULLY"));
                        break;
                    }
            }
            return res.status(httpStatus.OK).send(getRes(1,data,null,"ERROR, CONTACT developer on instagram at nutan_sangani_"));
        }
        catch(err){
            console.log(err);
            next(err);
        }
    },

    getChatRoomData : async(req,res,next) => {
        try{
            //chatRoomId will be of 24 chars, since 1 _id is of 12 numbers in mongodb.
            const chatRoomId = req.query.chatRoomId; //also yaha test laga, ki auth wala banda is one of the user, warna kisi ke bhi chat ko koi bhi access kar sakta hai.
            const userId = req.user._id.toString();
            console.log(userId);
            if(chatRoomId.length != 48) 
                return res.status(httpStatus.UNAUTHORIZED).send(getRes(0,null,"Enter a Valid ChatRoomId","Enter a Valid ChatRoomId"));
            if(chatRoomId.indexOf(userId)===-1 || chatRoomId.indexOf(userId)!==0 || chatRoomId.indexOf(userId)===24)
            //index 0 and 12 are checked, since maybe in very rare case, bich me kahi pe wo _id mili toh. (there a minute possibility).
            {
                return res.status(httpStatus.UNAUTHORIZED).send(getRes(0,null,"YOU ARE UNAUTHORIZED TO ACCESS THIS CHAT","YOU ARE UNAUTHORIZED TO ACCESS THIS CHAT"));
            }
            const chatRoomExists = await CHATROOMSERVICE.checkIfChatRoomExists(chatRoomId);
            if(chatRoomExists)
            {
                const chatRoomData = await CHATROOMSERVICE.getChatRoom(chatRoomId);
                return res.status(httpStatus.OK).send(getRes(1,chatRoomData,"ChatRoom Fetched Successfully","SUCCESS"));
            }
            else 
            {
                const chatRoom = await CHATROOMSERVICE.createChatRoom(chatRoomId);
                return res.status(httpStatus.OK).send(getRes(1,chatRoom,"ChatRoom Created Successfully","SUCCESS"));
            }
        }
        catch(err){
            console.log(err);
            next(err);
        }
    },

    addMessageToChatRoom : async(sender,receiver,msg,chatRoomId) => { //this won't be called by client, it will be called by our socket.server, thus iske params change hai.
    // addMessageToChatRoom : async(req,res,next) => {
        try{
            // let sender,receiver,msg,chatRoomId;
            // sender=req.body.sender;
            // receiver=req.body.receiver;
            // msg=req.body.msg;
            // chatRoomId=req.body.chatRoomId;
            const msgCreated = await MESSAGESERVICE.createMessage(sender,receiver,msg); 
            const ack = await CHATROOMSERVICE.addMessageToChatRoom(msgCreated._id,chatRoomId);
            return res.status(httpStatus.OK).send(getRes(1,msgCreated,null,));
            return ack;
        }
        catch(err){
            console.log(err);
            // next(err); //for testing purposes.
            throw new Error(err);
        }
    }
};

module.exports = CONTROLLER;
//needed routes and functions.
//1. fetch chatRoom data.  done
//2. add messages.
//3. fetch all available chatRooms. done
