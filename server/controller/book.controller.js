const { Book } = require('../models');
const sharp = require('sharp');
const { customError, uploadImg } = require('../utils');
const { BOOKSERVICE, USERSERVICE } = require('../services');
const httpStatus = require('http-status');
const { getRes } = require('../utils/responseTemplate');

const CONTROLLER = {
    check_img : async (req,res,next) => { //here we will send basic buffer only, since it is faster, we will use the storage only for real objects
        try{
            const binary_data=req.files.image.data;
            let buffer;
            buffer = await sharp(binary_data).jpeg({quality:10})
                                             .toBuffer();
            res.send(buffer); //yup prints the img after taking each string, converting to uINt8bit and than turned to imgurl
        }
        catch(error){
            console.log(error);
            next(error);
        }
    },

    add_book : async(req,res,next) => {
        try{
            const binary_data=req.files.image.data;
            const file_type=req.files.image.mimetype;
            let url;
            url = await uploadImg(binary_data,file_type);
            req.body.img = url.secure_url;
            req.body.donor = req.user._id;
            req.body.donatedAt = new Date();
            const new_book = await BOOKSERVICE.addBook(req.body); //passing in the image object.
            const user = await USERSERVICE.addBookId(req.user._id,new_book._id,'donated');
            //also need to add this book, in user model's donated field.
            res.status(httpStatus.OK).send(getRes(1,user,null,'Book succesfully added'));
        }
        catch(error){
            console.log(error);
            next(error);
        }
    },

    getBooks : async(req,res,next) => {
        try{
            const options = req.query;
            options.populate = {path:'donor', select:'username donated institute _id'};
            const book = await BOOKSERVICE.getPaginatedBooks(options);
            res.status(httpStatus.OK).send(book);
        }
        catch(err){
            console.log(err);
            next(err);
        }
    },

    searchBooks : async(req,res,next) => {
        try{
            const queryText = req.query.text;
            const { limit,page } = req.query;
            let options = {};
            options.limit = limit;
            options.page = page;
            options.populate = {path:'donor', select : 'username donated institute _id'};
            const words = queryText.split(' ');
            console.log(words);
            let filter = {};
            let arr = [];
            words.forEach(word => {
                const keyword = new RegExp(word,'i');//i makes it case insensitive
                const temp = {
                    $or:[
                        {title : {$regex : keyword}},
                        {course : {$regex : keyword}},
                        {board : {$regex : keyword}},
                        {city : {$regex : keyword}},
                    ]
                };
                arr.push(temp);
            });
            //but the filter will not work, if one word is from course and other from city. like if user want find 12th science books in vasai.
            //for this, we will split the query in multiple words (by ' ') and than match each word, with all fields, and return a result if all the words match with some fields
            filter = {
                $and: arr,
            }; //$and is for logical and.
            const found_books = await BOOKSERVICE.getPaginatedBooks(options,filter);
            if(found_books.results.length === 0)
                return res.status(httpStatus.FOUND).send(getRes(1,found_books,null,'Looks like we currently dont have what you are looking for')); 
            return res.status(httpStatus.FOUND).send(getRes(1,found_books,null,'Books Found Successfully')); 
            //no need to make another getRes for paginated responses, since that response already contains all the info, so just pass it
            //and figure it out in the frontend. 
        }
        catch(err){
            console.error(err);
            next(err);
        }
    },

    getUserBooks : async (req,res,next) => {
        const userId = req.user._id;
        
    }
};

module.exports = CONTROLLER;