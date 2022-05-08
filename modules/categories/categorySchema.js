const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    photo:{
        type:String,
        default:''
    },
    subCategories:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Category'
    }
})

module.exports = categorySchema