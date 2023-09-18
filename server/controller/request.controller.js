const mongoose = require('mongoose');
const { REQUESTSERVICE } = require('../services');
const { uploadImg } = require('../utils');
const httpStatus = require('http-status');
const { getRes } = require('../utils/responseTemplate');

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
            const filter={book:bookId,donor:userId,isRejected:false};
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

};
module.exports = CONTROLLER;