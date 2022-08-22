const express = require('express')
const subCategoryRouter = express.Router()
const {add,update,getSubCategoryById, getSubCategoryByName, getSubCategoriesByCategoryId} = require('./subCategoryController')
const {errorHandler, restrictToAdmin} = require('../middlewares')

subCategoryRouter.post('/',restrictToAdmin,add)
subCategoryRouter.put('/:id',restrictToAdmin,update)
subCategoryRouter.get('/:id',getSubCategoryById)
subCategoryRouter.get('/name/:name',getSubCategoryByName)
subCategoryRouter.get('/category/:id',getSubCategoriesByCategoryId)

subCategoryRouter.use(errorHandler)

module.exports = subCategoryRouter

