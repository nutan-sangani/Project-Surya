const mongoose = require("mongoose");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const { JWT } = require('../utils');
const { User } = require("../models");
const { USERSERVICE } = require("../services");
const httpStatus = require("http-status");
const { getRes } = require("../utils/responseTemplate");

const CONTROLLER = {
    register : async (req,res,next) => {
        try{
            let tokens,user;
            user = await USERSERVICE.createUser(req.body);
            tokens = await JWT.generateToken(user._id);
            return res.status(httpStatus.CREATED).send(getRes(1,{token:tokens,user:user},null,'User created Successfully'));
        }
        catch(err){
            next(err);
        }
    },
    login : async (req,res,next) => {
        try{
            const user = await USERSERVICE.findUserByEmail(req.body.email);
            if(user)
            {
                const passMatch = await user.isPasswordMatch(req.body.password);
                if(passMatch)
                {
                    tokens = await JWT.generateToken(user._id);
                    return res.status(httpStatus.OK).send(getRes(1,{token:tokens,user:user},null,'Logged in Successfully'));
                }
                else return res.status(httpStatus.UNAUTHORIZED).send(getRes(0,null,'INCORRECT_PASSWORD_ERROR','Password is incorrect try again','INCORRECT_PASSWORD_ERROR'));
            }
            return res.status(httpStatus.NOT_FOUND).send(getRes(0,null,'USER_NOT_FOUND','Enter a valid Email id','USER_NOT_FOUND_ERROR'));
        }
        catch(err){
            next(err);
        }
    },

    plugin : async (req,res) =>{
        await User.paginate(null,{sortBy:req.query.sortBy});
        // const data = await User.find({});
        return res.send('success');
    }

};

module.exports = CONTROLLER;
