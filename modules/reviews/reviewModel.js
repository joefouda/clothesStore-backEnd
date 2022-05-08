const reviewSchema = require('./reviewSchema')
const mongoose = require('mongoose')

const Review = mongoose.model('Review',reviewSchema)

module.exports = Review