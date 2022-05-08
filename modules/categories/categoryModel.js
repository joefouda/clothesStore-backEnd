const categorySchema = require('./categorySchema')
const mongoose = require('mongoose')

const Category = mongoose.model('Category',categorySchema)

module.exports = Category