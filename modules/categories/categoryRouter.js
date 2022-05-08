const express = require('express')
const categoryRouter = express.Router()
const {add,update} = require('./categoryController')
const {restrictToAdmin} = require('../auth')
const errorHandler = require('../middlewares')

categoryRouter.post('/add',restrictToAdmin,add)
categoryRouter.put('/update/:id',restrictToAdmin,update)
categoryRouter.use(errorHandler)

module.exports = categoryRouter

