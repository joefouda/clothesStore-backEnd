const mongoose = require('mongoose')

const dummySchema = new mongoose.Schema({
    name:String,
    age:Number,
    salary:Number,
    managerId:String,
})

module.exports = dummySchema