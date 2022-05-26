const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderItems:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'OrderItem'
    },
    status:{
        type:String,
        default:"pending"
    },
    paymentMethod:{
        type:String,
        default:"cash on delivery"
    },
    totalPrice:Number,
    shippingAddress:String,
    user:mongoose.Schema.Types.ObjectId,
    dateOrdered:{
        type:Date,
        default:Date.now   
    }
})

module.exports = orderSchema