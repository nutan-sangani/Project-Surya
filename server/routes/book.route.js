const express = require("express");
const mongoose=require("mongoose");
const router=express.Router();
const auth = require("../middlewares/auth");
const sharp=require('sharp');
const { Book } = require('../models');

// router.get('/',async function(req,res){
//   console.log(req.query.sortBy); //-name 
//   const data=await Book.find({}).sort(req.query.sortBy).select('_id name');
//   res.send(data);
// });


router.post('/img',async function(req,res){ //upload.any(),
    console.log(req.files);
    const bin=req.files.image.data;
    let buffer;
    await sharp(req.files.image.data).jpeg({quality:10}).toBuffer() //.resize({width:360,height:360})
    .then(async (data)=>{
      buffer=data;
    })
    .catch((err)=>console.log(err));
    const book1=new Book({name:req.files.image.name,img:buffer});
    await book1.save();
    console.log(book1.img.length);
    res.send(book1.img); //yup prints the img after taking each string, converting to uINt8bit and than turned to imgurl
  });

  module.exports = router;

  //on /
  //get route to get all books (with page limit of 16), implement pagination plugin.
  //post to post a book

  //on l:id
  //delete to delete a book
  //patch to update a book

  //on /?abc....
  //get with filter as req.query, to get with certain filters
