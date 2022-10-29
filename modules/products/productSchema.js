const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    subCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'SubCategory',
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        min: [1, 'must be greater than 0'],
        default:1
    },
    discountPercentage:{
        type:Number,
        min: [0, 'must be equal to or greater than 0'],
        max: [99, 'must be less than 100'],
        default:0
    },
    discountValue: {
        type:Number,
        min: [0, 'must be equal to or greater than 0'],
        default:0
    },
    netPrice:{
        type:Number,
        min: [0, 'must be greater than 0'],
    },
    mainList:{
        type:String,
        default:'regular'
    },
    reviews:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Review'
    }
})

module.exports = productSchema