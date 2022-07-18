const express = require('express')
const productRouter = express.Router()
const {add, update, getAllProducts, getProductsByCategoryName,getProductsBySubCategoryName, getProductsByModel, getProductById, getProductByModelAndSpecs} = require('./productController')
const {restrictToAdmin} = require('../auth')
const errorHandler = require('../middlewares')

productRouter.post('/add',restrictToAdmin,add)
productRouter.put('/update/:id',restrictToAdmin,update)
productRouter.get('/',getAllProducts)
productRouter.get('/:id',getProductById)
productRouter.get('/category/:name',getProductsByCategoryName)
productRouter.get('/subCategory/:name',getProductsBySubCategoryName)
productRouter.get('/model/:model',getProductsByModel)
productRouter.put('/specs',getProductByModelAndSpecs)


productRouter.use(errorHandler)


module.exports = productRouter

