const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const { User } = require("../models");
const { customError } = require("../utils");

const SERVICES = {
    createUser : async (userData) => {
        if(await User.isEmailTaken(userData.email))
            throw new customError('REGISTRATION_ERROR',200,'A User with this Email already exists','REGISTRATION_ERROR');
        if(await User.isMobileTaken(userData.mobile))
            throw new customError('REGISTRATION_ERROR',200,'A User with this Mobile number already exists','REGISTRATION_ERROR');
        const user = await User.create(userData);
        return user;
    },
    findUserByEmail : async (email) => {
        return await User.findOne({email:email});
    },
    
    getUserById : async(userId) =>{
        return await User.findOne(userId);
    },

    addBookId : async(userId,bookId,field) => {
        if(field==='donated')
        {
            const user = await User.findOneAndUpdate({_id:userId},{$push:{donated:bookId}},{ upsert: true, new: true });
            //upsert and new are true, which will help to push to empty arrays (ie if they are empty).
            return user;
        }
        else if(field==='requests')
        {
            const user = await User.findOneAndUpdate({_id:userId},{$push:{requests:bookId}},{ upsert: true, new: true });
            return user;
        }
        else return null;
    }
};

module.exports = SERVICES;