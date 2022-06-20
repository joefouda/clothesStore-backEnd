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
        ref:'Category'
    },
    products:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Product'
    },
    models:{
        type:[String]
    },
    specs:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Spec'
    },
})

module.exports = subCategotySchema