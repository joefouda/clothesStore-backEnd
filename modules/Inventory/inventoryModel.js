const inventorySchema = require('./InventorySchema')
const mongoose = require('mongoose')

const Inventory = mongoose.model('Inventory', inventorySchema)

module.exports = Inventory