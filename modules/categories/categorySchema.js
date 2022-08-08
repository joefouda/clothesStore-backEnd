const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    photo:{
        type:String,
        required:true,
    },
    subCategories:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'SubCategory'
    }
})

module.exports = categorySchema