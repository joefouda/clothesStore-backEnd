const subCategorySchema = require('./subCategorySchema')
const mongoose = require('mongoose')

const SubCategory = mongoose.model('SubCategorie',subCategorySchema)

module.exports = SubCategory