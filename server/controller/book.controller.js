const { Book } = require('../models');
const sharp = require('sharp');
const { customError } = require('../utils');
const { BOOKSERVICE, USERSERVICE } = require('../services');
const httpStatus = require('http-status');
const { getRes } = require('../utils/responseTemplate');

const compress_img = async (image_data) => {
    let buffer;
    await sharp(image_data).jpeg({quality:10})
                                          .toBuffer()
                                          .then(async (data)=> { buffer=data; })
                                          .catch((err)=>{ throw new customError('IMAGE_COMPRESSION_ERROR',401,
                                          'Try again after sometime or try contacting the admin of the website',err);});
    return buffer;
};

const CONTROLLER = {
    check_img : async (req,res,next) => {
        try{
            const binary_data=req.files.image.data;
            let buffer;
            buffer = await compress_img(binary_data);
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
            let buffer;
            buffer = await compress_img(binary_data);
            req.body.img = buffer;
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
    }
};

module.exports = CONTROLLER;