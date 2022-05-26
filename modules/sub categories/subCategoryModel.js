const subCategorySchema = require('./subCategorySchema')
const mongoose = require('mongoose')

const SubCategory = mongoose.model('SubCategory',subCategorySchema)

module.exports = SubCategory