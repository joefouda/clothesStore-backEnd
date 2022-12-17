const mongoose = require('mongoose');
const addressSchema =  require('../addresses/addressSchema')

const Address = mongoose.model('address', addressSchema)

module.exports = Address