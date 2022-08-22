const express = require('express')
const orderRouter = express.Router()
const { createOrder, getAllOrders, changeOrderState, cancelOrder, getOrdersTotal, getMostSoldItem } = require('./orderController')
const {errorHandler, restrictToAdmin, restrictToUser} = require('../middlewares')

orderRouter.post('/', restrictToUser, createOrder)
orderRouter.get('/',restrictToAdmin,getAllOrders)
orderRouter.put('/',restrictToAdmin,changeOrderState)
orderRouter.put('/:id',restrictToUser,cancelOrder)
orderRouter.get('/total',restrictToAdmin,getOrdersTotal)
orderRouter.get('/mostSold',restrictToAdmin,getMostSoldItem)
orderRouter.use(errorHandler)

module.exports = orderRouter