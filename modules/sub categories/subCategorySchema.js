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
    models:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Model'
    },
})

module.exports = subCategotySchema