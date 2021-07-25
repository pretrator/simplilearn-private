const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    courses: [Number],
    createdAt:{
        type:Date,
        dafault:new Date()
    }
});

module.exports = User = mongoose.model('user', UserSchema);