const express = require('express')
const cartRouter = express.Router()
const { addToCart,removeFromCart,emptyCart,fillCart } = require('./cartController')
const errorHandler = require('../middlewares')


cartRouter.post('/',fillCart)
cartRouter.post('/add',addToCart)
cartRouter.delete('/remove/:id',removeFromCart)
cartRouter.delete('/empty',emptyCart)
cartRouter.use(errorHandler)

module.exports = cartRouter