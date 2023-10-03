const mongoose = require('mongoose');
const { REQUESTSERVICE, BOOKSERVICE } = require('../services');
const { uploadImg } = require('../utils');
const httpStatus = require('http-status');
const { getRes } = require('../utils/responseTemplate');

const rejectAllRequestsExceptCurrent =  async function(requestId,bookId,userId) {
    try{
        let filter={
        book:bookId,
        donor:userId,
        _id:{$ne : requestId},
        };
        let requests=await REQUESTSERVICE.getRequests(filter);
        requests.forEach(async (request) => {
            await REQUESTSERVICE.setStatus("REJECTED",request._id);
        });
        return null;
    }
    catch(err)
    {
        throw err;
    }
};

const CONTROLLER = {
    addRequest : async (req,res,next) => {
        try{
            const reqData=req.body;
            reqData.sender = new mongoose.Types.ObjectId(req.user._id);
            reqData.donor = new mongoose.Types.ObjectId(req.body.donor);
            if(req.user._id.toString() === req.body.donor.toString()) 
                return res.send(getRes(0,null,'OWN_BOOK','You cannot request for books donated by yourself'));
            reqData.book = new mongoose.Types.ObjectId(req.body.book);
            const req1 = await REQUESTSERVICE.checkIfExist(reqData.sender,reqData.book);
            if(req1)
            {
                return res.status(httpStatus.OK).send(getRes(0,null,'ALREADY_EXIST','You have already requested this book, see your requests'));
            }
            const bin_data = req.files.image.data;
            const file_type = req.files.image.mimetype;
            const img_url = await uploadImg(bin_data,file_type);
            reqData.proof=img_url.secure_url;
            const request = await REQUESTSERVICE.createRequest(reqData);
            return res.status(httpStatus.CREATED).send(getRes(1,request,null,'Request added successfully'));
        }
        catch(err){
            console.log(err);
            next(err);
        }
    },

    requestForBookId: async(req,res,next) => {
        try{
            const bookId=new mongoose.Types.ObjectId(req.query.bookId);
            const userId=req.user._id;
            const requestType=req.query.requestType;
            let filter={book:bookId,donor:userId,}; //conditions are remaining
            switch(requestType)
            {
                case "PENDING" :
                    filter.isPending=true;
                    break;
                case "ACCEPTED" :
                    filter.isAccepted=true;
                    break;
                case "REJECTED":
                    filter.isRejected=true;
                    break;
            }
            let options = {};
            options.limit=req.query.limit;
            options.page=req.query.page;
            options.populate={path:'sender',select:'username'};
            const requests = await REQUESTSERVICE.getPaginatedReq(options,filter);
            res.send(getRes(1,requests,null,'Requests fetched successfully'));
        }
        catch(err){
            console.error(err);
            next(err);
        }
    },

    test : async function (req,res,next)  {
        try{
            // const requestId=new mongoose.Types.ObjectId(req.body.requestId);
            // // const statusTo=req.body.statusTo;
            // const userId=req.user._id;
            // const bookId=new mongoose.Types.ObjectId(req.body.bookId);
            // const get = await rejectAllRequestsExceptCurrent(requestId,bookId,userId);
            // res.send(getRes(1,null,null,'Requests fetched successfully'));
        }
        catch(err)
        {
            console.error(err);
            next(err);
        }
    },

    changeRequestStatus: async(req,res,next) => {
        try{
            const requestId=req.body.requestId;
            const statusTo=req.body.statusTo;
            const userId=req.user._id;
            const bookId=new mongoose.Types.ObjectId(req.body.bookId);
            switch(statusTo)
            {
                case "ACCEPTED" :
                    {
                        await rejectAllRequestsExceptCurrent(requestId,bookId,userId); //we will also need to make this book taken.
                        const receiverId=await REQUESTSERVICE.getSender(requestId);
                        await BOOKSERVICE.markTaken(bookId,receiverId,true,requestId); //true means mark taken
                        await REQUESTSERVICE.setStatus(statusTo,requestId);
                        break;
                    }
                case "REJECTED" :
                    { //handling the case, that if the current book is taken by this same sender, than bring it back on the market for users to request
                        const accptReqId=(await BOOKSERVICE.getRequestId(bookId)).toString();
                        if(requestId===accptReqId)
                        {
                            await BOOKSERVICE.markTaken(bookId,null,false,null); //true means mark taken
                        }
                        else break;
                    }
            }
            await REQUESTSERVICE.setStatus(statusTo,requestId);
            res.status(httpStatus.OK).send(getRes(1,null,null,"Request "+statusTo+" successfully"));
        }
        catch(err){
            console.error(err);
            next(err);
        }
    },

};
module.exports = CONTROLLER;