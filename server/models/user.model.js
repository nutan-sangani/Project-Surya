const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const paginate = require('./plugins/paginate.plugin');

const userSchema = new mongoose.Schema({
    username : {
        type:String,
    },
    mobile : {
        type: String,
        required:true,
    },
    email : {
        type : String,
        required : true,
    },
    institute:{
        type : String,
    },
    password : {
        type: String,
        required : true,
    },
    donated : {
        type : [mongoose.Types.ObjectId],
        ref:'books',
        default : [],
    },
    requests : {
        type : [mongoose.Types.ObjectId],
        ref : 'requests',
        default:[],
    }
});

//putting isEmailTaken, and mobileTaken methods directly in the schema, since ye kahi aur fit nhi ho rhe, aur inke liye alag se 
//service nhi banani, so for the sake of seperations of concern, humlog seperate krenge.

userSchema.statics.isEmailTaken = async function isEmailTaken(email){
    const userWithEmail = await this.findOne({email:email});
    return !!userWithEmail;
};

userSchema.statics.isMobileTaken = async function isMobileTaken(mobile){
    const userWithMobile = await this.findOne({mobile:mobile});
    return !!userWithMobile;
};

userSchema.pre('save',async function preSave(next){
    const user = this;
    if(user.isModified('password'))
    {
        user.password = await bcrypt.hash(user.password,8); //password, salting rounds
    }
    next();
});

userSchema.methods.isPasswordMatch = async function isPasswordMatch(password){
    const user = this;
    const isMatch = await bcrypt.compare(password,user.password);
    return isMatch;
};

userSchema.plugin(paginate);

const User = mongoose.model('User',userSchema);
module.exports = User;