const mainListSchema = require('./mainListsSchema')
const mongoose = require('mongoose')

const MainList = mongoose.model('MainList',mainListSchema)

module.exports = MainList