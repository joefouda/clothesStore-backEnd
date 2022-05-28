const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderItems:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'OrderItem'
    },
    state:{
        type:String,
        default:"pending"
    },
    paymentMethod:{
        type:String,
    },
    totalPrice:Number,
    shippingAddress:String,
    phone:Number,
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    dateOrdered:{
        type:Date,
        default:Date.now   
    }
})

module.exports = orderSchema