const express = require('express')
const productRouter = express.Router()
const {add, update,addPhoto, removePhoto, getAllProducts, queryProductByName, getProductsByCategoryName,getProductsBySubCategoryName, getProductById, getProductByModelAndSpecs} = require('./productController')
const {errorHandler, restrictToAdmin} = require('../middlewares')

productRouter.post('/add',restrictToAdmin,add)
productRouter.put('/update/:id',restrictToAdmin,update)
productRouter.put('/add/:id',restrictToAdmin,addPhoto)
productRouter.put('/remove/:id',restrictToAdmin,removePhoto)
productRouter.get('/',getAllProducts)
productRouter.get('/:id',getProductById)
productRouter.get('/search/:name',queryProductByName)
productRouter.get('/category/:name',getProductsByCategoryName)
productRouter.get('/subCategory/:name',getProductsBySubCategoryName)
productRouter.put('/specs',getProductByModelAndSpecs)


productRouter.use(errorHandler)


module.exports = productRouter

