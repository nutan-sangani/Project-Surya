const { config } = require('../config');
const cloudinary = require('cloudinary').v2;
const sharp = require('sharp');

cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret,
});

const img_uploader = async(image_data,file_type) => {
    let buffer;
    try{
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
    catch(err){
        console.log(err);
        next(err);
    }
};

module.exports = img_uploader;
