const express = require('express')
const modelRouter = express.Router()
const {add, update, getModelById, getModelsBySubCategoryId} = require('./modelController')
const {errorHandler, restrictToAdmin} = require('../middlewares')

modelRouter.post('/',restrictToAdmin,add)
modelRouter.put('/:id',restrictToAdmin,update)
modelRouter.get('/:id',restrictToAdmin,getModelById)
modelRouter.get('/subCategory/:id',restrictToAdmin,getModelsBySubCategoryId)

modelRouter.use(errorHandler)

module.exports = modelRouter

