const express = require('express')
const orderRouter = express.Router()
const { createOrder } = require('./orderController')
const errorHandler = require('../middlewares')

orderRouter.post('/',createOrder)
orderRouter.use(errorHandler)

module.exports = orderRouter