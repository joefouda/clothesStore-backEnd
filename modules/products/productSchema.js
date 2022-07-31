const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    photos:{
        type:[{
            id:String,
            src:String
        }],
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
    description:String,
    price:{
        type:Number,
        min: [1, 'must be greater than 0'],
        default:1
    },
    model:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        min: [0, 'must be greater than or equal to 0'],
        default:0
    },
    reviews:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Review'
    }
})

module.exports = productSchema