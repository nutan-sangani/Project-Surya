const mongoose = require("mongoose");
const {Book} = require("../models");
const { customError } = require("../utils");

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
    }
};

module.exports = SERVICE;
