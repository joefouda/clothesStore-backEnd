const express = require('express')
const orderRouter = express.Router()
const {restrictToAdmin} = require('../auth')
const { createOrder, getAllOrders } = require('./orderController')
const errorHandler = require('../middlewares')

orderRouter.post('/',createOrder)
orderRouter.get('/',restrictToAdmin,getAllOrders)
orderRouter.use(errorHandler)

module.exports = orderRouter