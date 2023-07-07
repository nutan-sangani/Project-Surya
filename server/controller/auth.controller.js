const mongoose = require("mongoose");
const moment = require("moment");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user.model");
const { AuthServices } = require("../services");

const CONTROLLER = {
    register : async (req,res) => {
        const user = await AuthServices.createUser(req.body);
        const userId = user._id;
        const expires = moment().add(config.jwt.expirationTime,'minutes');
        const payload = {
            sub:userId,
            iat:moment.unix(),
            exp:expires.unix(),
        };
        const token = await jwt.sign(payload, config.jwt.secretKey);
        return res.status(200).send({success:true,user : user,token:token});
    },

};

module.exports = CONTOLLER;