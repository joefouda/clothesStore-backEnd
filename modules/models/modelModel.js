const modelSchema = require('./modelSchema')
const mongoose = require('mongoose')

const Model = mongoose.model('Model',modelSchema)

module.exports = Model