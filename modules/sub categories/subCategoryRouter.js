const express = require('express')
const subCategoryRouter = express.Router()
const {add,update,getSubCategoryById, getSubCategoryByName} = require('./subCategoryController')
const {errorHandler, restrictToAdmin} = require('../middlewares')

subCategoryRouter.post('/',restrictToAdmin,add)
subCategoryRouter.put('/:id',restrictToAdmin,update)
subCategoryRouter.get('/:id',getSubCategoryById)
subCategoryRouter.get('/name/:name',getSubCategoryByName)

subCategoryRouter.use(errorHandler)

module.exports = subCategoryRouter

