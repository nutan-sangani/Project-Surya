const mongoose = require("mongoose");
const { UserData } = require("../models");
const { customError } = require("../utils");

//deletion would be a costly operation

const getPopulatedUserBooks = async(userId,populationField) => {
    try{
        const ud = await UserData.findOne({userId:userId}).populate({path:populationField,populate:{path:'receiver'}});
        return ud; 
    }
    catch(err){
        throw new Error(err);
    }
};

const getPopulatedUserReqs = async(userId) => {
    try{
        const ud = await UserData.findOne({userId:userId}).populate({path:'requests',populate:{path:'book donor'}});
        return ud;
    }
    catch(err){
        throw new Error(err);
    }
};

const SERVICES = {
    getAcceptedBookUsers : async(userId) => {
        const userData = await getPopulatedUserBooks(userId,'donated');
        const donated = userData.donated;
        let AcceptedBooks = [];
        donated.forEach((book) => {
            if(book.isTaken)
            {
                AcceptedBooks.push(book);
            }
        });
        //so struct of accBooks is : [{books : {receiver : {name,institute,etc}}},{books : {receiver : {name,institute,etc}}},...]
        return AcceptedBooks;
    },

    getAcceptedRequests : async(userId) => {
        const userData = await getPopulatedUserReqs(userId);
        const req = userData.requests;
        let AcceptedRequests = [];
        req.forEach((request)=>{
            if(request.isAccepted)
            {
                AcceptedRequests.push(request);
            }
        });
        return AcceptedRequests;
    },

    addUserBook : async (userId,bookId) => {
        try{
            const ack = await UserData.findOneAndUpdate({userId:userId},{$push : { donated : bookId}},{upsert:true,new:true});
            console.log("heelllloooo"+ack);
            return ack;
        }
        catch(err)
        {
            throw new Error(err);
        }
    },

    addUserRequest : async(userId,requestId) => {
        try{
            const ack = await UserData.findOneAndUpdate({userId:userId},{$push : { requests : requestId}},{upsert:true,new:true});
            return ack;
        }
        catch(err)
        {
            throw new Error(err);
        }
    },

    //remove book and req options
};

module.exports = SERVICES;