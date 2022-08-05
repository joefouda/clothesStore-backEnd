const express = require('express')
const modelRouter = express.Router()
const {add, update, getModelById} = require('./modelController')
const {restrictToAdmin} = require('../auth')
const errorHandler = require('../middlewares')

modelRouter.post('/',restrictToAdmin,add)
modelRouter.put('/:id',restrictToAdmin,update)
modelRouter.get('/:id',restrictToAdmin,getModelById)

modelRouter.use(errorHandler)

module.exports = modelRouter

