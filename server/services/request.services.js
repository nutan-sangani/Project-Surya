const mongoose = require('mongoose');
const { Request } = require('../models');

const SERVICES = {
    createRequest : async(reqBody) => {
        const req = await Request.create(reqBody);
        return req;
    },

    checkIfExist : async(userId,bookId) => {
        const req = await Request.findOne({book:bookId,sender:userId});
        return req;
    },

    getPaginatedReq : async(options,filter={}) => {
        const req = await Request.paginate(filter,options);
        console.log(req);
        return req;
    },

    getRequests : async(filter={},next) => {
        try{
            let requests = await Request.find(filter);
            return requests;
        }
        catch(err)
        {
            throw err;
        }
    },

    setStatus: async (statusTo,requestId) => {
        try
        {
            if(statusTo==="ACCEPTED")
            {
                const req = await Request.findOneAndUpdate({_id:requestId},{isAccepted:true,isPending:false,isRejected:false});
                return req;
            }
            else if(statusTo==="REJECTED")
            {
                const req = await Request.findOneAndUpdate({_id:requestId},{isRejected:true,isPending:false,isAccepted:false});
                return req;
            }
        }
        catch(err)
        {
            throw err;
        }
    }
};

module.exports = SERVICES;