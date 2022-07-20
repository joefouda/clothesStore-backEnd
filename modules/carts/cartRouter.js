const express = require('express')
const cartRouter = express.Router()
const { addToCart,removeFromCart,emptyCart, getCart } = require('./cartController')
const errorHandler = require('../middlewares')


cartRouter.post('/add',addToCart)
cartRouter.delete('/remove/:id',removeFromCart)
cartRouter.delete('/empty',emptyCart)
cartRouter.get('/items',getCart)
cartRouter.use(errorHandler)

module.exports = cartRouter