const mongoose = require("mongoose");
const { User } = require("../models");
const { customError } = require("../utils");
const { USERDATASERVICE } = require(".");

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

    addBook : async function (userId,bookId,field) {
        if(field==='donated')
        {
            // const user = await User.findOneAndUpdate({_id:userId},{$push:{donated:bookId}},{ upsert: true, new: true });
            //upsert and new are true, which will help to push to empty arrays (ie if they are empty).
            const user = await this.getUserById(userId);
            let donated = user.donated+1;
            const updated = await this.updateUser(userId,{donated:donated});
            return updated;
        }
        else return null;
    },

    updateUser : async(userId,updateBody) => {
        const user = await User.findOneAndUpdate({_id:userId},updateBody);
        return user;
    }
};

module.exports = SERVICES;