const mongoose = require("mongoose");
const {Book} = require("../models");
const { customError } = require("../utils");

const SERVICES = {
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
};

module.exports = SERVICES;
