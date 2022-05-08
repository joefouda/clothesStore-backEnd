const express = require('express')
const subCategoryRouter = express.Router()
const {add,update} = require('./subCategoryController')
const {restrictToAdmin} = require('../auth')
const errorHandler = require('../middlewares')

subCategoryRouter.post('/add',restrictToAdmin,add)
subCategoryRouter.put('/update/:id',restrictToAdmin,update)
subCategoryRouter.use(errorHandler)

module.exports = subCategoryRouter

