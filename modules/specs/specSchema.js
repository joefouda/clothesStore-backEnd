const mongoose = require('mongoose')

const specSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    options:{
        type:[String],
        required:true
    }
})

module.exports = specSchema