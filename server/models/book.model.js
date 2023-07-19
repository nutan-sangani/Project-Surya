const mongoose=require("mongoose");
const paginate = require("./plugins/paginate.plugin");

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    course:{
        type:String,
        required:false,
        default:'NA'
    },
    board:{
        type:String,
        required:false,
        default:'NA'
    },
    city:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        required:true,
    },
    donor:{
        type: mongoose.Types.ObjectId,
        required:true,
        ref:'User',
    },
    isDeleted:{
        type:Boolean,
        default:false,
    },
    donatedAt:{
        type:Date,
        required:true,
    },
},{timestamps:true});

bookSchema.plugin(paginate);

const Book=new mongoose.model('Book',bookSchema);
module.exports=Book;