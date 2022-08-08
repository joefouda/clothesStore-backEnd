const express = require('express')
const cartRouter = express.Router()
const { addToCart,removeFromCart,emptyCart, getCart } = require('./cartController')
const {errorHandler, restrictToUser} = require('../middlewares')


cartRouter.post('/add', restrictToUser,addToCart)
cartRouter.delete('/remove/:id', restrictToUser, removeFromCart)
cartRouter.delete('/empty', restrictToUser, emptyCart)
cartRouter.get('/', restrictToUser, getCart)
cartRouter.use(errorHandler)

module.exports = cartRouter