const mongoose = require('mongoose');
const { REQUESTSERVICE } = require('../services');
const { uploadImg } = require('../utils');
const httpStatus = require('http-status');
const { getRes } = require('../utils/responseTemplate');

const CONTROLLER = {
    addRequest : async (req,res,next) => {
        try{
            const bin_data = req.files.image.data;
            const file_type = req.files.image.mimetype;
            const img_url = await uploadImg(bin_data,file_type);
            const reqData=req.body;
            reqData.proof=img_url.secure_url;
            reqData.sender = new mongoose.Types.ObjectId(req.user._id);
            reqData.donor = new mongoose.Types.ObjectId(req.body.donor);
            reqData.book = new mongoose.Types.ObjectId(req.body.book);
            const request = await REQUESTSERVICE.createRequest(reqData);
            res.status(httpStatus.CREATED).send(getRes(1,request,null,'Request added successfully'));
        }
        catch(err){
            console.log(err);
            next(err);
        }
    },
};
module.exports = CONTROLLER;