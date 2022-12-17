const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    governorate:String,
    shippingCost:Number
})

module.exports = addressSchema