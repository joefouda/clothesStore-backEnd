const mongoose = require('mongoose')

const modelSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    subCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'SubCategory'
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    products:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Product'
    },
    specs :{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Spec'
    }
})

module.exports = modelSchema