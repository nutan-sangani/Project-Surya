const { USERSERVICE } = require("../services");
const httpStatus = require("http-status");
const { getRes } = require("../utils/responseTemplate");

const CONTROLLER = {
    getUser : async(req,res,next) => {
        const user = req.user;
        console.log('logged in');
        return res.status(httpStatus.OK).send(getRes(1,{username:user.username,
            email:user.email,
            mobile:user.mobile,
            donated:user.donated,
            requests:user.requests,
        },null,'User Fetched'));
    },

};

module.exports = CONTROLLER;