const cartSchema = require('./cartSchema')
const mongoose = require('mongoose')

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart