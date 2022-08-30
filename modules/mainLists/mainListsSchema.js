const mongoose = require('mongoose')

const mainList = new mongoose.Schema({
    displayedTitle:String,
    title:String,
    photo:String,
    hide: {
        type:Boolean,
        default:false
    }
})

module.exports = mainList