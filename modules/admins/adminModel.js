const mongoose = require('mongoose');
const adminSchema =  require('./adminSchema')

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin