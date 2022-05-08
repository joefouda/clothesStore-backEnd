const mongoose = require('mongoose')

const subCategotySchema = new mongoose.Schema({
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
    products:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Product'
    },
    specs:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Spec'
    },
})

module.exports = subCategotySchema