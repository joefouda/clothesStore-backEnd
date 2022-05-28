const express = require('express')
const orderRouter = express.Router()
const {restrictToAdmin} = require('../auth')
const { createOrder, getAllOrders, changeOrderState } = require('./orderController')
const errorHandler = require('../middlewares')

orderRouter.post('/',createOrder)
orderRouter.get('/',restrictToAdmin,getAllOrders)
orderRouter.put('/',restrictToAdmin,changeOrderState)
orderRouter.use(errorHandler)

module.exports = orderRouter