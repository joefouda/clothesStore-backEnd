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
    orders:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Order'
    },
    address:{
        country:String,
        province:String,
        street:String,
        details:String
    },
    phone:{
        type:String,
        length:11
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cart'
    },
    isBanned:{
        type:Boolean,
        default:false
    },
    favorites:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Product'
    }
})

module.exports = userSchema