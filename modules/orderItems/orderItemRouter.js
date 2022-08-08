const express = require('express')
const orderItemRouter = express.Router()
const {editQuantity} = require('./orderItemController')
const {errorHandler} = require('../middlewares')


orderItemRouter.put('/',editQuantity)
orderItemRouter.use(errorHandler)

module.exports = orderItemRouter