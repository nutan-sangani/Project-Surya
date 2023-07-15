const { USERSERVICE } = require("../services");
const httpStatus = require("http-status");
const { getRes } = require("../utils/responseTemplate");

const CONTROLLER = {
    getUser : async(req,res,next) => {
        const user = req.user;
        return res.status(httpStatus.OK).send(getRes(1,{username:user.username,
            email:user.email,
            mobile:user.mobile,
            donated:user.donated.length,
            request:user.requests.length,
        },null,'User Fetched'));
    },

};

module.exports = CONTROLLER;