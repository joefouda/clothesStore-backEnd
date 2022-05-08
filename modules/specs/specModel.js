const specSchema = require('./specSchema')
const mongoose = require('mongoose')

const Spec = mongoose.model('Spec',specSchema)

module.exports = Spec