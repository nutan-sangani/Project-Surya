const { USERSERVICE, BOOKSERVICE, REQUESTSERVICE } = require("../services");
const httpStatus = require("http-status");
const { getRes } = require("../utils/responseTemplate");
const mongoose = require('mongoose');

const CONTROLLER = {
    getUser : async(req,res,next) => {
        const user = req.user;
        return res.status(httpStatus.OK).send(getRes(1,{username:user.username,
            email:user.email,
            mobile:user.mobile,
            donated:user.donated,
            requests:user.requests,
        },null,'User Fetched'));
    },

    getUserBooks : async(req,res,next) => { //here we didn't use donated in user, since we need paginated results. and donated would contain all the results
        try{
            const options = req.query;
            options.populate={path:'donor',select:'username institute donated _id'}
            const userId = new mongoose.Types.ObjectId(req.user._id);
            const books = await BOOKSERVICE.getPaginatedBooks(options,{donor:userId});
            if(books.results.length==0)
                res.send(getRes(0,null,null,'No books Found'));
            res.status(httpStatus.FOUND).send(getRes(1,books,null,'Books successfully fetched'));
        }
        catch(err){
            console.error(err);
            next(err);
        }
    },

    getUserRequests : async(req,res,next) => {
        try{
            let filter={};
            switch(req.query.requestType)
            {
                case "REJECTED" :
                    filter.isRejected=true;
                    break;
                case "ACCEPTED" :
                    filter.isAccepted=true;
                    break;
                case "PENDING" :
                    filter.isPending=true;
                    break;
            }
            filter.sender=req.user._id;
            let options={page:req.query.page,limit:req.query.limit};
            options.populate={path:'book', select:'title board course city img'};
            let userRequestsAll=await REQUESTSERVICE.getPaginatedReq(options,filter);
            res.send(getRes(1,userRequestsAll,null,"User Requests Fetched"));
        }
        catch(err)
        {
            console.log(err);
            next(err);
        }
    }

};

module.exports = CONTROLLER;