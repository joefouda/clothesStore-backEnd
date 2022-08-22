const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    photo:{
        type:String,
        required:true,
    }
})

module.exports = categorySchema