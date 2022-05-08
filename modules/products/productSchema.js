const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default:''
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
    specs:[
        {
            name:String,
            value:String
        }
    ],
    price:{
        type:Number,
        min: [1, 'must be greater than 0'],
        default:1
    },
    quantity:{
        type:Number,
        min: [1, 'must be greater than 0'],
        default:1
    },
    reviews:[mongoose.Schema.Types.ObjectId]
})

module.exports = productSchema