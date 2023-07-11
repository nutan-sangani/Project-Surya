const mongoose=require("mongoose");

const bookSchema = new mongoose.Schema({
    // title:{
    //     type:String,
    //     required:true,
    // },
    // course:{
    //     type:String,
    //     required:false,
    //     default:'NA'
    // },
    // board:{
    //     type:String,
    //     required:false,
    //     default:'NA'
    // },
    // city:{
    //     type:String,
    //     required:true,
    // },
    // img:{
    //     type:Buffer,
    //     required:true,
    // },
    // donor:{
    //     type:new mongoose.Types.ObjectId,
    //     ref:'users',
    //     required:true,
    // },
    // isDeleted:{
    //     type:Boolean,
    //     default:false,
    // },
    // donatedAt:{
    //     type:Date,
    //     required:true,
    // }
});

const Book=new mongoose.model('Book',bookSchema);
module.exports=Book;