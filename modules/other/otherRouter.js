const express = require('express')
const otherRouter = express.Router()
const {add, getSpecialDocument, deletePhoto, addMainListPhoto} = require('./otherController')
const {errorHandler, restrictToAdmin} = require('../middlewares')

otherRouter.put('/:name',restrictToAdmin,add)
otherRouter.delete('/:name/:id',restrictToAdmin,deletePhoto)
otherRouter.get('/:name',getSpecialDocument)
otherRouter.put('/mainListPhoto/:name',addMainListPhoto)
otherRouter.use(errorHandler)

module.exports = otherRouter