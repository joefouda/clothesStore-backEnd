const express = require('express')
const subCategoryRouter = express.Router()
const {add,update,getSubCategoryById, getSubCategoryByName} = require('./subCategoryController')
const {restrictToAdmin} = require('../auth')
const errorHandler = require('../middlewares')

subCategoryRouter.post('/add',restrictToAdmin,add)
subCategoryRouter.put('/update/:id',restrictToAdmin,update)
subCategoryRouter.get('/:id',getSubCategoryById)
subCategoryRouter.get('/name/:name',getSubCategoryByName)

subCategoryRouter.use(errorHandler)

module.exports = subCategoryRouter

