const express = require('express')
const productRouter = express.Router()
const {add,update} = require('./productController')
const {restrictToAdmin} = require('../auth')
const errorHandler = require('../middlewares')

productRouter.post('/add',restrictToAdmin,add)
productRouter.put('/update/:id',restrictToAdmin,update)
productRouter.use(errorHandler)

module.exports = productRouter

