const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    rate:{
        type:Number,
        required:true,
        default:0
    },
    description:{
        type:String,
        required:true
    }
})

module.exports = reviewSchema