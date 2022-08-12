const mongoose = require('mongoose');
const dummySchema =  require('./dummySchema')

const Dummy = mongoose.model('Dummy', dummySchema)

module.exports = Dummy