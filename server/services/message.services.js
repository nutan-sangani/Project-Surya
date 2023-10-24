const { Message } = require("../models");

const SERVICES = {
    createMessage : async(from,to,msg) =>{
        try{
            const message = await Message.create({to:to,from:from,message:msg});
            return message;
        }
        catch(err)
        {
            throw new Error(err);
        }
    },
};

module.exports = SERVICES;