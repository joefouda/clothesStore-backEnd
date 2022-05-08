const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        minlength:8
    },
    photo:String,
    orders:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Order'
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        length:11
    },
    cartId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cart'
    }
})

module.exports = userSchema