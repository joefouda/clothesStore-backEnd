const express = require('express')
const categoryRouter = express.Router()
const {add, update, getAllCategories, getCategoryById} = require('./categoryController')
const {errorHandler, restrictToAdmin} = require('../middlewares')

categoryRouter.post('/',restrictToAdmin,add)
categoryRouter.put('/:id',restrictToAdmin,update)
categoryRouter.get('/',getAllCategories)
categoryRouter.get('/:id',getCategoryById)
categoryRouter.use(errorHandler)

module.exports = categoryRouter

