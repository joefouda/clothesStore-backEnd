const express = require('express')
const categoryRouter = express.Router()
const {add, update, getAllCategories, getCategoryById} = require('./categoryController')
const {restrictToAdmin} = require('../auth')
const errorHandler = require('../middlewares')

categoryRouter.post('/add',restrictToAdmin,add)
categoryRouter.put('/update/:id',restrictToAdmin,update)
categoryRouter.get('/',getAllCategories)
categoryRouter.get('/:id',getCategoryById)
categoryRouter.use(errorHandler)

module.exports = categoryRouter

