const express = require('express')
const productRouter = express.Router()
const {add, update, getAllProducts, getProductsByCategoryName} = require('./productController')
const {restrictToAdmin} = require('../auth')
const errorHandler = require('../middlewares')

productRouter.post('/add',restrictToAdmin,add)
productRouter.put('/update/:id',restrictToAdmin,update)
productRouter.get('/',getAllProducts)
productRouter.get('/:name',getProductsByCategoryName)
productRouter.use(errorHandler)


module.exports = productRouter

