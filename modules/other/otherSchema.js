const mongoose = require('mongoose')

const otherSchema = new mongoose.Schema({
    name:String,
    text: {
        firstLine:String,
        secondLine:String,
        thirdLine:String
    },
    photos:{
        type:[{id:String,src:String}],
    },
})

module.exports = otherSchema