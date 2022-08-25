const mongoose = require('mongoose')

const otherSchema = new mongoose.Schema({
    name:String,
    photos:{
        type:[{id:String,src:String}],
    },
    MainLists: {
        type:[
            {
                photo:String,
                title:String
            }
        ]
    }
})

module.exports = otherSchema