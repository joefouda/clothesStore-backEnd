const orderSchema = require('./orderSchema')
const mongoose = require('mongoose')

const Order = mongoose.model('Order',orderSchema)

module.exports = Order