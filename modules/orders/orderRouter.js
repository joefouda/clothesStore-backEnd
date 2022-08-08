const express = require('express')
const orderRouter = express.Router()
const { createOrder, getAllOrders, changeOrderState } = require('./orderController')
const {errorHandler, restrictToAdmin, restrictToUser} = require('../middlewares')

orderRouter.post('/', restrictToUser, createOrder)
orderRouter.get('/',restrictToAdmin,getAllOrders)
orderRouter.put('/',restrictToAdmin,changeOrderState)
orderRouter.use(errorHandler)

module.exports = orderRouter