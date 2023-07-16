const { Book } = require('../models');
const sharp = require('sharp');
const { customError } = require('../utils');
const { BOOKSERVICE } = require('../services');

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
            // const book1=new Book({name:req.files.image.name,img:buffer});
            // await book1.save();
            // console.log(book1.img.length);
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
            console.log(new_book);
            res.send(new_book);
        }
        catch(error){
            console.log(error);
            next(error);
        }
    }
};

module.exports = CONTROLLER;