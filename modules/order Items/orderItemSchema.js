const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    quantity:{
        type:Number,
        min:[1, 'must be greater than 0'],
        default:1
    },
    orderPrice:Number
})

module.exports = orderItemSchema