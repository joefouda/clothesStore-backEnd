const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        minlength:8
    }
})

module.exports = adminSchema