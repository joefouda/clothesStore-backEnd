const productSchema = require('./productSchema')
const mongoose = require('mongoose')

const Product = mongoose.model('Product',productSchema)

module.exports = Product