const mongoose = require('mongoose')

const subCategotySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    models:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Model'
    },
})

module.exports = subCategotySchema