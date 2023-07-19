const mongoose = require("mongoose");
const {Book} = require("../models");
const { customError } = require("../utils");
const { BOOKSERVICE } = require(".");

const SERVICE = {
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

    getPaginatedBooks : async(query) => {
        const books = await Book.paginate({},query);
        return books; //assuming ki frontend me aa hi gye honge.
    }
};

module.exports = SERVICE;
