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

    markAsTaken : async(bookId) => {
        try{
            await Book.findOneAndUpdate({_id:bookId},{isTaken:true});
            return null;
        }
        catch(err)
        {
            throw err;
        }
    }
};

module.exports = SERVICES;
