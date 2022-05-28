const orderItemSchema = require('./orderItemSchema')
const mongoose = require('mongoose')

const OrderItem = mongoose.model('OrderItem',orderItemSchema)

module.exports = OrderItem