const mongoose = require("mongoose");
const {Book} = require("../models");
const { customError } = require("../utils");


const SERVICES = {
    getBook : async(filter) => {
        return await Book.findOne(filter);
    },

    addBook : async(formData) => {
        try{
            console.log(formData);
            const book = await Book.create(formData);
            return book;
        }
        catch(err){
            throw new Error(err);
        }
    },

    getPaginatedBooks : async(options,filter={}) => {
        const books = await Book.paginate(filter,options);
        return books;
    },

    deleteBook : async(filter) => {
        return await Book.deleteOne(filter);
    },

    markTaken : async(bookId,receiverId,taken,requestId) => {
        try{
            const recId=taken ? receiverId : null;
            const reqId=taken ? requestId : null;
            await Book.findOneAndUpdate({_id:bookId},{isTaken:taken,receiver:recId,acceptedRequestId:reqId});
            return null;
        }
        catch(err)
        {
            throw err;
        }
    },

    getRequestId : async(bookId) => {
        try{
            const book=await Book.findOne({_id:bookId});
            return book.acceptedRequestId;
        }
        catch(err)
        {
            throw err;
        }
    }
};

module.exports = SERVICES;
