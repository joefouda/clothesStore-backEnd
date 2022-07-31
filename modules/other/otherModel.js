const otherSchema = require('./otherSchema')
const mongoose = require('mongoose')

const Other = mongoose.model('Other',otherSchema)

module.exports = Other