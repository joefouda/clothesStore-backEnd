const mongoose = require('mongoose');
const adminSchema =  require('../admins/adminSchema')

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin