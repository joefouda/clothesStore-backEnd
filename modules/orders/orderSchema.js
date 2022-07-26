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
    grandTotal:Number,
    shippingAddress:{
        country:String,
        province:String,
        street:String,
        details:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    dateOrdered:{
        type:Date,
        default:new Date
    }
})

module.exports = orderSchema