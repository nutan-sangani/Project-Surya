const { Book } = require('../models');
const { config } = require('../config');
const sharp = require('sharp');
const { customError } = require('../utils');
const { BOOKSERVICE, USERSERVICE } = require('../services');
const httpStatus = require('http-status');
const { getRes } = require('../utils/responseTemplate');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret,
});

const img_uploader = async(image_data,file_type) => {
    let buffer;
    await sharp(image_data).jpeg({quality:10})
                                          .toBuffer()
                                          .then(async (data)=> { buffer=data; })
                                          .catch((err)=>{ throw new customError('IMAGE_COMPRESSION_ERROR',401,
                                          'Try again after sometime or try contacting the admin of the website',err);});
    let img_string = buffer.toString('base64');
    img_string = 'data:'+file_type+';base64,'+img_string;
    const url = await cloudinary.uploader.upload(img_string);
    return url;
}

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
            console.log('this',error);
            next(error);
        }
    },

    add_book : async(req,res,next) => {
        try{
            const binary_data=req.files.image.data;
            const file_type=req.files.image.mimetype;
            let url;
            url = await img_uploader(binary_data,file_type);
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
        const query = req.query;
        query.populate = {path:'donor', select:'username donated institute'};
        console.log(query);
        const book = await BOOKSERVICE.getPaginatedBooks(query);
        // console.log(book.results[0]);
        res.status(httpStatus.OK).send(book);
    },

};

module.exports = CONTROLLER;